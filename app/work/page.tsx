import { Metadata } from "next";
import ContactForm from "../components/ContactForm";

export const metadata: Metadata = {
  title: "Work | Paul Murphy",
  description: "Professional experience and career history of Paul Murphy, Senior Data Analyst specializing in Microsoft Fabric, Azure, and AI-augmented analytics.",
};

const skills = [
  "Microsoft Fabric / Azure",
  "Azure AI / Data Services",
  "Python / PySpark",
  "Forecasting / Modeling",
  "Data Architecture",
  "Power BI, DAX, M",
  "Solidity / EVM",
  "React / Node.js",
  "Zoho Analytics",
];

const experience = [
  {
    title: "Senior Data Analyst",
    company: "ReMarkets",
    location: "Greencastle, PA",
    period: "Jan 2026 — Present",
    highlights: [
      "Architect and scale end-to-end ETL/ELT pipelines, driving the company’s core data infrastructure.",
      "Lead development of reporting and analytics systems—transforming complex data into actionable insights for executives and key stakeholders.",
      "Design and deploy workflow automation and AI-assisted tooling, streamlining operations and amplifying efficiency across all teams.",
    ],
  },
  {
    title: "Data Analyst",
    company: "ReMarkets",
    location: "Greencastle, PA",
    period: "Apr 2024 — Jan 2026",
    highlights: [
      // "Built core data foundations in a high-growth reverse logistics environment, resolving cross-functional data gaps and enabling reliable operational reporting.",
      // "Developed automated Python/SQL forecasting models for labor and process complexity, improving staffing accuracy and resource allocation planning.",
      // "Consolidated fragmented Azure resources and eliminated redundant services to reduce cost variability and prepare for Microsoft Fabric migration.",
    ],
  },
  {
    title: "Associate",
    company: "Accelerated Growth Advisors",
    location: "Chicago, IL",
    period: "Jan 2021 — Feb 2022",
    highlights: [
      // "Built Power BI dashboards and Azure data warehouse solutions for clients including BlockFills, Bunker Labs, and Procter & Gamble, enabling faster performance monitoring and decision-making.",
      // "Automated financial and accounting workflows to reduce month-end close by over 10 hours per month and improve reporting accuracy.",
    ],
  },
  {
    title: "Quant Trader",
    company: "1121 Capital, LLC",
    location: "Remote, USA",
    period: "Aug 2016 — Present",
    highlights: [
      // "Design and manage market-making and trading strategies leveraging high-frequency trading frameworks; implement quantitative signals and risk controls.",
      // "Manage a multi-asset investment portfolio for nearly 10 years, achieving returns above relevant market benchmarks.",
    ],
  },
  {
    title: "Market Research",
    company: "MJM Real Estate Holdings, LLC",
    location: "Indianapolis, IN",
    period: "Dec 2019 — Sept 2023",
    highlights: [
      // "Led comprehensive market analysis and acquisition strategy; developed Python tools for scraping filings and automating investment screening to drive data-informed property selections.",
      // "Supported property renovations and administration.",
    ],
  },
];

const education = {
  school: "Purdue University, Daniels School of Business",
  degree: "Bachelor of Science, Economics",
  period: "Aug 2017 — Dec 2020",
  details: [
    "Concentration: Data Analytics & Management Consulting",
    "Certificate: Applied Data Science",
    "Certificate: Entrepreneurship & Innovation",
  ],
};

export default function WorkPage() {
  return (
    <div className="min-h-screen py-20">
      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight gradient-text">
            Professional Experience
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Translating complex data into actionable business insights.
          </p>
        </div>
      </section>

      {/* Core Skills Section */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <h2 className="text-2xl font-semibold mb-8">Core Competencies</h2>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 rounded-full bg-muted text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Current Role Highlight */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <div className="gradient-border rounded-2xl p-8 glow">
          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium mb-3">
                Currently
              </span>
              <h2 className="text-2xl font-semibold">Senior Data Analyst</h2>
              <p className="text-accent font-medium">ReMarkets</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Jan 2026 — Present</p>
              <p className="text-sm text-muted-foreground">DMV</p>
            </div>
          </div>
          <ul className="space-y-3">
            {experience[0].highlights.map((highlight, index) => (
              <li key={index} className="flex gap-3 text-muted-foreground">
                <span className="text-accent mt-2">•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <h2 className="text-2xl font-semibold mb-8">Career History</h2>
        <div className="space-y-16">
          {experience.slice(1).map((job, index) => (
            <div key={index} className="relative pl-8 border-l border-muted">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-muted-foreground" />
              <div className="space-y-4">
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <p className="text-accent font-medium">{job.company}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {job.highlights.map((highlight, hIndex) => (
                    <li key={hIndex} className="flex gap-3 text-muted-foreground">
                      <span className="text-muted-foreground mt-2">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <h2 className="text-2xl font-semibold mb-8">Education</h2>
        <div className="gradient-border rounded-2xl p-8 glow">
          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
            <div>
              <h3 className="text-xl font-semibold">{education.degree}</h3>
              <p className="text-accent font-medium">{education.school}</p>
            </div>
            <p className="text-sm text-muted-foreground">{education.period}</p>
          </div>
          <ul className="space-y-2">
            {education.details.map((detail, index) => (
              <li key={index} className="flex gap-3 text-muted-foreground">
                <span className="text-accent">•</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Certifications */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <h2 className="text-2xl font-semibold mb-8">Certifications</h2>
        <div className="flex flex-wrap gap-4">
          <div className="px-6 py-4 rounded-xl bg-muted">
            <p className="font-medium">OSHA 10-Hour</p>
            <p className="text-sm text-muted-foreground">360Training • Oct 2025</p>
          </div>
        </div>
      </section>

      {/* Resume Download CTA */}
      <section className="py-32 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Want the Full Resume?
          </h2>
          <p className="text-muted-foreground mb-12 max-w-xl mx-auto">
            Submit your info and download my complete resume with all positions and details.
          </p>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
