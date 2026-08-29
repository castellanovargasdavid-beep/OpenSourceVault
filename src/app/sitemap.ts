import type { MetadataRoute } from "next";
import { tools } from "@/data/tools";
import { categories } from "@/data/categories";
import { getAllSaasSlugs } from "@/lib/alternatives";
import { getAllComparisonSlugs } from "@/lib/comparisons";
import { siteConfig } from "@/lib/site-config";
import { slugify } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  function entry(
    path: string,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: number
  ): MetadataRoute.Sitemap[number] {
    const esUrl = `${siteConfig.url}${path}`;
    const enUrl = `${siteConfig.url}/en${path === "/" ? "" : path}`;
    return {
      url: esUrl,
      changeFrequency,
      priority,
      alternates: { languages: { es: esUrl, en: enUrl } },
    };
  }

  function entryEn(
    path: string,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: number
  ): MetadataRoute.Sitemap[number] {
    const esUrl = `${siteConfig.url}${path}`;
    const enUrl = `${siteConfig.url}/en${path === "/" ? "" : path}`;
    return {
      url: enUrl,
      changeFrequency,
      priority,
      alternates: { languages: { es: esUrl, en: enUrl } },
    };
  }

  const staticPaths: [string, MetadataRoute.Sitemap[number]["changeFrequency"], number][] = [
    ["/", "weekly", 1],
    ["/hosting-deals", "monthly", 0.7],
    ["/guias/desplegar-con-docker", "monthly", 0.7],
    ["/calculadora-ahorro", "monthly", 0.8],
  ];

  const categoryPaths: [string, MetadataRoute.Sitemap[number]["changeFrequency"], number][] = categories.map(
    (category) => [`/categoria/${category.slug}`, "weekly", 0.6]
  );

  const toolPaths: [string, MetadataRoute.Sitemap[number]["changeFrequency"], number][] = tools.map((tool) => [
    `/tool/${tool.slug}`,
    "monthly",
    0.8,
  ]);

  const alternativePaths: [string, MetadataRoute.Sitemap[number]["changeFrequency"], number][] = getAllSaasSlugs().map(
    (slug) => [`/alternativa-a-${slug}`, "monthly", 0.9]
  );

  const comparisonPaths: [string, MetadataRoute.Sitemap[number]["changeFrequency"], number][] = getAllComparisonSlugs().map(
    (pair) => [`/comparar/${pair}`, "monthly", 0.7]
  );

  const migrationGuidePaths: [string, MetadataRoute.Sitemap[number]["changeFrequency"], number][] = tools.map((tool) => [
    `/guias/migrar/${slugify(tool.replaces[0])}/${tool.slug}`,
    "monthly",
    0.6,
  ]);

  const allPaths = [
    ...staticPaths,
    ...categoryPaths,
    ...toolPaths,
    ...alternativePaths,
    ...comparisonPaths,
    ...migrationGuidePaths,
  ];

  return [
    ...allPaths.map(([path, freq, priority]) => entry(path, freq, priority)),
    ...allPaths.map(([path, freq, priority]) => entryEn(path, freq, priority)),
  ];
}
