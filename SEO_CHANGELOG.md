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

## Próximos pasos

- Esperar 14–28 días desde 2026-10-01 antes de volver a tocar cualquiera de estas 10 URLs (salvo error técnico).
- Monitorizar Search Console manualmente para las keywords de la tabla.
- Cuando corresponda, continuar con el **Batch 2** (Immich, Affine vs Outline, Garage, AppFlowy vs Outline, Wekan, Confluence→Outline, Saleor, Appwrite, Redash, Open WebUI) siguiendo el mismo proceso: auditar SERP → aplicar cambios quirúrgicos → registrar aquí.
