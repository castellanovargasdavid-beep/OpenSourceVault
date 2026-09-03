/**
 * Precios de lista aproximados (en USD) de las SaaS más buscadas. Son
 * precios públicos orientativos a fecha de redacción — cada proveedor los
 * cambia con frecuencia, así que siempre enlazamos a su web oficial para el
 * precio exacto vigente.
 */
export interface SaasPricingEntry {
  saasName: string;
  pricePerSeatUsd: number;
  billingNote: string;
  /**
   * 'perSeat': el precio se multiplica por el tamaño del equipo (Notion,
   * Slack, Airtable...). 'flat': precio de plan único independiente de
   * cuánta gente lo use (Zapier, Mailchimp, Typeform...) — no se multiplica.
   */
  pricingModel: "perSeat" | "flat";
}

export const saasPricing: SaasPricingEntry[] = [
  { saasName: "Notion", pricePerSeatUsd: 10, billingNote: "Plan Business, facturado anual", pricingModel: "perSeat" },
  { saasName: "Slack", pricePerSeatUsd: 8.75, billingNote: "Plan Pro, facturado anual", pricingModel: "perSeat" },
  { saasName: "Airtable", pricePerSeatUsd: 20, billingNote: "Plan Team, facturado anual", pricingModel: "perSeat" },
  { saasName: "Salesforce", pricePerSeatUsd: 25, billingNote: "Plan Starter", pricingModel: "perSeat" },
  { saasName: "HubSpot", pricePerSeatUsd: 20, billingNote: "Plan Starter (Marketing/CRM)", pricingModel: "perSeat" },
  { saasName: "Zendesk", pricePerSeatUsd: 19, billingNote: "Plan Support Team, facturado anual", pricingModel: "perSeat" },
  { saasName: "Calendly", pricePerSeatUsd: 12, billingNote: "Plan Standard", pricingModel: "perSeat" },
  { saasName: "Intercom", pricePerSeatUsd: 39, billingNote: "Plan Essential", pricingModel: "perSeat" },
  { saasName: "1Password", pricePerSeatUsd: 7.99, billingNote: "Plan Business", pricingModel: "perSeat" },
  { saasName: "Jira", pricePerSeatUsd: 8.15, billingNote: "Plan Standard", pricingModel: "perSeat" },
  { saasName: "Trello", pricePerSeatUsd: 5, billingNote: "Plan Standard", pricingModel: "perSeat" },
  { saasName: "Asana", pricePerSeatUsd: 13.49, billingNote: "Plan Starter, facturado anual", pricingModel: "perSeat" },
  { saasName: "Zapier", pricePerSeatUsd: 19.99, billingNote: "Plan Starter, facturado anual (precio de la cuenta, no por asiento)", pricingModel: "flat" },
  { saasName: "Mailchimp", pricePerSeatUsd: 13, billingNote: "Plan Essentials, desde (sube con el tamaño de tu lista)", pricingModel: "flat" },
  { saasName: "Dropbox", pricePerSeatUsd: 15, billingNote: "Plan Standard, por usuario, facturado anual", pricingModel: "perSeat" },
  { saasName: "Google Drive", pricePerSeatUsd: 7.2, billingNote: "Google Workspace Business Starter, por usuario", pricingModel: "perSeat" },
  { saasName: "Typeform", pricePerSeatUsd: 29, billingNote: "Plan Basic (precio de la cuenta, no por asiento)", pricingModel: "flat" },
];

export function getSaasPricing(name: string): SaasPricingEntry | undefined {
  return saasPricing.find((s) => s.saasName === name);
}

const billingNoteEn: Record<string, string> = {
  Notion: "Business plan, billed annually",
  Slack: "Pro plan, billed annually",
  Airtable: "Team plan, billed annually",
  Salesforce: "Starter plan",
  HubSpot: "Starter plan (Marketing/CRM)",
  Zendesk: "Support Team plan, billed annually",
  Calendly: "Standard plan",
  Intercom: "Essential plan",
  "1Password": "Business plan",
  Jira: "Standard plan",
  Trello: "Standard plan",
  Asana: "Starter plan, billed annually",
  Zapier: "Starter plan, billed annually (account price, not per seat)",
  Mailchimp: "Essentials plan, starting from (scales with your list size)",
  Dropbox: "Standard plan, per user, billed annually",
  "Google Drive": "Google Workspace Business Starter, per user",
  Typeform: "Basic plan (account price, not per seat)",
};

export function getSaasPricingLocalized(name: string, locale: "es" | "en"): SaasPricingEntry | undefined {
  const entry = getSaasPricing(name);
  if (!entry) return entry;
  if (locale === "en" && billingNoteEn[name]) {
    return { ...entry, billingNote: billingNoteEn[name] };
  }
  return entry;
}
