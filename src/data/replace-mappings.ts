/**
 * Contenido curado a mano para "Reemplaza mi SaaS" — Fase 1 del brief: NO
 * intenta mapear cientos de SaaS, solo los que tienen alternativas reales y
 * suficientes en el catálogo para escribir un "puede sustituir X para..." y
 * una limitación honestos, en vez de un "X sustituye completamente a Y"
 * genérico. Cada frase de aquí está parafraseada directamente de los
 * `pros`/`cons`/`features`/`shortDescription` ya verificados de cada
 * herramienta en `src/data/tools.ts` — nunca es una equivalencia inventada.
 *
 * Mismo patrón bilingüe que migration-pair-overrides.ts/.en.ts: este archivo
 * es el contenido en español; replace-mappings.en.ts es su traducción,
 * mismas claves `${saasName}→${toolSlug}`. La unión con los datos reales del
 * catálogo (y su validación) vive en src/lib/replace.ts.
 */

import { AGPL_COPYLEFT_NOTE_ES } from "./license-notes";

export type ReplaceFit = "good" | "partial" | "specialized";

export interface ReplaceMappingContent {
  /**
   * 'good': cubre el uso principal del SaaS de forma directa.
   * 'partial': cubre una parte real y significativa, pero no toda la
   * superficie de producto del SaaS (ej. un wiki que no tiene bases de datos
   * tipo Notion, o una suite todo-en-uno donde este es solo un componente).
   * 'specialized': cubre un caso de uso concreto y más estrecho, no el uso
   * general del SaaS (ej. una capa de interfaz, o solo un sub-caso).
   */
  fit: ReplaceFit;
  /** Siempre en forma "Puede sustituir a {saas} para..." — nunca "sustituye completamente". */
  useCase: string;
  /** Limitación real, derivada de los pros/cons ya verificados de la herramienta — nunca inventada. */
  limitation: string;
}

/**
 * Los únicos SaaS con contenido curado suficiente para "Reemplaza mi SaaS"
 * (wizard + páginas /replace/*). Añadir uno nuevo aquí requiere escribir
 * useCase/limitation reales para cada alternativa — nunca se genera una
 * entrada ni una página a partir solo de `tool.replaces`.
 */
export const REPLACE_SAAS_NAMES = [
  "Notion",
  "Slack",
  "Airtable",
  "Google Drive",
  "Zapier",
  "Firebase",
  "Google Analytics",
  "Calendly",
] as const;

