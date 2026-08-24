import type { CuratedLink } from "../../content/links";

function formatAddedAt(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export default function CuratedLinks({
  links,
  title = "Suggested reading",
  description = "Useful context from elsewhere on the web.",
}: {
  links: CuratedLink[];
  title?: string;
  description?: string;
}) {
  if (!links.length) return null;

  return (
    <section className="border-y border-border bg-lavender-soft/40">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-8 md:grid-cols-[0.75fr_1.8fr]">
          <div>
            <p className="section-label">From elsewhere</p>
            <h2 className="mt-5 text-2xl font-semibold tracking-[-0.035em]">{title}</h2>
            <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">{description}</p>
          </div>
          <div className="grid gap-px border border-border bg-border lg:grid-cols-3">
            {links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="group flex min-h-72 flex-col justify-between bg-paper p-5 hover:bg-green-soft/70 md:p-6"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground">
                    <span>{link.publisher}</span>
                    <time dateTime={link.addedAt}>{formatAddedAt(link.addedAt)}</time>
                  </div>
                  <h3 className="mt-8 text-xl font-semibold leading-7 tracking-[-0.03em] group-hover:text-accent">{link.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">{link.note}</p>
                </div>
                <div className="mt-8 flex items-end justify-between gap-4 border-t border-border pt-4">
                  <span className="font-mono text-[0.6rem] uppercase leading-5 tracking-[0.1em] text-accent">{link.tags.join(" / ")}</span>
                  <span className="text-accent" aria-hidden="true">↗</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
