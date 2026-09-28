import type { Metadata } from "next";
import { Server } from "lucide-react";
import { CostCalculator } from "@/components/site/cost-calculator";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getCostCalculatorHref } from "@/lib/routes";

const t = getDictionary("en");

export const metadata: Metadata = {
  title: t.costCalculatorPage.metaTitle,
  description: t.costCalculatorPage.metaDescription,
  alternates: {
    canonical: `${siteConfig.url}${getCostCalculatorHref("en")}`,
    languages: {
      es: `${siteConfig.url}${getCostCalculatorHref("es")}`,
      en: `${siteConfig.url}${getCostCalculatorHref("en")}`,
    },
  },
};

export default function CostCalculatorPageEn() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
          <Server size={14} /> {t.costCalculatorPage.badge}
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{t.costCalculatorPage.title}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">{t.costCalculatorPage.subtitle}</p>
      </header>

      <CostCalculator locale="en" />
    </div>
  );
}
