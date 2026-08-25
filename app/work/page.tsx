import type { Metadata } from "next";
import CallToAction from "../components/CallToAction";
import CaseCard from "../components/CaseCard";
import FlowDiagram from "../components/FlowDiagram";
import { caseStudies } from "../content/site";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Selected Work",
  description: "Selected data platform, operational forecasting, and applied AI systems designed and delivered by Paul Murphy.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <div>
      <header className="site-grid border-b border-border">
        <div className="mx-auto grid max-w-7xl px-5 py-16 md:grid-cols-[1fr_2fr] md:px-8 md:py-24">
          <p className="section-label">Selected work / 2024-2026</p>
          <div className="mt-10 md:mt-0">
            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.96] tracking-[-0.06em] md:text-7xl">
              Evidence over credentials.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
              Three connected systems spanning commercial models, platform architecture, and production AI. Client details are limited; the decisions, methods, and outcomes are not.
            </p>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="border-b border-border">
          {caseStudies.map((study) => <CaseCard key={study.slug} study={study} headingLevel="h2" />)}
        </div>
      </section>

      <section className="border-y border-border bg-lavender-soft/60">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-[0.7fr_1.5fr]">
          <div>
            <p className="section-label">Working model</p>
            <p className="mt-5 max-w-xs text-sm leading-6 text-muted-foreground">
              Start with the operating constraint, then build only enough system to change the decision.
            </p>
          </div>
          <FlowDiagram compact steps={["Diagnose the constraint", "Design the decision system", "Build the foundation", "Deliver into the workflow", "Measure the outcome", "Operate + improve"]} />
        </div>
      </section>

      <div className="pt-24">
        <CallToAction />
      </div>
    </div>
  );
}
