"use client";

import * as React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Star, GitFork, ArrowRight, BadgeCheck, Clock } from "lucide-react";
import type { ToolCardData } from "@/lib/types";
import { isPublished } from "@/lib/types";
import { getCategoryMetaLocalized } from "@/data/categories";
import { getLocalizedToolCardData } from "@/lib/tool-card-data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LogoImage } from "@/components/site/logo-image";
import { getSaasDomain } from "@/lib/saas-domains";
import { categoryColors } from "@/lib/category-colors";
import { difficultyMeta, formatMinRam } from "@/lib/tool-difficulty";
import { AddToStackButton } from "@/components/site/add-to-stack-button";
import { cn, formatStars, getHostname } from "@/lib/utils";
import { localeHref } from "@/lib/locale-href";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";

// Solo se necesita tras un clic en una tarjeta "Próximamente": se separa del
// bundle inicial para no cargarlo en cada página que lista herramientas.
const ComingSoonModal = dynamic(() =>
  import("@/components/site/coming-soon-modal").then((m) => m.ComingSoonModal)
);

export function ToolCard({
  tool: rawTool,
  locale = "es",
  t,
  comingSoonBadge,
  difficultyT,
  stackBuilderT,
}: {
  tool: ToolCardData;
  locale?: Locale;
  /** t.toolCard ya resuelto por el Server Component ancestro — evita que este client component arrastre es+en completos solo para renderizar una tarjeta. */
  t: Dictionary["toolCard"];
  /** t.comingSoon.badge — un string plano (a diferencia del resto de t.comingSoon, que incluye una función y no puede pasarse como prop de Server a Client Component). */
  comingSoonBadge: string;
  /** t.difficulty ya resuelto — labels del badge de dificultad/RAM. */
  difficultyT: Dictionary["difficulty"];
  /** t.stackBuilder ya resuelto — labels del botón "+ Añadir a mi Stack". */
  stackBuilderT: Dictionary["stackBuilder"];
}) {
  const tool = getLocalizedToolCardData(rawTool, locale);
  const [modalOpen, setModalOpen] = React.useState(false);
  const tagLabels: Record<string, string> = {
    "docker-ready": t.tagDockerReady,
    "1-click-deploy": t.tagOneClick,
    "permissive-license": t.tagPermissive,
  };
  const category = getCategoryMetaLocalized(tool.category, locale);
  const palette = categoryColors[tool.category];
  const published = isPublished(tool);
  const difficulty = difficultyMeta[tool.difficulty];
  const difficultyLabel =
    tool.difficulty === "beginner"
      ? difficultyT.beginnerBadge
      : tool.difficulty === "intermediate"
        ? difficultyT.intermediateBadge
        : difficultyT.advancedBadge;

  return (
    <Card
      className={cn(
        "group relative flex h-full flex-col transition-all",
        published ? cn("hover:-translate-y-0.5 hover:shadow-lg", palette.borderHover) : "opacity-80"
      )}
    >
      {tool.sponsored && (
        <span className="absolute -top-2.5 right-4 inline-flex items-center gap-1 rounded-full bg-slate-900 px-2.5 py-1 text-[10px] font-medium text-white shadow-sm">
          <BadgeCheck size={11} /> {t.sponsored}
        </span>
      )}
      {!published && (
        <span className="absolute -top-2.5 right-4 inline-flex items-center gap-1 rounded-full bg-slate-600 px-2.5 py-1 text-[10px] font-medium text-white shadow-sm">
          <Clock size={11} /> {comingSoonBadge}
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
              <p className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 py-1 pl-1 pr-2.5">
                <span className="flex -space-x-1.5">
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
                </span>
                <span className="text-xs font-medium text-slate-700">
                  {t.alternativeTo} {tool.replaces.join(", ")}
                </span>
              </p>
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
          {tool.fossModel && (
            <span
              className={cn(
                "inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium",
                tool.fossModel === "FOSS" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-800"
              )}
            >
              {tool.fossModel === "FOSS" ? t.fossModelFoss : t.fossModelOpenCore}
            </span>
          )}
          <span
            title={`${difficultyT.ramBadgePrefix} ${formatMinRam(tool.minRamMb)}`}
            className={cn("inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] font-medium", difficulty.badgeClass)}
          >
            {difficulty.emoji} {difficultyLabel} · {formatMinRam(tool.minRamMb)}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {tool.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tagLabels[tag] ?? tag}
            </Badge>
          ))}
        </div>

        {published ? (
          <div className="mt-auto flex items-center gap-2">
            <Link
              href={localeHref(`/tool/${tool.slug}`, locale)}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r px-4 py-2 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90",
                palette.gradient
              )}
            >
              {t.cta}
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <AddToStackButton
              toolSlug={tool.slug}
              addLabel={stackBuilderT.addButton}
              addedLabel={stackBuilderT.addedButton}
              compact
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            {t.comingSoonCta}
            <Clock size={15} />
          </button>
        )}
      </CardContent>

      {modalOpen && <ComingSoonModal tool={tool} locale={locale} onClose={() => setModalOpen(false)} />}
    </Card>
  );
}
