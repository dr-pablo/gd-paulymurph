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
