# Blog Backlog

## Editorial Direction

Practical engineering, analytics, infrastructure, and AI lessons learned while actually building things.

Default structure:

1. Problem
2. Naive approach
3. Gotcha
4. What worked
5. Broader lesson

Dates below are approximate project periods or windows when the lesson surfaced. They are not publication dates. Broad ranges mean the lesson accumulated across that period; never imply that one project ran continuously for the entire range.

## First Ten

1. **Being the Only Data Person Changes How You Build** — Apr 2024-Aug 2026
   Simplicity, maintainability, business context, and end-to-end ownership when there is no specialized data team.
2. **The Hidden Problem With Analytics: Nobody Agrees on the Definition** — 2024-Jul 2026
   Recovery events, backlog, production, first-occurrence logic, exclusions, grain, and metric lineage.
3. **Bronze, Silver, Gold Is Easy — Until You Actually Build It** — Jan-Jul 2026
   File overlap, source metadata, imperfect keys, snapshots, MERGE behavior, and practical medallion design.
4. **I Replaced My Clean SQL Views With Tables — And It Was the Right Call** — Spring-Summer 2026
   Why delivery-chain reliability can matter more than architectural elegance.
5. **Tokenomics Should Be Modeled as Flows, Not a Supply Number** — Mar-Aug 2026
   Emissions, burns, conversion, rewards, net issuance, and why maximum supply is incomplete.
6. **I Accidentally Built a 1.5 kW Space Heater** — Jul-Aug 2026
   Direct energy, cooling, secondary consumption, and modeling full-system economics.
7. **The `/downloads` vs `/data` Problem That Broke My Media Automation** — Jul 2026
   Host paths, container paths, shared mounts, and why connected services can still disagree about files.
8. **How I Hand Projects to Coding Agents Without Writing a 40-Page Spec** — Jul-Aug 2026
   Destination, core behavior, non-negotiables, flexible implementation, success criteria, and later extensions.
9. **I Don't Want an AI Agent — I Want an AI Worker With a Computer** — Aug 2026
   Sandboxed workers, contained environments, persistent workspaces, and observable execution.
10. **Deterministic Classification Before LLMs** — Aug 2026
    Explainability, constrained vocabulary, false-positive cost, anomalies, and using LLMs only for ambiguity.

## Analytics And Consulting

11. **Build the Data Model Around the Decision, Not the Dashboard** — Spring-Summer 2026
    Driver-based labor scenarios, adjustable assumptions, explainability, and decision-support analytics.
12. **Your Dashboard Isn't a Forecast** — Spring-Summer 2026
    Historical reporting versus trend extrapolation, driver-based forecasting, scenarios, and “what if?” questions.
13. **The $6K/Month Architecture Decision** — 2025-2026
    Azure-to-Fabric consolidation, redundant services, data movement, overhead, and total complexity.
14. **Why I Still Manually Inspect the Biggest Records** — Aug 2026
    Automate the long tail and audit concentrated risk across contracts, finance, fraud, and ETL.
15. **The Analyst Who Owns the Pipeline Thinks Differently** — 2024-Aug 2026
    How source-to-executive ownership changes analysis and architectural decisions.
16. **SQL Is Usually the Easy Part** — 2024-Aug 2026
    Entity definition, grain, duplicates, time semantics, missing values, and business validation.
17. **The Most Dangerous Excel File Is the One Everyone Trusts** — 2024-2026
    Moving recurring operational reports into automated pipelines while preserving useful exports.

## Fabric And Data Engineering

18. **Stop Assuming Your Fabric Notebook Knows Which Lakehouse You Mean** — Jul 2026
    Fully qualified OneLake paths, implicit state, notebook portability, and production context.
19. **`writeTo()` vs Writing to a Delta Path in Fabric** — Jul 2026
    Catalog identifiers versus explicit ABFSS and OneLake paths.
20. **Building Idempotent File Ingestion Without Making It Complicated** — Spring-Summer 2026
    Source-path tracking, unseen-file detection, ingestion metadata, and rerunnable pipelines.
21. **Snapshot Tables Are Not Event Tables** — Spring-Summer 2026
    Latest-state semantics, date partitions, point-in-time comparison, and accidental summation.
22. **MERGE Keys Are Business Logic** — Spring-Summer 2026
    Why composite uniqueness rules encode the organization's definition of a real event.
23. **Why My Production Calendar Needed Friday to Mean Something Different** — Late 2025-2026
    Productive minutes, buffer days, breaks, maintenance, catch-up capacity, and variability.
24. **Moving Averages Aren't Just Visualization Tricks** — 2026
    Backlog divided by sustainable throughput, window selection, noise, and volume thresholds.
25. **Why Your Rolling Average Changes When You Filter the Report** — 2026
    Windowing and filter context.
26. **`ROW_NUMBER()` Is My Favorite Dedup Tool** — 2024-2026
    Practical deduplication and how ordering can silently select the wrong record.
