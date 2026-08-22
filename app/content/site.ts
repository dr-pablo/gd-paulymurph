export const siteConfig = {
  name: "Paul Murphy",
  title: "Data & AI Systems",
  description:
    "Paul Murphy designs analytics platforms, forecasting systems, and applied AI for complex operations.",
  calendarUrl: "https://cal.com/paulymurph",
  xUrl: "https://x.com/pauly_murph",
  githubUrl: "https://github.com/dr-pablo",
  linkedinUrl: "https://www.linkedin.com/in/paul-murphy-24380314a/",
} as const;

export type CaseStudy = {
  slug: string;
  number: string;
  eyebrow: string;
  title: string;
  summary: string;
  context: string;
  challenge: string;
  ownership: string;
  flow: string[];
  results: Array<{ value: string; label: string }>;
  sections: Array<{ title: string; body: string[] }>;
  capabilities: string[];
  stack: string[];
  assistantSummary: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "complexity-to-unit-economics",
    number: "01",
    eyebrow: "Commercial analytics / operations",
    title: "Turning hardware complexity into profitable unit economics",
    summary:
      "A recursive bill-of-materials and planning system made processing complexity measurable, established five contract pricing tiers, and connected weekly labor to the actual work ahead.",
    context:
      "A reverse-logistics operation processed end-of-life infrastructure for a global hyperscale cloud provider. Incoming server racks were received, demanufactured, cleared of data-bearing media, and dispositioned into downstream channels.",
    challenge:
      "The original contract paid one rate per completed unit even though hardware configurations required materially different labor and processing time. Low-complexity work could be profitable; high-complexity work pushed the same operation into negative margins.",
    ownership:
      "Paul independently designed, built, validated, deployed, and maintained the complexity models, production-planning workflows, automated P&L, and supporting Fabric systems. Client engineering and data counterparts independently modeled complexity before both sides reconciled their methods.",
    flow: [
      "Rolling four-week forecast",
      "Recursive bill of materials",
      "Processing-time model",
      "Complexity tier",
      "Labor + capacity plan",
      "Schedule + margin forecast",
    ],
    results: [
      { value: "5", label: "agreed complexity tiers" },
      { value: "+/-10%", label: "typical weekly target range" },
      { value: "4,000+", label: "assets processed daily" },
      { value: "300+", label: "floor workforce at scale" },
    ],
    sections: [
      {
        title: "Make the work measurable",
        body: [
          "A recursive bill of materials decomposed each rack into servers, switches, storage equipment, chassis configurations, and internal components. Time studies established expected processing effort by component and configuration.",
          "Those estimates rolled into an expected processing time for each host asset and rack, making it possible to compare incoming inventory against a known complexity baseline instead of treating every unit as economically equal.",
        ],
      },
      {
        title: "Change the commercial model",
        body: [
          "The client built an independent complexity model. Once both sides confirmed their calculations were not materially different, they agreed to a contract addendum with five complexity tiers based on the expected distribution of hardware configurations.",
          "Paul established the analytical case and tier boundaries. Commercial stakeholders set the final rates, restoring the operation from negative margins toward, and at times above, its contracted 20% margin expectation.",
        ],
      },
      {
        title: "Close the planning loop",
        body: [
          "The model became the input to weekly production planning. Forecast volume and complexity drove required labor; available labor and complexity constrained achievable throughput; all three informed expected margin and facility capacity.",
          "When a revised client forecast arrived in S3, Fabric refreshed the models, schedule, staffing requirements, economic scenarios, Power BI reporting, and weekly client response. Actuals were continuously backtested against the plan and coefficients were retuned as the work changed.",
        ],
      },
      {
        title: "Operate at changing scale",
        body: [
          "The operation grew from launch to more than 300 floor employees, processed more than 4,000 servers and switches per day, and handled as many as 1,000 racks per week.",
          "The same planning discipline supported a 100-person workforce increase within a month and later client volume reductions exceeding 80%, replacing anecdotal staffing requests with quantified weekly requirements.",
        ],
      },
    ],
    capabilities: [
      "Unit economics",
      "Production planning",
      "Forecasting",
      "Optimization",
      "Executive analytics",
      "Commercial modeling",
    ],
    stack: [
      "Microsoft Fabric",
      "Python",
      "PySpark",
      "Power BI",
      "S3",
      "Regression",
      "Monte Carlo",
      "Time series",
    ],
    assistantSummary:
      "Paul built a recursive BOM and time-study model for a hyperscale reverse-logistics program. The analysis established five mutually accepted complexity tiers, supported a contract addendum, restored viable unit economics, and powered weekly labor and production planning. Weekly output typically landed within +/-10% of the client target at a scale of 4,000+ assets per day.",
  },
  {
    slug: "fabric-modernization",
    number: "02",
    eyebrow: "Data platform / modernization",
    title: "From fragmented Azure resources to a unified Fabric platform",
    summary:
      "A full rebuild consolidated years of Azure sprawl into a governed Microsoft Fabric platform with lower cost, faster processing, and hourly operational visibility.",
    context:
      "Analytics for a manufacturing, reverse-logistics, and sales organization supported more than 300 team members across operations, finance, HR, sales, and executive leadership.",
    challenge:
      "Years of changing requirements and ownership had left Data Factory, Azure SQL, Blob Storage, Functions, Logic Apps, Power BI models, and reports fragmented and difficult to manage. Cross-department analysis was slow, refreshes lagged, and development happened directly in one production workspace.",
    ownership:
      "Paul identified the backend as the reporting constraint and independently led discovery, architecture, stakeholder alignment, implementation, migration, modeling, Power BI delivery, governance, deployment, training, and ongoing operation over a roughly one-year program.",
    flow: [
      "S3 + SFTP + business systems",
      "Fabric ingestion",
      "Bronze + silver Lakehouses",
      "dbt + SQL gold models",
      "Semantic models",
      "Reports + agents",
    ],
    results: [
      { value: "60%+", label: "lower infrastructure cost" },
      { value: "20 -> 3m", label: "overnight batch runtime" },
      { value: "Hourly", label: "operational refresh" },
      { value: "300+", label: "users and leaders supported" },
    ],
    sections: [
      {
        title: "Rebuild, do not just port",
        body: [
          "The migration moved through discovery, consolidation, and rebuild. Rather than reproducing legacy Data Factory jobs, Paul rewrote processing logic as scalable PySpark notebooks with parallel execution and a medallion architecture.",
          "Native S3 shortcuts, SFTP labor feeds from Paycom, Business Central integrations, and internal sources converged in Fabric Lakehouses. dbt and SQL produced governed gold models for shared semantic and reporting layers.",
        ],
      },
      {
        title: "Establish an operating model",
        body: [
          "The rebuilt platform introduced Git-backed source control, monitoring, separate development and production environments, and controlled deployment pipelines in place of a single shared workspace.",
          "Key Vault protected secrets, service principals authenticated resource access, workspace roles governed Fabric, and Power BI row-level security separated financial information from broader operating audiences.",
        ],
      },
      {
        title: "Move from daily to operational",
        body: [
          "Overnight batch processing fell from roughly 20 minutes to 3 minutes. A parallel hourly path refreshed the same S3 operational data throughout the day, giving leaders current visibility without sacrificing the governed batch layer.",
          "The completed migration retired obsolete Azure resources, reduced monthly infrastructure cost by more than 60%, and maintained near-continuous availability across reporting and infrastructure.",
        ],
      },
      {
        title: "Add an intelligent access layer",
        body: [
          "Production Microsoft Foundry agents connected to governed Fabric data through Data Agents, Fabric MCP, and custom tools. The platform could answer plain-language questions while retaining the semantic, identity, and access controls established underneath it.",
        ],
      },
    ],
    capabilities: [
      "Platform architecture",
      "Data engineering",
      "Migration",
      "Governance",
      "BI delivery",
      "FinOps",
    ],
    stack: [
      "Microsoft Fabric",
      "PySpark",
      "dbt",
      "SQL",
      "Power BI",
      "Azure Key Vault",
      "Git",
      "S3",
    ],
    assistantSummary:
      "Paul independently rebuilt a fragmented Azure analytics estate in Microsoft Fabric over about one year. The production platform cut infrastructure cost by 60%+, reduced overnight processing from 20 minutes to 3, introduced hourly operational refreshes, and supported 300+ users across operations, finance, HR, sales, and leadership.",
  },
  {
    slug: "governed-ai-analytics",
    number: "03",
    eyebrow: "Applied AI / analytics",
    title: "Turning analyst requests into governed, self-service answers",
    summary:
      "A production agent layer gave operations, HR, and sales teams direct access to governed answers and supporting data through the web and Microsoft Teams.",
    context:
      "Teams had detailed operational information in Fabric and Power BI, but routine follow-up questions still flowed through one analyst. The usual loop was message, query, Excel export, response, and another question.",
    challenge:
      "Users needed a faster way to explore units, targets, efficiency, labor, cross-training, inventory, allocations, and expected volume without bypassing data permissions or turning every question into a new dashboard.",
    ownership:
      "Paul designed and built the web experience, Teams bot, Foundry orchestration, FastAPI application, FastMCP layer, Fabric integrations, custom tools, deployment, monitoring, validation, and user workflow. Internal administrators retained ownership of Entra groups.",
    flow: [
      "Web UI + Teams bot",
      "Entra authentication",
      "Foundry agent",
      "Data Agent or MCP tool",
      "Fabric semantic layer",
      "Answer + data download",
    ],
    results: [
      { value: "2", label: "user entry points" },
      { value: "3", label: "operating functions served" },
      { value: "1st pass", label: "ad hoc analysis automated" },
      { value: "Live", label: "production deployment" },
    ],
    sections: [
      {
        title: "Meet teams where they work",
        body: [
          "Authorized users asked questions through a dedicated web chat or Microsoft Teams. Microsoft Entra authenticated users and services before requests reached the Foundry-hosted model and orchestration layer.",
          "Common analytical requests flowed to Fabric Data Agents. Broader governed questions could use Fabric MCP, while custom MCP tools handled complex and frequently repeated business logic.",
        ],
      },
      {
        title: "Combine flexibility with constraints",
        body: [
          "The custom MCP server, built with FastMCP around a FastAPI application, exposed both general analytical access and deterministic workflows for SLA, efficiency, headcount, labor forecasts, inventory, and allocation questions.",
          "Fabric Data Agents generated SQL or DAX internally against Lakehouses and semantic models. Specialized tools kept important recurring calculations consistent rather than asking a model to reconstruct the logic each time.",
        ],
      },
      {
        title: "Keep the evidence attached",
        body: [
          "Users received a direct answer and could download the supporting tabular data for continued work in Excel. The system extended existing Power BI investments instead of replacing the governed reporting layer.",
          "Foundry threads and conversations retained request history for debugging. Outputs were validated during delivery against known metrics, existing reports, and direct analyst queries, with human review available for higher-impact workflows.",
        ],
      },
      {
        title: "Run it as a production service",
        body: [
          "FastAPI and FastMCP ran in Azure Container Apps with Azure Monitor supporting application and infrastructure visibility. Service principals, Entra groups, Fabric permissions, workspace roles, and row-level model security carried existing access boundaries into the conversational experience.",
        ],
      },
    ],
    capabilities: [
      "Agent architecture",
      "MCP development",
      "API engineering",
      "Identity + access",
      "Tool design",
      "AI product delivery",
    ],
    stack: [
      "Microsoft Foundry",
      "Fabric Data Agents",
      "FastAPI",
      "FastMCP",
      "Python",
      "Entra ID",
      "Azure Container Apps",
      "Azure Monitor",
    ],
    assistantSummary:
      "Paul built a production self-service analytics system for operations, HR, and sales. Web and Teams interfaces used Entra authentication, Foundry agents, Fabric Data Agents, Fabric MCP, and custom FastMCP/FastAPI tools. It automated the first pass of recurring ad hoc analysis while preserving governed data access and downloadable evidence.",
  },
];

