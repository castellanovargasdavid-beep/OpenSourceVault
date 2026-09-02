import Link from "next/link";
import { Layers } from "lucide-react";
import { stacks } from "@/data/stacks";
import { StackCard } from "@/components/site/stack-card";
import { getDictionary } from "@/i18n/get-dictionary";
import { localeHref } from "@/lib/locale-href";
import type { Locale } from "@/i18n/config";

export function StacksPageContent({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-slate-600">
        <Link href={localeHref("/", locale)} className="hover:text-emerald-700">
          {t.breadcrumb.home}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">{t.stacksPage.badge}</span>
      </nav>

      <header className="mb-10 max-w-2xl">
        <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
          <Layers size={13} />
          {t.stacksPage.badge}
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{t.stacksPage.title}</h1>
        <p className="mt-4 text-lg text-slate-600">{t.stacksPage.subtitle}</p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stacks.map((stack) => (
          <StackCard key={stack.slug} stack={stack} locale={locale} />
        ))}
      </div>
    </div>
  );
}
