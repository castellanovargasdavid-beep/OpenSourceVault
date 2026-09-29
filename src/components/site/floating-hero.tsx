import type { CSSProperties } from "react";
import type { HeroFloatingData } from "@/lib/hero-floating-data";
import { FloatingToolCard } from "@/components/site/floating-tool-card";
import { FloatingStackCard } from "@/components/site/floating-stack-card";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";

/**
 * Posición, duración y delay de cada tarjeta en el layer flotante de
 * escritorio. Valores fijos (no generados) a propósito — igual que
 * .animate-blob-delayed en globals.css, un delay negativo hace que la
 * animación arranque ya "a mitad de ciclo" en vez de esperar a que las 5
 * tarjetas se sincronicen la primera vez, para que el movimiento se sienta
 * orgánico desde el primer render.
 */
const SLOT_LAYOUT = [
  { position: "left-0 top-0", duration: "8s", delay: "-1s", distance: "-9px" },
  { position: "left-2 top-52", duration: "9.5s", delay: "-4s", distance: "-11px" },
  { position: "left-24 top-[27rem]", duration: "8.5s", delay: "-2.5s", distance: "-8px" },
  { position: "right-4 top-[21rem]", duration: "7.5s", delay: "-5s", distance: "-10px" },
] as const;

const STACK_CARD_LAYOUT = { position: "right-0 top-10", duration: "9s", delay: "-3s", distance: "-10px" } as const;

export function FloatingHero({
  data,
  locale,
  t,
  toolCardT,
}: {
  data: HeroFloatingData;
  locale: Locale;
  t: Dictionary["heroFloating"];
  toolCardT: Dictionary["toolCard"];
}) {
  const { slots, stack } = data;
  if (slots.length === 0 && !stack) return null;

  return (
    <>
      {/* Desktop: capa de tarjetas flotantes alrededor del contenido central (nivel 2 de profundidad — ver sección 9 del brief). Solo a partir de xl: por debajo de eso no hay margen real a los lados de la columna central sin solaparla. */}
      <div className="pointer-events-none absolute inset-0 hidden xl:block">
        {slots.map((slot, i) => {
          const layout = SLOT_LAYOUT[i % SLOT_LAYOUT.length];
          return (
            <div key={slot.pairs[0]?.toolId ?? i} className={cn("pointer-events-auto absolute", layout.position)}>
              <FloatingToolCard
                pairs={slot.pairs}
                locale={locale}
                ramLabel={t.ramLabel}
                toolCardT={toolCardT}
                // Solo la tarjeta cuyo contenido rota (2+ pares) mantiene el
                // flotado perpetuo — el resto queda fija. Antes las 5
                // tarjetas flotaban a la vez todo el tiempo; era demasiado
                // movimiento simultáneo para un hero (y además anulaba en
                // silencio el hover de las tarjetas estáticas, ver el
                // comentario de "isFloatingAndAnimated" en FloatingToolCard).
                float={slot.pairs.length > 1}
                style={
                  {
                    "--hero-float-duration": layout.duration,
                    "--hero-float-delay": layout.delay,
                    "--hero-float-distance": layout.distance,
                  } as CSSProperties
                }
              />
            </div>
          );
        })}
        {stack && (
          <div className={cn("pointer-events-auto absolute", STACK_CARD_LAYOUT.position)}>
            <FloatingStackCard
              stack={stack}
              locale={locale}
              t={t}
              toolCardT={toolCardT}
              style={
                {
                  "--hero-float-duration": STACK_CARD_LAYOUT.duration,
                  "--hero-float-delay": STACK_CARD_LAYOUT.delay,
                  "--hero-float-distance": STACK_CARD_LAYOUT.distance,
                } as CSSProperties
              }
            />
          </div>
        )}
      </div>

      {/* Mobile/tablet (< xl): sin posiciones flotantes ni animación — una fila compacta y estática debajo del contenido principal. Menos tarjetas, pero la misma historia Discover→Compare→Build sigue presente. */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3 xl:hidden">
        {slots[0] && <FloatingToolCard pairs={slots[0].pairs} locale={locale} ramLabel={t.ramLabel} toolCardT={toolCardT} layout="inline" />}
        {stack && <FloatingStackCard stack={stack} locale={locale} t={t} toolCardT={toolCardT} layout="inline" />}
      </div>
    </>
  );
}
