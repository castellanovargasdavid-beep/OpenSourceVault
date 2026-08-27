/**
 * Precios de lista aproximados (por asiento/mes, en USD) de las SaaS más
 * buscadas. Son precios públicos orientativos a fecha de redacción — cada
 * proveedor los cambia con frecuencia, así que siempre enlazamos a su web
 * oficial para el precio exacto vigente.
 */
export interface SaasPricingEntry {
  saasName: string;
  pricePerSeatUsd: number;
  billingNote: string;
}

export const saasPricing: SaasPricingEntry[] = [
  { saasName: "Notion", pricePerSeatUsd: 10, billingNote: "Plan Business, facturado anual" },
  { saasName: "Slack", pricePerSeatUsd: 8.75, billingNote: "Plan Pro, facturado anual" },
  { saasName: "Airtable", pricePerSeatUsd: 20, billingNote: "Plan Team, facturado anual" },
  { saasName: "Salesforce", pricePerSeatUsd: 25, billingNote: "Plan Starter" },
  { saasName: "HubSpot", pricePerSeatUsd: 20, billingNote: "Plan Starter (Marketing/CRM)" },
  { saasName: "Zendesk", pricePerSeatUsd: 19, billingNote: "Plan Support Team, facturado anual" },
  { saasName: "Calendly", pricePerSeatUsd: 12, billingNote: "Plan Standard" },
  { saasName: "Intercom", pricePerSeatUsd: 39, billingNote: "Plan Essential" },
  { saasName: "1Password", pricePerSeatUsd: 7.99, billingNote: "Plan Business" },
  { saasName: "Jira", pricePerSeatUsd: 8.15, billingNote: "Plan Standard" },
  { saasName: "Trello", pricePerSeatUsd: 5, billingNote: "Plan Standard" },
  { saasName: "Asana", pricePerSeatUsd: 13.49, billingNote: "Plan Starter, facturado anual" },
];

export function getSaasPricing(name: string): SaasPricingEntry | undefined {
  return saasPricing.find((s) => s.saasName === name);
}
