import type { Metadata } from "next";
import Link from "next/link";
import { getQuickStart, quickStarts } from "../../content/quickstarts";
import { createPageMetadata } from "../../../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Scope a Launch Kit",
  description: "Share the focused implementation you want to put into production.",
  path: "/quickstarts/inquire",
});

type Props = {
  searchParams: Promise<{
    quickstart?: string;
    status?: string;
    phase?: string;
  }>;
};

export default async function QuickStartInquiryPage({ searchParams }: Props) {
  const query = await searchParams;
  const selectedQuickStart = query.quickstart ? getQuickStart(query.quickstart) : undefined;
  const sent = query.status === "sent";
  const error = query.status === "error";

  return (
    <div>
      <header className="site-grid border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
          <Link href={selectedQuickStart ? `/${selectedQuickStart.slug}` : "/quickstarts"} className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground hover:text-accent">
            ← {selectedQuickStart ? `Back to ${selectedQuickStart.name}` : "All Launch Kits"}
          </Link>
          <p className="section-label mt-12">Launch Kit inquiry</p>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-7xl">
            Scope your <span className="text-accent">implementation.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
            Share the use case and current environment. You&apos;ll receive a direct response about fit, scope, and the practical next step.
          </p>
        </div>
      </header>

      <section id="inquiry" className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[0.7fr_1.7fr] md:px-8 md:py-24">
        <div>
          <p className="section-label">Project brief</p>
          <p className="mt-5 max-w-xs text-sm leading-6 text-muted-foreground">
            No scheduling required. This form starts with the implementation you selected.
          </p>
        </div>
        <div className="max-w-3xl">
          {sent ? (
            <div className="border border-accent bg-green-soft/55 p-7 md:p-9" role="status">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">Inquiry received</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">Your Launch Kit brief is on its way.</h2>
              <p className="mt-4 leading-7 text-muted-foreground">Paul will review the use case and respond with fit, scope, and next steps.</p>
              <Link href="/quickstarts" className="mt-6 inline-flex text-sm font-semibold text-accent">Return to Launch Kits →</Link>
            </div>
          ) : (
            <form action="/api/quickstarts" method="post" className="grid gap-6 border border-border bg-paper p-6 shadow-[0_18px_50px_rgba(21,24,21,0.05)] md:grid-cols-2 md:p-9">
              {error && (
                <p className="border border-red-800/25 bg-red-50 p-4 text-sm text-red-900 md:col-span-2" role="alert">
                  The inquiry could not be sent. Check the fields and try again, or use the main introduction link.
                </p>
              )}
              <label className="grid gap-2 text-sm font-semibold">
                Name
                <input name="name" autoComplete="name" required maxLength={100} className="border border-border bg-white px-4 py-3 font-normal" />
              </label>
              <label className="grid gap-2 text-sm font-semibold">
                Company
                <input name="company" autoComplete="organization" required maxLength={120} className="border border-border bg-white px-4 py-3 font-normal" />
              </label>
              <label className="grid gap-2 text-sm font-semibold md:col-span-2">
                Work email
                <input name="email" type="email" autoComplete="email" required maxLength={180} className="border border-border bg-white px-4 py-3 font-normal" />
              </label>
              <label className="grid gap-2 text-sm font-semibold md:col-span-2">
                Launch Kit
                <select name="quickstart" required defaultValue={selectedQuickStart?.slug ?? ""} className="border border-border bg-white px-4 py-3 font-normal">
                  <option value="" disabled>Select a Launch Kit</option>
                  {quickStarts.map((quickStart) => (
                    <option key={quickStart.slug} value={quickStart.slug}>{quickStart.inquiryLabel}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-semibold md:col-span-2">
                Brief description of the use case
                <textarea name="useCase" required maxLength={3000} rows={6} className="resize-y border border-border bg-white px-4 py-3 font-normal" placeholder="What should the completed implementation do, and who will use it?" />
              </label>
              <label className="grid gap-2 text-sm font-semibold md:col-span-2">
                Current technology stack <span className="font-normal text-muted-foreground">(optional)</span>
                <textarea name="technologyStack" maxLength={1500} rows={3} className="resize-y border border-border bg-white px-4 py-3 font-normal" placeholder="Microsoft 365, Teams, SharePoint, Power Platform, CRM, ERP, or other relevant systems" />
              </label>
              <label className="hidden" aria-hidden="true">
                Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
              <input type="hidden" name="phase" value={query.phase === "next" ? "next" : "quickstart"} />
              <div className="flex flex-wrap items-center gap-4 md:col-span-2">
                <button type="submit" className="bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-hover">Submit Launch Kit Brief</button>
                <p className="text-xs leading-5 text-muted-foreground">Your details are used only to respond to this inquiry.</p>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
