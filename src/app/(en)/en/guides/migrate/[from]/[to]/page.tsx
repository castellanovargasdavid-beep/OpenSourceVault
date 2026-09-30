import type { Metadata, ResolvingMetadata } from "next";
import { inheritedSocialImages } from "@/lib/metadata";
import { notFound } from "next/navigation";
import { tools, getToolBySlug } from "@/data/tools";
import { siteConfig } from "@/lib/site-config";
import { slugify } from "@/lib/utils";
import { getDictionary } from "@/i18n/get-dictionary";
import { MigrationGuideContent } from "@/components/pages/migration-guide-content";

interface PageProps {
  params: Promise<{ from: string; to: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return tools.map((tool) => ({
    from: slugify(tool.replaces[0]),
    to: tool.slug,
  }));
}

function resolveGuide(from: string, to: string) {
  const tool = getToolBySlug(to);
  if (!tool) return null;
  const fromName = tool.replaces[0];
  if (slugify(fromName) !== from) return null;
  return { tool, fromName };
}

export async function generateMetadata({ params }: PageProps, parent: ResolvingMetadata): Promise<Metadata> {
  const { from, to } = await params;
  const resolved = resolveGuide(from, to);
  if (!resolved) return {};
  const { tool, fromName } = resolved;

  const t = getDictionary("en");
  const title = t.migrationGuidePage.metaTitle(fromName, tool.name, siteConfig.year);
  const description = t.migrationGuidePage.metaDescription(fromName, tool.name);
  const url = `${siteConfig.url}/en/guides/migrate/${from}/${to}`;

  const { openGraphImages, twitterImages } = await inheritedSocialImages(parent);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { es: `${siteConfig.url}/guias/migrar/${from}/${to}`, en: url, "x-default": `${siteConfig.url}/guias/migrar/${from}/${to}` },
    },
    openGraph: { title, description, url, type: "article", images: openGraphImages },
    twitter: { card: "summary_large_image", title, description, images: twitterImages },
  };
}

export default async function MigrationGuidePageEn({ params }: PageProps) {
  const { from, to } = await params;
  const resolved = resolveGuide(from, to);
  if (!resolved) notFound();
  const { tool, fromName } = resolved;

  return <MigrationGuideContent tool={tool} fromName={fromName} locale="en" />;
}
