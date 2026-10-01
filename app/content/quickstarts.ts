export type QuickStart = {
  slug: string;
  name: string;
  inquiryLabel: string;
  tagline: string;
  description: string;
  startingPrice: number;
  timeline: string;
  bestFor: string;
  pricingNote: string;
  outcome: string;
  deliverables: string[];
  assumptions: string[];
  examples?: string[];
  exclusions: string[];
  technologies: string[];
  expansionPaths: string[];
  primaryCTA: string;
};

export const quickStarts: QuickStart[] = [
  {
    slug: "copilot-quickstart",
    name: "Microsoft Copilot Setup",
    inquiryLabel: "Microsoft Copilot Setup",
    tagline: "Get Microsoft Copilot configured and ready for your team.",
    description:
      "A focused setup designed to move from licenses to practical day-to-day use.",
    startingPrice: 2000,
    timeline: "3-4 weeks",
    bestFor:
      "Organizations with Microsoft 365 Copilot licenses that want one team to move from experimentation to repeatable, practical use.",
    pricingNote:
      "The starting price applies to a focused implementation in a reasonably ready Microsoft 365 environment. Readiness gaps or broader governance needs may require a revised scope.",
    outcome:
      "A validated Copilot starting point with defined business use cases, governance guidance, and practical materials your team can continue using.",
    deliverables: [
      "Copilot environment review",
      "Core configuration",
      "Security and access setup",
      "Initial use cases and rollout guidance",
    ],
    assumptions: [
      "Required Microsoft licenses and appropriate administrative access are available",
      "The work focuses on one primary team or business area with an available stakeholder",
      "Use cases rely primarily on standard Microsoft 365 Copilot capabilities",
      "Client participants are available for use-case input, validation, and handoff",
    ],
    examples: [
      "Meeting preparation and follow-up",
      "Drafting and document review",
      "Inbox and communication support",
      "Recurring summaries and analysis",
      "Internal knowledge discovery",
    ],
    exclusions: [
      "Large-scale tenant remediation",
      "Custom software development",
      "Complex third-party integrations",
      "Enterprise-wide rollout",
      "Custom agents requiring significant application development",
    ],
    technologies: ["Microsoft 365", "Copilot", "Power Platform"],
    expansionPaths: [
      "Custom Copilot agents",
      "Internal knowledge systems",
      "Workflow automation",
      "AI governance",
      "Department-specific Copilot rollout",
      "Ongoing AI enablement",
    ],
    primaryCTA: "Launch Copilot",
  },
  {
    slug: "knowledge-agent-quickstart",
    name: "Internal Knowledge Agent",
    inquiryLabel: "Internal Knowledge Agent",
    tagline: "Turn your company knowledge into an AI assistant.",
    description:
      "Connect internal documents, policies, procedures, and other resources to a simple AI experience your team can actually use.",
    startingPrice: 1500,
    timeline: "2-3 weeks",
    bestFor:
      "Teams with reasonably organized, approved documentation and a clear set of recurring questions they want employees to answer faster.",
    pricingNote:
      "The starting price applies to a small, well-organized knowledge set using supported capabilities in an existing environment. Source complexity, permissions, or custom architecture may change the scope.",
    outcome:
      "A working internal knowledge assistant, connected to approved company documentation, tested, documented, and accessible through Microsoft Teams or another agreed interface.",
    deliverables: [
      "Knowledge source setup",
      "AI search and Q&A",
      "Basic permissions and configuration",
      "Deployment and handoff",
    ],
    assumptions: [
      "Up to 3 reasonably organized and accessible sources are included; formats and volume are confirmed during scoping",
      "The initial audience has a straightforward access model that does not require identity redesign",
      "Required licenses, tenant approvals, and administrative access are available",
      "The client provides a content owner, representative questions, and users for validation",
      "The implementation uses an agreed supported platform; custom applications and retrieval architecture are separate work",
    ],
    examples: [
      "SharePoint",
      "Policy documents",
      "Standard operating procedures",
      "Employee documentation",
      "Internal knowledge bases",
      "Project documentation",
      "Product documentation",
    ],
    exclusions: [
      "Large-scale document remediation",
      "ERP or CRM transactional integrations",
      "Complex custom APIs",
      "Multi-agent orchestration",
      "Write-back actions into production systems",
      "Enterprise identity architecture redesign",
    ],
    technologies: [
      "Microsoft Teams",
      "SharePoint",
      "Microsoft Copilot and supported AI platforms",
    ],
    expansionPaths: [
      "Additional knowledge sources",
      "ERP or CRM integration",
      "Department-specific agents",
      "Workflow actions",
      "Custom tools",
      "Multi-agent systems",
      "Managed AI operations",
    ],
    primaryCTA: "Launch a Knowledge Agent",
  },
  {
    slug: "workflow-automation-quickstart",
    name: "Workflow Automation",
    inquiryLabel: "Workflow Automation",
    tagline: "Automate one repetitive business process from end to end.",
    description:
      "Replace manual steps, handoffs, and repetitive work with a simple production-ready workflow.",
    startingPrice: 2500,
    timeline: "3-4 weeks",
    bestFor:
      "A stable, repetitive process with clear rules, an available process owner, and a meaningful opportunity to reduce manual work.",
    pricingNote:
      "The starting price applies to one focused, low-to-moderate complexity workflow using supported systems and standard connectors. Additional complexity is scoped before implementation begins.",
    outcome:
      "One functioning, deployed automation for an agreed repeatable business process, with baseline error handling, testing, and operational documentation.",
    deliverables: [
      "Workflow mapping",
      "Automation build",
      "Agreed supported-system integrations",
      "Testing and handoff",
    ],
    assumptions: [
      "The package covers one independent, low-to-moderate complexity workflow",
      "Steps, branches, exceptions, transaction volume, and supported systems are confirmed during scoping",
      "Existing systems provide suitable access or standard connectors for the agreed workflow",
      "The client provides a process owner, credentials, test data, and timely validation",
      "Premium licensing, custom APIs, process redesign, and additional workflows are separate work",
    ],
    examples: [
      "Intake routing",
      "Approval flows",
      "Reporting distribution",
      "Document processing",
      "Data-entry workflows",
      "Internal notifications",
      "Request management",
      "Employee onboarding steps",
      "Recurring operational tasks",
    ],
    exclusions: [
      "Multiple dependent workflows",
      "Significant custom application development",
      "Complex system integrations",
      "Broad process transformation",
    ],
    technologies: [
      "Power Automate",
      "APIs",
      "Microsoft 365",
      "Existing business systems",
    ],
    expansionPaths: [
      "Additional workflows",
      "Power Platform implementation",
      "AI-assisted workflow automation",
      "Agentic workflows",
      "System integrations",
      "Process transformation",
      "Managed automation services",
    ],
    primaryCTA: "Launch an Automation",
  },
].sort((a, b) => a.startingPrice - b.startingPrice);

export const quickStartStages = [
  {
    number: "01",
    name: "Scope",
    description: "Confirm the use case, systems, requirements, and success criteria.",
  },
  {
    number: "02",
    name: "Build",
    description: "I configure and implement the agreed solution.",
  },
  {
    number: "03",
    name: "Validate",
    description: "Test the implementation against agreed use cases.",
  },
  {
    number: "04",
    name: "Handoff",
    description: "Deploy, document, and transfer the working solution.",
  },
] as const;

export function getQuickStart(slug: string) {
  return quickStarts.find((quickStart) => quickStart.slug === slug);
}

export function formatQuickStartPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}
