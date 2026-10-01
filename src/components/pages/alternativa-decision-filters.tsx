"use client";

import * as React from "react";
import Link from "next/link";
import type { AlternativeTableRow } from "@/lib/alternatives";
import type { OpenSourceTool } from "@/lib/types";
import { formatMinRam, difficultyMeta } from "@/lib/tool-difficulty";
import { ToolCard } from "@/components/site/tool-card";
import { toToolCardData } from "@/lib/tool-card-data";
import { localeHref } from "@/lib/locale-href";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";

type FilterId = "foss" | "easyInstall" | "lowRam" | "permissiveLicense";

/**
 * Solo las cadenas planas de t.alternativaPage que este Client Component
 * necesita — NUNCA el namespace completo: alternativaPage también contiene
 * funciones (metaTitle, faqDockerA...) para el Server Component padre, y
 * pasar un objeto con funciones a un Client Component rompe la
 * serialización de TODO el build (ver comentario de la misma clase de bug
 * en tool-explorer.tsx/tool-card.tsx).
 */
type AlternativaPageStrings = Pick<
  Dictionary["alternativaPage"],
  "tableTitle" | "sortNote" | "tableHeaders" | "badgeLightestRam" | "badgeMostPopular" | "detailedCardsTitle" | "filters"
>;

/**
 * Filtros objetivos, no una puntuación subjetiva: cada uno reutiliza un dato
 * ya presente en el catálogo (badgeCodes de buildAlternativeTableRows(), o el
 * tag "permissive-license") — nada nuevo que mantener ni ninguna opinión
 * editorial sobre qué herramienta es "mejor".
 */
function matchesFilter(row: AlternativeTableRow, filter: FilterId): boolean {
  switch (filter) {
    case "foss":
      return row.badgeCodes.includes("pureFoss");
    case "easyInstall":
      return row.badgeCodes.includes("oneClickDeploy");
    case "lowRam":
      return row.badgeCodes.includes("lightestRam");
    case "permissiveLicense":
      return row.tool.tags.includes("permissive-license");
  }
}

/**
 * Tabla comparativa + fichas detalladas de /alternativas/[slug], con una
 * capa de filtros por chip encima (AND entre los activos). Vive en un
 * Client Component solo por el estado de los filtros — los datos ya vienen
 * resueltos por el Server Component padre (AlternativaPageContent).
 */
export function AlternativeDecisionFilters({
  rows,
  tools,
  locale,
  t,
  toolCardT,
  comingSoonBadge,
  difficultyT,
  stackBuilderT,
}: {
  rows: AlternativeTableRow[];
  /** group.tools en su orden original — se usa solo para las fichas detalladas, que ya mostraban ese orden (distinto del de la tabla, ordenada por destacadas/estrellas) antes de este cambio. */
  tools: OpenSourceTool[];
  locale: Locale;
  t: AlternativaPageStrings;
  toolCardT: Dictionary["toolCard"];
  comingSoonBadge: string;
  difficultyT: Dictionary["difficulty"];
  stackBuilderT: Dictionary["stackBuilder"];
}) {
  const [activeFilters, setActiveFilters] = React.useState<FilterId[]>([]);

  function toggle(filter: FilterId) {
    setActiveFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]));
  }

  const visibleRows =
    activeFilters.length === 0 ? rows : rows.filter((row) => activeFilters.every((filter) => matchesFilter(row, filter)));
  const visibleToolIds = new Set(visibleRows.map((row) => row.tool.id));
  const visibleTools = tools.filter((tool) => visibleToolIds.has(tool.id));

  const options: { id: FilterId; label: string }[] = [
    { id: "foss", label: toolCardT.fossModelFoss },
    { id: "easyInstall", label: t.filters.easyInstall },
    { id: "lowRam", label: t.filters.lowRam },
    { id: "permissiveLicense", label: toolCardT.tagPermissive },
  ];

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-slate-600">{t.filters.label}</span>
        {options.map((option) => {
          const active = activeFilters.includes(option.id);
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => toggle(option.id)}
              aria-pressed={active}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                active ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
              )}
            >
              {option.label}
            </button>
          );
        })}
        {activeFilters.length > 0 && (
          <button
            type="button"
            onClick={() => setActiveFilters([])}
            className="text-xs font-medium text-slate-500 underline hover:text-slate-700"
          >
            {t.filters.clear}
          </button>
        )}
      </div>

      <section className="mb-12">
        <h2 className="mb-1 text-xl font-semibold text-slate-900">{t.tableTitle}</h2>
        <p className="mb-4 text-sm text-slate-500">{t.sortNote}</p>
        {visibleRows.length === 0 ? (
          <p className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-600">{t.filters.noResults}</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-slate-50 text-xs font-medium uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">{t.tableHeaders.tool}</th>
                  <th className="px-4 py-3">{t.tableHeaders.license}</th>
                  <th className="px-4 py-3">{t.tableHeaders.ram}</th>
                  <th className="px-4 py-3">{t.tableHeaders.docker}</th>
                  <th className="px-4 py-3">{t.tableHeaders.stars}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visibleRows.map(({ tool, minRamMb, isEstimated, dockerReady, difficulty, badgeCodes }) => (
                  <tr key={tool.id}>
                    <td className="px-4 py-3">
                      <Link href={localeHref(`/tool/${tool.slug}`, locale)} className="font-medium text-slate-900 hover:text-emerald-700">
                        {tool.name}
                      </Link>
                      {badgeCodes.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {badgeCodes.includes("lightestRam") && (
                            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                              {t.badgeLightestRam}
                            </span>
                          )}
                          {badgeCodes.includes("pureFoss") && (
                            <span className="rounded-full border border-sky-200 bg-sky-50 px-2 py-0.5 text-[11px] font-medium text-sky-700">
                              {toolCardT.fossModelFoss}
                            </span>
                          )}
                          {badgeCodes.includes("mostPopular") && (
                            <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700">
                              {t.badgeMostPopular}
                            </span>
                          )}
                          {badgeCodes.includes("oneClickDeploy") && (
                            <span className="rounded-full border border-purple-200 bg-purple-50 px-2 py-0.5 text-[11px] font-medium text-purple-700">
                              {toolCardT.tagOneClick}
                            </span>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{tool.license}</td>
                    <td className="px-4 py-3 text-slate-600">
                      <span
                        title={isEstimated ? difficultyT.ramEstimatedNote : undefined}
                        className={`rounded border px-1.5 py-0.5 text-xs ${difficultyMeta[difficulty].badgeClass}`}
                      >
                        {formatMinRam(minRamMb, isEstimated)}
                      </span>
                    </td>
                    <td className="px-4 py-3">{dockerReady ? "✅" : "—"}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {tool.starsCount ? (
                        <span title={toolCardT.starsSnapshotCaption}>{`★ ~${tool.starsCount.toLocaleString(locale)}`}</span>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <h2 className="mb-4 text-xl font-semibold text-slate-900">{t.detailedCardsTitle}</h2>
      {visibleTools.length > 0 && (
        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleTools.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={toToolCardData(tool)}
              locale={locale}
              t={toolCardT}
              comingSoonBadge={comingSoonBadge}
              difficultyT={difficultyT}
              stackBuilderT={stackBuilderT}
            />
          ))}
        </div>
      )}
    </>
  );
}
