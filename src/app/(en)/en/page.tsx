import { Hero } from "@/components/site/hero";
import { CategoryGrid } from "@/components/site/category-grid";
import { FeaturedTools } from "@/components/site/featured-tools";
import { ToolExplorer } from "@/components/site/tool-explorer";
import { allTools, tools } from "@/data/tools";
import { toToolCardData } from "@/lib/tool-card-data";

export default function EnglishHomePage() {
  const publishedToolCards = tools.map(toToolCardData);
  const allToolCards = allTools.map(toToolCardData);

  return (
    <>
      <Hero tools={publishedToolCards} locale="en" />
      <CategoryGrid locale="en" />
      <FeaturedTools locale="en" />
      <ToolExplorer tools={allToolCards} locale="en" />
    </>
  );
}
