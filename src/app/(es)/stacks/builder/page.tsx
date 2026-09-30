import type { Metadata } from "next";
import { Suspense } from "react";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/i18n/get-dictionary";
import { tools } from "@/data/tools";
import { toToolCardData } from "@/lib/tool-card-data";
import { toStackToolProfile } from "@/lib/stack-resources";
import { StackBuilderContent } from "@/components/pages/stack-builder-content";

const t = getDictionary("es");

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
