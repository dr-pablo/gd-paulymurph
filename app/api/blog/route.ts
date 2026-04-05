import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    // List all blobs with blog-posts/ prefix
    const { blobs } = await list({
      prefix: "blog-posts/",
      mode: "expanded",
    });

    const blogPosts = blobs
      .filter((blob) => {
        const ext = blob.pathname.split(".").pop()?.toLowerCase();
        return ext === "md" || ext === "mdx" || ext === "txt";
      })
      .map((blob) => {
        // Extract filename - remove the blog-posts/ prefix
        const filename = blob.pathname.replace(/^blog-posts\//, "");
        return {
          url: blob.url,
          filename: filename,
          uploadedAt: blob.uploadedAt,
          pathname: blob.pathname,
        };
      })
      .sort((a, b) => {
        return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
      });

    return NextResponse.json(blogPosts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}