import { Hero } from "@/components/site/hero";
import { CategoryGrid } from "@/components/site/category-grid";
import { FeaturedTools } from "@/components/site/featured-tools";
import { RecentlyAddedTools } from "@/components/site/recently-added-tools";
import { ToolExplorer } from "@/components/site/tool-explorer";
import { allTools } from "@/data/tools";
import { toToolCardData } from "@/lib/tool-card-data";
import { isPublished } from "@/lib/types";
import { getDictionary } from "@/i18n/get-dictionary";

export default function EnglishHomePage() {
  const t = getDictionary("en");
  // Ver el comentario equivalente en src/app/(es)/page.tsx: un único map()
  // reutilizado por referencia evita serializar las 150 tarjetas publicadas
  // dos veces en el flight payload.
  const allToolCards = allTools.map(toToolCardData);
  const publishedToolCards = allToolCards.filter(isPublished);

  return (
    <>
      <Hero tools={publishedToolCards} locale="en" />
      <CategoryGrid locale="en" />
      <FeaturedTools locale="en" />
      <RecentlyAddedTools locale="en" />
      <ToolExplorer
        tools={allToolCards}
        locale="en"
        t={t.toolExplorer}
        toolCardT={t.toolCard}
        comingSoonBadge={t.comingSoon.badge}
        difficultyT={t.difficulty}
        stackBuilderT={t.stackBuilder}
      />
    </>
  );
}
