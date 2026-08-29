import Link from "next/link";
import type { CategoryMeta } from "@/data/categories";
import type { OpenSourceTool } from "@/lib/types";
import { ToolCard } from "@/components/site/tool-card";
import { categoryColors } from "@/lib/category-colors";
import { categoryIconMap } from "@/lib/category-icons";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/i18n/get-dictionary";
import { localeHref } from "@/lib/locale-href";
import type { Locale } from "@/i18n/config";

export function CategoryPageContent({
  category,
  categoryTools,
  locale,
}: {
  category: CategoryMeta;
  categoryTools: OpenSourceTool[];
  locale: Locale;
}) {
  const t = getDictionary(locale);
  const palette = categoryColors[category.id];
  const Icon = categoryIconMap[category.icon];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-slate-500">
        <Link href={localeHref("/", locale)} className="hover:text-emerald-700">
          {t.breadcrumb.home}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">{category.label}</span>
      </nav>

      <header className="mb-10 max-w-2xl">
        <span className={cn("mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl", palette.iconBg, palette.iconText)}>
          <Icon size={24} />
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{category.label}</h1>
        <p className="mt-4 text-lg text-slate-600">{category.description}</p>
      </header>

      {categoryTools.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoryTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} locale={locale} />
          ))}
        </div>
      ) : (
        <p className="text-slate-500">{t.categoryPage.emptyState}</p>
      )}
    </div>
  );
}
