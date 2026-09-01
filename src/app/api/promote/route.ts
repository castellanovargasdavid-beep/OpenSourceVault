import { NextResponse } from "next/server";
import { categories } from "@/data/categories";

export const runtime = "nodejs";

interface PromotePayload {
  toolName: string;
  url: string;
  email: string;
  category: string;
  plan?: "featured" | "top" | "unsure";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_CATEGORY_IDS = new Set(categories.map((c) => c.id as string));
const PLAN_LABEL: Record<"featured" | "top" | "unsure", string> = {
  featured: "Featured ($49/mes)",
  top: "Top de categoría ($99/mes)",
  unsure: "Aún no está seguro",
};

function isValidHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Envía la solicitud de patrocinio por email vía la API de Resend. Si
 * RESEND_API_KEY no está configurada (p.ej. justo tras el primer deploy),
 * la solicitud se valida y se registra igualmente en los logs de la
 * función (Vercel → Logs) en lugar de fallar, para no romper la UX del
 * formulario mientras se configura el envío real.
 */
export async function POST(request: Request) {
  let body: PromotePayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const { toolName, url, email, category } = body;
  const plan: "featured" | "top" | "unsure" =
    body.plan && body.plan in PLAN_LABEL ? body.plan : "unsure";

  if (typeof toolName !== "string" || toolName.trim().length < 2 || toolName.length > 120) {
    return NextResponse.json({ error: "invalid_tool_name" }, { status: 400 });
  }
  if (typeof url !== "string" || !isValidHttpUrl(url)) {
    return NextResponse.json({ error: "invalid_url" }, { status: 400 });
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  if (typeof category !== "string" || !VALID_CATEGORY_IDS.has(category)) {
    return NextResponse.json({ error: "invalid_category" }, { status: 400 });
  }

  const submittedAt = new Date().toISOString();
  const categoryMeta = categories.find((c) => c.id === category);
  const summary = {
    toolName: toolName.trim(),
    url,
    email,
    category: categoryMeta?.label ?? category,
    plan: PLAN_LABEL[plan],
    submittedAt,
  };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[promote] RESEND_API_KEY no configurada, solo se registra en logs:", summary);
    return NextResponse.json({ ok: true });
  }

  const notifyEmail = process.env.PROMOTE_NOTIFY_EMAIL || "lecastvarg@gmail.com";
  const fromEmail = process.env.RESEND_FROM_EMAIL || "AltFreeStack <onboarding@resend.dev>";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: notifyEmail,
        reply_to: email,
        subject: `Nueva solicitud de patrocinio: ${summary.toolName} (${PLAN_LABEL[plan]})`,
        text: [
          `Herramienta: ${summary.toolName}`,
          `URL: ${url}`,
          `Categoría: ${summary.category}`,
          `Plan de interés: ${summary.plan}`,
          `Email de contacto: ${email}`,
          `Recibido: ${submittedAt}`,
        ].join("\n"),
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[promote] Resend respondió con error:", res.status, errText);
      return NextResponse.json({ error: "email_send_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("[promote] Fallo al llamar a Resend:", err);
    return NextResponse.json({ error: "email_send_failed" }, { status: 502 });
  }

  console.log("[promote]", summary);
  return NextResponse.json({ ok: true });
}
