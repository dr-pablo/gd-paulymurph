import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "../../components/JsonLd";
import {
  formatQuickStartPrice,
  getQuickStart,
  quickStarts,
  quickStartStages,
} from "../../content/quickstarts";
import { siteConfig } from "../../content/site";
import { createPageMetadata } from "../../../lib/metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return quickStarts.map((quickStart) => ({ slug: quickStart.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const quickStart = getQuickStart((await params).slug);
  if (!quickStart) return {};

  return createPageMetadata({
    title: quickStart.name,
    description: quickStart.description,
    path: `/${quickStart.slug}`,
    tags: [...quickStart.technologies, "Launch Kit", "Productized services"],
  });
}

export default async function QuickStartDetailPage({ params }: Props) {
  const quickStart = getQuickStart((await params).slug);
  if (!quickStart) notFound();

  const inquiryHref = `/quickstarts/inquire?quickstart=${quickStart.slug}#inquiry`;
  const nextPhaseHref = `/quickstarts/inquire?quickstart=${quickStart.slug}&phase=next#inquiry`;
  const url = `${siteConfig.url}/${quickStart.slug}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: quickStart.name,
      description: quickStart.description,
      url,
      provider: { "@id": `${siteConfig.url}/#person` },
      offers: {
        "@type": "Offer",
        price: quickStart.startingPrice,
        priceCurrency: "USD",
        description: `${quickStart.pricingNote} Starting at ${formatQuickStartPrice(quickStart.startingPrice)}.`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Launch Kits", item: `${siteConfig.url}/quickstarts` },
        { "@type": "ListItem", position: 3, name: quickStart.name, item: url },
      ],
    },
  ];

  return (
    <article>
      <JsonLd data={structuredData} />
      <header className="site-grid border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
          <Link href="/quickstarts" className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground hover:text-accent">
            ← All Launch Kits
          </Link>
          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_19rem] lg:items-end lg:gap-16">
            <div>
              <p className="section-label">Launch Kit</p>
              <h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-[0.94] tracking-[-0.06em] md:text-7xl">
                {quickStart.name}
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl">
                {quickStart.description}
              </p>
            </div>
            <div className="border border-border bg-paper p-6 shadow-[0_18px_50px_rgba(21,24,21,0.06)]">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">Package pricing</p>
              <p className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-accent">
                Starting at {formatQuickStartPrice(quickStart.startingPrice)}
              </p>
              <p className="mt-3 text-xs leading-5 text-muted-foreground">{quickStart.pricingNote}</p>
              <div className="mt-6">
                <Link href={inquiryHref} className="inline-flex w-full justify-center bg-accent px-5 py-3 text-center text-sm font-semibold text-white hover:bg-accent-hover">
                  {quickStart.primaryCTA}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[0.7fr_1.7fr] md:px-8 md:py-24">
        <p className="section-label">Outcome</p>
        <div>
          <h2 className="max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.045em] md:text-5xl">
            What you&apos;ll have when we&apos;re done
          </h2>
          <p className="mt-7 max-w-3xl text-xl leading-9 text-muted-foreground">{quickStart.outcome}</p>
          <div className="mt-9 grid gap-px border border-border bg-border sm:grid-cols-2">
            <div className="bg-paper p-5">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-accent">Best fit</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{quickStart.bestFor}</p>
            </div>
            <div className="bg-paper p-5">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-accent">Typical timeline</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{quickStart.timeline}</p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {quickStart.technologies.map((technology) => (
              <span key={technology} className="border border-border bg-paper px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted-foreground">
                {technology}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-green-soft/45">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[0.7fr_1.7fr] md:px-8 md:py-24">
          <p className="section-label">What&apos;s included</p>
          <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
            {quickStart.deliverables.map((deliverable) => (
              <div key={deliverable} className="flex gap-4 bg-paper p-5 text-sm font-medium leading-6">
                <span className="font-mono text-accent" aria-hidden="true">+</span>
                <span>{deliverable}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-paper">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[0.7fr_1.7fr] md:px-8 md:py-20">
          <div>
            <p className="section-label">Designed to move quickly</p>
            <p className="mt-5 max-w-xs text-sm leading-6 text-muted-foreground">
              Launch Kits work best when the core environment, access, and business owner are ready.
            </p>
          </div>
          <ul className="grid gap-px border border-border bg-border sm:grid-cols-2">
            {quickStart.assumptions.map((assumption) => (
              <li key={assumption} className="flex gap-4 bg-paper p-5 text-sm leading-6 text-muted-foreground">
                <span className="font-mono text-accent" aria-hidden="true">+</span>
                <span>{assumption}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-10 md:grid-cols-[0.7fr_1.7fr]">
          <p className="section-label">How it works</p>
          <div className="grid gap-px border border-border bg-border md:grid-cols-2">
            {quickStartStages.map((stage) => (
              <div key={stage.number} className="bg-paper p-6 md:p-8">
                <span className="font-mono text-xs text-lavender">{stage.number}</span>
                <h2 className="mt-5 text-2xl font-semibold tracking-[-0.035em]">{stage.name}</h2>
                <p className="mt-3 leading-7 text-muted-foreground">{stage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-lavender-soft/40">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-2 md:px-8 md:py-18">
          {quickStart.examples && (
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">Good use cases</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {quickStart.examples.map((example) => (
                  <span key={example} className="border border-border bg-paper/70 px-3 py-2 text-sm">{example}</span>
                ))}
              </div>
            </div>
          )}
          <div className={quickStart.examples ? "" : "md:col-start-2"}>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">Outside this package</p>
            <ul className="mt-5 grid gap-2 text-sm leading-6 text-muted-foreground sm:grid-cols-2">
              {quickStart.exclusions.map((exclusion) => <li key={exclusion}>+ {exclusion}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="border-l-2 border-accent pl-6 md:pl-8">
          <h2 className="text-xl font-semibold">Launch Kits are intentionally scoped.</h2>
          <p className="mt-3 max-w-4xl leading-7 text-muted-foreground">
            Each engagement begins with a fit review. Before work starts, a statement of work confirms the deliverables, responsibilities, timeline, fee, and acceptance approach. If discovery identifies custom development, remediation, additional integrations, or broader architecture needs, that work is separately scoped rather than added to the Launch Kit by default.
          </p>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-muted-foreground">
            Third-party licenses, platform usage, ongoing operations, and post-launch enhancements are not included unless they are explicitly stated in the agreed scope.
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-foreground text-background">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[1.1fr_0.9fr] md:px-8 md:py-20">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-background/55">Built to start small. Designed to scale.</p>
            <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.045em] md:text-5xl">
              A working foundation for what comes next.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-background/65">
              A Launch Kit can stand on its own or become the foundation for a broader Data, AI, Automation, or managed-services engagement.
            </p>
            <Link href={nextPhaseHref} className="mt-8 inline-flex border-b border-lavender pb-1 text-sm font-semibold text-white">
              Discuss the Next Phase <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-background/55">Natural expansion paths</p>
            <ul className="mt-5 grid gap-3 text-sm text-background/75 sm:grid-cols-2">
              {quickStart.expansionPaths.map((path) => <li key={path}>+ {path}</li>)}
            </ul>
          </div>
        </div>
      </section>
    </article>
  );
}
