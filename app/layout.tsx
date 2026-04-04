import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Paul Murphy | Enterprise Analytics & Intelligence",
  description: "Senior Data Analyst specializing in Microsoft Fabric, Azure, ETL/ELT pipelines, forecasting models, and AI-augmented automation. Based in Maryland, USA.",
  keywords: ["Data Analyst", "Microsoft Fabric", "Azure", "Python", "Business Intelligence", "Analytics"],
  authors: [{ name: "Paul Murphy" }],
  openGraph: {
    title: "Paul Murphy | Enterprise Analytics & Intelligence",
    description: "Senior Data Analyst specializing in Microsoft Fabric, Azure, and AI-augmented automation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Navigation />
        <main className="pt-16">
          {children}
        </main>
        <footer className="border-t border-muted py-8 mt-20">
          <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Paul Murphy. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a 
                href="https://github.com/dr-pablo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <a 
                href="https://linkedin.com/in/paul-murphy-data" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                LinkedIn
              </a>
              <a 
                href="mailto:pmmurphy34@gmail.com"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
