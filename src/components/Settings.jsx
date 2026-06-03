import { useState, useEffect } from 'react'
import { CHAT_PROVIDERS } from '../providers/chatProviders'
import { IMG_PROVIDERS } from '../providers/imageProviders'
import { VID_PROVIDERS } from '../providers/videoProviders'
import Ic from './icons'

const TABS = [
  { id: 'general', label: '通用' },
  { id: 'chat', label: '对话' },
  { id: 'image', label: '图像' },
  { id: 'video', label: '视频' }
]

const ASPECT_RATIOS = ['1:1', '4:3', '3:4', '16:9', '9:16', '3:2']
const STYLE_PRESETS = ['扁平插画', '3D 渲染', '写实摄影', '水彩画', '动漫风', '像素艺术', '油画', '极简主义', '赛博朋克', '剪纸']
const DURATIONS = ['5s', '8s', '10s']

// Hardcoded light theme colors - no CSS variables
const C = {
  bg: '#FFFFFF',
  bgAlt: '#F8F8FA',
  bgSurface: '#F0F0F3',
  bgHover: '#E8E8EC',
  border: 'rgba(0,0,0,0.1)',
  borderSubtle: 'rgba(0,0,0,0.06)',
  text: '#1A1A1E',
  textSec: '#6B6B73',
  textMuted: '#A0A0A8',
  accent: '#D4942E',
  accentSoft: 'rgba(212,148,46,0.08)',
  accentBorder: 'rgba(212,148,46,0.3)',
  danger: '#C4554A',
  success: '#3D9B6E',
  overlay: 'rgba(0,0,0,0.2)',
}

const labelS = { display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: C.textSec, fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }
const inputS = { background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, padding: '7px 10px', color: C.text, fontSize: 12, fontFamily: 'JetBrains Mono, SF Mono, Consolas, monospace', outline: 'none' }
const selectS = { ...inputS, appearance: 'auto', cursor: 'pointer' }

function ProviderTab({ track, providers, config, onChange }) {
  const current = config?.providers?.[track] || {}
  const provider = providers.find(p => p.id === current.id)
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState(null)

  const handleTest = async () => {
    setTesting(true); setTestResult(null)
    try {
      const models = await window.electronAPI.fetchModels({ ...current, format: provider?.format })
      setTestResult(models.length > 0 ? { ok: true, count: models.length } : { ok: false, msg: '未获取到模型列表' })
    } catch (e) { setTestResult({ ok: false, msg: e.message }) }
    finally { setTesting(false) }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <label style={labelS}>
        Provider
        <select value={current.id || ''} onChange={e => { const p = providers.find(pp => pp.id === e.target.value); if (p) onChange(track, { id: p.id, baseUrl: p.defaultUrl, model: p.defaultModel }) }} style={selectS}>
          {providers.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </label>
      <label style={labelS}>
        API Key
        <input type="password" value={current.apiKey || ''} placeholder="sk-..." onChange={e => onChange(track, { apiKey: e.target.value })} style={inputS} />
      </label>
      <label style={labelS}>
        Base URL <span style={{ color: C.textMuted, fontSize: 11 }}>(可选)</span>
        <input type="text" value={current.baseUrl || ''} placeholder={provider?.defaultUrl || ''} onChange={e => onChange(track, { baseUrl: e.target.value })} style={inputS} />
      </label>
      <label style={labelS}>
        模型
        <input type="text" value={current.model || ''} placeholder={provider?.defaultModel || ''} onChange={e => onChange(track, { model: e.target.value })} style={inputS} />
      </label>
      <button onClick={handleTest} disabled={testing || !current.apiKey} style={{ alignSelf: 'flex-start', padding: '7px 16px', background: C.accentSoft, border: `1px solid ${C.accentBorder}`, borderRadius: 6, color: C.accent, fontSize: 12, cursor: 'pointer', opacity: !current.apiKey ? 0.4 : 1, fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}>
        {testing ? '测试中...' : '连接测试'}
      </button>
      {testResult && <div style={{ fontSize: 12, color: testResult.ok ? C.success : C.danger, fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}>{testResult.ok ? `✓ 成功，获取到 ${testResult.count} 个模型` : `✗ ${testResult.msg}`}</div>}
    </div>
  )
}

function GeneralTab({ config, onChange }) {
  const g = config?.general || {}
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <label style={labelS}>主题<select value={g.theme || 'dark'} onChange={e => onChange('general', { theme: e.target.value })} style={selectS}><option value="dark">深色</option><option value="light">浅色</option><option value="system">跟随系统</option></select></label>
      <label style={labelS}>语言<select value={g.language || 'zh'} onChange={e => onChange('general', { language: e.target.value })} style={selectS}><option value="zh">中文</option><option value="en">English</option></select></label>
      <label style={labelS}>字体大小<select value={g.fontSize || 'medium'} onChange={e => onChange('general', { fontSize: e.target.value })} style={selectS}><option value="small">小</option><option value="medium">中</option><option value="large">大</option></select></label>
      <label style={{ ...labelS, flexDirection: 'row', alignItems: 'center', gap: 8 }}><input type="checkbox" checked={g.autoSave !== false} onChange={e => onChange('general', { autoSave: e.target.checked })} />自动保存生成记录</label>
      <label style={labelS}>API 超时时间<select value={g.apiTimeout || 60000} onChange={e => onChange('general', { apiTimeout: Number(e.target.value) })} style={selectS}><option value={30000}>30 秒</option><option value={60000}>60 秒</option><option value={120000}>120 秒</option></select></label>
    </div>
  )
}

function ImageTab({ config, onChange }) {
  const g = config?.general || {}
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <ProviderTab track="image" providers={IMG_PROVIDERS} config={config} onChange={(t, patch) => onChange('image', patch)} />
      <label style={labelS}>默认画幅比例<select value={g.defaultRatio || '1:1'} onChange={e => onChange('general', { defaultRatio: e.target.value })} style={selectS}>{ASPECT_RATIOS.map(r => <option key={r} value={r}>{r}</option>)}</select></label>
      <label style={labelS}>默认风格预设<select value={g.defaultStyle || ''} onChange={e => onChange('general', { defaultStyle: e.target.value })} style={selectS}><option value="">无</option>{STYLE_PRESETS.map(s => <option key={s} value={s}>{s}</option>)}</select></label>
    </div>
  )
}

function VideoTab({ config, onChange }) {
  const g = config?.general || {}
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <ProviderTab track="video" providers={VID_PROVIDERS} config={config} onChange={(t, patch) => onChange('video', patch)} />
      <label style={labelS}>默认时长<select value={g.defaultDuration || '5s'} onChange={e => onChange('general', { defaultDuration: e.target.value })} style={selectS}>{DURATIONS.map(d => <option key={d} value={d}>{d}</option>)}</select></label>
    </div>
  )
}

