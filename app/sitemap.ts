import type { MetadataRoute } from "next";
import { caseStudies } from "./content/site";

const siteUrl = "https://paulymurph.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/work", "/about", "/ask", "/blog", "/reading"].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
    priority: route === "" ? 1 : route === "/work" ? 0.9 : 0.7,
  }));

  return [
    ...routes,
    ...caseStudies.map((study) => ({
      url: `${siteUrl}/work/${study.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
