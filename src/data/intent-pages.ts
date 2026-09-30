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
      "Las 5 alternativas del catálogo llevan docker-compose.yml y piden entre 1GB y 2GB de RAM (AppFlowy y Huly son las más ligeras; Outline, Docmost y AFFiNE necesitan más por su motor de búsqueda/whiteboard integrado). Actualizar es un docker compose pull && docker compose up -d — haz backup del volumen de datos antes, como con cualquier base de datos.\n\nLa migración desde Notion depende de la herramienta que elijas: cada una importa formatos distintos (Markdown, HTML, CSV) con más o menos fidelidad para bases de datos, relaciones entre páginas y bloques embebidos — revisa la documentación de importación de la alternativa elegida antes de asumir que todo tu espacio de trabajo pasará sin ajustes. Ninguna garantiza una migración automática 1:1. Antes de migrar, exporta una copia de seguridad completa desde Notion (Ajustes → Exportar todo el contenido del espacio) y consérvala aparte, pase lo que pase con la importación.",
    tradeoffsVsSaas:
      "No vas a tener la colaboración en tiempo real tan pulida de Notion sin trabajo extra de infraestructura (websockets, CDN), y el mantenimiento (backups, actualizaciones) pasa a ser tuyo. A cambio, tus notas no dependen de que Notion siga operando, cambie de precio o modifique sus límites gratuitos.",
  },
  "Slack→self-hosted": {
    intent: "self-hosted",
    intro:
      "Con chat de equipo auto-hospedado, el historial de mensajes de tu organización vive en tu servidor — sin límite de mensajes visibles del plan gratuito ni exportación bloqueada.",
    operationalNotes:
      "Rango real entre las 4 alternativas: de 512MB (Zulip, la más ligera) a 1GB (Rocket.Chat, Mattermost, Huly). Las notificaciones push a móvil normalmente requieren configurar tu propio proyecto de Firebase/APNs — no vienen listas de fábrica como en Slack.\n\nEl requisito real de servidor no es fijo: crece con cuánta gente está conectada a la vez, el volumen de mensajes e historial, los archivos que subís y cuántas integraciones/bots tengáis activos. La base de datos y el almacenamiento de archivos suelen ser los primeros cuellos de botella al crecer el equipo, no la CPU — y las notificaciones push a móvil (mencionadas arriba) pueden necesitar ajuste aparte según el volumen. Aquí no damos una cifra de \"hasta X usuarios\" por herramienta: el catálogo no tiene ese dato verificado, y un número sin fuente real sería una promesa que no podemos sostener.",
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
      "El rango de RAM más amplio del catálogo para esta intención: GoatCounter corre en 256MB (un solo binario), Umami y Matomo piden 1GB, y Plausible necesita 2GB por llevar ClickHouse detrás — la elección depende del volumen de tráfico que quieras analizar, no solo del presupuesto de servidor.\n\nMigrar el histórico de Google Analytics no es equivalente entre herramientas: unas pueden importar datos históricos con más o menos fidelidad, otras simplemente empiezan a medir desde cero el día que las instalas — conviene separar \"conservar lo que ya tienes\" (exporta tus informes de GA aparte, como copia) de \"medir hacia adelante\" con la nueva herramienta. Eventos personalizados, objetivos/conversiones e integraciones (Google Ads, Search Console) normalmente hay que reconstruirlos a mano en la alternativa elegida — ninguna de estas herramientas ofrece hoy una migración automática verificada desde Google Analytics.",
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
  "Dropbox→self-hosted": {
    intent: "self-hosted",
    intro:
      "Montar almacenamiento de archivos auto-alojado plantea de entrada una bifurcación de red: un nodo centralizado al que tus dispositivos se conectan, o replicación directa entre ellos sin ningún servidor intermedio. Las alternativas de este catálogo a Dropbox se reparten exactamente en uno de los dos bandos, y esa bifurcación cambia cómo compartes archivos, cómo haces backups y qué necesitas dejar encendido.",
    operationalNotes:
      "Nextcloud, Seafile y Pydio Cells son cliente-servidor: instalas un servidor (con su base de datos — MySQL/MariaDB en los tres casos) al que tus dispositivos se conectan, igual que con Dropbox. Syncthing es distinto: sincroniza tus dispositivos directamente entre sí, cifrado, sin ningún servidor central que tengas que mantener.\n\nLa diferencia se nota sobre todo en backups y en compartir con terceros. Con un servidor central, el backup es uno solo — el servidor — y compartir un archivo con alguien externo es un enlace. Con Syncthing no hay un punto único: si quieres una copia de respaldo real, necesitas configurar tú mismo un dispositivo que esté siempre encendido guardando una copia, y compartir con alguien fuera de tus propios dispositivos requiere que ese dispositivo también corra Syncthing. Dentro del grupo cliente-servidor, Seafile destaca por cifrado opcional por biblioteca y mejor rendimiento con muchos archivos; Pydio Cells añade flujos de aprobación y auditoría pensados para organizaciones con necesidades de gobernanza, no para uso personal.",
    tradeoffsVsSaas:
      "Elegir P2P (Syncthing) no significa \"sin infraestructura que mantener\" — solo cambia dónde vive esa infraestructura: en cada uno de tus dispositivos en vez de en un servidor. Ganas que tus archivos nunca pasan por ningún tercero; pierdes la comodidad de un punto de acceso único desde cualquier lugar sin tener otro dispositivo tuyo encendido. Con el modelo cliente-servidor (Nextcloud/Seafile/Pydio) mantienes la experiencia más parecida a Dropbox — un servidor accesible desde cualquier sitio — a cambio de ser tú quien lo opera y lo respalda.",
  },
  "Datadog→self-hosted": {
    intent: "self-hosted",
    intro:
      "\"Datadog\" es una marca que empaqueta varias funciones distintas — dashboards, rastreo de errores, trazas, monitoreo de infraestructura — como un solo producto. Ninguna alternativa de este catálogo las cubre todas con la misma profundidad, así que la pregunta real no es \"¿cuál sustituye a Datadog?\" sino \"¿qué parte de Datadog necesito reemplazar?\".",
    operationalNotes:
      "Grafana es solo el panel de visualización — el propio proyecto lo dice: necesitas Prometheus, Loki o Tempo aparte para tener datos que mostrar. Sentry (self-hosted) es el servidor oficial de rastreo de errores y rendimiento de aplicación (APM), con un stack pesado detrás (Postgres, Redis, Kafka y ClickHouse) que instala mediante su propio script, no una imagen Docker suelta. SigNoz unifica métricas, trazas y logs en un solo panel, basado en OpenTelemetry, también sobre ClickHouse. Beszel cubre solo infraestructura — CPU, RAM, disco, red de tus servidores — con un único binario sin dependencias; el propio proyecto es claro en que no hace rastreo de errores de aplicación.\n\nSi lo que buscas de Datadog es \"ver errores en producción\", Sentry es el candidato directo. Si es \"ver métricas y trazas\", SigNoz. Si es \"un panel sobre datos que ya recojo por otra vía\", Grafana. Si es \"saber si un servidor se está quedando sin RAM\", Beszel — son piezas distintas, no tamaños distintos de lo mismo.",
    tradeoffsVsSaas:
      "Sobre Sentry: aunque su código está disponible públicamente, su licencia (FSL-1.1) no es una licencia FOSS ni Open-Core clásica — tiene condiciones propias sobre distribución. No es \"simplemente open source\", y si necesitas precisar qué permite exactamente antes de usarlo, conviene revisar los términos completos en su fuente oficial en vez de asumir nada por el nombre. Sobre el resto: ninguna de las 4 sustituye a Datadog entero — combinar varias es normal, y elegir \"la más completa\" (SigNoz) no te libra de decidir si además necesitas el rastreo de errores específico que solo cubre Sentry.",
  },
  "Shopify→self-hosted": {
    intent: "self-hosted",
    intro:
      "Reemplazar Shopify por una alternativa auto-alojada separa a los proyectos según dónde vive el frontend de la tienda: integrado ya en la plataforma, o construido aparte y conectado por API. Las 7 alternativas del catálogo se reparten justo por esa línea.",
    operationalNotes:
      "Medusa y Vendure son comercio headless: ambas son, según sus propios proyectos, un motor de comercio con API — pedidos, inventario, precios — sin una tienda visual incluida; tienes que construir o conectar tú el frontend. Medusa es 100% FOSS (Node.js); Vendure es Open-Core (TypeScript/NestJS). Las otras cinco —Bagisto, PrestaShop, Sylius, Shopware, WooCommerce— son plataformas con storefront incluido: instalas, configuras una plantilla, y tienes tienda visible sin escribir un frontend aparte. Todas PHP, todas MySQL, todas Open-Core. WooCommerce tiene una particularidad propia del grupo: no es una plataforma independiente, es un plugin — necesita WordPress instalado y funcionando antes de poder usarse.\n\nDentro de las cinco con storefront, Sylius y PrestaShop comparten base técnica (PHP/Symfony), pero Sylius está pensado para lógica de negocio B2B/B2C más compleja mientras PrestaShop tiene más años de mercado, sobre todo en Europa; Bagisto usa Laravel en vez de Symfony; Shopware añade un editor visual de tienda propio.",
    tradeoffsVsSaas:
      "La elección responde a la capacidad del equipo: el modelo headless exige mantener y desplegar el frontend por cuenta propia, a cambio de libertad total sobre cómo se ve y se comporta la tienda; una plataforma con storefront incluido reduce esa fricción operativa, a costa de menos margen para salirte de lo que la plantilla permite. Si tu prioridad es tener una tienda funcionando sin escribir código de frontend, Bagisto, PrestaShop, Sylius, Shopware o WooCommerce encajan mejor; si tienes equipo de desarrollo y quieres control total sobre esa capa, Medusa o Vendure.",
  },
  "GitHub→self-hosted": {
    intent: "self-hosted",
    // Nota editorial interna (no publicar en la página): el motivo exacto y los
    // detalles completos del relicensing MIT→GPL-3.0-or-later de Forgejo
    // (agosto 2024) están pendientes de verificar contra el anuncio oficial de
    // forgejo.org — bloqueado por el proxy de red de este entorno en el
    // momento de escribir esto. El texto de abajo usa únicamente lo que el
    // propio catálogo ya documenta (fecha + "gobernanza abierta sin fines
    // comerciales"), sin añadir ningún detalle nuevo no verificado.
    intro:
      "Auto-alojar tu forja de código implica decidir primero cuánta plataforma quieres levantar: solo repositorios Git, o todo un ciclo DevOps con CI/CD y registro de contenedores integrados. Y si te quedas en lo primero, todavía queda una segunda pregunta pendiente: quién gobierna el proyecto del que vas a depender.",
    operationalNotes:
      "Gitea y GitLab CE cubren alcances muy distintos. Gitea es una forja Git ligera — repositorios, issues, PRs, wiki y Actions compatibles con la sintaxis de GitHub Actions — y corre, documentado por el propio proyecto, perfectamente en un VPS de 1GB de RAM. GitLab CE es una plataforma DevOps completa: además de Git incluye CI/CD sin herramientas externas y su propio registro de contenedores — pero eso tiene un coste real de recursos: 4GB+ de RAM recomendados según sus propios requisitos de despliegue, notablemente más que Gitea.\n\nForgejo es un caso particular: es un fork comunitario de Gitea, nacido específicamente para tener gobernanza 100% abierta sin una empresa detrás — comparte gran parte del código base, así que su consumo de recursos es similarmente ligero. Un dato relevante si te importa la licencia: Forgejo cambió de MIT a GPL-3.0-or-later en agosto de 2024, mientras que Gitea sigue siendo MIT — revisa las implicaciones si vas a distribuir una versión modificada de cualquiera de las dos.",
    tradeoffsVsSaas:
      "Si solo necesitas alojar código con issues y PRs, Gitea o Forgejo cubren eso con una fracción de los recursos que pide GitLab CE — la diferencia no es cosmética, es una plataforma DevOps completa frente a una forja Git enfocada. Elegir entre Gitea y Forgejo es menos una cuestión técnica (parten del mismo código) y más una cuestión de qué modelo de gobernanza prefieres: Gitea tiene una oferta comercial detrás (Open-Core en nuestra clasificación); Forgejo es explícitamente comunitario, sin entidad comercial.",
  },
  "LastPass→open-source": {
    intent: "open-source",
    intro:
      "Añadir \"open-source\" a \"alternativa a LastPass\" normalmente significa que ya te preocupa la confianza en software cerrado — quieres poder auditar el código que guarda tus contraseñas, no solo ahorrar dinero. De las 3 alternativas a LastPass del catálogo, solo 2 son 100% FOSS.",
    licenseAngle:
      "Vaultwarden es una reimplementación del servidor de Bitwarden, no oficial y no afiliada al proyecto Bitwarden, escrita en Rust, compatible con las apps oficiales de Bitwarden. Según la propia documentación del proyecto, implementa la mayoría de las funciones de la API de Bitwarden, incluyendo organizaciones, envíos (Sends) y acceso de emergencia — funciones que en la nube oficial de Bitwarden están en planes de pago. Esto es un efecto de la compatibilidad de protocolo, no un objetivo declarado del proyecto de saltarse ningún plan comercial. Bitwarden (self-hosted) —el servidor oficial— sí ofrece esas mismas funciones, pero su modelo es Open-Core, por lo que no entra en esta página: la selección aquí es específicamente 100% FOSS.\n\nKeeWeb es un caso distinto: no es un servidor, es un cliente web/escritorio para bóvedas .kdbx del formato KeePass. Auto-hospedarlo significa alojar una app estática que se conecta a un almacenamiento externo tuyo (Dropbox, Google Drive, tu propio WebDAV) — la sincronización depende de ese backend, no de KeeWeb.",
    tradeoffsVsSaas:
      "Vale la pena ser precisos con lo que ofrece cada opción: Vaultwarden no es \"Bitwarden Premium gratis\" — es una implementación compatible mantenida por la comunidad, no el servidor oficial. Y KeeWeb no sustituye a un servidor self-hosted tradicional — sin un backend de sincronización propio, no tienes un vault centralizado accesible desde cualquier dispositivo. Si buscas un servidor de contraseñas propio con apps móviles, Vaultwarden es la pieza que cumple eso; si ya usas o quieres usar el formato KeePass con un almacenamiento que ya tienes, KeeWeb es la pieza que lo hace accesible desde el navegador.",
  },
  "Auth0→open-source": {
    intent: "open-source",
    intro:
      "Auth0 es infraestructura de identidad — quien busca específicamente una alternativa open-source normalmente quiere poder auditar el código que gestiona credenciales, no solo evitar el coste. De las 6 alternativas a Auth0 del catálogo, 4 son 100% FOSS, y no son intercambiables entre sí: cada una está pensada para un caso distinto.",
    licenseAngle:
      "Keycloak (Apache-2.0) es la más madura y probada en entornos empresariales, con federación LDAP/Active Directory incluida — en nuestra propia auditoría de despliegue es la única de las 4 con estado Docker verificado. Ory (Apache-2.0) es 100% API-first: no trae interfaz de login propia, piensas y construyes tú el frontend, a cambio de control total del flujo — tiene una curva de aprendizaje más alta precisamente por eso. Zitadel (AGPL-3.0, con excepciones Apache-2.0/MIT en algunos directorios) está construido desde cero para multi-tenancy: aislar la identidad de cada cliente sin desplegar una instancia por cliente, pensado para SaaS B2B. Logto (MPL-2.0) apunta a equipos pequeños que quieren algo tan simple de configurar como Clerk pero auto-hospedado, con el panel de administración más cuidado del grupo.\n\nSi tu caso es ofrecer el propio servicio de identidad a terceros (no solo usarlo internamente), conviene revisar las implicaciones de la licencia AGPL-3.0 de Zitadel para tu caso concreto de distribución o servicio antes de decidir — no es una limitación exclusiva de Zitadel en el ecosistema open source, pero sí es la única con licencia copyleft fuerte de este grupo.",
    tradeoffsVsSaas:
      "Ninguna de las 4 es \"la alternativa a Auth0\" en general — son 4 herramientas con objetivos de diseño distintos. Si necesitas SSO empresarial ya probado, Keycloak. Si quieres construir tu propio frontend de login sin ataduras, Ory. Si tu producto es un SaaS B2B con múltiples clientes que necesitan identidad aislada, Zitadel. Si eres un equipo pequeño que valora una experiencia de configuración simple, Logto.",
  },
  "Mixpanel→self-hosted": {
    intent: "self-hosted",
    intro:
      "Self-hosted product analytics tiene dos ejes de decisión que \"alternativas a Mixpanel\" sin más no resuelve: ¿necesitas solo analytics, o una plataforma de producto más amplia? Y, operativamente, ¿qué motor de base de datos estás dispuesto a mantener?",
    operationalNotes:
      "PostHog va más allá de analytics puro — el propio proyecto lo describe como analítica de producto, session replay, feature flags, A/B testing y encuestas en una sola plataforma, sobre PostgreSQL + ClickHouse. OpenPanel combina analítica web y de producto en un dashboard más simple, también sobre PostgreSQL + ClickHouse, aunque es un proyecto bastante más joven y con comunidad todavía pequeña. Countly usa un motor completamente distinto — MongoDB en vez de PostgreSQL/ClickHouse — y tiene el soporte más fuerte del grupo para SDKs de apps móviles nativas.\n\nLa elección de motor de datos no es solo técnica: mantener un ClickHouse (PostHog, OpenPanel) implica un tipo de backup y de experiencia distinta a la de mantener un MongoDB (Countly) — ninguno es mejor en abstracto, son operaciones distintas según lo que tu equipo ya sepa administrar. Sobre licencias: PostHog y Countly son Open-Core — la propia ficha de Countly indica que su edición comunitaria tiene menos funciones que la de pago (Enterprise), sin que podamos precisar aquí exactamente cuáles sin consultar su comparación oficial de ediciones. OpenPanel es la única 100% FOSS de las 3.",
    tradeoffsVsSaas:
      "Si lo que necesitas de Mixpanel es analytics de producto y nada más, Countly u OpenPanel cubren eso sin el resto del alcance de PostHog. Si además quieres feature flags y experimentos A/B en la misma herramienta, PostHog es la única que los incluye de fábrica — pero eso también significa operar una plataforma más grande, no solo \"analytics con más RAM\".",
  },
  "Heroku→self-hosted": {
    intent: "self-hosted",
    intro:
      "Auto-alojar una alternativa a Heroku no es auto-alojar una aplicación — es auto-alojar la plataforma que va a desplegar y gestionar todas tus futuras aplicaciones. Esa diferencia cambia lo que necesitas saber antes de instalar cualquiera de las 4 opciones del catálogo.",
    operationalNotes:
      "Ninguna de las 4 se instala con un docker-compose.yml simple — las 4 se instalan con su propio script oficial, que toma el control de Docker sobre el servidor completo (Coolify y Dokploy lo advierten explícitamente: inspecciona el script antes de ejecutarlo, nunca lo hagas con un pipe directo a ciegas). Esto es compartido por las 4 y es lo primero que hay que entender: le estás confiando a este software la gestión de todo lo que despliegues después, no solo de una app.\n\nCoolify es la más pulida y de mayor alcance — deploy desde Git con un clic, bases de datos gestionadas, gestión de varios servidores desde un panel. CapRover es la más ligera: un PaaS sobre Docker Swarm pensado para VPS modestos, con marketplace de apps de un clic y HTTPS automático. Dokku es el \"mini-Heroku\" original: una sola línea de comandos, despliega con git push, sin panel web oficial — el más minimalista del grupo. Dokploy es el más reciente: Docker Swarm con integración nativa de Traefik para dominios y HTTPS, plantillas de un clic para decenas de apps — su comunidad crece rápido pero tiene menos años en producción que Coolify o CapRover.",
    tradeoffsVsSaas:
      "Dos de las cuatro (Coolify y Dokploy) también cubren casos de uso parecidos a Vercel además de Heroku — no porque Heroku y Vercel sean lo mismo, sino porque estas dos herramientas en concreto soportan bien el patrón de deploy de aplicaciones frontend con vista previa por rama. Si eso es justo lo que buscas, vale la pena saberlo; si buscas específicamente reemplazar Heroku para desplegar apps backend con buildpacks clásicos, Dokku es la opción más fiel al modelo original.",
  },
  "Heroku→open-source": {
    intent: "open-source",
    intro:
      "De las 4 alternativas self-hosted a Heroku, solo Coolify y Dokku son 100% FOSS — CapRover y Dokploy son Open-Core. Aquí el argumento de auditabilidad pesa más que en otras categorías: un PaaS gestiona las credenciales y los secretos de todas las aplicaciones que despliegues con él, no solo los suyos propios.",
    licenseAngle:
      "Coolify (Apache-2.0) y Dokku (MIT) son proyectos completamente FOSS, sin una versión \"Cloud\" de pago con funciones exclusivas. Dokploy es el caso más claro de lo que se pierde al elegir Open-Core en esta categoría: su propia ficha indica que Dokploy Cloud (la versión gestionada) es de pago, mientras que la versión self-hosted requiere tu propio servidor — un incentivo de negocio explícito detrás del proyecto. El detalle completo de instalación y alcance de las 4 herramientas (Coolify, CapRover, Dokku, Dokploy) está en la página self-hosted de Heroku — aquí nos centramos en por qué la licencia importa específicamente para este tipo de software.",
    tradeoffsVsSaas:
      "Dentro del subconjunto 100% FOSS, Coolify y Dokku siguen siendo muy distintos entre sí: Coolify es la opción más completa y pulida (deploy con un clic, panel multi-servidor); Dokku es el enfoque más minimalista, sin panel web oficial, desplegando con un simple git push. La licencia FOSS no borra esa diferencia de alcance — elegir \"solo FOSS\" todavía te deja decidiendo entre una plataforma completa y una herramienta deliberadamente pequeña.",
  },
  "Google Drive→self-hosted": {
    intent: "self-hosted",
    intro:
      "Sustituir Google Drive por algo auto-alojado obliga a decidir primero qué papel cumple el servidor en el ciclo de vida de tus archivos: que los almacene y gestione de principio a fin, o que simplemente te dé una ventana unificada sobre un almacenamiento que ya existe en otro sitio. Las 3 alternativas del catálogo responden a esa pregunta de formas completamente distintas.",
    operationalNotes:
      "Nextcloud es la opción de mayor alcance: además de archivos incluye calendario, contactos, edición colaborativa de documentos y videollamadas — una suite de productividad, no solo almacenamiento. ownCloud es, así lo plantea el propio proyecto, el origen del que nació Nextcloud, pero la versión que recoge el catálogo es su reescritura reciente (Infinite Scale / oCIS): una arquitectura nueva con un ecosistema de apps más reducido que el de Nextcloud. Filestash es un caso distinto por completo: no almacena nada — es una interfaz web que se conecta a backends que ya existen (S3, FTP, SFTP, WebDAV, tu propio Google Drive) y te da una experiencia de navegación unificada sobre ellos.\n\nEsa última distinción importa para decidir: si no tienes ya un almacenamiento que conectar, Filestash no te sirve como sustituto de Google Drive por sí solo — necesitas un backend detrás. Nextcloud y ownCloud sí son sistemas de almacenamiento completos por sí mismos, con su propia base de datos y sus propios archivos.",
    tradeoffsVsSaas:
      "No hay datos en el catálogo que respalden que ownCloud sea más rápido o más ligero que Nextcloud — lo único verificado es que su ecosistema de apps es menor, consecuencia de ser una reescritura más reciente y enfocada. Tampoco hay datos sobre qué tan segura es la interfaz de Filestash frente a alojar tu propio almacenamiento — son arquitecturas distintas, no una escala de confianza. Elegir entre las 3 depende de si ya tienes algo que conectar (Filestash), quieres la suite más completa (Nextcloud), o prefieres una base más reducida y reciente (ownCloud).",
  },
  "Google Photos→self-hosted": {
    intent: "self-hosted",
    intro:
      "Auto-alojar tu fototeca reparte el problema en dos momentos distintos: la captura, con el móvil respaldando solo sin intervención tuya, o la biblioteca que ya tienes, organizándola y haciéndola buscable sin que nada la toque. Las 2 alternativas del catálogo resuelven cada momento por separado — no son la misma herramienta con distinto nombre.",
    operationalNotes:
      "Immich está centrado en el backup automático: sus apps móviles suben fotos y vídeos a tu servidor en cuanto los haces, con reconocimiento facial y búsqueda por objetos para encontrarlos después. Según sus propias notas, soporta aceleración por hardware opcional tanto para transcodificación de vídeo como para el reconocimiento facial — ninguna de las dos es obligatoria, se activan aparte si tienes GPU disponible. PhotoPrism está centrado en organizar una biblioteca que ya tienes: etiqueta automáticamente por IA y permite búsqueda semántica, pero — documentado en el catálogo — nunca modifica ni mueve los archivos originales.\n\nSobre la licencia de PhotoPrism conviene ser precisos: el catálogo la clasifica como \"Source-available (non-OSI)\" — el código es visible, pero la licencia en sí no está aprobada por la OSI como código abierto. Es una categoría distinta de la de Immich, que sí es 100% FOSS (AGPL-3.0).",
    tradeoffsVsSaas:
      "Ser FOSS no es una garantía de privacidad o seguridad — es una propiedad de la licencia del código, no una medida de cuánto protege tus fotos. Si lo que necesitas es que el móvil respalde automáticamente sin pensarlo, Immich responde a eso directamente. Si ya tienes una biblioteca de fotos y solo quieres organizarla sin que nada la toque, PhotoPrism cubre ese caso — con la salvedad de su licencia source-available.",
  },
  "Google Docs→self-hosted": {
    intent: "self-hosted",
    intro:
      "Migrar la edición colaborativa de documentos a un servidor propio obliga a fijar primero el alcance del dato: ¿solo texto en tiempo real, o todo el ciclo ofimático con hojas de cálculo y presentaciones incluido? Y en este caso concreto hay un segundo eje que también importa: qué llega a leer ese servidor del contenido que aloja.",
    operationalNotes:
      "Etherpad cubre específicamente edición colaborativa de texto en tiempo real — tal como especifica el propio proyecto, \"no tiene hojas de cálculo ni presentaciones, solo texto\". No es una versión incompleta de una suite ofimática: es una herramienta con un alcance deliberadamente más específico, pensada para notas compartidas rápidas, no para sustituir todo Google Workspace. CryptPad cubre mucho más: documentos, hojas de cálculo, presentaciones, formularios y kanban en la misma plataforma.\n\nLa segunda diferencia es arquitectónica: CryptPad cifra el contenido de extremo a extremo, de forma que el servidor que lo aloja no puede leer lo que hay dentro de los documentos — es un hecho de diseño, verificable en que CryptPad ni siquiera usa una base de datos tradicional (guarda todo como archivos cifrados). Etherpad no tiene ese diseño: su servidor sí puede leer el contenido, guardado en una base de datos relacional normal.",
    tradeoffsVsSaas:
      "Esto no es una afirmación de que CryptPad sea \"más seguro\" en abstracto — es un hecho arquitectónico concreto (el servidor no puede leer el contenido en claro) que puede importarte o no según tu caso. Si solo necesitas notas colaborativas rápidas, Etherpad es más simple de desplegar y mantener. Si necesitas una suite completa y que el cifrado sea parte del diseño desde el servidor, CryptPad es la opción que lo ofrece.",
  },
  "Zendesk→self-hosted": {
    intent: "self-hosted",
    intro:
      "Sustituir Zendesk por una alternativa auto-alojada obliga a fijar primero el modelo de atención: conversación en tiempo real por una bandeja compartida, o una cola de tickets con SLAs y base de conocimiento detrás. Las 2 alternativas del catálogo no son variantes del mismo producto — cada una está construida alrededor de un modelo distinto.",
    operationalNotes:
      "Chatwoot centra su producto en una bandeja compartida omnicanal — web, email, WhatsApp, Instagram — con chatbots y respuestas automáticas, pensada para conversación en tiempo real con el cliente. Zammad centra el suyo en tickets de soporte tradicionales, con base de conocimiento integrada y automatizaciones con SLAs — un modelo de cola, no de conversación inmediata. Zammad además usa Elasticsearch junto a PostgreSQL, un servicio adicional que Chatwoot no requiere.\n\nSobre la licencia hay un matiz que vale la pena no pasar por alto: Chatwoot tiene licencia MIT — una de las más permisivas que existen — pero en nuestra clasificación es Open-Core, no FOSS, porque, tal como especifica el proyecto, \"algunas integraciones de IA solo están en el plan cloud\". La licencia del código y el modelo de negocio Open-Core son dos cosas distintas: una licencia permisiva no impide que el proyecto reserve funciones para su plan de pago. Zammad, en cambio, sí es 100% FOSS (AGPL-3.0).",
    tradeoffsVsSaas:
      "La idoneidad depende del canal por el que entra la mayoría de tus conversaciones con clientes: si es chat en vivo o redes sociales, el modelo de bandeja compartida de Chatwoot encaja directamente con eso. Si tu soporte se organiza sobre todo en colas de tickets con acuerdos de nivel de servicio, el modelo de Zammad —con su base de conocimiento y automatizaciones— es el que está pensado para ese flujo.",
  },
  "Retool→self-hosted": {
    intent: "self-hosted",
    intro:
      "Reemplazar un constructor de paneles internos auto-hospedado divide a los equipos según su flujo de trabajo real: código primero, o interfaz visual primero. Las 3 alternativas del catálogo se dividen exactamente por ahí.",
    operationalNotes:
      "Windmill, tal como especifica el proyecto, \"ejecuta código real, no solo low-code visual\": escribes scripts en Python, TypeScript o Go, y a partir de ahí genera paneles y flujos. Budibase y Appsmith son editores visuales de arrastrar y soltar — Appsmith, de hecho, se describe en el catálogo como \"muy similar a Retool\" en su forma de trabajar.\n\nComo consecuencia práctica de esas arquitecturas distintas, cada una usa un motor de base de datos distinto para sus propios metadatos: Windmill sobre PostgreSQL, Budibase sobre CouchDB (una base de documentos poco habitual en este catálogo) y Appsmith sobre MongoDB — administrar cada una implica familiarizarte con un motor distinto, no solo con la interfaz de la herramienta.",
    tradeoffsVsSaas:
      "La elección responde a con qué perfil cuenta el equipo: código real (Windmill) exige tener quien programe, a cambio de control total sobre lo que se construye; un editor puramente visual (Budibase, Appsmith) permite prototipar sin escribir código, a costa de quedarte limitado cuando necesitas algo que el editor no contempla.",
  },
  "Shopify Plus→self-hosted": {
    intent: "self-hosted",
    intro:
      "Plantear una alternativa auto-alojada a un tier enterprise como Shopify Plus significa asumir el control total de la infraestructura para eliminar las restricciones de la API, personalizar el checkout al detalle o gestionar catálogos B2B complejos que los planes SaaS estandarizados no están pensados para cubrir.",
    operationalNotes:
      "Las dos opciones reflejan estrategias de escalado distintas. Magento Open Source (PHP) ofrece un motor monolítico denso y probado en años de producción, pensado para catálogos masivos con atributos complejos y estructuras B2B/B2C nativas — su propia ficha lo señala como \"el más potente para catálogos B2B/B2C muy grandes\", a cambio de requisitos de servidor considerablemente más altos que el resto de e-commerce del catálogo. Saleor (Python/Django) apuesta por comercio \"composable\": una arquitectura API-first en GraphQL con eventos vía webhooks, pensada para conectarse con sistemas externos y servir varios frontends a la vez — el propio proyecto la describe como diseñada para tiendas de tráfico muy alto, lo cual es una afirmación de diseño del proyecto, no una garantía de rendimiento medida por nosotros.\n\nEn infraestructura: Saleor corre sobre PostgreSQL y Redis; Magento corre sobre MySQL y Elasticsearch para la búsqueda del catálogo — ambos motores reaparecen en la conversación sobre mantenimiento a continuación.",
    tradeoffsVsSaas:
      "El coste real de dejar un SaaS enterprise no es el desarrollo inicial, sino el mantenimiento continuo. Ganas soberanía total sobre tus datos y dejas de depender de comisiones ligadas al volumen de ventas de tu plan, pero heredas la responsabilidad crítica del rendimiento: tu equipo tendrá que configurar balanceadores de carga, afinar las capas de caché (Redis en Saleor, Elasticsearch en Magento) para aguantar picos de tráfico como el Black Friday, y asegurar la infraestructura de pagos para mantener el cumplimiento PCI-DSS — esa responsabilidad, en el SaaS, la asume Shopify; aquí pasa a ser tuya.",
  },
  "Jira→self-hosted": {
    intent: "self-hosted",
    intro:
      "Jira es conocido por su complejidad configurable, y las 3 alternativas self-hosted del catálogo no son intercambiables entre sí — cada una está pensada para un nivel distinto de esa complejidad, no para sustituir a Jira en general.",
    operationalNotes:
      "Taiga cubre gestión ágil con Scrum y Kanban, backlog e historias de usuario — documentado en su propia entrada del catálogo con una \"curva de aprendizaje mucho menor que Jira\", pensada para equipos que quieren esa simplicidad sin el resto del aparato de Jira. OpenProject va en la dirección opuesta: además de backlogs ágiles añade diagramas de Gantt interactivos y hoja de tiempos y presupuestos — especifica el proyecto que es \"el más completo para gestión de proyectos tradicional + ágil\", pensado para equipos grandes con necesidades de planificación más formales que las de Jira estándar.\n\nPlane queda en un punto intermedio entre las dos: ciclos, módulos y vistas Kanban, lista, calendario y Gantt con una interfaz más moderna, sin llegar a la profundidad de presupuestos y hoja de tiempos de OpenProject ni quedarse en la simplicidad deliberada de Taiga. Las 3 herramientas son auto-hospedables con Docker y usan PostgreSQL como base de datos.",
    tradeoffsVsSaas:
      "La idoneidad depende del marco de trabajo del equipo: uno que operaba con Kanban/Scrum básico en Jira probablemente encuentra sobredimensionado todo lo que añade OpenProject; uno que dependía de Gantt y presupuestos en Jira probablemente sí lo necesita, y Taiga no se lo daría.",
  },
};
