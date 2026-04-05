"use client";

import { useState, useCallback } from "react";
import BlogModal from "./BlogModal";

interface BlogPost {
  url: string;
  filename: string;
  uploadedAt: string;
  pathname: string;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function extractTitleFromFilename(filename: string): string {
  return filename
    .replace(/\.(md|mdx|txt)$/i, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function BlogPostList({ posts }: { posts: BlogPost[] }) {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const openPost = useCallback(async (post: BlogPost) => {
    setActivePost(post);
    setContent(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/blog/content?url=${encodeURIComponent(post.url)}`);
      const text = await res.text();
      setContent(res.ok ? text : "Failed to load post.");
    } catch {
      setContent("Failed to load post.");
    } finally {
      setLoading(false);
    }
  }, []);

  const closePost = useCallback(() => {
    setActivePost(null);
    setContent(null);
  }, []);

  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground text-lg">No posts yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {posts.map((post, index) => (
          <button
            key={post.url}
            onClick={() => openPost(post)}
            className="block w-full text-left group"
          >
            <article
              className="gradient-border rounded-xl p-6 hover:bg-muted/30 transition-colors glow"
              style={{
                animationDelay: `${0.1 * (index + 1)}s`,
                animationFillMode: "forwards",
              }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold group-hover:text-accent transition-colors">
                    {extractTitleFromFilename(post.filename)}
                  </h2>
                  <p className="text-sm text-muted-foreground">{formatDate(post.uploadedAt)}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-accent transition-colors">
                  <span>Read</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
            </article>
          </button>
        ))}
      </div>

      {activePost && (
        <BlogModal
          title={extractTitleFromFilename(activePost.filename)}
          content={content}
          loading={loading}
          onClose={closePost}
        />
      )}
    </>
  );
}
