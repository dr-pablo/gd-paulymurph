import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
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
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
