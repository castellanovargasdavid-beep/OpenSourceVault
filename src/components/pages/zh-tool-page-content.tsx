import Link from "next/link";
import { GitFork, ExternalLink, Check, X, ArrowRight, PlayCircle, Database, Code2, MonitorSmartphone, TriangleAlert, Star } from "lucide-react";
import { getLocalizedTool, hasZhTranslation, getToolById } from "@/data/tools";
import { getCategoryMetaLocalized } from "@/data/categories";
import { getCompareHref } from "@/lib/routes";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { HostingTierRecommendation } from "@/components/site/hosting-tier-recommendation";
import { DockerComposeBlock } from "@/components/site/docker-compose-block";
import { AuditSnapshot } from "@/components/site/audit-snapshot";
import { JsonLd, buildBreadcrumbListSchema } from "@/components/site/json-ld";
import { LogoImage } from "@/components/site/logo-image";
import { ToolPreviewImage } from "@/components/site/tool-preview-image";
import { getSaasDomain } from "@/lib/saas-domains";
import { categoryColors } from "@/lib/category-colors";
import { getComparisonsForTool } from "@/lib/comparisons";
import { auditToolDeployment } from "@/lib/deployment-audit";
import { verifyLicense } from "@/lib/license-verification";
import { getGithubStats, getLatestRelease, getReleasesPageUrl, getRepoHealthStatus, formatRelativeDate } from "@/lib/github-stats";
import { getOgImageUrl } from "@/lib/og-image";
import { siteConfig } from "@/lib/site-config";
import { difficultyMeta, formatMinRam, resolveToolResourceProfile } from "@/lib/tool-difficulty";
import { getToolComparison } from "@/lib/tool-comparison";
import { cn, getHostname, formatStars } from "@/lib/utils";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasZhTool, hasZhCompare, ZH_RELATED_TOOLS } from "@/lib/zh-mvp";
import type { OpenSourceTool } from "@/lib/types";

/**
 * Versión deliberadamente más ligera que tool-page-content.tsx — no un
 * fork completo de 600 líneas, sino el subconjunto que tiene sentido
 * mostrar en el piloto zh-CN (ver lib/zh-mvp.ts para el alcance exacto).
 * Omite a propósito: Stack Builder, guía de despliegue paso a paso
 * (modal), guía de migración, "alternativas a X", "incluida en estos
 * stacks" y las guías de hosting por proveedor — todas enlazan a rutas
 * /zh/... que no existen en este MVP (stacks, replace, guias, alternativas),
 * y el encargo pide explícitamente no generar ese tipo de enlace roto.
 * Lo que SÍ reutiliza sin cambios: la fuente de datos (getLocalizedTool),
 * AuditSnapshot, DockerComposeBlock y HostingTierRecommendation — los
 * mismos componentes compartidos que usan las páginas ES/EN.
 */
