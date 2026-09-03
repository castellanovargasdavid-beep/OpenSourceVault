import Link from "next/link";
import { GitFork, ExternalLink, Check, X, ArrowRight, PlayCircle, Database, Code2, MonitorSmartphone, TriangleAlert, ChevronDown } from "lucide-react";
import { getLocalizedTool } from "@/data/tools";
import { getCategoryMetaLocalized, getCategoryHref } from "@/data/categories";
import { getStacksForTool, getLocalizedStack } from "@/data/stacks";
import { getAlternativeHref } from "@/lib/alternatives";
import { getMigrationGuideHref, getDeployGuideHref, getCompareHref } from "@/lib/routes";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { AddToStackButton } from "@/components/site/add-to-stack-button";
import { AffiliateHostingWidget } from "@/components/site/affiliate-hosting-widget";
import { DockerComposeBlock } from "@/components/site/docker-compose-block";
import { OneClickDeploy } from "@/components/site/one-click-deploy";
import { HowToDeployGuide } from "@/components/site/how-to-deploy-guide";
import { RepoHealthBadge } from "@/components/site/repo-health-badge";
import { JsonLd } from "@/components/site/json-ld";
import { LogoImage } from "@/components/site/logo-image";
import { ToolPreviewImage } from "@/components/site/tool-preview-image";
import { getSaasDomain } from "@/lib/saas-domains";
import { categoryColors } from "@/lib/category-colors";
import { getComparisonsForTool, type ToolComparison } from "@/lib/comparisons";
import { extractDefaultPort, isComposeFile } from "@/lib/deploy-guide";
import { getGithubStats, formatRelativeDate } from "@/lib/github-stats";
import { getOgImageUrl } from "@/lib/og-image";
import { siteConfig } from "@/lib/site-config";
import { difficultyMeta, formatMinRam, resolveToolResourceProfile } from "@/lib/tool-difficulty";
import { slugify, cn, getHostname } from "@/lib/utils";
import { getDictionary } from "@/i18n/get-dictionary";
import { localeHref } from "@/lib/locale-href";
import type { Locale } from "@/i18n/config";
import type { OpenSourceTool } from "@/lib/types";

