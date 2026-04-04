import { put } from "@vercel/blob";

export async function POST(request: Request) {
  let body: { name?: string; email?: string; company?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, company, message } = body;

  if (!name?.trim()) {
    return Response.json({ error: "Name is required" }, { status: 400 });
  }
  if (!email?.trim() || !email.includes("@")) {
    return Response.json({ error: "Valid email is required" }, { status: 400 });
  }

  const submittedAt = new Date().toISOString();
  const safeName = name.trim().replace(/[^a-zA-Z0-9]/g, "-").slice(0, 40);
  const pathname = `resume-requests/${submittedAt}-${safeName}.json`;

  await put(
    pathname,
    JSON.stringify({ name, email, company: company ?? "", message: message ?? "", submittedAt }),
    {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: false,
    }
  );

  return Response.json({ success: true });
}
