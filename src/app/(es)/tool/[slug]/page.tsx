import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { tools, getToolBySlug } from "@/data/tools";
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};

  const t = getDictionary("es");
  const mainSaas = tool.replaces[0];
  const title = t.toolPage.metaTitle(tool.name, mainSaas, siteConfig.year);
  const description = tool.shortDescription;
  const url = `${siteConfig.url}/tool/${tool.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { es: url, en: `${siteConfig.url}/en/tool/${tool.slug}` },
    },
    openGraph: { title, description, url, type: "article" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  return <ToolPageContent tool={tool} locale="es" />;
}
