import { put, get } from "@vercel/blob";

// Upload your resume PDF to Vercel Blob at this exact path (private access):
//   resume/paul-murphy-resume.pdf
const RESUME_BLOB_PATH = "gd-paulymurph-blob/Paul_Murphy_-_Enterprise_Analytics_&_Intelligence-1.pdf";

// Minimum seconds a real user would take to fill the form
const MIN_ELAPSED_MS = 3_000;
// Reject tokens older than 1 hour (prevents replaying old submissions)
const MAX_ELAPSED_MS = 60 * 60 * 1_000;

export async function POST(request: Request) {
  let body: {
    name?: string;
    email?: string;
    company?: string;
    message?: string;
    _hp?: string;   // honeypot — must be empty
    _t?: number;    // form mount timestamp (ms epoch)
  };

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields, humans leave them blank
  if (body._hp) {
    return new Response(null, { status: 204 });
  }

  // Timing check: reject submissions that arrive too fast or with a stale token
  const elapsed = Date.now() - (body._t ?? 0);
  if (elapsed < MIN_ELAPSED_MS || elapsed > MAX_ELAPSED_MS) {
    return Response.json({ error: "Submission rejected. Please try again." }, { status: 400 });
  }

  const { name, email, company, message } = body;

  if (!name?.trim()) {
    return Response.json({ error: "Name is required" }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email?.trim() || !emailRegex.test(email.trim())) {
    return Response.json({ error: "Valid email is required" }, { status: 400 });
  }

  const submittedAt = new Date().toISOString();
  const safeName = name.trim().replace(/[^a-zA-Z0-9]/g, "-").slice(0, 40);

  // Store the request record
  await put(
    `resume-requests/${submittedAt}-${safeName}.json`,
    JSON.stringify({ name, email, company: company ?? "", message: message ?? "", submittedAt }),
    { access: "private", contentType: "application/json", addRandomSuffix: false, allowOverwrite: false }
  );

  // Fetch the private resume PDF and stream it back as a download
  const pdf = await get(RESUME_BLOB_PATH, { access: "private" });

  if (!pdf || pdf.statusCode !== 200) {
    return Response.json({ error: "Resume is temporarily unavailable. Please try again later." }, { status: 503 });
  }

  return new Response(pdf.stream, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Paul_Murphy_Resume.pdf"',
    },
  });
}
