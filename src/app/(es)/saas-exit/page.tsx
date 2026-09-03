import type { Metadata } from "next";
import { Receipt } from "lucide-react";
import { SaasExitContent } from "@/components/pages/saas-exit-content";
import { buildSaasExitCatalog } from "@/lib/saas-exit";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/i18n/get-dictionary";

const t = getDictionary("es");

export const metadata: Metadata = {
  title: t.saasExitPage.metaTitle,
  description: t.saasExitPage.metaDescription,
  alternates: {
    canonical: `${siteConfig.url}/saas-exit`,
    languages: { es: `${siteConfig.url}/saas-exit`, en: `${siteConfig.url}/en/saas-exit` },
  },
};

export default function SaasExitPage() {
  const catalog = buildSaasExitCatalog("es");
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
          <Receipt size={14} /> {t.saasExitPage.badge}
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{t.saasExitPage.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">{t.saasExitPage.subtitle}</p>
      </header>

      <SaasExitContent catalog={catalog} locale="es" t={t.saasExit} hardwareT={t.hardwareFit} />
    </div>
  );
}