27. **Never Divide Before You Decide the Grain** — 2024-Aug 2026
    CTR, rates, percentages, aggregation, and denominator mistakes.
28. **A NULL Is Sometimes a Business Rule** — 2026
    Conditional defaults and why globally replacing missing values with zero is dangerous.
29. **IDs Lie More Often Than You Think** — 2025-2026
    Identifier precedence, aliases, prefixes, containers, and organizational history.
30. **“Latest” Is a Data Modeling Decision** — 2026
    Latest snapshot, event, processed record, and source file are not equivalent.

## AI And Agent Engineering

31. **The Global Narrator Pattern for Multi-Agent Systems** — Aug 2026
    Workers execute, a narrator observes, and humans inspect one coherent progress stream.
32. **Agents Need Isolation More Than They Need Personality** — Aug 2026
    Containers, credentials, file access, resource limits, goal boundaries, and audit trails.
33. **The Best AI Coding Rule Might Be “Make It Easy to Verify”** — Jul-Aug 2026
    Tests, observable outputs, small milestones, rollback, and deterministic checks.

## Home Lab And Infrastructure

34. **The Home Media Server Stack I Actually Use** — Spring-Summer 2026
    Plex, Radarr, Sonarr, Prowlarr, qBittorrent, Gluetun, WireGuard, Overseerr, and Tailscale as an architecture.
35. **My Torrent Client Had Zero DHT Nodes — Here's What Was Actually Wrong** — Jul 2026
    VPN containers, network namespaces, DHT, connectivity assumptions, and diagnosis.
36. **Tailscale Made My Home Lab Boring — Which Is Exactly What I Wanted** — 2026
    Private overlay networking, administration, discovery, and reduced firewall complexity.
37. **Don't Build a Home Lab That Becomes a Second Job** — 2026
    Boring networking, observability, recoverability, documentation, and killing costly projects.
38. **The Real Cost of a 500-Watt Server Isn't 500 Watts** — Aug 2026
    Cooling, PSU efficiency, idle time, depreciation, noise, maintenance, and opportunity cost.
39. **GPU Mining Efficiency: Hashrate Is the Wrong Number to Optimize** — Jun-Jul 2026
    Power limits, performance curves, hashes per watt, and compute economics.
40. **When a Three-Inch Drop Turns Into Hardware Diagnostics** — Aug 2026
    Power-path diagnosis, external symptoms, tamper constraints, and avoiding premature disassembly.

## Crypto And Protocol Engineering

41. **How I Would Build a Live Crypto Supply Model** — Jul-Aug 2026
    Daily protocol flows, additions and removals, net emission, historical state, assumptions, and scenarios.
42. **Why a “Soft Cap” Is Not a Hard Cap** — Jul-Aug 2026
    Dynamic issuance, conversion, burns, incentives, and demand.
43. **Game Logic Off-Chain, Economic Settlement On-Chain** — Aug 2026
    Off-chain gameplay and judging with independently verifiable on-chain settlement.
44. **Designing a Game Economy With One Emission Source** — Aug 2026
    Scarce liquidity, gameplay emissions, transfers, burns, LPs, and future financial roles.
45. **Liquidity Is Gameplay** — Aug 2026
    Players earn scarce currency, provide liquidity, enable activity, and specialize economically.
46. **Why Your Blockchain Game Probably Doesn't Need Every Action On-Chain** — Aug 2026
    Cost, latency, UX, verifiability, and settlement guarantees.

## DeFi Product Design

47. **Building a DeFi Protocol Without Starting With a Token** — Spring-Summer 2026
    Vault shares, lockups, backing, protocol-owned liquidity, and starting with the economic primitive.
48. **Protocol-Owned Liquidity as a Moat** — Spring-Summer 2026
    Mercenary liquidity, treasury backing, asset accumulation, and sustainability.
49. **Stablecoins Aren't Automatically Stable Inputs to Your Model** — Spring-Summer 2026
    Oracle assumptions, pool pricing, depegs, cross-market liquidity, and hidden constants.
50. **Build the Treasury Before the Financial Engineering** — Spring-Summer 2026
    Custody, deposits, shares, accounting, and liquidity before borrowing and advanced primitives.

## Product Experiments

51. **Building a Website You Wouldn't Be Embarrassed to Monetize** — Aug 2026
    SEO, affiliates, ads, thin content, utility, and attaching distribution to something worth maintaining.
52. **The Problem With “Passive Income” Websites** — Aug 2026
    Content, SEO, maintenance, distribution, conversion, economics, and responsible AI leverage.

## Drafting Rules

- Preserve client confidentiality. Use role, operation, or industry descriptors unless a name is explicitly approved.
- Keep technical specifics that establish credibility; remove details that expose private systems, credentials, or proprietary formulas.
- Distinguish measured outcomes from interpretation.
- Do not turn approximate project periods into exact start/end claims.
- Prefer one concrete example over a list of tools.
- Include code only when it improves the explanation.
- End with a reusable lesson, not a sales pitch.
