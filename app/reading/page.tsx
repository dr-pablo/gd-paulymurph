import type { Metadata } from "next";
import { readingPicks } from "../../content/reading";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Must Reads",
  description: "Paul Murphy's curated shelf of books on decisions, economics, investing, and building.",
  path: "/reading",
});

export default function ReadingPage() {
  const essentials = readingPicks.filter((book) => book.essential);
  const shelf = readingPicks.filter((book) => !book.essential);

  return (
    <div>
      <header className="site-grid border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[0.75fr_1.8fr] md:px-8 md:py-24">
          <p className="section-label">Reading / The shelf</p>
          <div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.96] tracking-[-0.06em] md:text-7xl">
              Books worth keeping close.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
              Not a reading log or an attempt to catalog everything. This is the short shelf I return to, recommend, and use to think about decisions, systems, and incentives.
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <section>
          <div className="grid gap-8 md:grid-cols-[0.75fr_1.8fr]">
            <div>
              <p className="section-label">Start here</p>
              <p className="mt-5 max-w-xs text-sm leading-6 text-muted-foreground">Three books that shape how I think about uncertainty, forecasts, behavior, and risk.</p>
            </div>
            <div className="grid gap-px border border-border bg-border lg:grid-cols-3">
              {essentials.map((book, index) => (
                <a key={book.title} href={book.href} target="_blank" rel="noreferrer" className="group flex min-h-96 flex-col justify-between bg-paper p-6 hover:bg-lavender-soft/45">
                  <div className="flex items-start justify-between">
                    <span className="metric-value text-5xl font-semibold text-lavender">{String(index + 1).padStart(2, "0")}</span>
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-accent">{book.category}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold leading-tight tracking-[-0.035em] group-hover:text-accent">{book.title}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{book.author}</p>
                    <p className="mt-6 border-t border-border pt-5 text-sm leading-6 text-muted-foreground">{book.note}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-24">
          <div className="grid gap-8 md:grid-cols-[0.75fr_1.8fr]">
            <div>
              <p className="section-label">The rest of the shelf</p>
            </div>
            <div className="border-t border-border">
              {shelf.map((book, index) => (
                <a key={book.title} href={book.href} target="_blank" rel="noreferrer" className="group grid gap-4 border-b border-border py-7 sm:grid-cols-[3rem_1.1fr_0.7fr_1.6fr_auto] sm:items-start sm:gap-6">
                  <span className="font-mono text-xs text-lavender">{String(index + essentials.length + 1).padStart(2, "0")}</span>
                  <h2 className="font-semibold group-hover:text-accent">{book.title}</h2>
                  <p className="text-sm text-muted-foreground">{book.author}</p>
                  <p className="text-sm leading-6 text-muted-foreground">{book.note}</p>
                  <span className="text-sm text-accent">↗</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
