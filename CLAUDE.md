# Gravuresse Desktop

Electron + Vite + React 18 AI创意设计桌面工具。

## 项目结构

```
electron/          # 主进程
  main.js          # 入口，IPC注册，窗口创建
  config.js        # 配置读写 (%APPDATA%/Gravuresse/config.json)
  store.js         # 对话持久化
  api/             # chat.js, image.js, video.js, models.js
src/
  App.jsx          # 状态编排：对话管理+画布+配置
  hooks/useChat.js # 聊天状态+API调用
  components/      # UI组件（TitleBar/ChatPanel/CanvasPanel/ModelBar/Settings等）
  styles/global.css # CSS变量主题系统
build/icon.png     # 应用图标
```

## 架构约束

- **三轨道独立 Provider**：chat / image / video 各自配置 API Key + Base URL + Model
- **API 调用走 IPC**：渲染进程通过 `window.electronAPI` 调用，主进程 `electron/api/*.js` 执行
- **对话数据**：每对话独立 messages[] + assets[]，切换时 sync 回 conversations 状态
- **画布**：InfiniteCanvas（CSS transform 缩放平移）+ DrawingOverlay（HTML5 Canvas 绘图）

## 开发命令

```bash
npm run dev        # electron-vite dev（热重载）
npm run build      # electron-vite build + 拷贝 config/store/api
npm run package    # build + electron-builder --win → release/
```

## 红线

- 不要在 setState 函数式更新内执行副作用（setMessages、canvas 操作等）——用 useEffect 分离
- 切换对话时用 `switchLoading` ref 防止 sync effect 覆盖刚加载的数据
- CSS 变量在 global.css 定义，组件内不硬编码颜色值
- 图标统一用 Lucide React（`src/components/icons.jsx`），不自绘 SVG

## 版本发布流程

1. 更新 `package.json` version
2. 更新 `src/components/ModelBar.jsx` 中版本号显示
3. 更新 `README.md` 中英文更新日志 + 下载链接
4. `npm run package` 打包
5. `git commit` + `git push`
6. `gh release create <tag> "release/<file>#显示名" --title "..." --notes "..."`
7. 更新记忆 `project_studio_ai_desktop.md` + `MEMORY.md`
