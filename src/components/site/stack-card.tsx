import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import type { Stack } from "@/lib/types";
import { getLocalizedStack } from "@/data/stacks";
import { getToolById } from "@/data/tools";
import { Badge } from "@/components/ui/badge";
import { LogoImage } from "@/components/site/logo-image";
import { stackIconMap } from "@/lib/stack-icons";
import { getHostname } from "@/lib/utils";
import { getDictionary } from "@/i18n/get-dictionary";
import { localeHref } from "@/lib/locale-href";
import type { Locale } from "@/i18n/config";

export function StackCard({ stack: rawStack, locale = "es" }: { stack: Stack; locale?: Locale }) {
  const stack = getLocalizedStack(rawStack, locale);
  const t = getDictionary(locale);
  const Icon = stackIconMap[stack.icon];
  const tools = stack.tools.map((id) => getToolById(id)).filter((tool): tool is NonNullable<typeof tool> => Boolean(tool));

  return (
    <Link
      href={localeHref(`/stacks/${stack.slug}`, locale)}
      className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg"
    >
      <div className="mb-4 flex items-start justify-between gap-2">
        <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white ${stack.gradient}`}>
          <Icon size={20} />
        </span>
        <Badge variant="secondary">{stack.categoryTag}</Badge>
      </div>

      <h3 className="text-lg font-semibold leading-snug text-slate-900 group-hover:text-emerald-700">{stack.title}</h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm text-slate-600">{stack.description}</p>

      <p className="mt-4 inline-flex items-start gap-1.5 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800">
        <Sparkles size={14} className="mt-0.5 shrink-0" />
        {stack.estimatedSavings}
      </p>

      <div className="mt-4 flex items-center gap-2">
        <span className="flex -space-x-2">
          {tools.slice(0, 5).map((tool) => (
            <LogoImage
              key={tool.id}
              domain={getHostname(tool.websiteUrl)}
              label={tool.name}
              size={28}
              className="ring-2 ring-white"
              fallbackGradient="from-slate-300 to-slate-400"
            />
          ))}
        </span>
        {tools.length > 5 && <span className="text-xs font-medium text-slate-500">+{tools.length - 5}</span>}
      </div>

      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700">
        {t.stacksPage.exploreStack}
        <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
