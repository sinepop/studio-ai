# StudioAI Desktop

对话驱动的 AI 创意设计桌面工具。一个聊天窗口搞定文字、图像、视频生成。

## 功能

- **对话生成** — 支持 9 家大模型，理解意图后自动调度图像/视频任务
- **图像生成** — 支持 DALL·E、GPT-Image、Gemini、即梦 Seedream、Pollinations
- **视频生成** — 支持即梦 Seedance、Runway、HappyHorse，含任务队列与进度追踪
- **素材画廊** — 网格/自由布局切换，右键菜单支持下载、复制提示词、删除、重新生成
- **设置面板** — 标题栏齿轮图标或 `Ctrl+,` 打开，按对话/图像/视频分别配置 Provider、API Key、Base URL、模型
- **连接测试** — 设置内一键验证 API Key 是否可用
- **白色主题** — 浅色界面，支持深色/浅色/跟随系统切换

## 快速开始

1. 下载 `studio-ai-Setup-1.0.0.exe` 并安装
2. 打开程序，点击标题栏齿轮图标（或按 `Ctrl+,`）进入设置
3. 在对话/图像/视频标签页配置对应的 API Key
4. 在聊天框输入需求，AI 自动完成创作

## 支持的 Provider

| 类型 | Provider |
|------|----------|
| 对话 | Claude、GPT、Gemini、DeepSeek、通义千问、Kimi、豆包、智谱、OpenRouter |
| 图像 | DALL·E / GPT-Image、Gemini Image、即梦 Seedream、Pollinations（免费） |
| 视频 | 即梦 Seedance、Runway ML、HappyHorse |

## 开发

```bash
npm install          # 安装依赖
npm run dev          # 开发模式（热更新）
npm run build        # 构建（Vite + 复制主进程模块）
npm run package      # 构建 + 打包 NSIS 安装包
```

## 项目结构

```
studio-ai/
├── electron/                # 主进程（Node.js / Electron）
│   ├── main.js              # 窗口创建、IPC 注册
│   ├── preload.js           # contextBridge 暴露 electronAPI
│   ├── config.js            # 配置持久化 → %APPDATA%/StudioAI/config.json
│   ├── store.js             # 历史记录持久化
│   └── api/
│       ├── chat.js          # 对话 API（Anthropic / OpenAI / Gemini 格式）
│       ├── image.js         # 图像生成 API
│       ├── video.js         # 视频生成 API（含轮询）
│       └── models.js        # 模型列表获取
├── src/                     # 渲染进程（React）
│   ├── main.jsx             # React 入口
│   ├── App.jsx              # 根组件、布局编排
│   ├── components/
│   │   ├── TitleBar.jsx     # 自定义标题栏（含设置入口）
│   │   ├── ModelBar.jsx     # 底部 Provider 切换栏
│   │   ├── ChatPanel.jsx    # 聊天面板
│   │   ├── CanvasPanel.jsx  # 素材画廊（网格/自由布局）
│   │   ├── AssetCard.jsx    # 素材缩略卡片
│   │   ├── AssetDetail.jsx  # 素材详情侧边栏
│   │   ├── MessageBubble.jsx # 聊天气泡（Markdown 渲染）
│   │   ├── Settings.jsx     # 设置模态框（4 标签页）
│   │   ├── TaskQueue.jsx    # 视频任务队列
│   │   ├── ContextMenu.jsx  # 右键菜单
│   │   └── icons.jsx        # SVG 图标组件
│   ├── hooks/
│   │   ├── useConfig.js     # 配置状态 + IPC 读写
│   │   ├── useChat.js       # 对话逻辑、意图解析、任务调度
│   │   ├── useCanvas.js     # 素材管理
│   │   └── useTaskQueue.js  # 视频任务轮询
│   ├── providers/
│   │   ├── chatProviders.js # 9 家对话 Provider 定义
│   │   ├── imageProviders.js# 4 家图像 Provider 定义
│   │   └── videoProviders.js# 3 家视频 Provider 定义
│   └── styles/
│       └── global.css       # 全局主题变量与基础样式
├── build/                   # 构建资源（图标等）
├── electron-builder.yml     # NSIS 打包配置
├── electron.vite.config.mjs # Vite 构建配置
└── index.html               # HTML 入口
```

## 技术栈

- **Electron 33** — 桌面框架
- **React 18** — UI 框架
- **Vite 5** — 构建工具（electron-vite）
- **electron-builder** — NSIS 安装包打包
- **react-markdown + remark-gfm** — Markdown 渲染

## 配置存储

用户配置保存在 `%APPDATA%/StudioAI/config.json`，结构：

```json
{
  "providers": {
    "chat": { "id": "claude", "apiKey": "", "baseUrl": "", "model": "" },
    "image": { "id": "dalle", "apiKey": "", "baseUrl": "", "model": "" },
    "video": { "id": "jimeng_vid", "apiKey": "", "baseUrl": "", "model": "" }
  },
  "general": {
    "theme": "dark",
    "language": "zh",
    "fontSize": "medium",
    "autoSave": true,
    "apiTimeout": 60000
  }
}
```

## 更新日志

### v1.0.0 (2026-06-03)

**核心功能**
- 对话驱动的多模态生成：输入自然语言，AI 自动识别意图并调度图像/视频生成
- 9 家对话 Provider + 4 家图像 Provider + 3 家视频 Provider
- 素材画廊支持网格/自由布局，右键菜单操作
- 视频生成任务队列，支持进度追踪与重试

**设置与配置**
- 标题栏齿轮图标 + `Ctrl+,` 快捷键打开设置
- 按对话/图像/视频分别配置 Provider、API Key、Base URL、模型
- 一键连接测试验证 API Key
- 配置持久化到 `%APPDATA%/StudioAI/`

**界面**
- 白色主题，支持深色/浅色/跟随系统
- 自定义无边框标题栏
- 底部 Provider 快速切换栏

**构建与打包**
- electron-vite 构建，主进程本地模块自动复制
- NSIS 安装包，支持 Windows x64
- Electron 窗口背景色与主题一致

## License

MIT
