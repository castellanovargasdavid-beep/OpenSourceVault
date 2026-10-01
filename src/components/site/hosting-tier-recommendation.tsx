import { ExternalLink } from "lucide-react";
import { getHostingProvidersLocalized } from "@/data/hosting-providers";
import { matchHostingTiers, classifyHostingCategory } from "@/lib/hosting-tier";
import { formatMinRam } from "@/lib/tool-difficulty";
import { LogoImage } from "@/components/site/logo-image";
import { AffiliateLink } from "@/components/site/affiliate-link";
import { ViewTracker } from "@/components/site/view-tracker";
import { cn } from "@/lib/utils";
import type { AnalyticsPlacement } from "@/lib/analytics";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";

const CATEGORY_STYLE = {
  basic: "border-emerald-200 bg-emerald-50 text-emerald-800",
  pro: "border-amber-200 bg-amber-50 text-amber-800",
  dedicated: "border-rose-200 bg-rose-50 text-rose-800",
} as const;

/**
 * Recomienda el plan de VPS real (DigitalOcean/Vultr, únicos proveedores con
 * enlace de afiliado real en el proyecto) que cubre la RAM que necesita el
 * stack actual, en vez de mostrar siempre el mismo botón de plan de entrada.
 * Si un proveedor no tiene ningún plan que llegue, lo dice — no inventa un
 * precio para un plan que no existe.
 */
export function HostingTierRecommendation({
  totalMinRamMb,
  locale = "es",
  t,
  placement,
}: {
  totalMinRamMb: number;
  locale?: Locale;
  t: Dictionary["hostingTier"];
  placement: AnalyticsPlacement;
}) {
  const providers = getHostingProvidersLocalized(locale);
  const matches = matchHostingTiers(providers, totalMinRamMb);
  const category = classifyHostingCategory(totalMinRamMb);
  const categoryLabel = category === "basic" ? t.categoryBasicLabel : category === "pro" ? t.categoryProLabel : t.categoryDedicatedLabel;
  const categoryDesc = category === "basic" ? t.categoryBasicDesc : category === "pro" ? t.categoryProDesc : t.categoryDedicatedDesc;

  if (matches.length === 0) return null;
  const hasAffiliateLink = matches.some((m) => m.tier);

  return (
    <div className="rounded-xl border border-slate-200 p-6">
      {hasAffiliateLink && (
        <ViewTracker event={{ name: "hosting_view", providers: matches.map((m) => m.provider.id).join(","), placement }} />
      )}
      <p className="mb-3 text-sm font-semibold text-slate-900">{t.title}</p>

      <div className={cn("mb-4 rounded-lg border px-3 py-2.5 text-sm", CATEGORY_STYLE[category])}>
        <p className="font-semibold">{categoryLabel}</p>
        <p className="mt-0.5 text-xs">{categoryDesc}</p>
      </div>

      <div className="space-y-3">
        {matches.map(({ provider, tier }) => {
          const specLine = tier ? `${formatMinRam(tier.ramMb)} / ${tier.vcpu} vCPU · $${tier.monthlyUsdApprox}${t.perMonth}` : null;
          return (
            <div key={provider.id} className="rounded-lg border border-slate-200 p-3">
              <div className="flex items-center gap-2">
                <LogoImage domain={provider.domain} label={provider.name} size={20} className="shrink-0 rounded" fallbackGradient="from-blue-500 to-blue-600" />
                <p className="text-sm font-medium text-slate-900">{provider.name}</p>
              </div>
              {specLine ? <p className="mt-1 text-xs text-slate-500">{specLine}</p> : <p className="mt-1 text-xs text-rose-600">{t.exceedsAllTiersNote}</p>}
              {tier && (
                <AffiliateLink
                  href={provider.affiliateUrl}
                  provider={provider.id}
                  placement={placement}
                  className="mt-2.5 flex items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90"
                >
                  {provider.ctaLabel} <ExternalLink size={11} className="shrink-0" />
                </AffiliateLink>
              )}
            </div>
          );
        })}
      </div>
      {hasAffiliateLink && <p className="mt-4 text-xs text-slate-500">{t.disclaimer}</p>}
    </div>
  );
}