export async function ToolPageContent({ tool: rawTool, locale }: { tool: OpenSourceTool; locale: Locale }) {
  const tool = getLocalizedTool(rawTool, locale);
  const t = getDictionary(locale);
  const category = getCategoryMetaLocalized(tool.category, locale);
  const palette = categoryColors[tool.category];
  const comparisons: ToolComparison[] = getComparisonsForTool(tool.slug).slice(0, 5);
  const migrationFromSaas = tool.replaces[0];
  const migrationGuideHref = getMigrationGuideHref(slugify(migrationFromSaas), tool.slug, locale);
  const featuredStacks = getStacksForTool(tool.id).map((stack) => getLocalizedStack(stack, locale));
  const liveStats = await getGithubStats(tool.githubUrl);
  const ogImageUrl = await getOgImageUrl(tool.websiteUrl);
  const { difficulty, minRamMb } = resolveToolResourceProfile(tool);
  const difficultyStyle = difficultyMeta[difficulty];
  const difficultyLabel =
    difficulty === "beginner" ? t.difficulty.beginnerBadge : difficulty === "intermediate" ? t.difficulty.intermediateBadge : t.difficulty.advancedBadge;
  const port = extractDefaultPort(tool.dockerCompose ?? "");

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: tool.name,
          applicationCategory: category.label,
          description: tool.description,
          operatingSystem: "Linux, Docker",
          license: tool.license,
          url: `${siteConfig.url}${localeHref(`/tool/${tool.slug}`, locale)}`,
          codeRepository: tool.githubUrl,
        }}
      />

      <nav className="mb-6 text-sm text-slate-600">
        <Link href={localeHref("/", locale)} className="hover:text-emerald-700">
          {t.breadcrumb.home}
        </Link>
        <span className="mx-2">/</span>
        <Link href={getCategoryHref(tool.category, locale)} className="hover:text-emerald-700">
          {category.label}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">{tool.name}</span>
      </nav>

      <header className="mb-10">
        <div className="mb-5 flex items-center gap-3">
          <LogoImage
            domain={getHostname(tool.websiteUrl)}
            label={tool.name}
            size={56}
            fallbackGradient={palette.gradient}
            className="rounded-xl"
          />
          <ArrowRight size={20} className="shrink-0 text-slate-300" />
          <LogoImage
            domain={getSaasDomain(tool.replaces[0])}
            label={tool.replaces[0]}
            size={56}
            fallbackGradient="from-slate-300 to-slate-400"
            className="rounded-xl grayscale"
          />
        </div>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge className={palette.badge}>{category.label}</Badge>
          {tool.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
          {tool.fossModel && (
            <span
              title={tool.fossModel === "OpenCore" ? t.toolPage.fossModelOpenCoreCaption : undefined}
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
                tool.fossModel === "FOSS"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-amber-200 bg-amber-50 text-amber-800"
              )}
            >
              {tool.fossModel === "FOSS" ? <Check size={12} /> : <TriangleAlert size={12} />}
              {tool.fossModel === "FOSS" ? t.toolPage.fossModelFoss : t.toolPage.fossModelOpenCore}
            </span>
          )}
          <span
            title={`${t.difficulty.ramBadgePrefix} ${formatMinRam(minRamMb)}`}
            className={cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium", difficultyStyle.badgeClass)}
          >
            {difficultyStyle.emoji} {difficultyLabel} · {formatMinRam(minRamMb)}
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {t.toolPage.h1(tool.name, tool.replaces[0], siteConfig.year)}
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-600">{tool.description}</p>
        {tool.fossModel === "OpenCore" && <p className="mt-2 text-sm text-amber-800">{t.toolPage.fossModelOpenCoreCaption}</p>}

        <div className="mt-5 flex flex-wrap gap-2" aria-label={t.toolPage.replacesAriaLabel}>
          {tool.replaces.map((saas) => (
            <Link
              key={saas}
              href={getAlternativeHref(saas, locale)}
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 py-1 pl-1.5 pr-3 text-xs font-semibold text-emerald-800 transition-colors hover:bg-emerald-100"
            >
              <LogoImage domain={getSaasDomain(saas)} label={saas} size={16} className="ring-1 ring-white" fallbackGradient="from-slate-300 to-slate-400" />
              {t.toolPage.replacesBadge(saas)}
            </Link>
          ))}
        </div>

        <div className="mt-4">
          <AddToStackButton toolSlug={tool.slug} addLabel={t.stackBuilder.addButton} addedLabel={t.stackBuilder.addedButton} />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-600">
          <span className="inline-flex items-center gap-1.5">
            <GitFork size={16} /> {t.toolPage.license} {tool.license}
          </span>
          <a
            href={tool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-emerald-700"
          >
            {t.toolPage.website} <ExternalLink size={14} />
          </a>
          {tool.demoUrl && (
            <a
              href={tool.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "gap-1.5")}
            >
              <PlayCircle size={14} /> {t.toolPage.tryDemo}
            </a>
          )}
          <a
            href={tool.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-emerald-700"
          >
            {t.toolPage.githubRepo} <ExternalLink size={14} />
          </a>
        </div>
      </header>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          <section>
            <h2 className="mb-4 text-xl font-semibold text-slate-900">{t.toolPage.fichaTecnica}</h2>
            <dl className={cn("grid grid-cols-2 gap-4 rounded-xl border p-6 sm:grid-cols-3", palette.soft, palette.border)}>
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-600">{t.toolPage.fieldLicense}</dt>
                <dd className="mt-1 font-medium text-slate-900">{tool.license}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-600">{t.toolPage.fieldCategory}</dt>
                <dd className="mt-1 font-medium text-slate-900">{category.label}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-600">{t.toolPage.fieldReplaces}</dt>
                <dd className="mt-1 font-medium text-slate-900">{tool.replaces.join(", ")}</dd>
              </div>
              <div className="col-span-2 sm:col-span-3">
                <dt className="text-xs uppercase tracking-wide text-slate-600">{t.toolPage.fieldStack}</dt>
                <dd className="mt-1 flex flex-wrap gap-1.5">
                  {tool.techStack.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </dd>
              </div>
            </dl>
          </section>

          {(tool.database || tool.language || (tool.platforms && tool.platforms.length > 0)) && (
            <section>
              <h2 className="mb-4 text-xl font-semibold text-slate-900">{t.toolPage.underTheHoodTitle}</h2>
              <div className="grid gap-5 rounded-xl border border-slate-200 p-6 sm:grid-cols-3">
                {tool.database && (
                  <div className="flex items-start gap-2.5">
                    <Database size={18} className="mt-0.5 shrink-0 text-slate-500" />
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-600">{t.toolPage.underTheHoodDatabase}</p>
                      <p className="mt-0.5 text-sm font-medium text-slate-900">{tool.database}</p>
                    </div>
                  </div>
                )}
                {tool.language && (
                  <div className="flex items-start gap-2.5">
                    <Code2 size={18} className="mt-0.5 shrink-0 text-slate-500" />
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-600">{t.toolPage.underTheHoodLanguage}</p>
                      <p className="mt-0.5 text-sm font-medium text-slate-900">{tool.language}</p>
                    </div>
                  </div>
                )}
                {tool.platforms && tool.platforms.length > 0 && (
                  <div className="flex items-start gap-2.5">
                    <MonitorSmartphone size={18} className="mt-0.5 shrink-0 text-slate-500" />
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-600">{t.toolPage.underTheHoodPlatforms}</p>
                      <p className="mt-0.5 text-sm font-medium text-slate-900">{tool.platforms.join(" · ")}</p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {ogImageUrl && (
            <section>
              <h2 className="mb-4 text-xl font-semibold text-slate-900">{t.toolPage.preview}</h2>
              <ToolPreviewImage src={ogImageUrl} alt={`${tool.name} interface preview`} />
              <p className="mt-2 text-xs text-slate-600">{t.toolPage.previewCaption(tool.name)}</p>
            </section>
          )}

          <section>
            <h2 className="mb-4 text-xl font-semibold text-slate-900">{t.toolPage.features}</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {tool.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-slate-700">
                  <Check size={16} className="mt-0.5 shrink-0 text-emerald-600" />
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-slate-900">{t.toolPage.vs(tool.name, tool.replaces[0])}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
                <p className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-emerald-800">
                  <Check size={16} /> {t.toolPage.pros}
                </p>
                <ul className="space-y-2">
                  {tool.pros.map((pro) => (
                    <li key={pro} className="text-sm text-slate-700">
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
                <p className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-amber-800">
                  <X size={16} /> {t.toolPage.cons}
                </p>
                <ul className="space-y-2">
                  {tool.cons.map((con) => (
                    <li key={con} className="text-sm text-slate-700">
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {(tool.dockerCompose || (tool.oneClickDeploy && tool.oneClickDeploy.length > 0)) && (
            <section>
              <h2 className="mb-4 text-xl font-semibold text-slate-900">{t.toolPage.dockerGuideTitle}</h2>
              <OneClickDeploy targets={tool.oneClickDeploy} locale={locale} />
              {tool.dockerCompose && (
                <>
                  <p className="mb-4 text-sm text-slate-600">
                    {t.toolPage.dockerGuideText}{" "}
                    <Link href={getDeployGuideHref(locale)} className="font-medium text-emerald-700 hover:underline">
                      {t.toolPage.dockerGuideLink}
                    </Link>
                  </p>
                  <HowToDeployGuide
                    toolName={tool.name}
                    toolSlug={tool.slug}
                    dockerCompose={tool.dockerCompose}
                    oneClickDeploy={tool.oneClickDeploy}
                    locale={locale}
                    trigger={t.howToDeploy.trigger}
                  />
                  <DockerComposeBlock code={tool.dockerCompose} t={t.dockerBlock} />
                  <p className="mt-2 text-xs text-slate-600">
                    {liveStats
                      ? t.toolPage.dockerComposeSourceActive(formatRelativeDate(liveStats.updatedAt, locale))
                      : t.toolPage.dockerComposeSourceGeneric}
                  </p>
                  <a
                    href={`${siteConfig.links.github}/issues/new?title=${encodeURIComponent(t.toolPage.reportIssueTitle(tool.name))}&labels=bug`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-xs font-medium text-emerald-700 hover:underline"
                  >
                    {t.toolPage.reportIssueLink}
                  </a>
                </>
              )}
            </section>
          )}

          {tool.dockerCompose && (
            <section className="space-y-3">
              {isComposeFile(tool.dockerCompose) && (
                <details className="group rounded-xl border border-slate-200 open:border-emerald-200">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-5 py-4 text-lg font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
                    {t.howToDeploy.backups.title}
                    <ChevronDown size={18} className="shrink-0 text-slate-400 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="space-y-3 border-t border-slate-100 px-5 py-4 text-sm text-slate-600">
                    <p>{t.howToDeploy.backups.intro}</p>
                    <div>
                      <p className="font-medium text-slate-900">{t.howToDeploy.backups.step1Title}</p>
                      <pre className="mt-1.5 overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-emerald-300">
                        <code>{t.howToDeploy.backups.step1Command}</code>
                      </pre>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{t.howToDeploy.backups.step2Title}</p>
                      <p className="text-xs">{t.howToDeploy.backups.step2Desc}</p>
                      <pre className="mt-1.5 overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-emerald-300">
                        <code>{t.howToDeploy.backups.step2Command}</code>
                      </pre>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{t.howToDeploy.backups.step3Title}</p>
                      <pre className="mt-1.5 overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-emerald-300">
                        <code>{t.howToDeploy.backups.step3Command}</code>
                      </pre>
                    </div>
                  </div>
                </details>
              )}

              <details className="group rounded-xl border border-slate-200 open:border-emerald-200">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-5 py-4 text-lg font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
                  {t.howToDeploy.domain.title}
                  <ChevronDown size={18} className="shrink-0 text-slate-400 transition-transform group-open:rotate-180" />
                </summary>
                <div className="space-y-4 border-t border-slate-100 px-5 py-4 text-sm text-slate-600">
                  <div>
                    <p className="font-medium text-slate-900">{t.howToDeploy.domain.step1Title}</p>
                    <p className="mt-1 text-xs">{t.howToDeploy.domain.step1Desc}</p>
                    <dl className="mt-2 grid grid-cols-3 gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs">
                      <dt className="font-semibold text-slate-600">{t.howToDeploy.domain.dnsType}</dt>
                      <dd className="col-span-2 font-mono text-slate-900">{t.howToDeploy.domain.dnsTypeValue}</dd>
                      <dt className="font-semibold text-slate-600">{t.howToDeploy.domain.dnsHost}</dt>
                      <dd className="col-span-2 text-slate-900">{t.howToDeploy.domain.dnsHostHint}</dd>
                      <dt className="font-semibold text-slate-600">{t.howToDeploy.domain.dnsValue}</dt>
                      <dd className="col-span-2 text-slate-900">{t.howToDeploy.domain.dnsValueHint}</dd>
                    </dl>
                    <p className="mt-2 text-xs">{t.howToDeploy.domain.dnsPropagationNote}</p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{t.howToDeploy.domain.step2Title}</p>
                    <p className="mt-1 text-xs">{t.howToDeploy.domain.step2Desc}</p>
                    <p className="mt-2 text-xs">{t.howToDeploy.domain.caddyfileLabel}</p>
                    <pre className="mt-1.5 overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-emerald-300">
                      <code>{t.howToDeploy.domain.caddyfile(port)}</code>
                    </pre>
                    <p className="mt-2 text-xs">{t.howToDeploy.domain.runCommandLabel}</p>
                    <pre className="mt-1.5 overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-emerald-300">
                      <code>{t.howToDeploy.domain.runCommand}</code>
                    </pre>
                  </div>
                </div>
              </details>
            </section>
          )}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <RepoHealthBadge liveStats={liveStats} estimatedStars={tool.starsCount} license={tool.license} locale={locale} />
          <AffiliateHostingWidget tool={tool} locale={locale} />

          {featuredStacks.length > 0 && (
            <div className="rounded-xl border border-slate-200 p-6">
              <p className="mb-3 text-sm font-semibold text-slate-900">{t.toolPage.featuredInTitle}</p>
              <div className="flex flex-col gap-2">
                {featuredStacks.map((stack) => (
                  <Link
                    key={stack.slug}
                    href={localeHref(`/stacks/${stack.slug}`, locale)}
                    className={cn(buttonVariants({ variant: "outline", size: "sm" }), "justify-between")}
                  >
                    {t.toolPage.featuredInBadge(stack.title)}
                    <ExternalLink size={14} />
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className={cn("rounded-xl border p-6", palette.soft, palette.border)}>
            <p className="mb-3 text-sm font-semibold text-slate-900">{t.toolPage.otherAlternatives}</p>
            <div className="flex flex-col gap-2">
              {tool.replaces.map((saas) => (
                <Link
                  key={saas}
                  href={getAlternativeHref(saas, locale)}
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }), "justify-between")}
                >
                  {t.toolPage.viewAlternatives(saas)}
                  <ExternalLink size={14} />
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 p-6">
            <p className="mb-3 text-sm font-semibold text-slate-900">{t.toolPage.migrationGuide}</p>
            <Link
              href={migrationGuideHref}
              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full justify-between")}
            >
              {t.toolPage.migrationLink(migrationFromSaas, tool.name)}
              <ExternalLink size={14} />
            </Link>
          </div>

          {comparisons.length > 0 && (
            <div className="rounded-xl border border-slate-200 p-6">
              <p className="mb-3 text-sm font-semibold text-slate-900">{t.toolPage.comparisons}</p>
              <div className="flex flex-col gap-2">
                {comparisons.map((comparison) => {
                  const other = comparison.toolA.slug === tool.slug ? comparison.toolB : comparison.toolA;
                  return (
                    <Link
                      key={comparison.pairSlug}
                      href={getCompareHref(comparison.pairSlug, locale)}
                      className={cn(buttonVariants({ variant: "outline", size: "sm" }), "justify-between")}
                    >
                      {t.toolPage.comparisonLink(tool.name, other.name)}
                      <ExternalLink size={14} />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
