import type { ToolCategory } from "@/lib/types";

interface CategoryPalette {
  /** Fondo suave para tarjetas/secciones */
  soft: string;
  /** Texto sobre fondo suave */
  text: string;
  /** Borde sutil a juego */
  border: string;
  /** Borde al hacer hover */
  borderHover: string;
  /** Fondo del icono */
  iconBg: string;
  /** Color del icono */
  iconText: string;
  /** Badge (fondo + texto) */
  badge: string;
  /** Gradiente para avatares/placeholders */
  gradient: string;
}

export const categoryColors: Record<ToolCategory, CategoryPalette> = {
  Productivity: {
    soft: "bg-violet-50",
    text: "text-violet-700",
    border: "border-violet-200",
    borderHover: "hover:border-violet-300",
    iconBg: "bg-violet-100",
    iconText: "text-violet-600",
    badge: "bg-violet-100 text-violet-700",
    gradient: "from-violet-500 to-purple-600",
  },
  Analytics: {
    soft: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    borderHover: "hover:border-blue-300",
    iconBg: "bg-blue-100",
    iconText: "text-blue-600",
    badge: "bg-blue-100 text-blue-700",
    gradient: "from-blue-500 to-cyan-500",
  },
  DevTools: {
    soft: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    borderHover: "hover:border-amber-300",
    iconBg: "bg-amber-100",
    iconText: "text-amber-600",
    badge: "bg-amber-100 text-amber-700",
    gradient: "from-amber-500 to-orange-600",
  },
  CRM: {
    soft: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
    borderHover: "hover:border-rose-300",
    iconBg: "bg-rose-100",
    iconText: "text-rose-600",
    badge: "bg-rose-100 text-rose-700",
    gradient: "from-rose-500 to-pink-600",
  },
  AI: {
    soft: "bg-fuchsia-50",
    text: "text-fuchsia-700",
    border: "border-fuchsia-200",
    borderHover: "hover:border-fuchsia-300",
    iconBg: "bg-fuchsia-100",
    iconText: "text-fuchsia-600",
    badge: "bg-fuchsia-100 text-fuchsia-700",
    gradient: "from-fuchsia-500 to-purple-600",
  },
  Storage: {
    soft: "bg-teal-50",
    text: "text-teal-700",
    border: "border-teal-200",
    borderHover: "hover:border-teal-300",
    iconBg: "bg-teal-100",
    iconText: "text-teal-600",
    badge: "bg-teal-100 text-teal-700",
    gradient: "from-teal-500 to-emerald-600",
  },
  Ecommerce: {
    soft: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200",
    borderHover: "hover:border-orange-300",
    iconBg: "bg-orange-100",
    iconText: "text-orange-600",
    badge: "bg-orange-100 text-orange-700",
    gradient: "from-orange-500 to-red-500",
  },
  VideoConferencing: {
    soft: "bg-cyan-50",
    text: "text-cyan-700",
    border: "border-cyan-200",
    borderHover: "hover:border-cyan-300",
    iconBg: "bg-cyan-100",
    iconText: "text-cyan-600",
    badge: "bg-cyan-100 text-cyan-700",
    gradient: "from-cyan-500 to-blue-600",
  },
  PasswordManagers: {
    soft: "bg-indigo-50",
    text: "text-indigo-700",
    border: "border-indigo-200",
    borderHover: "hover:border-indigo-300",
    iconBg: "bg-indigo-100",
    iconText: "text-indigo-600",
    badge: "bg-indigo-100 text-indigo-700",
    gradient: "from-indigo-500 to-slate-700",
  },
  AuthIdentity: {
    soft: "bg-sky-50",
    text: "text-sky-700",
    border: "border-sky-200",
    borderHover: "hover:border-sky-300",
    iconBg: "bg-sky-100",
    iconText: "text-sky-600",
    badge: "bg-sky-100 text-sky-700",
    gradient: "from-sky-500 to-blue-700",
  },
  CloudPaas: {
    soft: "bg-lime-50",
    text: "text-lime-700",
    border: "border-lime-200",
    borderHover: "hover:border-lime-300",
    iconBg: "bg-lime-100",
    iconText: "text-lime-700",
    badge: "bg-lime-100 text-lime-700",
    gradient: "from-lime-500 to-green-600",
  },
  MonitoringLogs: {
    soft: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
    borderHover: "hover:border-red-300",
    iconBg: "bg-red-100",
    iconText: "text-red-600",
    badge: "bg-red-100 text-red-700",
    gradient: "from-red-500 to-rose-700",
  },
  MarketingForms: {
    soft: "bg-pink-50",
    text: "text-pink-700",
    border: "border-pink-200",
    borderHover: "hover:border-pink-300",
    iconBg: "bg-pink-100",
    iconText: "text-pink-600",
    badge: "bg-pink-100 text-pink-700",
    gradient: "from-pink-500 to-fuchsia-600",
  },
};
