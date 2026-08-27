import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, ShieldAlert } from "lucide-react";
import { tools, getToolBySlug } from "@/data/tools";
import { LogoImage } from "@/components/site/logo-image";
import { getSaasDomain } from "@/lib/saas-domains";
import { categoryColors } from "@/lib/category-colors";
import {
  getMigrationPatternId,
  getMigrationPatternContent,
  fillTemplate,
} from "@/lib/migration-patterns";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn, slugify, getHostname } from "@/lib/utils";

interface PageProps {
  params: Promise<{ from: string; to: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return tools.map((tool) => ({
    from: slugify(tool.replaces[0]),
    to: tool.slug,
  }));
}

function resolveGuide(from: string, to: string) {
  const tool = getToolBySlug(to);
  if (!tool) return null;
  const fromName = tool.replaces[0];
  if (slugify(fromName) !== from) return null;
  return { tool, fromName };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { from, to } = await params;
  const resolved = resolveGuide(from, to);
  if (!resolved) return {};
  const { tool, fromName } = resolved;

  const title = `Cómo migrar de ${fromName} a ${tool.name} sin perder datos (${siteConfig.year})`;
  const description = `Guía paso a paso para migrar de ${fromName} a ${tool.name}: qué se exporta automáticamente, qué tendrás que rehacer a mano, y qué revisar antes de cancelar ${fromName}.`;
  const url = `${siteConfig.url}/guias/migrar/${from}/${to}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function MigrationGuidePage({ params }: PageProps) {
  const { from, to } = await params;
  const resolved = resolveGuide(from, to);
  if (!resolved) notFound();
  const { tool, fromName } = resolved;

  const patternId = getMigrationPatternId(fromName);
  const content = getMigrationPatternContent(patternId);
  const palette = categoryColors[tool.category];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/" className="hover:text-emerald-700">
          Inicio
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">
          Migrar de {fromName} a {tool.name}
        </span>
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
          Guía de migración
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Cómo migrar de {fromName} a {tool.name}
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
              <p className="text-sm text-slate-600">
                {fillTemplate(step.body, fromName, tool.name)}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-5">
        <ShieldAlert size={20} className="mt-0.5 shrink-0 text-amber-600" />
        <div>
          <p className="text-sm font-semibold text-amber-800">
            Antes de cancelar {fromName}
          </p>
          <p className="mt-1 text-sm text-slate-700">
            {fillTemplate(content.beforeYouCancel, fromName, tool.name)}
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <p className="font-semibold text-slate-900">¿Listo para desplegar {tool.name}?</p>
        <p className="mt-1 text-sm text-slate-600">
          Ficha completa con licencia, stack técnico y docker-compose listo para copiar.
        </p>
        <Link href={`/tool/${tool.slug}`} className={cn(buttonVariants({ size: "lg" }), "mt-4 gap-1.5")}>
          Ver ficha de {tool.name} <ArrowRight size={16} />
        </Link>
      </div>

      <p className="mt-6 flex items-center gap-1.5 text-xs text-slate-400">
        <Clock size={12} /> Los pasos son una guía general orientativa — el menú exacto de
        exportación puede variar según el plan y la versión de {fromName}.
      </p>
    </div>
  );
}
