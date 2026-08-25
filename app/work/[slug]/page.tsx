import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CallToAction from "../../components/CallToAction";
import FlowDiagram from "../../components/FlowDiagram";
import JsonLd from "../../components/JsonLd";
import { caseStudies, getCaseStudy, siteConfig } from "../../content/site";
import { createPageMetadata } from "../../../lib/metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};

  return createPageMetadata({
    title: study.title,
    description: study.summary,
    path: `/work/${study.slug}`,
    type: "article",
    tags: [...study.capabilities, ...study.stack],
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();

  const index = caseStudies.findIndex((item) => item.slug === study.slug);
  const nextStudy = caseStudies[(index + 1) % caseStudies.length];
  const url = `${siteConfig.url}/work/${study.slug}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: study.title,
      description: study.summary,
      url,
      mainEntityOfPage: url,
      author: { "@id": `${siteConfig.url}/#person` },
      publisher: { "@id": `${siteConfig.url}/#person` },
      about: study.capabilities,
      keywords: [...study.capabilities, ...study.stack].join(", "),
      inLanguage: "en-US",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Selected Work", item: `${siteConfig.url}/work` },
        { "@type": "ListItem", position: 3, name: study.title, item: url },
      ],
    },
  ];

  return (
    <article>
      <JsonLd data={structuredData} />
      <header className="site-grid border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
          <Link href="/work" className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground hover:text-accent">
            ← All selected work
          </Link>
          <div className="mt-12 grid gap-8 md:grid-cols-[8rem_1fr]">
            <span className="font-mono text-lg text-lavender">{study.number}</span>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">{study.eyebrow}</p>
              <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.96] tracking-[-0.06em] md:text-7xl">
                {study.title}
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl">{study.summary}</p>
            </div>
          </div>
        </div>
      </header>

      <section className="border-b border-border bg-foreground text-background">
        <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
          {study.results.map((result, index) => (
            <div key={result.label} className={`p-5 md:p-7 ${index % 2 === 0 ? "border-r border-white/15" : ""} md:border-r md:border-white/15 md:last:border-r-0`}>
              <p className="metric-value text-3xl font-semibold text-white md:text-4xl">{result.value}</p>
              <p className="mt-2 text-xs leading-4 text-background/60">{result.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[0.7fr_1.7fr] md:px-8 md:py-24">
        <div>
          <p className="section-label">System context</p>
        </div>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-lavender">Environment</h2>
            <p className="mt-4 text-lg leading-8">{study.context}</p>
          </div>
          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-lavender">Constraint</h2>
            <p className="mt-4 text-lg leading-8">{study.challenge}</p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-green-soft/55">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
          <div className="grid gap-8 md:grid-cols-[0.7fr_1.7fr]">
            <p className="section-label">Architecture</p>
            <FlowDiagram steps={study.flow} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-8 md:grid-cols-[0.7fr_1.7fr]">
          <div>
            <p className="section-label">Delivery notes</p>
          </div>
          <div className="border-t border-border">
            {study.sections.map((section, index) => (
              <section key={section.title} className="grid gap-5 border-b border-border py-9 lg:grid-cols-[3.5rem_1fr_1.65fr] lg:gap-8">
                <span className="font-mono text-xs text-lavender">{String(index + 1).padStart(2, "0")}</span>
                <h2 className="text-xl font-semibold leading-7 tracking-[-0.025em]">{section.title}</h2>
                <div className="case-copy text-base leading-7 text-muted-foreground">
                  {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-lavender-soft/50">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-2 md:px-8 md:py-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">Paul&apos;s ownership</p>
            <p className="mt-5 max-w-xl text-lg leading-8">{study.ownership}</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">Capabilities</p>
              <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                {study.capabilities.map((item) => <li key={item}>+ {item}</li>)}
              </ul>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">Selected stack</p>
              <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                {study.stack.map((item) => <li key={item}>+ {item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">Next case / {nextStudy.number}</p>
        <Link href={`/work/${nextStudy.slug}`} className="mt-4 block max-w-4xl text-3xl font-semibold leading-tight tracking-[-0.04em] hover:text-accent md:text-5xl">
          {nextStudy.title} <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <CallToAction />
    </article>
  );
}
