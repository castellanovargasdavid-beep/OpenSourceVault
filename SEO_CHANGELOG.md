# SEO Changelog

Registro por URL de los cambios SEO quirúrgicos aplicados sobre páginas con
señal real en Google Search Console (impresiones + posición de striking
distance). Ver el encargo completo en el historial de conversación — "SEO
engineer + technical content engineer de AltFreeStack.com".

**Regla de reentrada**: no volver a tocar una URL de este changelog antes de
**14–28 días** desde su última fecha de cambio, salvo error técnico real
(404, noindex accidental, canonical roto, etc.). El objetivo es dejar que
Google re-rastree e indexe antes de volver a intervenir.

**Regla de datos**: todo el contenido añadido (FAQ, meta description, TL;DR)
procede de datos ya existentes en `src/data/tools.ts` / sus overrides de
idioma, o de verificación independiente contra fuentes oficiales de cada
proyecto (citadas inline donde aplica). Ningún precio, cifra de RAM,
benchmark o rating fue inventado.

---

## Batch 1 — implementado 2026-10-01

### 1. `/en/guias/migrar/1password/vaultwarden` → canónica real: `/en/guides/migrate/1password/vaultwarden`
- **Hallazgo previo a cualquier cambio**: la URL de la lista de prioridades es una ruta legacy (español bajo `/en/`) que ya redirige 301 a la canónica en `next.config.mjs` (`/en/guias/migrar/:from/:to` → `/en/guides/migrate/:from/:to`). Mismo patrón que el caso `/en/comparar/...` ya resuelto. Las impresiones residuales en la URL vieja son normales tras la migración de rutas; no hay contenido duplicado vivo.
- **Qué se cambió** (en la URL canónica): nuevo override de título/meta description en `migration-pair-overrides.ts` (clave `1Password→vaultwarden`); FAQ real (3 preguntas) con schema `FAQPage` en `migration-guide-content.tsx`, verificada contra el propio contenido ya existente de la guía (.1pux, `SIGNUPS_ALLOWED`, cliente Bitwarden).
- **Hipótesis a validar**: un title que nombra el formato de exportación real (.1pux) y la seguridad del proceso capta mejor la intención de "replacing 1password with vaultwarden" / "1password self hosted" que el title genérico "Cómo migrar de X a Y sin perder datos", mejorando CTR sin mover la posición (ya está en Top 10).

### 2. `/tool/vikunja`
- **Qué se cambió**: title/meta description curados en `tool-seo.ts`; FAQ real (3 preguntas) con schema `FAQPage`; corrección de dato: se añadió la vista "Tabla" a `features` (Vikunja tiene 4 vistas — List/Kanban/Gantt/Table confirmado en `vikunja.io/help/views`, no 3 como decía la ficha).
- **Hipótesis a validar**: la keyword secundaria "que es vikunja" se responde ahora explícitamente en la primera FAQ ("¿Qué es Vikunja?"), y el title menciona "4 vistas" como diferenciador real — debería mejorar la relevancia semántica para ambas keywords sin tocar el H1 (ya correcto).

