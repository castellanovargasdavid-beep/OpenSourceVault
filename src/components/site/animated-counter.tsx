"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
}

/**
 * El número mostrado es SIEMPRE el real (`value`), desde el HTML servido
 * por el servidor y en el primer render de cliente — nunca "0" ni ningún
 * valor falso, ni un instante. Antes animaba el propio DÍGITO desde 0 hasta
 * `value` al entrar en el viewport (useState(0) + requestAnimationFrame):
 * en una web cuyo diferencial es la precisión de sus cifras auditadas,
 * enseñar "0+ herramientas" aunque sea brevemente contradice justo eso — y
 * el HTML servido (antes de hidratar, o para cualquier crawler/lector que
 * no espere a la animación) mostraba ese 0 de verdad, no solo un instante
 * visual. Se sustituye por una transición de opacidad/escala que revela el
 * número real al hacer scroll, sin tocar el dígito en ningún momento.
 */
export function AnimatedCounter({ value, suffix = "", prefix = "" }: AnimatedCounterProps) {
  const [revealed, setRevealed] = React.useState(false);
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className={cn("inline-block transition-all duration-700 ease-out", revealed ? "scale-100 opacity-100" : "scale-90 opacity-60")}
    >
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
