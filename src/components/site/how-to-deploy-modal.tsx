"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X, Copy, Check, AlertTriangle, Rocket, ChevronDown } from "lucide-react";
import type { OneClickDeployTarget } from "@/lib/types";
import { extractDefaultPort, extractEnvPlaceholders, isComposeFile } from "@/lib/deploy-guide";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

type Tab = "vps" | "coolify" | "oneClick";

function CommandLine({ command, copyLabel }: { command: string; copyLabel: string }) {
  const [copied, setCopied] = React.useState(false);
  const [error, setError] = React.useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  }

  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border border-slate-700/60 bg-slate-900 px-3 py-2.5">
      <code className="flex-1 overflow-x-auto whitespace-pre text-xs text-emerald-300">{command}</code>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copyLabel}
        className={cn("shrink-0 rounded-md p-1.5 hover:bg-slate-800", error ? "text-red-400" : "text-slate-300")}
      >
        {error ? <AlertTriangle size={14} /> : copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
      </button>
    </div>
  );
}

function Step({
  number,
  title,
  desc,
  command,
  copyLabel,
}: {
  number: number;
  title: string;
  desc?: string;
  command?: string;
  copyLabel: string;
}) {
  return (
    <div className="flex gap-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-800">
        {number}
      </span>
      <div className="flex-1 space-y-2 pb-1">
        <p className="text-sm font-medium text-slate-900">{title}</p>
        {desc && <p className="text-sm text-slate-600">{desc}</p>}
        {command && <CommandLine command={command} copyLabel={copyLabel} />}
      </div>
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs text-amber-800">
      <AlertTriangle size={14} className="mt-0.5 shrink-0" />
      <span>{children}</span>
    </div>
  );
}

/**
 * Sección "Día 2" colapsable (backups, dominio+HTTPS...). Usa <details> nativo
 * — nada de useState — así el toggle no añade lógica extra a este chunk ya
 * perezoso.
 */
function CollapsibleSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group rounded-lg border border-slate-200 open:border-emerald-200 open:bg-emerald-50/30">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-3 py-2.5 text-sm font-medium text-slate-900 [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown size={16} className="shrink-0 text-slate-400 transition-transform group-open:rotate-180" />
      </summary>
      <div className="space-y-3 border-t border-slate-100 px-3 py-3">{children}</div>
    </details>
  );
}

function EnvVarsList({ envVars, label }: { envVars: string[]; label: string }) {
  if (envVars.length === 0) return null;
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-600">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {envVars.map((key) => (
          <code key={key} className="rounded border border-slate-200 bg-slate-100 px-1.5 py-0.5 text-[11px] text-slate-700">
            {key}
          </code>
        ))}
      </div>
    </div>
  );
}

/**
 * El modal completo (tabs, pasos, callouts) — deliberadamente en su propio
 * módulo y cargado solo vía next/dynamic desde HowToDeployGuide, para que
 * su JS no entre en el bundle inicial de cada ficha de herramienta y solo
 * se descargue cuando el usuario pulsa el botón "¿Cómo funciona esto?".
 *
 * t.howToDeploy incluye funciones de interpolación (title, firewallCallout...),
 * que React no puede serializar como prop de un Server Component a un Client
 * Component — por eso el diccionario se resuelve aquí dentro (con locale)
 * en vez de recibirse ya resuelto. Como este módulo solo se descarga tras el
 * clic, el coste de es.ts+en.ts completos queda confinado a ese chunk
 * perezoso y nunca entra en el bundle inicial de la página.
 */
