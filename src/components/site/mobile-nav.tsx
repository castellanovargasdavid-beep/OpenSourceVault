"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { GithubIcon } from "@/components/icons/github-icon";

interface NavLink {
  href: string;
  label: string;
}

export function MobileNav({
  navLinks,
  githubHref,
  githubLabel,
  hostingHref,
  hostingLabel,
  menuLabel,
  closeLabel,
}: {
  navLinks: NavLink[];
  githubHref: string;
  githubLabel: string;
  hostingHref: string;
  hostingLabel: string;
  menuLabel: string;
  closeLabel: string;
}) {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      // Trampa de foco: sin esto, Tab desde el último enlace del panel sale
      // del diálogo hacia contenido de la página que sigue visualmente tapado
      // por el overlay (confirmado con teclado: el 10º Tab caía en el
      // selector de idioma "ES", detrás del fondo semitransparente).
      if (e.key === "Tab") {
        const panel = panelRef.current;
        if (!panel) return;
        const focusables = panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKey);
      trigger?.focus();
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={menuLabel}
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 text-slate-700 transition-colors hover:bg-slate-50"
      >
        <Menu size={18} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label={closeLabel}
            className="absolute inset-0 bg-slate-900/40"
            onClick={() => setOpen(false)}
          />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={menuLabel}
            tabIndex={-1}
            className="absolute right-0 top-0 flex h-full w-72 max-w-[85vw] flex-col overflow-y-auto bg-white p-4 shadow-xl outline-none"
          >
            <div className="mb-2 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={closeLabel}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 flex flex-col gap-2 border-t border-slate-200 pt-4">
              <a
                href={githubHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex h-10 items-center justify-center gap-1.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                <GithubIcon size={16} />
                {githubLabel}
              </a>
              <Link
                href={hostingHref}
                onClick={() => setOpen(false)}
                className="flex h-10 items-center justify-center rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90"
              >
                {hostingLabel}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
