"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DockerComposeBlock({ code }: { code: string }) {
  const [copied, setCopied] = React.useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // navigator.clipboard puede no estar disponible (http o permisos denegados)
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-700/60 bg-slate-900 shadow-lg">
      <div className="h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500" />
      <div className="flex items-center justify-between border-b border-slate-700/60 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          </span>
          <span className="text-xs font-medium text-slate-400">docker-compose.yml</span>
        </div>
        <Button variant="ghost" size="sm" onClick={handleCopy} className="gap-1.5 text-slate-300 hover:bg-slate-800 hover:text-white">
          {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          {copied ? "Copiado" : "Copiar"}
        </Button>
      </div>
      <pre className="max-h-[480px] overflow-auto p-4 text-xs leading-relaxed text-slate-200">
        <code>{code}</code>
      </pre>
    </div>
  );
}
