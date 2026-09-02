import type { MetadataRoute } from "next";
import { tools } from "@/data/tools";
import { categories } from "@/data/categories";
import { categoriesEn } from "@/data/categories.en";
import { getAllSaasSlugs } from "@/lib/alternatives";
import { getAllComparisonSlugs } from "@/lib/comparisons";
import { getCompareHref, getDeployGuideHref, getMigrationGuideHref, getSavingsCalculatorHref } from "@/lib/routes";
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

  const allPaths = [...staticPaths, ...toolPaths];

  // Categorías, páginas "alternativas a X", comparativas, la guía de
  // despliegue, las guías de migración y la calculadora de ahorro: la URL en
  // inglés de todas estas usa su propio segmento (/en/categories/auth-identity,
  // /en/alternatives/notion, /en/compare/…, /en/guides/…, /en/savings-calculator)
  // en vez de reutilizar la palabra en español, así que no se pueden generar
  // con el simple prefijo /en que usan entry()/entryEn().
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

  const comparisonEntries: MetadataRoute.Sitemap = getAllComparisonSlugs().flatMap((pair) => {
    const esUrl = `${siteConfig.url}${getCompareHref(pair, "es")}`;
    const enUrl = `${siteConfig.url}${getCompareHref(pair, "en")}`;
    const alternates = { languages: { es: esUrl, en: enUrl } };
    return [
      { url: esUrl, changeFrequency: "monthly", priority: 0.7, alternates },
      { url: enUrl, changeFrequency: "monthly", priority: 0.7, alternates },
    ];
  });

  const migrationGuideEntries: MetadataRoute.Sitemap = tools.flatMap((tool) => {
    const fromSlug = slugify(tool.replaces[0]);
    const esUrl = `${siteConfig.url}${getMigrationGuideHref(fromSlug, tool.slug, "es")}`;
    const enUrl = `${siteConfig.url}${getMigrationGuideHref(fromSlug, tool.slug, "en")}`;
    const alternates = { languages: { es: esUrl, en: enUrl } };
    return [
      { url: esUrl, changeFrequency: "monthly", priority: 0.6, alternates },
      { url: enUrl, changeFrequency: "monthly", priority: 0.6, alternates },
    ];
  });

  const deployGuideEsUrl = `${siteConfig.url}${getDeployGuideHref("es")}`;
  const deployGuideEnUrl = `${siteConfig.url}${getDeployGuideHref("en")}`;
  const deployGuideAlternates = { languages: { es: deployGuideEsUrl, en: deployGuideEnUrl } };

  const savingsCalcEsUrl = `${siteConfig.url}${getSavingsCalculatorHref("es")}`;
  const savingsCalcEnUrl = `${siteConfig.url}${getSavingsCalculatorHref("en")}`;
  const savingsCalcAlternates = { languages: { es: savingsCalcEsUrl, en: savingsCalcEnUrl } };

  return [
    ...allPaths.map(([path, freq, priority]) => entry(path, freq, priority)),
    ...allPaths.map(([path, freq, priority]) => entryEn(path, freq, priority)),
    ...categoryEntries,
    ...alternativeEntries,
    ...comparisonEntries,
    ...migrationGuideEntries,
    { url: deployGuideEsUrl, changeFrequency: "monthly", priority: 0.7, alternates: deployGuideAlternates },
    { url: deployGuideEnUrl, changeFrequency: "monthly", priority: 0.7, alternates: deployGuideAlternates },
    { url: savingsCalcEsUrl, changeFrequency: "monthly", priority: 0.8, alternates: savingsCalcAlternates },
    { url: savingsCalcEnUrl, changeFrequency: "monthly", priority: 0.8, alternates: savingsCalcAlternates },
  ];
}
