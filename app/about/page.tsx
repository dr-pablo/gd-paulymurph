import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CallToAction from "../components/CallToAction";
import { credentials, education, siteConfig, skillset } from "../content/site";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description: "About Paul Murphy, an independent data and AI consultant with experience across consumer products, logistics, and manufacturing.",
  path: "/about",
});

export default function AboutPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <section className="site-grid border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <p className="section-label">About Paul Murphy</p>
          <div className="mt-10 grid gap-10 lg:grid-cols-[0.78fr_1.35fr] lg:gap-16">
            <div>
              <div className="relative aspect-[4/5] max-w-md overflow-hidden border border-border bg-lavender-soft">
                <Image
                  src="/paul-murphy-headshot-2.png"
                  alt="Paul Murphy"
                  fill
                  priority
                  sizes="(min-width: 1024px) 32vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-x-6 bottom-6 border border-foreground/20 bg-background/85 p-5 backdrop-blur-sm">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.15em] text-muted-foreground">Paul Murphy</p>
                  <p className="mt-2 text-sm font-semibold">Founder / Principal Consultant</p>
                </div>
              </div>
            </div>

            <div>
              <h1 className="text-5xl font-semibold leading-[0.96] tracking-[-0.06em] md:text-7xl">Paul Murphy</h1>
              <div className="mt-8 max-w-3xl text-lg leading-8">
                <p>
                  My background crosses economics, consulting, analytics, operations, and engineering. That range helps me translate between what a business needs and what a technical system must do to support it.
                </p>
                <p className="mt-5 text-muted-foreground">
                  My core industry experience spans consumer products, logistics, manufacturing, reverse logistics, and financial operations: environments where data drives daily decisions and efficiency directly affects margin, service, and growth.
                </p>
                <p className="mt-5 text-muted-foreground">
                  Today I work directly with leaders to identify the decisions, workflows, and constraints that matter most, then trace those needs back to the data and systems supporting them. That can mean consolidating fragmented reporting, creating a dependable operating view, automating a recurring process, or building an AI interface that helps people reach trusted information faster. I stay close from problem definition through delivery so the result fits how the business actually runs.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-14 border-t border-border">
            <p className="py-4 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent">Skills and experience</p>
            <div className="grid grid-cols-2 border-l border-t border-border lg:grid-cols-4">
              {skillset.map((skill) => (
                <div key={skill.name} className="border-b border-r border-border bg-paper p-5 md:p-7">
                  <p className="text-lg font-semibold md:text-xl">{skill.name}</p>
                  <p className="mt-3 min-h-10 text-xs leading-5 text-muted-foreground">{skill.detail}</p>
                  <p className="metric-value mt-5 text-2xl font-semibold text-accent md:text-3xl">{currentYear - skill.startYear}+ years</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 grid gap-8 border-t border-border pt-10 md:grid-cols-[0.78fr_1.35fr] md:gap-16">
            <div>
              <p className="section-label">Education + credentials</p>
              <p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">Formal education and individual certifications supporting the work.</p>
            </div>
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">Credentials</p>
                <div className="mt-4 border-l border-t border-border">
                  {credentials.map((credential) => (
                    <article key={credential.name} className="border-b border-r border-border bg-paper p-5">
                      <div className="flex items-center gap-3">
                        <Image src={credential.logo} alt="" width={26} height={26} className="h-6.5 w-6.5 object-contain" />
                        <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-accent">{credential.issuer}</p>
                      </div>
                      <h2 className="mt-4 text-lg font-semibold leading-7">{credential.name}</h2>
                      {credential.href && (
                        <a href={credential.href} target="_blank" rel="noreferrer" className="mt-4 inline-block border-b border-border pb-1 text-xs font-semibold hover:border-accent hover:text-accent">
                          Verify credential ↗
                        </a>
                      )}
                    </article>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">Education</p>
                <div className="mt-4 border border-border bg-paper">
                  <article className="p-5">
                    <div className="flex items-center gap-3">
                      <Image src={education.logo} alt="" width={42} height={24} className="h-7 w-12 object-contain object-left" />
                      <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-accent">{education.issuer}</p>
                    </div>
                    <h2 className="mt-5 text-xl font-semibold leading-7">{education.name}</h2>
                  </article>
                  <div className="grid gap-px border-t border-border bg-border sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {education.relatedCredentials.map((credential) => (
                      <div key={credential} className="bg-green-soft/45 p-4">
                        <p className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-muted-foreground">Certification</p>
                        <p className="mt-2 text-sm font-semibold leading-5">{credential}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-[0.75fr_1.8fr] md:px-8">
          <p className="section-label">Elsewhere</p>
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm font-semibold">
            <a href={siteConfig.linkedinUrl} target="_blank" rel="noreferrer" className="border-b border-border pb-1 hover:border-accent hover:text-accent">LinkedIn ↗</a>
            <a href={siteConfig.githubUrl} target="_blank" rel="noreferrer" className="border-b border-border pb-1 hover:border-accent hover:text-accent">GitHub ↗</a>
            <a href={siteConfig.xUrl} target="_blank" rel="noreferrer" className="border-b border-border pb-1 hover:border-accent hover:text-accent">X ↗</a>
            <Link href="/blog" className="border-b border-border pb-1 hover:border-accent hover:text-accent">Writing ↗</Link>
            <Link href="/reading" className="border-b border-border pb-1 hover:border-accent hover:text-accent">Reading ↗</Link>
          </div>
        </div>
      </section>

      <div className="pt-24">
        <CallToAction />
      </div>
    </div>
  );
}
