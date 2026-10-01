import { test } from "node:test";
import assert from "node:assert/strict";
import type { ResolvingMetadata } from "next";
import { getLocalizedTool, getToolById } from "../src/data/tools";
import { toolsZh } from "../src/data/tools.zh";
import { ZH_TOOL_SLUGS, ZH_COMPARE_PAIR_SLUGS, hasZhTool, hasZhCompare } from "../src/lib/zh-mvp";
import { localeHref } from "../src/lib/locale-href";
import { getCompareHref } from "../src/lib/routes";
import { locales, defaultLocale } from "../src/i18n/config";
import { getDictionary } from "../src/i18n/get-dictionary";
import sitemap from "../src/app/sitemap";
import * as zhToolPage from "../src/app/(zh)/zh/tool/[slug]/page";
import * as zhComparePage from "../src/app/(zh)/zh/compare/[pair]/page";

const mockParent = Promise.resolve({ openGraph: {}, twitter: {} }) as unknown as ResolvingMetadata;

/**
 * Regresión del piloto zh-CN (AI/LLM/self-hosting) — ver lib/zh-mvp.ts para
 * el alcance exacto (10 tools + 10 comparativas + home = 21 páginas).
 * Estos tests fallan si alguien amplía/reduce el piloto sin actualizar
 * todos los sitios que dependen de la lista (hreflang, sitemap, páginas),
 * o si se reintroduce una frase legal imprecisa en el contenido chino.
 */

test("locale config: zh-CN added without changing the default locale", () => {
  assert.deepEqual(locales, ["es", "en", "zh"]);
  assert.equal(defaultLocale, "es");
});

test("localeHref: zh prefixes paths with /zh, es/en untouched", () => {
  assert.equal(localeHref("/tool/dify", "zh"), "/zh/tool/dify");
  assert.equal(localeHref("/", "zh"), "/zh");
  assert.equal(localeHref("/tool/dify", "es"), "/tool/dify");
  assert.equal(localeHref("/tool/dify", "en"), "/en/tool/dify");
});

test("getCompareHref: zh branch produces /zh/compare/..., other locales unchanged", () => {
  assert.equal(getCompareHref("dify-vs-ollama", "zh"), "/zh/compare/dify-vs-ollama");
  assert.equal(getCompareHref("dify-vs-ollama", "es"), "/comparar/dify-vs-ollama");
  assert.equal(getCompareHref("dify-vs-ollama", "en"), "/en/compare/dify-vs-ollama");
});

test("zh-mvp whitelist: exactly the 10 tools and 10 comparisons from the brief", () => {
  assert.deepEqual(
    [...ZH_TOOL_SLUGS].sort(),
    ["appflowy", "comfyui", "dify", "nextcloud", "odoo", "ollama", "open-webui", "searxng", "syncthing", "vllm"].sort()
  );
  assert.equal(ZH_COMPARE_PAIR_SLUGS.length, 10);
  assert.ok(hasZhTool("dify"));
  assert.ok(hasZhTool("ollama"));
  assert.ok(!hasZhTool("seafile"), "seafile has no zh tool page — it's only a secondary tool in a comparison");
  assert.ok(!hasZhTool("n8n"), "n8n is outside the AI/LLM/self-hosting pilot cluster");
  assert.ok(hasZhCompare("dify-vs-ollama"));
  assert.ok(!hasZhCompare("appflowy-vs-huly"), "not one of the 10 piloted comparisons");
});

test("getLocalizedTool: zh falls back to EN (never raw Spanish) for untranslated tools, real zh content for the 10 piloted ones", () => {
  const dify = getToolById("dify")!;
  const zhDify = getLocalizedTool(dify, "zh");
  assert.ok(/[一-鿿]/.test(zhDify.description), "dify has a real zh translation — description should contain Chinese characters");
  assert.equal(zhDify.description, toolsZh.dify.description);

  // seafile is a secondary tool in nextcloud-vs-seafile with no zh entry — must fall back to EN, not to the raw Spanish tool object.
  const seafile = getToolById("seafile")!;
  const zhSeafile = getLocalizedTool(seafile, "zh");
  const esSeafile = getLocalizedTool(seafile, "es");
  assert.notEqual(zhSeafile.description, esSeafile.description, "zh fallback must not be the raw Spanish description");
  assert.doesNotMatch(zhSeafile.description, /[一-鿿]/, "no fake zh translation was invented for seafile");
});

