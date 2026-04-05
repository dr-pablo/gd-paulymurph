import { Metadata } from "next";
import Link from "next/link";

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
    const response = await fetch(`/api/blog`, {
      cache: "no-store",
    });
    
    if (!response.ok) {
      console.error(`Failed to fetch blog posts: ${response.status} ${response.statusText}`);
      return [];
    }
    
    const data = await response.json();
    
    // Check if the API returned an error object
    if (data && typeof data === 'object' && 'error' in data) {
      console.error("Blog API returned error:", data.error);
      return [];
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
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

export default async function BlogPage() {
  const posts = await getBlogPosts();

  console.log('\nblog posts\n\n')
  console.log( posts)

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
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No posts yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post, index) => (
              <Link
                key={post.url}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
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
                      <p className="text-sm text-muted-foreground">
                        {formatDate(post.uploadedAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-accent transition-colors">
                      <span>Read</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
