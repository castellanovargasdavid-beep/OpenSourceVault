import Link from "next/link";
import { Gift, GraduationCap } from "lucide-react";
import type { OpenSourceTool } from "@/lib/types";
import { buttonVariants } from "@/components/ui/button";
import { LogoImage } from "@/components/site/logo-image";
import { getHostingGuideHref } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

function GuideLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-1 pl-1 text-xs font-medium text-emerald-700 hover:underline">
      <GraduationCap size={12} />
      {label}
    </Link>
  );
}

export function AffiliateHostingWidget({ tool, locale = "es" }: { tool: OpenSourceTool; locale?: Locale }) {
  const t = getDictionary(locale);
  return (
    <div className="rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-6">
      <div className="mb-4 flex items-center gap-2">
        <Gift className="text-emerald-600" size={20} />
        <h3 className="font-semibold text-slate-900">{t.affiliateWidget.title(tool.name)}</h3>
      </div>
      <p className="mb-5 text-sm text-slate-600">
        {t.affiliateWidget.subtitlePrefix}{" "}
        <code className="rounded bg-white px-1.5 py-0.5 text-xs">docker-compose.yml</code>{" "}
        {t.affiliateWidget.subtitleSuffix}
      </p>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <a
            href={tool.affiliateLinks.digitalOceanUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className={cn(buttonVariants({ variant: "default", size: "lg" }), "h-auto w-full flex-col items-start gap-0.5 whitespace-normal px-4 py-3")}
          >
            <span className="flex items-center gap-2">
              <LogoImage domain="digitalocean.com" label="DigitalOcean" size={18} className="rounded" fallbackGradient="from-blue-500 to-blue-600" />
              {t.affiliateWidget.digitalOcean}
            </span>
            <span className="pl-6 text-xs font-normal opacity-90">{t.affiliateWidget.digitalOceanCredit}</span>
          </a>
          <GuideLink href={getHostingGuideHref("digitalocean", locale)} label={t.hostingGuidePage.linkLabel("DigitalOcean")} />
        </div>
        <div className="flex flex-col gap-1.5">
          <a
            href={tool.affiliateLinks.vultrUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className={cn(buttonVariants({ size: "lg" }), "w-full justify-start gap-2 bg-blue-600 hover:bg-blue-500")}
          >
            <LogoImage domain="vultr.com" label="Vultr" size={18} className="rounded" fallbackGradient="from-blue-500 to-blue-600" />
            {t.affiliateWidget.vultr}
          </a>
          <GuideLink href={getHostingGuideHref("vultr", locale)} label={t.hostingGuidePage.linkLabel("Vultr")} />
        </div>
        <div className="flex flex-col gap-1.5">
          <a
            href={tool.affiliateLinks.railwayUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className={cn(buttonVariants({ size: "lg" }), "w-full justify-start gap-2 bg-violet-600 hover:bg-violet-500")}
          >
            <LogoImage domain="railway.app" label="Railway" size={18} className="rounded" fallbackGradient="from-violet-500 to-violet-600" />
            {t.affiliateWidget.railway}
          </a>
          <GuideLink href={getHostingGuideHref("railway", locale)} label={t.hostingGuidePage.linkLabel("Railway")} />
        </div>
      </div>
      <p className="mt-4 text-xs text-slate-600">{t.affiliateWidget.disclaimer}</p>
    </div>
  );
}
