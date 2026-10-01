export interface HostingProviderTranslationZh {
  tagline: string;
  startingPrice: string;
  freeCredit?: string;
  bestFor: string;
  features: string[];
  ctaLabel: string;
}

export const hostingProvidersZh: Record<string, HostingProviderTranslationZh> = {
  digitalocean: {
    tagline: "简单、价格可预测的 VPS，配有详尽的技术文档",
    startingPrice: "每月 $4 起",
    freeCredit: "90 天内 $5 免费额度",
    bestFor: "通过 Droplets 和 App Platform 快速上手",
    features: [
      "Droplets（VPS）最低 512MB 内存起",
      "Marketplace 提供 Docker 一键应用",
      "托管数据库与 Kubernetes",
      "极其简洁的控制面板与 CLI",
    ],
    ctaLabel: "领取 $5 免费额度",
  },
  vultr: {
    tagline: "覆盖全球 32 个数据中心的高性能云服务器",
    startingPrice: "每月 $6 起",
    bestFor: "就近选择离用户最近的区域，价格透明可预测",
    features: [
      "Cloud Compute 最低 1 vCPU / 1GB 内存起",
      "Marketplace 提供 Docker 一键应用",
      "块存储与负载均衡",
      "6 大洲 32 个数据中心",
    ],
    ctaLabel: "在 Vultr 上部署",
  },
  railway: {
    tagline: "几分钟内直接从 docker-compose 或 GitHub 仓库完成部署",
    startingPrice: "Hobby 计划每月 $5 起",
    bestFor: "无需手动管理服务器或 Docker 即可完成部署",
    features: [
      "从 GitHub 自动部署",
      "支持 Dockerfile 与 docker-compose",
      "一键托管数据库",
      "自动扩容与基于 PR 的预览环境",
    ],
    ctaLabel: "在 Railway 上部署",
  },
};
