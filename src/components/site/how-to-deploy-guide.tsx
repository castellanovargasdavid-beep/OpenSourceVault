"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Terminal } from "lucide-react";
import type { OneClickDeployTarget } from "@/lib/types";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

// Carga diferida: el modal (tabs, pasos, callouts, react-dom createPortal)
// solo se descarga en el navegador cuando el usuario pulsa el botón de
// abajo, nunca como parte del bundle inicial de la ficha de herramienta.
const HowToDeployModal = dynamic(() => import("@/components/site/how-to-deploy-modal").then((m) => m.HowToDeployModal), {
  ssr: false,
});

export function HowToDeployGuide({
  toolName,
  toolSlug,
  dockerCompose,
  oneClickDeploy,
  locale,
}: {
  toolName: string;
  toolSlug: string;
  dockerCompose: string;
  oneClickDeploy?: OneClickDeployTarget[];
  locale: Locale;
}) {
  const t = getDictionary(locale);
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 hover:underline"
      >
        <Terminal size={15} />
        {t.howToDeploy.trigger}
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
