import { siteConfig } from "../content/site";

export default function CallToAction() {
  return (
    <section className="mx-auto max-w-7xl px-5 md:px-8">
      <div className="relative overflow-hidden bg-accent px-6 py-12 text-white md:px-12 md:py-16">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full border-[36px] border-lavender/45" aria-hidden="true" />
        <div className="relative max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/65">Start with the problem</p>
          <h2 className="mt-5 text-4xl font-semibold leading-[1.04] tracking-[-0.045em] md:text-6xl">
            Have a data or AI system worth untangling?
          </h2>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a
              href={siteConfig.calendarUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-white px-5 py-3 text-sm font-semibold text-accent transition-colors hover:bg-lavender-soft"
            >
              Book an intro call
            </a>
            <a href={siteConfig.xUrl} target="_blank" rel="noreferrer" className="border-b border-white/60 pb-1 text-sm text-white/85 hover:text-white">
              Or message me on X
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
