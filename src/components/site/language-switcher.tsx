"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "/";
  const canonicalPath = pathname === "/en" || pathname === "/en/" ? "/" : pathname.replace(/^\/en(\/|$)/, "/");
  const esHref = canonicalPath;
  const enHref = canonicalPath === "/" ? "/en" : `/en${canonicalPath}`;

  return (
    <div className="flex items-center gap-1 rounded-lg border border-slate-200 p-0.5 text-xs font-medium">
      <Languages size={13} className="ml-1.5 text-slate-400" />
      <Link
        href={esHref}
        className={cn(
          "rounded-md px-2 py-1 transition-colors",
          locale === "es" ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-900"
        )}
      >
        ES
      </Link>
      <Link
        href={enHref}
        className={cn(
          "rounded-md px-2 py-1 transition-colors",
          locale === "en" ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-900"
        )}
      >
        EN
      </Link>
    </div>
  );
}
