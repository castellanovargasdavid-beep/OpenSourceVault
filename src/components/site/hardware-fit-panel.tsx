"use client";

import * as React from "react";
import { AlertTriangle, Cpu } from "lucide-react";
import {
  HARDWARE_PROFILES,
  DEFAULT_HARDWARE_PROFILE_ID,
  getHardwareProfile,
  computeHardwareFit,
  type LoadZone,
} from "@/lib/hardware-profiles";
import { formatMinRam } from "@/lib/tool-difficulty";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries/es";

const ZONE_STYLES: Record<LoadZone, { badgeClass: string; barClass: string }> = {
  green: { badgeClass: "border-emerald-200 bg-emerald-50 text-emerald-800", barClass: "bg-emerald-500" },
  yellow: { badgeClass: "border-amber-200 bg-amber-50 text-amber-800", barClass: "bg-amber-500" },
  red: { badgeClass: "border-rose-200 bg-rose-50 text-rose-800", barClass: "bg-rose-500" },
};

export function HardwareFitPanel({
  totalMinRamMb,
  gpuRequiredToolNames,
  t,
}: {
  totalMinRamMb: number;
  gpuRequiredToolNames: string[];
  t: Dictionary["hardwareFit"];
}) {
  const [profileId, setProfileId] = React.useState(DEFAULT_HARDWARE_PROFILE_ID);
  const profile = getHardwareProfile(profileId);
  const fit = computeHardwareFit(profile, totalMinRamMb);
  const zoneStyle = ZONE_STYLES[fit.zone];
  const zoneTitle = fit.zone === "green" ? t.zoneGreenTitle : fit.zone === "yellow" ? t.zoneYellowTitle : t.zoneRedTitle;
  const zoneBody = fit.zone === "green" ? t.zoneGreenBody : fit.zone === "yellow" ? t.zoneYellowBody : t.zoneRedBody;

  return (
    <div className="rounded-xl border border-slate-200 p-6">
      <p className="mb-4 flex items-center gap-1.5 text-sm font-semibold text-slate-900">
        <Cpu size={16} className="text-slate-500" />
        {t.title}
      </p>

      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-600">{t.machineLabel}</label>
      <select
        value={profileId}
        onChange={(e) => setProfileId(e.target.value)}
        className="mb-4 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
      >
        {HARDWARE_PROFILES.map((p) => (
          <option key={p.id} value={p.id}>
            {p.label}
          </option>
        ))}
      </select>

      <div className="mb-1.5 flex items-baseline justify-between text-xs text-slate-600">
        <span>{t.ramUsedLabel}</span>
        <span className="font-medium text-slate-900">
          {`${formatMinRam(fit.usedMb)} ${t.ofRam} ${formatMinRam(profile.ramMb)} (${fit.percent}%)`}
        </span>
      </div>
      <div className="mb-3 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div className={cn("h-full rounded-full transition-all", zoneStyle.barClass)} style={{ width: `${Math.min(fit.percent, 100)}%` }} />
      </div>
      <p className="mb-4 text-[11px] text-slate-500">{t.overheadNote}</p>

      <div className={cn("rounded-lg border px-3 py-2.5 text-xs", zoneStyle.badgeClass)}>
        <p className="font-semibold">{zoneTitle}</p>
        <p className="mt-0.5">{zoneBody}</p>
      </div>

      {gpuRequiredToolNames.length > 0 && (
        <div className="mt-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2.5 text-xs text-rose-800">
          <p className="flex items-center gap-1.5 font-semibold">
            <AlertTriangle size={13} /> {t.gpuWarningTitle}
          </p>
          <p className="mt-0.5">{`${t.gpuWarningBody} ${gpuRequiredToolNames.join(", ")}`}</p>
        </div>
      )}

      {profile.arch === "arm64" && (
        <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-600">
          <p className="font-semibold text-slate-700">{t.armWarningTitle}</p>
          <p className="mt-0.5">{t.armWarningBody}</p>
        </div>
      )}
    </div>
  );
}
