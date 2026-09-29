"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavDropdownItem {
  href: string;
  label: string;
}

/**
 * Grupo desplegable del header de escritorio (Fase 1 del brief de
 * navegación) — agrupa las 3 herramientas de "construir tu stack" (Stack
 * Builder, Reemplaza mi SaaS, Auditoría SaaS) bajo un único disparador, en
 * vez de sumar cada una como un enlace más de texto plano: el `<nav>` de
 * escritorio ya no tenía margen (0-31px según el idioma) en el breakpoint
 * `lg` de 1024px antes de añadir esto — ver diagnóstico en el commit.
 * Cierra con click fuera o Escape, mismo patrón de accesibilidad que
 * MobileNav.
 */
export function NavDropdown({ label, items }: { label: string; items: NavDropdownItem[] }) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-1 whitespace-nowrap text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
      >
        {label}
        <ChevronDown size={14} className={cn("transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div role="menu" className="absolute left-0 top-full z-50 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-emerald-700"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
