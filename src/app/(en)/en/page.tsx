import { Hero } from "@/components/site/hero";
import { CategoryGrid } from "@/components/site/category-grid";
import { FeaturedTools } from "@/components/site/featured-tools";
import { RecentlyAddedTools } from "@/components/site/recently-added-tools";
import { ToolExplorer } from "@/components/site/tool-explorer";
import { allTools, tools } from "@/data/tools";
import { toToolCardData } from "@/lib/tool-card-data";
import { getDictionary } from "@/i18n/get-dictionary";

export default function EnglishHomePage() {
  const t = getDictionary("en");
  const publishedToolCards = tools.map(toToolCardData);
  const allToolCards = allTools.map(toToolCardData);

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
