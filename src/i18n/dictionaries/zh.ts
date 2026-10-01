import type { Dictionary } from "./es";
import en from "./en";

/**
 * Piloto zh-CN (AI/LLM/self-hosting) — ver el encargo original. Esta es
 * UNA sola fuente de verdad para el diccionario, igual que es.ts/en.ts:
 * ningún componente compartido (HostingTierRecommendation, AuditSnapshot,
 * DockerComposeBlock...) necesita saber que existe un tercer idioma, solo
 * recibe `Dictionary["xyz"]` como siempre.
 *
 * NO es una traducción completa del sitio — a propósito. Partimos de `en`
 * (no de `es`) como base para que cualquier clave NO traducida aquí caiga
 * en inglés en vez de en español: el encargo pide explícitamente que,
 * cuando algo se muestre sin traducir en una página que se presenta como
 * china, sea inglés (ya aceptado como degradación razonable en el propio
 * encargo) y nunca español (que rompería la ilusión de página china sin
 * ninguna razón reconocible por el usuario). Las claves realmente
 * traducidas abajo son exactamente las que renderizan los 21 componentes
 * del piloto (home/tool/compare) — ver zh-tool-page-content.tsx y
 * zh-comparison-page-content.tsx. El resto (stacks, doctor, replace,
 * calculadoras, guías...) no tiene página zh todavía, así que se queda en
 * inglés sin que eso sea visible en ningún sitio real.
 */

/** Mismos 4 términos en inglés que titleLicenseWordEs/Es — "Open-Core"/"Fair-code"/"Source-available"/"FOSS" son términos propios de este catálogo, no se traducen (ver sección 16 del encargo). */
function titleLicenseWordZh(fossModel?: "FOSS" | "OpenCore" | "FairCode" | "SourceAvailable"): string {
  switch (fossModel) {
    case "OpenCore":
      return "Open-Core";
    case "FairCode":
      return "Fair-code";
    case "SourceAvailable":
      return "Source-available";
    default:
      return "Open Source";
  }
}

const zhOverrides: Pick<
  Dictionary,
  "breadcrumb" | "toolCard" | "difficulty" | "dockerBlock" | "toolPage" | "auditSnapshot" | "comparisonPage" | "hostingTier"