export function HowToDeployModal({
  toolName,
  toolSlug,
  dockerCompose,
  oneClickDeploy,
  locale,
  onClose,
}: {
  toolName: string;
  toolSlug: string;
  dockerCompose: string;
  oneClickDeploy?: OneClickDeployTarget[];
  locale: Locale;
  onClose: () => void;
}) {
  const dict = getDictionary(locale);
  const t = dict.howToDeploy;
  const copyLabel = dict.dockerBlock.copy;
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const [tab, setTab] = React.useState<Tab>("vps");

  const port = React.useMemo(() => extractDefaultPort(dockerCompose), [dockerCompose]);
  const envVars = React.useMemo(() => extractEnvPlaceholders(dockerCompose), [dockerCompose]);
  const composeFile = React.useMemo(() => isComposeFile(dockerCompose), [dockerCompose]);

  React.useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const tabs: { id: Tab; label: string }[] = [
    { id: "vps", label: t.tabVps },
    { id: "coolify", label: t.tabCoolify },
    { id: "oneClick", label: t.tabOneClick },
  ];

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4"
      style={{ backgroundColor: "rgba(15, 23, 42, 0.5)" }}
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="how-to-deploy-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-2xl border border-slate-200 bg-white shadow-2xl outline-none sm:max-w-2xl sm:rounded-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4">
          <div>
            <h2 id="how-to-deploy-title" className="text-lg font-semibold text-slate-900">
              {t.title(toolName)}
            </h2>
            <p className="mt-0.5 text-sm text-slate-600">{t.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.close}
            className="shrink-0 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex gap-1 overflow-x-auto border-b border-slate-100 px-3 pt-2">
          {tabs.map((tabItem) => (
            <button
              key={tabItem.id}
              type="button"
              onClick={() => setTab(tabItem.id)}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-t-lg px-3 py-2 text-sm font-medium transition-colors",
                tab === tabItem.id ? "border-b-2 border-emerald-600 text-emerald-700" : "text-slate-500 hover:text-slate-700"
              )}
            >
              {tabItem.label}
            </button>
          ))}
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
          {tab === "vps" && (
            <>
              <Step number={1} title={t.vps.step1Title} command={t.vps.step1Command} copyLabel={copyLabel} />
              {composeFile ? (
                <Step
                  number={2}
                  title={t.vps.step2TitleCompose(toolName)}
                  desc={t.vps.step2DescCompose}
                  command={t.vps.step2CommandCompose(toolSlug)}
                  copyLabel={copyLabel}
                />
              ) : (
                <Step number={2} title={t.vps.step2TitleScript} desc={t.vps.step2DescScript} copyLabel={copyLabel} />
              )}
              {composeFile && <Step number={3} title={t.vps.step3Title} command={t.vps.step3Command} copyLabel={copyLabel} />}
              <Step
                number={composeFile ? 4 : 3}
                title={t.vps.step4Title}
                command={composeFile ? t.vps.step4Command : t.vps.step4CommandGeneric}
                copyLabel={copyLabel}
              />
              <Callout>{t.firewallCallout(port)}</Callout>
              {envVars.length > 0 && <Callout>{t.secretsCallout}</Callout>}

              {composeFile && (
                <CollapsibleSection title={t.backups.title}>
                  <p className="text-sm text-slate-600">{t.backups.intro}</p>
                  <Step number={1} title={t.backups.step1Title} command={t.backups.step1Command} copyLabel={copyLabel} />
                  <Step
                    number={2}
                    title={t.backups.step2Title}
                    desc={t.backups.step2Desc}
                    command={t.backups.step2Command}
                    copyLabel={copyLabel}
                  />
                  <Step number={3} title={t.backups.step3Title} command={t.backups.step3Command} copyLabel={copyLabel} />
                </CollapsibleSection>
              )}

              <CollapsibleSection title={t.domain.title}>
                <div>
                  <p className="text-sm font-medium text-slate-900">{t.domain.step1Title}</p>
                  <p className="mt-1 text-sm text-slate-600">{t.domain.step1Desc}</p>
                  <dl className="mt-2 grid grid-cols-3 gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs">
                    <dt className="font-semibold text-slate-600">{t.domain.dnsType}</dt>
                    <dd className="col-span-2 font-mono text-slate-900">{t.domain.dnsTypeValue}</dd>
                    <dt className="font-semibold text-slate-600">{t.domain.dnsHost}</dt>
                    <dd className="col-span-2 text-slate-900">{t.domain.dnsHostHint}</dd>
                    <dt className="font-semibold text-slate-600">{t.domain.dnsValue}</dt>
                    <dd className="col-span-2 text-slate-900">{t.domain.dnsValueHint}</dd>
                  </dl>
                  <p className="mt-2 text-xs text-slate-600">{t.domain.dnsPropagationNote}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{t.domain.step2Title}</p>
                  <p className="mt-1 text-sm text-slate-600">{t.domain.step2Desc}</p>
                  <p className="mt-2 text-xs text-slate-600">{t.domain.caddyfileLabel}</p>
                  <CommandLine command={t.domain.caddyfile(port)} copyLabel={copyLabel} />
                  <p className="mt-2 text-xs text-slate-600">{t.domain.runCommandLabel}</p>
                  <CommandLine command={t.domain.runCommand} copyLabel={copyLabel} />
                </div>
              </CollapsibleSection>
            </>
          )}

          {tab === "coolify" && (
            <>
              <Step number={1} title={t.coolify.step1Title} desc={t.coolify.step1Desc} copyLabel={copyLabel} />
              <Step number={2} title={t.coolify.step2Title} desc={t.coolify.step2Desc} copyLabel={copyLabel} />
              <Step number={3} title={t.coolify.step3Title} desc={t.coolify.step3Desc} copyLabel={copyLabel} />
              <EnvVarsList envVars={envVars} label={t.envVarsLabel} />
              {envVars.length > 0 && <Callout>{t.secretsCallout}</Callout>}
            </>
          )}

          {tab === "oneClick" &&
            (oneClickDeploy && oneClickDeploy.length > 0 ? (
              <>
                {oneClickDeploy.map((target) => (
                  <div key={target.platform} className="space-y-3 rounded-xl border border-slate-100 p-4">
                    <p className="flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                      <Rocket size={14} className="text-violet-600" />
                      {target.platform}
                    </p>
                    <Step number={1} title={t.oneClick.step1Title(target.platform)} desc={t.oneClick.step1Desc} copyLabel={copyLabel} />
                    <Step number={2} title={t.oneClick.step2Title} desc={t.oneClick.step2Desc} copyLabel={copyLabel} />
                    <Step number={3} title={t.oneClick.step3Title} desc={t.oneClick.step3Desc} copyLabel={copyLabel} />
                  </div>
                ))}
                <EnvVarsList envVars={envVars} label={t.envVarsLabel} />
              </>
            ) : (
              <Callout>{t.oneClick.noTemplate(toolName)}</Callout>
            ))}
        </div>
      </div>
    </div>,
    document.body
  );
}
