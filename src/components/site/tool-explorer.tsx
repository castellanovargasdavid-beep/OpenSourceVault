"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { allTools } from "@/data/tools";
import { categories } from "@/data/categories";
import { categoriesEn } from "@/data/categories.en";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToolCard } from "@/components/site/tool-card";
import { cn } from "@/lib/utils";
import type { ToolTag } from "@/lib/types";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

export function ToolExplorer({ locale = "es" }: { locale?: Locale }) {
  const t = getDictionary(locale);
  const quickTags: { id: ToolTag; label: string }[] = [
    { id: "docker-ready", label: t.toolExplorer.tagDockerReady },
    { id: "1-click-deploy", label: t.toolExplorer.tagOneClick },
    { id: "permissive-license", label: t.toolExplorer.tagPermissive },
  ];

  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<string>("all");
  const [activeTags, setActiveTags] = React.useState<ToolTag[]>([]);

  function toggleTag(tag: ToolTag) {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  function clearFilters() {
    setQuery("");
    setCategory("all");
    setActiveTags([]);
  }

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return allTools.filter((tool) => {
      const matchesQuery =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.replaces.some((r) => r.toLowerCase().includes(q));
      const matchesCategory = category === "all" || tool.category === category;
      const matchesTags = activeTags.every((tag) => tool.tags.includes(tag));
      return matchesQuery && matchesCategory && matchesTags;
    });
  }, [query, category, activeTags]);

  const hasActiveFilters = query !== "" || category !== "all" || activeTags.length > 0;

  return (
    <section id="explorador" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{t.toolExplorer.title}</h2>
          <p className="mt-2 text-slate-600">{t.toolExplorer.subtitle}</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.toolExplorer.searchPlaceholder}
              className="pl-9"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label={t.toolExplorer.categoryFilterLabel}
            className="h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <option value="all">{t.toolExplorer.allCategories}</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {locale === "en" ? categoriesEn[c.id].label : c.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {quickTags.map((tag) => {
            const active = activeTags.includes(tag.id);
            return (
              <button
                key={tag.id}
                onClick={() => toggleTag(tag.id)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                  active
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : "border-slate-300 bg-white text-slate-600 hover:border-emerald-400 hover:text-emerald-700"
                )}
              >
                {tag.label}
              </button>
            );
          })}
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
              <X size={14} /> {t.toolExplorer.clearFilters}
            </Button>
          )}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tool) => (
            <ToolCard key={tool.id} tool={tool} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 py-16 text-center">
          <p className="text-slate-600">{t.toolExplorer.noResults}</p>
          <Button variant="link" onClick={clearFilters}>
            {t.toolExplorer.clearFilters}
          </Button>
        </div>
      )}
    </section>
  );
}
