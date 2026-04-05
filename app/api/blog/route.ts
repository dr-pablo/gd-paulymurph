import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    // Check if BLOB_READ_WRITE_TOKEN is configured
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error("BLOB_READ_WRITE_TOKEN environment variable is not set");
      return NextResponse.json(
        { error: "Blob storage is not configured. Please set BLOB_READ_WRITE_TOKEN." },
        { status: 500 }
      );
    }

    // Try listing with different prefix variations to find the files
    let allBlobs: Awaited<ReturnType<typeof list>>['blobs'] = [];
    
    // Try "blog-posts/" first
    try {
      const result1 = await list({ prefix: "blog-posts/", mode: "expanded" });
      console.log("blog-posts/ prefix result:", result1.blobs.length, "blobs");
      allBlobs = [...allBlobs, ...result1.blobs];
    } catch (e) {
      console.log("Error with blog-posts/ prefix:", e);
    }
    
    // Also try "blog/" prefix in case files are there
    try {
      const result2 = await list({ prefix: "blog/", mode: "expanded" });
      console.log("blog/ prefix result:", result2.blobs.length, "blobs");
      allBlobs = [...allBlobs, ...result2.blobs];
    } catch (e) {
      console.log("Error with blog/ prefix:", e);
    }
    
    // Also try listing ALL blobs to see what's available (no prefix)
    try {
      const result3 = await list({ mode: "expanded" });
      console.log("No prefix (all blobs):", result3.blobs.length, "blobs");
      console.log("All blob pathnames:", result3.blobs.map(b => b.pathname));
    } catch (e) {
      console.log("Error listing all blobs:", e);
    }

    console.log(`Total blobs found: ${allBlobs.length}`);
    console.log("Blob pathnames:", allBlobs.map(b => b.pathname));

    const blogPosts = allBlobs
      .filter((blob) => {
        const ext = blob.pathname.split(".").pop()?.toLowerCase();
        return ext === "md" || ext === "mdx" || ext === "txt";
      })
      .map((blob) => {
        // Extract filename - remove any known prefixes
        let filename = blob.pathname;
        filename = filename.replace(/^blog-posts\//, "").replace(/^blog\//, "");
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

    console.log(`Returning ${blogPosts.length} blog posts after filtering`);
    return NextResponse.json(blogPosts);
  } catch (error) {
    // Log full error details for debugging
    console.error("Error fetching blog posts:", error);
    
    // Return more detailed error in development, generic in production
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorDetails = process.env.NODE_ENV === 'development' 
      ? { error: errorMessage, stack: error instanceof Error ? error.stack : undefined }
      : { error: "Failed to fetch blog posts. Please try again later." };
    
    return NextResponse.json(errorDetails, { status: 500 });
  }
}
