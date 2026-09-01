"use client";

import * as React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Star, GitFork, ArrowRight, BadgeCheck, Clock } from "lucide-react";
import type { OpenSourceTool } from "@/lib/types";
import { isPublished } from "@/lib/types";
import { getCategoryMetaLocalized } from "@/data/categories";
import { getLocalizedTool } from "@/data/tools";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LogoImage } from "@/components/site/logo-image";
import { getSaasDomain } from "@/lib/saas-domains";
import { categoryColors } from "@/lib/category-colors";
import { cn, formatStars, getHostname } from "@/lib/utils";
import { getDictionary } from "@/i18n/get-dictionary";
import { localeHref } from "@/lib/locale-href";
import type { Locale } from "@/i18n/config";

// Solo se necesita tras un clic en una tarjeta "Próximamente": se separa del
// bundle inicial para no cargarlo en cada página que lista herramientas.
const ComingSoonModal = dynamic(() =>
  import("@/components/site/coming-soon-modal").then((m) => m.ComingSoonModal)
);

export function ToolCard({ tool: rawTool, locale = "es" }: { tool: OpenSourceTool; locale?: Locale }) {
  const tool = getLocalizedTool(rawTool, locale);
  const t = getDictionary(locale);
  const [modalOpen, setModalOpen] = React.useState(false);
  const tagLabels: Record<string, string> = {
    "docker-ready": t.toolCard.tagDockerReady,
    "1-click-deploy": t.toolCard.tagOneClick,
    "permissive-license": t.toolCard.tagPermissive,
  };
  const category = getCategoryMetaLocalized(tool.category, locale);
  const palette = categoryColors[tool.category];
  const published = isPublished(tool);

  return (
    <Card
      className={cn(
        "group relative flex h-full flex-col transition-all",
        published ? cn("hover:-translate-y-0.5 hover:shadow-lg", palette.borderHover) : "opacity-80"
      )}
    >
      {tool.sponsored && (
        <span className="absolute -top-2.5 right-4 inline-flex items-center gap-1 rounded-full bg-slate-900 px-2.5 py-1 text-[10px] font-medium text-white shadow-sm">
          <BadgeCheck size={11} /> {t.toolCard.sponsored}
        </span>
      )}
      {!published && (
        <span className="absolute -top-2.5 right-4 inline-flex items-center gap-1 rounded-full bg-slate-600 px-2.5 py-1 text-[10px] font-medium text-white shadow-sm">
          <Clock size={11} /> {t.comingSoon.badge}
        </span>
      )}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-3">
            <LogoImage
              domain={getHostname(tool.websiteUrl)}
              label={tool.name}
              size={36}
              fallbackGradient={palette.gradient}
              className={cn(!published && "grayscale")}
            />
            <div>
              {published ? (
                <Link href={localeHref(`/tool/${tool.slug}`, locale)} className="font-semibold text-slate-900 hover:text-emerald-700">
                  {tool.name}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="font-semibold text-slate-900 hover:text-emerald-700"
                >
                  {tool.name}
                </button>
              )}
              <div className="mt-1 flex items-center gap-1.5">
                <div className="flex -space-x-1.5">
                  {tool.replaces.slice(0, 3).map((saas) => (
                    <LogoImage
                      key={saas}
                      domain={getSaasDomain(saas)}
                      label={saas}
                      size={16}
                      className="ring-2 ring-white"
                      fallbackGradient="from-slate-300 to-slate-400"
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-600">
                  {t.toolCard.alternativeTo} {tool.replaces.join(", ")}
                </p>
              </div>
            </div>
          </div>
          <Badge className={palette.badge}>{category.label}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4 pt-0">
        <p className="text-sm text-slate-600">{tool.shortDescription}</p>

        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
          <span className="inline-flex items-center gap-1">
            <GitFork size={14} /> {tool.license}
          </span>
          {tool.starsCount && (
            <span className="inline-flex items-center gap-1">
              <Star size={14} className="text-amber-500" /> {formatStars(tool.starsCount)}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {tool.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tagLabels[tag] ?? tag}
            </Badge>
          ))}
        </div>

        {published ? (
          <Link
            href={localeHref(`/tool/${tool.slug}`, locale)}
            className={cn(
              "mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r px-4 py-2 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90",
              palette.gradient
            )}
          >
            {t.toolCard.cta}
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            {t.toolCard.comingSoonCta}
            <Clock size={15} />
          </button>
        )}
      </CardContent>

      {modalOpen && <ComingSoonModal tool={tool} locale={locale} onClose={() => setModalOpen(false)} />}
    </Card>
  );
}
