import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategoryBySlugLocalized } from "@/data/categories";
import { categoriesEn } from "@/data/categories.en";
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
  return categories.map((category) => ({ category: categoriesEn[category.id].slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlugLocalized(categorySlug, "en");
  if (!category) return {};

  const t = getDictionary("en");
  const title = t.categoryPage.metaTitle(category.label, siteConfig.year);
  const description = category.description;
  const url = `${siteConfig.url}/en/categories/${category.slug}`;
  const esSlug = categories.find((c) => c.id === category.id)!.slug;
  // Ver el comentario equivalente en la ruta ES: excluida del sitemap por
  // contenido delgado, pero sigue enlazada desde el footer, así que también
  // necesita noindex explícito aquí.
  const hasPublishedTools = catalogStats.toolCountByCategory[category.id] > 0;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { es: `${siteConfig.url}/categoria/${esSlug}`, en: url },
    },
    openGraph: { title, description, url },
    twitter: { card: "summary_large_image", title, description },
    robots: hasPublishedTools ? undefined : { index: false, follow: true },
  };
}

export default async function CategoryPageEn({ params }: PageProps) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlugLocalized(categorySlug, "en");
  if (!category) notFound();

  const categoryTools = getToolsByCategoryAll(category.id);
  return <CategoryPageContent category={category} categoryTools={categoryTools} locale="en" />;
}
