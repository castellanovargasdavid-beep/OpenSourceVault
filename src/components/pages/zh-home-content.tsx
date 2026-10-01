import Link from "next/link";
import { ArrowRight, GitFork, Star, ShieldCheck, Container, Cpu } from "lucide-react";
import { getToolById, getLocalizedTool } from "@/data/tools";
import { getCategoryMetaLocalized } from "@/data/categories";
import { getComparisonBySlug } from "@/lib/comparisons";
import { getCompareHref } from "@/lib/routes";
import { categoryColors } from "@/lib/category-colors";
import { LogoImage } from "@/components/site/logo-image";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { resolveToolResourceProfile, formatMinRam, difficultyMeta } from "@/lib/tool-difficulty";
import { cn, formatStars, getHostname } from "@/lib/utils";
import { getDictionary } from "@/i18n/get-dictionary";
import { ZH_TOOL_SLUGS, ZH_COMPARE_PAIR_SLUGS } from "@/lib/zh-mvp";
import type { OpenSourceTool } from "@/lib/types";

/**
 * Landing /zh deliberadamente mínima (sección 11 del encargo): no es la
 * home completa de ES/EN (Hero + DiscoveryStrip + CatalogTeaser, pensada
 * para ~196 herramientas en 16 categorías) sino una página propia que solo
 * enlaza al cluster real del piloto — 10 fichas + 10 comparativas de
 * AI/LLM/self-hosting — para no prometer un catálogo completo que todavía
 * no existe en chino.
 */
export function ZhHomeContent() {
  const t = getDictionary("zh");
  const tools = ZH_TOOL_SLUGS.map((slug) => getToolById(slug))
    .filter((tool): tool is OpenSourceTool => Boolean(tool))
    .map((tool) => getLocalizedTool(tool, "zh"));
  const comparisons = ZH_COMPARE_PAIR_SLUGS.map((pair) => getComparisonBySlug(pair)).filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-12 max-w-3xl">
        <span className="mb-4 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
          AI / LLM · Self-Hosting 试点
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">AltFreeStack：AI 与自托管工具的开源替代方案</h1>
        <p className="mt-4 text-lg text-slate-600">
          AltFreeStack 收录可以自己部署、免受单一厂商锁定的开源 SaaS 替代方案——每个工具都标注真实的许可证类型、Docker 部署方式和最低内存需求，而不是笼统地写一句「开源」。目前中文版只收录了 AI/LLM
          与 self-hosting 相关的首批工具，其余内容请切换到{" "}
          <a href="https://www.altfreestack.com/en" className="font-medium text-emerald-700 hover:underline">
            英文版
          </a>{" "}
          或{" "}
          <a href="https://www.altfreestack.com" className="font-medium text-emerald-700 hover:underline">
            西班牙语版
          </a>
          。
        </p>
      </header>

      <section className="mb-12 grid gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 p-5">
          <ShieldCheck size={20} className="mb-2 text-emerald-600" />
          <p className="text-sm font-semibold text-slate-900">许可证对比</p>
          <p className="mt-1 text-sm text-slate-600">
            区分 FOSS、Open-Core、Fair-code 与 Source-available——不是每个「开源」项目都能完全免费商用，我们标注清楚区别。
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 p-5">
          <Container size={20} className="mb-2 text-emerald-600" />
          <p className="text-sm font-semibold text-slate-900">Docker 部署</p>
          <p className="mt-1 text-sm text-slate-600">每个工具都附带可直接使用的 docker-compose.yml，并标注镜像版本与来源是否已核实。</p>
        </div>
        <div className="rounded-xl border border-slate-200 p-5">
          <Cpu size={20} className="mb-2 text-emerald-600" />
          <p className="text-sm font-semibold text-slate-900">真实资源需求</p>
          <p className="mt-1 text-sm text-slate-600">最低内存、是否需要 GPU——根据每个工具自己的 docker-compose 估算，不是泛泛而谈。</p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">AI / LLM · Self-Hosting 工具</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {tools.map((tool) => {
            const category = getCategoryMetaLocalized(tool.category, "zh");
            const palette = categoryColors[tool.category];
            const { difficulty, minRamMb, isEstimated } = resolveToolResourceProfile(tool);
            const difficultyStyle = difficultyMeta[difficulty];
            return (
              <Link
                key={tool.slug}
                href={`/zh/tool/${tool.slug}`}
                className={cn("flex items-start gap-3 rounded-xl border p-4 transition-colors hover:border-emerald-300", palette.border)}
              >
                <LogoImage domain={getHostname(tool.websiteUrl)} label={tool.name} size={40} fallbackGradient={palette.gradient} className="rounded-lg" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-slate-900">{tool.name}</p>
                    <ArrowRight size={16} className="shrink-0 text-slate-400" />
                  </div>
                  <p className="mt-0.5 text-sm text-slate-600">{tool.shortDescription}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    <Badge className={palette.badge} variant="secondary">
                      {category.label}
                    </Badge>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                      {difficultyStyle.emoji} {formatMinRam(minRamMb, isEstimated)}
                    </span>
                    {tool.starsCount && (
                      <span className="inline-flex items-center gap-1 text-xs text-slate-500" title={t.toolCard.starsSnapshotCaption}>
                        <Star size={12} className="text-amber-500" /> ~{formatStars(tool.starsCount)}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                      <GitFork size={12} /> {tool.license}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-slate-900">对比评测</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {comparisons.map((cmp) => (
            <Link
              key={cmp.pairSlug}
              href={getCompareHref(cmp.pairSlug, "zh")}
              className={cn(buttonVariants({ variant: "outline" }), "h-auto min-h-10 justify-between whitespace-normal py-2 text-left")}
            >
              {cmp.toolA.name} vs {cmp.toolB.name}
              <ArrowRight size={14} className="shrink-0" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
