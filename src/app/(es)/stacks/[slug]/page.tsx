import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { stacks, getStackBySlug, getLocalizedStack } from "@/data/stacks";
import { getToolById, getLocalizedTool } from "@/data/tools";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/i18n/get-dictionary";
import { StackDetailContent } from "@/components/pages/stack-detail-content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return stacks.map((stack) => ({ slug: stack.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const rawStack = getStackBySlug(slug);
  if (!rawStack) return {};

  const t = getDictionary("es");
  const stack = getLocalizedStack(rawStack, "es");
  const title = t.stackDetailPage.metaTitle(stack.title);
  const description = t.stackDetailPage.metaDescription(stack.title, stack.tools.length);
  const url = `${siteConfig.url}/stacks/${stack.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { es: url, en: `${siteConfig.url}/en/stacks/${stack.slug}` },
    },
    openGraph: { title, description, url },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function StackDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const rawStack = getStackBySlug(slug);
  if (!rawStack) notFound();

  const stack = getLocalizedStack(rawStack, "es");
  const stackTools = stack.tools
    .map((id) => getToolById(id))
    .filter((tool): tool is NonNullable<typeof tool> => Boolean(tool))
    .map((tool) => getLocalizedTool(tool, "es"));

  return <StackDetailContent stack={stack} stackTools={stackTools} locale="es" />;
}
