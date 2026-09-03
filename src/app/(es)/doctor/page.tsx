import type { Metadata } from "next";
import { Stethoscope } from "lucide-react";
import { ComposeDoctorContent } from "@/components/pages/compose-doctor-content";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/i18n/get-dictionary";

const t = getDictionary("es");

export const metadata: Metadata = {
  title: t.composeDoctorPage.metaTitle,
  description: t.composeDoctorPage.metaDescription,
  alternates: {
    canonical: `${siteConfig.url}/doctor`,
    languages: { es: `${siteConfig.url}/doctor`, en: `${siteConfig.url}/en/doctor` },
  },
};

export default function ComposeDoctorPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
          <Stethoscope size={14} /> {t.composeDoctorPage.badge}
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{t.composeDoctorPage.title}</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">{t.composeDoctorPage.subtitle}</p>
      </header>

      <ComposeDoctorContent locale="es" t={t.composeDoctor} />
    </div>
  );
}
