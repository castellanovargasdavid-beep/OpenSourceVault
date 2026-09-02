import { Rocket, TrendingUp, Users, HardDrive, ShieldCheck, Terminal, Headset, ShoppingCart, type LucideIcon } from "lucide-react";
import type { StackIcon } from "@/lib/types";

export const stackIconMap: Record<StackIcon, LucideIcon> = {
  rocket: Rocket,
  "trending-up": TrendingUp,
  users: Users,
  "hard-drive": HardDrive,
  "shield-check": ShieldCheck,
  terminal: Terminal,
  headset: Headset,
  "shopping-cart": ShoppingCart,
};
