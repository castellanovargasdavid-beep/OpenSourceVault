"use client";

import * as React from "react";
import { Rocket, Copy, Check, ExternalLink } from "lucide-react";
import { trackReplaceEvent, type AnalyticsPlacement } from "@/lib/analytics";
import type { Dictionary } from "@/i18n/dictionaries/es";

/**
 * Tarjeta reutilizable del comando `curl | bash` de 1-Command Deploy.
 * Funciona tanto para el stack completo del Stack Builder (varios slugs) como
 * para una única herramienta en su ficha (un solo slug) — /api/deploy ya
 * acepta ambos casos por igual.
 */
export function OneCommandDeployBlock({
  deployApiPath,
  commandPreview,
  placement,
  toolCount,
  t,
}: {
  /** Ruta relativa real, ej. "/api/deploy?stack=n8n&locale=es". */
  deployApiPath: string;
  /** Texto corto mostrado dentro del comando de ejemplo (slugs separados por coma). */
  commandPreview: string;
  placement: AnalyticsPlacement;
  /** Nº de herramientas que incluye este despliegue (1 en una ficha individual). */
  toolCount: number;
  t: Dictionary["stackBuilder"];
}) {
  const [copied, setCopied] = React.useState(false);

  async function handleCopy() {
    const url = `${window.location.origin}${deployApiPath}`;
    // Nunca un pipe directo a ciegas (curl | bash): se descarga primero,
    // se imprime en pantalla para que el usuario vea exactamente qué va a
    // ejecutar, y solo entonces se corre — mismo principio que ya aplican
    // Coolify/Dokploy en sus propios dockerCompose de este catálogo.
    const command = `curl -sSL "${url}" -o deploy.sh && cat deploy.sh && bash deploy.sh`;
    try {
      await navigator.clipboard.writeText(command);
      trackReplaceEvent({ name: "deploy_click", placement, toolCount });
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt(t.oneCommandCopyButton, command);
    }
  }

  return (
    <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50/40 p-6">
      <div className="mb-1 flex flex-wrap items-center gap-2">
        <h2 className="flex items-center gap-1.5 text-lg font-semibold text-slate-900">
          <Rocket size={18} className="text-emerald-600" />
          {t.oneCommandTitle}
        </h2>
        <span className="inline-flex items-center rounded-full bg-emerald-600 px-2 py-0.5 text-[11px] font-medium text-white">
          {t.oneCommandBadge}
        </span>
      </div>
      <p className="mb-4 text-sm text-slate-600">{t.oneCommandDesc}</p>

      <div className="flex items-center justify-between gap-2 rounded-lg border border-slate-700/60 bg-slate-900 px-3 py-2.5">
        <code className="flex-1 overflow-x-auto whitespace-pre text-xs text-emerald-300">
          {`curl -sSL ".../api/deploy?stack=${commandPreview}" -o deploy.sh && cat deploy.sh && bash deploy.sh`}
        </code>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={t.oneCommandCopyButton}
          className="shrink-0 rounded-md p-1.5 text-slate-300 hover:bg-slate-800"
        >
          {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
        </button>
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs text-slate-600">{copied ? t.oneCommandCopied : ""}</span>
        <a
          href={deployApiPath}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 hover:underline"
        >
          {t.viewScriptLink}
          <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}
