import { Star, FileText, CircleHelp } from "lucide-react";
import type { GithubStats } from "@/lib/github-stats";
import { getRepoHealthStatus, formatRelativeDate } from "@/lib/github-stats";
import { formatStars, cn } from "@/lib/utils";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

const STATUS_STYLES = {
  active: { dot: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200" },
  maintained: { dot: "bg-amber-500", text: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200" },
  stale: { dot: "bg-red-500", text: "text-red-700", bg: "bg-red-50", border: "border-red-200" },
} as const;

/**
 * "Repository Health": último commit (semáforo verde/amarillo/rojo),
 * estrellas y licencia. Si no hay datos en vivo de GitHub (API caída, sin
 * conexión, repo privado...) cae a un estado neutral con las estrellas
 * estimadas del catálogo en vez de romper el render — nunca lanza ni deja
 * la sección a medias.
 */
export function RepoHealthBadge({
  liveStats,
  estimatedStars,
  license,
  locale = "es",
}: {
  liveStats: GithubStats | null;
  estimatedStars?: number;
  license: string;
  locale?: Locale;
}) {
  const t = getDictionary(locale);
  const status = liveStats ? getRepoHealthStatus(liveStats.updatedAt) : null;
  const style = status ? STATUS_STYLES[status] : null;
  const stars = liveStats ? liveStats.stars : estimatedStars;

  return (
    <div className="rounded-xl border border-slate-200 p-6">
      <p className="mb-3 text-sm font-semibold text-slate-900">{t.toolPage.repoHealthTitle}</p>

      <div
        className={cn(
          "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium",
          style ? cn(style.bg, style.border, style.text) : "border-slate-200 bg-slate-50 text-slate-600"
        )}
      >
        {status ? (
          <span className={cn("h-2 w-2 shrink-0 rounded-full", style!.dot)} aria-hidden="true" />
        ) : (
          <CircleHelp size={14} className="shrink-0" />
        )}
        <span>{status ? t.toolPage.repoHealthStatus[status] : t.toolPage.repoHealthStatus.unknown}</span>
      </div>

      {liveStats && (
        <p className="mt-2 text-xs text-slate-600">
          {t.toolPage.repoHealthLastCommit(formatRelativeDate(liveStats.updatedAt, locale))}
        </p>
      )}

      <div className="mt-4 flex flex-col gap-2 text-sm text-slate-700">
        {stars !== undefined && (
          <span className="inline-flex items-center gap-1.5">
            <Star size={14} className="text-amber-500" />
            {liveStats ? formatStars(stars) : `~${formatStars(stars)}`} {t.toolPage.stars}
            {!liveStats && <span className="text-xs text-slate-600">{t.toolPage.estimated}</span>}
          </span>
        )}
        <span className="inline-flex items-center gap-1.5">
          <FileText size={14} className="text-slate-500" />
          {license}
        </span>
      </div>
    </div>
  );
}
