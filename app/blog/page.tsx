import { list } from "@vercel/blob";
import { Metadata } from "next";
import BlogPostList from "../components/BlogPostList";

export const metadata: Metadata = {
  title: "Blog | Paul Murphy",
  description: "Thoughts on data, analytics, and technology.",
};

interface BlogPost {
  url: string;
  filename: string;
  uploadedAt: string;
  pathname: string;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const { blobs } = await list({ prefix: "blog-posts/" });

    return blobs
      .filter((blob) => {
        const ext = blob.pathname.split(".").pop()?.toLowerCase();
        return ext === "md" || ext === "mdx" || ext === "txt";
      })
      .map((blob) => ({
        url: blob.url,
        filename: blob.pathname.replace(/^blog-posts\//, ""),
        uploadedAt: blob.uploadedAt instanceof Date ? blob.uploadedAt.toISOString() : blob.uploadedAt,
        pathname: blob.pathname,
      }))
      .sort(
        (a, b) =>
          new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
      );
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen py-20">
      {/* Background gradient blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-blue-500/30 rounded-full blur-[128px]" />
      </div>

      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 mb-16 animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight gradient-text inline-block">
          Blog
        </h1>
        <p className="text-xl text-muted-foreground mt-4 max-w-2xl">
          Thoughts on data, analytics, and technology.
        </p>
      </section>

      {/* Blog Posts */}
      <section className="max-w-4xl mx-auto px-6">
        <BlogPostList posts={posts} />
      </section>
    </div>
  );
}
