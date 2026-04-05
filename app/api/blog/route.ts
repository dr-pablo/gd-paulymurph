import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  // Check if blob token is configured
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.warn("Vercel Blob token not configured. Set BLOB_READ_WRITE_TOKEN environment variable.");
    return NextResponse.json([]);
  }

  try {
    const { blobs } = await list({
      prefix: "blog/",
      mode: "expanded",
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
    return NextResponse.json([], { status: 500 });
  }
}
