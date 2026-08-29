import type { Metadata } from "next";
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { from, to } = await params;
  const resolved = resolveGuide(from, to);
  if (!resolved) return {};
  const { tool, fromName } = resolved;

  const t = getDictionary("es");
  const title = t.migrationGuidePage.metaTitle(fromName, tool.name, siteConfig.year);
  const description = t.migrationGuidePage.metaDescription(fromName, tool.name);
  const url = `${siteConfig.url}/guias/migrar/${from}/${to}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { es: url, en: `${siteConfig.url}/en/guias/migrar/${from}/${to}` },
    },
    openGraph: { title, description, url, type: "article" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function MigrationGuidePage({ params }: PageProps) {
  const { from, to } = await params;
  const resolved = resolveGuide(from, to);
  if (!resolved) notFound();
  const { tool, fromName } = resolved;

  return <MigrationGuideContent tool={tool} fromName={fromName} locale="es" />;
}
