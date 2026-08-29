import { Hero } from "@/components/site/hero";
import { CategoryGrid } from "@/components/site/category-grid";
import { FeaturedTools } from "@/components/site/featured-tools";
import { ToolExplorer } from "@/components/site/tool-explorer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <FeaturedTools />
      <ToolExplorer />
    </>
  );
}
