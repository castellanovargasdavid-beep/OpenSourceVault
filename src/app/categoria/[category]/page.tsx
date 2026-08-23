import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategoryBySlug } from "@/data/categories";
import { getToolsByCategory } from "@/data/tools";
import { ToolCard } from "@/components/site/tool-card";
import { siteConfig } from "@/lib/site-config";

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

  const title = `Alternativas Open Source de ${category.label}`;
  const description = category.description;
  const url = `${siteConfig.url}/categoria/${category.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const categoryTools = getToolsByCategory(category.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/" className="hover:text-emerald-700">
          Inicio
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">{category.label}</span>
      </nav>

      <header className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {category.label}
        </h1>
        <p className="mt-4 text-lg text-slate-600">{category.description}</p>
      </header>

      {categoryTools.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoryTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <p className="text-slate-500">
          Todavía no tenemos herramientas publicadas en esta categoría.
        </p>
      )}
    </div>
  );
}
