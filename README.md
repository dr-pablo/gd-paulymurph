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

The assistant works in local grounded-retrieval mode without external credentials. Hosted generation uses an OpenAI-compatible endpoint configured with:

```text
AI_API_URL
AI_API_KEY
AI_MODEL
AI_API_KEY_HEADER  # optional
```

## Verification

```bash
npm run lint
npm run build
npm audit --omit=dev
```