### 3. `/en/compare/garage-vs-seaweedfs`
- **Hallazgo relacionado**: `/en/comparar/garage-vs-seaweedfs` (ítem #24 de la lista) es la misma ruta legacy español-bajo-`/en/` que ya redirige 301 a esta URL vía `next.config.mjs` (`/en/comparar/:pair` → `/en/compare/:pair`). Confirmado que no existe una ruta `/en/comparar/[pair]/page.tsx` real — no hay contenido duplicado vivo, solo índice residual de la URL antigua. Sin cambio de código necesario más allá de lo ya existente.
- **Qué se cambió**: nueva infraestructura reutilizable para comparativas (`compare-seo.ts`/`.en.ts`) — title/meta description curados, bloque TL;DR visible, FAQ real (4 preguntas, incluida licencia AGPL-3.0 vs Apache-2.0) con schema `FAQPage`, y un CTA hacia Stack Builder (nuevo, genérico para todas las comparativas, no solo esta).
- **Hipótesis a validar**: el TL;DR responde literalmente a "garage vs seaweedfs" en la primera frase visible — debería mejorar el featured snippet / posición 0 potencial para esa keyword exacta, que ya está en posición 7.2.

### 4. `/tool/typesense`
- **Qué se cambió**: title/meta description curados; FAQ real (3 preguntas, incluye despliegue Docker). Verificado que la imagen `typesense/typesense:30.2` ya fijada en el repo coincide con la última versión real — sin cambio de Docker necesario.
- **Hipótesis a validar**: la FAQ "¿Cómo se despliega Typesense con Docker?" capta directamente la keyword secundaria "typesense docker" como contenido visible, no solo como keyword en el title.

### 5. `/tool/vendure`
- **Corrección de dato (previa al SEO)**: `license` estaba como `"MIT"` en `src/data/tools.ts` — dato obsoleto. Vendure pasó de MIT a GPL-3.0 en su v3.0 (confirmado en el blog oficial de Vendure: "license-change-announcement" y "announcing-vendure-v2-3-v3-0"). Se corrigió a `"GPL-3.0"` y se eliminó el tag `"permissive-license"`, que ya no aplicaba.
- **Qué se cambió**: title/meta description curados; FAQ real (3 preguntas, incluida la licencia correcta y la ausencia de imagen Docker oficial, ya documentada en `notes`).
- **Hipótesis a validar**: corregir la licencia evita que la ficha afirme un dato verificablemente falso (riesgo de confianza/EEAT si un usuario lo comprueba), y la FAQ "¿Vendure tiene imagen Docker oficial?" responde de forma honesta algo que de otro modo frustraría a quien llega buscando "vendure open source" y copia el docker-compose sin leer la nota.

### 6. `/en/guides/migrate/notion/affine`
- **Qué se cambió**: nuevo override completo en `migration-pair-overrides.ts`/`.en.ts` (clave `Notion→affine`, no existía — caía al patrón genérico "notes-docs"): intro, 5 pasos específicos, aviso "antes de cancelar", title/meta description y FAQ (3 preguntas), todo derivado de los datos ya existentes de AFFiNE en `tools.ts` (Postgres+Redis, pizarra integrada, "el self-host oficial aún evoluciona rápido entre versiones").
- **Hipótesis a validar**: el title destaca "documentos y pizarra en un solo lienzo" — el diferenciador real de AFFiNE frente a Notion (y frente a AppFlowy/Outline) — en vez del title genérico idéntico a las otras ~150 guías de migración, lo que debería mejorar CTR para "notion alternative open source" / "notion open source" sin cambiar la intención de la página.

### 7. `/tool/wikijs`
- **Qué se cambió**: title/meta description curados; FAQ real (3 preguntas).
- **Hipótesis a validar**: el title nombra explícitamente "control de versiones Git", el diferenciador real de Wiki.js frente a otras wikis — debería mejorar relevancia para la keyword única "wikijs" al dar una razón concreta de clic.

### 8. `/tool/bagisto`
- **Qué se cambió**: title/meta description curados; FAQ real (3 preguntas, incluye comparación explícita con WooCommerce). Se descartó deliberadamente usar cifras de estrellas/adopción de terceros encontradas en la investigación SERP (no verificables contra el repo) — solo se usó `starsCount` ya existente si aparece en el texto, y aquí no se citó ningún número no verificado.
- **Hipótesis a validar**: la FAQ "Bagisto vs WooCommerce" responde directamente a la keyword secundaria "bagisto vs woocommerce" con una respuesta real (arquitectura Laravel independiente vs plugin de WordPress), algo que la ficha no cubría antes.

### 9. `/tool/gitlab-ce`
- **Qué se cambió**: title/meta description curados; FAQ real (3 preguntas, incluye RAM y comparación con Gitea) — usando únicamente el dato de RAM ya existente en `cons` ("4GB+ recomendado"), sin introducir las cifras de terceros encontradas en la investigación SERP.
- **Hipótesis a validar**: las keywords secundarias "servidor gitlab" y "gitlab ce vs gitea" ahora tienen respuesta directa y visible (requisito de RAM, comparación funcional) en vez de solo aparecer en el title — relevante para una página que hoy está en posición ~20, fuera de la primera página.

### 10. `/tool/focalboard`
- **Qué se cambió**: title/meta description curados; FAQ real (3 preguntas, incluye el ritmo de desarrollo tras la adquisición de Mattermost, ya divulgado honestamente en `cons`).
- **Hipótesis a validar**: el title nombra la licencia MIT como diferenciador (vs. Trello, que no es open source) — debería ayudar a quien busca específicamente "focalboard" a confirmar rápido que es gratuito y auto-hospedable.

---

## Infraestructura añadida (reutilizable para el resto del listado)

- `src/data/tool-seo.ts` / `.en.ts`: override opcional de `metaTitle` / `metaDescription` / `faqs` por ficha de herramienta (clave: `id`), con fallback automático a la plantilla genérica de `t.toolPage` cuando no existe entrada. Cero cambio para las ~189 fichas sin override.
- `src/data/compare-seo.ts` / `.en.ts`: mismo patrón para comparativas (clave: `pairSlug`), con un campo adicional `tldr` para el bloque de respuesta rápida. Cero cambio para el resto de comparativas.
- `MigrationPatternContent` (en `migration-patterns.ts`) ampliado con `metaTitle?` / `metaDescription?` / `faqs?` opcionales — mismo mecanismo de fallback, ahora disponible para cualquier par de `migration-pair-overrides.ts`.
- FAQ visible + schema `FAQPage` en fichas de herramienta, comparativas y guías de migración — antes solo existía en páginas de categoría y de alternativas.
- CTA hacia Stack Builder en la página de comparativas (antes no tenía ninguno) — aplica a **todas** las comparativas, no solo a las 30 prioritarias, porque es un componente genérico sin contenido inventado por par.
- `fillTemplate()` ahora acepta un tercer token `{year}` además de `{from}`/`{to}`.

## Correcciones de datos (no-SEO, descubiertas durante la auditoría)

- **Vendure**: `license: "MIT"` → `"GPL-3.0"` (Vendure relicenció en v3.0 — fuente: blog oficial de Vendure). Se eliminó el tag `"permissive-license"`, ya no aplicable.
- **Vikunja**: `features` ganó la vista "Tabla" — Vikunja tiene 4 vistas (List/Kanban/Gantt/Table), no 3, según su propia documentación (`vikunja.io/help/views`). Aplicado también en `tools.en.ts` para mantener paridad ES/EN.

## Decidido NO hacer, y por qué

- **No se tocó ninguna URL ni se creó ningún redirect nuevo**: los dos casos de URLs "duplicadas" (`/en/comparar/garage-vs-seaweedfs` e implícitamente `/en/guias/migrar/1password/vaultwarden`) ya eran rutas legacy correctamente resueltas con 301 existentes — tocar `next.config.mjs` aquí habría sido una refactorización innecesaria sobre algo que ya funciona.
- **No se reescribió el H1 de ninguna página**: en los 10 casos del Batch 1, el H1 generado por la plantilla (`{Tool}: alternativa {FOSS/Open-Core} a {SaaS} en {año}` para fichas; `{A} vs {B}: ¿cuál elegir?` para comparativas) ya coincide con la intención real de búsqueda — cambiarlo habría violado la regla explícita de "no cambiar la intención para perseguir una keyword irrelevante".
- **No se amplió el contenido de "qué es" / Above the fold más allá del H1 + descripción ya existentes** en ninguna de las 10 páginas: el análisis de intención (keywords tipo "tool-name", "tool-name docker", "tool vs competitor") es informacional/transaccional directo, no requiere un bloque largo de contexto adicional — la regla del encargo es "no aumentes la longitud salvo que falte información", y aquí no faltaba.
- **No se usaron las cifras de terceros encontradas en la investigación SERP** (estrellas de GitHub de fuentes externas para Bagisto, cifras de RAM de terceros para GitLab CE/Gitea, benchmarks de Garage/SeaweedFS) — solo datos ya presentes en el repo o verificados contra fuentes oficiales de primera mano (ej. licencia de Vendure, vistas de Vikunja).
- **No se tocó el `dockerCompose` de Vendure** (sigue referenciando `vendureio/server:latest`, una imagen que su propia nota ya dice que no existe en Docker Hub): es una inconsistencia conocida y ya divulgada honestamente (nota + con) desde el audit de Task 1 de Docker tags; cambiar el mecanismo de despliegue (p. ej. a `manual_setup`) es una decisión de arquitectura mayor que excede el alcance quirúrgico de esta tarea.
- **No se creó ninguna página nueva** para generar enlaces entrantes hacia las páginas prioritarias — se verificó con un script puntual (`getComparisonsForTool` + mapeo de `replaces` compartido) que cada ficha ya tiene varias páginas reales enlazando hacia ella: Vikunja (1 comparativa + hub de alternativas de Todoist/Asana + su propia guía de migración), Typesense (1 comparativa + hub de Algolia), Vendure (6 comparativas + hub de Shopify), WikiJS (3 comparativas + hub de Confluence), Bagisto (6 comparativas + hub de Shopify), GitLab CE (2 comparativas + hub de GitHub), Focalboard (1 comparativa + hub de Trello), Garage (2 comparativas + hub de Amazon S3), Vaultwarden (2 comparativas + hub de 1Password/LastPass + su guía de migración), AFFiNE (4 comparativas + hub de Notion + 1 guía `/replace/notion`). Todas cumplen de sobra el mínimo de 2–5 páginas existentes enlazando hacia cada prioritaria sin crear contenido nuevo solo para enlazar.
- **Batch 2 y el resto del listado (20 URLs restantes) no se tocaron todavía**, por instrucción explícita del usuario de no hacer una "mega optimización" de las 30 a la vez. Quedan pendientes para una siguiente iteración, respetando la ventana de 14–28 días sobre las páginas de este Batch 1.

---

## Tabla final — Batch 1

| URL | Posición antes | Impresiones antes | Cambios aplicados | Keyword principal | Objetivo SEO |
|---|---|---|---|---|---|
| `/en/guias/migrar/1password/vaultwarden` *(→ canónica `/en/guides/migrate/1password/vaultwarden`)* | 8.96 | 225 | Confirmado 301 legacy ya existente a la canónica; title/meta description curados + FAQ (3) con schema en la canónica | replacing 1password with vaultwarden | Top 3–5 |
| `/tool/vikunja` | 11.32 | 99 | Title/meta curados; FAQ (3) con schema; corrección de dato (4ª vista "Tabla") | vikunja | Top 5–8 |
| `/en/compare/garage-vs-seaweedfs` | 7.20 | 88 | Title/meta curados; TL;DR visible; FAQ (4) con schema; CTA Stack Builder | seaweedfs vs garage / garage vs seaweedfs | Top 3–5 |
| `/tool/typesense` | 10.86 | 96 | Title/meta curados; FAQ (3) con schema | typesense | Top 5–8 |
| `/tool/vendure` | 12.79 | 95 | Corrección de dato (licencia MIT→GPL-3.0); title/meta curados; FAQ (3) con schema | vendure | Top 5–8 |
| `/en/guides/migrate/notion/affine` | 7.58 | 83 | Nuevo override completo (intro, pasos, FAQ, title/meta) — antes caía al patrón genérico | notion alternative open source | Top 3–5 |
| `/tool/wikijs` | 13.27 | 82 | Title/meta curados; FAQ (3) con schema | wikijs | Top 5–8 |
| `/tool/bagisto` | 8.58 | 72 | Title/meta curados; FAQ (3, incluye vs WooCommerce) con schema | bagisto | Top 3–5 |
| `/tool/gitlab-ce` | 19.95 | 93 | Title/meta curados; FAQ (3, incluye RAM y vs Gitea) con schema | gitlab ce | Top 8–12 |
| `/tool/focalboard` | 13.44 | 55 | Title/meta curados; FAQ (3) con schema | focalboard | Top 5–8 |

*Posiciones e impresiones son las aportadas por el usuario desde Search Console al iniciar la tarea (periodo pre-cambio) — no se ha vuelto a consultar Search Console desde este repositorio, ya que no tiene acceso a esa cuenta.*

## Batch 2 — implementado 2026-10-01

Batch 1 (los 10 anteriores) **no se tocó** en esta ronda, salvo el fix genérico de "mostrar `tool.notes` en comparativas" (ver Infraestructura añadida más abajo), que es retrocompatible y no cambia ningún texto curado de Batch 1. Verificado con `git diff` antes de empezar: ningún archivo de Batch 1 fue revertido o reescrito.

### 11. `/tool/immich`
- **Posición antes / impresiones**: 15.52 / 65. **Keyword principal**: immich. **Secundarias**: immich docker, immich self hosted.
- **Intención**: informational + deployment ("qué es" + "cómo auto-hospedar").
- **SERP**: dominado por tutoriales de self-hosting independientes (linuxconfig.org, akashrajpurohit.com, fossengineer.com), ninguna comparación directa vs. otro self-hosted — todo es "Immich vs Google Photos" (el SaaS, no un competidor open source). Intención claramente how-to/docker.
- **Problemas encontrados**: ninguno técnico. El gap real es de contenido: la ficha no respondía explícitamente "¿necesito GPU?", algo que casi todos los tutoriales de la SERP cubren.
- **Cambios implementados**: title/meta description curados (`tool-seo.ts`); FAQ real (3 preguntas) con schema `FAQPage`, incluida la pregunta de GPU opcional (sourced del `notes` ya existente en `tools.ts`) y el detalle de despliegue (server + ML container + Postgres/pgvecto-rs + Redis).
- **Internal links**: ya enlazado desde su única comparativa (`immich-vs-photoprism`) y desde el hub de alternativas a Google Photos.
- **Fixes técnicos**: ninguno necesario (canonical/hreflang ya correctos).
- **Hipótesis CTR**: el title menciona "con IA" (reconocimiento facial/búsqueda inteligente, ya en sus features) como diferenciador concreto frente a un title genérico.
- **Hipótesis de ranking**: responder la pregunta de GPU explícitamente en el contenido visible (no solo en `notes`) debería mejorar relevancia semántica para "immich docker" y "immich self hosted", que son intents de instalación, no solo de descubrimiento.
- **Target**: Top 10, idealmente Top 5. **Fecha**: 2026-10-01.

### 12. `/en/compare/affine-vs-outline`
- **Posición antes / impresiones**: 7.26 / 46. **Keywords**: affine vs outline, outline vs affine.
- **Intención**: comparación directa, decisión de compra/adopción.
- **SERP**: muy competido — openalternative.co, dev.to, libhunt.com y un post específico ("Self-Hosted Notion Alternatives") ya cubren este par con detalle (maduración, enfoque, popularidad). Diferenciador recurrente: AFFiNE combina documentos+pizarra; Outline es wiki pura, más madura.
- **Problemas encontrados**: ninguno técnico — la página ya tenía tabla comparativa funcional pero sin FAQ, sin TL;DR y sin mencionar el diferenciador real (pizarra) de forma visible antes del scroll.
- **Cambios implementados**: `compare-seo.ts` — title/meta curados, TL;DR visible (pizarra vs wiki enfocada, licencia MIT vs BUSL-1.1), FAQ (4 preguntas) con schema `FAQPage`. **No** se citaron los recuentos de estrellas de GitHub de terceros encontrados en la SERP (69.750 vs 39.063) porque no coinciden con nuestro propio `starsCount` verificado (46.000 vs 30.000) — se dejó que la tabla ya existente siga mostrando nuestro propio dato, sin repetirlo en el FAQ.
- **Internal links**: ya enlazada desde 4 comparativas de AFFiNE y 6 de Outline, además de los hubs de alternativas a Notion/Confluence.
- **Fixes técnicos**: ninguno.
- **Hipótesis CTR**: el title "documentos + pizarra vs wiki de equipo" resume la decisión en el propio snippet, evitando que el usuario tenga que entrar a averiguarlo.
- **Hipótesis de ranking**: la licencia (MIT real vs. BUSL-1.1 no-OSI) es un diferenciador que ningún competidor de la SERP investigada menciona explícitamente — cubrirlo con precisión puede capturar la cola larga de quien busca "cuál es realmente open source".
- **Target**: Top 3–5. **Fecha**: 2026-10-01.

### 13. `/tool/garage`
- **Posición antes / impresiones**: 8.37 / 46. **Keywords**: garage s3, garage docker, garage object storage.
- **Intención**: deployment/self-hosting directo ("qué es" + "cómo desplegar").
- **SERP**: dominada por el repo oficial de GitHub, Docker Hub y tutoriales de self-hosting (glukhov.org, korben.info) — ninguna comparación vs. otro competidor en esta query concreta (la comparación vive en la query "garage vs seaweedfs", ya tratada en Batch 1/#24).
- **Problemas encontrados**: ninguno técnico.
- **Cambios implementados**: title/meta curados; FAQ (3 preguntas) con schema, incluida compatibilidad S3 y el tipo de cluster objetivo — sourced de `pros`/`cons`/`features` ya existentes. **No** se usaron las cifras de RAM/disco de terceros encontradas en la SERP (~1GB RAM, 16GB disco) porque no están verificadas contra nuestro propio pipeline de cómputo de RAM.
- **Internal links**: ya enlazada desde 2 comparativas (`garage-vs-minio`, `garage-vs-seaweedfs`) y el hub de alternativas a Amazon S3.
- **Fixes técnicos**: ninguno.
- **Hipótesis CTR**: title con "clusters caseros" conecta directamente con la intención real de quien busca "garage s3" (homelabbers), más específico que un title genérico.
- **Hipótesis de ranking**: cubrir "compatible con S3" de forma explícita en el FAQ refuerza la keyword secundaria "garage object storage" sin repetirla de forma forzada.
- **Target**: Top 3–5. **Fecha**: 2026-10-01.

### 14. `/en/comparar/appflowy-vs-outline` → canónica real: `/en/compare/appflowy-vs-outline`
- **Arquitectura verificada ANTES de tocar contenido** (regla explícita del encargo): `/en/comparar/:pair` es una ruta legacy (español bajo `/en/`, previa a la limpieza de rutas) que ya redirige 301 a `/en/compare/:pair` vía la regla genérica en `next.config.mjs` — la misma regla que ya resolvía el caso #24/Batch 1 de garage-vs-seaweedfs. Confirmado que no existe `/en/comparar/[pair]/page.tsx` como ruta real. **No son idiomas distintos ni contenido duplicado vivo**: es una única página canónica con una URL antigua que todavía aparece en el índice de Google por el lag normal de recrawl tras una migración de rutas. No se tocó el redirect ni el canonical — ya estaban correctos.
- **Posición antes / impresiones** (de la URL legacy): 8.34 / 44. **Keywords**: appflowy vs outline, outline vs appflowy.
- **Intención**: comparación directa.
- **SERP**: muy competido (openalternative.co, el propio appflowy.com con una página de comparación auto-publicada, dev.to, selfhostwise.com). Diferenciadores recurrentes: AppFlowy = workspace todo-en-uno (notas+BD+kanban), licencia AGPL-3.0 real; Outline = wiki enfocada, licencia BUSL-1.1 (no OSI).
- **Problemas encontrados**: ninguno técnico más allá del ya resuelto en #24. Contenido: sin FAQ, sin TL;DR.
- **Cambios implementados** (en la canónica): title/meta curados, TL;DR, FAQ (3 preguntas) con schema — incluyendo un diferenciador verificado contra nuestros propios `dockerCompose`: AppFlowy Cloud solo necesita PostgreSQL; Outline necesita PostgreSQL **y** Redis, un servicio más que mantener.
- **Internal links**: ya enlazada desde 4 comparativas de AppFlowy y 6 de Outline, más los hubs de alternativas a Notion.
- **Fixes técnicos**: ninguno — redirect y canonical ya correctos.
- **Hipótesis CTR**: mismo patrón que #12 — el title resume la decisión (todo-en-uno vs wiki enfocada) en el propio snippet.
- **Hipótesis de ranking**: el diferenciador de infraestructura (1 servicio menos en AppFlowy Cloud) es un dato verificable que no vimos citado en ningún resultado de la SERP investigada — contenido genuinamente diferencial, no reciclado de otros blogs.
- **Target**: Top 3–5. **Fecha**: 2026-10-01.

### 15. `/tool/wekan`
- **Posición antes / impresiones**: 17.10 / 51. **Keywords**: wekan, wekan open source, wekan self hosted.
- **Intención**: mixta — mitad "mejores alternativas a Trello" (listicle), mitad "cómo auto-hospedar X".
- **SERP**: listicles de "N alternativas a Trello" (itsfoss.com, ones.com) + comparaciones Wekan-vs-Trello (meetrix.io) + tutoriales de despliegue. Ninguna comparación vs. otro Kanban open source del catálogo (esa vive en `focalboard-vs-wekan`, ya cubierta indirectamente).
- **Problemas encontrados**: ninguno técnico.
- **Cambios implementados**: title/meta curados; FAQ (3 preguntas) con schema, incluida la comparación honesta "Wekan vs Trello: qué se pierde" (interfaz menos pulida, ya en `cons`) y el despliegue Docker (imagen + MongoDB).
- **Internal links**: ya enlazada desde `focalboard-vs-wekan` y el hub de alternativas a Trello.
- **Fixes técnicos**: ninguno.
- **Hipótesis CTR**: title con "licencia MIT" como gancho concreto frente a listicles genéricos de "alternativas a Trello".
- **Hipótesis de ranking**: al estar en posición 17 (banda 10–20), prioriza profundidad de contenido + internal links según Fase 3 — la FAQ añade la comparación honesta que faltaba.
- **Target**: Top 8–12, después Top 5–10. **Fecha**: 2026-10-01.

### 16. `/en/guides/migrate/confluence/outline`
- **Posición antes / impresiones**: 5.08 / 38 — **ya en Top 5**, por lo que se aplicó la regla explícita de "no reescritura masiva sin justificar".
- **Keywords**: confluence open source alternative, confluence alternative, migrate confluence to outline.
- **Intención**: migración, con alta confianza ya ganada en Google (posición 5).
- **SERP**: no se re-investigó agresivamente dado el buen posicionamiento ya existente — se reutilizó el contexto ya obtenido en la investigación de `docmost-vs-outline` (mismo ecosistema de licencias Outline=BUSL-1.1).
- **Problemas encontrados**: ninguno. El cuerpo (intro, 4 pasos, aviso "antes de cancelar") es el patrón genérico "notes-docs" ya usado por ~150 guías — funciona bien y no había razón para reescribirlo.
- **Cambios implementados**: **solo** se añadió una capa de title/meta description/FAQ (3 preguntas) en un nuevo override `Confluence→outline` — el cuerpo se copió **verbatim** del patrón genérico, sin ningún cambio de texto, verificado línea por línea contra el HTML generado antes y después.
- **Internal links**: ya enlazada desde 6 comparativas de Outline y el hub de alternativas a Confluence/Notion.
- **Fixes técnicos**: ninguno.
- **Hipótesis CTR**: title que nombra "búsqueda instantánea" (diferenciador real de Outline) en vez del title genérico idéntico a las ~150 guías de migración — mejora CTR sin tocar una posición ya buena.
- **Hipótesis de ranking**: ninguna — el objetivo aquí es solo CTR/snippet (regla de Fase 3 para posición ≤10), no mover la posición con reescritura de contenido.
- **Target**: consolidar Top 5, intentar Top 3. **Fecha**: 2026-10-01.

### 17. `/tool/saleor`
- **Posición antes / impresiones**: 15.20 / 55. **Keywords**: saleor, saleor open source, saleor vs shopify.
- **Intención**: comercial/evaluación (equipos decidiendo entre headless open source vs. Shopify Plus).
- **SERP**: comparaciones activas y recientes (cleancommit.io, netguru.com, stackshare.io, varias con fecha 2026) — nicho con ciclo de refresco de contenido activo. Diferenciador: arquitectura GraphQL/Django abierta vs. plataforma cerrada gestionada.
- **Problemas encontrados**: ninguno técnico.
- **Cambios implementados**: title/meta curados; FAQ (3 preguntas) con schema, incluida "Saleor vs Shopify Plus: para quién es cada uno" y la aclaración Open-Core (core BSD-3-Clause gratis, cloud gestionado opcional).
- **Internal links**: ya enlazada desde `magento-open-source-vs-saleor` y el hub de alternativas a Shopify Plus.
- **Fixes técnicos**: ninguno.
- **Hipótesis CTR**: title con "GraphQL" + "Shopify Plus" capta mejor la intención de desarrolladores evaluando headless commerce que un title genérico.
- **Hipótesis de ranking**: responder "¿es realmente gratis?" de forma visible, en un nicho donde varios competidores no aclaran el modelo Open-Core con precisión.
- **Target**: Top 10. **Fecha**: 2026-10-01.

### 18. `/tool/appwrite`
- **Posición antes / impresiones**: 11.91 / 44. **Keywords**: appwrite, appwrite open source, appwrite vs pocketbase.
- **Intención**: evaluación técnica para developers (BaaS completo vs. minimalista).
- **SERP**: comparaciones técnicas detalladas (openalternative.co, dev.to, libhunt.com) centradas en huella de recursos y amplitud de funciones.
- **Problemas encontrados**: ninguno técnico.
- **Cambios implementados**: title/meta curados; FAQ (3 preguntas) con schema, incluida "Appwrite vs PocketBase" verificada contra nuestros propios datos (Appwrite: MariaDB+Redis multi-contenedor; PocketBase: single binario Go + SQLite embebido, ambos ya en el repo) y la nota de que la imagen Docker de Appwrite está `VERIFIED_PINNED` en nuestra auditoría.
- **Internal links**: ya enlazada desde 3 comparativas (`appwrite-vs-supabase`, `appwrite-vs-pocketbase`, `appwrite-vs-hasura`), el hub de alternativas a Firebase y su guía `/replace/firebase`.
- **Fixes técnicos**: ninguno.
- **Hipótesis CTR**: mencionar la imagen Docker verificada como señal de confianza/calidad en el title no es necesario (ya hay sitio en la FAQ), pero el meta description con "SDKs para todos los frameworks" responde directo a la intención de developer shopping.
- **Hipótesis de ranking**: la FAQ "Appwrite vs PocketBase" captura directamente esa keyword secundaria con contenido verificado del propio repo, sin depender de los números de terceros de la SERP.
- **Target**: Top 5–8. **Fecha**: 2026-10-01.

### 19. `/tool/redash`
- **Posición antes / impresiones**: 15.69 / 45. **Keywords**: redash, redash open source.
- **Intención**: informational ("qué es") con intención secundaria de evaluación de BI self-hosted.
- **SERP**: explainers y listicles (trevor.io, secoda.co, hevodata.com) — comparativamente menos competido/profundo que otras queries investigadas (sin head-to-head completo).
- **Problemas encontrados**: ninguno técnico.
- **Cambios implementados**: title/meta curados; FAQ (3 preguntas) con schema, incluida la honestidad ya presente en `cons` sobre el ritmo de desarrollo más lento que Metabase.
- **Internal links**: ya enlazada desde `metabase-vs-redash` y el hub de alternativas a Looker.
- **Fixes técnicos**: ninguno.
- **Hipótesis CTR**: title con "consultas SQL y dashboards" (lo que realmente hace) en vez de un title vacío tipo "la mejor alternativa a Looker".
- **Hipótesis de ranking**: dado que la SERP para esta query es menos profunda que otras, una ficha con FAQ real y específica puede destacar frente a explainers genéricos de terceros.
- **Target**: Top 5–10. **Fecha**: 2026-10-01.

### 20. `/en/guias/migrar/chatgpt-plus/open-webui` → canónica real: `/en/guides/migrate/chatgpt-plus/open-webui`
- **Hallazgo arquitectónico**: igual que el caso #1 de Batch 1, esta URL de la lista de prioridades es la ruta legacy español-bajo-`/en/` que ya redirige 301 a la canónica (`/en/guias/migrar/:from/:to` → `/en/guides/migrate/:from/:to`). Se trabajó directamente sobre la canónica.
- **Posición antes / impresiones**: 8.00 / 28. **Keywords**: open webui, chatgpt alternative, self hosted chatgpt.
- **Intención**: migración + privacidad/coste (usuarios evaluando dejar ChatGPT Plus por algo local).
- **SERP**: dominada por listicles/tutoriales de self-hosting (pinggy.io, KDnuggets, valebyte.com) con enfoque en privacidad ("procesa tus datos localmente") — no hay comparaciones X-vs-Y, es contenido how-to/privacidad.
- **Problemas encontrados**: este par **no tenía override** — caía en el patrón genérico "ai-tools", que no reflejaba bien que no existe una vía real de re-importar el historial de ChatGPT en Open WebUI.
- **Cambios implementados**: nuevo override completo `ChatGPT Plus→open-webui` (ES/EN) — intro, 5 pasos (incluye desplegar con Ollama, descargar un modelo local, o conectar una API remota compatible con OpenAI), aviso "antes de cancelar", title/meta y FAQ (3 preguntas) — todo derivado de los datos ya existentes de Open WebUI en `tools.ts` (Ollama como backend, GPU opcional, `notes` sobre que la UI no ejecuta modelos por sí misma).
- **Internal links**: ya enlazada desde 4 comparativas de Open WebUI (`khoj-vs-open-webui`, `anythingllm-vs-open-webui`, `librechat-vs-open-webui`, `open-webui-vs-privategpt`).
- **Fixes técnicos**: ninguno más allá de confirmar el redirect ya existente.
- **Hipótesis CTR**: title "IA local y privada" capta directamente el ángulo de privacidad dominante en la SERP, más específico que un title genérico de migración.
- **Hipótesis de ranking**: cubrir honestamente que no hay export/import directo (a diferencia de otras guías de migración del catálogo) evita una promesa falsa y responde mejor a "self hosted chatgpt" como intención real.
- **Target**: Top 3–5. **Fecha**: 2026-10-01.

### 21. `/tool/zammad`
- **Posición antes / impresiones**: 12.02 / 42. **Keywords**: zammad, zammad open source, zammad self hosted.
- **Intención**: evaluación de helpdesk self-hosted vs. Zendesk.
- **SERP**: listicles de "alternativas a Zendesk" + comparaciones directas Zammad-vs-Zendesk (wz-it.com, opentechhub.io) centradas en coste/soberanía de datos (GDPR).
- **Problemas encontrados**: ninguno técnico.
- **Cambios implementados**: title/meta curados; FAQ (3 preguntas) con schema, incluido qué infraestructura requiere (Postgres+Elasticsearch, ya en `cons`).
- **Internal links**: ya enlazada desde `chatwoot-vs-zammad` y el hub de alternativas a Zendesk.
- **Fixes técnicos**: ninguno.
- **Hipótesis CTR**: title con "auto-hospedable" responde directo a la intención de quien ya decidió dejar el SaaS de Zendesk.
- **Hipótesis de ranking**: nombrar Elasticsearch como requisito en el FAQ (en vez de solo en `cons`) da contenido verificable que varios listicles de la SERP no detallan.
- **Target**: Top 5–8. **Fecha**: 2026-10-01.

### 22. `/tool/headscale`
- **Posición antes / impresiones**: 8.83 / 36. **Keywords**: headscale, headscale self hosted, tailscale alternative.
- **Intención**: técnica/infraestructura — la SERP sitúa el propio repo de GitHub en la posición #1, señal de búsqueda muy técnica, no de comparación superficial.
- **SERP**: repo oficial de GitHub + blogs técnicos (meetrix.io, infralovers.com) + el propio blog de Tailscale hablando de open source. Contenido técnico/arquitectura, no listicle.
- **Problemas encontrados**: **gap de internal linking real** — Headscale es la única de las 30 URLs prioritarias (Batch 1+2) sin ninguna comparativa auto-generada ni tool con el mismo `replaces` (Tailscale no lo sustituye ninguna otra herramienta del catálogo). Documentado en detalle en "Decidido NO hacer" más abajo — no se fabricó una comparación artificial contra WireGuard Easy (que sustituye un SaaS distinto) para no forzar un enlace sin intención de búsqueda real.
- **Cambios implementados**: title/meta curados; FAQ (3 preguntas) con schema, enfocada en lo técnico que la SERP realmente busca (qué cliente se usa, ACLs/exit nodes, qué sustituye exactamente — el control plane, no el cliente).
- **Internal links**: 1 enlace real ya existente (hub de categoría AuthIdentity, que lista Headscale junto a Keycloak/Authentik/Ory/Zitadel/SuperTokens/Logto/WireGuard Easy) — por debajo del objetivo de 2–5, ver nota en "Decidido NO hacer".
- **Fixes técnicos**: ninguno.
- **Hipótesis CTR**: title "compatible con Tailscale" responde la pregunta implícita antes del clic (¿necesito un cliente distinto?).
- **Hipótesis de ranking**: dado que Google ya posiciona el repo oficial en el top, competir requiere contenido tan técnicamente preciso como el repo mismo — la FAQ se escribió con ese nivel de precisión (ACLs, exit nodes, control plane vs. cliente) en vez de marketing genérico.
- **Target**: Top 3–5. **Fecha**: 2026-10-01.

### 23. `/tool/umami`
- **Posición antes / impresiones**: 11.14 / 36. **Keywords**: umami web, umami analytics, plausible vs umami, matomo vs umami.
- **Intención**: comparación de analítica privada (3 vías: Umami/Plausible/Matomo).
- **SERP**: el nicho más saturado de contenido comparativo de los 20 investigados — 8+ posts dedicados "Umami vs Plausible vs Matomo", todos con fecha 2026. Competir requiere un ángulo genuinamente distinto, no otra tabla de funciones genérica.
- **Problemas encontrados**: ninguno técnico.
- **Cambios implementados**: title/meta curados; FAQ (3 preguntas) con schema, incluida la comparación de las 3 herramientas — verificada palabra por palabra contra las descripciones YA EXISTENTES de Umami, Plausible y Matomo en `tools.ts` (confirmado: Matomo ya dice "heatmaps, grabación de sesiones, embudos y el nivel de detalle de GA4" en su propia ficha), sin citar las cifras de RAM de terceros encontradas en la SERP (~512MB, no verificadas contra nuestro propio cómputo de recursos).
- **Internal links**: ya enlazada desde 4 comparativas (`plausible-vs-umami`, `matomo-vs-umami`, `ackee-vs-umami`, `goatcounter-vs-umami`) y el hub de alternativas a Google Analytics.
- **Fixes técnicos**: ninguno.
- **Hipótesis CTR**: title "minimalista y privada" se diferencia de los títulos genéricos "Umami Analytics Review" que dominan la SERP.
- **Hipótesis de ranking**: en un nicho tan saturado, el valor real está en que la comparación de 3 vías usa datos ya verificados de nuestro propio catálogo en vez de repetir las cifras de terceros que todos los competidores ya citan — contenido no reciclado, aunque la competencia por posición sigue siendo alta.
- **Target**: Top 5–8. **Fecha**: 2026-10-01.

### 24. `/en/comparar/garage-vs-seaweedfs` → canónica real: `/en/compare/garage-vs-seaweedfs` (ya optimizada en Batch 1)
- **Arquitectura**: confirmado en Batch 1 (ver entrada #3 arriba) — ruta legacy con 301 ya existente a la canónica. Esta ronda solo confirma que sigue resuelta y que la canónica recibió además el fix genérico de "mostrar `tool.notes`" (no aplica aquí, ni Garage ni SeaweedFS tienen notes relevantes distintas de las ya cubiertas en Batch 1).
- **Posición antes / impresiones** (URL legacy): 11.97 / 30. **Keyword**: garage vs seaweedfs.
- **Cambios implementados esta ronda**: ninguno nuevo — la canónica ya tiene title/meta/TL;DR/FAQ de Batch 1. No se duplicó trabajo.
- **Target**: Top 5–8 (ya en camino desde la posición 7.20 de la URL canónica en Batch 1). **Fecha de la optimización real**: 2026-10-01 (Batch 1).

### 25. `/en/compare/docmost-vs-outline`
- **Posición antes / impresiones**: 9.96 / 27. **Keywords**: docmost vs outline, outline vs docmost.
- **Intención**: comparación directa.
- **SERP**: muy competido, incluido el propio Docmost con una página de comparación auto-publicada (`docmost.com/compare/docmost-vs-outline`) — señal de que el propio vendor hace SEO activo en esta query.
- **Problemas encontrados**: ninguno técnico.
- **Cambios implementados**: title/meta curados; TL;DR; FAQ (3 preguntas) con schema, incluido el diferenciador verificado de infraestructura: Docmost y Outline necesitan AMBOS Postgres+Redis (verificado contra ambos `dockerCompose`) — aquí la licencia es el eje real (AGPL-3.0 real vs BUSL-1.1 no-OSI), no la infraestructura.
- **Internal links**: ya enlazada desde 6 comparativas de Outline y 6 de Docmost, más los hubs de Confluence/Notion.
- **Fixes técnicos**: ninguno.
- **Hipótesis CTR**: title "dos wikis colaborativas, licencias distintas" es más específico que competir con el propio title de Docmost en la SERP.
- **Hipótesis de ranking**: verificar que AMBAS necesitan la misma infraestructura (en vez de asumir una diferencia que no existe) es honestidad verificable que distingue este contenido de blogs que repiten cifras sin comprobarlas.
- **Target**: Top 3–5. **Fecha**: 2026-10-01.

### 26. `/en/tool/neko`
- **Posición antes / impresiones**: 11.52 / 29. **Keywords**: neko, n.eko, n.eko alternative.
- **Intención**: informational/how-to puro — sin contenido comparativo en la SERP.
- **SERP**: repo oficial de GitHub, docs oficiales, guía de despliegue de Vultr, un artículo de Medium — cero contenido de "vs" o listicle. Gap de contenido comparativo genuino (no fabricado: Neko no tiene un competidor directo real en el catálogo, por eso no se forzó ninguna comparación).
- **Problemas encontrados**: ninguno técnico.
- **Cambios implementados**: title/meta curados; FAQ (3 preguntas) con schema, incluida la aclaración honesta (ya en `cons`) de que no es un sustituto general de videollamadas de trabajo, solo un caso de uso específico (navegador compartido).
- **Internal links**: ya enlazada desde 3 comparativas (`jitsi-meet-vs-neko`, `bigbluebutton-vs-neko`, `galene-vs-neko`) y el hub de alternativas a Zoom.
- **Fixes técnicos**: ninguno.
- **Hipótesis CTR**: title que nombra "n.eko" (la grafía con la que la gente busca) junto a "navegador compartido en streaming" — más específico que un title genérico de categoría "VideoConferencing".
- **Hipótesis de ranking**: dado que la SERP no tiene contenido comparativo, una FAQ clara y honesta sobre qué NO es Neko puede ser justo lo que falta frente a documentación puramente técnica.
- **Target**: Top 5–8. **Fecha**: 2026-10-01.

### 27. `/en/guides/migrate/confluence/bookstack`
- **Posición antes / impresiones**: 7.23 / 31. **Keywords**: confluence open source alternative, confluence alternative, migrate confluence to bookstack.
- **Intención**: migración — **con riesgo explícito de canibalización** frente a `/en/guides/migrate/confluence/outline` (#16), ambas compartiendo el SaaS de origen (Confluence) y keywords genéricas casi idénticas.
- **SERP**: listicles de "alternativas a Confluence" (ones.com, peaknetworks.com) + comparación directa BookStack-vs-Confluence (wz-it.com, osalfinder.com) — BookStack compite dentro de listas más amplias, no como única opción nombrada.
- **Problemas encontrados**: riesgo de canibalización con #16, ya anticipado por el propio encargo.
- **Cambios implementados**: a diferencia de #16 (reutilización verbatim del patrón genérico), aquí se escribió un override **deliberadamente distinto**: el eje narrativo es la jerarquía fija Libros→Capítulos→Páginas de BookStack (frente a los "espacios" de Confluence/Outline) y su licencia MIT + stack PHP/Laravel más ligero — nunca se menciona "búsqueda instantánea" ni "colaboración en tiempo real" (el ángulo de la guía de Outline), para que Google vea dos intenciones claramente distintas en vez de contenido intercambiable.
- **Internal links**: ya enlazada desde 3 comparativas de WikiJS (`bookstack-vs-wikijs`), 1 de Docmost (`bookstack-vs-docmost`), 1 de Outline (`bookstack-vs-outline`) y el hub de alternativas a Confluence.
- **Fixes técnicos**: ninguno.
- **Hipótesis CTR**: title "documentación en libros y capítulos" es inconfundiblemente distinto del title "wiki de equipo con búsqueda instantánea" de la guía de Outline — mismo SaaS de origen, snippets que no compiten entre sí.
- **Hipótesis de ranking**: al no competir por la misma frase exacta que la guía de Outline, ambas páginas pueden posicionar para variantes distintas de "confluence alternative" sin canibalizarse.
- **Target**: Top 3–5. **Fecha**: 2026-10-01.

### 28. `/en/compare/minio-vs-seaweedfs`
- **Posición antes / impresiones**: 11.06 / 34. **Keywords**: minio vs seaweedfs, seaweedfs vs minio.
- **Intención**: comparación técnica para decisión de infraestructura.
- **SERP**: blogs técnicos (dev.to, elest.io, un gist de un maintainer de MinIO) con benchmarks de rendimiento de terceros no verificables desde este repositorio.
- **Problema encontrado — el más importante de todo el Batch 2**: `src/data/tools.ts` ya documenta que MinIO tiene `dockerStatus: "ARCHIVED_UPSTREAM"` con una nota detallada: su community edition ya no se publica como imagen Docker pública (repo archivado, imagen retirada de Docker Hub y de su mirror en quay.io), y la última versión libre que circula tiene una vulnerabilidad crítica de autenticación sin parchear (CVSS 8.8). **Esta información ya existía en el repo pero no se mostraba en absoluto en la página de comparación** — un usuario podía comparar MinIO vs SeaweedFS, elegir MinIO por sus funciones, y nunca enterarse de que no hay una vía segura de desplegarlo hoy.
- **Fix sistémico aplicado** (no solo a esta página): se añadió renderizado genérico de `tool.notes` en cada tarjeta de herramienta de `comparison-page-content.tsx` (mismo estilo de aviso ℹ️ ya usado en fichas de herramienta) — esto hace que el aviso de MinIO (y el de SeaweedFS, que también tiene una nota sobre que su tag de Docker fijable más reciente es 3.99 desde octubre 2025) se muestren automáticamente en **cualquier** comparativa que involucre alguna de las 27 herramientas del catálogo con un campo `notes`, no solo en esta página.
- **Cambios implementados**: el fix sistémico anterior, más title/meta curados, TL;DR que lidera con la alerta de seguridad de MinIO (antes de cualquier comparación de funciones), y FAQ (4 preguntas) con schema.
- **Internal links**: ya enlazada desde 2 comparativas de cada herramienta (`garage-vs-minio`/`minio-vs-seaweedfs` para MinIO; `minio-vs-seaweedfs`/`garage-vs-seaweedfs` para SeaweedFS) y el hub de alternativas a Amazon S3.
- **Fixes técnicos**: el renderizado de `tool.notes` en comparativas (ver arriba) — no es un cambio de SEO, es una corrección de precisión/confianza que además mejora el contenido.
- **Hipótesis CTR**: un title que promete "el estado real de cada imagen Docker" es un ángulo que ningún blog de la SERP investigada cubre — nadie más rastrea la disponibilidad real de la imagen en tiempo real.
- **Hipótesis de ranking**: contenido genuinamente diferencial y verificable (no reciclado) sobre disponibilidad y seguridad de las imágenes debería generar mejor engagement/tiempo en página que una tabla de funciones más, en un nicho donde ya hay varios benchmarks de terceros.
- **Target**: Top 5–8. **Fecha**: 2026-10-01.

### 29. `/en/compare/docmost-vs-wikijs`
- **Posición antes / impresiones**: 8.23 / 30. **Keywords**: docmost vs wiki js, docmost vs wikijs.
- **Intención**: comparación directa.
- **SERP**: el propio Docmost vuelve a aparecer con contenido auto-publicado (`docmost.com/blog/wikijs-alternatives`) — mismo patrón de SEO activo del vendor visto en #25.
- **Problemas encontrados**: ninguno técnico.
- **Cambios implementados**: title/meta curados; TL;DR; FAQ (3 preguntas) con schema, incluido un diferenciador de infraestructura verificado: Wiki.js solo necesita PostgreSQL (confirmado en su `dockerCompose` de Batch 1); Docmost necesita PostgreSQL **y** Redis — aquí sí hay una diferencia real de servicios, a diferencia del par Docmost-vs-Outline (#25) donde ambos necesitan lo mismo. Ambas licencias son AGPL-3.0 (verificado), así que el FAQ aclara explícitamente que la licencia NO es el diferenciador en este par — evita repetir el mismo ángulo de "licencia" en los 4 pares de comparativas de wikis de este batch.
- **Internal links**: ya enlazada desde 6 comparativas de Docmost y 3 de WikiJS, más los hubs de Confluence/Notion.
- **Fixes técnicos**: ninguno.
- **Hipótesis CTR**: title "edición en tiempo real vs historial tipo Git" nombra el diferenciador real de uso, no solo licencia/precio.
- **Hipótesis de ranking**: variar el eje de diferenciación entre los pares de wikis (licencia para Outline-pairs, infraestructura+estilo para este) evita contenido repetitivo entre páginas, cumpliendo la regla explícita de "no párrafos repetidos entre páginas".
- **Target**: Top 3–5. **Fecha**: 2026-10-01.

### 30. `/tool/hasura`
- **Posición antes / impresiones**: 9.23 / 30. **Keywords**: hasura, hasura open source, hasura self hosted.
- **Intención**: informational/evaluación técnica.
- **SERP**: dominada por el propio dominio de Hasura (docs, blog) — señal de contenido independiente/competidor débil para esta query exacta.
- **Problemas encontrados**: ninguno técnico.
- **Cambios implementados**: title/meta curados; FAQ (3 preguntas) con schema, incluida la aclaración Open-Core (motor Apache-2.0 gratis vs. Hasura Cloud de pago) y la limitación honesta ya en `cons` (pensado para PostgreSQL, no NoSQL).
- **Internal links**: ya enlazada desde 3 comparativas (`hasura-vs-supabase`, `appwrite-vs-hasura`, `hasura-vs-pocketbase`), el hub de alternativas a Firebase/AWS AppSync y su guía `/replace/firebase`.
- **Fixes técnicos**: ninguno.
- **Hipótesis CTR**: title "API GraphQL instantánea sobre PostgreSQL" es más específico y técnico que el dominio oficial, que compite más por marca que por intención de búsqueda de terceros.
- **Hipótesis de ranking**: dado que la SERP para esta query tiene poco contenido independiente, una ficha de catálogo con comparaciones reales hacia Supabase/PocketBase/Appwrite puede aportar lo que falta — contexto comparativo que el propio dominio de Hasura no ofrece por diseño.
- **Target**: Top 3–5. **Fecha**: 2026-10-01.

---

## Infraestructura añadida en Batch 2

- **`comparison-page-content.tsx`**: ahora muestra `tool.notes` (si existe) en la tarjeta de cada herramienta comparada, con el mismo estilo de aviso ℹ️ ya usado en fichas individuales — mejora sistémica de confianza/precisión que beneficia a cualquier comparativa futura que involucre alguna de las 27 herramientas del catálogo con ese campo, no solo a `minio-vs-seaweedfs`.
- Extensión de `tool-seo.ts`/`.en.ts` con 11 nuevas entradas y de `compare-seo.ts`/`.en.ts` con 5 nuevas entradas — mismo mecanismo de Batch 1, sin cambios estructurales.
- Extensión de `migration-pair-overrides.ts`/`.en.ts` con 3 nuevas entradas (`Confluence→outline`, `Confluence→bookstack`, `ChatGPT Plus→open-webui`).

## Decidido NO hacer en Batch 2, y por qué

- **No se tocó ningún archivo de Batch 1** salvo el fix genérico de `tool.notes` en comparativas (retrocompatible, no cambia texto curado existente) — verificado con `git diff` antes de empezar y de nuevo antes de hacer commit.
- **No se creó ninguna comparación artificial para Headscale** (#22): es la única de las 30 URLs prioritarias sin ninguna comparativa auto-generada en el catálogo, porque ninguna otra herramienta comparte "Tailscale" como SaaS sustituido. WireGuard Easy está en la misma categoría (AuthIdentity) pero sustituye SaaS distintos (NordVPN Teams, OpenVPN Access Server) — forzar una comparación `headscale-vs-wireguard-easy` habría sido crear contenido con una intención de búsqueda que nadie tiene, violando la regla explícita de "no crear páginas nuevas para enlazar si ya existe contenido equivalente" y "no fuerces una keyword si cambia la intención". Headscale se queda con 1 enlace entrante real (el hub de categoría AuthIdentity) en vez de los 2–5 objetivo — gap de catálogo documentado, no un bug a corregir con contenido fabricado.
- **No se reescribió el cuerpo de `/en/guides/migrate/confluence/outline`** (#16): ya está en Top 5 (posición 5.08); se aplicó la regla explícita de "si posición ≤10, solo CTR/snippet, no reescritura masiva". El cuerpo se copió verbatim del patrón genérico, solo se añadió la capa de title/meta/FAQ.
- **No se usaron las cifras de rendimiento/benchmark de terceros encontradas en la investigación SERP** para ningún par de almacenamiento (MinIO/SeaweedFS/Garage) — los benchmarks de latencia (~2.1ms vs ~3.8ms) citados en blogs de terceros no están verificados contra ninguna medición propia, así que no se incluyeron en ninguna FAQ ni TL;DR.
- **No se usaron los recuentos de estrellas de GitHub de terceros** para AFFiNE/Outline/AppFlowy/Docmost/WikiJS (varios citados en la SERP no coinciden exactamente con nuestro propio `starsCount` verificado) — se dejó que la tabla comparativa ya existente siga mostrando el dato propio del repositorio, sin repetir cifras externas en ningún FAQ nuevo.
- **No se cambió `fossModel` de ningún tool** en base a la investigación SERP (p. ej. no se reconsideró la clasificación de Bagisto/Hasura) — ninguna evidencia encontrada fue lo bastante concluyente para justificar un cambio de un campo ya auditado en sesiones anteriores.
- **No se creó contenido para el resto del listado** (ningún ítem fuera de los 20 de Batch 2) — instrucción explícita de ejecutar Batch 2 completo y nada más en esta ronda.

---

## Tabla final — Batch 2

| URL | Posición antes | Impresiones antes | Cambios aplicados | Keyword principal | Objetivo SEO |
|---|---|---|---|---|---|
| `/tool/immich` | 15.52 | 65 | Title/meta curados; FAQ (3) con schema (incluye GPU opcional) | immich | Top 10, idealmente Top 5 |
| `/en/compare/affine-vs-outline` | 7.26 | 46 | Title/meta curados; FAQ (4) con schema | affine vs outline | Top 3–5 |
| `/tool/garage` | 8.37 | 46 | Title/meta curados; FAQ (3) con schema | garage s3 | Top 3–5 |
| `/en/comparar/appflowy-vs-outline` *(→ canónica `/en/compare/appflowy-vs-outline`)* | 8.34 | 44 | Confirmado 301 legacy ya existente; title/meta curados + TL;DR + FAQ (3) en la canónica | appflowy vs outline | Top 3–5 |
| `/tool/wekan` | 17.10 | 51 | Title/meta curados; FAQ (3) con schema | wekan | Top 8–12 → Top 5–10 |
| `/en/guides/migrate/confluence/outline` | 5.08 | 38 | Solo title/meta/FAQ (3) — cuerpo sin cambios (ya Top 5) | confluence open source alternative | Consolidar Top 5, intentar Top 3 |
| `/tool/saleor` | 15.20 | 55 | Title/meta curados; FAQ (3) con schema | saleor | Top 10 |
| `/tool/appwrite` | 11.91 | 44 | Title/meta curados; FAQ (3) con schema | appwrite | Top 5–8 |
| `/tool/redash` | 15.69 | 45 | Title/meta curados; FAQ (3) con schema | redash | Top 5–10 |
| `/en/guias/migrar/chatgpt-plus/open-webui` *(→ canónica `/en/guides/migrate/chatgpt-plus/open-webui`)* | 8.00 | 28 | Confirmado 301 legacy; nuevo override completo (intro/pasos/FAQ/title/meta) en la canónica | open webui | Top 3–5 |
| `/tool/zammad` | 12.02 | 42 | Title/meta curados; FAQ (3) con schema | zammad | Top 5–8 |
| `/tool/headscale` | 8.83 | 36 | Title/meta curados; FAQ (3) con schema | headscale | Top 3–5 |
| `/tool/umami` | 11.14 | 36 | Title/meta curados; FAQ (3) con schema | umami web | Top 5–8 |
| `/en/comparar/garage-vs-seaweedfs` *(→ canónica, ya optimizada en Batch 1)* | 11.97 | 30 | Ninguno nuevo — confirmado ya resuelto | garage vs seaweedfs | Top 5–8 |
| `/en/compare/docmost-vs-outline` | 9.96 | 27 | Title/meta curados; TL;DR; FAQ (3) con schema | docmost vs outline | Top 3–5 |
| `/en/tool/neko` | 11.52 | 29 | Title/meta curados; FAQ (3) con schema | neko | Top 5–8 |
| `/en/guides/migrate/confluence/bookstack` | 7.23 | 31 | Override distinto al de Outline (anti-canibalización); title/meta/FAQ (3) | confluence open source alternative | Top 3–5 |
| `/en/compare/minio-vs-seaweedfs` | 11.06 | 34 | **Fix sistémico** (`tool.notes` en comparativas) + title/meta/TL;DR (alerta seguridad)/FAQ (4) | minio vs seaweedfs | Top 5–8 |
| `/en/compare/docmost-vs-wikijs` | 8.23 | 30 | Title/meta curados; TL;DR; FAQ (3) con schema | docmost vs wiki js | Top 3–5 |
| `/tool/hasura` | 9.23 | 30 | Title/meta curados; FAQ (3) con schema | hasura | Top 3–5 |

*Posiciones e impresiones son las aportadas por el usuario desde Search Console al iniciar la tarea (periodo pre-cambio) — no se ha vuelto a consultar Search Console desde este repositorio.*

---

## Próximos pasos

- Esperar 14–28 días desde 2026-10-01 antes de volver a tocar cualquiera de las 20 URLs de Batch 2 (salvo error técnico).
- Esperar lo mismo para las 10 URLs de Batch 1 si no se ha hecho ya (empezaron el mismo día).
- Monitorizar Search Console manualmente para las keywords de ambas tablas.
- Decidir si vale la pena llenar el hueco de catálogo de Headscale (ningún otro self-hosted "Tailscale alternative" en el catálogo) en una sesión futura — fuera de alcance de esta tarea.
- Cuando corresponda, continuar con **el resto del listado original de 30** (las ~10 URLs restantes no cubiertas por ningún batch), siguiendo el mismo proceso: auditar SERP → aplicar cambios quirúrgicos → registrar aquí.
