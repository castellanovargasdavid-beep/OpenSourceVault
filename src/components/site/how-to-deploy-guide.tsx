"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Terminal } from "lucide-react";
import type { OneClickDeployTarget } from "@/lib/types";
import type { Locale } from "@/i18n/config";

// Carga diferida: el modal (tabs, pasos, callouts, react-dom createPortal,
// y la llamada a getDictionary con sus funciones de interpolación) solo se
// descarga en el navegador cuando el usuario pulsa el botón de abajo, nunca
// como parte del bundle inicial de la ficha de herramienta.
const HowToDeployModal = dynamic(() => import("@/components/site/how-to-deploy-modal").then((m) => m.HowToDeployModal), {
  ssr: false,
});

export function HowToDeployGuide({
  toolName,
  toolSlug,
  dockerCompose,
  oneClickDeploy,
  locale = "es",
  trigger,
}: {
  toolName: string;
  toolSlug: string;
  dockerCompose: string;
  oneClickDeploy?: OneClickDeployTarget[];
  locale?: Locale;
  /**
   * t.howToDeploy.trigger — un string plano ya resuelto por el Server
   * Component ancestro. El resto de t.howToDeploy (con funciones de
   * interpolación, no serializables como prop) se resuelve dentro del modal
   * perezoso, no aquí, para que este botón visible en cada ficha de
   * herramienta no arrastre el diccionario es+en completo a su bundle eager.
   */
  trigger: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 hover:underline"
      >
        <Terminal size={15} />
        {trigger}
      </button>
      {open && (
        <HowToDeployModal
          toolName={toolName}
          toolSlug={toolSlug}
          dockerCompose={dockerCompose}
          oneClickDeploy={oneClickDeploy}
          locale={locale}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
