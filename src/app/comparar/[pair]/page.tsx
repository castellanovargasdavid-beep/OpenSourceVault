import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, X, Star, ArrowRight } from "lucide-react";
import { getAllComparisonSlugs, getComparisonBySlug } from "@/lib/comparisons";
import { getCategoryMeta } from "@/data/categories";
import { categoryColors } from "@/lib/category-colors";
import { LogoImage } from "@/components/site/logo-image";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn, formatStars, getHostname } from "@/lib/utils";
import type { OpenSourceTool } from "@/lib/types";

interface PageProps {
  params: Promise<{ pair: string }>;
}

export function generateStaticParams() {
  return getAllComparisonSlugs().map((pair) => ({ pair }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { pair } = await params;
  const comparison = getComparisonBySlug(pair);
  if (!comparison) return {};

  const { toolA, toolB } = comparison;
  const title = `${toolA.name} vs ${toolB.name}: ¿cuál elegir en ${siteConfig.year}?`;
  const description = `Comparamos ${toolA.name} y ${toolB.name} — licencia, stack técnico, funcionalidades y pros/contras — para ayudarte a elegir tu alternativa open source.`;
  const url = `${siteConfig.url}/comparar/${comparison.pairSlug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article" },
    twitter: { card: "summary_large_image", title, description },
  };
}

function starWinner(a: OpenSourceTool, b: OpenSourceTool): string | null {
  if (!a.starsCount || !b.starsCount) return null;
  if (a.starsCount === b.starsCount) return null;
  const winner = a.starsCount > b.starsCount ? a : b;
  return winner.name;
}

export default async function ComparisonPage({ params }: PageProps) {
  const { pair } = await params;
  const comparison = getComparisonBySlug(pair);
  if (!comparison) notFound();

  const { toolA, toolB, sharedSaas } = comparison;
  const categoryA = getCategoryMeta(toolA.category);
  const categoryB = getCategoryMeta(toolB.category);
  const paletteA = categoryColors[toolA.category];
  const paletteB = categoryColors[toolB.category];
  const popularity = starWinner(toolA, toolB);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/" className="hover:text-emerald-700">
          Inicio
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">
          {toolA.name} vs {toolB.name}
        </span>
      </nav>

      <header className="mb-10 text-center">
        <div className="mb-4 flex items-center justify-center gap-4">
          <LogoImage
            domain={getHostname(toolA.websiteUrl)}
            label={toolA.name}
            size={56}
            fallbackGradient={paletteA.gradient}
            className="rounded-xl"
          />
          <span className="text-lg font-bold text-slate-300">VS</span>
          <LogoImage
            domain={getHostname(toolB.websiteUrl)}
            label={toolB.name}
            size={56}
            fallbackGradient={paletteB.gradient}
            className="rounded-xl"
          />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {toolA.name} vs {toolB.name}: ¿cuál elegir en {siteConfig.year}?
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Ambas son alternativas open source a {sharedSaas.join(", ")}. Comparamos licencia, stack
          técnico y funcionalidades para ayudarte a decidir cuál se ajusta mejor a tu equipo.
        </p>
      </header>

      <section className="mb-10 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse overflow-hidden rounded-xl border border-slate-200 text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="px-4 py-3"></th>
              <th className="px-4 py-3">{toolA.name}</th>
              <th className="px-4 py-3">{toolB.name}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="px-4 py-3 font-medium text-slate-500">Categoría</td>
              <td className="px-4 py-3">
                <Badge className={paletteA.badge}>{categoryA.label}</Badge>
              </td>
              <td className="px-4 py-3">
                <Badge className={paletteB.badge}>{categoryB.label}</Badge>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-500">Licencia</td>
              <td className="px-4 py-3 text-slate-900">{toolA.license}</td>
              <td className="px-4 py-3 text-slate-900">{toolB.license}</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-500">Estrellas en GitHub</td>
              <td className="px-4 py-3 text-slate-900">
                {toolA.starsCount ? (
                  <span className="inline-flex items-center gap-1">
                    <Star size={14} className="text-amber-500" /> {formatStars(toolA.starsCount)}
                  </span>
                ) : (
                  "—"
                )}
              </td>
              <td className="px-4 py-3 text-slate-900">
                {toolB.starsCount ? (
                  <span className="inline-flex items-center gap-1">
                    <Star size={14} className="text-amber-500" /> {formatStars(toolB.starsCount)}
                  </span>
                ) : (
                  "—"
                )}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-500">Stack técnico</td>
              <td className="px-4 py-3 text-slate-900">{toolA.techStack.join(", ")}</td>
              <td className="px-4 py-3 text-slate-900">{toolB.techStack.join(", ")}</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-500">Sustituye a</td>
              <td className="px-4 py-3 text-slate-900">{toolA.replaces.join(", ")}</td>
              <td className="px-4 py-3 text-slate-900">{toolB.replaces.join(", ")}</td>
            </tr>
          </tbody>
        </table>
        {popularity && (
          <p className="mt-3 text-xs text-slate-400">
            {popularity} tiene más estrellas en GitHub, lo que suele indicar una comunidad más
            grande (no necesariamente que sea la mejor opción para tu caso de uso).
          </p>
        )}
      </section>

      <section className="mb-10 grid gap-6 sm:grid-cols-2">
        {[
          { tool: toolA, palette: paletteA },
          { tool: toolB, palette: paletteB },
        ].map(({ tool, palette }) => (
          <div key={tool.id} className={cn("rounded-xl border p-6", palette.soft, palette.border)}>
            <h2 className="mb-3 text-lg font-semibold text-slate-900">{tool.name}</h2>
            <p className="mb-4 text-sm text-slate-600">{tool.shortDescription}</p>

            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-700">
              <Check size={14} /> Ventajas
            </p>
            <ul className="mb-4 space-y-1.5">
              {tool.pros.map((pro) => (
                <li key={pro} className="text-sm text-slate-700">
                  {pro}
                </li>
              ))}
            </ul>

            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-amber-700">
              <X size={14} /> A tener en cuenta
            </p>
            <ul className="mb-5 space-y-1.5">
              {tool.cons.map((con) => (
                <li key={con} className="text-sm text-slate-700">
                  {con}
                </li>
              ))}
            </ul>

            <Link
              href={`/tool/${tool.slug}`}
              className={cn(buttonVariants({ size: "sm" }), "w-full justify-between bg-gradient-to-r", palette.gradient)}
            >
              Ver ficha completa de {tool.name}
              <ArrowRight size={14} />
            </Link>
          </div>
        ))}
      </section>

      <section className="rounded-xl border border-slate-200 p-6">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Funcionalidades principales</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-medium text-slate-900">{toolA.name}</p>
            <ul className="space-y-1.5">
              {toolA.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                  <Check size={14} className="mt-0.5 shrink-0 text-emerald-600" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-slate-900">{toolB.name}</p>
            <ul className="space-y-1.5">
              {toolB.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                  <Check size={14} className="mt-0.5 shrink-0 text-emerald-600" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
