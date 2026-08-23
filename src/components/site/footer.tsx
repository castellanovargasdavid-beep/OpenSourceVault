import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { categories } from "@/data/categories";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <p className="text-base font-semibold text-slate-900">{siteConfig.name}</p>
          <p className="mt-2 max-w-sm text-sm text-slate-500">{siteConfig.description}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Categorías</p>
          <ul className="mt-3 space-y-2">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/categoria/${category.slug}`}
                  className="text-sm text-slate-500 hover:text-emerald-700"
                >
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Recursos</p>
          <ul className="mt-3 space-y-2">
            <li>
              <Link href="/hosting-deals" className="text-sm text-slate-500 hover:text-emerald-700">
                Hosting & Descuentos
              </Link>
            </li>
            <li>
              <Link href="/#destacadas" className="text-sm text-slate-500 hover:text-emerald-700">
                Herramientas destacadas
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 py-6">
        <p className="mx-auto max-w-7xl px-4 text-xs text-slate-400 sm:px-6 lg:px-8">
          © {siteConfig.year} {siteConfig.name}. Algunos enlaces de hosting son de afiliado: podemos
          recibir una comisión sin coste extra para ti.
        </p>
      </div>
    </footer>
  );
}
