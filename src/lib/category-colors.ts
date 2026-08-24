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
};
