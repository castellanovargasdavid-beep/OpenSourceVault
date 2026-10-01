import type { MigrationPatternContent } from "./migration-patterns";

/**
 * Contenido técnico real y específico por par (SaaS de origen → slug de la
 * herramienta destino), para las migraciones de más búsquedas donde el
 * patrón genérico por categoría (ver migration-patterns.ts) se queda corto.
 * Se comprueba antes que el patrón genérico — ver getMigrationContentForPair()
 * más abajo. Clave: `${fromName}→${toSlug}` (mismo `toSlug` que
 * OpenSourceTool.slug en src/data/tools.ts).
 *
 * Los textos usan {from} y {to} como tokens a sustituir en tiempo de render,
 * igual que los patrones genéricos.
 */
export const pairOverrides: Record<string, MigrationPatternContent> = {
  "Notion→appflowy": {
    intro:
      "La exportación de Notion en Markdown es completa a nivel de texto, pero las bases de datos relacionales (relations, rollups, fórmulas) llegan como CSV plano — el trabajo real está en decidir qué relaciones merece la pena reconstruir a mano en {to}.",
    steps: [
      {
        title: "Antes de exportar: audita qué páginas usan bases de datos con relaciones",
        body: "En {from}, revisa qué bases de datos tienen columnas de tipo \"Relation\" o \"Rollup\" — son las que perderán la conexión al exportar. Anota manualmente qué tablas están relacionadas entre sí; el CSV exportado no lo indica de forma explícita, solo repite el título de la página relacionada como texto.",
      },
      {
        title: "Exporta el workspace completo desde {from}",
        body: "Ve a Ajustes y miembros → Ajustes → Exportar contenido → \"Exportar todo el espacio de trabajo\" (requiere plan de pago), elige formato Markdown & CSV, e incluye los archivos adjuntos. {from} genera un .zip con una carpeta por página de nivel superior y subcarpetas anidadas para las subpáginas, más un .csv por cada base de datos.",
      },
      {
        title: "Despliega {to} con AppFlowy Cloud vía Docker Compose",
        body: "{to} se auto-hospeda como AppFlowy Cloud, que necesita PostgreSQL (ver el docker-compose.yml de su ficha). Antes de importar nada, arranca el stack, crea tu cuenta de administrador y confirma que el cliente de escritorio/web se conecta correctamente apuntando a la URL de tu servidor en Ajustes → Servidor personalizado.",
      },
      {
        title: "Importa el .zip de Markdown en {to}",
        body: "Con el espacio de trabajo ya abierto en {to}, usa la opción de importar desde Markdown (menú del espacio → Importar) y selecciona el .zip exportado. {to} reconstruye la jerarquía de páginas y el texto con formato, pero cada .csv de base de datos entra como una tabla nueva sin las columnas de relación reconstruidas.",
      },
      {
        title: "Reconstruye las relaciones y revisa los adjuntos",
        body: "Usando la lista que hiciste en el paso 1, vuelve a crear a mano cada columna de relación entre las nuevas bases de datos en {to} y re-enlaza los registros por título. Comprueba también que las imágenes y archivos adjuntos se importaron — algunos exports antiguos de {from} enlazan adjuntos por URL externa en vez de incluirlos en el .zip.",
      },
    ],
    beforeYouCancel:
      "Antes de cancelar {from}, compara el número de páginas de nivel superior entre ambos espacios y abre al menos una base de datos con relaciones para confirmar que no falta ningún registro — los rollups y fórmulas no se recrean solos, tendrás que rehacerlos si los necesitas.",
  },

  "Notion→affine": {
    intro:
      "La exportación de Notion en Markdown trae bien el texto, pero las bases de datos relacionales llegan como CSV plano — y {to} añade algo que {from} no tiene de forma nativa: una pizarra infinita en el mismo lienzo que tus documentos.",
    steps: [
      {
        title: "Antes de exportar: audita qué bases de datos usan relaciones",
        body: "En {from}, revisa qué bases de datos tienen columnas \"Relation\" o \"Rollup\" — perderán la conexión al exportar. Anota qué tablas están relacionadas entre sí, porque el CSV exportado no lo indica de forma explícita.",
      },
      {
        title: "Exporta el workspace completo desde {from}",
        body: "Ve a Ajustes y miembros → Ajustes → Exportar contenido → \"Exportar todo el espacio de trabajo\", elige formato Markdown & CSV e incluye los adjuntos. {from} genera un .zip con una carpeta por página de nivel superior.",
      },
      {
        title: "Despliega {to} vía Docker Compose",
        body: "{to} necesita PostgreSQL y Redis (ver el docker-compose.yml de su ficha). Antes de importar nada, arranca el stack y confirma que el cliente web/escritorio se conecta correctamente a tu servidor.",
      },
      {
        title: "Importa el .zip de Markdown en {to}",
        body: "Con el workspace ya abierto en {to}, importa el .zip exportado. El texto y la jerarquía de páginas se reconstruyen, pero cada .csv de base de datos entra como una tabla nueva sin las relaciones reconstruidas.",
      },
      {
        title: "Reconstruye relaciones y explora el whiteboard",
        body: "Usando la lista del paso 1, vuelve a crear a mano cada relación entre bases de datos en {to}. Después, prueba la pizarra infinita integrada — es la función que {from} no ofrece nativamente y el motivo más común para migrar, no una conversión de contenido existente.",
      },
    ],
    beforeYouCancel:
      "Antes de cancelar {from}, compara el número de páginas de nivel superior entre ambos espacios y confirma que las imágenes y adjuntos se importaron. El self-host oficial de {to} todavía evoluciona rápido entre versiones — revisa el changelog antes de cada actualización y mantén un backup reciente del volumen de Postgres.",
    metaTitle: "Migrar de {from} a {to}: documentos y pizarra en un solo lienzo ({year})",
    metaDescription:
      "Guía paso a paso para migrar de {from} a {to}: qué exporta Markdown, cómo reconstruir relaciones y qué esperar del self-host antes de cancelar {from}.",
    faqs: [
      {
        q: "¿Puedo importar mis bases de datos de Notion con relaciones a AFFiNE?",
        a: "No automáticamente. El CSV exportado llega como tabla plana sin las columnas de relación ni rollup — tendrás que recrear esas conexiones a mano en AFFiNE después de importar.",
      },
      {
        q: "¿Qué ofrece AFFiNE que Notion no tiene?",
        a: "Una pizarra (whiteboard) infinita integrada en el mismo lienzo que los documentos, para diagramas o lluvia de ideas visual sin salir de la app — Notion no tiene un equivalente nativo.",
      },
      {
        q: "¿Es estable para un equipo en producción?",
        a: "El self-host oficial de AFFiNE todavía evoluciona rápido entre versiones. Es una buena opción para uso personal o equipos pequeños que no dependen de una API o integración estable a largo plazo; haz backups frecuentes del volumen de Postgres.",
      },
    ],
  },

  "Google Analytics→plausible": {
    intro:
      "A diferencia de otras migraciones de analítica, aquí sí existe una vía real de importar el histórico — pero solo cubre métricas agregadas (visitas, páginas, fuentes), no el detalle a nivel de sesión ni los perfiles demográficos de Google Signals.",
    steps: [
      {
        title: "Antes de nada: activa la API de Google Analytics Data",
        body: "En Google Cloud Console, en el proyecto vinculado a tu propiedad de {from} (GA4), activa la \"Google Analytics Data API\" — es un requisito previo para que {to} pueda leer tu histórico; sin ella, la importación falla silenciosamente al autorizar.",
      },
      {
        title: "Despliega {to} vía Docker Compose",
        body: "{to} necesita PostgreSQL y ClickHouse (ver el docker-compose.yml de su ficha) — ClickHouse es el motor real donde se agregan los eventos, no una opción cosmética. Configura primero BASE_URL con tu dominio final antes de generar ningún script de seguimiento.",
      },
      {
        title: "Sustituye el snippet de {from} por el de {to}",
        body: "Reemplaza el gtag.js/analytics.js de {from} por el script de {to} (`<script defer data-domain=\"tudominio.com\" src=\"https://analytics.tudominio.com/js/script.js\"></script>`). Mantén ambos scripts activos en paralelo 2-3 semanas para comparar cifras de tráfico antes de depender solo de {to}.",
      },
      {
        title: "Importa el histórico vía la Google Analytics Data API",
        body: "En {to}, ve a Ajustes del sitio → Importar y exportar → Importar desde Google Analytics, autoriza el acceso OAuth a la propiedad GA4 correcta y elige el rango de fechas. La importación trae visitas, páginas más vistas y fuentes de tráfico agregadas — no trae eventos personalizados ni datos a nivel de usuario individual.",
      },
      {
        title: "Reescribe los eventos personalizados a mano",
        body: "Cada llamada `gtag('event', ...)` de {from} en tu código necesita reescribirse como `plausible('NombreDelEvento', {props: {...}})` de {to} — no hay conversión automática. Localiza cada evento personalizado que uses (conversiones, clics en CTA) y añade la llamada equivalente antes de retirar {from} del todo.",
      },
    ],
    beforeYouCancel:
      "Antes de cancelar {from}, exporta también los informes de audiencia/demografía (Google Signals) que uses para reportes internos — {to} no ofrece ese tipo de perfilado por diseño (es parte de por qué es más privado), así que esos datos no tienen equivalente y desaparecen al cerrar la cuenta.",
  },

  "1Password→vaultwarden": {
    intro:
      "El momento de mayor riesgo no es desplegar {to} — es el rato en que tu bóveda entera existe como un archivo sin cifrar en tu disco. Trátalo como si fuera la propia contraseña maestra.",
    steps: [
      {
        title: "Antes de exportar: prepara un entorno de confianza",
        body: "Haz la exportación y la importación desde el mismo ordenador de confianza, sin conexión a redes públicas, y ten listo un método para borrar el archivo de forma segura (no solo a la papelera) en cuanto termines — no lo subas a ningún servicio en la nube de por medio.",
      },
      {
        title: "Exporta tu bóveda de {from} en formato .1pux",
        body: "Desde la app de escritorio de {from} (no la extensión del navegador): Archivo → Exportar → Todos los elementos → formato .1pux. Este formato conserva tipos de campo, carpetas y notas seguras mejor que un CSV plano — usa CSV solo si tu versión de {from} no ofrece .1pux.",
      },
      {
        title: "Despliega {to} vía Docker Compose y crea el primer usuario",
        body: "{to} viene con `SIGNUPS_ALLOWED=false` por defecto (correcto para producción). Actívalo temporalmente (`SIGNUPS_ALLOWED=true`), crea tu cuenta de administrador desde el cliente web de Bitwarden apuntando a tu dominio, y vuelve a desactivarlo inmediatamente después — {to} no tiene su propia interfaz, usa los clientes oficiales de Bitwarden configurados con la URL de tu servidor.",
      },
      {
        title: "Importa el .1pux desde el cliente web/escritorio de Bitwarden",
        body: "Con el cliente ya apuntando a tu servidor {to}, ve a Herramientas → Importar datos, elige \"1Password (1pux)\" como formato de origen y selecciona el archivo. Bitwarden reconoce ese formato de forma nativa — no hace falta convertirlo antes.",
      },
      {
        title: "Verifica, y solo entonces borra el archivo exportado",
        body: "Compara el número de elementos importados contra tu bóveda original en {from} y abre unos cuantos al azar para confirmar que los campos y contraseñas se ven completos. Solo cuando lo hayas verificado, borra el .1pux de forma segura de cualquier disco donde haya estado.",
      },
    ],
    beforeYouCancel:
      "Antes de cancelar {from}, rota las contraseñas de tus cuentas más críticas (email principal, banca, el propio dominio) ya desde {to} — no porque el export en sí sea inseguro, sino para confirmar que el flujo de autenticación con tu nueva bóveda funciona de extremo a extremo antes de depender solo de ella. El historial de versiones anteriores de cada contraseña en {from} no se exporta — si lo necesitas, solo existe mientras la cuenta siga activa.",
    metaTitle: "Migrar de {from} a {to}: exporta tu bóveda .1pux de forma segura ({year})",
    metaDescription:
      "Guía paso a paso para migrar de {from} a {to}: exporta tu bóveda en formato .1pux, despliégala con Bitwarden y bórrala de forma segura al terminar.",
    faqs: [
      {
        q: "¿Qué cliente uso para acceder a Vaultwarden?",
        a: "Vaultwarden no tiene interfaz propia: usa los clientes oficiales de Bitwarden (navegador, escritorio, móvil) apuntando a la URL de tu servidor, igual que harías con Bitwarden Cloud.",
      },
      {
        q: "¿Por qué SIGNUPS_ALLOWED está desactivado por defecto?",
        a: "Por seguridad: en producción no quieres que cualquiera con la URL pueda crearse una cuenta en tu servidor. Actívalo solo temporalmente para crear tu primer usuario y vuelve a desactivarlo después.",
      },
      {
        q: "¿Es seguro el archivo .1pux exportado?",
        a: "No, el archivo exportado está sin cifrar. Haz la exportación e importación en un ordenador de confianza sin conexión a redes públicas, y bórralo de forma segura (no solo a la papelera) en cuanto confirmes que la importación fue correcta.",
      },
    ],
  },

  "Google Photos→immich": {
    intro:
      "Google Takeout exporta tus fotos, pero una parte importante de los metadatos (fecha real, geolocalización) vive en un .json junto a cada foto, no en el EXIF del propio archivo — el importador que uses tiene que saber leer ese .json, o las fechas saldrán mal.",
    steps: [
      {
        title: "Solicita la exportación en Google Takeout",
        body: "En takeout.google.com, deselecciona todo excepto \"Google Photos\", y elige un tamaño de archivo máximo (50GB es razonable) para que Google divida el export en varios .zip descargables en vez de uno solo gigante.",
      },
      {
        title: "Despliega {to} vía Docker Compose",
        body: "{to} necesita PostgreSQL con la extensión pgvector (imagen `tensorchord/pgvecto-rs`, ya incluida en su docker-compose.yml) y Redis. Antes de subir nada, monta el volumen de subida (`immich_uploads`) en un disco con espacio real para toda tu biblioteca, no en el disco del sistema.",
      },
      {
        title: "Sube las fotos con immich-go, no con el CLI oficial a secas",
        body: "El CLI oficial de {to} sube carpetas de fotos, pero no interpreta los .json de Takeout. La herramienta de la comunidad `immich-go` sí — lee cada .json junto a su foto y corrige la fecha/geolocalización real antes de subir, además de manejar las carpetas \"Fotos de AAAA\" de Takeout como álbumes. Revisa las flags exactas de tu versión con `immich-go --help`, ya que cambian entre releases.",
      },
      {
        title: "Verifica una muestra de Motion Photos y álbumes compartidos",
        body: "Los Motion Photos/fotos en movimiento de Google/Pixel a veces se importan como una foto y un vídeo separados en vez del formato animado original — revisa unos cuantos ejemplos tras la subida. Los álbumes compartidos con otras personas en {from} no se migran como compartidos: tendrás que volver a compartirlos manualmente desde {to}.",
      },
      {
        title: "Reetiqueta caras y revisa duplicados",
        body: "{to} ejecuta su propio reconocimiento facial desde cero al importar — los nombres de persona que asignaste en {from} no se transfieren, tendrás que volver a etiquetar a la gente. Revisa también si Takeout duplicó algún archivo (pasa con fotos editadas que Google guarda dos veces) antes de dar la migración por completa.",
      },
    ],
    beforeYouCancel:
      "Antes de cancelar {from}, compara el número total de fotos y vídeos entre ambos (Ajustes → Almacenamiento en {to} te da el conteo) — con bibliotecas grandes es fácil que algún .zip de Takeout falle a medio descargar sin que te des cuenta.",
  },

  "Slack→mattermost": {
    intro:
      "Qué tan completo es el export de {from} depende de tu plan: los planes Free/Pro solo exportan canales públicos, sin mensajes directos ni canales privados — si necesitas ese historial, tienes que estar en un plan Business+ o superior antes de exportar.",
    steps: [
      {
        title: "Confirma el alcance real de tu plan de {from} antes de prometer nada",
        body: "En Ajustes del espacio de trabajo → Importar/Exportar datos, comprueba qué tipo de exportación te ofrece tu plan actual. Si tu equipo espera recuperar DMs o canales privados y estás en un plan Free/Pro, no va a pasar — decidlo antes de anunciar la fecha de corte.",
      },
      {
        title: "Exporta el historial de {from}",
        body: "Genera la exportación desde el mismo panel — {from} entrega un .zip con un .json por canal y día, más `users.json` y `channels.json` con los metadatos. No hace falta descomprimirlo antes de subirlo a {to}.",
      },
      {
        title: "Despliega {to} vía Docker Compose",
        body: "{to} necesita PostgreSQL (ver el docker-compose.yml de su ficha). Antes de importar, crea ya las cuentas de los usuarios que vas a migrar — el importador de Slack vincula mensajes a usuarios existentes por email, no crea cuentas nuevas automáticamente en todos los casos.",
      },
      {
        title: "Importa con mmctl, no solo desde la consola web",
        body: "Como administrador, usa la CLI `mmctl`: `mmctl auth login`, luego `mmctl import upload archivo-slack.zip`, `mmctl import list uploads` (anota el ID que te devuelve) y `mmctl import process <id>` para lanzar el trabajo. La importación de un clic desde System Console existe, pero en varias versiones de Mattermost es una función de Enterprise — la vía por CLI funciona en la edición Team/OSS.",
      },
      {
        title: "Reconecta integraciones y revisa canales compartidos externos",
        body: "Los webhooks, bots y apps conectadas de {from} no se migran — tendrás que volver a crearlos apuntando a {to}. Los canales de Slack Connect (compartidos con otras empresas) tampoco tienen equivalente automático: esas conversaciones se quedan solo en {from}.",
      },
    ],
    beforeYouCancel:
      "Antes de cancelar {from}, verifica que el importador trajo los hilos y las reacciones con emoji correctamente en un par de canales de prueba — mmctl sí los soporta, pero conviene confirmarlo con tus propios datos antes de migrar al resto del equipo.",
  },

  // "Confluence→outline" ya está en Top 5 (posición 5.08) — toque quirúrgico
  // deliberado: el cuerpo (intro/pasos/beforeYouCancel) es IDÉNTICO al
  // patrón genérico "notes-docs" que esta guía ya usaba, verbatim, sin
  // reescritura. Solo se añade la capa de title/meta/FAQ — ver el encargo
  // "no reescritura masiva sin justificar" para páginas ya bien posicionadas.
  "Confluence→outline": {
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
    metaTitle: "Migrar de {from} a {to}: wiki de equipo con búsqueda instantánea ({year})",
    metaDescription:
      "Guía paso a paso para migrar de {from} a {to}: qué exporta cada espacio, cómo reparar enlaces internos, y qué revisar antes de cancelar {from}.",
    faqs: [
      {
        q: "¿Qué diferencia a Outline de Confluence?",
        a: "Outline es una wiki de equipo más rápida y ligera, con edición colaborativa en tiempo real, búsqueda instantánea y una estructura de colecciones más simple que los espacios de Confluence.",
      },
      {
        q: "¿Se migran los permisos de Confluence a Outline?",
        a: "No automáticamente — los permisos y miembros del workspace no se exportan. Tendrás que recrear los equipos en Outline y volver a invitar a cada persona con el rol adecuado.",
      },
      {
        q: "¿Qué pasa con los enlaces internos entre páginas?",
        a: "Los enlaces entre páginas (wikilinks) casi nunca se migran automáticamente entre plataformas distintas — después de importar, revisa las páginas más enlazadas y corrige las referencias rotas.",
      },
    ],
  },

  // "Confluence→bookstack" se diferencia deliberadamente de
  // "Confluence→outline" (mismo SaaS de origen, herramienta distinta) para
  // evitar canibalización: aquí el eje es la estructura jerárquica en
  // libros/capítulos/páginas y la licencia MIT, no la búsqueda/colaboración
  // en tiempo real que vende la guía de Outline.
  "Confluence→bookstack": {
    intro:
      "A diferencia de Outline, {to} organiza el contenido en una jerarquía fija de libros, capítulos y páginas — lo más laborioso al migrar no es el texto, sino decidir cómo mapear los espacios de {from} a esa estructura.",
    steps: [
      {
        title: "Planifica tu jerarquía de libros y capítulos antes de exportar",
        body: "{to} organiza todo en Libros → Capítulos → Páginas, una jerarquía más rígida que los espacios de {from}. Antes de exportar, decide qué espacio se convierte en qué libro — evita tener que reorganizar todo después de importar.",
      },
      {
        title: "Exporta cada página de {from} a HTML o Markdown",
        body: "Exporta página por página o espacio completo desde el menú de exportación de {from}. El editor WYSIWYG de {to} importa HTML de forma más fiable que Markdown para contenido con tablas o formato complejo.",
      },
      {
        title: "Crea la estructura de libros en {to} e importa el contenido",
        body: "Crea primero los libros y capítulos vacíos siguiendo tu plan del paso 1, y después pega o importa el contenido de cada página exportada en su lugar correspondiente.",
      },
      {
        title: "Configura permisos granulares por libro o capítulo",
        body: "{to} permite permisos granulares a nivel de libro, capítulo o página individual — revisa quién debía tener acceso a cada espacio en {from} y recréalo con ese mismo nivel de detalle.",
      },
    ],
    beforeYouCancel:
      "Antes de cancelar {from}, verifica que las imágenes y archivos adjuntos se importaron correctamente en cada página — el editor WYSIWYG de {to} los maneja distinto a los macros de adjuntos de {from}.",
    metaTitle: "Migrar de {from} a {to}: documentación en libros y capítulos ({year})",
    metaDescription:
      "Guía paso a paso para migrar de {from} a {to}: cómo planificar tu jerarquía de libros y capítulos, exportar páginas y configurar permisos antes de cancelar {from}.",
    faqs: [
      {
        q: "¿En qué se diferencia BookStack de Outline como alternativa a Confluence?",
        a: "BookStack organiza el contenido en una jerarquía fija de libros, capítulos y páginas — más simple y predecible que los espacios de Confluence u Outline. Tiene licencia MIT (Outline usa BUSL-1.1, no OSI) y corre sobre PHP/Laravel con MySQL, un stack más ligero.",
      },
      {
        q: "¿BookStack soporta permisos granulares?",
        a: "Sí, a nivel de libro, capítulo o página individual — útil para replicar quién tenía acceso a qué espacio en Confluence.",
      },
      {
        q: "¿Qué pasa con los adjuntos e imágenes al migrar?",
        a: "Se importan junto con el contenido HTML de cada página, pero el editor de BookStack los maneja distinto a los macros de adjuntos de Confluence — conviene revisar cada página tras importar, no solo el texto.",
      },
    ],
  },

  "ChatGPT Plus→open-webui": {
    intro:
      "A diferencia de otras migraciones, aquí no hay un export de {from} que se pueda re-importar tal cual en {to} — lo que cambia de verdad es dónde corre el modelo y quién ve tus conversaciones, no un archivo de datos.",
    steps: [
      {
        title: "Exporta tu historial de {from} solo como archivo de referencia",
        body: "Desde Ajustes → Controles de datos → Exportar datos en {from} puedes descargar un .json con tu historial — guárdalo como consulta, porque no hay una vía de re-importarlo directamente en {to}.",
      },
      {
        title: "Despliega {to} junto a un backend que ejecute el modelo",
        body: "{to} es solo la interfaz de chat: no ejecuta modelos por sí misma. La vía más simple es Ollama en un contenedor aparte (ver el docker-compose de su ficha) — funciona sin GPU, aunque una GPU acelera mucho la respuesta.",
      },
      {
        title: "Descarga al menos un modelo local con Ollama",
        body: "Ollama necesita que descargues un modelo (por ejemplo Llama o Mistral) antes de poder chatear desde {to} — el tamaño del modelo que elijas determina cuánta RAM/VRAM necesitas, no {to} en sí.",
      },
      {
        title: "O conecta {to} a una API remota compatible con OpenAI",
        body: "Si no quieres depender de hardware local, {to} también se conecta a cualquier API compatible con OpenAI (incluida la propia OpenAI) — pierdes la privacidad de un modelo 100% local, pero mantienes la misma interfaz con la calidad de un modelo comercial.",
      },
      {
        title: "Recrea tus prompts e instrucciones personalizadas",
        body: "Las \"custom instructions\" y prompts guardados de {from} no se migran automáticamente — revisa el .json del paso 1 y vuelve a guardarlos en {to}.",
      },
    ],
    beforeYouCancel:
      "Antes de cancelar {from}, prueba {to} con 3-5 tareas reales que ya resolvías antes — la calidad de respuesta depende por completo del modelo que elijas correr (local o remoto a través de una API), no es un dato fijo de {to}.",
    metaTitle: "Migrar de {from} a {to}: IA local y privada, paso a paso ({year})",
    metaDescription:
      "Guía para migrar de {from} a {to}: cómo desplegarlo con Ollama, correr modelos locales o conectar tu propia API, y qué esperar de la calidad de respuesta.",
    faqs: [
      {
        q: "¿Open WebUI necesita GPU?",
        a: "No es obligatoria. Open WebUI es solo la interfaz — la inferencia ocurre en Ollama u otro backend. Sin GPU funciona sobre CPU, pero una GPU acelera mucho la velocidad de respuesta.",
      },
      {
        q: "¿Puedo usar Open WebUI sin modelos 100% locales?",
        a: "Sí. También se conecta a cualquier API compatible con OpenAI (incluida la propia OpenAI), si prefieres la calidad de un modelo comercial sin cambiar de interfaz.",
      },
      {
        q: "¿Qué pierdo frente a ChatGPT Plus?",
        a: "La calidad de respuesta depende por completo del modelo que elijas correr — un modelo local pequeño no siempre iguala a los modelos comerciales más recientes, aunque conectar Open WebUI a una API comercial acerca mucho esa calidad sin perder la interfaz ni el control de tus prompts.",
      },
    ],
  },
};

/** Clave de búsqueda en `pairOverrides`/`pairOverridesEn` para un par (SaaS, herramienta) concreto. */
export function getPairOverrideKey(fromName: string, toSlug: string): string {
  return `${fromName}→${toSlug}`;
}
