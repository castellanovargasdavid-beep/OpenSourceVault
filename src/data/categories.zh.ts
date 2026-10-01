import type { ToolCategory } from "@/lib/types";

/**
 * Traducción al chino simplificado de las 16 categorías. No se generan
 * páginas /zh/categories/... en este MVP (ver lib/zh-mvp.ts) — esta
 * traducción solo alimenta el LABEL que aparece como badge/breadcrumb de
 * texto en las páginas zh de tool/compare que sí existen, nunca un enlace
 * a una categoría. `slug` se mantiene por paridad de forma con
 * categories.en.ts pero no se usa para generar ninguna URL china.
 */
export interface CategoryTranslationZh {
  label: string;
  description: string;
  slug: string;
}

export const categoriesZh: Record<ToolCategory, CategoryTranslationZh> = {
  Productivity: {
    label: "办公协作",
    description: "笔记、项目管理、日历和团队聊天，不依赖 SaaS。",
    slug: "productivity",
  },
  Analytics: {
    label: "网站分析",
    description: "衡量你的流量，而不把用户数据交给第三方。",
    slug: "analytics",
  },
  DevTools: {
    label: "开发者工具",
    description: "后端、自动化与数据库，帮你更快构建产品。",
    slug: "dev-tools",
  },
  CRM: {
    label: "CRM 与客服",
    description: "管理客户、销售与支持，不按席位收费。",
    slug: "crm",
  },
  AI: {
    label: "人工智能",
    description: "可自托管的 AI 界面与工具。",
    slug: "ai",
  },
  Storage: {
    label: "存储",
    description: "把文件和数据保存在你自己的基础设施上。",
    slug: "storage",
  },
  Ecommerce: {
    label: "电商",
    description: "搭建在线商店，不收取按单抽成，也没有月费。",
    slug: "ecommerce",
  },
  VideoConferencing: {
    label: "视频会议",
    description: "视频通话与网络研讨会，没有时长或人数限制。",
    slug: "video-conferencing",
  },
  PasswordManagers: {
    label: "密码管理",
    description: "把团队的密码保存在你自己的基础设施上。",
    slug: "password-managers",
  },
  AuthIdentity: {
    label: "身份认证",
    description: "单点登录、SSO 与身份管理，不依赖 Auth0 或 Okta。",
    slug: "auth-identity",
  },
  CloudPaas: {
    label: "部署与 PaaS",
    description: "部署你自己的应用，不依赖 Vercel 或 Heroku。",
    slug: "deployment-paas-hosting",
  },
  MonitoringLogs: {
    label: "监控与日志",
    description: "追踪错误、指标与生产日志，不按席位付费。",
    slug: "monitoring-logs-errors",
  },
  MarketingForms: {
    label: "营销与表单",
    description: "问卷、表单、邮件通讯与短链接，数据完全由你掌控。",
    slug: "marketing-forms-email",
  },
  SmartHome: {
    label: "智能家居",
    description: "家庭自动化、摄像头与 IoT 设备，完全由你控制，不经第三方云。",
    slug: "smart-home",
  },
  MediaAutomation: {
    label: "媒体自动化",
    description: "自动整理和管理你的电影、剧集、音乐与图书库。",
    slug: "media-automation",
  },
  PersonalFinance: {
    label: "个人理财",
    description: "追踪预算、支出与订阅，不把银行数据交给第三方应用。",
    slug: "personal-finance",
  },
};
