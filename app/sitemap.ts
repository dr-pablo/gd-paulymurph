import type { MetadataRoute } from "next";
import { caseStudies, siteConfig } from "./content/site";
import { quickStarts } from "./content/quickstarts";
import { getBlogPosts } from "../lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();
  const routes = ["", "/quickstarts", "/work", "/about", "/ask", "/blog", "/reading"].map((route) => ({
    url: `${siteConfig.url}${route}`,
    changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
    priority: route === "" ? 1 : route === "/work" ? 0.9 : 0.7,
  }));

  return [
    ...routes,
    ...quickStarts.map((quickStart) => ({
      url: `${siteConfig.url}/${quickStart.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...caseStudies.map((study) => ({
      url: `${siteConfig.url}/work/${study.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(`${post.date}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
