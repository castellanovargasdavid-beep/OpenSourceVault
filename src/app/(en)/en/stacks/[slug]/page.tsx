import type { Metadata, ResolvingMetadata } from "next";
import { inheritedSocialImages } from "@/lib/metadata";
import { notFound } from "next/navigation";
import { stacks, getStackBySlug, getLocalizedStack } from "@/data/stacks";
import { getToolById, getLocalizedTool } from "@/data/tools";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/i18n/get-dictionary";
import { StackDetailContent } from "@/components/pages/stack-detail-content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Cierra el set de rutas a los packs listos reales — un slug inventado da 404 inmediato en vez de un SSR bajo demanda que solo termina en notFound(). */
export const dynamicParams = false;

export function generateStaticParams() {
  return stacks.map((stack) => ({ slug: stack.slug }));
}

export async function generateMetadata({ params }: PageProps, parent: ResolvingMetadata): Promise<Metadata> {
  const { slug } = await params;
  const rawStack = getStackBySlug(slug);
  if (!rawStack) return {};

  const t = getDictionary("en");
  const stack = getLocalizedStack(rawStack, "en");
  const title = t.stackDetailPage.metaTitle(stack.title);
  const description = t.stackDetailPage.metaDescription(stack.title, stack.tools.length);
  const url = `${siteConfig.url}/en/stacks/${stack.slug}`;

  const { openGraphImages, twitterImages } = await inheritedSocialImages(parent);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { es: `${siteConfig.url}/stacks/${stack.slug}`, en: url },
    },
    openGraph: { title, description, url, images: openGraphImages },
    twitter: { card: "summary_large_image", title, description, images: twitterImages },
  };
}

export default async function StackDetailPageEn({ params }: PageProps) {
  const { slug } = await params;
  const rawStack = getStackBySlug(slug);
  if (!rawStack) notFound();

  const stack = getLocalizedStack(rawStack, "en");
  const stackTools = stack.tools
    .map((id) => getToolById(id))
    .filter((tool): tool is NonNullable<typeof tool> => Boolean(tool))
    .map((tool) => getLocalizedTool(tool, "en"));

  return <StackDetailContent stack={stack} stackTools={stackTools} locale="en" />;
}
