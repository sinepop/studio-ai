import { useState, useRef, useEffect } from 'react'
import MessageBubble from './MessageBubble'
import Ic from './icons'

export default function ChatPanel({ chat }) {
  const [input, setInput] = useState('')
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chat.messages])

  const handleSend = () => {
    if (!input.trim() || chat.loading) return
    chat.send(input)
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, overflow: 'auto', padding: '16px 12px' }}>
        {chat.messages.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            <div style={{ marginBottom: 12 }}><Ic n="sparkle" size={32} color="var(--accent)" /></div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontStyle: 'italic', marginBottom: 8 }}>Studio AI</div>
            <div style={{ fontSize: 11 }}>告诉我你想创作什么</div>
          </div>
        )}
        {chat.messages.map(msg => <MessageBubble key={msg.id} msg={msg} />)}
        {chat.loading && (
          <div style={{ padding: '8px 0', color: 'var(--text-muted)', fontSize: 11 }}>
            <span style={{ animation: 'pulse 1.5s infinite' }}>AI 正在思考...</span>
          </div>
        )}
        <div ref={endRef} />
      </div>
      <div style={{ padding: '8px 12px 12px', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{
          display: 'flex', gap: 8, alignItems: 'flex-end',
          background: 'var(--bg-input)', border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-md)', padding: '8px 10px'
        }}>
          <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
            placeholder="描述你想创作的内容..." rows={1}
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', fontSize: 13, resize: 'none', maxHeight: 120, lineHeight: 1.5 }} />
          <button onClick={handleSend} disabled={!input.trim() || chat.loading} style={{
            background: input.trim() && !chat.loading ? 'var(--accent)' : 'var(--bg-hover)',
            border: 'none', borderRadius: 'var(--radius-sm)', width: 32, height: 32,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: input.trim() && !chat.loading ? 'pointer' : 'default'
          }}>
            <Ic n="send" size={14} color={input.trim() && !chat.loading ? '#000' : 'var(--text-muted)'} />
          </button>
        </div>
      </div>
    </div>
  )
}
