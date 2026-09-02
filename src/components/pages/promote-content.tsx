import { Target, Layers, Link2 } from "lucide-react";
import { PromoteSection } from "@/components/site/promote-section";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

const VALUE_PROP_ICONS = [Target, Layers, Link2];

export function PromoteContent({ locale = "es" }: { locale?: Locale }) {
  const t = getDictionary(locale);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="text-center">
        <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
          {t.promotePage.badge}
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{t.promotePage.title}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">{t.promotePage.subtitle}</p>
      </header>

      <section className="mt-14">
        <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">{t.promotePage.valuePropsTitle}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {t.promotePage.valueProps.map((prop, i) => {
            const Icon = VALUE_PROP_ICONS[i];
            return (
              <div key={prop.title} className="rounded-xl border border-slate-200 bg-white p-5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                  <Icon size={18} />
                </span>
                <p className="mt-3 font-semibold text-slate-900">{prop.title}</p>
                <p className="mt-1.5 text-sm text-slate-600">{prop.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      <PromoteSection locale={locale} t={t.promotePage} />
    </div>
  );
}
