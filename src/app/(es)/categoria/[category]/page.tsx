import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategoryBySlug, getCategoryHref } from "@/data/categories";
import { getToolsByCategoryAll } from "@/data/tools";
import { catalogStats } from "@/lib/catalog-stats";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/i18n/get-dictionary";
import { CategoryPageContent } from "@/components/pages/category-page-content";

interface PageProps {
  params: Promise<{ category: string }>;
}

/** Cierra el set de rutas a las categorías reales del catálogo — un slug inventado da 404 inmediato en vez de un SSR bajo demanda que solo termina en notFound(). */
export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) return {};

  const t = getDictionary("es");
  const title = t.categoryPage.metaTitle(category.label, siteConfig.year);
  const description = category.description;
  const url = `${siteConfig.url}/categoria/${category.slug}`;
  // sitemap.ts ya excluye a propósito las categorías sin ninguna herramienta
  // publicada (contenido delgado) — pero la página sigue enlazada desde el
  // footer de todo el sitio, así que sin esto seguía siendo indexable por
  // ese enlace aunque no apareciera en el sitemap.
  const hasPublishedTools = catalogStats.toolCountByCategory[category.id] > 0;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { es: url, en: `${siteConfig.url}${getCategoryHref(category.id, "en")}` },
    },
    openGraph: { title, description, url },
    twitter: { card: "summary_large_image", title, description },
    robots: hasPublishedTools ? undefined : { index: false, follow: true },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const categoryTools = getToolsByCategoryAll(category.id);
  return <CategoryPageContent category={category} categoryTools={categoryTools} locale="es" />;
}
