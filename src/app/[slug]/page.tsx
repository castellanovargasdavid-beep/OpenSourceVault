import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSaasSlugs, getSaasAlternatives } from "@/lib/alternatives";
import { ToolCard } from "@/components/site/tool-card";
import { JsonLd } from "@/components/site/json-ld";
import { LogoImage } from "@/components/site/logo-image";
import { getSaasDomain } from "@/lib/saas-domains";
import { siteConfig } from "@/lib/site-config";

const ALTERNATIVA_PREFIX = "alternativa-a-";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Next.js App Router no permite prefijos estáticos dentro de un mismo segmento
 * dinámico (una carpeta "alternativa-a-[slug]" no enruta). Para conseguir la
 * URL /alternativa-a-[slug] pedida, capturamos el segmento completo aquí y
 * parseamos el prefijo en código.
 */
function getSaasSlugFromRouteSlug(routeSlug: string): string | null {
  if (!routeSlug.startsWith(ALTERNATIVA_PREFIX)) return null;
  return routeSlug.slice(ALTERNATIVA_PREFIX.length) || null;
}

export function generateStaticParams() {
  return getAllSaasSlugs().map((saasSlug) => ({
    slug: `${ALTERNATIVA_PREFIX}${saasSlug}`,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: routeSlug } = await params;
  const saasSlug = getSaasSlugFromRouteSlug(routeSlug);
  const group = saasSlug ? getSaasAlternatives(saasSlug) : undefined;
  if (!group) return {};

  const title = `Las mejores alternativas Open Source a ${group.saasName} en ${siteConfig.year}`;
  const description = `Compara ${group.tools.length} herramientas de código abierto y auto-hospedables que reemplazan a ${group.saasName}: licencia, stack técnico y guía de despliegue con Docker.`;
  const url = `${siteConfig.url}/${ALTERNATIVA_PREFIX}${group.saasSlug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function AlternativaPage({ params }: PageProps) {
  const { slug: routeSlug } = await params;
  const saasSlug = getSaasSlugFromRouteSlug(routeSlug);
  const group = saasSlug ? getSaasAlternatives(saasSlug) : undefined;
  if (!group) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `Alternativas Open Source a ${group.saasName}`,
          itemListElement: group.tools.map((tool, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${siteConfig.url}/tool/${tool.slug}`,
            name: tool.name,
          })),
        }}
      />

      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/" className="hover:text-emerald-700">
          Inicio
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">Alternativas a {group.saasName}</span>
      </nav>

      <header className="mb-10 max-w-3xl">
        <div className="mb-4 flex items-center gap-3">
          <LogoImage
            domain={getSaasDomain(group.saasName)}
            label={group.saasName}
            size={48}
            fallbackGradient="from-slate-400 to-slate-500"
            className="rounded-xl grayscale"
          />
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            {group.tools.length} {group.tools.length === 1 ? "alternativa verificada" : "alternativas verificadas"}
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Las mejores alternativas Open Source a {group.saasName} en {siteConfig.year}
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Comparamos {group.tools.length}{" "}
          {group.tools.length === 1 ? "herramienta auto-hospedable" : "herramientas auto-hospedables"}{" "}
          que puedes desplegar en tu propio servidor en minutos, con licencia, stack técnico y
          docker-compose listo para copiar.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {group.tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
}
