import { patternsEn } from "./migration-patterns.en";

export type MigrationPatternId =
  | "notes-docs"
  | "team-chat"
  | "project-management"
  | "scheduling"
  | "database-spreadsheet"
  | "crm-contacts"
  | "helpdesk"
  | "password-vault"
  | "file-storage"
  | "analytics"
  | "ecommerce"
  | "video-conferencing"
  | "ai-tools"
  | "automation"
  | "devtools-generic";

export interface MigrationStep {
  title: string;
  body: string;
}

export interface MigrationPatternContent {
  intro: string;
  steps: MigrationStep[];
  beforeYouCancel: string;
}

/** Los textos usan {from} y {to} como tokens a sustituir en tiempo de render. */
const patterns: Record<MigrationPatternId, MigrationPatternContent> = {
  "notes-docs": {
    intro:
      "Lo más laborioso al migrar notas o documentación no es el texto en sí, sino la estructura (carpetas, enlaces internos, bases de datos) y los permisos de equipo.",
    steps: [
      {
        title: "Exporta cada espacio/página desde {from}",
        body: "Casi todas las apps de notas ofrecen exportar a Markdown, HTML o PDF desde el menú de cada página o espacio. Exporta primero las páginas raíz y luego las subpáginas para conservar la jerarquía.",
      },
      {
        title: "Importa el contenido en {to}",
        body: "La mayoría de alternativas open source aceptan importación masiva de Markdown/HTML. Revisa la documentación de {to} para el formato exacto que espera — algunas requieren una estructura de carpetas concreta.",
      },
      {
        title: "Repara los enlaces internos",
        body: "Los enlaces entre páginas (wikilinks) casi nunca se migran automáticamente entre plataformas distintas. Tras importar, revisa las páginas más enlazadas y corrige las referencias rotas.",
      },
      {
        title: "Vuelve a invitar a tu equipo",
        body: "Los permisos y miembros del workspace no se exportan. Crea los espacios/equipos en {to} y vuelve a invitar a cada persona con el rol adecuado.",
      },
    ],
    beforeYouCancel:
      "Antes de cancelar {from}, verifica que el conteo de páginas coincide y que al menos las páginas más visitadas se ven bien formateadas — el Markdown exportado a veces pierde tablas o bloques embebidos.",
  },
  "team-chat": {
    intro:
      "El historial de mensajes de chat es lo más difícil de migrar entre plataformas — la mayoría de equipos migran el chat \"hacia adelante\" y dejan el historial antiguo solo de consulta.",
    steps: [
      {
        title: "Solicita la exportación de datos de {from}",
        body: "En los planes de pago, {from} suele permitir exportar el historial completo (mensajes, canales, archivos) en un export administrativo, normalmente en formato JSON.",
      },
      {
        title: "Usa la herramienta de importación de {to}",
        body: "Herramientas como Mattermost o Rocket.Chat incluyen utilidades de línea de comandos para importar exports de Slack directamente, preservando canales e hilos cuando es posible.",
      },
      {
        title: "Recrea integraciones y bots",
        body: "Los webhooks, bots y apps conectadas no se migran — tendrás que volver a configurar cada integración (CI/CD, alertas, etc.) apuntando a {to}.",
      },
      {
        title: "Anuncia el cambio con solapamiento",
        body: "Mantén ambas plataformas activas 1-2 semanas y fija un mensaje en los canales antiguos señalando el nuevo espacio, para minimizar mensajes perdidos durante la transición.",
      },
    ],
    beforeYouCancel:
      "Antes de cancelar {from}, descarga también los archivos compartidos por separado — los exports de historial no siempre incluyen los adjuntos en buena resolución.",
  },
  "project-management": {
    intro:
      "Los issues y tareas suelen migrar bien vía CSV; lo que casi nunca sobrevive es la configuración de automatizaciones y flujos de estado personalizados.",
    steps: [
      {
        title: "Exporta tus proyectos de {from} a CSV",
        body: "Filtra por proyecto y exporta issues/tareas con todos los campos (estado, asignado, etiquetas, fecha límite). Haz una exportación por proyecto para que el mapeo de campos sea más simple.",
      },
      {
        title: "Mapea los campos al importar en {to}",
        body: "Antes de importar, crea en {to} los mismos estados y etiquetas que usabas en {from} — si los nombres no coinciden exactamente, el importador dejará esos campos vacíos.",
      },
      {
        title: "Reconstruye los flujos de automatización",
        body: "Las reglas tipo \"si se cierra un issue, notifica a X\" no se exportan. Anota tus automatizaciones actuales antes de migrar y recréalas una a una en {to}.",
      },
      {
        title: "Migra por equipos, no de golpe",
        body: "Empieza con un equipo o proyecto piloto durante un sprint completo antes de mover el resto — así detectas problemas de mapeo con bajo riesgo.",
      },
    ],
    beforeYouCancel:
      "Antes de cancelar {from}, exporta también los comentarios de los issues más importantes — algunos importadores solo traen el issue principal, no el historial de comentarios.",
  },
  scheduling: {
    intro:
      "El agendamiento no tiene realmente \"datos\" que migrar (más allá de reservas futuras) — el trabajo está en recrear tus tipos de evento y reconectar el calendario.",
    steps: [
      {
        title: "Anota tus tipos de evento en {from}",
        body: "Duración, preguntas del formulario de reserva, buffers entre citas y disponibilidad — documenta cada tipo de evento antes de darlo de baja, porque no hay exportación estructurada de esta configuración.",
      },
      {
        title: "Conecta tu calendario a {to}",
        body: "Autoriza el acceso a Google Calendar/Outlook igual que hacías en {from}, para que {to} bloquee automáticamente los huecos ya ocupados.",
      },
      {
        title: "Recrea los tipos de evento",
        body: "Configura cada tipo de evento en {to} con la misma duración y preguntas. Prueba reservando una cita de prueba tú mismo antes de publicar el enlace nuevo.",
      },
      {
        title: "Actualiza los enlaces publicados",
        body: "Reemplaza el enlace de {from} en tu firma de email, bio de redes y web por el nuevo enlace de {to}, y deja una redirección temporal si es posible.",
      },
    ],
    beforeYouCancel:
      "Antes de cancelar {from}, reprograma o exporta las reservas ya confirmadas — se pierden en cuanto cierres la cuenta.",
  },
  "database-spreadsheet": {
    intro:
      "El mayor freno para dejar una base de datos SaaS no es instalar la alternativa — es mover los datos sin romper las relaciones entre tablas.",
    steps: [
      {
        title: "Exporta cada tabla de {from} a CSV",
        body: "La mayoría de estas herramientas no tienen un \"exportar toda la base\" nativo — hay que hacerlo tabla por tabla desde el menú de cada vista. Exporta primero las tablas \"padre\" (las que no dependen de otras).",
      },
      {
        title: "Importa el CSV en {to}",
        body: "{to} suele detectar automáticamente el tipo de cada columna (texto, número, fecha) al importar un CSV, pero revísalo: los campos calculados y los enlaces entre tablas casi siempre llegan como texto plano.",
      },
      {
        title: "Reconstruye las relaciones entre tablas",
        body: "Por cada columna que en {from} era un enlace a otro registro, crea el campo de relación equivalente en {to} y vuelve a enlazar los registros. Si los nombres coinciden exactamente entre tablas, un \"buscar y reemplazar\" acelera el proceso.",
      },
      {
        title: "Recrea vistas, fórmulas y automatizaciones",
        body: "Las vistas filtradas, fórmulas y automatizaciones no se exportan — hay que rehacerlas a mano. Empieza solo con la vista principal y añade el resto tras validar que los datos están correctos.",
      },
    ],
    beforeYouCancel:
      "Antes de cancelar {from}, verifica que el número total de filas coincide por tabla y que los campos numéricos/fecha no se convirtieron a texto — exportar de nuevo es gratis mientras la cuenta siga activa, no lo es después.",
  },
  "crm-contacts": {
    intro:
      "Los contactos y oportunidades migran razonablemente bien por CSV; lo que se pierde casi siempre es el historial de actividad (llamadas, emails registrados) y las automatizaciones de marketing.",
    steps: [
      {
        title: "Exporta contactos, empresas y oportunidades de {from}",
        body: "Exporta cada objeto (contactos, cuentas, oportunidades/deals) por separado a CSV, incluyendo el campo de identificador único de cada registro para poder re-vincularlos después.",
      },
      {
        title: "Prepara el pipeline en {to} antes de importar",
        body: "Crea en {to} las mismas etapas de venta (pipeline stages) y campos personalizados que usabas en {from} — si no existen al importar, esos datos se perderán o quedarán en un campo genérico.",
      },
      {
        title: "Importa y vincula las relaciones",
        body: "Importa primero empresas, luego contactos, y por último oportunidades, usando el identificador único para que {to} vincule cada oportunidad con su contacto y empresa correctos.",
      },
      {
        title: "Recrea automatizaciones de marketing/ventas",
        body: "Las secuencias de email y reglas de asignación automática no se migran — documenta las que uses en {from} y recréalas manualmente en {to}.",
      },
    ],
    beforeYouCancel:
      "Antes de cancelar {from}, exporta también el historial de actividades (llamadas, notas, emails registrados) aunque no se pueda importar directamente — sirve como archivo de consulta.",
  },
  helpdesk: {
    intro:
      "Los tickets históricos rara vez se migran completos entre helpdesks — la mayoría de equipos empiezan en la nueva plataforma solo con los tickets abiertos y dejan el resto como archivo de consulta en {from}.",
    steps: [
      {
        title: "Exporta los tickets abiertos de {from}",
        body: "Exporta al menos los tickets sin resolver a CSV (asunto, cliente, mensajes, estado) — la mayoría de helpdesks permiten esta exportación desde el panel de administración.",
      },
      {
        title: "Reconecta tus canales de entrada en {to}",
        body: "Configura en {to} el mismo email de soporte, widget de chat y/o cuentas de redes sociales que usabas en {from}, para no perder mensajes nuevos durante la transición.",
      },
      {
        title: "Importa los tickets abiertos",
        body: "Crea los tickets abiertos manualmente o vía importación CSV en {to}, marcando el histórico de {from} como solo lectura para consultas futuras.",
      },
      {
        title: "Actualiza macros y respuestas guardadas",
        body: "Las respuestas predefinidas y reglas de automatización no se exportan — vuelve a crear las más usadas en {to} antes de anunciar el cambio a tu equipo.",
      },
    ],
    beforeYouCancel:
      "Antes de cancelar {from}, exporta el histórico completo de tickets cerrados aunque no los importes — es tu única copia si un cliente reclama algo del pasado.",
  },
  "password-vault": {
    intro:
      "Migrar contraseñas es rápido, pero el momento de mayor riesgo de seguridad es justo durante la exportación — el archivo exportado está en texto plano sin cifrar.",
    steps: [
      {
        title: "Exporta tu bóveda desde {from}",
        body: "Ve a la configuración de exportación de {from} y genera un archivo CSV o JSON con todos tus elementos. La mayoría de gestores lo permiten desde el panel web, no desde la extensión del navegador.",
      },
      {
        title: "Importa el archivo en {to}",
        body: "{to} suele tener un importador dedicado que reconoce el formato de exportación de {from} directamente, incluyendo carpetas y notas seguras.",
      },
      {
        title: "Verifica antes de borrar el archivo",
        body: "Revisa que el número de elementos importados coincide con tu bóveda original y que las contraseñas se ven correctas (sin caracteres cortados) antes de continuar.",
      },
      {
        title: "Elimina el archivo exportado de forma segura",
        body: "El CSV/JSON exportado no está cifrado — bórralo de forma segura (no solo a la papelera) en cuanto confirmes que la importación fue exitosa.",
      },
    ],
    beforeYouCancel:
      "Antes de cancelar {from}, actualiza el 2FA y las contraseñas de tus cuentas más críticas ya desde {to}, para confirmar que el flujo de autenticación funciona antes de depender solo de la nueva bóveda.",
  },
  "file-storage": {
    intro:
      "A diferencia de otras migraciones, aquí no hay conversión de formato — es principalmente cuestión de tiempo de transferencia según cuántos archivos tengas.",
    steps: [
      {
        title: "Sincroniza o descarga todo desde {from}",
        body: "Usa el cliente de escritorio de {from} para tener una copia local completa, o descarga las carpetas principales directamente si el volumen es manejable.",
      },
      {
        title: "Sube los archivos a {to}",
        body: "La forma más fiable con volúmenes grandes es usar el cliente de sincronización de {to} apuntando a la misma carpeta local, en vez de subir por el navegador (evita timeouts).",
      },
      {
        title: "Verifica la estructura de carpetas y permisos",
        body: "Los permisos de compartición por carpeta no se migran automáticamente — revisa qué carpetas eran compartidas en {from} y vuelve a compartirlas con las personas correctas en {to}.",
      },
      {
        title: "Actualiza los enlaces compartidos",
        body: "Cualquier enlace público o interno que apuntara a archivos en {from} quedará roto — sustitúyelo por el nuevo enlace de {to} en documentación, wikis o emails guardados.",
      },
    ],
    beforeYouCancel:
      "Antes de cancelar {from}, compara el tamaño total (GB) y el número de archivos entre ambos para confirmar que no falta nada, especialmente si hay archivos muy grandes o con caracteres especiales en el nombre.",
  },
  analytics: {
    intro:
      "Aquí la mala noticia es inevitable: el histórico de analítica casi nunca se puede migrar entre plataformas distintas, porque cada una mide y agrega los datos de forma diferente.",
    steps: [
      {
        title: "Exporta un resumen histórico de {from} como archivo",
        body: "Antes de nada, exporta a CSV/PDF tus informes clave (tráfico mensual, fuentes principales, conversiones) de los últimos 12-24 meses como archivo de referencia — no se podrá recuperar después.",
      },
      {
        title: "Instala el script de {to} en paralelo",
        body: "Añade el script de seguimiento de {to} a tu sitio sin quitar todavía el de {from}, para tener ambos midiendo en paralelo durante 2-4 semanas y validar que los números son razonables.",
      },
      {
        title: "Recrea tus objetivos y conversiones",
        body: "Los eventos de conversión personalizados de {from} no se migran — configúralos de nuevo en {to} usando la misma definición (ej. envío de formulario, compra completada).",
      },
      {
        title: "Retira el script antiguo",
        body: "Cuando confirmes que {to} captura el tráfico correctamente, elimina el script de {from} de tu sitio y conserva solo el archivo histórico exportado como referencia.",
      },
    ],
    beforeYouCancel:
      "Antes de cancelar {from}, asegúrate de haber exportado también los informes de audiencia y comportamiento que uses para reportes internos — desaparecen en cuanto cierras la cuenta.",
  },
  ecommerce: {
    intro:
      "Migrar una tienda online es de las migraciones más delicadas: además del catálogo, hay que cuidar los SEO de las URLs de producto y no perder pedidos en curso.",
    steps: [
      {
        title: "Exporta el catálogo de {from}",
        body: "Exporta productos, variantes, imágenes y categorías a CSV. Incluye el SKU de cada producto — lo necesitarás para no duplicar referencias al importar.",
      },
      {
        title: "Importa el catálogo en {to} en un entorno de pruebas",
        body: "Antes de tocar la tienda en producción, importa el catálogo en una instancia de {to} aparte y revisa que precios, stock e imágenes se vean correctos.",
      },
      {
        title: "Reconecta pasarela de pago y envíos",
        body: "Las integraciones de pago (Stripe, PayPal) y de logística no se migran — vuelve a configurarlas en {to} y haz un pedido de prueba real de principio a fin antes de lanzar.",
      },
      {
        title: "Redirige las URLs antiguas",
        body: "Configura redirecciones 301 de las URLs de producto de {from} a sus equivalentes en {to} para no perder el posicionamiento SEO acumulado.",
      },
    ],
    beforeYouCancel:
      "Antes de cancelar {from}, exporta el histórico completo de pedidos y clientes — muchas obligaciones fiscales requieren conservar esos registros durante años.",
  },
  "video-conferencing": {
    intro:
      "Las videollamadas no tienen \"datos\" que migrar más allá de grabaciones pasadas — el trabajo real es reconectar el calendario y avisar a los participantes habituales.",
    steps: [
      {
        title: "Descarga las grabaciones importantes de {from}",
        body: "Si grabas reuniones, descarga las grabaciones que necesites conservar — la mayoría de proveedores las eliminan a los pocos meses de cancelar la cuenta.",
      },
      {
        title: "Configura {to} en tu calendario",
        body: "Instala la integración de {to} con Google Calendar/Outlook para generar enlaces de reunión automáticamente al crear un evento, igual que hacías con {from}.",
      },
      {
        title: "Actualiza las salas recurrentes",
        body: "Reemplaza el enlace de {from} en tus reuniones recurrentes (standups, 1:1s) por el nuevo enlace de {to} — revisa también firmas de email y páginas de \"contacto\" públicas.",
      },
      {
        title: "Haz una prueba con el equipo completo",
        body: "Antes de depender de {to} para una reunión importante, haz una llamada de prueba con todo el equipo para detectar problemas de audio/video o de firewall con antelación.",
      },
    ],
    beforeYouCancel:
      "Antes de cancelar {from}, confirma que nadie del equipo tiene reuniones futuras agendadas con ese enlace todavía activo.",
  },
  "ai-tools": {
    intro:
      "Las conversaciones de chat con IA rara vez se pueden migrar entre plataformas distintas — lo importante suele ser el histórico de prompts útiles, no la conversación completa.",
    steps: [
      {
        title: "Exporta tu historial de conversaciones de {from}",
        body: "Si {from} lo permite, exporta tus conversaciones (normalmente en JSON) antes de cambiar — al menos como archivo de referencia, aunque no se pueda re-importar tal cual.",
      },
      {
        title: "Configura tu proveedor de modelo en {to}",
        body: "{to} necesita que conectes una clave de API (OpenAI, Anthropic, o un modelo local) — decide si vas a usar un proveedor en la nube o modelos locales según tu presupuesto y necesidad de privacidad.",
      },
      {
        title: "Recrea tus prompts y flujos guardados",
        body: "Revisa tu historial exportado y guarda de nuevo en {to} los prompts, plantillas o \"custom instructions\" que usabas con más frecuencia.",
      },
      {
        title: "Valida la calidad de respuesta con casos reales",
        body: "Prueba {to} con 3-5 tareas reales que resolvías en {from} antes de depender de él por completo — la calidad varía según el modelo que elijas conectar.",
      },
    ],
    beforeYouCancel:
      "Antes de cancelar {from}, confirma que has exportado cualquier conversación con información que no tengas guardada en otro sitio.",
  },
  automation: {
    intro:
      "Los flujos de automatización casi nunca se pueden importar de una plataforma a otra directamente — hay que reconstruirlos, pero es buen momento para simplificarlos.",
    steps: [
      {
        title: "Documenta cada flujo activo en {from}",
        body: "Haz una lista de tus automatizaciones (trigger → acciones) tal como están en {from}, incluyendo las credenciales de las apps que conectan.",
      },
      {
        title: "Recrea los flujos más críticos primero en {to}",
        body: "Empieza por las automatizaciones que más impacto tienen en el negocio, no por las más simples — así validas rápido que {to} cubre tu caso de uso principal.",
      },
      {
        title: "Prueba cada flujo con datos reales antes de activarlo",
        body: "Ejecuta cada automatización migrada manualmente al menos una vez, revisando el resultado, antes de dejarla corriendo en modo automático en {to}.",
      },
      {
        title: "Desactiva (no borres) los flujos en {from}",
        body: "Desactiva los flujos antiguos en vez de borrarlos inmediatamente — así puedes volver a activarlos rápido si algo falla en {to} durante las primeras semanas.",
      },
    ],
    beforeYouCancel:
      "Antes de cancelar {from}, exporta la configuración de cada flujo (aunque sea como captura de pantalla) por si necesitas consultarla más adelante.",
  },
  "devtools-generic": {
    intro:
      "Las migraciones de infraestructura técnica varían mucho según la herramienta — estos son los pasos generales que aplican a la mayoría de casos.",
    steps: [
      {
        title: "Exporta tu configuración y datos de {from}",
        body: "Revisa la documentación de {from} para exportar proyectos, configuración e integraciones — el formato exacto depende de cada servicio, pero casi todos ofrecen alguna vía de exportación para cuentas de pago.",
      },
      {
        title: "Prepara el entorno de {to}",
        body: "Despliega {to} en un entorno de pruebas primero (no en producción) y replica la configuración base antes de mover ningún dato real.",
      },
      {
        title: "Migra por partes y valida cada una",
        body: "Mueve un proyecto o integración a la vez en vez de todo de golpe, comprobando que cada pieza funciona en {to} antes de continuar con la siguiente.",
      },
      {
        title: "Actualiza las integraciones que dependían de {from}",
        body: "Cualquier servicio externo (CI/CD, webhooks, SDKs) que apuntara a {from} necesita reconfigurarse para apuntar a tu nueva instancia de {to}.",
      },
    ],
    beforeYouCancel:
      "Antes de cancelar {from}, confirma que ningún servicio en producción sigue dependiendo de él revisando logs de acceso recientes.",
  },
};

