import type { Metadata } from "next";
import QuickStartCard from "../components/QuickStartCard";
import { quickStarts } from "../content/quickstarts";
import { siteConfig } from "../content/site";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Launch Kits",
  description:
    "Small, fixed-scope engagements that put useful AI and automation into production.",
  path: "/quickstarts",
});

export default function QuickStartsPage() {
  return (
    <div>
      <header className="site-grid border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <h1 className="max-w-5xl text-5xl font-semibold leading-[0.94] tracking-[-0.06em] md:text-7xl">
            Launch Kits
          </h1>
          <p className="mt-8 max-w-3xl text-xl font-semibold leading-8 md:text-2xl">
            Small, fixed-scope engagements that put useful AI and automation into production.
          </p>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
            Start with one focused problem. Ship something useful. Expand from there.
          </p>
        </div>
      </header>

      <section className="border-b border-border bg-green-soft/45">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <div className="grid gap-px border border-border bg-border lg:grid-cols-3">
            {quickStarts.map((quickStart) => (
              <QuickStartCard key={quickStart.slug} quickStart={quickStart} />
            ))}
          </div>
          <p className="mt-5 max-w-3xl text-xs leading-5 text-muted-foreground">
            Starting prices apply to focused implementations in reasonably ready environments. Fit, final scope, timeline, and fee are confirmed before work begins.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-16 md:grid-cols-[1fr_auto] md:items-center md:px-8 md:py-20">
        <div>
          <p className="section-label">Need something bigger?</p>
          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">Scope a custom engagement.</h2>
          <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
            Launch Kits are designed for focused, fast-moving projects. For larger data, analytics, AI, or automation initiatives, we can scope a custom engagement.
          </p>
        </div>
        <a href={siteConfig.introductionUrl} target="_blank" rel="noreferrer" className="inline-flex bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent-hover">
          Discuss a Project
        </a>
      </section>
    </div>
  );
}
