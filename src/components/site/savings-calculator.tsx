"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, TrendingDown } from "lucide-react";
import { saasPricing, getSaasPricingLocalized } from "@/data/saas-pricing";
import { getHostingProvidersLocalized } from "@/data/hosting-providers";
import { getAlternativeHref } from "@/lib/alternatives";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

const formatUsd = (value: number, locale: Locale) =>
  new Intl.NumberFormat(locale === "en" ? "en-US" : "es-ES", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export function SavingsCalculator({ locale = "es" }: { locale?: Locale }) {
  // t.savingsCalculator incluye varias funciones de interpolación
  // (perYear, disclaimer, cta...), que React no puede serializar como prop
  // de un Server Component a un Client Component — por eso se resuelve aquí
  // dentro en vez de recibirse ya resuelto, a diferencia de otros componentes.
  const t = getDictionary(locale).savingsCalculator;
  const hostingProviders = getHostingProvidersLocalized(locale);
  const [saasName, setSaasName] = React.useState(saasPricing[0].saasName);
  const [seats, setSeats] = React.useState(10);
  const [providerId, setProviderId] = React.useState(hostingProviders[0].id);

  const saas = getSaasPricingLocalized(saasName, locale)!;
  const provider = hostingProviders.find((p) => p.id === providerId)!;

  const saasAnnualCost = saas.pricePerSeatUsd * seats * 12;
  const selfHostAnnualCost = provider.monthlyUsdApprox * 12;
  const savings = Math.max(saasAnnualCost - selfHostAnnualCost, 0);
  const savingsPercent = saasAnnualCost > 0 ? Math.round((savings / saasAnnualCost) * 100) : 0;

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            {t.saasLabel}
          </label>
          <select
            value={saasName}
            onChange={(e) => setSaasName(e.target.value)}
            className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            {saasPricing.map((s) => (
              <option key={s.saasName} value={s.saasName}>
                {s.saasName}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-slate-600">{saas.billingNote}</p>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            {t.seatsLabel}
          </label>
          <input
            type="number"
            min={1}
            max={1000}
            value={seats}
            onChange={(e) => setSeats(Math.max(1, Number(e.target.value) || 1))}
            className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            {t.providerLabel}
          </label>
          <select
            value={providerId}
            onChange={(e) => setProviderId(e.target.value)}
            className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            {hostingProviders.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.startingPrice})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-600">
            {t.perYear(saasName)}
          </p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{formatUsd(saasAnnualCost, locale)}</p>
          <p className="mt-1 text-xs text-slate-600">
            {seats} {t.seatsUnit(seats)} × {formatUsd(saas.pricePerSeatUsd, locale)}/{t.perMonth}
          </p>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
            {t.selfHostedPerYear}
          </p>
          <p className="mt-1 text-2xl font-bold text-emerald-700">
            {formatUsd(selfHostAnnualCost, locale)}
          </p>
          <p className="mt-1 text-xs text-emerald-600">{t.selfHostedNote(provider.name)}</p>
        </div>
        <div className="rounded-xl border border-slate-900 bg-slate-900 p-5 text-center text-white">
          <p className="flex items-center justify-center gap-1 text-xs font-medium uppercase tracking-wide text-emerald-400">
            <TrendingDown size={14} /> {t.estimatedSavings}
          </p>
          <p className="mt-1 text-2xl font-bold">{formatUsd(savings, locale)}</p>
          <p className="mt-1 text-xs text-slate-300">{t.lessPerYear(savingsPercent)}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-600">
        {t.disclaimer(saas.billingNote.toLowerCase(), saasName)}
      </p>

      <Link
        href={getAlternativeHref(saasName, locale)}
        className={cn(buttonVariants({ size: "lg" }), "mt-6 w-full justify-center gap-1.5 sm:w-auto")}
      >
        {t.cta(saasName)} <ArrowRight size={16} />
      </Link>
    </div>
  );
}
