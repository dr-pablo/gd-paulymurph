import Link from "next/link";
import CallToAction from "./components/CallToAction";
import CaseCard from "./components/CaseCard";
import HeroArtifact from "./components/HeroArtifact";
import PortfolioAssistant from "./components/PortfolioAssistant";
import { capabilities, caseStudies, siteConfig } from "./content/site";

export default function Home() {
  return (
    <div>
      <section className="site-grid border-b border-border">
        <div className="mx-auto grid min-h-[calc(100vh-4.5rem)] max-w-7xl lg:grid-cols-[1.55fr_0.75fr]">
          <div className="flex flex-col justify-between px-5 py-14 md:px-8 md:py-20 lg:border-r lg:border-border lg:py-24">
            <div>
              <p className="section-label animate-fade-in">Paul Murphy / Data & AI Systems</p>
              <h1 className="mt-8 max-w-5xl text-[clamp(3.5rem,8.4vw,7.75rem)] font-semibold leading-[0.88] tracking-[-0.075em]">
                Systems for
                <span className="block text-accent">complex work.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
                I design analytics platforms, forecasting systems, and applied AI that help operating teams move with more clarity, control, and confidence.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <a
                  href={siteConfig.calendarUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                >
                  Book an intro call
                </a>
                <Link href="/work" className="border-b border-foreground pb-1 text-sm font-semibold hover:border-accent hover:text-accent">
                  Explore selected work
                </Link>
              </div>
            </div>
            <div className="mt-18 flex items-end justify-between gap-6 border-t border-border pt-5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
              <span>Analytics / AI / Infrastructure</span>
              <span className="hidden sm:block">Maryland, USA</span>
            </div>
          </div>

          <HeroArtifact />
        </div>
      </section>

      <section className="border-b border-border bg-foreground text-background">
        <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
          {[
            ["End-to-end", "Direct ownership from discovery through operation"],
            ["Production-first", "Useful systems, not disconnected prototypes"],
            ["Business-aware", "Technical choices tied to decisions and economics"],
            ["Low overhead", "Direct collaboration without layers or handoffs"],
          ].map(([value, label], index) => (
            <div key={label} className={`p-5 md:p-7 ${index % 2 === 0 ? "border-r border-white/15" : ""} md:border-r md:border-white/15 md:last:border-r-0`}>
              <p className="text-base font-semibold text-white md:text-lg">{value}</p>
              <p className="mt-2 max-w-52 text-xs leading-5 text-background/60">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-border bg-green-soft/55">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_2fr]">
            <div>
              <p className="section-label">What I build</p>
              <p className="mt-5 max-w-xs text-sm leading-6 text-muted-foreground">
                The useful work usually crosses boundaries. Data foundations, models, interfaces, and operating decisions need to agree.
              </p>
            </div>
            <div className="grid gap-px border border-border bg-border md:grid-cols-3">
              {capabilities.map((capability) => (
                <article key={capability.number} className="bg-paper p-6 md:min-h-72">
                  <span className="font-mono text-xs text-lavender">{capability.number}</span>
                  <h3 className="mt-12 text-2xl font-semibold tracking-[-0.035em]">{capability.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">{capability.description}</p>
                  <p className="mt-8 border-t border-border pt-4 font-mono text-[0.65rem] leading-5 text-accent">{capability.details}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <div>
            <p className="section-label">Selected work</p>
          </div>
          <div>
            <h2 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.05em] md:text-6xl">
              Real systems I designed, built, and operated in production.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground">
              These examples show the work in action: the operating problem, the architecture behind it, my role in delivery, and what changed after it shipped.
            </p>
          </div>
        </div>
        <div className="mt-14 border-b border-border">
          {caseStudies.map((study) => <CaseCard key={study.slug} study={study} />)}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[0.8fr_1.4fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="section-label">Ask the work</p>
          <h2 className="mt-6 max-w-md text-4xl font-semibold leading-[1.05] tracking-[-0.045em] md:text-5xl">The portfolio is queryable.</h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">
            Ask about experience, outcomes, architecture, capabilities, or fit for your problem. Answers stay grounded in the published evidence behind this site.
          </p>
          <Link href="/ask" className="mt-7 inline-flex border-b border-foreground pb-1 text-sm font-semibold hover:text-accent">Open the full assistant</Link>
        </div>
        <PortfolioAssistant compact />
      </section>

      <section className="border-y border-border">
        <div className="mx-auto grid max-w-7xl md:grid-cols-[1fr_2fr]">
          <div className="border-b border-border px-5 py-10 md:border-b-0 md:border-r md:px-8 md:py-14">
            <p className="section-label">Independent lab</p>
          </div>
          <div className="px-5 py-10 md:px-12 md:py-14">
            <p className="max-w-3xl text-xl leading-8 tracking-[-0.02em] md:text-2xl md:leading-9">
              A private Linux compute cluster, assembled from mixed hardware and driven remotely from a MacBook over Tailscale and SSH. It is a practical place to build containerized local agents outside managed cloud platforms.
            </p>
            <p className="mt-6 font-mono text-[0.67rem] uppercase tracking-[0.12em] text-muted-foreground">Linux / Docker Compose / Ollama / Tailscale / SSH</p>
          </div>
        </div>
      </section>

      <div className="pt-24">
        <CallToAction />
      </div>
    </div>
  );
}
