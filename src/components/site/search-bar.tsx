"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { tools } from "@/data/tools";
import { getCategoryMetaLocalized } from "@/data/categories";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/i18n/get-dictionary";
import { localeHref } from "@/lib/locale-href";
import type { Locale } from "@/i18n/config";

interface Match {
  slug: string;
  name: string;
  matchedReplaces?: string;
  categoryLabel: string;
}

function findMatches(query: string, locale: Locale): Match[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: Match[] = [];

  for (const tool of tools) {
    const nameMatch = tool.name.toLowerCase().includes(q);
    const replacesMatch = tool.replaces.find((r) => r.toLowerCase().includes(q));

    if (nameMatch || replacesMatch) {
      results.push({
        slug: tool.slug,
        name: tool.name,
        matchedReplaces: !nameMatch ? replacesMatch : undefined,
        categoryLabel: getCategoryMetaLocalized(tool.category, locale).label,
      });
    }

    if (results.length >= 7) break;
  }

  return results;
}

export function SearchBar({ className, locale = "es" }: { className?: string; locale?: Locale }) {
  const t = getDictionary(locale);
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const matches = React.useMemo(() => findMatches(query, locale), [query, locale]);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function goToTool(slug: string) {
    setOpen(false);
    router.push(localeHref(`/tool/${slug}`, locale));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (matches[0]) {
      goToTool(matches[0].slug);
    }
  }

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder={t.searchBar.placeholder}
            className="h-14 rounded-xl pl-12 pr-32 text-base shadow-lg"
            aria-label={t.searchBar.ariaLabel}
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 inline-flex h-10 -translate-y-1/2 items-center gap-1.5 rounded-lg bg-emerald-700 px-4 text-sm font-medium text-white transition-colors hover:bg-emerald-600"
          >
            {t.searchBar.button}
            <ArrowRight size={16} />
          </button>
        </div>
      </form>

      {open && query.trim() && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
          {matches.length > 0 ? (
            <ul className="max-h-80 overflow-y-auto py-2">
              {matches.map((match) => (
                <li key={match.slug}>
                  <button
                    onClick={() => goToTool(match.slug)}
                    className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm hover:bg-slate-50"
                  >
                    <span>
                      <span className="font-medium text-slate-900">{match.name}</span>
                      {match.matchedReplaces && (
                        <span className="text-slate-600"> · {t.searchBar.alternativeTo} {match.matchedReplaces}</span>
                      )}
                    </span>
                    <span className="shrink-0 text-xs text-slate-400">{match.categoryLabel}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-3 text-sm text-slate-600">{t.searchBar.noMatches}</p>
          )}
        </div>
      )}
    </div>
  );
}
