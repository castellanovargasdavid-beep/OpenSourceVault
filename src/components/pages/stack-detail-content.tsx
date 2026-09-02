import Link from "next/link";
import { Check, Database, ExternalLink, Sparkles, TriangleAlert } from "lucide-react";
import type { Stack, OpenSourceTool } from "@/lib/types";
import { getLocalizedTool } from "@/data/tools";
import { getCategoryMetaLocalized } from "@/data/categories";
import { getAlternativeHref } from "@/lib/alternatives";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { LogoImage } from "@/components/site/logo-image";
import { DockerComposeBlock } from "@/components/site/docker-compose-block";
import { OneClickDeploy } from "@/components/site/one-click-deploy";
import { HowToDeployGuide } from "@/components/site/how-to-deploy-guide";
import { JsonLd } from "@/components/site/json-ld";
import { stackIconMap } from "@/lib/stack-icons";
import { categoryColors } from "@/lib/category-colors";
import { difficultyMeta, formatMinRam, resolveToolResourceProfile } from "@/lib/tool-difficulty";
import { getSaasDomain } from "@/lib/saas-domains";
import { siteConfig } from "@/lib/site-config";
import { cn, getHostname } from "@/lib/utils";
import { getDictionary } from "@/i18n/get-dictionary";
import { localeHref } from "@/lib/locale-href";
import type { Locale } from "@/i18n/config";

function StackToolProfile({ tool: rawTool, locale }: { tool: OpenSourceTool; locale: Locale }) {
  const tool = getLocalizedTool(rawTool, locale);
  const t = getDictionary(locale);
  const category = getCategoryMetaLocalized(tool.category, locale);
  const palette = categoryColors[tool.category];
  const { difficulty, minRamMb } = resolveToolResourceProfile(tool);
  const difficultyStyle = difficultyMeta[difficulty];
  const difficultyLabel =
    difficulty === "beginner" ? t.difficulty.beginnerBadge : difficulty === "intermediate" ? t.difficulty.intermediateBadge : t.difficulty.advancedBadge;

  return (
    <div className={cn("rounded-xl border p-6", palette.soft, palette.border)}>
      <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <LogoImage domain={getHostname(tool.websiteUrl)} label={tool.name} size={44} fallbackGradient={palette.gradient} className="rounded-lg" />
          <div>
            <Link href={localeHref(`/tool/${tool.slug}`, locale)} className="font-semibold text-slate-900 hover:text-emerald-700">
              {tool.name}
            </Link>
            <p className="text-sm text-slate-600">{tool.shortDescription}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge className={palette.badge}>{category.label}</Badge>
          {tool.fossModel && (
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium",
                tool.fossModel === "FOSS" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-amber-200 bg-amber-50 text-amber-800"
              )}
            >
              {tool.fossModel === "FOSS" ? <Check size={11} /> : <TriangleAlert size={11} />}
              {tool.fossModel === "FOSS" ? t.toolPage.fossModelFoss : t.toolPage.fossModelOpenCore}
            </span>
          )}
          <span
            title={`${t.difficulty.ramBadgePrefix} ${formatMinRam(minRamMb)}`}
            className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium", difficultyStyle.badgeClass)}
          >
            {difficultyStyle.emoji} {difficultyLabel} · {formatMinRam(minRamMb)}
          </span>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {tool.replaces.map((saas) => (
          <Link
            key={saas}
            href={getAlternativeHref(saas, locale)}
            className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white py-1 pl-1.5 pr-3 text-xs font-semibold text-emerald-800 transition-colors hover:bg-emerald-50"
          >
            <LogoImage domain={getSaasDomain(saas)} label={saas} size={14} fallbackGradient="from-slate-300 to-slate-400" />
            {t.toolPage.replacesBadge(saas)}
          </Link>
        ))}
        {tool.database && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white py-1 pl-2 pr-3 text-xs font-medium text-slate-700">
            <Database size={13} className="text-slate-500" />
            {tool.database}
          </span>
        )}
      </div>

      <OneClickDeploy targets={tool.oneClickDeploy} locale={locale} />
      {tool.dockerCompose && (
        <>
          <HowToDeployGuide
            toolName={tool.name}
            toolSlug={tool.slug}
            dockerCompose={tool.dockerCompose}
            oneClickDeploy={tool.oneClickDeploy}
            locale={locale}
            trigger={t.howToDeploy.trigger}
          />
          <DockerComposeBlock code={tool.dockerCompose} t={t.dockerBlock} />
        </>
      )}

      <Link
        href={localeHref(`/tool/${tool.slug}`, locale)}
        className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-4 gap-1.5")}
      >
        {t.stackDetailPage.viewFullProfile(tool.name)}
        <ExternalLink size={14} />
      </Link>
    </div>
  );
}

export function StackDetailContent({ stack, stackTools, locale }: { stack: Stack; stackTools: OpenSourceTool[]; locale: Locale }) {
  const t = getDictionary(locale);
  const Icon = stackIconMap[stack.icon];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: stack.title,
          description: stack.description,
          itemListElement: stackTools.map((tool, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: tool.name,
            url: `${siteConfig.url}${localeHref(`/tool/${tool.slug}`, locale)}`,
          })),
        }}
      />

      <nav className="mb-6 text-sm text-slate-600">
        <Link href={localeHref("/", locale)} className="hover:text-emerald-700">
          {t.breadcrumb.home}
        </Link>
        <span className="mx-2">/</span>
        <Link href={localeHref("/stacks", locale)} className="hover:text-emerald-700">
          {t.stackDetailPage.breadcrumb}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">{stack.title}</span>
      </nav>

      <header className="mb-10">
        <div className="mb-4 flex items-center gap-3">
          <span className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white ${stack.gradient}`}>
            <Icon size={24} />
          </span>
          <Badge variant="secondary">{stack.categoryTag}</Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{stack.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">{stack.description}</p>

        <div className="mt-6 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
          <Sparkles size={18} className="mt-0.5 shrink-0 text-emerald-700" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{t.stackDetailPage.savingsLabel}</p>
            <p className="text-sm font-medium text-emerald-900">{stack.estimatedSavings}</p>
          </div>
        </div>
      </header>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-slate-900">
          {t.stackDetailPage.toolsTitle} ({stackTools.length})
        </h2>
        <div className="space-y-6">
          {stackTools.map((tool) => (
            <StackToolProfile key={tool.id} tool={tool} locale={locale} />
          ))}
        </div>
      </section>

      <div className="mt-10">
        <Link href={localeHref("/stacks", locale)} className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 hover:underline">
          {t.stackDetailPage.backToStacks}
        </Link>
      </div>
    </div>
  );
}
