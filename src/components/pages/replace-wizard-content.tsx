"use client";

import * as React from "react";
import Link from "next/link";
import { Search, X, Check, ArrowRight, Rocket } from "lucide-react";
import type { ReplaceMapping } from "@/lib/replace";
import { ReplaceEntryCard } from "@/components/site/replace-entry-card";
import { LogoImage } from "@/components/site/logo-image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useStackBuilder } from "@/lib/stack-builder-store";
import { getSaasDomain } from "@/lib/saas-domains";
import { trackReplaceEvent } from "@/lib/analytics";
import { localeHref } from "@/lib/locale-href";
import { getDictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";

/**
 * "Reemplaza mi SaaS" — Fase 2/3/4/5/8 del brief. Dos pasos en una sola
 * página (nunca un formulario largo): 1) qué SaaS usas, 2) sus alternativas
 * reales con su encaje/caso de uso/limitación, listas para añadir al stack.
 *
 * Fase 5 — "no dupliques el estado": la selección de ALTERNATIVAS no vive en
 * un estado propio de este componente, es directamente el stack activo de
 * useStackBuilder() (vía <AddToStackButton> dentro de ReplaceEntryCard) — el
 * mismo store que ya lee /stacks/builder. Solo la selección de SaaS (paso 1,
 * que todavía no es "stack") es estado local efímero de este wizard.
 */
export function ReplaceWizardContent({
  mappings,
  locale = "es",
}: {
  mappings: ReplaceMapping[];
  locale?: Locale;
}) {
  // Resuelto dentro del cliente, no recibido como prop — replaceFlow tiene
  // funciones (alternativesFor, selectedCount) y React no deja pasar
  // funciones de servidor a cliente. Mismo patrón que SavingsCalculator.
  const t = getDictionary(locale).replaceFlow;
  const builder = useStackBuilder();

  const [step, setStep] = React.useState<"select-saas" | "view-alternatives">("select-saas");
  const [selectedSlugs, setSelectedSlugs] = React.useState<string[]>([]);
  const [search, setSearch] = React.useState("");

  const startedRef = React.useRef(false);
  React.useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackReplaceEvent({ name: "replace_started" });
  }, []);

  const filteredMappings = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return mappings;
    return mappings.filter((m) => m.saasName.toLowerCase().includes(q));
  }, [mappings, search]);

  const selectedMappings = mappings.filter((m) => selectedSlugs.includes(m.saasSlug));

  function toggleSaas(saasSlug: string) {
    // El evento de analítica vive fuera del updater de setState a propósito:
    // React puede invocar esa función más de una vez (StrictMode en
    // desarrollo, reintentos concurrentes) y un efecto secundario dentro
    // duplicaría el evento — ver commit que corrigió este bug real.
    const wasSelected = selectedSlugs.includes(saasSlug);
    setSelectedSlugs((prev) => (prev.includes(saasSlug) ? prev.filter((s) => s !== saasSlug) : [...prev, saasSlug]));
    if (!wasSelected) trackReplaceEvent({ name: "saas_selected", saasSlug });
  }

  function handleContinue() {
    if (selectedSlugs.length === 0) return;
    setStep("view-alternatives");
  }

  function handleBack() {
    setStep("select-saas");
  }

  const toolCount = builder.hydrated ? builder.activeStack.toolSlugs.length : 0;

  function handleBuildStack() {
    trackReplaceEvent({ name: "stack_created", toolCount, placement: "replace_wizard" });
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-8">
        <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">{t.badge}</span>
        {step === "select-saas" ? (
          <>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-emerald-700">{t.step1Eyebrow}</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{t.pageTitle}</h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-600">{t.pageSubtitle}</p>
          </>
        ) : (
          <>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-emerald-700">{t.step2Eyebrow}</p>
            <button type="button" onClick={handleBack} className="mt-1 block text-sm font-medium text-slate-500 hover:text-emerald-700">
              {t.backButton}
            </button>
          </>
        )}
      </header>

      {step === "select-saas" ? (
        <div className="space-y-6">
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.searchPlaceholder} className="pl-9" />
          </div>

          {filteredMappings.length === 0 ? (
            <p className="text-sm text-slate-500">{t.searchNoResults}</p>
          ) : (
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
              {filteredMappings.map((m) => {
                const isSelected = selectedSlugs.includes(m.saasSlug);
                return (
                  <button
                    key={m.saasSlug}
                    type="button"
                    onClick={() => toggleSaas(m.saasSlug)}
                    aria-pressed={isSelected}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-xl border px-3 py-4 text-center transition-colors",
                      isSelected ? "border-emerald-400 bg-emerald-50 ring-1 ring-emerald-400" : "border-slate-200 bg-white hover:border-slate-300"
                    )}
                  >
                    <span className="relative">
                      <LogoImage domain={getSaasDomain(m.saasName)} label={m.saasName} size={32} fallbackGradient="from-slate-300 to-slate-400" className="rounded-lg" />
                      {isSelected && (
                        <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-white">
                          <Check size={10} />
                        </span>
                      )}
                    </span>
                    <span className="text-xs font-medium text-slate-900">{m.saasName}</span>
                  </button>
                );
              })}
            </div>
          )}

          {selectedSlugs.length > 0 && (
            <div>
              <p className="mb-2 text-sm font-semibold text-slate-900">{t.selectedSaasTitle}</p>
              <ul className="flex flex-wrap gap-2">
                {selectedMappings.map((m) => (
                  <li
                    key={m.saasSlug}
                    className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 py-1 pl-1.5 pr-3 text-sm font-medium text-emerald-800"
                  >
                    <LogoImage domain={getSaasDomain(m.saasName)} label={m.saasName} size={20} fallbackGradient="from-slate-300 to-slate-400" className="rounded" />
                    {m.saasName}
                    <button type="button" aria-label={t.removeSaasLabel} onClick={() => toggleSaas(m.saasSlug)} className="rounded-full p-0.5 hover:bg-emerald-100">
                      <X size={13} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Button onClick={handleContinue} disabled={selectedSlugs.length === 0} className="gap-1.5">
            {t.continueButton} <ArrowRight size={15} />
          </Button>
        </div>
      ) : (
        <div className="space-y-10">
          {selectedMappings.map((m) => (
            <section key={m.saasSlug} className="min-w-0">
              <h2 className="mb-3 flex items-center gap-2.5 text-lg font-semibold text-slate-900">
                <LogoImage domain={getSaasDomain(m.saasName)} label={m.saasName} size={24} fallbackGradient="from-slate-300 to-slate-400" className="rounded" />
                {t.alternativesFor(m.saasName)}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {m.entries.map((entry) => (
                  <ReplaceEntryCard key={entry.tool.slug} entry={entry} saasSlug={m.saasSlug} saasName={m.saasName} locale={locale} />
                ))}
              </div>
            </section>
          ))}

          <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50/40 p-6">
            <p className="text-sm font-semibold text-emerald-900">{builder.hydrated ? t.selectedCount(toolCount) : ""}</p>
            {toolCount === 0 ? (
              <p className="mt-1 text-sm text-emerald-800">{t.buildStackEmptyNote}</p>
            ) : (
              <>
                <p className="mt-1 text-sm text-emerald-800">{t.buildStackHint}</p>
                <Link
                  href={localeHref("/stacks/builder", locale)}
                  onClick={handleBuildStack}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  <Rocket size={15} /> {t.buildStackButton}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
