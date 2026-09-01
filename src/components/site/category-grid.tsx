import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import { categoriesEn } from "@/data/categories.en";
import { allTools } from "@/data/tools";
import { categoryColors } from "@/lib/category-colors";
import { categoryIconMap } from "@/lib/category-icons";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/i18n/get-dictionary";
import { localeHref } from "@/lib/locale-href";
import type { Locale } from "@/i18n/config";

export function CategoryGrid({ locale = "es" }: { locale?: Locale }) {
  const t = getDictionary(locale);

  return (
    <section id="categorias" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-2xl">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{t.categoryGrid.title}</h2>
        <p className="mt-2 text-slate-600">{t.categoryGrid.subtitle}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const Icon = categoryIconMap[category.icon];
          const count = allTools.filter((tl) => tl.category === category.id).length;
          const palette = categoryColors[category.id];
          const label = locale === "en" ? categoriesEn[category.id].label : category.label;
          const description = locale === "en" ? categoriesEn[category.id].description : category.description;
          return (
            <Link
              key={category.id}
              href={localeHref(`/categoria/${category.slug}`, locale)}
              className={cn(
                "group relative flex flex-col gap-3 overflow-hidden rounded-xl border bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg",
                palette.border,
                palette.borderHover
              )}
            >
              <div
                className={cn(
                  "pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br",
                  palette.gradient
                )}
              />
              <div className="relative flex items-center justify-between">
                <span className={cn("flex h-11 w-11 items-center justify-center rounded-lg", palette.iconBg, palette.iconText)}>
                  <Icon size={22} />
                </span>
                <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", palette.badge)}>
                  {t.categoryGrid.toolCount(count)}
                </span>
              </div>
              <div className="relative">
                <p className="font-semibold text-slate-900">{label}</p>
                <p className="mt-1 text-sm text-slate-500">{description}</p>
              </div>
              <span
                className={cn(
                  "relative mt-1 inline-flex items-center gap-1 text-sm font-medium opacity-0 transition-opacity duration-200 group-hover:opacity-100",
                  palette.text
                )}
              >
                {t.categoryGrid.explore} <ArrowRight size={14} />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
