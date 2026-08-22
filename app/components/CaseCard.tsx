import Link from "next/link";
import type { CaseStudy } from "../content/site";

export default function CaseCard({ study }: { study: CaseStudy }) {
  return (
    <article className="group grid border-t border-border py-9 lg:grid-cols-[8rem_1fr] lg:gap-8">
      <div className="mb-5 flex items-start justify-between lg:mb-0 lg:block">
        <span className="font-mono text-sm text-lavender">{study.number}</span>
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground lg:mt-5 lg:block">
          Case study
        </span>
      </div>
      <div>
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-accent">{study.eyebrow}</p>
        <div className="mt-3 grid gap-6 xl:grid-cols-[1fr_17rem] xl:items-start">
          <div>
            <h3 className="max-w-3xl text-2xl font-semibold leading-tight tracking-[-0.035em] md:text-3xl">
              <Link href={`/work/${study.slug}`} className="transition-colors group-hover:text-accent">
                {study.title}
              </Link>
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">{study.summary}</p>
          </div>
          <div className="grid grid-cols-2 gap-px border border-border bg-border">
            {study.results.slice(0, 4).map((result) => (
              <div key={result.label} className="bg-paper p-3">
                <p className="metric-value text-xl font-semibold text-foreground">{result.value}</p>
                <p className="mt-1 text-[0.66rem] leading-4 text-muted-foreground">{result.label}</p>
              </div>
            ))}
          </div>
        </div>
        <Link
          href={`/work/${study.slug}`}
          className="mt-6 inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
        >
          View the system <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
