# StudioAI

<div align="center">

**中文** | [English](#english)

</div>

## StudioAI — 对话驱动的 AI 创意设计工具

一款集对话与设计于一体的 AI 创意工具。通过自然对话让 AI 理解你的灵感与想法，自动转化为精准提示词，调用图像与视频生成模型，将脑海中的画面变为现实。

### 为什么做这个？

作为一名设计专业的在读研究生，常与设计工具打交道。随着 AI 工具的兴起和迅猛发展，我将目光转到 AI 工具上。经过一段时间的摸索，发现了几个问题：

1. **AI 模型迭代太快** — 各家模型版权不同，今天刚熟悉一个工具，过几天又听说另一个更好用，来回尝试耗费太多财力、人力和时间。
2. **提示词使用不当** — 虽然提示词概念已经兴起很久，但大多数同学（包括我自己）有时还是会下意识地直接说一段话让 AI 生图或改图，导致 AI 无法准确理解意图，生成一堆不尽人意的内容。
3. **费用门槛** — 好用的设计 AI（如 Lovart）费用偏高，作为普通学生难以长期支撑，所以需要另寻他法。

带着点研究的想法和执着，我搜了很多资料。一位网友的话点醒了我：**没有如愿的，那就自己搓。** 于是边学边做，做出了这个初始版本。还有很多问题待解决，后续有空会继续维护。

### 核心特性

- **三轨道独立架构** — 对话 / 图像 / 视频，每个轨道独立配置 Provider，互不干扰
- **自由搭配** — 支持 Claude、GPT、Gemini、DeepSeek、Kimi、通义千问、Doubao、智谱等主流模型
- **对话即设计** — 和 AI 聊清楚你的想法，它帮你生成提示词并调用模型出图 / 出视频
- **多模型切换** — 每个轨道可随时切换 Provider，按需选择最适合的模型
- **本地 CORS 代理** — 附带代理脚本，解决浏览器跨域限制

### 快速开始

1. 双击打开 `StudioAI_API_Audit_FIXED.html`
2. 在 Settings 中配置你的 API Key（对话 / 图像 / 视频分别配置）
3. 开始对话，让 AI 帮你实现创意

> 如遇跨域问题，运行 `node proxy.mjs` 启动本地代理，在 Settings 中开启「全部走代理」。

### 文件说明

| 文件 | 说明 |
|------|------|
| `StudioAI_API_Audit_FIXED.html` | 主应用（单文件，浏览器直接打开） |
| `proxy.mjs` | 本地 CORS 代理（Node.js，端口 8787） |
| `启动代理.bat` | Windows 下双击启动代理 |

---

<div align="center">

[English](#english) | **中文**

</div>

---

<a id="english"></a>

# StudioAI

<div align="center">

[中文](#studioai--对话驱动的-ai-创意设计工具) | **English**

</div>

## StudioAI — Conversation-Driven AI Design Tool

A creative AI tool that unites conversation and design. Share your ideas through natural dialogue — StudioAI converts them into precise prompts and calls image/video generation models to bring your vision to life.

### Why I Built This

As a graduate student in design, I work with design tools on a daily basis. With the rapid rise of AI tools, I turned my attention to this space. After some exploration, I ran into a few problems:

1. **AI models iterate too fast** — Different providers have different copyrights and capabilities. Just when you get familiar with one tool, you hear about another that works better. Switching back and forth costs a lot of time, energy, and money.
2. **Poor prompt habits** — Although the concept of prompt engineering has been around for a while, most of my classmates (myself included) still tend to casually describe what they want in plain language, leading to inaccurate AI理解 and disappointing outputs.
3. **Cost barriers** — Good design AI tools (like Lovart) are expensive, hard for an ordinary student to sustain long-term. I had to find another way.

Driven by a research mindset and sheer persistence, I dug through tons of resources. One netizen's comment hit home: **"If what you want doesn't exist, build it yourself."** So I learned as I went and built this tool from scratch. It's still an early version with plenty of issues to fix — I'll keep iterating whenever I have time.

### Key Features

- **Three Independent Tracks** — Chat / Image / Video, each with its own provider configuration
- **Mix & Match Freely** — Supports Claude, GPT, Gemini, DeepSeek, Kimi, Qwen, Doubao, GLM, and more
- **Design Through Conversation** — Tell AI what you want, it generates prompts and produces images/videos
- **Multi-Model Switching** — Swap providers per track anytime to pick the best model for the job
- **Local CORS Proxy** — Bundled proxy script to bypass browser cross-origin restrictions

### Quick Start

1. Open `StudioAI_API_Audit_FIXED.html` in your browser
2. Go to Settings and configure your API keys (separate for Chat / Image / Video)
3. Start chatting and let AI bring your ideas to life

> If you encounter CORS issues, run `node proxy.mjs` to start the local proxy, then enable "Proxy All" in Settings.

### File Overview

| File | Description |
|------|-------------|
| `StudioAI_API_Audit_FIXED.html` | Main app (single file, open directly in browser) |
| `proxy.mjs` | Local CORS proxy (Node.js, port 8787) |
| `启动代理.bat` | Double-click to start proxy on Windows |