test("FOSS model wording: AppFlowy stays Open-Core, Ollama Open-Core, vLLM FOSS — in the zh dictionary too", () => {
  const appflowy = getToolById("appflowy")!;
  const ollama = getToolById("ollama")!;
  const vllm = getToolById("vllm")!;
  assert.equal(appflowy.fossModel, "OpenCore");
  assert.equal(ollama.fossModel, "OpenCore");
  assert.equal(vllm.fossModel, "FOSS");

  const t = getDictionary("zh");
  const appflowyTitle = t.toolPage.h1("AppFlowy", "Notion", 2026, appflowy.fossModel);
  assert.match(appflowyTitle, /Open-Core/);
  assert.doesNotMatch(appflowyTitle, /^AppFlowy.*Open Source\b/, "must never collapse to a blanket 'Open Source' for an Open-Core tool");

  const vllmTitle = t.toolPage.h1("vLLM", "OpenAI API", 2026, vllm.fossModel);
  assert.match(vllmTitle, /Open Source/);
});

test("zh dictionary is actually translated, not silently falling back to the English base", () => {
  const t = getDictionary("zh");
  assert.equal(t.breadcrumb.home, "首页");
  assert.match(t.toolPage.pros, /[一-鿿]/);
  assert.match(t.comparisonPage.tableLicense, /[一-鿿]/);
  assert.match(t.hostingTier.title, /[一-鿿]/);
  // Untranslated namespaces (no zh page uses them) intentionally fall back
  // to English, never to Spanish — same rule as getLocalizedTool.
  assert.equal(t.header.categorias, "Categories");
});

test("legal wording: no AGPL/GDPR absolute-claim phrasing reintroduced in zh content", () => {
  const forbidden = [/AGPL.*(obliga|requires?you).*(open|liberar|release)/i, /GDPR\s*合规/, /无需.*(同意横幅|consent banner)/i];
  const blobs: string[] = [JSON.stringify(toolsZh), JSON.stringify(getDictionary("zh").toolPage)];
  for (const blob of blobs) {
    for (const re of forbidden) {
      assert.doesNotMatch(blob, re);
    }
  }
  // AppFlowy's AGPL note must carry the same precision as ES/EN (covered
  // modified versions + certain network use), never "must open-source".
  const appflowyZh = getLocalizedTool(getToolById("appflowy")!, "zh");
  const agplCon = appflowyZh.cons.find((c) => c.includes("AGPL"));
  assert.ok(agplCon, "AppFlowy's zh cons should carry an AGPL note");
  assert.match(agplCon!, /特定修改版本|certain network/);
  assert.doesNotMatch(agplCon!, /必须开源|必须公开所有/);
});

test("sitemap: exactly 21 zh-CN pages (1 home + 10 tools + 10 comparisons), each with full es/en/zh-CN/x-default alternates", () => {
  const entries = sitemap();
  const zhEntries = entries.filter((e) => e.url.includes("/zh"));
  assert.equal(zhEntries.length, 21, `expected 21 zh-CN sitemap entries, found ${zhEntries.length}`);
  for (const e of zhEntries) {
    const langs = e.alternates?.languages as Record<string, string> | undefined;
    assert.ok(langs?.es && langs?.en && langs?.["zh-CN"] && langs?.["x-default"], `${e.url} is missing a full language alternate set`);
  }
});

