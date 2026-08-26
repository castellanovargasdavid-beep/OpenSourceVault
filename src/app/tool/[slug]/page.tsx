import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, GitFork, ExternalLink, Check, X, ArrowRight } from "lucide-react";
import { tools, getToolBySlug } from "@/data/tools";
import { getCategoryMeta } from "@/data/categories";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { AffiliateHostingWidget } from "@/components/site/affiliate-hosting-widget";
import { DockerComposeBlock } from "@/components/site/docker-compose-block";
import { JsonLd } from "@/components/site/json-ld";
import { LogoImage } from "@/components/site/logo-image";
import { getSaasDomain } from "@/lib/saas-domains";
import { categoryColors } from "@/lib/category-colors";
import { getComparisonsForTool } from "@/lib/comparisons";
import { siteConfig } from "@/lib/site-config";
import { slugify, cn, formatStars, getHostname } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};

  const mainSaas = tool.replaces[0];
  const title = `${tool.name}: la mejor alternativa Open Source a ${mainSaas} en ${siteConfig.year}`;
  const description = tool.shortDescription;
  const url = `${siteConfig.url}/tool/${tool.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const category = getCategoryMeta(tool.category);
  const palette = categoryColors[tool.category];
  const comparisons = getComparisonsForTool(tool.slug).slice(0, 5);

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
          url: `${siteConfig.url}/tool/${tool.slug}`,
          codeRepository: tool.githubUrl,
        }}
      />

      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/" className="hover:text-emerald-700">
          Inicio
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/categoria/${category.slug}`} className="hover:text-emerald-700">
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
          {tool.name}: la mejor alternativa Open Source a {tool.replaces[0]} en {siteConfig.year}
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-600">{tool.description}</p>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <GitFork size={16} /> Licencia {tool.license}
          </span>
          {tool.starsCount && (
            <span className="inline-flex items-center gap-1.5">
              <Star size={16} className="text-amber-500" /> ~{formatStars(tool.starsCount)} estrellas
              (estimado)
            </span>
          )}
          <a
            href={tool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-emerald-700"
          >
            Sitio web <ExternalLink size={14} />
          </a>
          <a
            href={tool.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-emerald-700"
          >
            Repositorio en GitHub <ExternalLink size={14} />
          </a>
        </div>
      </header>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          <section>
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Ficha técnica</h2>
            <dl className={cn("grid grid-cols-2 gap-4 rounded-xl border p-6 sm:grid-cols-3", palette.soft, palette.border)}>
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-400">Licencia</dt>
                <dd className="mt-1 font-medium text-slate-900">{tool.license}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-400">Categoría</dt>
                <dd className="mt-1 font-medium text-slate-900">{category.label}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-400">Sustituye a</dt>
                <dd className="mt-1 font-medium text-slate-900">{tool.replaces.join(", ")}</dd>
              </div>
              <div className="col-span-2 sm:col-span-3">
                <dt className="text-xs uppercase tracking-wide text-slate-400">Stack técnico</dt>
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

          <section>
            <h2 className="mb-4 text-xl font-semibold text-slate-900">
              Funcionalidades principales
            </h2>
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
            <h2 className="mb-4 text-xl font-semibold text-slate-900">
              {tool.name} vs. {tool.replaces[0]}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
                <p className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-emerald-800">
                  <Check size={16} /> Ventajas
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
                  <X size={16} /> A tener en cuenta
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

          <section>
            <h2 className="mb-4 text-xl font-semibold text-slate-900">
              Guía rápida de instalación con Docker
            </h2>
            <p className="mb-4 text-sm text-slate-600">
              Copia este <code className="rounded bg-slate-100 px-1.5 py-0.5">docker-compose.yml</code>,
              ajusta las contraseñas de ejemplo y ejecuta{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5">docker compose up -d</code> en tu
              servidor.{" "}
              <Link href="/guias/desplegar-con-docker" className="font-medium text-emerald-700 hover:underline">
                Ver la guía completa paso a paso →
              </Link>
            </p>
            <DockerComposeBlock code={tool.dockerCompose} />
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <AffiliateHostingWidget tool={tool} />

          <div className={cn("rounded-xl border p-6", palette.soft, palette.border)}>
            <p className="mb-3 text-sm font-semibold text-slate-900">Otras alternativas a lo mismo</p>
            <div className="flex flex-col gap-2">
              {tool.replaces.map((saas) => (
                <Link
                  key={saas}
                  href={`/alternativa-a-${slugify(saas)}`}
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }), "justify-between")}
                >
                  Ver alternativas a {saas}
                  <ExternalLink size={14} />
                </Link>
              ))}
            </div>
          </div>

          {comparisons.length > 0 && (
            <div className="rounded-xl border border-slate-200 p-6">
              <p className="mb-3 text-sm font-semibold text-slate-900">Comparativas cara a cara</p>
              <div className="flex flex-col gap-2">
                {comparisons.map((comparison) => {
                  const other = comparison.toolA.slug === tool.slug ? comparison.toolB : comparison.toolA;
                  return (
                    <Link
                      key={comparison.pairSlug}
                      href={`/comparar/${comparison.pairSlug}`}
                      className={cn(buttonVariants({ variant: "outline", size: "sm" }), "justify-between")}
                    >
                      {tool.name} vs {other.name}
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
