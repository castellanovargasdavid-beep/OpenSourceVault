"use client";

import * as React from "react";
import { trackReplaceEvent, type ReplaceAnalyticsEvent } from "@/lib/analytics";

/**
 * Dispara un evento de analítica una sola vez — sin convertir en cliente a
 * la página/Server Component que lo rodea (ver stack-builder-content.tsx /
 * cost-calculator.tsx / savings-calculator.tsx, que ya son "use client" y
 * disparan su propio evento inline sin necesitar esto). Mismo patrón de
 * guarda con useRef que replace_started en replace-wizard-content.tsx, para
 * no duplicar el evento bajo StrictMode.
 *
 * Dos modos:
 * - Por defecto (`viewport` ausente/false): dispara al montar — correcto
 *   para un "page view" real (tool_view/alternative_view/replace_view): la
 *   página SÍ se cargó en un navegador real, cuente o no el usuario con
 *   haber mirado cada sección. No renderiza ningún nodo (`return null`),
 *   igual que siempre.
 * - `viewport`: dispara solo cuando el elemento entra de verdad en el
 *   viewport (IntersectionObserver, mismo patrón ya usado en
 *   animated-counter.tsx — sin librería nueva). Para eventos que afirman
 *   una EXPOSICIÓN real, no solo un render técnico — ver `hosting_view` en
 *   hosting-tier-recommendation.tsx, que vive en una sidebar/sección que en
 *   mobile puede quedar fuera de la vista inicial.
 */
export function ViewTracker({ event, viewport = false }: { event: ReplaceAnalyticsEvent; viewport?: boolean }) {
  const firedRef = React.useRef(false);
  const elRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (firedRef.current) return;

    if (!viewport) {
      firedRef.current = true;
      trackReplaceEvent(event);
      return;
    }

    const el = elRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !firedRef.current) {
          firedRef.current = true;
          trackReplaceEvent(event);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
    // Disparo único (al montar, o a la primera entrada real en viewport) —
    // no se re-dispara si `event`/`viewport` cambian de identidad entre
    // renders; cada instancia de este componente ya representa un único
    // montaje de la superficie que mide.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!viewport) return null;
  // Marcador de tamaño cero, sin impacto visual ni de layout (no CLS): solo
  // necesita existir en el DOM, en la misma posición que la superficie que
  // representa, para que el IntersectionObserver pueda medir su visibilidad.
  return <span ref={elRef} aria-hidden="true" className="block h-px w-px" />;
}
