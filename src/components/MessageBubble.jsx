import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function MessageBubble({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <div style={{
      display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start',
      padding: '4px 0', animation: 'fadeUp 0.3s ease forwards'
    }}>
      <div style={{
        maxWidth: '85%', padding: '10px 14px', borderRadius: 'var(--radius-md)',
        background: isUser ? 'var(--accent-soft)' : 'var(--bg-surface)',
        border: `1px solid ${isUser ? 'var(--border-accent)' : 'var(--border-subtle)'}`,
        fontSize: 13, lineHeight: 1.6, color: 'var(--text-primary)'
      }}>
        {isUser ? <span>{msg.content}</span> : (
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
            p: ({ children }) => <p style={{ margin: '0 0 8px' }}>{children}</p>,
            code: ({ children, className }) => (
              className
                ? <pre style={{ background: 'var(--bg-primary)', padding: 8, borderRadius: 4, overflow: 'auto', fontSize: 11, fontFamily: 'var(--font-mono)' }}><code>{children}</code></pre>
                : <code style={{ background: 'var(--bg-primary)', padding: '1px 4px', borderRadius: 3, fontSize: 12 }}>{children}</code>
            )
          }}>{msg.content}</ReactMarkdown>
        )}
        {msg.error && <div style={{ color: 'var(--danger)', fontSize: 11, marginTop: 4 }}>⚠ {msg.content}</div>}
      </div>
    </div>
  )
}
