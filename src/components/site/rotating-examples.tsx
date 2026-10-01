"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function RotatingExamples({
  examples,
  className,
  startIndex = 0,
}: {
  examples: string[];
  className?: string;
  /** Qué elemento se muestra en SSR/primer pintado, antes de que arranque la rotación — útil cuando ese primer estado importa más que los demás (p.ej. destacar "Construye" en el H1 del hero). */
  startIndex?: number;
}) {
  const [index, setIndex] = React.useState(startIndex);
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    // Mismo guard que ya usa FloatingToolCard para su propia rotación con
    // fade (ver floating-tool-card.tsx) — el estado inicial ya es una frase
    // completa y comprensible por sí sola, así que respetar reduced-motion
    // aquí es simplemente no animar más allá de eso, sin perder información:
    // el flujo Descubre→Compara→Construye→Despliega sigue visible, estático,
    // justo debajo en el hero.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = setInterval(() => {
      setVisible(false);
      const timeout = setTimeout(() => {
        setIndex((i) => (i + 1) % examples.length);
        setVisible(true);
      }, 250);
      return () => clearTimeout(timeout);
    }, 2200);
    return () => clearInterval(interval);
  }, [examples.length]);

  return (
    <span
      className={cn(
        "inline-block transition-all duration-200",
        visible ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
        className
      )}
    >
      {examples[index]}
    </span>
  );
}
