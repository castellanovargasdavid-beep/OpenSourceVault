import Link from "next/link";
import { Check, ExternalLink, GraduationCap } from "lucide-react";
import { getHostingProvidersLocalized } from "@/data/hosting-providers";
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { LogoImage } from "@/components/site/logo-image";
import { getHostingGuideHref } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

export function HostingDealsContent({ locale = "es" }: { locale?: Locale }) {
  const t = getDictionary(locale);
  const hostingProviders = getHostingProvidersLocalized(locale);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-12 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{t.hostingDeals.title}</h1>
        <p className="mt-4 text-lg text-slate-600">{t.hostingDeals.subtitle}</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        {hostingProviders.map((provider) => (
          <Card key={provider.id} className="flex flex-col overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500" />
            <CardHeader>
              <div className="flex items-center gap-3">
                <LogoImage domain={provider.domain} label={provider.name} size={40} fallbackGradient="from-emerald-500 to-blue-600" />
                <p className="text-lg font-semibold text-slate-900">{provider.name}</p>
              </div>
              <CardDescription className="pt-1">{provider.tagline}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-4">
              <div>
                <p className="text-2xl font-bold text-slate-900">{provider.startingPrice}</p>
                {provider.freeCredit && <p className="mt-1 text-sm font-medium text-emerald-700">{provider.freeCredit}</p>}
              </div>
              <p className="text-sm text-slate-600">
                {t.hostingDeals.bestFor} {provider.bestFor}
              </p>
              <ul className="flex-1 space-y-2">
                {provider.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-slate-700">
                    <Check size={16} className="mt-0.5 shrink-0 text-emerald-600" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={provider.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className={cn(buttonVariants({ size: "lg" }), "w-full justify-between")}
              >
                {provider.ctaLabel}
                <ExternalLink size={16} />
              </a>
              <Link
                href={getHostingGuideHref(provider.id, locale)}
                className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-emerald-700 hover:underline"
              >
                <GraduationCap size={15} />
                {t.hostingGuidePage.linkLabel(provider.name)}
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="mt-16 overflow-x-auto">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">{t.hostingDeals.quickCompare}</h2>
        <table className="w-full min-w-[640px] border-collapse overflow-hidden rounded-xl border border-slate-200 text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-600">
              <th className="px-4 py-3">{t.hostingDeals.tableProvider}</th>
              <th className="px-4 py-3">{t.hostingDeals.tablePriceFrom}</th>
              <th className="px-4 py-3">{t.hostingDeals.tableFreeCredit}</th>
              <th className="px-4 py-3">{t.hostingDeals.tableBestFor}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {hostingProviders.map((provider) => (
              <tr key={provider.id}>
                <td className="flex items-center gap-2 px-4 py-3 font-medium text-slate-900">
                  <LogoImage domain={provider.domain} label={provider.name} size={20} fallbackGradient="from-emerald-500 to-blue-600" />
                  {provider.name}
                </td>
                <td className="px-4 py-3 text-slate-600">{provider.startingPrice}</td>
                <td className="px-4 py-3 text-slate-600">{provider.freeCredit ?? "—"}</td>
                <td className="px-4 py-3 text-slate-600">{provider.bestFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <p className="mt-8 text-xs text-slate-600">{t.hostingDeals.disclosure}</p>
    </div>
  );
}
