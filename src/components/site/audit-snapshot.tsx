import { Check, TriangleAlert, Minus } from "lucide-react";
import type { DeploymentAudit } from "@/lib/deployment-audit";
import type { LicenseVerification } from "@/lib/license-verification";
import type { RepoHealthStatus, LatestRelease } from "@/lib/github-stats";
import { formatRelativeDate } from "@/lib/github-stats";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";

type RowStatus = "ok" | "warn" | "neutral";

const STATUS_STYLE: Record<RowStatus, { Icon: typeof Check; iconClass: string }> = {
  ok: { Icon: Check, iconClass: "text-emerald-600" },
  warn: { Icon: TriangleAlert, iconClass: "text-amber-600" },
  // "neutral" cubre tanto "no verificado" como "no aplica" — a propósito el
  // mismo gris que "warn" NO usa: ver la nota en el brief de este bloque,
  // "no verificado" no es un problema de la herramienta, es un límite de lo
  // que AltFreeStack ha podido comprobar, y el color no debe sugerir lo
  // contrario.
  neutral: { Icon: Minus, iconClass: "text-slate-400" },
};

interface RowContent {
  status: RowStatus;
  label: string;
  value: string;
  caption: string;
}

function Row({ label, value, status, caption }: RowContent) {
  const { Icon, iconClass } = STATUS_STYLE[status];
  return (
    <li className="flex items-start gap-2.5" title={caption}>
      <Icon size={16} className={cn("mt-0.5 shrink-0", iconClass)} aria-hidden="true" />
      <p className="text-sm text-slate-700">
        <span className="font-medium text-slate-900">{label}</span> — {value}
      </p>
    </li>
  );
}

function getLicenseRow(verification: LicenseVerification, t: Dictionary["auditSnapshot"]): RowContent {
  if (verification === "verified") return { status: "ok", label: t.licenseLabel, value: t.licenseVerified, caption: t.licenseVerifiedCaption };
  if (verification === "mismatch") return { status: "warn", label: t.licenseLabel, value: t.licenseMismatch, caption: t.licenseMismatchCaption };
  return { status: "neutral", label: t.licenseLabel, value: t.licenseUnverifiable, caption: t.licenseUnverifiableCaption };
}

function getGithubRow(
  status: RepoHealthStatus | null,
  lastCommitIso: string | null,
  locale: Locale,
  t: Dictionary["auditSnapshot"],
  repoHealthLastCommit: (date: string) => string
): RowContent {
  const commitSuffix = lastCommitIso ? ` ${repoHealthLastCommit(formatRelativeDate(lastCommitIso, locale))}.` : "";
  if (status === "active") return { status: "ok", label: t.githubLabel, value: t.githubActive, caption: t.githubActiveCaption + commitSuffix };
  if (status === "maintained")
    return { status: "warn", label: t.githubLabel, value: t.githubMaintained, caption: t.githubMaintainedCaption + commitSuffix };
  if (status === "stale") return { status: "warn", label: t.githubLabel, value: t.githubStale, caption: t.githubStaleCaption + commitSuffix };
  return { status: "neutral", label: t.githubLabel, value: t.githubUnknown, caption: t.githubUnknownCaption };
}

function getDockerRow(audit: DeploymentAudit | null, t: Dictionary["auditSnapshot"], toolPageT: Dictionary["toolPage"]): RowContent {
  if (!audit) return { status: "neutral", label: t.dockerLabel, value: t.dockerNoCompose, caption: t.dockerNoComposeCaption };
  switch (audit.state) {
    case "verified":
      return { status: "ok", label: t.dockerLabel, value: t.dockerVerified, caption: toolPageT.deploymentStateVerifiedCaption };
    case "partially_verified":
      return { status: "warn", label: t.dockerLabel, value: t.dockerPartial, caption: toolPageT.deploymentStatePartialCaption };
    case "unverified":
      return { status: "neutral", label: t.dockerLabel, value: t.dockerUnverified, caption: toolPageT.deploymentStateUnverifiedCaption };
    case "external_script":
      if (audit.scriptOrigin?.origin === "unverifiable") {
        return { status: "warn", label: t.dockerLabel, value: t.dockerScriptOriginWarning, caption: toolPageT.scriptOriginUnverifiable };
      }
      return { status: "neutral", label: t.dockerLabel, value: t.dockerOfficialInstaller, caption: toolPageT.deploymentStateExternalScriptCaption };
    case "manual_setup":
      return { status: "neutral", label: t.dockerLabel, value: t.dockerManualSetup, caption: toolPageT.deploymentStateManualSetupCaption };
  }
}

/**
 * "Audit Snapshot": consolida en un único bloque, cerca de arriba de la
 * ficha, las señales que antes estaban repartidas entre RepoHealthBadge, el
 * mini-header de UpdateCheckerCard y la fila de badges de verificación
 * Docker — sin inventar ningún dato nuevo salvo la comprobación de licencia
 * (ver license-verification.ts), y sin nunca mostrar ✓ por defecto: cada
 * fila refleja el estado real de ESTA herramienta, y "no verificado"/"no
 * aplica" se muestran en gris neutro (nunca en rojo ni como advertencia de
 * la herramienta) — es un límite de lo que hemos podido comprobar, no un
 * fallo suyo. Deliberadamente sin ninguna puntuación agregada ("Audit
 * Score"): transparencia verificable, no un ranking.
 */
export function AuditSnapshot({
  locale,
  t,
  toolPageT,
  licenseVerification,
  repoHealthStatus,
  lastCommitIso,
  latestRelease,
  releasesUrl,
  deploymentAudit,
}: {
  locale: Locale;
  t: Dictionary["auditSnapshot"];
  toolPageT: Dictionary["toolPage"];
  licenseVerification: LicenseVerification;
  repoHealthStatus: RepoHealthStatus | null;
  lastCommitIso: string | null;
  latestRelease: LatestRelease | null;
  releasesUrl: string | null;
  deploymentAudit: DeploymentAudit | null;
}) {
  const releaseValue = latestRelease
    ? latestRelease.publishedAt
      ? `${latestRelease.tag} · ${formatRelativeDate(latestRelease.publishedAt, locale)}`
      : latestRelease.tag
    : t.releaseUnavailable;

  const rows: RowContent[] = [
    getLicenseRow(licenseVerification, t),
    getGithubRow(repoHealthStatus, lastCommitIso, locale, t, toolPageT.repoHealthLastCommit),
    { status: "neutral", label: t.releaseLabel, value: releaseValue, caption: t.releaseCaption },
    getDockerRow(deploymentAudit, t, toolPageT),
    { status: "warn", label: t.productionLabel, value: t.productionValue, caption: t.productionCaption },
  ];

  return (
    <section className="mb-10 rounded-xl border border-slate-200 bg-slate-50/60 p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-slate-900">{t.title}</p>
        {releasesUrl && latestRelease && (
          <a href={releasesUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-emerald-700 hover:underline">
            {t.releaseViewLink}
          </a>
        )}
      </div>
      <ul className="space-y-3">
        {rows.map((row) => (
          <Row key={row.label} {...row} />
        ))}
      </ul>
    </section>
  );
}
