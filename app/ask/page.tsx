import type { Metadata } from "next";
import PortfolioAssistant from "../components/PortfolioAssistant";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Ask the Work",
  description: "Ask a grounded portfolio assistant about Paul Murphy's data platform, forecasting, and applied AI work.",
  path: "/ask",
});

export default function AskPage() {
  return (
    <div className="site-grid min-h-[calc(100vh-4.5rem)] border-b border-border">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="section-label">Ask / Portfolio system</p>
          <h1 className="mt-7 max-w-xl text-5xl font-semibold leading-[0.96] tracking-[-0.055em] md:text-7xl">
            Query the evidence.
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-8 text-muted-foreground">
            This assistant retrieves from Paul&apos;s approved experience, credentials, capabilities, and case studies. It helps assess fit, cites what it used, and does not have access to former client systems or the private home lab.
          </p>
          <div className="mt-9 border-l-2 border-lavender pl-4 font-mono text-[0.67rem] leading-5 text-muted-foreground">
            No vector database. No mystery corpus. Typed content, explicit retrieval, server-side model boundary. No persistent conversation history.
          </div>
        </div>
        <PortfolioAssistant />
      </div>
    </div>
  );
}
