import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getQuickStart } from "../../content/quickstarts";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;
const rateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "1 h"),
      prefix: "quickstart-inquiry:ip",
    })
  : null;

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);
}

function redirect(request: Request, slug: string, status: "sent" | "error") {
  const url = new URL("/quickstarts/inquire", request.url);
  url.searchParams.set("quickstart", slug);
  url.searchParams.set("status", status);
  url.hash = "inquiry";
  return Response.redirect(url, 303);
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return process.env.NODE_ENV !== "production";
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return new Response("Forbidden", { status: 403 });

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 12_000) return new Response("Payload too large", { status: 413 });

  const formData = await request.formData();
  const slug = text(formData, "quickstart");
  const quickStart = getQuickStart(slug);
  if (!quickStart) return redirect(request, slug, "error");

  if (text(formData, "website")) return redirect(request, slug, "sent");

  const name = text(formData, "name");
  const company = text(formData, "company");
  const email = text(formData, "email");
  const useCase = text(formData, "useCase");
  const technologyStack = text(formData, "technologyStack");
  const phase = text(formData, "phase") === "next" ? "Next phase" : "Launch Kit";
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (
    !name || name.length > 100 ||
    !company || company.length > 120 ||
    !validEmail || email.length > 180 ||
    !useCase || useCase.length > 3000 ||
    technologyStack.length > 1500
  ) {
    return redirect(request, slug, "error");
  }

  if (rateLimit) {
    const ip = (request.headers.get("x-vercel-forwarded-for") || request.headers.get("x-forwarded-for") || "anonymous").split(",")[0].trim();
    const result = await rateLimit.limit(ip);
    if (!result.success) return new Response("Too many requests", { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUICKSTART_INQUIRY_TO_EMAIL;
  const from = process.env.QUICKSTART_INQUIRY_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error("Launch Kit inquiry email environment variables are not configured");
    return redirect(request, slug, "error");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `${phase} inquiry: ${quickStart.inquiryLabel} from ${company}`,
      html: `
        <h1>${escapeHtml(quickStart.inquiryLabel)}</h1>
        <p><strong>Inquiry type:</strong> ${escapeHtml(phase)}</p>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Company:</strong> ${escapeHtml(company)}</p>
        <p><strong>Work email:</strong> ${escapeHtml(email)}</p>
        <h2>Use case</h2>
        <p>${escapeHtml(useCase).replace(/\n/g, "<br>")}</p>
        <h2>Current technology stack</h2>
        <p>${technologyStack ? escapeHtml(technologyStack).replace(/\n/g, "<br>") : "Not provided"}</p>
      `,
    }),
  });

  if (!response.ok) {
    console.error("Resend rejected Launch Kit inquiry", response.status, await response.text());
    return redirect(request, slug, "error");
  }

  return redirect(request, slug, "sent");
}
