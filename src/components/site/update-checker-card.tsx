import { RefreshCw, Rss, ExternalLink, ShieldCheck } from "lucide-react";
import type { LatestRelease } from "@/lib/github-stats";
import { formatRelativeDate } from "@/lib/github-stats";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

const SAFE_UPDATE_COMMAND = "tar -czvf backup-pre-update-$(date +%F).tar.gz ./data 2>/dev/null; docker compose pull && docker compose up -d";

/**
 * "¿Es seguro actualizar?" — deliberadamente NO clasifica versiones como
 * seguras/rompedoras (eso exigiría inventar qué cambió entre versiones para
 * cada herramienta, algo que no podemos verificar). En su lugar: la versión
 * real más reciente (vía GitHub API), un enlace directo a sus notas reales,
 * un checklist siempre-cierto de mantenimiento seguro, y el feed RSS real
 * y gratuito que GitHub ya expone para cualquier repo público.
 */
export function UpdateCheckerCard({
  latestRelease,
  releasesUrl,
  feedUrl,
  locale = "es",
}: {
  latestRelease: LatestRelease | null;
  releasesUrl: string | null;
  feedUrl: string | null;
  locale?: Locale;
}) {
  const t = getDictionary(locale).updateChecker;

  return (
    <div className="rounded-xl border border-slate-200 p-6">
      <p className="mb-3 text-sm font-semibold text-slate-900">{t.title}</p>

      <div className="mb-4">
        <p className="text-xs uppercase tracking-wide text-slate-600">{t.latestVersionLabel}</p>
        {latestRelease ? (
          <p className="mt-0.5 flex flex-wrap items-center gap-1.5 text-sm font-medium text-slate-900">
            <RefreshCw size={14} className="shrink-0 text-slate-500" />
            {latestRelease.tag}
            {latestRelease.publishedAt && (
              <span className="text-xs font-normal text-slate-500">· {formatRelativeDate(latestRelease.publishedAt, locale)}</span>
            )}
          </p>
        ) : (
          <p className="mt-0.5 text-sm text-slate-500">{t.noReleaseData}</p>
        )}
        {releasesUrl && (
          <a
            href={releasesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-emerald-700 hover:underline"
          >
            {t.viewReleaseNotesLink}
          </a>
        )}
      </div>

      <div className="mb-4 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
        <p className="mb-1.5 flex items-center gap-1.5 font-semibold text-slate-800">
          <ShieldCheck size={13} className="shrink-0 text-emerald-600" /> {t.checklistTitle}
        </p>
        <ul className="list-disc space-y-1 pl-4">
          <li>{t.checklistBackup}</li>
          <li>{t.checklistChangelog}</li>
          <li>{t.checklistNoAutomation}</li>
        </ul>
      </div>

      <p className="mb-1 text-xs font-medium text-slate-700">{t.safeUpdateCommandTitle}</p>
      <pre className="mb-4 overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-emerald-300">
        <code>{SAFE_UPDATE_COMMAND}</code>
      </pre>

      {feedUrl && (
        <div className="border-t border-slate-100 pt-3">
          <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-slate-800">
            <Rss size={13} className="shrink-0 text-amber-500" /> {t.rssTitle}
          </p>
          <p className="mb-1.5 text-xs text-slate-600">{t.rssDesc}</p>
          <a
            href={feedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 hover:underline"
          >
            {t.rssLink} <ExternalLink size={11} />
          </a>
          <p className="mt-1.5 text-[11px] text-slate-500">{t.rssToDiscordHint}</p>
        </div>
      )}
    </div>
  );
}
