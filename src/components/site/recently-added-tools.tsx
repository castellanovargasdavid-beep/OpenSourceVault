import Link from "next/link";
import { Sparkles } from "lucide-react";
import { getRecentlyAddedTools } from "@/data/tools";
import { toToolCardData } from "@/lib/tool-card-data";
import { ToolCard } from "@/components/site/tool-card";
import { getDictionary } from "@/i18n/get-dictionary";
import { localeHref } from "@/lib/locale-href";
import type { Locale } from "@/i18n/config";

/**
 * Muestra las últimas herramientas incorporadas al catálogo — una lista fija
 * verificada contra el historial real de git (ver RECENTLY_ADDED_TOOL_IDS en
 * src/data/tools.ts), no una fecha inferida en build time. Señal honesta de
 * que el catálogo sigue creciendo, sin depender de datos que no tenemos.
 */
export function RecentlyAddedTools({ locale = "es" }: { locale?: Locale }) {
  const t = getDictionary(locale);
  const recent = getRecentlyAddedTools();
  if (recent.length === 0) return null;

  return (
    <section className="bg-gradient-to-b from-white via-emerald-50/40 to-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
              <Sparkles size={14} /> {t.recentlyAdded.badge}
            </span>
            <h2 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">{t.recentlyAdded.title}</h2>
            <p className="mt-2 max-w-xl text-slate-600">{t.recentlyAdded.subtitle}</p>
          </div>
          <Link
            href={localeHref("/#explorador", locale)}
            className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
          >
            {t.recentlyAdded.viewAll}
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recent.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={toToolCardData(tool)}
              locale={locale}
              t={t.toolCard}
              comingSoonBadge={t.comingSoon.badge}
              difficultyT={t.difficulty}
              stackBuilderT={t.stackBuilder}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
