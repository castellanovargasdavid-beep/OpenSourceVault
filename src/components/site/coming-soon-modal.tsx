"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X, ThumbsUp, Mail, Check } from "lucide-react";
import type { OpenSourceTool } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

async function postInterest(payload: { slug: string; kind: "vote" | "email"; email?: string }) {
  try {
    await fetch("/api/tool-interest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    // La UI ya muestra confirmación optimista; un fallo de red aquí no debe romper la experiencia.
  }
}

export function ComingSoonModal({
  tool,
  locale,
  onClose,
}: {
  tool: OpenSourceTool;
  locale: Locale;
  onClose: () => void;
}) {
  const t = getDictionary(locale);
  const storageKey = `altfreestack:voted:${tool.slug}`;
  // Lectura perezosa de localStorage: este componente solo se monta en el
  // cliente (ToolCard lo renderiza tras un clic), así que no hay riesgo de
  // desajuste de hidratación al leerlo directamente en el inicializador.
  const [voted, setVoted] = React.useState(() => {
    try {
      return localStorage.getItem(storageKey) === "1";
    } catch {
      return false;
    }
  });
  const [email, setEmail] = React.useState("");
  const [emailSent, setEmailSent] = React.useState(false);
  const dialogRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    dialogRef.current?.focus();
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  function handleVote() {
    if (voted) return;
    setVoted(true);
    try {
      localStorage.setItem(storageKey, "1");
    } catch {
      // Sin localStorage seguimos registrando el voto en el servidor igualmente.
    }
    void postInterest({ slug: tool.slug, kind: "vote" });
  }

  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@") || emailSent) return;
    setEmailSent(true);
    void postInterest({ slug: tool.slug, kind: "email", email });
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(15, 23, 42, 0.5)" }}
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl outline-none"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold text-slate-900">{t.comingSoon.modalTitle(tool.name)}</h2>
          <button
            onClick={onClose}
            aria-label={t.comingSoon.close}
            className="shrink-0 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>

        <p className="mb-5 text-sm text-slate-600">{t.comingSoon.modalBody}</p>

        <Button
          onClick={handleVote}
          disabled={voted}
          className="w-full justify-center gap-2"
          variant={voted ? "secondary" : "default"}
        >
          {voted ? <Check size={16} /> : <ThumbsUp size={16} />}
          {voted ? t.comingSoon.voteButtonDone : t.comingSoon.voteButton}
        </Button>

        <div className="my-4 flex items-center gap-3 text-xs uppercase tracking-wide text-slate-600">
          <span className="h-px flex-1 bg-slate-200" />
          {t.comingSoon.orDivider}
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        {emailSent ? (
          <p className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2.5 text-sm text-emerald-700">
            <Check size={16} /> {t.comingSoon.emailButtonDone}
          </p>
        ) : (
          <form onSubmit={handleEmailSubmit} className="flex flex-col gap-2">
            <label htmlFor={`interest-email-${tool.slug}`} className="text-sm font-medium text-slate-700">
              {t.comingSoon.emailLabel}
            </label>
            <div className="flex gap-2">
              <Input
                id={`interest-email-${tool.slug}`}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.comingSoon.emailPlaceholder}
                className="flex-1"
              />
              <Button type="submit" className="gap-1.5 shrink-0">
                <Mail size={15} />
                {t.comingSoon.emailButton}
              </Button>
            </div>
          </form>
        )}

        <p className="mt-4 text-xs text-slate-600">{t.comingSoon.disclaimer}</p>
      </div>
    </div>,
    document.body
  );
}
