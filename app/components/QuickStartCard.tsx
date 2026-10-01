import Link from "next/link";
import { formatQuickStartPrice, type QuickStart } from "../content/quickstarts";

export default function QuickStartCard({ quickStart }: { quickStart: QuickStart }) {
  return (
    <article className="group flex min-h-full flex-col bg-paper p-5 transition-colors hover:bg-white md:p-6">
      <h3 className="text-xl font-semibold leading-tight tracking-[-0.035em]">
        {quickStart.name}
      </h3>
      <p className="mt-3 text-sm font-medium leading-6">{quickStart.tagline}</p>
      <p className="mt-5 font-mono text-sm font-semibold text-accent">
        Starting at {formatQuickStartPrice(quickStart.startingPrice)}
      </p>
      <p className="mt-2 text-xs leading-5 text-muted-foreground">
        Typical delivery: {quickStart.timeline}
      </p>
      <Link
        href={`/${quickStart.slug}`}
        className="mt-auto pt-6 text-sm font-semibold text-accent transition-colors group-hover:text-accent-hover"
      >
        Explore <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
