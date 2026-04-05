import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    console.log("Fetching blog posts...");
    console.log("BLOB_READ_WRITE_TOKEN present:", !!process.env.BLOB_READ_WRITE_TOKEN);
    
    const { blobs } = await list({
      prefix: "blog/",
      mode: "expanded",
    });

    console.log("Found blobs:", blobs.length);
    blobs.forEach((blob) => {
      console.log("  -", blob.pathname, blob.url);
    });

    const blogPosts = blobs
      .filter((blob) => {
        const ext = blob.pathname.split(".").pop()?.toLowerCase();
        return ext === "md" || ext === "mdx" || ext === "txt";
      })
      .map((blob) => ({
        url: blob.url,
        filename: blob.pathname.replace("blog/", ""),
        uploadedAt: blob.uploadedAt,
        pathname: blob.pathname,
      }))
      .sort((a, b) => {
        return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
      });

    return NextResponse.json(blogPosts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
