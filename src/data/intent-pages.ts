/**
 * Contenido curado a mano para las páginas long-tail de intención
 * (/alternativas/{saas}-{intent}) — mismo patrón que replace-mappings.ts:
 * nunca se genera texto automáticamente, y la unión con los datos reales
 * del catálogo (elegibilidad, RAM real) vive en src/lib/intent-pages.ts.
 *
 * "privacy" NO es un IntentType todavía: el catálogo no tiene ningún campo
 * verificable (telemetría, llamadas a terceros, cumplimiento legal) que
 * soporte esa afirmación sin inventar un dato. Se añadirá el día que exista
 * un campo así — no antes.
 *
 * Cada entrada exige justificar por qué esa combinación SaaS+intención
 * merece una URL propia, no solo cumplir la elegibilidad automática (ver
 * MIN_ELIGIBLE_TOOLS en intent-pages.ts) — el criterio real es contenido
 * diferencial defendible, nunca "existe la combinación".
 */

export type IntentType = "self-hosted" | "open-source";

export interface IntentPageContentBase {
  /** Ángulo de apertura específico de esta intención — nunca genérico ni reutilizado de /alternativas/[slug]. */
  intro: string;
  /** Trade-off honesto del modelo (self-hosted u open-source) frente al SaaS, a nivel de página — no repetido por herramienta. */
  tradeoffsVsSaas: string;
}

export type IntentPageContent =
  | (IntentPageContentBase & {
      intent: "self-hosted";
      /** Qué implica operar TÚ este tipo concreto de herramienta — mantenimiento, actualizaciones, requisitos reales, no un párrafo intercambiable entre SaaS. */
      operationalNotes: string;
    })
  | (IntentPageContentBase & {
      intent: "open-source";
      /** Qué gana el usuario con licencia 100% FOSS aquí específicamente — nunca solo "es de código abierto". */
      licenseAngle: string;
    });

export const INTENT_PAGE_CONTENT: Record<string, IntentPageContent> = {
  "Notion→self-hosted": {
    intent: "self-hosted",
    intro:
      "Auto-alojar tu alternativa a Notion significa que tus notas, wikis y bases de datos tipo Notion viven en tu propio servidor, no en la nube de Notion — ni límite de bloques gratuitos, ni riesgo de que una subida de precio te afecte.",
    operationalNotes:
      "Las 5 alternativas del catálogo llevan docker-compose.yml y piden entre 1GB y 2GB de RAM (AppFlowy y Huly son las más ligeras; Outline, Docmost y AFFiNE necesitan más por su motor de búsqueda/whiteboard integrado). Actualizar es un docker compose pull && docker compose up -d — haz backup del volumen de datos antes, como con cualquier base de datos.",
    tradeoffsVsSaas:
      "No vas a tener la colaboración en tiempo real tan pulida de Notion sin trabajo extra de infraestructura (websockets, CDN), y el mantenimiento (backups, actualizaciones) pasa a ser tuyo. A cambio, tus notas no dependen de que Notion siga operando, cambie de precio o modifique sus límites gratuitos.",
  },
  "Slack→self-hosted": {
    intent: "self-hosted",
    intro:
      "Con chat de equipo auto-hospedado, el historial de mensajes de tu organización vive en tu servidor — sin límite de mensajes visibles del plan gratuito ni exportación bloqueada.",
    operationalNotes:
      "Rango real entre las 4 alternativas: de 512MB (Zulip, la más ligera) a 1GB (Rocket.Chat, Mattermost, Huly). Las notificaciones push a móvil normalmente requieren configurar tu propio proyecto de Firebase/APNs — no vienen listas de fábrica como en Slack.",
    tradeoffsVsSaas:
      "Pierdes el catálogo de miles de integraciones de terceros de Slack; ganas control total sobre cuánto tiempo se retiene el historial y ningún límite de mensajes impuesto por un plan de pago.",
  },
  "Slack→open-source": {
    intent: "open-source",
    intro:
      "De las 4 alternativas a Slack del catálogo, solo Huly y Zulip son 100% FOSS — Rocket.Chat y Mattermost son Open-Core (núcleo libre, pero con funciones que pueden quedar detrás de un plan de pago).",
    licenseAngle:
      "Con Huly o Zulip el código que ejecutas es exactamente el mismo que puedes auditar en su repositorio, sin una versión \"Enterprise\" distinta con funciones bloqueadas — si el proyecto cambia de rumbo, siempre puedes hacer fork.",
    tradeoffsVsSaas:
      "Huly y Zulip cubren bien el chat de equipo real, pero con comunidades más pequeñas que Rocket.Chat/Mattermost — menos plugins de terceros ya hechos, a cambio de cero riesgo de que una función que usas hoy se mueva mañana a un plan de pago.",
  },
  "Zoom→self-hosted": {
    intent: "self-hosted",
    intro:
      "Videoconferencia auto-hospedada significa que gestionas tú la infraestructura de las llamadas (WebRTC) — sin límite de 40 minutos ni coste por minuto de un plan gratuito.",
    operationalNotes:
      "El rango de RAM aquí es el más amplio del catálogo para esta intención: Galène y Neko funcionan con 256MB en hardware modesto, BigBlueButton con 512MB, mientras que Jitsi Meet necesita 2GB y más CPU cuanta más gente esté conectada a la vez — el requisito real depende de cuántos participantes y minutos de videollamada esperas, no es un número fijo. Necesitarás abrir puertos UDP en tu firewall/NAT para las llamadas.",
    tradeoffsVsSaas:
      "No vas a tener la fiabilidad \"se conecta siempre\" de Zoom en redes corporativas restrictivas (Zoom invierte mucho en atravesar firewalls difíciles); a cambio, videollamadas sin límite de participantes ni coste por minuto impuesto por un plan.",
  },
  "Google Analytics→self-hosted": {
    intent: "self-hosted",
    intro:
      "Auto-alojar tu analítica web cambia \"tus datos de visitas van a Google\" por \"se quedan en tu propio servidor\" — varias de estas alternativas ni siquiera usan cookies.",
    operationalNotes:
      "El rango de RAM más amplio del catálogo para esta intención: GoatCounter corre en 256MB (un solo binario), Umami y Matomo piden 1GB, y Plausible necesita 2GB por llevar ClickHouse detrás — la elección depende del volumen de tráfico que quieras analizar, no solo del presupuesto de servidor.",
    tradeoffsVsSaas:
      "Pierdes la integración nativa de Google Analytics con Google Ads/Search Console; ganas datos que no dependen de que un visitante acepte una cookie y control total sobre cuánto tiempo se retienen.",
  },
  "Airtable→self-hosted": {
    intent: "self-hosted",
    intro:
      "Ninguna de las 3 alternativas a Airtable del catálogo es 100% FOSS (las 3 son Open-Core), así que self-hosted es la única intención con página propia para Airtable — no hay una versión \"open-source\" que mostrar por separado.",
    operationalNotes:
      "Rango de 256MB (Budibase) a 1GB (NocoDB) de RAM; Baserow y Budibase son las más sencillas de instalar (nivel beginner). NocoDB es hoy la única de las 3 con estado \"Verificado\" en nuestra auditoría de despliegue Docker — puedes ver el detalle exacto en su ficha.",
    tradeoffsVsSaas:
      "El modelo Open-Core significa que el núcleo (tablas, vistas, automatizaciones básicas) es gratis y auto-hospedable, pero funciones avanzadas (SSO, ciertos permisos granulares) pueden seguir de pago según el proyecto — revisa la licencia de cada una en su ficha antes de asumir que todo es gratis.",
  },
};
