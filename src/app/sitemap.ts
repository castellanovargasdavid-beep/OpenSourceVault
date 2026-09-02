import type { MetadataRoute } from "next";
import { tools } from "@/data/tools";
import { categories } from "@/data/categories";
import { categoriesEn } from "@/data/categories.en";
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
    ["/promote", "monthly", 0.5],
    ["/privacy", "yearly", 0.2],
    ["/terms", "yearly", 0.2],
    ["/affiliate-disclosure", "yearly", 0.2],
  ];

  const toolPaths: [string, MetadataRoute.Sitemap[number]["changeFrequency"], number][] = tools.map((tool) => [
    `/tool/${tool.slug}`,
    "monthly",
    0.8,
  ]);

  const comparisonPaths: [string, MetadataRoute.Sitemap[number]["changeFrequency"], number][] = getAllComparisonSlugs().map(
    (pair) => [`/comparar/${pair}`, "monthly", 0.7]
  );

  const migrationGuidePaths: [string, MetadataRoute.Sitemap[number]["changeFrequency"], number][] = tools.map((tool) => [
    `/guias/migrar/${slugify(tool.replaces[0])}/${tool.slug}`,
    "monthly",
    0.6,
  ]);

  const allPaths = [...staticPaths, ...toolPaths, ...comparisonPaths, ...migrationGuidePaths];

  // Categorías y páginas "alternativas a X": la URL en inglés usa un slug y
  // un segmento propios (/en/categories/auth-identity, /en/alternatives/notion)
  // en vez de reutilizar las palabras en español, así que no se pueden
  // generar con el simple prefijo /en que usan entry()/entryEn().
  const categoryEntries: MetadataRoute.Sitemap = categories.flatMap((category) => {
    const esUrl = `${siteConfig.url}/categoria/${category.slug}`;
    const enUrl = `${siteConfig.url}/en/categories/${categoriesEn[category.id].slug}`;
    const alternates = { languages: { es: esUrl, en: enUrl } };
    return [
      { url: esUrl, changeFrequency: "weekly", priority: 0.6, alternates },
      { url: enUrl, changeFrequency: "weekly", priority: 0.6, alternates },
    ];
  });

  const alternativeEntries: MetadataRoute.Sitemap = getAllSaasSlugs().flatMap((slug) => {
    const esUrl = `${siteConfig.url}/alternativas/${slug}`;
    const enUrl = `${siteConfig.url}/en/alternatives/${slug}`;
    const alternates = { languages: { es: esUrl, en: enUrl } };
    return [
      { url: esUrl, changeFrequency: "monthly", priority: 0.9, alternates },
      { url: enUrl, changeFrequency: "monthly", priority: 0.9, alternates },
    ];
  });

  return [
    ...allPaths.map(([path, freq, priority]) => entry(path, freq, priority)),
    ...allPaths.map(([path, freq, priority]) => entryEn(path, freq, priority)),
    ...categoryEntries,
    ...alternativeEntries,
  ];
}
