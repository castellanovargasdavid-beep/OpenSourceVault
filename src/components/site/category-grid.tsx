import Link from "next/link";
import { LayoutGrid, BarChart3, Terminal, Users, Sparkles, Database, type LucideIcon } from "lucide-react";
import { categories } from "@/data/categories";
import { tools } from "@/data/tools";

const iconMap: Record<string, LucideIcon> = {
  "layout-grid": LayoutGrid,
  "bar-chart-3": BarChart3,
  terminal: Terminal,
  users: Users,
  sparkles: Sparkles,
  database: Database,
};

export function CategoryGrid() {
  return (
    <section id="categorias" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-2xl">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Explora por categoría</h2>
        <p className="mt-2 text-slate-600">
          Desde bases de datos y CRM hasta IA: encuentra el reemplazo open source exacto que
          necesita tu stack.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const Icon = iconMap[category.icon];
          const count = tools.filter((t) => t.category === category.id).length;
          return (
            <Link
              key={category.id}
              href={`/categoria/${category.slug}`}
              className="group flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100">
                  <Icon size={20} />
                </span>
                <span className="text-xs font-medium text-slate-400">{count} herramientas</span>
              </div>
              <div>
                <p className="font-semibold text-slate-900">{category.label}</p>
                <p className="mt-1 text-sm text-slate-500">{category.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
