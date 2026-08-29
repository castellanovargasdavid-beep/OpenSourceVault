import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllComparisonSlugs, getComparisonBySlug } from "@/lib/comparisons";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/i18n/get-dictionary";
import { ComparisonPageContent } from "@/components/pages/comparison-page-content";

interface PageProps {
  params: Promise<{ pair: string }>;
}

export function generateStaticParams() {
  return getAllComparisonSlugs().map((pair) => ({ pair }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { pair } = await params;
  const comparison = getComparisonBySlug(pair);
  if (!comparison) return {};

  const { toolA, toolB } = comparison;
  const t = getDictionary("es");
  const title = t.comparisonPage.metaTitle(toolA.name, toolB.name, siteConfig.year);
  const description = t.comparisonPage.metaDescription(toolA.name, toolB.name);
  const url = `${siteConfig.url}/comparar/${comparison.pairSlug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { es: url, en: `${siteConfig.url}/en/comparar/${comparison.pairSlug}` },
    },
    openGraph: { title, description, url, type: "article" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ComparisonPage({ params }: PageProps) {
  const { pair } = await params;
  const comparison = getComparisonBySlug(pair);
  if (!comparison) notFound();

  return <ComparisonPageContent comparison={comparison} locale="es" />;
}