export default function Settings({ config, onSave, onClose }) {
  const [tab, setTab] = useState('general')
  const [local, setLocal] = useState(config)
  useEffect(() => { if (config) setLocal(config) }, [config])

  const handleChange = (track, patch) => {
    if (!local) return
    if (track === 'general') setLocal(prev => ({ ...prev, general: { ...prev.general, ...patch } }))
    else setLocal(prev => ({ ...prev, providers: { ...prev.providers, [track]: { ...prev.providers[track], ...patch } } }))
  }

  const handleSave = () => { if (local) { onSave(local); onClose() } }

  if (!local) return null

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.overlay }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ width: 540, maxHeight: '80vh', background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: `1px solid ${C.borderSubtle}` }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: C.text }}>设置</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: C.textMuted, cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }}><Ic n="close" size={15} /></button>
        </div>
        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: `1px solid ${C.borderSubtle}` }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, padding: '11px 0', background: tab === t.id ? C.accentSoft : 'transparent', border: 'none', borderBottom: `2px solid ${tab === t.id ? C.accent : 'transparent'}`, color: tab === t.id ? C.accent : C.textSec, fontSize: 13, cursor: 'pointer', fontWeight: tab === t.id ? 500 : 400, fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}>{t.label}</button>
          ))}
        </div>
        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
          {tab === 'general' && <GeneralTab config={local} onChange={handleChange} />}
          {tab === 'chat' && <ProviderTab track="chat" providers={CHAT_PROVIDERS} config={local} onChange={(t, patch) => handleChange('chat', patch)} />}
          {tab === 'image' && <ImageTab config={local} onChange={handleChange} />}
          {tab === 'video' && <VideoTab config={local} onChange={handleChange} />}
        </div>
        {/* Footer */}
        <div style={{ padding: '14px 20px', borderTop: `1px solid ${C.borderSubtle}`, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <button onClick={onClose} style={{ padding: '7px 20px', background: C.bgSurface, border: `1px solid ${C.border}`, borderRadius: 6, color: C.textSec, fontSize: 12, cursor: 'pointer', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}>取消</button>
          <button onClick={handleSave} style={{ padding: '7px 20px', background: C.accent, border: 'none', borderRadius: 6, color: '#FFF', fontSize: 12, cursor: 'pointer', fontWeight: 500, fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}>保存</button>
        </div>
      </div>
    </div>
  )
}
