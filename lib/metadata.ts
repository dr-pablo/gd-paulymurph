import type { Metadata } from "next";
import { siteConfig } from "../app/content/site";

type PageMetadata = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  tags?: string[];
};

export function createPageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  tags,
}: PageMetadata): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const socialTitle = `${title} | ${siteConfig.name}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: socialTitle,
      description,
      type,
      siteName: siteConfig.name,
      url,
      ...(type === "article" ? { publishedTime, tags, authors: [siteConfig.name] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      creator: "@pauly_murph",
    },
  };
}
