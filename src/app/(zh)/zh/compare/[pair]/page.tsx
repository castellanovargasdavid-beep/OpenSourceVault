import type { Metadata, ResolvingMetadata } from "next";
import { inheritedSocialImages } from "@/lib/metadata";
import { notFound } from "next/navigation";
import { getComparisonBySlug } from "@/lib/comparisons";
import { getCompareHref } from "@/lib/routes";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/i18n/get-dictionary";
import { ZhComparisonPageContent } from "@/components/pages/zh-comparison-page-content";
import { ZH_COMPARE_PAIR_SLUGS } from "@/lib/zh-mvp";

interface PageProps {
  params: Promise<{ pair: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return ZH_COMPARE_PAIR_SLUGS.map((pair) => ({ pair }));
}

export async function generateMetadata({ params }: PageProps, parent: ResolvingMetadata): Promise<Metadata> {
  const { pair } = await params;
  if (!ZH_COMPARE_PAIR_SLUGS.includes(pair)) return {};
  const comparison = getComparisonBySlug(pair);
  if (!comparison) return {};

  const { toolA, toolB } = comparison;
  const t = getDictionary("zh");
  const title = t.comparisonPage.metaTitle(toolA.name, toolB.name, siteConfig.year);
  const description = t.comparisonPage.metaDescription(toolA.name, toolB.name);
  const url = `${siteConfig.url}${getCompareHref(comparison.pairSlug, "zh")}`;

  const { openGraphImages, twitterImages } = await inheritedSocialImages(parent);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        es: `${siteConfig.url}${getCompareHref(comparison.pairSlug, "es")}`,
        en: `${siteConfig.url}${getCompareHref(comparison.pairSlug, "en")}`,
        "zh-CN": url,
        "x-default": `${siteConfig.url}${getCompareHref(comparison.pairSlug, "es")}`,
      },
    },
    openGraph: { title, description, url, type: "article", locale: "zh_CN", images: openGraphImages },
    twitter: { card: "summary_large_image", title, description, images: twitterImages },
  };
}

export default async function ChineseComparisonPage({ params }: PageProps) {
  const { pair } = await params;
  if (!ZH_COMPARE_PAIR_SLUGS.includes(pair)) notFound();
  const comparison = getComparisonBySlug(pair);
  if (!comparison) notFound();

  return <ZhComparisonPageContent comparison={comparison} />;
}
