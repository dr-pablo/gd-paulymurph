import Link from "next/link";
import Image from "next/image";
import HeroArtifact from "./components/HeroArtifact";
import PortfolioAssistant from "./components/PortfolioAssistant";
import { offers, officialPartners, siteConfig, technologyEcosystem } from "./content/site";

export default function Home() {
  return (
    <div>
      <section className="site-grid border-b border-border">
        <div className="mx-auto grid min-h-[calc(100vh-4.5rem)] max-w-7xl lg:grid-cols-[1.55fr_0.75fr]">
          <div className="flex flex-col justify-between px-5 py-14 md:px-8 md:py-20 lg:border-r lg:border-border lg:py-24">
            <div>
              <p className="section-label animate-fade-in">Data + AI consulting for growing businesses</p>
              <h1 className="mt-8 max-w-5xl text-[clamp(3.5rem,8.4vw,7.75rem)] font-semibold leading-[0.88] tracking-[-0.075em]">
                Systems for
                <span className="block text-accent">complex work.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
                I turn disconnected systems and scattered data into one clear view of your business, and build AI tools that take work off your team’s plate.
              </p>
              <div className="mt-10 flex flex-wrap items-start gap-5">
                <div>
                  <a
                    href={siteConfig.aiEssentialsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                  >
                    Free AI Essentials Consultation
                  </a>
                  <p className="mt-2 text-xs font-semibold text-accent">Walk away with your own AI-powered daily brief.</p>
                </div>
                <Link href="/work" className="text-xs font-semibold text-muted-foreground transition-colors hover:text-accent">
                  See selected work ↗
                </Link>
              </div>
            </div>
            <div className="mt-14 border border-border bg-paper/90 shadow-[0_18px_50px_rgba(21,24,21,0.06)] backdrop-blur-sm">
              <div className="grid items-center gap-4 px-5 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-accent">Core Platforms</p>
                <div className="flex flex-wrap items-center justify-center justify-self-center gap-x-6 gap-y-3">
                  {officialPartners.map((partner) => (
                    <div key={partner.name} className="flex items-center gap-3">
                      <Image src={partner.logo} alt="" width={36} height={36} className="h-9 w-9 shrink-0 object-contain" />
                      <span className="text-base font-semibold">{partner.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-3 border-t border-border px-4 py-3 sm:grid-cols-[10rem_1fr] sm:items-center sm:gap-6">
                <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-accent">Technology Ecosystem</p>
                <div className="flex flex-wrap justify-center justify-self-center gap-3">
                  {technologyEcosystem.map((technology) => (
                    <div key={technology.name} className="flex items-center gap-2">
                      <Image src={technology.logo} alt="" width={24} height={24} className="h-6 w-6 shrink-0 object-contain" />
                      <span className="hidden text-xs font-semibold md:inline">{technology.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <HeroArtifact />
        </div>
      </section>

      <section className="border-b border-border bg-green-soft/55">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
          <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_2fr] lg:gap-12">
            <div className="max-w-xl">
              <p className="section-label">Two ways I help</p>
              <h2 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-[-0.045em] md:text-5xl lg:text-4xl xl:text-5xl">
                Clearer decisions. More productive teams.
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Whether you need reporting you can finally rely on or a practical way to put AI to work,{" "}
                <strong className="mt-5 block border-l-2 border-accent pl-5 text-xl font-semibold leading-8 tracking-[-0.02em] text-accent">
                  I take your project from the business problem through implementation.
                </strong>
              </p>
            </div>
            <div>
              <div className="grid gap-px border border-border bg-border md:grid-cols-2">
                {offers.map((offer) => (
                  <article key={offer.number} className="flex flex-col bg-paper p-6">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-mono text-xs text-lavender">{offer.number}</span>
                      <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground">{offer.eyebrow}</span>
                    </div>
                    <h3 className="mt-6 max-w-lg text-2xl font-semibold leading-tight tracking-[-0.04em]">{offer.title}</h3>
                    <p className="mt-4 max-w-xl text-base leading-6 text-muted-foreground">{offer.description}</p>
                    <ul className="mt-6 grid grid-cols-2 gap-3 border-t border-border pt-4 text-xs font-semibold">
                      {offer.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}
                    </ul>
                    <Link href={offer.href} className="mt-auto pt-6 text-sm font-semibold text-accent hover:text-accent-hover">
                      {offer.linkLabel} ↗
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-lavender-soft/55">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:grid-cols-[1fr_1.5fr] md:items-center md:px-8 md:py-18">
          <div>
            <p className="section-label">Free executive AI essentials training</p>
            <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-4xl">Lead the AI conversation with clarity.</h2>
          </div>
          <div>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              A no-cost, plain-language session for executives who want to understand where AI can create value, how to evaluate opportunities, and what responsible adoption requires. No technical background needed.
            </p>
            <a href={siteConfig.aiEssentialsUrl} target="_blank" rel="noreferrer" className="mt-7 inline-flex bg-foreground px-5 py-3 text-sm font-semibold text-background hover:bg-accent">
              Book the executive training
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[0.8fr_1.4fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="section-label">Talk to the work</p>
          <h2 className="mt-6 max-w-md text-4xl font-semibold leading-[1.05] tracking-[-0.045em] md:text-5xl">Ask about the systems behind the outcomes.</h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">
            This assistant is the quickest way to explore my experience, results, approach, or fit for your problem. Every answer stays grounded in the work published here.
          </p>
          <Link href="/work" className="mt-7 inline-flex border-b border-foreground pb-1 text-sm font-semibold hover:text-accent">Prefer to read? View the work</Link>
        </div>
        <PortfolioAssistant compact />
      </section>
    </div>
  );
}