export const replaceMappingContent: Record<string, ReplaceMappingContent> = {
  // --- Notion ---
  "Notion→appflowy": {
    fit: "good",
    useCase: "Puede sustituir a Notion para notas, documentos y bases de datos tipo Notion — mismo modelo de bloques y vistas.",
    limitation: "Ecosistema de plugins e integraciones todavía más pequeño que el de Notion.",
  },
  "Notion→affine": {
    fit: "good",
    useCase:
      "Puede sustituir a Notion para documentos y bases de datos, sumando una pizarra/whiteboard infinita que Notion no ofrece nativamente.",
    limitation: "El self-host oficial todavía evoluciona rápido entre versiones, así que actualizar pide algo más de atención.",
  },
  "Notion→outline": {
    fit: "partial",
    useCase:
      "Puede sustituir a Notion para la wiki interna del equipo (documentación, políticas, guías) — no para sus bases de datos ni vistas tipo Kanban/Calendario.",
    limitation: "Licencia BUSL-1.1: no puedes ofrecerlo como un SaaS competidor de Outline.",
  },
  "Notion→docmost": {
    fit: "partial",
    useCase:
      "Puede sustituir a Notion para la wiki interna del equipo, con edición colaborativa en tiempo real — no cubre las bases de datos ni vistas de Notion.",
    limitation: "Proyecto todavía joven frente a alternativas más maduras como Confluence.",
  },
  "Notion→huly": {
    fit: "partial",
    useCase:
      "Puede sustituir a Notion para documentos colaborativos, dentro de una suite más amplia que también cubre proyectos y chat de equipo.",
    limitation: "Proyecto joven, con un ecosistema de integraciones todavía reducido.",
  },

  // --- Slack ---
  "Slack→rocketchat": {
    fit: "good",
    useCase: "Puede sustituir a Slack para canales, hilos y videollamadas de equipo, sin límite de historial de mensajes.",
    limitation:
      "Necesita MongoDB con replica set en producción, lo que añade complejidad operativa frente a un despliegue de un solo contenedor.",
  },
  "Slack→mattermost": {
    fit: "good",
    useCase: "Puede sustituir a Slack para chat y colaboración de equipo, con foco en seguridad y cumplimiento normativo.",
    limitation: "La edición gratuita (Team) tiene menos funciones que la Enterprise de pago.",
  },
  "Slack→zulip": {
    fit: "good",
    useCase:
      "Puede sustituir a Slack para chat de equipo, organizando cada canal por hilos de tema en vez de un único flujo cronológico.",
    limitation: "El modelo de hilos por tema tiene curva de aprendizaje para equipos acostumbrados al formato de Slack.",
  },
  "Slack→huly": {
    fit: "partial",
    useCase: "Puede sustituir a Slack para el chat de equipo, dentro de una suite más amplia que también cubre proyectos y documentos.",
    limitation: "Proyecto joven, con un ecosistema de integraciones todavía reducido.",
  },

  // --- Airtable ---
  "Airtable→nocodb": {
    fit: "good",
    useCase:
      "Puede sustituir a Airtable para hojas de cálculo inteligentes con vistas Grid, Kanban, Galería y Formulario, sobre una base de datos SQL real.",
    limitation: `Curva de aprendizaje algo mayor que Airtable, y su ${AGPL_COPYLEFT_NOTE_ES}.`,
  },
  "Airtable→baserow": {
    fit: "good",
    useCase: "Puede sustituir a Airtable para bases de datos sin código, con una interfaz drag-and-drop muy similar.",
    limitation: "Las automatizaciones más avanzadas requieren la edición premium de pago.",
  },

  // --- Google Drive ---
  "Google Drive→nextcloud": {
    fit: "good",
    useCase:
      "Puede sustituir a Google Drive para sincronizar archivos y editar documentos en colaboración, con calendario, contactos y videollamadas incluidos.",
    limitation: "Puede sentirse pesado en instancias pequeñas si activas muchas apps a la vez.",
  },
  "Google Drive→owncloud": {
    fit: "good",
    useCase: "Puede sustituir a Google Drive para sincronizar y compartir archivos, sobre una arquitectura moderna (Infinite Scale) más ligera.",
    limitation: "Ecosistema de apps más reducido que Nextcloud.",
  },
  "Google Drive→filestash": {
    fit: "specialized",
    useCase:
      "Puede sustituir la interfaz web de Google Drive para explorar y editar archivos que ya tienes en otro almacenamiento (S3, FTP, SFTP, WebDAV).",
    limitation: "No es almacenamiento en sí — necesitas desplegar también el backend de almacenamiento al que se conecta.",
  },

  // --- Zapier ---
  "Zapier→n8n": {
    fit: "good",
    useCase: "Puede sustituir a Zapier para automatizar flujos de trabajo con más de 400 nodos, sin límite de ejecuciones al auto-hospedarlo.",
    limitation: "Su licencia Fair-code restringe ofrecerlo como tu propio SaaS competidor de n8n Cloud.",
  },
  "Zapier→activepieces": {
    fit: "good",
    useCase: "Puede sustituir a Zapier para automatizar flujos de trabajo sin código, con más de 200 integraciones listas.",
    limitation:
      "Ecosistema de integraciones todavía más pequeño que el de Zapier, y algunas funciones de equipo (SSO, analíticas) solo están en el plan Enterprise de pago.",
  },

  // --- Firebase ---
  "Firebase→supabase": {
    fit: "good",
    useCase:
      "Puede sustituir a Firebase para base de datos, autenticación, storage de archivos y suscripciones en tiempo real, sobre PostgreSQL estándar.",
    limitation: "El stack completo auto-alojado tiene bastantes servicios internos que mantener.",
  },
  "Firebase→appwrite": {
    fit: "good",
    useCase: "Puede sustituir a Firebase para autenticación, base de datos, storage y funciones serverless, con SDKs para Flutter, Swift, Android y Web.",
    limitation: "Stack con varios contenedores internos, más pesado de auditar que una alternativa de un solo binario.",
  },
  "Firebase→pocketbase": {
    fit: "good",
    useCase: "Puede sustituir a Firebase para autenticación, base de datos y storage en proyectos pequeños o medianos, todo en un único binario.",
    limitation: "Usa SQLite, lo que limita la escalabilidad horizontal a gran volumen.",
  },
  "Firebase→hasura": {
    fit: "specialized",
    useCase:
      "Puede sustituir la capa de API instantánea de Firebase (GraphQL/REST sobre tu base de datos, con permisos por fila) si ya tienes o vas a usar PostgreSQL.",
    limitation: "No incluye autenticación ni storage de archivos como Firebase — solo cubre la capa de acceso a datos.",
  },

  // --- Google Analytics ---
  "Google Analytics→plausible": {
    fit: "good",
    useCase:
      "Puede sustituir a Google Analytics para ver visitas y tráfico del sitio con un enfoque de minimización de datos, sin cookies y sin identificadores de usuario por defecto, con histórico importable desde GA.",
    limitation: "Necesita ClickHouse, algo más pesado de auto-hospedar, y ofrece menos profundidad de análisis que GA4 para ecommerce complejo.",
  },
  "Google Analytics→umami": {
    fit: "good",
    useCase: "Puede sustituir a Google Analytics para analítica básica de tráfico multi-sitio desde un único dashboard.",
    limitation: "Reportes menos detallados que GA4 o Matomo.",
  },
  "Google Analytics→matomo": {
    fit: "good",
    useCase:
      "Puede sustituir a Google Analytics con la cobertura más completa de las alternativas open source: heatmaps, grabación de sesiones, embudos y segmentos avanzados.",
    limitation: "Interfaz más pesada, requiere más recursos que Plausible o Umami.",
  },
  "Google Analytics→ackee": {
    fit: "good",
    useCase: "Puede sustituir a Google Analytics para un dashboard minimalista de visitas y eventos personalizados.",
    limitation: "Reportes mucho más básicos que GA4.",
  },
  "Google Analytics→goatcounter": {
    fit: "good",
    useCase: "Puede sustituir a Google Analytics para ver visitas y referrers, con el despliegue más ligero de toda la categoría (un solo binario).",
    limitation: "No pensado para analítica de producto compleja.",
  },

  // --- Calendly ---
  "Calendly→cal-com": {
    fit: "good",
    useCase: "Puede sustituir a Calendly para páginas de reserva 1-a-1 y en equipo, con tu propio dominio y marca.",
    limitation: "El setup inicial es más técnico que registrarse directamente en Calendly.",
  },
  "Calendly→rallly": {
    fit: "specialized",
    useCase:
      "Puede sustituir a Calendly solo para encuestas de disponibilidad en grupo (tipo Doodle), donde los votantes no necesitan crear cuenta.",
    limitation: "No cubre el agendamiento 1-a-1 de Calendly, solo encuestas grupales de fecha.",
  },
};
