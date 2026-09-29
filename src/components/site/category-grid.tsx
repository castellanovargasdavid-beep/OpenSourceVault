import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories, getCategoryHref } from "@/data/categories";
import { categoriesEn } from "@/data/categories.en";
import { catalogStats } from "@/lib/catalog-stats";
import { categoryColors } from "@/lib/category-colors";
import { categoryIconMap } from "@/lib/category-icons";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

export function CategoryGrid({ locale = "es" }: { locale?: Locale }) {
  const t = getDictionary(locale);
  // Igual que sitemap.ts (Bloque 5): una categoría sin ninguna herramienta
  // publicada todavía no tiene nada que mostrar detrás del enlace — aquí
  // es aún más visible que en el sitemap, porque es la sección de
  // descubrimiento más prominente de la home. Se sigue definiendo en
  // categories.ts (la taxonomía no cambia), solo deja de listarse aquí
  // hasta que tenga al menos 1 herramienta real.
  const categoriesWithTools = categories.filter((category) => catalogStats.toolCountByCategory[category.id] > 0);

  return (
    <section id="categorias" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-2xl">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{t.categoryGrid.title}</h2>
        <p className="mt-2 text-slate-600">{t.categoryGrid.subtitle}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categoriesWithTools.map((category) => {
          const Icon = categoryIconMap[category.icon];
          // Antes esto contaba sobre `allTools` (incluye herramientas
          // "scheduled" aún no publicadas) mientras el resto de la home
          // (Hero) contaba solo publicadas — dos totales distintos en la
          // misma página. Ahora ambos leen de la misma fuente única
          // (catalogStats, ver src/lib/catalog-stats.ts).
          const count = catalogStats.toolCountByCategory[category.id];
          const palette = categoryColors[category.id];
          const label = locale === "en" ? categoriesEn[category.id].label : category.label;
          const description = locale === "en" ? categoriesEn[category.id].description : category.description;
          return (
            <Link
              key={category.id}
              href={getCategoryHref(category.id, locale)}
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
                <p className="mt-1 text-sm text-slate-600">{description}</p>
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
