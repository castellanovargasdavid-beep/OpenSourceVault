import type { Metadata, ResolvingMetadata } from "next";
import { inheritedSocialImages } from "@/lib/metadata";
import { notFound } from "next/navigation";
import { getToolBySlug, getLocalizedTool } from "@/data/tools";
import { getDictionary } from "@/i18n/get-dictionary";
import { siteConfig } from "@/lib/site-config";
import { ZhToolPageContent } from "@/components/pages/zh-tool-page-content";
import { ZH_TOOL_SLUGS } from "@/lib/zh-mvp";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 86400;
/**
 * Cierra las rutas /zh/tool/* a exactamente las 10 del piloto (ver
 * lib/zh-mvp.ts) — dynamicParams = false asegura que ningún slug fuera de
 * esa lista pueda generar una página bajo demanda, aunque exista en el
 * catálogo ES/EN completo. Es la misma garantía que ya usan
 * (es)/tool/[slug] y (en)/en/tool/[slug] contra slugs sin publicar, aquí
 * aplicada a "sin traducir todavía".
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return ZH_TOOL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps, parent: ResolvingMetadata): Promise<Metadata> {
  const { slug } = await params;
  if (!ZH_TOOL_SLUGS.includes(slug)) return {};
  const rawTool = getToolBySlug(slug);
  if (!rawTool) return {};
  const tool = getLocalizedTool(rawTool, "zh");

  const t = getDictionary("zh");
  const mainSaas = tool.replaces[0];
  const title = t.toolPage.metaTitle(tool.name, mainSaas, siteConfig.year, tool.fossModel);
  const description = tool.shortDescription;
  const url = `${siteConfig.url}/zh/tool/${tool.slug}`;

  const { openGraphImages, twitterImages } = await inheritedSocialImages(parent);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        es: `${siteConfig.url}/tool/${tool.slug}`,
        en: `${siteConfig.url}/en/tool/${tool.slug}`,
        "zh-CN": url,
        "x-default": `${siteConfig.url}/tool/${tool.slug}`,
      },
    },
    openGraph: { title, description, url, type: "article", locale: "zh_CN", images: openGraphImages },
    twitter: { card: "summary_large_image", title, description, images: twitterImages },
  };
}

export default async function ChineseToolPage({ params }: PageProps) {
  const { slug } = await params;
  if (!ZH_TOOL_SLUGS.includes(slug)) notFound();
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  return <ZhToolPageContent tool={tool} />;
}
