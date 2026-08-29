import Link from "next/link";
import { Flame } from "lucide-react";
import { getFeaturedTools } from "@/data/tools";
import { ToolCard } from "@/components/site/tool-card";
import { getDictionary } from "@/i18n/get-dictionary";
import { localeHref } from "@/lib/locale-href";
import type { Locale } from "@/i18n/config";

export function FeaturedTools({ locale = "es" }: { locale?: Locale }) {
  const t = getDictionary(locale);
  const featured = getFeaturedTools();
  if (featured.length === 0) return null;

  return (
    <section
      id="destacadas"
      className="bg-gradient-to-b from-white via-violet-50/40 to-white py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
              <Flame size={14} /> {t.featuredTools.badge}
            </span>
            <h2 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">{t.featuredTools.title}</h2>
            <p className="mt-2 max-w-xl text-slate-600">{t.featuredTools.subtitle}</p>
          </div>
          <Link
            href={localeHref("/#explorador", locale)}
            className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
          >
            {t.featuredTools.viewAll}
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((tool) => (
            <ToolCard key={tool.id} tool={tool} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
