import Link from "next/link";
import { Flame } from "lucide-react";
import { getFeaturedTools } from "@/data/tools";
import { ToolCard } from "@/components/site/tool-card";

export function FeaturedTools() {
  const featured = getFeaturedTools();
  if (featured.length === 0) return null;

  return (
    <section
      id="destacadas"
      className="bg-gradient-to-b from-white via-violet-50/40 to-white py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
              <Flame size={14} /> Destacadas de la semana
            </span>
            <h2 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
              Las alternativas más sólidas para desplegar hoy
            </h2>
            <p className="mt-2 max-w-xl text-slate-600">
              Elegidas por madurez del proyecto, comunidad activa y facilidad de despliegue con
              Docker.
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
