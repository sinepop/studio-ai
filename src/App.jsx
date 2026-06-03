import { useState, useEffect, useCallback } from 'react'
import TitleBar from './components/TitleBar'
import ModelBar from './components/ModelBar'
import ChatPanel from './components/ChatPanel'
import CanvasPanel from './components/CanvasPanel'
import Settings from './components/Settings'
import TaskQueue from './components/TaskQueue'
import ContextMenu from './components/ContextMenu'
import useConfig from './hooks/useConfig'
import useChat from './hooks/useChat'
import useCanvas from './hooks/useCanvas'
import useTaskQueue from './hooks/useTaskQueue'
import './styles/global.css'

export default function App() {
  const { config, save, updateProvider } = useConfig()
  const canvas = useCanvas()
  const chat = useChat(config, canvas)
  const taskQueue = useTaskQueue(canvas)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [ctxMenu, setCtxMenu] = useState(null)

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === ',') {
        e.preventDefault()
        setSettingsOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const handleAssetAction = useCallback((action, asset) => {
    if (action === 'download' && asset.url) {
      const a = document.createElement('a'); a.href = asset.url; a.download = `${asset.label}.png`; a.click()
    }
    if (action === 'copyPrompt') navigator.clipboard.writeText(asset.prompt || '')
    if (action === 'delete') canvas.removeAsset(asset.id)
    if (action === 'regenerate') {
      chat.send(`重新生成：${asset.prompt}`)
    }
    if (action === 'toVideo') {
      chat.send(`把这张图片做成视频：${asset.prompt}`)
    }
  }, [canvas, chat])

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TitleBar onOpenSettings={() => setSettingsOpen(true)} />
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <div style={{ width: '40%', borderRight: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column' }}>
          <ChatPanel chat={chat} />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <CanvasPanel canvas={canvas} />
          </div>
          <TaskQueue tasks={taskQueue.tasks} onRetry={taskQueue.retry} onRemove={taskQueue.remove} />
        </div>
      </div>
      <ModelBar config={config} onProviderChange={updateProvider} onOpenSettings={() => setSettingsOpen(true)} />
      {settingsOpen && <Settings config={config} onSave={save} onClose={() => setSettingsOpen(false)} />}
      {ctxMenu && <ContextMenu x={ctxMenu.x} y={ctxMenu.y} asset={ctxMenu.asset} onClose={() => setCtxMenu(null)} onAction={handleAssetAction} />}
    </div>
  )
}
