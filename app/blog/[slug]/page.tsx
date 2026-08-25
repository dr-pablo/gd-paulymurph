import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getCuratedLinks } from "../../../content/links";
import { getBlogPost, getBlogPosts } from "../../../lib/blog";
import CuratedLinks from "../../components/CuratedLinks";
import JsonLd from "../../components/JsonLd";
import { siteConfig } from "../../content/site";
import { createPageMetadata } from "../../../lib/metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

const relatedWorkByPost: Record<string, { href: string; label: string; description: string }> = {
  "a-useful-local-ai-setup": {
    href: "/work/governed-ai-analytics",
    label: "Governed applied AI and MCP in production",
    description: "See how the same tool-boundary principles were delivered through Fabric, Foundry, FastAPI, and FastMCP.",
  },
  "bronze-silver-gold-is-easy-until-you-build-it": {
    href: "/work/fabric-modernization",
    label: "Microsoft Fabric platform modernization",
    description: "See the production platform behind the medallion, governance, deployment, and operating lessons.",
  },
  "being-the-only-data-person-changes-how-you-build": {
    href: "/work",
    label: "End-to-end systems delivered in production",
    description: "Explore the connected commercial, platform, forecasting, and applied-AI systems behind this operating model.",
  },
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPost((await params).slug);
  if (!post) return {};

  return createPageMetadata({
    title: post.title,
    description: post.summary,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    tags: post.tags,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPost((await params).slug);
  if (!post) notFound();
  const suggestedReading = getCuratedLinks(post.suggestedLinks);
  const relatedWork = relatedWorkByPost[post.slug];
  const url = `${siteConfig.url}/blog/${post.slug}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.summary,
      url,
      mainEntityOfPage: url,
      datePublished: post.date,
      author: { "@id": `${siteConfig.url}/#person` },
      publisher: { "@id": `${siteConfig.url}/#person` },
      image: `${siteConfig.url}/opengraph-image`,
      keywords: post.tags.join(", "),
      inLanguage: "en-US",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];

  return (
    <article>
      <JsonLd data={structuredData} />
      <header className="site-grid border-b border-border">
        <div className="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20">
          <Link href="/blog" className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground hover:text-accent">
            ← All notes
          </Link>
          <div className="mt-12 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-accent">
            <time dateTime={post.date}>Published {formatDate(post.date)}</time>
            {post.period && <span>Lesson period {post.period}</span>}
            <span>{post.readingTime} min read</span>
            <span>{post.tags.join(" / ")}</span>
          </div>
          <h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-[0.96] tracking-[-0.06em] md:text-7xl">{post.title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl">{post.summary}</p>
        </div>
      </header>

      <div className="mx-auto grid max-w-5xl gap-10 px-5 py-14 md:grid-cols-[8rem_1fr] md:px-8 md:py-20">
        <aside className="hidden md:block">
          <div className="sticky top-28 border-t border-border pt-4 font-mono text-[0.62rem] uppercase leading-5 tracking-[0.12em] text-muted-foreground">
            <p><Link href="/about" className="hover:text-accent">Paul Murphy</Link></p>
            <p className="mt-2">Field note</p>
            <p className="mt-2">{post.sourceType}</p>
          </div>
        </aside>
        <div className="article-prose min-w-0">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>
      </div>

      {relatedWork && (
        <section className="border-y border-border bg-lavender-soft/45">
          <div className="mx-auto grid max-w-5xl gap-5 px-5 py-10 md:grid-cols-[8rem_1fr] md:px-8">
            <p className="section-label">Related evidence</p>
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.035em]">
                <Link href={relatedWork.href} className="hover:text-accent">{relatedWork.label} ↗</Link>
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{relatedWork.description}</p>
            </div>
          </div>
        </section>
      )}

      <CuratedLinks
        links={suggestedReading}
        description="Sources and documentation that add context, implementation detail, or a useful second perspective."
      />

      <footer className="border-y border-border bg-green-soft/55">
        <div className="mx-auto flex max-w-5xl flex-col justify-between gap-6 px-5 py-10 md:flex-row md:items-center md:px-8">
          <p className="max-w-xl text-lg font-medium">Have a related system or problem in mind?</p>
          <a href="https://cal.com/paulymurph" target="_blank" rel="noreferrer" className="w-fit bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent-hover">
            Book an intro call
          </a>
        </div>
      </footer>
    </article>
  );
}
