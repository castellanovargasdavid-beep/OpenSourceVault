import Link from "next/link";
import { Boxes } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { href: "/#categorias", label: "Categorías" },
  { href: "/hosting-deals", label: "Hosting & Descuentos" },
  { href: "/#destacadas", label: "Destacadas" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold text-slate-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm">
            <Boxes size={18} />
          </span>
          <span>{siteConfig.name}</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/hosting-deals"
          className="inline-flex h-9 items-center rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 px-4 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90"
        >
          Ver ofertas de hosting
        </Link>
      </div>
    </header>
  );
}
