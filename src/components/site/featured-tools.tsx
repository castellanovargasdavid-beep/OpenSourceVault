import Link from "next/link";
import { getFeaturedTools } from "@/data/tools";
import { ToolCard } from "@/components/site/tool-card";

export function FeaturedTools() {
  const featured = getFeaturedTools();
  if (featured.length === 0) return null;

  return (
    <section id="destacadas" className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Herramientas destacadas de la semana
            </h2>
            <p className="mt-2 max-w-xl text-slate-600">
              Las alternativas open source más sólidas para desplegar hoy mismo, con guía y
              docker-compose incluidos.
            </p>
          </div>
          <Link
            href="#explorador"
            className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
          >
            Ver todo el catálogo →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
