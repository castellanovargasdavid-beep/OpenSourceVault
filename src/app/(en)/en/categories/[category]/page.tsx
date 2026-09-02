import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategoryBySlugLocalized } from "@/data/categories";
import { categoriesEn } from "@/data/categories.en";
import { getToolsByCategoryAll } from "@/data/tools";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/i18n/get-dictionary";
import { CategoryPageContent } from "@/components/pages/category-page-content";

interface PageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return categories.map((category) => ({ category: categoriesEn[category.id].slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlugLocalized(categorySlug, "en");
  if (!category) return {};

  const t = getDictionary("en");
  const title = t.categoryPage.metaTitle(category.label);
  const description = category.description;
  const url = `${siteConfig.url}/en/categories/${category.slug}`;
  const esSlug = categories.find((c) => c.id === category.id)!.slug;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { es: `${siteConfig.url}/categoria/${esSlug}`, en: url },
    },
    openGraph: { title, description, url },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CategoryPageEn({ params }: PageProps) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlugLocalized(categorySlug, "en");
  if (!category) notFound();

  const categoryTools = getToolsByCategoryAll(category.id);
  return <CategoryPageContent category={category} categoryTools={categoryTools} locale="en" />;
}
