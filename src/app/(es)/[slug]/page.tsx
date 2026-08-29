import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSaasSlugs, getSaasAlternatives } from "@/lib/alternatives";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/i18n/get-dictionary";
import { AlternativaPageContent } from "@/components/pages/alternativa-page-content";

const ALTERNATIVA_PREFIX = "alternativa-a-";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Next.js App Router no permite prefijos estáticos dentro de un mismo segmento
 * dinámico (una carpeta "alternativa-a-[slug]" no enruta). Para conseguir la
 * URL /alternativa-a-[slug] pedida, capturamos el segmento completo aquí y
 * parseamos el prefijo en código.
 */
function getSaasSlugFromRouteSlug(routeSlug: string): string | null {
  if (!routeSlug.startsWith(ALTERNATIVA_PREFIX)) return null;
  return routeSlug.slice(ALTERNATIVA_PREFIX.length) || null;
}

export function generateStaticParams() {
  return getAllSaasSlugs().map((saasSlug) => ({
    slug: `${ALTERNATIVA_PREFIX}${saasSlug}`,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: routeSlug } = await params;
  const saasSlug = getSaasSlugFromRouteSlug(routeSlug);
  const group = saasSlug ? getSaasAlternatives(saasSlug) : undefined;
  if (!group) return {};

  const t = getDictionary("es");
  const title = t.alternativaPage.metaTitle(group.saasName, siteConfig.year);
  const description = t.alternativaPage.metaDescription(group.tools.length, group.saasName);
  const url = `${siteConfig.url}/${ALTERNATIVA_PREFIX}${group.saasSlug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { es: url, en: `${siteConfig.url}/en/${ALTERNATIVA_PREFIX}${group.saasSlug}` },
    },
    openGraph: { title, description, url, type: "article" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function AlternativaPage({ params }: PageProps) {
  const { slug: routeSlug } = await params;
  const saasSlug = getSaasSlugFromRouteSlug(routeSlug);
  const group = saasSlug ? getSaasAlternatives(saasSlug) : undefined;
  if (!group) notFound();

  return <AlternativaPageContent group={group} locale="es" />;
}