export async function ZhToolPageContent({ tool: rawTool }: { tool: OpenSourceTool }) {
  const tool = getLocalizedTool(rawTool, "zh");
  const t = getDictionary("zh");
  const category = getCategoryMetaLocalized(tool.category, "zh");
  const palette = categoryColors[tool.category];
  const usingFallbackContent = !hasZhTranslation(tool.id);
  const fossModelLabel = {
    FOSS: t.toolPage.fossModelFoss,
    OpenCore: t.toolPage.fossModelOpenCore,
    FairCode: t.toolPage.fossModelFairCode,
    SourceAvailable: t.toolPage.fossModelSourceAvailable,
  } as const;
  const fossModelCaption = {
    FOSS: undefined,
    OpenCore: t.toolPage.fossModelOpenCoreCaption,
    FairCode: t.toolPage.fossModelFairCodeCaption,
    SourceAvailable: t.toolPage.fossModelSourceAvailableCaption,
  } as const;

  const comparisons = getComparisonsForTool(tool.slug).filter((c) => hasZhCompare(c.pairSlug));
  const relatedSlugs = (ZH_RELATED_TOOLS[tool.id] ?? []).filter(hasZhTool);
  const relatedTools = relatedSlugs.map((slug) => getToolById(slug)).filter((t): t is OpenSourceTool => Boolean(t));

  const [liveStats, latestRelease] = await Promise.all([getGithubStats(tool.githubUrl), getLatestRelease(tool.githubUrl)]);
  const releasesUrl = getReleasesPageUrl(tool.githubUrl);
  const ogImageUrl = await getOgImageUrl(tool.websiteUrl);
  const { difficulty, minRamMb, isEstimated } = resolveToolResourceProfile(tool);
  const difficultyStyle = difficultyMeta[difficulty];
  const difficultyLabel =
    difficulty === "beginner" ? t.difficulty.beginnerBadge : difficulty === "intermediate" ? t.difficulty.intermediateBadge : t.difficulty.advancedBadge;
  const deploymentAudit = tool.dockerCompose ? auditToolDeployment(tool) : null;
  const comparison = getToolComparison(tool, "zh");
  const licenseVerification = verifyLicense(tool.license, liveStats?.licenseSpdxId);
  const repoHealthStatus = liveStats ? getRepoHealthStatus(liveStats.updatedAt) : null;

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
          url: `${siteConfig.url}/zh/tool/${tool.slug}`,
          codeRepository: tool.githubUrl,
        }}
      />
      <JsonLd
        data={buildBreadcrumbListSchema([
          { name: t.breadcrumb.home, url: `${siteConfig.url}/zh` },
          { name: tool.name, url: `${siteConfig.url}/zh/tool/${tool.slug}` },
        ])}
      />

      <nav className="mb-6 text-sm text-slate-600">
        <Link href="/zh" className="hover:text-emerald-700">
          {t.breadcrumb.home}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-500">{category.label}</span>
        <span className="mx-2">/</span>
        <span className="text-slate-700">{tool.name}</span>
      </nav>

      <header className="mb-10">
        <div className="mb-5 flex items-center gap-3">
          <LogoImage domain={getHostname(tool.websiteUrl)} label={tool.name} size={56} fallbackGradient={palette.gradient} className="rounded-xl" />
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
          {tool.fossModel && (
            <span
              title={fossModelCaption[tool.fossModel]}
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
                tool.fossModel === "FOSS" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-amber-200 bg-amber-50 text-amber-800"
              )}
            >
              {tool.fossModel === "FOSS" ? <Check size={12} /> : <TriangleAlert size={12} />}
              {fossModelLabel[tool.fossModel]}
            </span>
          )}
          <span
            title={`${t.difficulty.ramBadgePrefix} ${formatMinRam(minRamMb)}${isEstimated ? t.difficulty.ramEstimatedNote : ""}`}
            className={cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium", difficultyStyle.badgeClass)}
          >
            {difficultyStyle.emoji} {difficultyLabel} · {formatMinRam(minRamMb, isEstimated)}
          </span>
          {tool.storageGb !== undefined && (
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-700">
              💾 {t.difficulty.storageBadgePrefix} {tool.storageGb}GB
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {t.toolPage.h1(tool.name, tool.replaces[0], siteConfig.year, tool.fossModel)}
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-600">{tool.description}</p>
        {tool.fossModel && tool.fossModel !== "FOSS" && <p className="mt-2 text-sm text-amber-800">{fossModelCaption[tool.fossModel]}</p>}
        {tool.notes && <p className="mt-2 rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-sm text-sky-800">ℹ️ {tool.notes}</p>}
        {usingFallbackContent && (
          <p className="mt-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
            (EN) 本页部分内容暂无中文翻译，以下展示英文原文。
          </p>
        )}

        <div className="mt-5 flex flex-wrap gap-2" aria-label={t.toolPage.replacesAriaLabel}>
          {tool.replaces.map((saas) => (
            <span
              key={saas}
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 py-1 pl-1.5 pr-3 text-xs font-semibold text-emerald-800"
            >
              <LogoImage domain={getSaasDomain(saas)} label={saas} size={16} className="ring-1 ring-white" fallbackGradient="from-slate-300 to-slate-400" />
              {t.toolPage.replacesBadge(saas)}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-600">
          <span className="inline-flex items-center gap-1.5">
            <GitFork size={16} /> {t.toolPage.license} {tool.license}
          </span>
          {(liveStats?.stars ?? tool.starsCount) !== undefined && (
            <span className="inline-flex items-center gap-1.5">
              <Star size={16} className="text-amber-500" />
              {formatStars((liveStats?.stars ?? tool.starsCount)!)} {t.toolPage.stars}
              {!liveStats && <span className="text-xs text-slate-500">{t.toolPage.estimated}</span>}
            </span>
          )}
          <a href={tool.websiteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-emerald-700">
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
          <a href={tool.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-emerald-700">
            {t.toolPage.githubRepo} <ExternalLink size={14} />
          </a>
        </div>
      </header>

      <AuditSnapshot
        locale="zh"
        t={t.auditSnapshot}
        toolPageT={t.toolPage}
        licenseVerification={licenseVerification}
        repoHealthStatus={repoHealthStatus}
        lastCommitIso={liveStats?.updatedAt ?? null}
        latestRelease={latestRelease}
        releasesUrl={releasesUrl}
        deploymentAudit={deploymentAudit}
      />

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="min-w-0 space-y-10 lg:col-span-2">
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

          {tool.dockerCompose && deploymentAudit && (
            <section>
              <h2 className="mb-4 text-xl font-semibold text-slate-900">{t.toolPage.dockerGuideTitle}</h2>
              <p className="mb-4 text-sm text-slate-600">
                {deploymentAudit.method === "compose" ? t.toolPage.dockerGuideText : t.toolPage.dockerGuideTextScript}
              </p>
              <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
                <p className="mb-2 text-sm font-semibold text-slate-900">{t.toolPage.comparisonTitle}</p>
                <ul className="space-y-1 text-sm text-slate-700">
                  <li>
                    <span className="font-medium text-slate-900">{t.toolPage.comparisonCloudLabel}</span> {comparison.cloud}.
                  </li>
                  <li>
                    <span className="font-medium text-emerald-700">{t.toolPage.comparisonSelfHostedLabel}</span> {comparison.selfHosted}.
                  </li>
                </ul>
              </div>
              {(tool.dockerStatus === "ARCHIVED_UPSTREAM" || tool.dockerStatus === "LEGACY_IMAGE") && (
                <p className="mb-3 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900">
                  {tool.dockerStatus === "ARCHIVED_UPSTREAM" ? t.toolPage.dockerStatusArchivedWarning : t.toolPage.dockerStatusLegacyWarning}
                </p>
              )}
              <DockerComposeBlock code={tool.dockerCompose} t={t.dockerBlock} />
              <p className="mt-2 text-xs text-slate-600">
                {liveStats ? t.toolPage.dockerComposeSourceActive(formatRelativeDate(liveStats.updatedAt, "zh")) : t.toolPage.dockerComposeSourceGeneric}
              </p>
              <a
                href={`${siteConfig.links.github}/issues/new?title=${encodeURIComponent(t.toolPage.reportIssueTitle(tool.name))}&labels=bug`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-xs font-medium text-emerald-700 hover:underline"
              >
                {t.toolPage.reportIssueLink}
              </a>
            </section>
          )}

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

          {ogImageUrl && (
            <section>
              <h2 className="mb-4 text-xl font-semibold text-slate-900">{t.toolPage.preview}</h2>
              <ToolPreviewImage src={ogImageUrl} alt={`${tool.name} interface preview`} className="max-h-56" />
              <p className="mt-2 text-xs text-slate-600">{t.toolPage.previewCaption(tool.name)}</p>
            </section>
          )}
        </div>

        <aside className="min-w-0 space-y-6 lg:sticky lg:top-24 lg:self-start">
          <HostingTierRecommendation totalMinRamMb={minRamMb} locale="zh" t={t.hostingTier} />

          {relatedTools.length > 0 && (
            <div className="rounded-xl border border-slate-200 p-6">
              <p className="mb-3 text-sm font-semibold text-slate-900">相关工具</p>
              <div className="flex flex-col gap-2">
                {relatedTools.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/zh/tool/${related.slug}`}
                    className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-auto min-h-8 justify-between whitespace-normal py-1.5 text-left")}
                  >
                    {related.name}
                    <ExternalLink size={14} className="shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {comparisons.length > 0 && (
            <div className="rounded-xl border border-slate-200 p-6">
              <p className="mb-3 text-sm font-semibold text-slate-900">{t.toolPage.comparisons}</p>
              <div className="flex flex-col gap-2">
                {comparisons.map((cmp) => {
                  const other = cmp.toolA.slug === tool.slug ? cmp.toolB : cmp.toolA;
                  return (
                    <Link
                      key={cmp.pairSlug}
                      href={getCompareHref(cmp.pairSlug, "zh")}
                      className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-auto min-h-8 justify-between whitespace-normal py-1.5 text-left")}
                    >
                      {t.toolPage.comparisonLink(tool.name, other.name)}
                      <ExternalLink size={14} className="shrink-0" />
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
