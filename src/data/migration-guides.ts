export interface MigrationGuide {
  path: string;
  title: string;
  /** Slug de la herramienta open source destino de la migración */
  toolSlug: string;
}

export const migrationGuides: MigrationGuide[] = [
  {
    path: "/guias/migrar-de-airtable-a-baserow",
    title: "Cómo migrar de Airtable a Baserow",
    toolSlug: "baserow",
  },
];

export function getMigrationGuidesForTool(toolSlug: string): MigrationGuide[] {
  return migrationGuides.filter((g) => g.toolSlug === toolSlug);
}
