import type { Metadata, ResolvingMetadata } from "next";
import { inheritedSocialImages } from "@/lib/metadata";
import { notFound } from "next/navigation";
import { getAllComparisonSlugs, getComparisonBySlug } from "@/lib/comparisons";
import { getCompareHref } from "@/lib/routes";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/i18n/get-dictionary";
import { ComparisonPageContent } from "@/components/pages/comparison-page-content";

interface PageProps {
  params: Promise<{ pair: string }>;
}

/** Cierra el set de rutas a los pares comparados reales — un slug inventado da 404 inmediato en vez de un SSR bajo demanda que solo termina en notFound(). */
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllComparisonSlugs().map((pair) => ({ pair }));
}

export async function generateMetadata({ params }: PageProps, parent: ResolvingMetadata): Promise<Metadata> {
  const { pair } = await params;
  const comparison = getComparisonBySlug(pair);
  if (!comparison) return {};

  const { toolA, toolB } = comparison;
  const t = getDictionary("es");
  const title = t.comparisonPage.metaTitle(toolA.name, toolB.name, siteConfig.year);
  const description = t.comparisonPage.metaDescription(toolA.name, toolB.name);
  const url = `${siteConfig.url}/comparar/${comparison.pairSlug}`;

  const { openGraphImages, twitterImages } = await inheritedSocialImages(parent);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { es: url, en: `${siteConfig.url}${getCompareHref(comparison.pairSlug, "en")}`, "x-default": url },
    },
    openGraph: { title, description, url, type: "article", images: openGraphImages },
    twitter: { card: "summary_large_image", title, description, images: twitterImages },
  };
}

export default async function ComparisonPage({ params }: PageProps) {
  const { pair } = await params;
  const comparison = getComparisonBySlug(pair);
  if (!comparison) notFound();

  return <ComparisonPageContent comparison={comparison} locale="es" />;
}
