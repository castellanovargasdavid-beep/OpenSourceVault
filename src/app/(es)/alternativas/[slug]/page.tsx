import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSaasSlugs, getSaasAlternatives } from "@/lib/alternatives";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/i18n/get-dictionary";
import { AlternativaPageContent } from "@/components/pages/alternativa-page-content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllSaasSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const group = getSaasAlternatives(slug);
  if (!group) return {};

  const t = getDictionary("es");
  const title = t.alternativaPage.metaTitle(group.saasName, siteConfig.year);
  const description = t.alternativaPage.metaDescription(group.tools.length, group.saasName);
  const url = `${siteConfig.url}/alternativas/${group.saasSlug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { es: url, en: `${siteConfig.url}/en/alternatives/${group.saasSlug}` },
    },
    openGraph: { title, description, url, type: "article" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function AlternativaPage({ params }: PageProps) {
  const { slug } = await params;
  const group = getSaasAlternatives(slug);
  if (!group) notFound();

  return <AlternativaPageContent group={group} locale="es" />;
}
