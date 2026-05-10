"use client";

import { useState } from "react";

export interface RoadmapItem {
  id: string;
  date: string;
  title: string;
  subtitle?: string;
  description?: string;
  icon: string;
  accentColor?: string;
  tags?: string[];
  details?: string[];
}

// Default accent colors for items (cycles through these)
const accentColors = [
  "#5cf697", // green
  "#3b82f6", // blue
  "#a855f7", // purple
  "#f97316", // orange
  "#06b6d4", // cyan
  "#ec4899", // pink
];

interface RoadmapProps {
  items: RoadmapItem[];
  accentColor?: string;
}

export function Roadmap({ items, accentColor }: RoadmapProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const getAccent = (index: number, itemColor?: string) => {
    if (itemColor) return itemColor;
    if (accentColor) return accentColor;
    return accentColors[index % accentColors.length];
  };

  return (
    <div className="roadmap-container">
      {/* Timeline track */}
      <div className="roadmap-track" />

      {/* Timeline items - render in order provided (newest first) */}
      {items.map((item, index) => {
        const color = getAccent(index, item.accentColor);
        const isActive = activeId === item.id;

        return (
          <div key={item.id} className="roadmap-item">
            {/* Node marker */}
            <div className="roadmap-marker">
              <button
                onClick={() => setActiveId(isActive ? null : item.id)}
                className={`marker-dot ${isActive ? "active" : ""}`}
                style={{ "--accent": color } as React.CSSProperties}
                aria-label={`Toggle ${item.title}`}
              >
                <span className="marker-icon">{item.icon}</span>
              </button>
            </div>

            {/* Content card */}
            <div className="roadmap-content">
              <button
                onClick={() => setActiveId(isActive ? null : item.id)}
                className={`roadmap-card ${isActive ? "active" : ""}`}
                style={{ "--accent": color } as React.CSSProperties}
              >
                {/* Date badge */}
                <div className="card-date" style={{ color }}>
                  {item.date}
                </div>

                {/* Title row */}
                <div className="card-header">
                  <h3 className="card-title">{item.title}</h3>
                  {item.subtitle && (
                    <span className="card-subtitle">{item.subtitle}</span>
                  )}
                </div>

                {/* Description */}
                {item.description && (
                  <p className="card-description">{item.description}</p>
                )}

                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                  <div className="card-tags">
                    {item.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Expand indicator */}
                {item.details && item.details.length > 0 && (
                  <div className="card-expand">
                    <svg
                      className={`chevron ${isActive ? "rotated" : ""}`}
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
                  </div>
                )}
              </button>

              {/* Expanded details */}
              {item.details && item.details.length > 0 && (
                <div className={`roadmap-details ${isActive ? "open" : ""}`}>
                  <ul className="details-list">
                    {item.details.map((detail, i) => (
                      <li key={i} className="detail-item">
                        <svg
                          className="check-icon"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          style={{ color }}
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Timeline data - easily configurable
// Order: Newest first, oldest last (top to bottom)
export const roadmapData: RoadmapItem[] = [
  {
    id: "remarket-sr",
    date: "2026 — Present",
    title: "ReMarkets",
    subtitle: "Senior Data Analyst",
    icon: "🚀",
    accentColor: "#5cf697",
    tags: ["Agents", "Microsoft Fabric", "Workflow Automation"],
    details: [
      "One man pod leading data, analytics, planning, and workflow automation organization wide.",
      "'Formalizing the harness'",
    ],
  },
  {
    id: "remarket-da",
    date: "2024 — 2026",
    title: "ReMarkets",
    subtitle: "Data Analyst",
    icon: "🏢",
    tags: ["Power BI", "Ops Planning", "Microsoft Fabric"],
    details: [
      "Leading all planning, analytics, and data since program inception.",
      "Core operations models (production/labor/materials planning)",
      "Established data warehousing in Fabric. Laid the foundation for an agent layer.",
    ],
  },
  {
    id: "aga",
    date: "2021 — 2022",
    title: "Accelerated Growth Advisors",
    subtitle: "Associate",
    icon: "💼",
    tags: ["Power BI", "Azure", "DAX"],
    details: [
      "Built executive dashboards and KPI tracking systems",
      "Implemented cloud data warehouse solutions",
      "Automated reporting workflows",
    ],
  },
  {
    id: "education",
    date: "2017 — 2020",
    title: "Purdue University",
    subtitle: "BS Economics",
    icon: "🎓",
    tags: ["Data Science", "Economics", "Drinking"],
    details: [
      "Concentration in Data Analytics & Management Consulting",
      "Certificate in Applied Data Science",
      "Certificate in Entrepreneurship & Innovation",
    ],
  },
  {
    id: "early-start",
    date: "2016 and on",
    title: "1121 Capital",
    subtitle: "Quant Trader",
    icon: "📈",
    tags: ["Trading", "Python", "Markets"],
    details: [
      "Started trading, simple analysis, automating execution",
      "Early Robinhood user | moved onchain | dabble in prediction markets.",
      "Having fun, learning, and growing.",
    ],
  },
];