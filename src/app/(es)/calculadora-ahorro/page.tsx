import type { Metadata } from "next";
import { Calculator } from "lucide-react";
import { SavingsCalculator } from "@/components/site/savings-calculator";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/i18n/get-dictionary";

const t = getDictionary("es");

export const metadata: Metadata = {
  title: t.savingsCalcPage.metaTitle,
  description: t.savingsCalcPage.metaDescription,
  alternates: {
    canonical: `${siteConfig.url}/calculadora-ahorro`,
    languages: {
      es: `${siteConfig.url}/calculadora-ahorro`,
      en: `${siteConfig.url}/en/calculadora-ahorro`,
    },
  },
};

export default function SavingsCalculatorPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
          <Calculator size={14} /> {t.savingsCalcPage.badge}
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{t.savingsCalcPage.title}</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">{t.savingsCalcPage.subtitle}</p>
      </header>

      <SavingsCalculator locale="es" />
    </div>
  );
}
