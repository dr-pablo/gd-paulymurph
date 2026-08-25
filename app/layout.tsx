import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import JsonLd from "./components/JsonLd";
import { Analytics } from "@vercel/analytics/next";
import { siteConfig } from "./content/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Paul Murphy | Data & AI Systems",
    template: "%s | Paul Murphy",
  },
  description: siteConfig.description,
  keywords: ["Data and AI Consulting", "Microsoft Fabric", "Applied AI", "Forecasting", "Analytics Engineering", "MCP"],
  authors: [{ name: "Paul Murphy" }],
  creator: "Paul Murphy",
  alternates: { canonical: siteConfig.url },
  openGraph: {
    title: "Paul Murphy | Data & AI Systems",
    description: siteConfig.description,
    type: "website",
    siteName: "Paul Murphy",
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    title: "Paul Murphy | Data & AI Systems",
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personId = `${siteConfig.url}/#person`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": personId,
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      jobTitle: "Data and AI Systems Consultant",
      homeLocation: { "@type": "AdministrativeArea", name: siteConfig.location },
      sameAs: [siteConfig.linkedinUrl, siteConfig.githubUrl, siteConfig.xUrl],
      knowsAbout: [
        "Microsoft Fabric",
        "Analytics platforms",
        "Data engineering",
        "Operational forecasting",
        "Decision systems",
        "Applied AI",
        "Model Context Protocol",
        "Power BI",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: `${siteConfig.name} | ${siteConfig.title}`,
      url: siteConfig.url,
      description: siteConfig.description,
      inLanguage: "en-US",
      publisher: { "@id": personId },
    },
  ];

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <JsonLd data={structuredData} />
        <Navigation />
        <main className="pt-18">
          {children}
        </main>
        <Analytics />
        <footer className="mt-24 border-t border-border bg-foreground py-10 text-background">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-5 md:flex-row md:items-end md:px-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-background/60">Data & AI Systems</p>
              <p className="mt-2 text-xl font-semibold">Paul Murphy</p>
              <p className="mt-4 text-xs text-background/55">Consulting engagements through 1121 Capital LLC.</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <a href={siteConfig.githubUrl} target="_blank" rel="noreferrer" className="text-background/70 hover:text-white">GitHub</a>
              <a href={siteConfig.linkedinUrl} target="_blank" rel="noreferrer" className="text-background/70 hover:text-white">LinkedIn</a>
              <a href={siteConfig.xUrl} target="_blank" rel="noreferrer" className="text-background/70 hover:text-white">X</a>
              <Link href="/blog" className="text-background/70 hover:text-white">Blog</Link>
              <Link href="/reading" className="text-background/70 hover:text-white">Reading</Link>
              <a href={siteConfig.calendarUrl} target="_blank" rel="noreferrer" className="border-b border-lavender pb-1 text-white">Book a call</a>
              <span className="basis-full text-xs text-background/45 md:basis-auto">© {new Date().getFullYear()}</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
