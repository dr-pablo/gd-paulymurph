---
title: Bronze, Silver, Gold Is Easy - Until You Actually Build It
date: 2026-08-22
period: Jan-Jul 2026
summary: The medallion diagram is simple. Overlapping files, unstable keys, snapshots, replay safety, and downstream expectations are where the architecture becomes real.
tags: Microsoft Fabric, Data Engineering, Lakehouse
suggested: fabric-medallion, delta-merge
featured: false
---

The medallion architecture is one of the easiest data patterns to explain.

Bronze stores raw data. Silver cleans and conforms it. Gold serves the business.

That explanation is useful. It is also where the easy part ends.

When I rebuilt an operational analytics platform in Microsoft Fabric, the challenge was not deciding that we needed bronze, silver, and gold layers. The challenge was deciding what each layer meant for sources that delivered overlapping files, changing records, periodic snapshots, incomplete identifiers, and different versions of the same business event.

The architecture became useful only after it followed the behavior of the source rather than the cleanliness of the diagram.

## Bronze needs enough evidence to explain itself

Raw does not mean careless.

For file-based ingestion, bronze should preserve the payload and the context that explains how it arrived. Two columns became especially valuable:

- `_source_file`
- `_ingested_at`

The source path answers questions that the business data cannot. Which delivery produced this record? Was the same file processed twice? Did a late file overlap with yesterday's data? Can we reproduce the exact input that created a downstream result?

The ingestion timestamp separates source time from platform time. A record may describe an event from last week but arrive today. Without both concepts, late data and pipeline delays become difficult to distinguish.

This metadata can feel unnecessary when the pipeline works. It becomes the first thing you want when it does not.

## Incremental ingestion is really a replay decision

“Only ingest new files” sounds straightforward:

1. List available files.
2. Compare them with files already processed.
3. Append the unseen files.

That pattern works well when filenames are stable and deliveries are immutable. Real sources do not always cooperate. A file can be resent under a new name. A rolling extract can contain records from previous periods. A corrected delivery can intentionally overlap with data already stored.

This is why file-level deduplication and record-level deduplication solve different problems.

File tracking prevents the exact same delivery from being appended repeatedly. Silver-layer logic determines whether records inside different deliveries represent the same real-world thing.

A rerunnable pipeline needs both decisions to be explicit.

## MERGE keys are not plumbing

The basic Silver MERGE needs a key. Finding one is often the real modeling work.

An identifier that looks unique may only be unique within an entity. An event ID may repeat across systems. A container can move through multiple valid states. A timestamp can distinguish events until two systems round it differently.

The eventual key may be a combination:

```text
entity + identifier
identifier + event timestamp
container + event type + source time
```

Choosing that combination encodes a business claim: these fields define one thing that should exist once.

That claim should be reviewed like metric logic, not buried in a MERGE statement and forgotten.

## “Keep the latest” still requires a definition

Deduplication often ends with a window function:

```sql
ROW_NUMBER() OVER (
  PARTITION BY business_key
  ORDER BY source_updated_at DESC, _ingested_at DESC
)
```

The code is easy. The ordering rule is not.

Does latest mean the event happened most recently? The source updated it most recently? The platform received it most recently? It came from the newest file?

Those values can disagree. The correct choice depends on how the source corrects history and how the business interprets state.

`ROW_NUMBER()` is a great deduplication tool because it makes the decision visible. It is dangerous when the ordering columns are chosen by convenience.

## Snapshots are not transactions

Some of the most important operational datasets were snapshots: what inventory existed, what backlog looked like, or what outbound state was visible at a point in time.

Appending snapshots creates history, but it also creates an easy analytical trap. Summing inventory across snapshot dates does not produce total inventory. It produces the same units counted repeatedly across observations.

Snapshots need their own semantics:

- A clear snapshot date or timestamp
- Partitioning that preserves each observation
- Latest-state logic for current reporting
- Point-in-time filtering for historical comparison
- Measures that do not accidentally aggregate across snapshots

Trying to force snapshot data through the same assumptions as event data creates plausible-looking errors, which are usually the most expensive kind.

## Silver is where source behavior meets business identity

Bronze should preserve evidence. Gold should be easy to consume. Silver has to reconcile the two.

This is where I handled data types, identifiers, deduplication, record precedence, event definitions, and source-specific exceptions. It is also where a textbook architecture can become overengineered.

Not every source needs an elaborate canonical model. Sometimes a cleaned, typed, deduplicated table with explicit lineage is enough. The goal is not maximum abstraction. The goal is a stable layer that multiple downstream uses can trust.

## Gold should reflect decisions, not departments

It is tempting to organize Gold entirely around reports: an operations table, a finance table, a sales table, and another table for each dashboard request.

That can recreate fragmentation one layer higher.

The more durable Gold models centered on reusable business concepts: production, labor, inventory, allocation, billing, and economic outcomes. Reports and semantic models could then combine those concepts according to the audience and permission boundary.

Materialized tables were sometimes more reliable than views for the Power BI delivery chain. That was not a violation of the architecture. It was the architecture responding to an operational requirement.

## The useful version of medallion

The medallion pattern worked because each layer had a practical contract:

**Bronze:** Preserve what arrived and enough metadata to replay or investigate it.

**Silver:** Decide what the records mean, which ones are duplicates, and how source behavior maps to business identity.

**Gold:** Present stable, reusable concepts at the grain required for decisions and reporting.

The value was not the names of the layers. It was making different kinds of decisions in different places.

That separation turned messy operational files into a platform that could support hourly reporting, forecasting, billing, semantic models, and AI-assisted access without every new use case rebuilding the source logic.

Bronze, Silver, and Gold are easy to draw. The architecture starts when you can explain what happens when the source sends the same truth twice.
