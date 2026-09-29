"use client";

import { Plus, Check } from "lucide-react";
import { useStackBuilder } from "@/lib/stack-builder-store";
import { cn } from "@/lib/utils";

/**
 * Botón "+ Añadir a mi Stack" reutilizable en ToolCard (modo `compact`, solo
 * icono) y en la ficha de la herramienta (modo completo, con texto).
 * Alterna la pertenencia al stack ACTIVO del usuario (localStorage, sin
 * registro) — ver src/lib/stack-builder-store.tsx.
 */
export function AddToStackButton({
  toolSlug,
  addLabel,
  addedLabel,
  compact = false,
  className,
  onAdd,
}: {
  toolSlug: string;
  addLabel: string;
  addedLabel: string;
  compact?: boolean;
  className?: string;
  /** Se dispara solo al pasar de "no está en el stack" a "añadido" — nunca al quitarlo. Opcional, para analítica (ver trackReplaceEvent) sin acoplar este componente genérico a ningún flujo concreto. */
  onAdd?: () => void;
}) {
  const { hydrated, isInActiveStack, toggleTool } = useStackBuilder();
  const inStack = hydrated && isInActiveStack(toolSlug);
  const label = inStack ? addedLabel : addLabel;

  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={inStack}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!inStack) onAdd?.();
        toggleTool(toolSlug);
      }}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-lg border font-medium transition-colors",
        compact ? "h-9 w-9 px-0" : "gap-1.5 px-3 py-2 text-sm",
        inStack
          ? "border-emerald-600 bg-emerald-50 text-emerald-700"
          : "border-slate-300 bg-white text-slate-600 hover:border-emerald-400 hover:text-emerald-700",
        className
      )}
    >
      {inStack ? <Check size={compact ? 16 : 15} /> : <Plus size={compact ? 16 : 15} />}
      {!compact && label}
    </button>
  );
}
