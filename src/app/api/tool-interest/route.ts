import { NextResponse } from "next/server";
import { allTools } from "@/data/tools";

export const runtime = "nodejs";

interface InterestPayload {
  slug: string;
  kind: "vote" | "email";
  email?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * TODO(persistencia): esto valida y registra el interés en los logs de la
 * función (Vercel → Logs), pero NO lo guarda en ningún sitio permanente ni
 * agrega un contador de votos real — este proyecto no tiene base de datos
 * configurada. Para que el conteo de votos y la lista de emails sean
 * reales, conecta aquí un backend (Vercel KV / Upstash Redis para un
 * contador simple, o una tabla en Postgres/Airtable/Google Sheets para los
 * emails) y sustituye el bloque `console.log` de abajo por la escritura
 * real. Hasta entonces, cada voto/email llega aquí pero no persiste entre
 * despliegues.
 */
export async function POST(request: Request) {
  let body: InterestPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const { slug, kind, email } = body;

  if (typeof slug !== "string" || !slug) {
    return NextResponse.json({ error: "missing_slug" }, { status: 400 });
  }
  if (kind !== "vote" && kind !== "email") {
    return NextResponse.json({ error: "invalid_kind" }, { status: 400 });
  }
  const tool = allTools.find((t) => t.slug === slug);
  if (!tool) {
    return NextResponse.json({ error: "unknown_tool" }, { status: 404 });
  }
  if (kind === "email") {
    if (typeof email !== "string" || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "invalid_email" }, { status: 400 });
    }
  }

  console.log("[tool-interest]", {
    slug,
    kind,
    email: kind === "email" ? email : undefined,
    at: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
