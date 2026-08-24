/**
 * Dominios de las herramientas SaaS que catalogamos como "a reemplazar".
 * Se usan solo para pedir su favicon público (ver LogoImage) — no alojamos
 * ni distribuimos ningún logo nosotros mismos.
 */
export const saasDomains: Record<string, string> = {
  Notion: "notion.so",
  Slite: "slite.com",
  Jira: "atlassian.com",
  Asana: "asana.com",
  Linear: "linear.app",
  Trello: "trello.com",
  Airtable: "airtable.com",
  "Google Analytics": "analytics.google.com",
  Mixpanel: "mixpanel.com",
  Amplitude: "amplitude.com",
  Calendly: "calendly.com",
  Slack: "slack.com",
  "Microsoft Teams": "microsoft.com",
  Salesforce: "salesforce.com",
  HubSpot: "hubspot.com",
  Intercom: "intercom.com",
  Zendesk: "zendesk.com",
  Firebase: "firebase.google.com",
  "Amazon S3": "aws.amazon.com",
  "Google Drive": "drive.google.com",
  Dropbox: "dropbox.com",
  Zapier: "zapier.com",
  Make: "make.com",
  "ChatGPT Plus": "openai.com",
  "Datadog LLM Observability": "datadoghq.com",
};

export function getSaasDomain(name: string): string | undefined {
  return saasDomains[name];
}
