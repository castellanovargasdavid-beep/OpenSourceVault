"use client";

import * as React from "react";
import { trackReplaceEvent, type ReplaceAnalyticsEvent } from "@/lib/analytics";

/**
 * Dispara un evento de analítica una sola vez al montar — sin convertir en
 * cliente a la página/Server Component que lo rodea (ver stack-builder-
 * content.tsx / cost-calculator.tsx / savings-calculator.tsx, que ya son
 * "use client" y disparan su propio evento inline sin necesitar esto).
 * Mismo patrón de guarda con useRef que replace_started en
 * replace-wizard-content.tsx, para no duplicar el evento bajo StrictMode.
 */
export function ViewTracker({ event }: { event: ReplaceAnalyticsEvent }) {
  const firedRef = React.useRef(false);

  React.useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    trackReplaceEvent(event);
    // Disparo único al montar esta instancia (una página = un montaje) —
    // no se re-dispara si `event` cambia de identidad entre renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
