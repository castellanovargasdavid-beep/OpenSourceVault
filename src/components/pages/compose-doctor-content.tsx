"use client";

import * as React from "react";
import { AlertCircle, AlertTriangle, Info, Wand2, Copy, Check, Download, FileWarning, FlaskConical } from "lucide-react";
import { detectInputKind, analyzeComposeYaml, analyzeErrorMessage, autoFixComposeYaml, type DoctorSeverity } from "@/lib/compose-doctor";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";

const SEVERITY_STYLE: Record<DoctorSeverity, { box: string; icon: React.ComponentType<{ size?: number; className?: string }> }> = {
  error: { box: "border-rose-200 bg-rose-50 text-rose-800", icon: AlertCircle },
  warning: { box: "border-amber-200 bg-amber-50 text-amber-800", icon: AlertTriangle },
  info: { box: "border-slate-200 bg-slate-50 text-slate-700", icon: Info },
};

/**
 * Compose realista y deliberadamente inválido, para que "Probar con un
 * ejemplo" muestre las 3 severidades reales que ya soporta el analizador,
 * sin inventar ninguna nueva: SECRET_KEY sin cambiar (error — nombre de
 * clave reconocido como secreto), puerto 8080 repetido en dos servicios
 * (error — colisión), ADMIN_EMAIL con el placeholder "your-..." sin
 * rellenar (warning) y "version:" obsoleta (info). YAML/Docker Compose no
 * necesita traducción — mismo fixture en ES y EN.
 */
const EXAMPLE_COMPOSE = `version: "3.8"
services:
  webapp:
    image: myapp/webapp:latest
    ports:
      - "8080:3000"
    environment:
      SECRET_KEY: change-me
      ADMIN_EMAIL: your-email@example.com
    depends_on:
      - db
  db:
    image: postgres:16
    ports:
      - "8080:5432"
    volumes:
      - db_data:/var/lib/postgresql/data
volumes:
  db_data:
`;

export function ComposeDoctorContent({ locale = "es", t }: { locale?: Locale; t: Dictionary["composeDoctor"] }) {
  const [input, setInput] = React.useState("");
  const [fixApplied, setFixApplied] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [fixedCopied, setFixedCopied] = React.useState(false);

  const trimmed = input.trim();
  const kind = trimmed ? detectInputKind(input) : null;
  const findings = !trimmed ? [] : kind === "yaml" ? analyzeComposeYaml(input, locale) : analyzeErrorMessage(input, locale);
  const fix = kind === "yaml" && trimmed ? autoFixComposeYaml(input, locale) : null;

  function handleTryExample() {
    setInput(EXAMPLE_COMPOSE);
    setFixApplied(false);
  }

  async function handleCopyInput() {
    try {
      await navigator.clipboard.writeText(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silencioso: el archivo sigue visible en el textarea.
    }
  }

  async function handleCopyFixed() {
    if (!fix) return;
    try {
      await navigator.clipboard.writeText(fix.fixedYaml);
      setFixedCopied(true);
      setTimeout(() => setFixedCopied(false), 2000);
    } catch {
      // silencioso: el botón de descarga sigue funcionando como alternativa.
    }
  }

  function handleDownloadFixed() {
    if (!fix) return;
    const blob = new Blob([fix.fixedYaml], { type: "text/yaml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "docker-compose.yml";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <div>
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setFixApplied(false);
          }}
          placeholder={t.placeholder}
          aria-label={t.placeholder}
          rows={14}
          spellCheck={false}
          className="w-full rounded-xl border border-slate-300 bg-slate-950 p-4 font-mono text-xs leading-relaxed text-emerald-300 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
        {trimmed && (
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
              {kind === "yaml" ? t.detectedYaml : t.detectedError}
            </span>
            <Button variant="ghost" size="sm" onClick={handleCopyInput} className="gap-1.5 text-slate-500">
              {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              {copied ? t.copiedLabel : t.copyButton}
            </Button>
          </div>
        )}
      </div>

      {!trimmed ? (
        <div className="space-y-3 rounded-xl border border-dashed border-slate-300 px-4 py-6 text-center">
          <p className="flex items-center justify-center gap-2 text-sm text-slate-500">
            <FileWarning size={16} className="shrink-0" />
            {t.emptyState}
          </p>
          <Button variant="outline" size="sm" onClick={handleTryExample} className="gap-1.5">
            <FlaskConical size={14} /> {t.tryExampleButton}
          </Button>
        </div>
      ) : (
        <div className="space-y-3" aria-live="polite">
          <h2 className="text-lg font-semibold text-slate-900">{t.findingsTitle}</h2>
          {input === EXAMPLE_COMPOSE && <p className="text-xs text-slate-500">{t.exampleLoadedLabel}</p>}
          {findings.map((finding, i) => {
            const style = SEVERITY_STYLE[finding.severity];
            const Icon = style.icon;
            return (
              <div key={i} className={cn("flex items-start gap-2.5 rounded-lg border px-4 py-3 text-sm", style.box)}>
                <Icon size={16} className="mt-0.5 shrink-0" />
                <p>{finding.message}</p>
              </div>
            );
          })}
        </div>
      )}

      {kind === "yaml" && fix && (
        <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50/40 p-6">
          {!fixApplied ? (
            <Button onClick={() => setFixApplied(true)} className="gap-1.5">
              <Wand2 size={15} /> {t.fixButton}
            </Button>
          ) : (
            <div className="space-y-3">
              <p className="flex items-center gap-1.5 font-semibold text-slate-900">
                <Wand2 size={16} className="text-emerald-600" /> {t.fixedTitle}
              </p>
              <div className="rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-700">
                <p className="mb-1 font-semibold text-slate-800">{t.changesTitle}</p>
                {fix.changes.length > 0 ? (
                  <ul className="list-disc space-y-0.5 pl-4">
                    {fix.changes.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{t.noChanges}</p>
                )}
              </div>
              <pre className="max-h-96 overflow-auto rounded-lg bg-slate-900 p-4 text-xs text-emerald-300">
                <code>{fix.fixedYaml}</code>
              </pre>
              <div className="flex flex-wrap gap-2">
                <Button onClick={handleDownloadFixed} className="gap-1.5">
                  <Download size={15} /> {t.downloadButton}
                </Button>
                <Button variant="outline" onClick={handleCopyFixed} className="gap-1.5">
                  {fixedCopied ? <Check size={15} className="text-emerald-600" /> : <Copy size={15} />}
                  {fixedCopied ? t.copiedLabel : t.copyButton}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {kind === "error-message" && trimmed && <p className="text-sm text-slate-500">{t.switchToYamlHint}</p>}
    </div>
  );
}
