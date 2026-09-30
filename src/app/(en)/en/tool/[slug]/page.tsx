import type { Metadata, ResolvingMetadata } from "next";
import { inheritedSocialImages } from "@/lib/metadata";
import { notFound } from "next/navigation";
import { tools, getToolBySlug, getLocalizedTool } from "@/data/tools";
import { getDictionary } from "@/i18n/get-dictionary";
import { siteConfig } from "@/lib/site-config";
import { ToolPageContent } from "@/components/pages/tool-page-content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 86400;
/** `tools` ya es la lista publicada-solamente (ver src/data/tools.ts) —
 * esto además impide que Next intente SSR bajo demanda cualquier slug
 * "coming_soon"/"scheduled" que alguien adivine directamente en la URL. */
export const dynamicParams = false;

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: PageProps, parent: ResolvingMetadata): Promise<Metadata> {
  const { slug } = await params;
  const rawTool = getToolBySlug(slug);
  if (!rawTool) return {};
  const tool = getLocalizedTool(rawTool, "en");

  const t = getDictionary("en");
  const mainSaas = tool.replaces[0];
  const title = t.toolPage.metaTitle(tool.name, mainSaas, siteConfig.year);
  const description = tool.shortDescription;
  const url = `${siteConfig.url}/en/tool/${tool.slug}`;

  const { openGraphImages, twitterImages } = await inheritedSocialImages(parent);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { es: `${siteConfig.url}/tool/${tool.slug}`, en: url, "x-default": `${siteConfig.url}/tool/${tool.slug}` },
    },
    openGraph: { title, description, url, type: "article", images: openGraphImages },
    twitter: { card: "summary_large_image", title, description, images: twitterImages },
  };
}

export default async function ToolPageEn({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  return <ToolPageContent tool={tool} locale="en" />;
}
