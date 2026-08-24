export type CuratedLink = {
  id: string;
  title: string;
  url: string;
  publisher: string;
  note: string;
  tags: string[];
  addedAt: string;
};

export const curatedLinks: CuratedLink[] = [
  {
    id: "ollama-api",
    title: "Ollama API Reference",
    url: "https://docs.ollama.com/api",
    publisher: "Ollama",
    note: "The useful starting point once local inference needs to become an application service instead of a terminal demo.",
    tags: ["Local AI", "APIs"],
    addedAt: "2026-08-23",
  },
  {
    id: "tailscale-ssh",
    title: "Tailscale SSH",
    url: "https://tailscale.com/kb/1193/tailscale-ssh",
    publisher: "Tailscale",
    note: "A practical guide to administering private compute without opening another public ingress path.",
    tags: ["Infrastructure", "Security"],
    addedAt: "2026-08-23",
  },
  {
    id: "docker-compose",
    title: "Docker Compose Documentation",
    url: "https://docs.docker.com/compose/",
    publisher: "Docker",
    note: "Boring, readable orchestration remains a strong default for small labs and application stacks.",
    tags: ["Containers", "Infrastructure"],
    addedAt: "2026-08-23",
  },
  {
    id: "fabric-medallion",
    title: "Implement a Medallion Lakehouse Architecture in Microsoft Fabric",
    url: "https://learn.microsoft.com/en-us/fabric/onelake/onelake-medallion-lakehouse-architecture",
    publisher: "Microsoft Learn",
    note: "The canonical Fabric framing for bronze, silver, and gold layers; useful context before adapting the pattern to real source behavior.",
    tags: ["Microsoft Fabric", "Lakehouse"],
    addedAt: "2026-08-22",
  },
  {
    id: "delta-merge",
    title: "Table Deletes, Updates, and Merges",
    url: "https://docs.delta.io/latest/delta-update.html",
    publisher: "Delta Lake",
    note: "Reference material for MERGE mechanics, matched clauses, and the implementation details behind Silver-layer upserts.",
    tags: ["Delta Lake", "Data Engineering"],
    addedAt: "2026-08-22",
  },
  {
    id: "analytics-engineering",
    title: "What Is Analytics Engineering?",
    url: "https://www.getdbt.com/what-is-analytics-engineering",
    publisher: "dbt Labs",
    note: "A useful description of the space between raw data engineering and decision-ready analysis.",
    tags: ["Analytics", "Data Teams"],
    addedAt: "2026-08-21",
  },
];

export function getCuratedLinks(ids?: string[]) {
  if (!ids?.length) return [];
  const requested = new Set(ids);
  return curatedLinks.filter((link) => requested.has(link.id));
}
