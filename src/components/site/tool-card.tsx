import Link from "next/link";
import { Star, GitFork } from "lucide-react";
import type { OpenSourceTool } from "@/lib/types";
import { getCategoryMeta } from "@/data/categories";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatStars } from "@/lib/utils";

const tagLabels: Record<string, string> = {
  "docker-ready": "Docker Ready",
  "1-click-deploy": "1-Click Deploy",
  "permissive-license": "Licencia Permisiva",
};

export function ToolCard({ tool }: { tool: OpenSourceTool }) {
  const category = getCategoryMeta(tool.category);

  return (
    <Card className="flex h-full flex-col transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link href={`/tool/${tool.slug}`} className="font-semibold text-slate-900 hover:text-emerald-700">
              {tool.name}
            </Link>
            <p className="mt-0.5 text-xs text-slate-500">
              Alternativa a {tool.replaces.join(", ")}
            </p>
          </div>
          <Badge variant="outline">{category.label}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4 pt-0">
        <p className="text-sm text-slate-600">{tool.shortDescription}</p>

        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            <GitFork size={14} /> {tool.license}
          </span>
          {tool.starsCount && (
            <span className="inline-flex items-center gap-1">
              <Star size={14} className="text-amber-500" /> {formatStars(tool.starsCount)}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {tool.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tagLabels[tag] ?? tag}
            </Badge>
          ))}
        </div>

        <Link
          href={`/tool/${tool.slug}`}
          className="mt-auto inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
        >
          Ver ficha y guía de despliegue
        </Link>
      </CardContent>
    </Card>
  );
}
