import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { catalogStats } from "@/lib/catalog-stats";
import { getDictionary } from "@/i18n/get-dictionary";
import { getToolsExplorerHref } from "@/lib/routes";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";

/**
 * Sustituye al ToolExplorer completo (filtros + paginación de las 196
 * herramientas) que antes vivía al final de la home — ahora ese catálogo
 * interactivo tiene su propia página (/herramientas, /en/tools) para que la
 * home no se comporte visualmente como el directorio completo. Este CTA
 * mantiene el enlace interno hacia el catálogo con cifras reales
 * (catalogStats, las mismas que usan el hero y la metodología) — nunca un
 * número inventado.
 */
export function CatalogTeaser({ locale = "es" }: { locale?: Locale }) {
  const t = getDictionary(locale).catalogTeaser;
  const published = catalogStats.totalTools;
  const comingSoon = catalogStats.totalNotYetPublished;

  return (
    <section className="border-t border-slate-200 bg-slate-50 py-16">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{t.title}</h2>
        <p className="mt-3 text-slate-600">{t.subtitle(published, comingSoon)}</p>
        <Link
          href={getToolsExplorerHref(locale)}
          className={cn(buttonVariants({ size: "lg" }), "mt-6 gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-90")}
        >
          {t.cta}
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
