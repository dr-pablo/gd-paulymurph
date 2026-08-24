import type { Metadata } from "next";
import Link from "next/link";
import { curatedLinks } from "../../content/links";
import { getBlogPosts } from "../../lib/blog";
import CuratedLinks from "../components/CuratedLinks";

export const metadata: Metadata = {
  title: "Blog",
  description: "Practical notes from Paul Murphy on data systems, applied AI, analytics, and infrastructure.",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const [leadPost, ...remainingPosts] = posts;

  return (
    <div>
      <header className="site-grid border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[0.75fr_1.8fr] md:px-8 md:py-24">
          <p className="section-label">Blog / Field notes</p>
          <div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.96] tracking-[-0.06em] md:text-7xl">
              Things worth writing down.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
              Practical notes on data systems, local AI, analytics, infrastructure, and the lessons that only show up after something runs.
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        {!leadPost ? (
          <div className="border-y border-border py-16 text-muted-foreground">No posts published yet.</div>
        ) : (
          <>
            <article className="grid overflow-hidden border border-border bg-paper lg:grid-cols-[0.85fr_1.4fr]">
              <div className="fine-grid flex min-h-72 flex-col justify-between bg-lavender-soft p-6 md:p-9">
                <div className="flex justify-between font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
                  <span>Featured note</span>
                  <span>{leadPost.sourceType}</span>
                </div>
                <div>
                  <p className="metric-value text-6xl font-semibold text-lavender">01</p>
                  <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-accent">
                    {leadPost.tags.join(" / ")}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-between p-6 md:p-10 lg:p-12">
                <div>
                  <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">
                    <time dateTime={leadPost.date}>Published {formatDate(leadPost.date)}</time>
                    {leadPost.period && <span>Lesson period {leadPost.period}</span>}
                    <span>{leadPost.readingTime} min read</span>
                  </div>
                  <h2 className="mt-7 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-0.05em] md:text-5xl">
                    <Link href={`/blog/${leadPost.slug}`} className="hover:text-accent">{leadPost.title}</Link>
                  </h2>
                  <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground">{leadPost.summary}</p>
                </div>
                <Link href={`/blog/${leadPost.slug}`} className="mt-10 inline-flex w-fit border-b border-foreground pb-1 text-sm font-semibold hover:border-accent hover:text-accent">
                  Read the note ↗
                </Link>
              </div>
            </article>

            {remainingPosts.length > 0 && (
              <section className="mt-20">
                <p className="section-label">All notes</p>
                <div className="mt-8 border-t border-border">
                  {remainingPosts.map((post, index) => (
                    <article key={post.slug} className="grid gap-5 border-b border-border py-8 md:grid-cols-[4rem_1fr_1.6fr_auto] md:items-start md:gap-8">
                      <span className="font-mono text-xs text-lavender">{String(index + 2).padStart(2, "0")}</span>
                      <div className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                        {post.period && <p className="mt-2">Lessons: {post.period}</p>}
                        <p className="mt-2">{post.readingTime} min</p>
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold tracking-[-0.035em]">
                          <Link href={`/blog/${post.slug}`} className="hover:text-accent">{post.title}</Link>
                        </h2>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{post.summary}</p>
                      </div>
                      <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-accent">Read ↗</Link>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>

      <CuratedLinks
        links={curatedLinks}
        title="Reading around the work"
        description="Articles, documentation, and references I found useful enough to keep. These links also appear alongside the posts they inform."
      />
    </div>
  );
}
