/**
 * Igual que tool-card-short-descriptions.en.ts, pero solo para el piloto de
 * 10 herramientas zh-CN — las demás tarjetas no tienen traducción china
 * todavía y getLocalizedToolCardData() cae a su shortDescription EN antes
 * que al español. Generado desde tools.zh.ts.
 */
export const toolCardShortDescriptionsZh: Record<string, string> = {
  dify: "可视化编排 AI 应用，内置可观测性，替代手写 OpenAI API 调用。",
  ollama: "本地运行开源 LLM，替代 OpenAI API 调用。",
  vllm: "高性能 LLM 推理引擎，面向生产环境的 OpenAI API 替代方案。",
  "open-webui": "自托管 LLM 聊天界面，替代 ChatGPT Plus。",
  comfyui: "基于节点搭建图像生成流程，进阶版 Midjourney 替代方案。",
  searxng: "聚合数十个搜索引擎的隐私元搜索引擎，不追踪用户。",
  nextcloud: "自托管云存储与协作平台，替代 Google Drive。",
  odoo: "模块化企业管理套件，内置 CRM，替代 Salesforce/HubSpot。",
  appflowy: "笔记与数据库工作空间，最成熟的开源 Notion 替代方案。",
  syncthing: "设备间加密 P2P 文件同步，去中心化的 Dropbox 替代方案。",
};
