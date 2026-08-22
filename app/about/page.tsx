import type { Metadata } from "next";
import CallToAction from "../components/CallToAction";
import { experience, siteConfig } from "../content/site";

export const metadata: Metadata = {
  title: "About",
  description: "About Paul Murphy, an analytics, data platform, and applied AI practitioner based in Maryland.",
};

export default function AboutPage() {
  return (
    <div>
      <header className="site-grid border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[0.75fr_1.8fr] md:px-8 md:py-24">
          <div>
            <p className="section-label">About / Paul Murphy</p>
          </div>
          <div>
            <h1 className="max-w-5xl text-5xl font-semibold leading-[0.96] tracking-[-0.06em] md:text-7xl">
              An operator who happens to build data systems.
            </h1>
            <p className="mt-8 max-w-3xl text-xl leading-9 text-muted-foreground">
              I work best where the data is messy, the operating problem is real, and the answer needs to survive contact with the business.
            </p>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[0.75fr_1.8fr] md:px-8 md:py-24">
        <div>
          <p className="section-label">The through line</p>
        </div>
        <div className="grid gap-10 text-lg leading-8 lg:grid-cols-2">
          <div>
            <p>
              My path started with markets and economics, moved through consulting and business intelligence, and eventually landed in end-to-end ownership of analytics, planning, infrastructure, and AI systems.
            </p>
            <p className="mt-6">
              That mix matters. I am comfortable in Python and platform architecture, but I care most about what the system changes: a contract, a staffing plan, a reporting cycle, or the speed of a decision.
            </p>
          </div>
          <div className="text-muted-foreground">
            <p>
              I tend to work from the constraint backward. Understand the economics, find the decision that is failing, establish the data underneath it, and then make the result useful to the people operating the business.
            </p>
            <p className="mt-6">
              Based in Maryland. Outside work, I spend time on fitness, bass fishing, live music, markets, and whatever technical project has taken over the desk that week.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-lavender-soft/55">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[0.75fr_1.8fr] md:px-8 md:py-20">
          <div>
            <p className="section-label">Experience</p>
          </div>
          <div className="border-t border-border">
            {experience.map((item) => (
              <article key={`${item.period}-${item.organization}`} className="grid gap-3 border-b border-border py-7 sm:grid-cols-[7rem_1fr_1.5fr] sm:gap-6">
                <p className="font-mono text-xs text-lavender">{item.period}</p>
                <div>
                  <h2 className="font-semibold">{item.organization}</h2>
                  <p className="mt-1 text-sm text-accent">{item.role}</p>
                </div>
                <p className="text-sm leading-6 text-muted-foreground">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[0.75fr_1.8fr] md:px-8 md:py-24">
        <div>
          <p className="section-label">Independent lab</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="technical-card p-6 md:p-8">
            <p className="text-2xl font-semibold leading-9 tracking-[-0.03em]">
              A private Linux compute cluster for local agents, remote jobs, and learning by building.
            </p>
            <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
              I assembled the machines from mixed hardware, run workloads in Docker, and drive the cluster or workstation from a MacBook over a private Tailscale network and SSH. Local models come through Hugging Face and Ollama; useful outputs return to the main workstation or GitHub.
            </p>
            <p className="mt-7 font-mono text-[0.67rem] uppercase tracking-[0.12em] text-accent">
              Private by design / no public ingress / no live telemetry
            </p>
          </div>
          <div className="bg-green-soft p-6 md:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">Working kit</p>
            <ul className="mt-8 space-y-3 text-sm">
              {["Ubuntu + Pop!_OS", "Docker + Compose", "Tailscale + SSH", "Ollama + Hugging Face", "Local coding agents"].map((item) => (
                <li key={item} className="border-b border-accent/20 pb-3">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-border">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-[0.75fr_1.8fr] md:px-8">
          <p className="section-label">Elsewhere</p>
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm font-semibold">
            <a href={siteConfig.linkedinUrl} target="_blank" rel="noreferrer" className="border-b border-border pb-1 hover:border-accent hover:text-accent">LinkedIn ↗</a>
            <a href={siteConfig.githubUrl} target="_blank" rel="noreferrer" className="border-b border-border pb-1 hover:border-accent hover:text-accent">GitHub ↗</a>
            <a href={siteConfig.xUrl} target="_blank" rel="noreferrer" className="border-b border-border pb-1 hover:border-accent hover:text-accent">X ↗</a>
            <a href="/blog" className="border-b border-border pb-1 hover:border-accent hover:text-accent">Writing ↗</a>
            <a href="/reading" className="border-b border-border pb-1 hover:border-accent hover:text-accent">Reading ↗</a>
          </div>
        </div>
      </section>

      <div className="pt-24">
        <CallToAction />
      </div>
    </div>
  );
}
