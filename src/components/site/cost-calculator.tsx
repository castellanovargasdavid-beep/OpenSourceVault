"use client";

import * as React from "react";
import Link from "next/link";
import { Cpu, HardDrive, Users, Sparkles, Server, DollarSign, TrendingDown, Rocket, Receipt } from "lucide-react";
import { saasPricing } from "@/data/saas-pricing";
import { hostingProviders } from "@/data/hosting-providers";
import { matchHostingTiers } from "@/lib/hosting-tier";
import { HostingTierRecommendation } from "@/components/site/hosting-tier-recommendation";
import { buttonVariants } from "@/components/ui/button";
import { localeHref } from "@/lib/locale-href";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

const formatUsd = (value: number, locale: Locale) =>
  new Intl.NumberFormat(locale === "en" ? "en-US" : "es-ES", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const RAM_MIN_GB = 1;
const RAM_MAX_GB = 64;
const STORAGE_MIN_GB = 20;
const STORAGE_MAX_GB = 1024;
const USERS_MIN = 1;
const USERS_MAX = 50;

// Media real de los SaaS con precio por asiento (pricingModel: "perSeat") ya
// verificados en src/data/saas-pricing.ts — nunca un número inventado, solo
// un punto de partida editable por el usuario con su propia cifra real.
const perSeatEntries = saasPricing.filter((s) => s.pricingModel === "perSeat");
const DEFAULT_SAAS_PER_USER = Math.round(
  (perSeatEntries.reduce((sum, s) => sum + s.pricePerSeatUsd, 0) / perSeatEntries.length) * 100
) / 100;

export function CostCalculator({ locale = "es" }: { locale?: Locale }) {
  // t.costCalculator incluye una función de interpolación (saasPerUserDefaultNote),
  // que React no puede pasar como prop serializada de Server a Client Component
  // — mismo motivo por el que SavingsCalculator/SaasExitContent resuelven el
  // diccionario aquí dentro en vez de recibirlo ya resuelto.
  const t = getDictionary(locale).costCalculator;
  const hostingTierT = getDictionary(locale).hostingTier;

  const [ramGb, setRamGb] = React.useState(4);
  const [storageGb, setStorageGb] = React.useState(40);
  const [users, setUsers] = React.useState(5);
  const [includesGpu, setIncludesGpu] = React.useState(false);
  const [saasPerUser, setSaasPerUser] = React.useState(DEFAULT_SAAS_PER_USER);

  const providers = hostingProviders;
  const ramMb = ramGb * 1024;
  const matches = matchHostingTiers(providers, ramMb);
  const cheapestMonthly = matches
    .map((m) => m.tier?.monthlyUsdApprox)
    .filter((price): price is number => price !== undefined)
    .sort((a, b) => a - b)[0];

  const selfHostedMonthly = cheapestMonthly;
  const saasMonthly = saasPerUser * users;
  const savings = selfHostedMonthly !== undefined ? Math.max(saasMonthly - selfHostedMonthly, 0) : 0;
  const savingsPercent = selfHostedMonthly !== undefined && saasMonthly > 0 ? Math.round((savings / saasMonthly) * 100) : 0;

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <div className="rounded-xl border border-slate-200 p-6">
          <div className="space-y-6">
            <div>
              <label className="mb-1.5 flex items-center justify-between text-sm font-medium text-slate-700">
                <span className="flex items-center gap-1.5">
                  <Cpu size={15} /> {t.ramLabel}
                </span>
                <span className="font-semibold text-emerald-700">{ramGb} GB</span>
              </label>
              <input
                type="range"
                min={RAM_MIN_GB}
                max={RAM_MAX_GB}
                step={1}
                value={ramGb}
                onChange={(e) => setRamGb(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-emerald-600"
                aria-label={t.ramLabel}
              />
            </div>

            <div>
              <label className="mb-1.5 flex items-center justify-between text-sm font-medium text-slate-700">
                <span className="flex items-center gap-1.5">
                  <HardDrive size={15} /> {t.storageLabel}
                </span>
                <span className="font-semibold text-emerald-700">{storageGb} GB</span>
              </label>
              <input
                type="range"
                min={STORAGE_MIN_GB}
                max={STORAGE_MAX_GB}
                step={10}
                value={storageGb}
                onChange={(e) => setStorageGb(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-emerald-600"
                aria-label={t.storageLabel}
              />
              <p className="mt-1.5 text-xs text-slate-500">{t.storageNote}</p>
            </div>

            <div>
              <label className="mb-1.5 flex items-center justify-between text-sm font-medium text-slate-700">
                <span className="flex items-center gap-1.5">
                  <Users size={15} /> {t.usersLabel}
                </span>
                <span className="font-semibold text-emerald-700">
                  {users}
                  {users === USERS_MAX ? t.usersMaxSuffix : ""}
                </span>
              </label>
              <input
                type="range"
                min={USERS_MIN}
                max={USERS_MAX}
                step={1}
                value={users}
                onChange={(e) => setUsers(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-emerald-600"
                aria-label={t.usersLabel}
              />
            </div>

            <label className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-slate-200 bg-slate-50 p-3">
              <input
                type="checkbox"
                checked={includesGpu}
                onChange={(e) => setIncludesGpu(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="flex items-center gap-1.5 text-sm font-medium text-slate-800">
                <Sparkles size={14} /> {t.gpuCheckboxLabel}
              </span>
            </label>
            {includesGpu && <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">{t.gpuNote}</p>}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">{t.saasPerUserLabel}</label>
              <div className="relative w-40">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">$</span>
                <input
                  type="number"
                  min={0}
                  step={0.5}
                  value={saasPerUser}
                  onChange={(e) => setSaasPerUser(Math.max(0, Number(e.target.value) || 0))}
                  className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-6 pr-3 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                />
              </div>
              <p className="mt-1.5 text-xs text-slate-500">{t.saasPerUserDefaultNote(perSeatEntries.length)}</p>
            </div>
          </div>
        </div>
      </div>

      <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-xl border-2 border-slate-900 bg-slate-900 p-6 text-white">
          <p className="mb-4 text-sm font-semibold">{t.resultTitle}</p>

          <div className="space-y-4">
            <div className="flex items-start gap-2.5">
              <Server size={18} className="mt-0.5 shrink-0 text-slate-400" />
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">{t.selfHostedLabel}</p>
                {selfHostedMonthly !== undefined ? (
                  <p className="mt-0.5 text-xl font-bold">{formatUsd(selfHostedMonthly, locale)}</p>
                ) : (
                  <p className="mt-1 text-xs text-amber-300">{t.selfHostedExceedsNote}</p>
                )}
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <DollarSign size={18} className="mt-0.5 shrink-0 text-slate-400" />
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">{t.saasCostLabel}</p>
                <p className="mt-0.5 text-xl font-bold">{formatUsd(saasMonthly, locale)}</p>
              </div>
            </div>
            {selfHostedMonthly !== undefined && (
              <div className="flex items-start gap-2.5 border-t border-slate-700 pt-4">
                <TrendingDown size={18} className="mt-0.5 shrink-0 text-emerald-400" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-emerald-400">{t.savingsLabel}</p>
                  <p className="mt-0.5 text-2xl font-bold text-emerald-400">
                    {formatUsd(savings, locale)}
                    <span className="text-sm font-medium text-slate-400">{t.savingsPerMonth}</span>
                  </p>
                  {savingsPercent > 0 && <p className="mt-1 text-xs text-emerald-300">{savingsPercent}%</p>}
                </div>
              </div>
            )}
          </div>

          <p className="mt-4 border-t border-slate-700 pt-4 text-xs text-slate-400">{t.disclaimer}</p>
        </div>

        <HostingTierRecommendation totalMinRamMb={ramMb} locale={locale} t={hostingTierT} />

        <div className="rounded-xl border border-slate-200 p-5">
          <p className="mb-3 text-sm font-semibold text-slate-900">{t.ctaSaasExitTitle}</p>
          <div className="flex flex-col gap-2">
            <Link href={localeHref("/saas-exit", locale)} className={cn(buttonVariants({ size: "sm" }), "w-full justify-center gap-1.5")}>
              <Receipt size={14} /> {t.ctaSaasExit}
            </Link>
            <Link
              href={localeHref("/stacks/builder", locale)}
              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full justify-center gap-1.5")}
            >
              <Rocket size={14} /> {t.ctaStackBuilder}
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
