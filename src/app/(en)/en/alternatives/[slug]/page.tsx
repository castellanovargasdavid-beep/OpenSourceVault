import type { Metadata, ResolvingMetadata } from "next";
import { inheritedSocialImages } from "@/lib/metadata";
import { notFound } from "next/navigation";
import { getAllSaasSlugs, getSaasAlternatives } from "@/lib/alternatives";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/i18n/get-dictionary";
import { AlternativaPageContent } from "@/components/pages/alternativa-page-content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Cierra el set de rutas al conjunto real de SaaS con alternativas (ver getAllSaasSlugs) — un slug inventado da 404 inmediato en vez de un SSR bajo demanda que solo termina en notFound(). */
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSaasSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps, parent: ResolvingMetadata): Promise<Metadata> {
  const { slug } = await params;
  const group = getSaasAlternatives(slug);
  if (!group) return {};

  const t = getDictionary("en");
  const title = t.alternativaPage.metaTitle(group.saasName, siteConfig.year, group.tools.length);
  const description = t.alternativaPage.metaDescription(group.tools.length, group.saasName);
  const url = `${siteConfig.url}/en/alternatives/${group.saasSlug}`;

  const { openGraphImages, twitterImages } = await inheritedSocialImages(parent);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { es: `${siteConfig.url}/alternativas/${group.saasSlug}`, en: url },
    },
    openGraph: { title, description, url, type: "article", images: openGraphImages },
    twitter: { card: "summary_large_image", title, description, images: twitterImages },
  };
}

export default async function AlternativaPageEn({ params }: PageProps) {
  const { slug } = await params;
  const group = getSaasAlternatives(slug);
  if (!group) notFound();

  return <AlternativaPageContent group={group} locale="en" />;
}
