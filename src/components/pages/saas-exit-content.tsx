"use client";

import * as React from "react";
import Link from "next/link";
import { DollarSign, TrendingDown, Rocket, Share2, Check, Server, Search } from "lucide-react";
import type { SaasExitItem } from "@/lib/saas-exit";
import { hostingProviders } from "@/data/hosting-providers";
import { HardwareFitPanel } from "@/components/site/hardware-fit-panel";
import { HostingTierRecommendation } from "@/components/site/hosting-tier-recommendation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { localeHref } from "@/lib/locale-href";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";

const formatUsd = (value: number, locale: Locale) =>
  new Intl.NumberFormat(locale === "en" ? "en-US" : "es-ES", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export function SaasExitContent({
  catalog,
  locale = "es",
  t,
  hardwareT,
  hostingTierT,
}: {
  catalog: SaasExitItem[];
  locale?: Locale;
  t: Dictionary["saasExit"];
  hardwareT: Dictionary["hardwareFit"];
  hostingTierT: Dictionary["hostingTier"];
}) {
  const [checked, setChecked] = React.useState<Set<string>>(new Set());
  const [teamSize, setTeamSize] = React.useState(5);
  const [shareCopied, setShareCopied] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const filteredCatalog = search.trim()
    ? catalog.filter((item) => item.saasName.toLowerCase().includes(search.trim().toLowerCase()))
    : catalog;

  function toggle(slug: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  const checkedItems = catalog.filter((item) => checked.has(item.saasSlug));

  let saasAnnual = 0;
  for (const item of checkedItems) {
    saasAnnual += item.pricingModel === "perSeat" ? item.priceUsd * teamSize * 12 : item.priceUsd * 12;
  }

  const uniqueTools = new Map<string, { slug: string; name: string; minRamMb: number }>();
  for (const item of checkedItems) {
    if (!uniqueTools.has(item.primaryToolSlug)) {
      uniqueTools.set(item.primaryToolSlug, { slug: item.primaryToolSlug, name: item.primaryToolName, minRamMb: item.minRamMb });
    }
  }
  const toolList = [...uniqueTools.values()];
  const totalMinRamMb = toolList.reduce((sum, tool) => sum + tool.minRamMb, 0);

  const cheapestVpsMonthly = Math.min(...hostingProviders.map((p) => p.monthlyUsdApprox));
  const selfHostAnnual = cheapestVpsMonthly * 12;
  const savings = Math.max(saasAnnual - selfHostAnnual, 0);
  const savingsPercent = saasAnnual > 0 ? Math.round((savings / saasAnnual) * 100) : 0;

  const toolSlugsKey = toolList.map((tool) => tool.slug).join(",");
  const builderHref = `${localeHref("/stacks/builder", locale)}?tools=${encodeURIComponent(toolSlugsKey)}`;

  async function handleShare() {
    const summary =
      locale === "en"
        ? `I just audited my SaaS tools with AltFreeStack: I spend ${formatUsd(saasAnnual, locale)}/year and could save ${formatUsd(savings, locale)}/year (${savingsPercent}%) self-hosting the open source equivalent. https://altfreestack.com/en/saas-exit`
        : `Acabo de auditar mis herramientas SaaS con AltFreeStack: gasto ${formatUsd(saasAnnual, locale)}/año y podría ahorrar ${formatUsd(savings, locale)}/año (${savingsPercent}%) auto-hospedando el equivalente open source. https://altfreestack.com/saas-exit`;
    try {
      await navigator.clipboard.writeText(summary);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    } catch {
      window.prompt(t.shareButton, summary);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <div className="rounded-xl border border-slate-200 p-6">
          <label className="mb-1.5 block text-sm font-medium text-slate-700">{t.teamSizeLabel}</label>
          <input
            type="number"
            min={1}
            max={1000}
            value={teamSize}
            onChange={(e) => setTeamSize(Math.max(1, Number(e.target.value) || 1))}
            className="h-11 w-32 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          />
        </div>

        <div>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">{t.checklistTitle}</h2>
          <div className="relative mb-3">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.searchPlaceholder} className="pl-9" />
          </div>
          {filteredCatalog.length === 0 && <p className="mb-3 text-sm text-slate-500">{t.searchNoResults}</p>}
          <ul className="space-y-2">
            {filteredCatalog.map((item) => {
              const isChecked = checked.has(item.saasSlug);
              return (
                <li key={item.saasSlug}>
                  <label
                    className={cn(
                      "flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-4 py-3 transition-colors",
                      isChecked ? "border-emerald-300 bg-emerald-50/60" : "border-slate-200 bg-white hover:border-slate-300"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggle(item.saasSlug)}
                        className="h-4 w-4 shrink-0 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>
                        <span className="block font-medium text-slate-900">{item.saasName}</span>
                        <span className="text-xs text-slate-500">
                          {item.billingNote}
                          {item.pricingModel === "flat" && ` · ${t.flatPlanNote}`}
                        </span>
                      </span>
                    </span>
                    <span className="shrink-0 text-sm font-semibold text-slate-700">
                      {formatUsd(item.priceUsd, locale)}
                      <span className="font-normal text-slate-400">/mo</span>
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>

        {checkedItems.length > 0 && toolList.length > 0 && (
          <div>
            <h2 className="mb-3 text-lg font-semibold text-slate-900">{t.replacementToolsTitle}</h2>
            <ul className="flex flex-wrap gap-2">
              {toolList.map((tool) => (
                <li
                  key={tool.slug}
                  className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-800"
                >
                  <Check size={13} /> {tool.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-xl border-2 border-slate-900 bg-slate-900 p-6 text-white">
          <p className="mb-4 text-sm font-semibold">{t.verdictTitle}</p>

          {checkedItems.length === 0 ? (
            <p className="text-sm text-slate-300">{t.emptyStateTitle}</p>
          ) : (
            <div className="space-y-4">
              <div className="flex items-start gap-2.5">
                <DollarSign size={18} className="mt-0.5 shrink-0 text-slate-400" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">{t.annualSaasCostLabel}</p>
                  <p className="mt-0.5 text-xl font-bold">{formatUsd(saasAnnual, locale)}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Server size={18} className="mt-0.5 shrink-0 text-slate-400" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">{t.annualSelfHostLabel}</p>
                  <p className="mt-0.5 text-xl font-bold">{formatUsd(selfHostAnnual, locale)}</p>
                  <p className="mt-1 text-xs text-slate-400">{t.annualSelfHostNote}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 border-t border-slate-700 pt-4">
                <TrendingDown size={18} className="mt-0.5 shrink-0 text-emerald-400" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-emerald-400">{t.netSavingsLabel}</p>
                  <p className="mt-0.5 text-2xl font-bold text-emerald-400">{formatUsd(savings, locale)}</p>
                  <p className="mt-1 text-xs text-emerald-300">{`${savingsPercent}${t.netSavingsSuffix}`}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 border-t border-slate-700 pt-4">
                <Link href={builderHref} className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                  <Rocket size={15} /> {t.loadIntoBuilderButton}
                </Link>
                <p className="text-center text-xs text-slate-400">{t.loadIntoBuilderHint}</p>
                <Button variant="ghost" size="sm" onClick={handleShare} className="gap-1.5 text-slate-300 hover:bg-slate-800 hover:text-white">
                  <Share2 size={14} />
                  {shareCopied ? t.shareCopied : t.shareButton}
                </Button>
              </div>
            </div>
          )}
        </div>

        {checkedItems.length > 0 && (
          <>
            <HardwareFitPanel totalMinRamMb={totalMinRamMb} gpuRequiredToolNames={[]} t={hardwareT} />
            <HostingTierRecommendation totalMinRamMb={totalMinRamMb} locale={locale} t={hostingTierT} />
          </>
        )}

        <p className="text-xs text-slate-500">{t.disclaimer}</p>
      </aside>
    </div>
  );
}