const saasToPattern: Record<string, MigrationPatternId> = {
  Notion: "notes-docs",
  Confluence: "notes-docs",
  Evernote: "notes-docs",
  OneNote: "notes-docs",
  "Google Docs": "notes-docs",

  Slack: "team-chat",
  "Microsoft Teams": "team-chat",
  Skype: "team-chat",

  Jira: "project-management",
  Asana: "project-management",
  Linear: "project-management",
  Trello: "project-management",
  "MS Project": "project-management",
  Todoist: "project-management",

  Calendly: "scheduling",
  Doodle: "scheduling",

  Airtable: "database-spreadsheet",

  Salesforce: "crm-contacts",
  HubSpot: "crm-contacts",
  "Zoho CRM": "crm-contacts",
  Clay: "crm-contacts",

  Zendesk: "helpdesk",
  Intercom: "helpdesk",
  "Help Scout": "helpdesk",

  "1Password": "password-vault",
  LastPass: "password-vault",
  "1Password Business": "password-vault",
  "LastPass Teams": "password-vault",

  Dropbox: "file-storage",
  "Google Drive": "file-storage",
  "Google Photos": "file-storage",
  "Dropbox Business": "file-storage",

  "Google Analytics": "analytics",
  Mixpanel: "analytics",
  Amplitude: "analytics",
  Looker: "analytics",
  Tableau: "analytics",
  "Power BI": "analytics",
  FullStory: "analytics",
  LogRocket: "analytics",

  Shopify: "ecommerce",
  "Shopify Plus": "ecommerce",
  BigCommerce: "ecommerce",
  Magento: "ecommerce",

  Zoom: "video-conferencing",
  "Google Meet": "video-conferencing",
  "Twilio Video": "video-conferencing",

  "ChatGPT Plus": "ai-tools",
  "OpenAI API": "ai-tools",
  Midjourney: "ai-tools",
  Voiceflow: "ai-tools",
  Dialogflow: "ai-tools",
  Typeform: "ai-tools",
  "Perplexity AI": "ai-tools",
  "Bolt.new": "ai-tools",

  Zapier: "automation",
  Make: "automation",
};

export function getMigrationPatternId(saasName: string): MigrationPatternId {
  return saasToPattern[saasName] ?? "devtools-generic";
}

export function getMigrationPatternContent(id: MigrationPatternId): MigrationPatternContent {
  return patterns[id];
}

export function getMigrationPatternContentLocalized(
  id: MigrationPatternId,
  locale: "es" | "en"
): MigrationPatternContent {
  if (locale === "en") {
    return patternsEn[id];
  }
  return patterns[id];
}

export function fillTemplate(text: string, fromName: string, toName: string): string {
  return text.replaceAll("{from}", fromName).replaceAll("{to}", toName);
}
