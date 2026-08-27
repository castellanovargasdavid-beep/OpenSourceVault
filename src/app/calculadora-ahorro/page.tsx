import type { Metadata } from "next";
import { Calculator } from "lucide-react";
import { SavingsCalculator } from "@/components/site/savings-calculator";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Calculadora: ¿Cuánto ahorras auto-hospedando en vez de pagar SaaS?",
  description:
    "Calcula en segundos cuánto te ahorras al año auto-hospedando la alternativa open source a Notion, Slack, Airtable, Salesforce y más, frente a pagar la suscripción SaaS por asiento.",
  alternates: { canonical: `${siteConfig.url}/calculadora-ahorro` },
};

export default function SavingsCalculatorPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
          <Calculator size={14} /> Calculadora
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          ¿Cuánto ahorras auto-hospedando?
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">
          Compara el coste anual de tu SaaS actual por asiento contra un único servidor
          auto-hospedado con usuarios ilimitados.
        </p>
      </header>

      <SavingsCalculator />
    </div>
  );
}
