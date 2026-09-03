"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Search,
  X,
  Trash2,
  Pencil,
  Plus,
  Copy,
  Check,
  Download,
  Share2,
  AlertTriangle,
  Cpu,
  DollarSign,
  Loader2,
  FolderInput,
} from "lucide-react";
import type { ToolCardData } from "@/lib/types";
import { getSaasPricing } from "@/data/saas-pricing";
import { formatMinRam } from "@/lib/tool-difficulty";
import { AddToStackButton } from "@/components/site/add-to-stack-button";
import { LogoImage } from "@/components/site/logo-image";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStackBuilder } from "@/lib/stack-builder-store";
import { getHostname, cn } from "@/lib/utils";
import { localeHref } from "@/lib/locale-href";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";

interface MergeResponse {
  yaml: string;
  warnings: string[];
  skippedTools: string[];
  notFound: string[];
  toolCount: number;
}

const formatUsd = (value: number, locale: Locale) =>
  new Intl.NumberFormat(locale === "en" ? "en-US" : "es-ES", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export function StackBuilderContent({ tools, locale = "es", t }: { tools: ToolCardData[]; locale?: Locale; t: Dictionary["stackBuilder"] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const builder = useStackBuilder();

  const toolsBySlug = React.useMemo(() => new Map(tools.map((tool) => [tool.slug, tool])), [tools]);

  const rawSharedSlugs = searchParams.get("tools");
  const sharedSlugs = React.useMemo(
    () => (rawSharedSlugs ? rawSharedSlugs.split(",").map((s) => s.trim()).filter(Boolean) : null),
    [rawSharedSlugs]
  );
  const [previewDismissed, setPreviewDismissed] = React.useState(false);
  const isPreviewingShared = Boolean(sharedSlugs && sharedSlugs.length > 0 && !previewDismissed);

  const displayedSlugs = isPreviewingShared ? sharedSlugs! : builder.activeStack.toolSlugs;
  const selectedTools = displayedSlugs.map((slug) => toolsBySlug.get(slug)).filter((x): x is ToolCardData => x !== undefined);

  const totalMinRamMb = selectedTools.reduce((sum, tool) => sum + tool.minRamMb, 0);
  const savings = { monthly: 0, matched: 0 };
  for (const tool of selectedTools) {
    const primary = tool.replaces[0];
    const pricing = primary ? getSaasPricing(primary) : undefined;
    if (pricing) {
      savings.monthly += pricing.pricePerSeatUsd;
      savings.matched++;
    }
  }

  const [search, setSearch] = React.useState("");
  const searchResults = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    return tools
      .filter((tool) => !builder.activeStack.toolSlugs.includes(tool.slug))
      .filter((tool) => tool.name.toLowerCase().includes(q) || tool.replaces.some((r) => r.toLowerCase().includes(q)))
      .slice(0, 8);
  }, [tools, search, builder.activeStack.toolSlugs]);

  const [merge, setMerge] = React.useState<MergeResponse | null>(null);
  const [mergeKey, setMergeKey] = React.useState<string | null>(null);
  const [mergeLoading, setMergeLoading] = React.useState(false);
  const [mergeError, setMergeError] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [shareCopied, setShareCopied] = React.useState(false);

  const displayedSlugsKey = displayedSlugs.join(",");
  const mergeStale = merge !== null && mergeKey !== displayedSlugsKey;

  async function handleGenerate() {
    setMergeLoading(true);
    setMergeError(false);
    try {
      const res = await fetch(`/api/stack-compose?tools=${encodeURIComponent(displayedSlugsKey)}`);
      if (!res.ok) throw new Error("bad_response");
      const data = (await res.json()) as MergeResponse;
      setMerge(data);
      setMergeKey(displayedSlugsKey);
    } catch {
      setMergeError(true);
    } finally {
      setMergeLoading(false);
    }
  }

  function handleDownload() {
    if (!merge?.yaml) return;
    const blob = new Blob([merge.yaml], { type: "text/yaml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "docker-compose.yml";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async function handleCopy() {
    if (!merge?.yaml) return;
    try {
      await navigator.clipboard.writeText(merge.yaml);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silencioso: el botón de descarga sigue funcionando como alternativa.
    }
  }

  async function handleShare() {
    const url = `${window.location.origin}${pathname}?tools=${encodeURIComponent(builder.activeStack.toolSlugs.join(","))}`;
    try {
      await navigator.clipboard.writeText(url);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    } catch {
      window.prompt(t.shareButton, url);
    }
  }

  function handleSaveShared() {
    if (!sharedSlugs) return;
    builder.replaceActiveStackTools(sharedSlugs);
    setPreviewDismissed(true);
    router.replace(pathname);
  }

  function handleDismissShared() {
    setPreviewDismissed(true);
    router.replace(pathname);
  }

  function handleNewProject() {
    const name = window.prompt(t.newProjectPrompt);
    if (name && name.trim()) builder.createStack(name.trim());
  }

  function handleRenameProject() {
    const name = window.prompt(t.renameProjectPrompt, builder.activeStack.name);
    if (name && name.trim()) builder.renameStack(builder.activeStack.id, name.trim());
  }

  function handleDeleteProject() {
    if (window.confirm(t.deleteProjectConfirm)) builder.deleteStack(builder.activeStack.id);
  }

  if (!builder.hydrated) {
    return <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8" />;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-8">
        <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
          {t.badge}
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{t.pageTitle}</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">{t.pageSubtitle}</p>
      </header>

      {isPreviewingShared ? (
        <div className="mb-8 rounded-xl border border-violet-200 bg-violet-50 p-6">
          <p className="flex items-center gap-2 font-semibold text-violet-900">
            <FolderInput size={18} /> {t.importBannerTitle}
          </p>
          <p className="mt-1.5 text-sm text-violet-800">{t.importBannerBody}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button onClick={handleSaveShared}>{t.importSaveButton}</Button>
            <Button variant="outline" onClick={handleDismissShared}>
              {t.viewCatalog}
            </Button>
          </div>
        </div>
      ) : (
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-slate-600">{t.projectLabel}:</span>
          {builder.stacks.map((stack) => (
            <button
              key={stack.id}
              onClick={() => builder.setActiveStackId(stack.id)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                stack.id === builder.activeStackId
                  ? "border-emerald-600 bg-emerald-600 text-white"
                  : "border-slate-300 bg-white text-slate-600 hover:border-emerald-400 hover:text-emerald-700"
              )}
            >
              {stack.name} ({stack.toolSlugs.length})
            </button>
          ))}
          <Button variant="ghost" size="sm" onClick={handleNewProject} className="gap-1">
            <Plus size={14} /> {t.newProjectButton}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleRenameProject} className="gap-1 text-slate-500">
            <Pencil size={13} /> {t.renameProjectButton}
          </Button>
          {builder.stacks.length > 1 && (
            <Button variant="ghost" size="sm" onClick={handleDeleteProject} className="gap-1 text-red-600 hover:text-red-700">
              <Trash2 size={13} /> {t.deleteProjectButton}
            </Button>
          )}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {!isPreviewingShared && (
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.searchPlaceholder} className="pl-9" />
              {search.trim() && (
                <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                  {searchResults.length > 0 ? (
                    <ul className="max-h-72 overflow-y-auto py-1.5">
                      {searchResults.map((tool) => (
                        <li key={tool.id} className="flex items-center justify-between gap-2 px-3 py-2 hover:bg-slate-50">
                          <span className="flex min-w-0 items-center gap-2">
                            <LogoImage domain={getHostname(tool.websiteUrl)} label={tool.name} size={24} fallbackGradient="from-slate-300 to-slate-400" />
                            <span className="truncate text-sm font-medium text-slate-900">{tool.name}</span>
                            <span className="shrink-0 text-xs text-slate-500">{formatMinRam(tool.minRamMb)}</span>
                          </span>
                          <AddToStackButton toolSlug={tool.slug} addLabel={t.addButton} addedLabel={t.addedButton} compact />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="px-3 py-3 text-sm text-slate-600">{t.searchNoResults}</p>
                  )}
                </div>
              )}
            </div>
          )}

          <div>
            <h2 className="mb-3 text-lg font-semibold text-slate-900">{t.selectedToolsTitle}</h2>
            {selectedTools.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 py-14 text-center">
                <p className="font-medium text-slate-900">{t.emptyStateTitle}</p>
                <p className="mt-1.5 text-sm text-slate-600">{t.emptyStateBody}</p>
              </div>
            ) : (
              <ul className="space-y-2">
                {selectedTools.map((tool) => (
                  <li
                    key={tool.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3"
                  >
                    <Link href={localeHref(`/tool/${tool.slug}`, locale)} className="flex min-w-0 items-center gap-3">
                      <LogoImage domain={getHostname(tool.websiteUrl)} label={tool.name} size={32} fallbackGradient="from-slate-300 to-slate-400" />
                      <span className="min-w-0">
                        <span className="block truncate font-medium text-slate-900 hover:text-emerald-700">{tool.name}</span>
                        <span className="text-xs text-slate-500">{formatMinRam(tool.minRamMb)} RAM</span>
                      </span>
                    </Link>
                    {!isPreviewingShared && (
                      <button
                        type="button"
                        aria-label={t.removeToolLabel}
                        title={t.removeToolLabel}
                        onClick={() => builder.removeTool(builder.activeStack.id, tool.slug)}
                        className="shrink-0 rounded-full p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {selectedTools.length > 0 && (
            <div className="rounded-xl border border-slate-200 p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-slate-900">{t.generateButton}</h2>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={handleGenerate} disabled={mergeLoading} className="gap-1.5">
                    {mergeLoading ? <Loader2 size={15} className="animate-spin" /> : null}
                    {mergeLoading ? t.generatingLabel : t.generateButton}
                  </Button>
                  {!isPreviewingShared && (
                    <Button variant="outline" onClick={handleShare} className="gap-1.5">
                      <Share2 size={15} />
                      {shareCopied ? t.shareCopied : t.shareButton}
                    </Button>
                  )}
                </div>
              </div>

              {mergeError && (
                <p className="mb-3 flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                  <AlertTriangle size={15} /> {t.generateError}
                </p>
              )}

              {merge && (
                <div className={cn("space-y-3", mergeStale && "opacity-60")}>
                  {merge.warnings.length > 0 && (
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
                      <p className="mb-1 font-semibold">{t.warningsTitle}</p>
                      <ul className="list-disc space-y-0.5 pl-4">
                        {merge.warnings.map((w) => (
                          <li key={w}>{w}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {merge.skippedTools.length > 0 && (
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
                      <p className="mb-1 font-semibold text-slate-700">{t.skippedTitle}</p>
                      <p>{merge.skippedTools.join(", ")}</p>
                    </div>
                  )}
                  <pre className="max-h-96 overflow-auto rounded-lg bg-slate-900 p-4 text-xs text-emerald-300">
                    <code>{merge.yaml}</code>
                  </pre>
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={handleDownload} className="gap-1.5">
                      <Download size={15} /> {t.downloadButton}
                    </Button>
                    <Button variant="outline" onClick={handleCopy} className="gap-1.5">
                      {copied ? <Check size={15} className="text-emerald-600" /> : <Copy size={15} />}
                      {copied ? t.copiedLabel : t.copyButton}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-slate-200 p-6">
            <p className="mb-4 text-sm font-semibold text-slate-900">{t.metricsTitle}</p>

            <div className="mb-4 flex items-start gap-2.5">
              <Cpu size={18} className="mt-0.5 shrink-0 text-slate-500" />
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-600">{t.ramLabel}</p>
                <p className="mt-0.5 text-xl font-bold text-slate-900">{formatMinRam(totalMinRamMb)}</p>
                <p className="mt-1 text-xs text-slate-500">{t.ramNote}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <DollarSign size={18} className="mt-0.5 shrink-0 text-emerald-600" />
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-600">{t.savingsLabel}</p>
                {savings.matched > 0 ? (
                  <>
                    <p className="mt-0.5 text-xl font-bold text-emerald-700">
                      {formatUsd(savings.monthly, locale)}
                      <span className="text-sm font-medium text-slate-500">{t.savingsPerMonth}</span>
                    </p>
                    <p className="mt-1 text-xs text-slate-500">{t.savingsNote}</p>
                  </>
                ) : (
                  <p className="mt-0.5 text-sm text-slate-500">{t.savingsUnavailable}</p>
                )}
              </div>
            </div>
          </div>

          <Link href={localeHref("/#explorador", locale)} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full")}>
            {t.viewCatalog}
          </Link>
        </aside>
      </div>
    </div>
  );
}
