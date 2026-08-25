# paulymurph.com

Paul Murphy's portfolio, selected work, field notes, and reading curation. Built with Next.js and deployed on Vercel.

## Development

```bash
npm install
npm run dev
```

Use the port printed by Next.js. Port `3000` may already be occupied on this workstation.

## Publishing A Blog Post

Drop a supported file into `content/blog/` and redeploy. The site discovers posts during the build and creates both the Blog index entry and a permanent `/blog/[slug]` route.

Supported formats:

- `.md` and `.mdx` as Markdown. MDX is rendered as Markdown only; embedded React components are intentionally not executed.
- `.txt` as plain text with blank lines between paragraphs.
- `.docx` as modern Word documents. Legacy `.doc` files should be saved as `.docx` first.

For Markdown, use this optional frontmatter:

```md
---
title: A Useful Post Title
date: 2026-08-23
period: Jan-Jul 2026
summary: One sentence used on the Blog index and in social metadata.
tags: Analytics, AI, Infrastructure
featured: false
---

Post content starts here.
```

Without frontmatter, the loader uses the first heading or non-empty line as the title, derives the summary from the content, and uses the file modification date. Prefix any file with `YYYY-MM-DD-` to control its publish date and keep filenames sortable:

```text
2026-08-23-my-post.md
2026-09-10-another-note.txt
2026-10-01-word-draft.docx
```

The filename becomes the URL slug after the date prefix is removed.

`date` is the publication date used for sorting and metadata. `period` is optional display context for when the project was active or the lesson surfaced. Use month/year-level values such as `Jul 2026`, `Spring-Summer 2026`, or `Apr 2024-Aug 2026`. A range describes when lessons accumulated; it must not be written as proof that one project ran continuously throughout the range.

The private editorial queue lives at `content/editorial/blog-backlog.md`. Files in `content/editorial/` are planning material and are never published. Move a completed post into `content/blog/` only when it is ready to appear on the site.

## Curating External Links

External articles, documentation, and references live in `content/links.ts`. Add one object with a unique short `id`, URL, publisher, personal note, tags, and the date you saved it. Every entry automatically appears in the `Reading around the work` section on the Blog hub.

To recommend that link beneath a specific post, reference its ID in the post's frontmatter:

```md
suggested: ollama-api, tailscale-ssh, docker-compose
```

One registry entry can be suggested by multiple posts. Removing an ID from `suggested` only removes the relationship; it does not remove the link from the central Blog hub.

## Editing The Reading Shelf

All reading picks live in `content/reading.ts`. Add, remove, reorder, or mark a book as `essential` there. The Reading page contains no reading-status or progress state.

## Portfolio Assistant

The assistant works in grounded-retrieval mode without external credentials. In production it uses Vercel AI Gateway's OpenAI-compatible Chat Completions endpoint and the deployment's automatic OIDC token. Set:

```text
AI_MODEL                    # provider/model ID from the Gateway catalog
KV_REST_API_URL             # set by Vercel's Upstash Redis integration
KV_REST_API_TOKEN           # set by Vercel's Upstash Redis integration
```

For local hosted-model testing, create a Vercel AI Gateway key and set `AI_GATEWAY_API_KEY`. Do not set a permanent Gateway key in production; Vercel supplies OIDC to Functions through the `x-vercel-oidc-token` request header and attributes usage to this project. `VERCEL_OIDC_TOKEN` is used only by builds and local environments pulled with the Vercel CLI.

Retrieval is intentionally small and deterministic: it scores the visitor's question against approved profile, experience, education, capability, engagement, and case-study records, then sends at most three relevant sources to the model. There is no vector database or general-knowledge corpus. Unmatched questions are redirected locally and are not sent to a model. Model reasoning is disabled for lower latency and cost; the assistant is instructed to explain evidence, assess consulting fit, and stay within Paul's published work.

The API permits 10 valid questions per IP per minute and 100 globally per minute through Upstash Redis. It accepts Vercel's `KV_REST_API_*` credentials or Upstash's direct `UPSTASH_REDIS_REST_*` credentials. If hosted generation is enabled in production without Redis credentials, the endpoint fails closed with `503`. Provider and budget failures fall back to the local grounded answer.

### Production setup

1. Enable AI Gateway for the Vercel team and purchase credits.
2. Set `AI_MODEL` on the Vercel project for Production and Preview environments.
3. Install the Upstash Redis Marketplace integration on the project. Confirm it created `KV_REST_API_URL` and `KV_REST_API_TOKEN` for Production and Preview.
4. In AI Gateway Budgets, set an explicit monthly project budget and 50%, 75%, and 100% alerts. Project budgets apply because production authenticates through OIDC.
5. Leave automatic credit top-up disabled for the initial release.
6. Redeploy, submit a question on `/ask`, and confirm the response trace reports `hosted model`. Verify the request appears under the project's AI Gateway Observability view.

Gateway budgets are soft caps: the request that crosses a limit completes before later requests are rejected. The application has no conversation database, but Gateway observability and the selected model provider may process or retain requests according to their data handling terms.

## Verification

```bash
npm run lint
npm run build
npm audit --omit=dev
```
