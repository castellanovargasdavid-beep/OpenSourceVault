"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, TrendingDown } from "lucide-react";
import { saasPricing } from "@/data/saas-pricing";
import { hostingProviders } from "@/data/hosting-providers";
import { slugify, cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const formatUsd = (value: number) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
    value
  );

export function SavingsCalculator() {
  const [saasName, setSaasName] = React.useState(saasPricing[0].saasName);
  const [seats, setSeats] = React.useState(10);
  const [providerId, setProviderId] = React.useState(hostingProviders[0].id);

  const saas = saasPricing.find((s) => s.saasName === saasName)!;
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
            Herramienta SaaS
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
          <p className="mt-1 text-xs text-slate-400">{saas.billingNote}</p>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Número de usuarios/asientos
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
            Proveedor de hosting
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
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            {saasName} al año
          </p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{formatUsd(saasAnnualCost)}</p>
          <p className="mt-1 text-xs text-slate-400">
            {seats} {seats === 1 ? "asiento" : "asientos"} × {formatUsd(saas.pricePerSeatUsd)}/mes
          </p>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
            Auto-hospedado al año
          </p>
          <p className="mt-1 text-2xl font-bold text-emerald-700">
            {formatUsd(selfHostAnnualCost)}
          </p>
          <p className="mt-1 text-xs text-emerald-600">
            1 servidor en {provider.name}, usuarios ilimitados
          </p>
        </div>
        <div className="rounded-xl border border-slate-900 bg-slate-900 p-5 text-center text-white">
          <p className="flex items-center justify-center gap-1 text-xs font-medium uppercase tracking-wide text-emerald-400">
            <TrendingDown size={14} /> Ahorro estimado
          </p>
          <p className="mt-1 text-2xl font-bold">{formatUsd(savings)}</p>
          <p className="mt-1 text-xs text-slate-300">{savingsPercent}% menos al año</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-400">
        Precios de lista aproximados y orientativos ({saas.billingNote.toLowerCase()}); verifica el
        precio vigente en la web oficial de {saasName}. No incluye el tiempo que dediques tú (o
        alguien de tu equipo) al mantenimiento del servidor.
      </p>

      <Link
        href={`/alternativa-a-${slugify(saasName)}`}
        className={cn(buttonVariants({ size: "lg" }), "mt-6 w-full justify-center gap-1.5 sm:w-auto")}
      >
        Ver alternativas open source a {saasName} <ArrowRight size={16} />
      </Link>
    </div>
  );
}
