import type { Metadata, ResolvingMetadata } from "next";
import { inheritedSocialImages } from "@/lib/metadata";
import { notFound } from "next/navigation";
import { getAllSaasSlugs, getSaasAlternatives } from "@/lib/alternatives";
import { getAllIntentPageSlugs, getIntentPage, getIntentPageHref } from "@/lib/intent-pages";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/i18n/get-dictionary";
import { AlternativaPageContent } from "@/components/pages/alternativa-page-content";
import { IntentPageContent } from "@/components/pages/intent-page-content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Cierra el set de rutas al conjunto real de SaaS con alternativas MÁS las páginas de intención que existen de verdad (ver getAllIntentPageSlugs) — un slug inventado o una combinación SaaS+intención sin contenido curado da 404 inmediato. */
export const dynamicParams = false;

export function generateStaticParams() {
  return [...getAllSaasSlugs(), ...getAllIntentPageSlugs("en")].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps, parent: ResolvingMetadata): Promise<Metadata> {
  const { slug } = await params;
  const t = getDictionary("en");
  const { openGraphImages, twitterImages } = await inheritedSocialImages(parent);

  const group = getSaasAlternatives(slug);
  if (group) {
    const title = t.alternativaPage.metaTitle(group.saasName, siteConfig.year, group.tools.length);
    const description = t.alternativaPage.metaDescription(group.tools.length, group.saasName);
    const url = `${siteConfig.url}/en/alternatives/${group.saasSlug}`;
    return {
      title,
      description,
      alternates: {
        canonical: url,
        languages: { es: `${siteConfig.url}/alternativas/${group.saasSlug}`, en: url, "x-default": `${siteConfig.url}/alternativas/${group.saasSlug}` },
      },
      openGraph: { title, description, url, type: "article", images: openGraphImages },
      twitter: { card: "summary_large_image", title, description, images: twitterImages },
    };
  }

  const intentPage = getIntentPage(slug, "en");
  if (!intentPage) return {};

  const title = t.intentPage.metaTitle[intentPage.intent](intentPage.saasName, siteConfig.year);
  const description = t.intentPage.metaDescription[intentPage.intent](intentPage.saasName, intentPage.eligibleTools.length);
  const url = `${siteConfig.url}${getIntentPageHref(intentPage.saasName, intentPage.intent, "en")}`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        es: `${siteConfig.url}${getIntentPageHref(intentPage.saasName, intentPage.intent, "es")}`,
        en: url,
      },
    },
    openGraph: { title, description, url, type: "article", images: openGraphImages },
    twitter: { card: "summary_large_image", title, description, images: twitterImages },
  };
}

export default async function AlternativaPageEn({ params }: PageProps) {
  const { slug } = await params;

  const group = getSaasAlternatives(slug);
  if (group) return <AlternativaPageContent group={group} locale="en" />;

  const intentPage = getIntentPage(slug, "en");
  if (intentPage) return <IntentPageContent page={intentPage} locale="en" />;

  notFound();
}
