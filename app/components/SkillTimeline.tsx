"use client";

import { useState } from "react";

interface TimelineNode {
  id: string;
  period: string;
  role: string;
  organization: string;
  icon: string;
  summary: string;
  skills: string[];
  skillsDetail: { name: string; logo: string; category: string }[];
  expanded: string[];
}

const timelineData: TimelineNode[] = [
  {
    id: "quant-trader",
    period: "2016 — Present",
    role: "Quant Trader",
    organization: "1121 Capital",
    icon: "📈",
    summary: "Algorithmic trading & portfolio management",
    skills: ["Quantitative Finance", "Trading Systems", "Risk Management"],
    skillsDetail: [
      { name: "Trading Systems", logo: "📊", category: "Dev" },
      { name: "Risk Models", logo: "⚖️", category: "Finance" },
      { name: "Portfolio Analytics", logo: "💹", category: "Finance" },
      { name: "Time Series Analysis", logo: "📅", category: "ML" },
      { name: "Python", logo: "🐍", category: "Dev" },
    ],
    expanded: ["trading-systems", "risk-models"],
  },
  {
    id: "purdue",
    period: "2017 — 2020",
    role: "BS Economics, Data Analytics",
    organization: "Purdue University",
    icon: "🎓",
    summary: "Data Science foundations & business acumen",
    skills: ["Data Science", "Economics", "Analytics"],
    skillsDetail: [
      { name: "Data Analytics", logo: "📊", category: "BI" },
      { name: "Economics", logo: "📈", category: "Domain" },
      { name: "Applied Data Science", logo: "🧪", category: "ML" },
      { name: "SQL", logo: "🗄️", category: "Dev" },
      { name: "Entrepreneurship", logo: "🚀", category: "Domain" },
    ],
    expanded: [],
  },
  {
    id: "aga",
    period: "2021 — 2022",
    role: "Associate",
    organization: "Accelerated Growth Advisors",
    icon: "💼",
    summary: "Client consulting & dashboard solutions",
    skills: ["Business Intelligence", "Cloud Data", "Automation"],
    skillsDetail: [
      { name: "Power BI", logo: "📈", category: "BI" },
      { name: "DAX", logo: "🔢", category: "BI" },
      { name: "Azure Data Warehouse", logo: "☁️", category: "Cloud" },
      { name: "Power Automate", logo: "⚡", category: "Dev" },
      { name: "Financial Modeling", logo: "📊", category: "Finance" },
      { name: "Python", logo: "🐍", category: "Dev" },
    ],
    expanded: ["power-bi", "azure"],
  },
  {
    id: "remarket-da",
    period: "2024 — 2026",
    role: "Data Analyst",
    organization: "ReMarkets",
    icon: "🏢",
    summary: "Forecasting models & cloud infrastructure",
    skills: ["Machine Learning", "Cloud Architecture", "Forecasting"],
    skillsDetail: [
      { name: "Python/SQL Forecasting", logo: "🐍", category: "ML" },
      { name: "Azure Data Factory", logo: "☁️", category: "Cloud" },
      { name: "Azure Synapse", logo: "🔷", category: "Cloud" },
      { name: "Microsoft Fabric", logo: "🪄", category: "Cloud" },
      { name: "Data Modeling", logo: "🏗️", category: "Data" },
      { name: "Reporting Systems", logo: "📋", category: "BI" },
    ],
    expanded: ["forecasting", "azure-fabric"],
  },
  {
    id: "remarket-sr",
    period: "2026 — Present",
    role: "Senior Data Analyst",
    organization: "ReMarkets",
    icon: "🚀",
    summary: "AI-augmented analytics & data infrastructure",
    skills: ["AI/LLM Integration", "Data Engineering", "Leadership"],
    skillsDetail: [
      { name: "LLM Integration", logo: "🤖", category: "AI" },
      { name: "LangChain", logo: "⛓️", category: "AI" },
      { name: "Azure OpenAI", logo: "🧠", category: "AI" },
      { name: "FastAPI", logo: "🚀", category: "Dev" },
      { name: "PySpark", logo: "⚡", category: "Data" },
      { name: "dbt", logo: "🔺", category: "Data" },
      { name: "ETL/ELT Pipelines", logo: "🔄", category: "Data" },
      { name: "Databricks", logo: "🐝", category: "Data" },
    ],
    expanded: ["ai-integration", "data-platforms"],
  },
];

const categoryColors: Record<string, string> = {
  AI: "ai",
  ML: "ml",
  BI: "bi",
  Cloud: "cloud",
  Data: "data",
  Dev: "dev",
  Finance: "finance",
  Domain: "domain",
};

export function SkillTimeline() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <div className="skill-timeline">
      {/* Timeline Line */}
      <div className="timeline-line" />

      {/* Timeline Nodes */}
      {timelineData.map((node, index) => (
        <div
          key={node.id}
          className={`timeline-node ${activeNode === node.id ? "active" : ""}`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* Node Connector */}
          <div className="timeline-connector">
            <button
              onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
              className="node-dot"
              aria-label={`Expand ${node.role}`}
            >
              <span className="node-icon">{node.icon}</span>
            </button>
          </div>

          {/* Node Content */}
          <div className="timeline-content">
            <button
              onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
              className="timeline-card"
            >
              <div className="card-header">
                <div className="card-meta">
                  <span className="period-badge">{node.period}</span>
                  <span className="organization">{node.organization}</span>
                </div>
                <h3 className="role-title">{node.role}</h3>
                <p className="role-summary">{node.summary}</p>
              </div>

              {/* Skill Tags Preview */}
              <div className="skill-tags">
                {node.skills.slice(0, 3).map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
                {node.skills.length > 3 && (
                  <span className="skill-tag more">+{node.skills.length - 3}</span>
                )}
              </div>

              {/* Expand Indicator */}
              <div className="expand-indicator">
                <svg
                  className={`chevron ${activeNode === node.id ? "rotated" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {/* Expanded Details */}
            <div className={`expanded-content ${activeNode === node.id ? "open" : ""}`}>
              <div className="expanded-inner">
                {/* Skills Grid */}
                <div className="skills-grid">
                  <h4 className="section-label">Technologies & Skills</h4>
                  <div className="skills-list">
                    {node.skillsDetail.map((skill) => (
                      <div
                        key={skill.name}
                        className={`skill-item ${categoryColors[skill.category]}`}
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <span className="skill-logo">{skill.logo}</span>
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-category">{skill.category}</span>
                        {hoveredSkill === skill.name && (
                          <div className="skill-tooltip">
                            <span className="tooltip-category">{skill.category}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Focus Areas */}
                <div className="focus-areas">
                  <h4 className="section-label">Focus Areas</h4>
                  <ul className="focus-list">
                    {node.skills.map((skill, idx) => (
                      <li key={idx} className="focus-item">
                        <svg className="check-icon" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}