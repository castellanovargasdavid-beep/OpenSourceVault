export type HardwareGroup = "raspberry" | "minipc" | "vpsEco" | "vpsPro";
export type HardwareArch = "arm64" | "x86_64";
export type LoadZone = "green" | "yellow" | "red";

export interface HardwareProfile {
  id: string;
  group: HardwareGroup;
  /** Rótulo ya formateado, igual en ambos idiomas (nombres de hardware + cifras, no hace falta traducirlo). */
  label: string;
  ramMb: number;
  arch: HardwareArch;
}

export const HARDWARE_PROFILES: HardwareProfile[] = [
  { id: "rpi-2gb", group: "raspberry", label: "🍓 Raspberry Pi 4/5 (2 GB)", ramMb: 2048, arch: "arm64" },
  { id: "rpi-4gb", group: "raspberry", label: "🍓 Raspberry Pi 4/5 (4 GB)", ramMb: 4096, arch: "arm64" },
  { id: "rpi-8gb", group: "raspberry", label: "🍓 Raspberry Pi 4/5 (8 GB)", ramMb: 8192, arch: "arm64" },
  { id: "minipc-8gb", group: "minipc", label: "💻 Mini PC / portátil reciclado (8 GB)", ramMb: 8192, arch: "x86_64" },
  { id: "minipc-16gb", group: "minipc", label: "💻 Mini PC / portátil reciclado (16 GB)", ramMb: 16384, arch: "x86_64" },
  { id: "vps-eco-1gb", group: "vpsEco", label: "☁️ VPS económico (1 GB · ~$4-6/mes)", ramMb: 1024, arch: "x86_64" },
  { id: "vps-eco-2gb", group: "vpsEco", label: "☁️ VPS económico (2 GB · ~$4-6/mes)", ramMb: 2048, arch: "x86_64" },
  { id: "vps-pro-4gb", group: "vpsPro", label: "🚀 VPS Pro / Dedicado (4 GB+)", ramMb: 4096, arch: "x86_64" },
];

export const DEFAULT_HARDWARE_PROFILE_ID = "vps-eco-2gb";

export function getHardwareProfile(id: string): HardwareProfile {
  return HARDWARE_PROFILES.find((p) => p.id === id) ?? HARDWARE_PROFILES.find((p) => p.id === DEFAULT_HARDWARE_PROFILE_ID)!;
}

/**
 * Estimación de lo que ya consume el propio sistema operativo + el daemon de
 * Docker antes de arrancar ningún contenedor, en una instalación headless
 * típica (Debian/Ubuntu Server o Raspberry Pi OS Lite). Es una cifra
 * orientativa, no una medición exacta — se documenta así en la UI.
 */
export const OS_OVERHEAD_MB = 300;

export interface HardwareFit {
  usedMb: number;
  percent: number;
  zone: LoadZone;
}

/**
 * 45% → verde, 80% → amarillo, 130% → rojo (los ejemplos de referencia de la
 * función): verde hasta 70%, amarillo hasta 100%, rojo por encima.
 */
export function computeHardwareFit(profile: HardwareProfile, totalToolRamMb: number): HardwareFit {
  const usedMb = totalToolRamMb + OS_OVERHEAD_MB;
  const percent = profile.ramMb > 0 ? Math.round((usedMb / profile.ramMb) * 100) : 0;
  const zone: LoadZone = percent > 100 ? "red" : percent >= 70 ? "yellow" : "green";
  return { usedMb, percent, zone };
}
