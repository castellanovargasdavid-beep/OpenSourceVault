"use client";

import * as React from "react";
import { Check, Copy, Wand2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries/es";

function generateSecret(length = 32): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("").slice(0, length);
}

/** Reemplaza cada placeholder change-me* por un secreto aleatorio distinto (consistente si se repite). */
function randomizeSecrets(code: string): string {
  const generated = new Map<string, string>();
  return code.replace(/change-me[A-Za-z0-9-]*/g, (match) => {
    if (!generated.has(match)) {
      generated.set(match, generateSecret(32));
    }
    return generated.get(match)!;
  });
}

export function DockerComposeBlock({ code, t }: { code: string; t: Dictionary["dockerBlock"] }) {
  const [displayCode, setDisplayCode] = React.useState(code);
  const [copied, setCopied] = React.useState(false);
  const [copyError, setCopyError] = React.useState(false);
  const [randomized, setRandomized] = React.useState(false);
  const hasPlaceholders = /change-me/.test(code);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(displayCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // navigator.clipboard puede no estar disponible (http o permisos denegados)
      setCopyError(true);
      setTimeout(() => setCopyError(false), 2000);
    }
  }

  function handleRandomize() {
    setDisplayCode(randomizeSecrets(code));
    setRandomized(true);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-700/60 bg-slate-900 shadow-lg">
      <div className="h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500" />
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700/60 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          </span>
          <span className="text-xs font-medium text-slate-400">docker-compose.yml</span>
        </div>
        <div className="flex items-center gap-1">
          {hasPlaceholders && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRandomize}
              className="gap-1.5 text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              <Wand2 size={14} />
              {randomized ? t.regenerate : t.generate}
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className={cn(
              "gap-1.5 hover:bg-slate-800",
              copyError ? "text-red-400 hover:text-red-300" : "text-slate-300 hover:text-white"
            )}
          >
            {copyError ? (
              <AlertTriangle size={14} />
            ) : copied ? (
              <Check size={14} className="text-emerald-400" />
            ) : (
              <Copy size={14} />
            )}
            {copyError ? t.copyError : copied ? t.copied : t.copy}
          </Button>
        </div>
      </div>
      <pre className="max-h-[480px] overflow-auto p-4 text-xs leading-relaxed text-slate-200">
        <code>{displayCode}</code>
      </pre>
      {randomized && (
        <p className="border-t border-emerald-900/50 bg-emerald-950/40 px-4 py-2 text-xs text-emerald-300">
          {t.randomizedNote}
        </p>
      )}
    </div>
  );
}
