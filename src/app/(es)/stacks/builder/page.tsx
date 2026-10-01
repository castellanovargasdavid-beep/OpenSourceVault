import type { Metadata } from "next";
import { Suspense } from "react";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/i18n/get-dictionary";
import { tools } from "@/data/tools";
import { toToolCardData } from "@/lib/tool-card-data";
import { toStackToolProfile } from "@/lib/stack-resources";
import { StackBuilderContent } from "@/components/pages/stack-builder-content";

const t = getDictionary("es");

// `?tools=a,b,c` (stack compartido, ver handleShare en stack-builder-
// content.tsx) nunca debe competir en el índice con esta URL limpia. El
// canonical de abajo ya resuelve eso — fijo, sin leer `searchParams` — sin
// necesitar convertir esta página de estática a dinámica por request solo
// para añadir un `robots: noindex` explícito y redundante con el canonical.
// (Se consideró y se descartó — ver DATA_QUALITY_AUDIT.md — porque el coste
// en Core Web Vitals de perder el prerender estático no se justifica frente
// a una protección que el canonical ya da.)
export const metadata: Metadata = {
  title: t.stackBuilder.metaTitle,
  description: t.stackBuilder.metaDescription,
  alternates: {
    canonical: `${siteConfig.url}/stacks/builder`,
    languages: { es: `${siteConfig.url}/stacks/builder`, en: `${siteConfig.url}/en/stacks/builder`, "x-default": `${siteConfig.url}/stacks/builder` },
  },
};

export default function StackBuilderPage() {
  const toolCards = tools.map(toToolCardData);
  const profiles = Object.fromEntries(tools.map((tool) => [tool.slug, toStackToolProfile(tool)]));
  return (
    <Suspense>
      <StackBuilderContent
        tools={toolCards}
        profiles={profiles}
        locale="es"
        t={t.stackBuilder}
        hardwareT={t.hardwareFit}
        hostingTierT={t.hostingTier}
      />
    </Suspense>
  );
}