test("hreflang only when it exists: no sitemap entry outside the 21 zh pages advertises a zh-CN alternate", () => {
  const entries = sitemap();
  const withZhAlternate = entries.filter((e) => {
    const langs = e.alternates?.languages as Record<string, string> | undefined;
    return Boolean(langs?.["zh-CN"]);
  });
  // Every es/en/zh entry of the SAME 21 pages carries the zh-CN alternate
  // (3 URLs per tool/compare row that has one, home included) — so the
  // count is bounded, never "all 1337 pages suddenly claim a zh version".
  assert.ok(withZhAlternate.length <= 21 * 3, "zh-CN alternate leaked onto pages outside the pilot");
  for (const e of withZhAlternate) {
    const langs = e.alternates?.languages as Record<string, string>;
    assert.match(langs["zh-CN"], /^https:\/\/www\.altfreestack\.com\/zh(\/|$)/);
  }
});

test("routing: zh tool/[slug] and compare/[pair] generateStaticParams produce exactly the whitelist, dynamicParams closed", () => {
  assert.equal(zhToolPage.dynamicParams, false);
  assert.equal(zhComparePage.dynamicParams, false);
  const toolParams = zhToolPage.generateStaticParams().map((p) => p.slug);
  const compareParams = zhComparePage.generateStaticParams().map((p) => p.pair);
  assert.deepEqual([...toolParams].sort(), [...ZH_TOOL_SLUGS].sort());
  assert.deepEqual([...compareParams].sort(), [...ZH_COMPARE_PAIR_SLUGS].sort());
});

test("missing translations never produce an indexable zh URL: generateMetadata returns {} for a slug/pair outside the pilot", async () => {
  const toolMeta = await zhToolPage.generateMetadata({ params: Promise.resolve({ slug: "n8n" }) }, mockParent);
  assert.deepEqual(toolMeta, {});
  const compareMeta = await zhComparePage.generateMetadata({ params: Promise.resolve({ pair: "appflowy-vs-huly" }) }, mockParent);
  assert.deepEqual(compareMeta, {});
});

test("SEO: each piloted zh page has title, description, canonical and the 4-way hreflang", async () => {
  for (const slug of ZH_TOOL_SLUGS) {
    const meta = await zhToolPage.generateMetadata({ params: Promise.resolve({ slug }) }, mockParent);
    assert.ok(meta.title, `${slug}: missing title`);
    assert.ok(meta.description, `${slug}: missing description`);
    const alternates = meta.alternates as { canonical?: string; languages?: Record<string, string> };
    assert.equal(alternates.canonical, `https://www.altfreestack.com/zh/tool/${slug}`);
    assert.ok(alternates.languages?.es && alternates.languages?.en && alternates.languages?.["zh-CN"] && alternates.languages?.["x-default"]);
  }

  for (const pair of ZH_COMPARE_PAIR_SLUGS) {
    const meta = await zhComparePage.generateMetadata({ params: Promise.resolve({ pair }) }, mockParent);
    assert.ok(meta.title, `${pair}: missing title`);
    assert.ok(meta.description, `${pair}: missing description`);
    const alternates = meta.alternates as { canonical?: string; languages?: Record<string, string> };
    assert.equal(alternates.canonical, `https://www.altfreestack.com/zh/compare/${pair}`);
    assert.ok(alternates.languages?.es && alternates.languages?.en && alternates.languages?.["zh-CN"] && alternates.languages?.["x-default"]);
  }
});

test("titles sound like natural Chinese search intent, not a literal EN/ES translation", () => {
  const t = getDictionary("zh");
  const difyTitle = t.toolPage.metaTitle("Dify", "OpenAI API", 2026, "OpenCore");
  assert.match(difyTitle, /[一-鿿]/);
  assert.doesNotMatch(difyTitle, /alternative to|alternativa a/i, "should not be a leftover EN/ES template string");

  const compareTitle = t.comparisonPage.metaTitle("Dify", "Ollama", 2026);
  assert.equal(compareTitle, "Dify vs Ollama：2026 年该选哪个？");
});
