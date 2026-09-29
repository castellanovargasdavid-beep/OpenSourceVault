import type { Metadata, ResolvingMetadata } from "next";
import { inheritedSocialImages } from "@/lib/metadata";
import { allTools } from "@/data/tools";
import { toToolCardData } from "@/lib/tool-card-data";
import { catalogStats } from "@/lib/catalog-stats";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/i18n/get-dictionary";
import { ToolExplorer } from "@/components/site/tool-explorer";

export async function generateMetadata(_props: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const t = getDictionary("es");
  const published = catalogStats.totalTools;
  const comingSoon = catalogStats.totalNotYetPublished;
  const title = t.toolsCatalogPage.metaTitle(siteConfig.year);
  const description = t.toolsCatalogPage.metaDescription(published, comingSoon, catalogStats.totalInCatalogFile);
  const url = `${siteConfig.url}/herramientas`;
  const { openGraphImages, twitterImages } = await inheritedSocialImages(parent);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { es: url, en: `${siteConfig.url}/en/tools` },
    },
    openGraph: { title, description, url, images: openGraphImages },
    twitter: { card: "summary_large_image", title, description, images: twitterImages },
  };
}

export default function ToolsCatalogPage() {
  const t = getDictionary("es");
  const allToolCards = allTools.map(toToolCardData);

  return (
    <ToolExplorer
      tools={allToolCards}
      t={t.toolExplorer}
      toolCardT={t.toolCard}
      comingSoonBadge={t.comingSoon.badge}
      difficultyT={t.difficulty}
      stackBuilderT={t.stackBuilder}
    />
  );
}
