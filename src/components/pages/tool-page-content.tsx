import Link from "next/link";
import { GitFork, ExternalLink, Check, X, ArrowRight, PlayCircle } from "lucide-react";
import { getLocalizedTool } from "@/data/tools";
import { getCategoryMetaLocalized, getCategoryHref } from "@/data/categories";
import { getAlternativeHref } from "@/lib/alternatives";
import { getMigrationGuideHref, getDeployGuideHref, getCompareHref } from "@/lib/routes";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { AffiliateHostingWidget } from "@/components/site/affiliate-hosting-widget";
import { DockerComposeBlock } from "@/components/site/docker-compose-block";
import { OneClickDeploy } from "@/components/site/one-click-deploy";
import { RepoHealthBadge } from "@/components/site/repo-health-badge";
import { JsonLd } from "@/components/site/json-ld";
import { LogoImage } from "@/components/site/logo-image";
import { ToolPreviewImage } from "@/components/site/tool-preview-image";
import { getSaasDomain } from "@/lib/saas-domains";
import { categoryColors } from "@/lib/category-colors";
import { getComparisonsForTool, type ToolComparison } from "@/lib/comparisons";
import { getGithubStats } from "@/lib/github-stats";
import { getOgImageUrl } from "@/lib/og-image";
import { siteConfig } from "@/lib/site-config";
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
  const liveStats = await getGithubStats(tool.githubUrl);
  const ogImageUrl = await getOgImageUrl(tool.websiteUrl);

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
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {t.toolPage.h1(tool.name, tool.replaces[0], siteConfig.year)}
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-600">{tool.description}</p>

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
                  <DockerComposeBlock code={tool.dockerCompose} locale={locale} />
                </>
              )}
            </section>
          )}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <RepoHealthBadge liveStats={liveStats} estimatedStars={tool.starsCount} license={tool.license} locale={locale} />
          <AffiliateHostingWidget tool={tool} locale={locale} />

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
