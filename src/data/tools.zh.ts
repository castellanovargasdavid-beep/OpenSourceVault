/**
 * 简体中文（zh-CN）MVP 覆盖层——仅覆盖 AI/LLM/self-hosting 首批 10 个工具的
 * 叙述性字段（description/shortDescription/features/pros/cons/notes）。
 * 与 tools.en.ts 完全相同的模式：slug、GitHub、license、fossModel、
 * dockerCompose、RAM、版本、stars、hosting 等技术数据只有一份来源
 * （tools.ts），这里绝不重复或覆盖。缺失的工具会在 getLocalizedTool() 里
 * 自动回退到英文翻译，再回退到西班牙语原文——不会生成一个只有部分字段是
 * 中文、部分是别的语言拼接出来的半成品。
 */
import { AGPL_COPYLEFT_NOTE_ZH } from "./license-notes";
import type { ToolTranslation } from "./tools.en";

export const toolsZh: Record<string, ToolTranslation> = {
  dify: {
    description:
      "Dify 是一个用于设计、测试和部署 AI 应用（聊天机器人、智能体、工作流）的平台，内置可视化编排界面和完整的可观测性，让你不必直接在 OpenAI API 之上从零手搭整套应用。",
    shortDescription: "可视化编排 AI 应用，内置可观测性，替代手写 OpenAI API 调用。",
    features: ["可视化的智能体与工作流编辑器", "每次对话都有完整的日志与可观测性", "支持多模型：OpenAI、Anthropic 及本地模型"],
    pros: ["大幅减少上线一个 AI 产品所需的代码量"],
    cons: ["生产环境的完整技术栈涉及多个服务（如 Weaviate/Redis）"],
    notes:
      "官方推荐生产环境预留 40GB 存储（覆盖 Postgres、Redis 及其余组件）。不需要自带 GPU——只有在你接入本地的 embedding/推理服务时才会用到。",
  },
  ollama: {
    description:
      "Ollama 可以在你自己的服务器上下载并运行 Llama、Mistral、Gemma 等开源大语言模型，并提供兼容的 API 接口，数据完全不经过第三方。",
    shortDescription: "本地运行开源 LLM，替代 OpenAI API 调用。",
    features: ["一条命令即可下载模型", "兼容多种客户端的 API", "同时支持 GPU 与 CPU 推理"],
    pros: ["数据永远不会离开你自己的服务器"],
    cons: ["效果取决于所选模型和硬件配置"],
    notes:
      "CPU 可以运行 7B 及以下的模型（建议预留约 8GB 空闲内存）；若要运行 13B 以上模型或追求更快的推理速度，建议使用显存至少 8-12GB 的独立 GPU。",
  },
  vllm: {
    description:
      "vLLM 是一个高性能的大语言模型推理引擎，专为生产环境下的高吞吐量服务而设计，并提供兼容 OpenAI 的 API 接口。",
    shortDescription: "高性能 LLM 推理引擎，面向生产环境的 OpenAI API 替代方案。",
    features: ["凭借 PagedAttention 实现远超常规方案的吞吐量", "兼容 OpenAI 的 API", "支持数十种模型架构"],
    pros: ["专为大规模生产环境下的 LLM 服务设计"],
    cons: ["需要显存足够承载所选模型的 GPU"],
  },
  "open-webui": {
    description:
      "Open WebUI 是一个可自托管、可扩展的聊天界面，可以连接本地模型（通过 Ollama）或任何兼容 OpenAI API 的远程模型，并支持 RAG、多用户与插件。",
    shortDescription: "自托管 LLM 聊天界面，替代 ChatGPT Plus。",
    features: ["兼容 Ollama 以及任何 OpenAI 格式的 API", "支持基于你自己文档的 RAG", "用户与角色管理", "社区 Prompt 与功能插件市场"],
    pros: ["可以 100% 本地运行模型，数据不出服务器"],
    cons: ["效果取决于你选择运行的模型（建议配备 GPU）"],
    notes:
      "它只是聊天界面本身，不负责运行模型，因此不需要自带 GPU——真正的推理发生在它所连接的 Ollama（或其他兼容 OpenAI API 的后端）上。",
  },
  comfyui: {
    description:
      "ComfyUI 是一个基于节点的 Stable Diffusion 界面，可以搭建非常复杂且可复现的图像生成流程，深受技术用户欢迎。",
    shortDescription: "基于节点搭建图像生成流程，进阶版 Midjourney 替代方案。",
    features: ["基于节点的生成流程搭建", "可复现、可分享的工作流", "支持 ControlNet、LoRA 及自定义模型"],
    pros: ["对生成流程的每一步都有最大程度的控制权"],
    cons: ["比简单的 Prompt 界面学习曲线更高"],
  },
  searxng: {
    description:
      "SearXNG 是一个元搜索引擎，汇总数十个搜索引擎的结果，不追踪、不对用户建立画像，是通往网络搜索的隐私入口。",
    shortDescription: "聚合数十个搜索引擎的隐私元搜索引擎，不追踪用户。",
    features: ["汇总 70+ 搜索引擎的结果", "没有用户画像，不保存搜索历史", "可按分类完全自定义"],
    pros: ["搜索行为完全不会被用于广告追踪"],
    cons: ["结果质量取决于可用的上游搜索引擎"],
  },
  nextcloud: {
    description:
      "Nextcloud 是最受欢迎的开源云存储与协作套件：文件同步、日历、联系人、协同编辑和视频通话，全部跑在你自己的域名之下。",
    shortDescription: "自托管云存储与协作平台，替代 Google Drive。",
    features: ["跨平台文件同步", "协同文档编辑（Collabora/OnlyOffice）", "日历、联系人与视频通话（Nextcloud Talk）", "数百个官方及社区应用"],
    pros: ["自托管生态中应用最丰富的协作平台"],
    cons: ["装了较多应用后，在小型实例上可能会感觉较重"],
  },
  odoo: {
    description:
      "Odoo 是一套模块化的企业管理套件，集成了 CRM、销售、库存、财务等模块，其 Community 版本可以作为 Salesforce 或 HubSpot 的自托管替代方案。",
    shortDescription: "模块化企业管理套件，内置 CRM，替代 Salesforce/HubSpot。",
    features: ["CRM、销售与库存一体化集成", "数百个官方及第三方模块", "模块之间可互相联动自动化"],
    pros: ["覆盖范围远超 CRM：按需可以当作完整 ERP 使用"],
    cons: ["许多进阶模块只在付费的 Enterprise 版本中提供"],
  },
  appflowy: {
    description:
      "AppFlowy 是一个集笔记、知识库与数据库于一体的工作空间，基于 Rust 和 Flutter 构建，即使页面数量达到数千也能保持流畅。对于希望掌控自己数据存放位置的团队来说，它是目前最成熟的开源 Notion 替代方案。",
    shortDescription: "笔记与数据库工作空间，最成熟的开源 Notion 替代方案。",
    features: ["类似 Notion 的块编辑器，支持数据库视图", "本地优先模式，离线也能使用", "原生支持 Windows、macOS、Linux、iOS 和 Android", "插件系统与开放 API"],
    pros: ["处理大型文档时性能明显更好", "没有人为设置的区块或成员数量上限", "可自托管，完全掌控数据"],
    cons: ["插件生态比 Notion 更小", AGPL_COPYLEFT_NOTE_ZH],
  },
  syncthing: {
    description:
      "Syncthing 通过加密的 P2P 连接直接在你的设备之间同步文件，不经过任何中心化的云端服务器，是 Dropbox 的去中心化替代方案。",
    shortDescription: "设备间加密 P2P 文件同步，去中心化的 Dropbox 替代方案。",
    features: ["无需中心服务器的 P2P 同步", "默认端到端加密", "文件版本管理"],
    pros: ["不依赖任何第三方云服务器"],
    cons: ["并非集中式存储：每台设备都保留自己的一份副本"],
  },
};