export const capabilities = [
  {
    number: "01",
    title: "Data foundations",
    description:
      "Modernize fragmented analytics estates into governed platforms that teams can operate and extend.",
    details: "Fabric / Azure / lakehouse / semantic models / deployment",
  },
  {
    number: "02",
    title: "Decision systems",
    description:
      "Turn operational complexity into forecasts, schedules, scenarios, and economic decisions.",
    details: "forecasting / optimization / unit economics / Power BI",
  },
  {
    number: "03",
    title: "Applied AI",
    description:
      "Build useful agent and automation layers on top of governed data, APIs, and business logic.",
    details: "agents / MCP / FastAPI / Python / identity",
  },
] as const;

export const experience = [
  {
    period: "2024-2026",
    organization: "ReMarkets",
    role: "Senior Data Analyst",
    detail:
      "Owned analytics, planning, data platforms, forecasting, and applied AI for a hyperscale reverse-logistics program.",
  },
  {
    period: "2021-2022",
    organization: "Accelerated Growth Advisors",
    role: "Associate",
    detail:
      "Delivered cloud data warehouses, executive analytics, and automated reporting for consulting clients.",
  },
  {
    period: "2017-2020",
    organization: "Purdue University",
    role: "B.S. Economics",
    detail:
      "Concentration in data analytics and management consulting, with certificates in applied data science and entrepreneurship.",
  },
] as const;

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
