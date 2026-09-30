import type { Metadata, ResolvingMetadata } from "next";
import { inheritedSocialImages } from "@/lib/metadata";
import { notFound } from "next/navigation";
import { getAllReplaceSlugs, getReplaceMapping } from "@/lib/replace";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/i18n/get-dictionary";
import { ReplaceGuideContent } from "@/components/pages/replace-guide-content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllReplaceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps, parent: ResolvingMetadata): Promise<Metadata> {
  const { slug } = await params;
  const mapping = getReplaceMapping(slug, "es");
  if (!mapping) return {};

  const t = getDictionary("es");
  const title = t.replacePage.metaTitle(mapping.saasName, siteConfig.year);
  const description = t.replacePage.metaDescription(mapping.saasName, mapping.entries.length);
  const url = `${siteConfig.url}/replace/${mapping.saasSlug}`;

  const { openGraphImages, twitterImages } = await inheritedSocialImages(parent);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { es: url, en: `${siteConfig.url}/en/replace/${mapping.saasSlug}`, "x-default": url },
    },
    openGraph: { title, description, url, type: "article", images: openGraphImages },
    twitter: { card: "summary_large_image", title, description, images: twitterImages },
  };
}

export default async function ReplaceGuidePage({ params }: PageProps) {
  const { slug } = await params;
  const mapping = getReplaceMapping(slug, "es");
  if (!mapping) notFound();

  const t = getDictionary("es");
  return <ReplaceGuideContent mapping={mapping} locale="es" dict={t} />;
}
