import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";
import mammoth from "mammoth";

const BLOG_DIRECTORY = path.join(process.cwd(), "content", "blog");
const SUPPORTED_EXTENSIONS = new Set([".md", ".mdx", ".txt", ".docx"]);

export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  featured: boolean;
  readingTime: number;
  content: string;
  sourceType: "markdown" | "text" | "word";
};

function parseFrontmatter(value: string) {
  if (!value.startsWith("---\n")) return { attributes: new Map<string, string>(), content: value };

  const end = value.indexOf("\n---\n", 4);
  if (end === -1) return { attributes: new Map<string, string>(), content: value };

  const attributes = new Map<string, string>();
  for (const line of value.slice(4, end).split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    attributes.set(line.slice(0, separator).trim(), line.slice(separator + 1).trim().replace(/^['"]|['"]$/g, ""));
  }

  return { attributes, content: value.slice(end + 5).trim() };
}

function cleanText(value: string) {
  return value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[*_>|~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function titleFromContent(content: string, filename: string) {
  const markdownHeading = content.match(/^#\s+(.+)$/m)?.[1]?.trim();
  const firstLine = content.split("\n").map((line) => line.trim()).find(Boolean);
  const fallback = filename
    .replace(/^\d{4}-\d{2}-\d{2}-/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  return markdownHeading || firstLine || fallback;
}

function stripLeadingTitle(content: string, title: string) {
  const lines = content.split("\n");
  const firstContentIndex = lines.findIndex((line) => line.trim().length > 0);
  if (firstContentIndex === -1) return content;

  const firstLine = lines[firstContentIndex].replace(/^#\s+/, "").trim();
  if (firstLine.toLowerCase() !== title.toLowerCase()) return content;

  lines.splice(firstContentIndex, 1);
  return lines.join("\n").trim();
}

function slugFromFilename(filename: string) {
  return path
    .basename(filename, path.extname(filename))
    .replace(/^\d{4}-\d{2}-\d{2}-/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function loadPost(filename: string): Promise<BlogPost> {
  const filePath = path.join(BLOG_DIRECTORY, filename);
  const extension = path.extname(filename).toLowerCase();
  const stat = await fs.stat(filePath);
  const raw = extension === ".docx"
    ? (await mammoth.extractRawText({ path: filePath })).value
    : await fs.readFile(filePath, "utf8");
  const { attributes, content: parsedContent } = parseFrontmatter(raw);
  const title = attributes.get("title") || titleFromContent(parsedContent, path.basename(filename, extension));
  const content = stripLeadingTitle(parsedContent, title);
  const plainText = cleanText(content);
  const filenameDate = filename.match(/^(\d{4}-\d{2}-\d{2})-/)?.[1];
  const date = attributes.get("date") || filenameDate || stat.mtime.toISOString().slice(0, 10);
  const summary = attributes.get("summary") || `${plainText.slice(0, 190).trim()}${plainText.length > 190 ? "..." : ""}`;
  const tags = (attributes.get("tags") || "Notes")
    .replace(/^\[|\]$/g, "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  return {
    slug: slugFromFilename(filename),
    title,
    summary,
    date,
    tags,
    featured: attributes.get("featured") === "true",
    readingTime: Math.max(1, Math.ceil(plainText.split(/\s+/).filter(Boolean).length / 220)),
    content,
    sourceType: extension === ".docx" ? "word" : extension === ".txt" ? "text" : "markdown",
  };
}

export const getBlogPosts = cache(async () => {
  let filenames: string[];
  try {
    filenames = await fs.readdir(BLOG_DIRECTORY);
  } catch {
    return [];
  }

  const posts = await Promise.all(
    filenames
      .filter((filename) => SUPPORTED_EXTENSIONS.has(path.extname(filename).toLowerCase()))
      .map(loadPost),
  );

  return posts.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
});

export const getBlogPost = cache(async (slug: string) => {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug);
});
