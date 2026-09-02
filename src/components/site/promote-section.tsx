"use client";

import * as React from "react";
import { Check, Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { categories } from "@/data/categories";
import { categoriesEn } from "@/data/categories.en";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";

type Plan = "featured" | "top" | "unsure";
type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function PromoteSection({
  locale = "es",
  t,
}: {
  locale?: Locale;
  /** t.promotePage ya resuelto por PromoteContent (Server Component) — evita importar get-dictionary (es+en completos) en este client component. */
  t: Dictionary["promotePage"];
}) {
  const formRef = React.useRef<HTMLDivElement>(null);

  const [plan, setPlan] = React.useState<Plan>("unsure");
  const [toolName, setToolName] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [category, setCategory] = React.useState(categories[0].id);
  const [status, setStatus] = React.useState<Status>("idle");
  const [fieldError, setFieldError] = React.useState<string | null>(null);

  function choosePlan(nextPlan: "featured" | "top") {
    setPlan(nextPlan);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setFieldError(null);

    if (!isValidHttpUrl(url)) {
      setFieldError(t.errorInvalidUrl);
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setFieldError(t.errorInvalidEmail);
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/promote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toolName, url, email, category, plan }),
      });
      if (!res.ok) throw new Error("request_failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function resetForm() {
    setToolName("");
    setUrl("");
    setEmail("");
    setCategory(categories[0].id);
    setPlan("unsure");
    setStatus("idle");
    setFieldError(null);
  }

  const plans: { id: "featured" | "top"; data: typeof t.plans.featured; ribbon?: string; highlight: boolean }[] = [
    { id: "featured", data: t.plans.featured, highlight: false },
    { id: "top", data: t.plans.top, ribbon: t.plans.top.badge, highlight: true },
  ];

  return (
    <>
      <section className="mt-14">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{t.plansTitle}</h2>
          <p className="mt-3 text-slate-600">{t.plansSubtitle}</p>
        </div>

        <div className="mx-auto mt-8 grid max-w-3xl gap-6 sm:grid-cols-2">
          {plans.map(({ id, data, ribbon, highlight }) => (
            <Card
              key={id}
              className={cn("relative flex flex-col", highlight && "border-emerald-300 shadow-md ring-1 ring-emerald-200")}
            >
              {ribbon && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                  {ribbon}
                </span>
              )}
              <CardHeader>
                <p className="text-lg font-semibold text-slate-900">{data.name}</p>
                <p className="mt-1 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-slate-900">{data.price}</span>
                  <span className="text-sm text-slate-600">{data.period}</span>
                </p>
                <p className="mt-2 text-sm text-slate-600">{data.description}</p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-6">
                <ul className="flex-1 space-y-2.5">
                  {data.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-slate-700">
                      <Check size={16} className="mt-0.5 shrink-0 text-emerald-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  type="button"
                  variant={highlight ? "default" : "outline"}
                  size="lg"
                  className="w-full"
                  onClick={() => choosePlan(id)}
                >
                  {data.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section ref={formRef} className="mx-auto mt-16 max-w-xl scroll-mt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{t.formTitle}</h2>
          <p className="mt-3 text-slate-600">{t.formSubtitle}</p>
        </div>

        <Card className="mt-8">
          <CardContent className="pt-6">
            {status === "success" ? (
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <CheckCircle2 size={36} className="text-emerald-600" />
                <p className="font-medium text-slate-900">{t.success}</p>
                <Button type="button" variant="outline" size="sm" onClick={resetForm}>
                  {t.sendAnother}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="promote-tool-name" className="mb-1.5 block text-sm font-medium text-slate-700">
                    {t.fields.toolName}
                  </label>
                  <Input
                    id="promote-tool-name"
                    required
                    minLength={2}
                    maxLength={120}
                    value={toolName}
                    onChange={(e) => setToolName(e.target.value)}
                    placeholder={t.fields.toolNamePlaceholder}
                  />
                </div>

                <div>
                  <label htmlFor="promote-url" className="mb-1.5 block text-sm font-medium text-slate-700">
                    {t.fields.url}
                  </label>
                  <Input
                    id="promote-url"
                    type="url"
                    required
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder={t.fields.urlPlaceholder}
                  />
                </div>

                <div>
                  <label htmlFor="promote-email" className="mb-1.5 block text-sm font-medium text-slate-700">
                    {t.fields.email}
                  </label>
                  <Input
                    id="promote-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.fields.emailPlaceholder}
                  />
                </div>

                <div>
                  <label htmlFor="promote-category" className="mb-1.5 block text-sm font-medium text-slate-700">
                    {t.fields.category}
                  </label>
                  <select
                    id="promote-category"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value as typeof category)}
                    className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {locale === "en" ? categoriesEn[c.id].label : c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="promote-plan" className="mb-1.5 block text-sm font-medium text-slate-700">
                    {t.fields.plan}
                  </label>
                  <select
                    id="promote-plan"
                    value={plan}
                    onChange={(e) => setPlan(e.target.value as Plan)}
                    className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  >
                    <option value="featured">{t.plans.featured.name} ({t.plans.featured.price}{t.plans.featured.period})</option>
                    <option value="top">{t.plans.top.name} ({t.plans.top.price}{t.plans.top.period})</option>
                    <option value="unsure">{t.fields.planUnsure}</option>
                  </select>
                </div>

                {(fieldError || status === "error") && (
                  <p className="flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    {fieldError ?? t.error}
                  </p>
                )}

                <Button type="submit" size="lg" className="w-full gap-2" disabled={status === "loading"}>
                  {status === "loading" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      {t.submitting}
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      {t.submit}
                    </>
                  )}
                </Button>

                <p className="text-xs text-slate-600">{t.disclaimer}</p>
              </form>
            )}
          </CardContent>
        </Card>
      </section>
    </>
  );
}
