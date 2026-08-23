import type { MetadataRoute } from "next";
import { tools } from "@/data/tools";
import { categories } from "@/data/categories";
import { getAllSaasSlugs } from "@/lib/alternatives";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/hosting-deals`, changeFrequency: "monthly", priority: 0.7 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${siteConfig.url}/categoria/${category.slug}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const toolRoutes: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${siteConfig.url}/tool/${tool.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const alternativeRoutes: MetadataRoute.Sitemap = getAllSaasSlugs().map((slug) => ({
    url: `${siteConfig.url}/alternativa-a-${slug}`,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...categoryRoutes, ...toolRoutes, ...alternativeRoutes];
}
