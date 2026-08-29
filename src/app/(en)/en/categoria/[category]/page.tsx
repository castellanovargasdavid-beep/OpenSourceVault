import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategoryBySlug, getCategoryMetaLocalized } from "@/data/categories";
import { getToolsByCategory } from "@/data/tools";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/i18n/get-dictionary";
import { CategoryPageContent } from "@/components/pages/category-page-content";

interface PageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) return {};

  const localized = getCategoryMetaLocalized(category.id, "en");
  const t = getDictionary("en");
  const title = t.categoryPage.metaTitle(localized.label);
  const description = localized.description;
  const url = `${siteConfig.url}/en/categoria/${category.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { es: `${siteConfig.url}/categoria/${category.slug}`, en: url },
    },
    openGraph: { title, description, url },
  };
}

export default async function CategoryPageEn({ params }: PageProps) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const localized = getCategoryMetaLocalized(category.id, "en");
  const categoryTools = getToolsByCategory(category.id);
  return <CategoryPageContent category={localized} categoryTools={categoryTools} locale="en" />;
}
