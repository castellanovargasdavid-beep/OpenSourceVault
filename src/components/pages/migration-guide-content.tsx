import Link from "next/link";
import { ArrowRight, Clock, ShieldAlert } from "lucide-react";
import type { OpenSourceTool } from "@/lib/types";
import { LogoImage } from "@/components/site/logo-image";
import { getSaasDomain } from "@/lib/saas-domains";
import { categoryColors } from "@/lib/category-colors";
import {
  getMigrationPatternId,
  getMigrationPatternContentLocalized,
  fillTemplate,
} from "@/lib/migration-patterns";
import { buttonVariants } from "@/components/ui/button";
import { getDictionary } from "@/i18n/get-dictionary";
import { localeHref } from "@/lib/locale-href";
import type { Locale } from "@/i18n/config";
import { cn, getHostname } from "@/lib/utils";

export function MigrationGuideContent({
  tool,
  fromName,
  locale,
}: {
  tool: OpenSourceTool;
  fromName: string;
  locale: Locale;
}) {
  const t = getDictionary(locale);
  const patternId = getMigrationPatternId(fromName);
  const content = getMigrationPatternContentLocalized(patternId, locale);
  const palette = categoryColors[tool.category];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-slate-600">
        <Link href={localeHref("/", locale)} className="hover:text-emerald-700">
          {t.breadcrumb.home}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">{t.migrationGuidePage.breadcrumb(fromName, tool.name)}</span>
      </nav>

      <header className="mb-10">
        <div className="mb-4 flex items-center gap-3">
          <LogoImage
            domain={getSaasDomain(fromName)}
            label={fromName}
            size={44}
            className="rounded-xl grayscale"
            fallbackGradient="from-slate-300 to-slate-400"
          />
          <ArrowRight size={18} className="text-slate-300" />
          <LogoImage
            domain={getHostname(tool.websiteUrl)}
            label={tool.name}
            size={44}
            className="rounded-xl"
            fallbackGradient={palette.gradient}
          />
        </div>
        <span className={cn("inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium", palette.border, palette.soft, palette.text)}>
          {t.migrationGuidePage.badge}
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {t.migrationGuidePage.h1(fromName, tool.name)}
        </h1>
        <p className="mt-4 text-lg text-slate-600">{content.intro}</p>
      </header>

      <ol className="space-y-8">
        {content.steps.map((step, index) => (
          <li key={step.title} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold", palette.iconBg, palette.iconText)}>
                {index + 1}
              </span>
              <span className="mt-2 h-full w-px bg-slate-200" />
            </div>
            <div className="flex-1 pb-2">
              <h2 className="mb-1.5 text-lg font-semibold text-slate-900">
                {fillTemplate(step.title, fromName, tool.name)}
              </h2>
              <p className="text-sm text-slate-600">{fillTemplate(step.body, fromName, tool.name)}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-5">
        <ShieldAlert size={20} className="mt-0.5 shrink-0 text-amber-600" />
        <div>
          <p className="text-sm font-semibold text-amber-800">{t.migrationGuidePage.beforeCancel(fromName)}</p>
          <p className="mt-1 text-sm text-slate-700">{fillTemplate(content.beforeYouCancel, fromName, tool.name)}</p>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <p className="font-semibold text-slate-900">{t.migrationGuidePage.ctaTitle(tool.name)}</p>
        <p className="mt-1 text-sm text-slate-600">{t.migrationGuidePage.ctaSubtitle}</p>
        <Link href={localeHref(`/tool/${tool.slug}`, locale)} className={cn(buttonVariants({ size: "lg" }), "mt-4 gap-1.5")}>
          {t.migrationGuidePage.ctaButton(tool.name)} <ArrowRight size={16} />
        </Link>
      </div>

      <p className="mt-6 flex items-center gap-1.5 text-xs text-slate-400">
        <Clock size={12} /> {t.migrationGuidePage.footerNote(fromName)}
      </p>
    </div>
  );
}