> = {
  breadcrumb: {
    home: "首页",
  },
  toolCard: {
    tagDockerReady: "Docker Ready",
    tagOneClick: "一键部署",
    tagPermissive: "宽松许可证",
    sponsored: "赞助",
    alternativeTo: "替代",
    cta: "查看详情与部署指南",
    comingSoonCta: "我想要这个",
    fossModelFoss: "100% FOSS",
    fossModelOpenCore: "Open-Core",
    fossModelFairCode: "Fair-code",
    fossModelSourceAvailable: "Source-available",
    starsSnapshotCaption: "最近一次检查时的 GitHub star 数——此后可能已经增长。想看实时数字，请打开该工具的详情页。",
  },
  difficulty: {
    filterLabel: "按所需资源筛选",
    beginnerFilter: "🟢 轻量",
    beginnerFilterHint: "< 512MB · 每月 $4-6 VPS",
    intermediateFilter: "🟡 标准",
    intermediateFilterHint: "1-2GB 内存",
    advancedFilter: "🔴 完整",
    advancedFilterHint: "> 2GB · 独立服务器",
    beginnerBadge: "轻量",
    intermediateBadge: "标准",
    advancedBadge: "完整",
    ramBadgePrefix: "最低内存",
    ramEstimatedNote: "（根据其 docker-compose 估算，并非生产环境实测）",
    storageBadgePrefix: "建议存储空间：",
  },
  dockerBlock: {
    regenerate: "重新生成密钥",
    generate: "生成安全密钥",
    copied: "已复制",
    copy: "复制",
    copyError: "复制失败",
    randomizedNote: "密码在你的浏览器本地随机生成——不会发送到任何服务器。复制前请先妥善保存。",
    installScriptFilename: "install.sh（官方脚本）",
  },
  toolPage: {
    metaTitle: (tool: string, saas: string, year: number, fossModel) => `${tool}：${year} 年替代 ${saas} 的${titleLicenseWordZh(fossModel)}方案`,
    h1: (tool: string, saas: string, year: number, fossModel) => `${tool}：${year} 年替代 ${saas} 的${titleLicenseWordZh(fossModel)}方案`,
    hostingGuidesRowLabel: "分步指南：",
    license: "许可证",
    stars: "stars",
    estimated: "（估算）",
    website: "官网",
    tryDemo: "体验 Demo",
    deployOn: (platform: string) => `部署到 ${platform}`,
    githubRepo: "GitHub 仓库",
    repoHealthLastCommit: (date: string) => `最近一次提交 ${date}`,
    replacesBadge: (saas: string) => `替代 ${saas}`,
    replacesAriaLabel: "可替代的 SaaS 工具",
    featuredInTitle: "收录于以下 Stack",
    featuredInBadge: (stackTitle: string) => `收录于 ${stackTitle}`,
    underTheHoodTitle: "技术细节",
    underTheHoodDatabase: "数据库",
    underTheHoodLanguage: "开发语言",
    underTheHoodPlatforms: "支持平台",
    fossModelFoss: "100% FOSS",
    fossModelOpenCore: "Open-Core",
    fossModelOpenCoreCaption: "核心代码开源，但可能有高级功能或企业支持需要付费——请查看许可证细节。",
    fossModelFairCode: "Fair-code",
    fossModelFairCodeCaption: "代码公开，自托管使用没有限制，但许可证并非 OSI 认可的开源协议：禁止转售或将其包装成你自己收费的 SaaS。",
    fossModelSourceAvailable: "Source-available",
    fossModelSourceAvailableCaption: "代码公开且可免费自托管，但许可证并非 OSI 认可的开源协议——商用前请仔细核对具体条款。",
    fichaTecnica: "技术信息",
    fieldLicense: "许可证",
    fieldCategory: "分类",
    fieldReplaces: "替代",
    fieldStack: "技术栈",
    preview: "预览",
    previewCaption: (name: string) => `由 ${name} 在其官网提供的公开图片。`,
    features: "主要功能",
    vs: (tool: string, saas: string) => `${tool} vs. ${saas}`,
    pros: "优点",
    cons: "需要注意",
    dockerGuideTitle: "快速 Docker 安装指南",
    dockerGuideText: "复制下面的 docker-compose.yml，把示例密码替换成自己的，然后在服务器上运行 docker compose up -d。",
    dockerGuideTextScript: "这个工具不是通过普通的 docker-compose.yml 安装的，而是使用项目自带的官方安装脚本——运行前请先检查脚本内容。",
    dockerGuideLink: "查看完整分步指南 →",
    deploymentStateVerifiedCaption: "已按 AltFreeStack 公开的部署标准核实：镜像来源可识别、tag 已固定或使用 digest、来源可追溯，且没有已知的不安全配置信号。这并不是对软件本身或其依赖项的安全审计。",
    deploymentStatePartialCaption: "这个镜像已经过部分人工核实（或其 tag 已经是固定版本的形式），但尚未对照 Docker 注册表完成完整核查。",
    deploymentStateUnverifiedCaption: "AltFreeStack 尚未对这个镜像进行过人工核实。它完全可能正常可用——只是我们自己还没有验证过。",
    deploymentStateExternalScriptCaption: "这个工具不通过 docker-compose.yml 部署：它使用项目自带的官方安装脚本，由脚本自行管理 Docker（或其他基础设施）。",
    deploymentStateManualSetupCaption: "这个工具完全不使用 Docker 容器——需要直接在你的服务器上编译/运行该项目。",
    scriptOriginUnverifiable: "来源无法自动确认",
    comparisonTitle: "💡 官方 SaaS，还是用 AltFreeStack 自托管？",
    comparisonCloudLabel: "官方云服务：",
    comparisonSelfHostedLabel: "你自己的 VPS：",
    dockerComposeSourceActive: (date: string) => `这份 docker-compose 对应一个在 GitHub 上仍有活跃更新的项目——最近一次提交于 ${date}。`,
    dockerComposeSourceGeneric: "目前无法读取该仓库在 GitHub 上的最新活动。",
    dockerStatusArchivedWarning: "⚠️ 这个工具的 Docker 镜像已在其原始注册表中被项目方归档/弃用。部署前请查看官方仓库——可能已有替代镜像。",
    dockerStatusLegacyWarning: "⚠️ 这是遗留（legacy）镜像路径：目前仍可使用，但项目方已在另一个注册表/仓库发布了更新的镜像。部署前请查看 docker-compose 中的注释。",
    reportIssueLink: "这份 docker-compose 对你不起作用？在 GitHub 上反馈 →",
    reportIssueTitle: (tool: string) => `${tool} 的 docker-compose 无法正常工作`,
    otherAlternatives: "同类替代方案",
    viewAlternatives: (saas: string) => `查看 ${saas} 的替代方案`,
    replaceGuideLink: (saas: string) => `如何替代 ${saas}？`,
    migrationGuide: "迁移指南",
    migrationLink: (from: string, tool: string) => `如何从 ${from} 迁移到 ${tool}`,
    comparisons: "对比评测",
    comparisonLink: (a: string, b: string) => `${a} vs ${b}`,
  },
  auditSnapshot: {
    title: "审查速览（Audit Snapshot）",
    licenseLabel: "许可证",
    licenseVerified: "与 GitHub 一致",
    licenseVerifiedCaption: "我们标注的许可证标识与 GitHub 为该仓库检测到的一致。",
    licenseMismatch: "与 GitHub 不一致",
    licenseMismatchCaption: "我们标注的许可证标识与 GitHub 检测到的不一致——这并不代表该项目的许可证有问题，只说明我们目录里的数据和 GitHub 的数据没有对上。可能是表述上的细微差异，也可能是两边中有一方的数据过时了。",
    licenseUnverifiable: "无法在 GitHub 上核实",
    licenseUnverifiableCaption: "GitHub 没有为该仓库提供标准的许可证标识，或者我们目录里使用的值没有可靠的 SPDX 对照——这是现有数据的局限，不是该工具本身的问题。",
    githubLabel: "GitHub",
    githubActive: "活跃",
    githubActiveCaption: "最近 60 天内有提交。",
    githubMaintained: "维护放缓",
    githubMaintainedCaption: "2 到 6 个月没有活动——不代表项目已被放弃。",
    githubStale: "已过时",
    githubStaleCaption: "超过 6 个月没有活动——如果你需要持续的官方支持，建议先核实清楚。",
    githubUnknown: "暂无实时数据",
    githubUnknownCaption: "目前无法访问 GitHub API。",
    releaseLabel: "最新版本",
    releaseUnavailable: "暂无数据",
    releaseCaption: "GitHub 上真实发布的最新版本（release 或最近的 tag）。",
    releaseViewLink: "查看发布说明 →",
    dockerLabel: "Docker Compose",
    dockerVerified: "已核实",
    dockerPartial: "部分核实",
    dockerUnverified: "未核实",
    dockerNoCompose: "不适用",
    dockerNoComposeCaption: "该工具在目录中没有声明 docker-compose.yml。",
    dockerOfficialInstaller: "官方安装脚本，无 compose",
    dockerManualSetup: "手动安装，不使用 Docker",
    dockerScriptOriginWarning: "脚本来源无法核实",
    productionLabel: "生产环境",
    productionValue: "AltFreeStack 未做生产环境测试",
    productionCaption: "我们核实的是目录数据与配置，并不会在真实生产环境中运行这些工具——这是我们审核流程本身的局限，不是该工具的问题。",
  },
  comparisonPage: {
    metaTitle: (a: string, b: string, year: number) => `${a} vs ${b}：${year} 年该选哪个？`,
    metaDescription: (a: string, b: string) => `对比 ${a} 和 ${b} 的许可证、技术栈、功能与优缺点，帮你选出更适合的开源替代方案。`,
    h1: (a: string, b: string, year: number) => `${a} vs ${b}：${year} 年该选哪个？`,
    subtitle: (shared: string) => `两者都是 ${shared} 的开源替代方案。我们对比了许可证、技术栈和功能，帮你判断哪个更适合你的团队。`,
    tableCategory: "分类",
    tableLicense: "许可证",
    tableStars: "GitHub stars",
    tableStack: "技术栈",
    tableReplaces: "替代",
    popularityNote: (winner: string) => `${winner} 的 GitHub star 数更多，通常意味着社区规模更大（但不一定代表它更适合你的具体场景）。`,
    pros: "优点",
    cons: "需要注意",
    viewFullProfile: (name: string) => `查看 ${name} 的完整详情`,
    features: "主要功能",
  },
  hostingTier: {
    title: "💡 这套 stack 推荐的服务器配置",
    categoryBasicLabel: "🟢 基础方案",
    categoryBasicDesc: "对轻量级 stack 完全够用。",
    categoryProLabel: "🟡 Pro VPS",
    categoryProDesc: "推荐用于生产环境，不会因内存不足而卡顿。",
    categoryDedicatedLabel: "🔴 高性能 VPS",
    categoryDedicatedDesc: "你的 stack 对资源要求较高——选择更大的方案或独立服务器可以避免卡死。",
    perMonth: "/月",
    exceedsAllTiersNote: "以下这些标准方案都达不到你需要的内存——请直接在服务商官网寻找更高配置的方案或独立服务器。",
    disclaimer: "以下为联盟链接：如果你通过这些链接注册，我们可能会获得佣金，你无需支付额外费用。",
  },
};

const zh: Dictionary = { ...en, ...zhOverrides };

export default zh;
