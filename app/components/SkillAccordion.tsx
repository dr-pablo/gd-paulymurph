"use client";

import { useState } from "react";

interface Technology {
  name: string;
  logo: string;
}

interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  technologies: Technology[];
  details: string[];
}

interface SkillAccordionProps {
  categories: SkillCategory[];
}

export function SkillAccordion({ categories }: SkillAccordionProps) {
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  const toggleSkill = (skillId: string) => {
    setExpandedSkill(expandedSkill === skillId ? null : skillId);
  };

  return (
    <div className="grid gap-4">
      {categories.map((category) => (
        <div key={category.id} className="skill-card">
          {/* Clickable Header */}
          <button
            onClick={() => toggleSkill(category.id)}
            className="skill-header"
            aria-expanded={expandedSkill === category.id}
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl">{category.icon}</span>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-foreground">
                  {category.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Tech logos preview */}
              <div className="hidden sm:flex gap-1">
                {category.technologies.slice(0, 3).map((tech) => (
                  <span key={tech.name} className="text-lg" title={tech.name}>
                    {tech.logo}
                  </span>
                ))}
                {category.technologies.length > 3 && (
                  <span className="text-sm text-muted-foreground">
                    +{category.technologies.length - 3}
                  </span>
                )}
              </div>
              {/* Expand/Collapse indicator */}
              <span
                className={`skill-chevron ${expandedSkill === category.id ? "expanded" : ""}`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </div>
          </button>

          {/* Expandable Content */}
          <div
            className={`skill-content ${expandedSkill === category.id ? "open" : ""}`}
          >
            <div className="skill-content-inner">
              {/* Technologies Grid */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                  Technologies & Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {category.technologies.map((tech) => (
                    <div key={tech.name} className="tech-badge">
                      <span className="text-base">{tech.logo}</span>
                      <span>{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Capabilities */}
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                  Key Capabilities
                </h4>
                <ul className="space-y-2">
                  {category.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-accent mt-1.5">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <span className="text-sm text-foreground/90">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export const skillCategories = [
  {
    id: "cloud-data",
    title: "Cloud & Data Engineering",
    description: "Building scalable data infrastructure and analytics platforms",
    icon: "☁️",
    technologies: [
      { name: "Python", logo: "🐍" },
      { name: "Apache Spark", logo: "⚡" },
      { name: "Azure Data Factory", logo: "🇦🇺️" },
      { name: "Azure Synapse", logo: "🔷" },
      { name: "Microsoft Fabric", logo: "🪄" },
      { name: "Databricks", logo: "🐝" },
      { name: "Airflow", logo: "💨" },
      { name: "dbt", logo: "🔺" },
    ],
    details: [
      "Architecting modern data lakes and lakehouses",
      "Building robust ETL/ELT pipelines at scale",
      "Implementing data quality frameworks",
      "Optimizing data warehouse performance",
    ],
  },
  {
    id: "analytics-bi",
    title: "Analytics & Business Intelligence",
    description: "Transforming data into actionable business insights",
    icon: "📊",
    technologies: [
      { name: "Power BI", logo: "📈" },
      { name: "DAX", logo: "🔢" },
      { name: "M Language", logo: "📝" },
      { name: "SQL", logo: "🗄️" },
      { name: "Tableau", logo: "📉" },
      { name: "Looker", logo: "👁️" },
    ],
    details: [
      "Executive dashboards and KPI tracking",
      "Self-service BI implementation",
      "Complex data modeling and calculations",
      "Automated reporting systems",
    ],
  },
  {
    id: "ml-ai",
    title: "Machine Learning & AI",
    description: "Leveraging AI to augment decision-making",
    icon: "🤖",
    technologies: [
      { name: "PyTorch", logo: "🔥" },
      { name: "Scikit-learn", logo: "🧪" },
      { name: "LangChain", logo: "⛓️" },
      { name: "Azure OpenAI", logo: "🧠" },
      { name: "LLM Integration", logo: "💬" },
      { name: "FastAPI", logo: "🚀" },
    ],
    details: [
      "Predictive modeling and forecasting",
      "Natural language processing pipelines",
      "AI-augmented analytics workflows",
      "Model deployment and monitoring",
    ],
  },
  {
    id: "cloud-platforms",
    title: "Cloud Platforms",
    description: "Multi-cloud architecture and deployment",
    icon: "🌐",
    technologies: [
      { name: "Azure", logo: "Azure" },
      { name: "AWS", logo: "AWS" },
      { name: "GCP", logo: "GCP" },
      { name: "Microsoft Fabric", logo: "🪄" },
      { name: "Snowflake", logo: "❄️" },
    ],
    details: [
      "Cross-platform data integration",
      "Cost optimization strategies",
      "Security and compliance frameworks",
      "Infrastructure as code",
    ],
  },
  {
    id: "dev-web",
    title: "Development & Web",
    description: "Full-stack development capabilities",
    icon: "💻",
    technologies: [
      { name: "React", logo: "⚛️" },
      { name: "Node.js", logo: "🟢" },
      { name: "TypeScript", logo: "📘" },
      { name: "Next.js", logo: "▲" },
      { name: "Solidity", logo: "💎" },
      { name: "EVM", logo: "⛽" },
    ],
    details: [
      "Interactive data visualizations",
      "Custom analytics tooling",
      "Web3/blockchain integrations",
      "API development and integration",
    ],
  },
  {
    id: "quant-finance",
    title: "Quantitative Finance",
    description: "Algorithmic trading and financial modeling",
    icon: "📈",
    technologies: [
      { name: "Trading Systems", logo: "📊" },
      { name: "Risk Models", logo: "⚖️" },
      { name: "Portfolio Analytics", logo: "💹" },
      { name: "Time Series", logo: "📅" },
    ],
    details: [
      "Quantitative strategy development",
      "Risk management frameworks",
      "Multi-asset portfolio analysis",
      "Market microstructure analysis",
    ],
  },
];