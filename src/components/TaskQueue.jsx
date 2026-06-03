import Ic from './icons'

const STATUS_MAP = {
  pending: { label: '等待中', color: 'var(--text-muted)' },
  running: { label: '生成中', color: 'var(--accent)' },
  completed: { label: '已完成', color: 'var(--success)' },
  failed: { label: '失败', color: 'var(--danger)' }
}

export default function TaskQueue({ tasks, onRetry, onRemove }) {
  if (tasks.length === 0) return null
  return (
    <div style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-elevated)', maxHeight: 160, overflow: 'auto' }}>
      <div style={{ padding: '6px 12px', fontSize: 10, color: 'var(--text-muted)', borderBottom: '1px solid var(--border-subtle)' }}>
        任务队列 ({tasks.length})
      </div>
      {tasks.map(task => {
        const st = STATUS_MAP[task.status] || STATUS_MAP.pending
        return (
          <div key={task.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderBottom: '1px solid var(--border-subtle)', fontSize: 11 }}>
            <span style={{ color: st.color, fontSize: 10, minWidth: 48 }}>{st.label}</span>
            <span style={{ flex: 1, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{task.label}</span>
            {task.status === 'running' && (
              <div style={{ width: 60, height: 4, background: 'var(--bg-primary)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ width: `${task.progress}%`, height: '100%', background: 'var(--accent)', borderRadius: 2, transition: 'width 0.3s' }} />
              </div>
            )}
            {task.status === 'failed' && <button onClick={() => onRetry(task)} style={{ background: 'none', border: 'none', color: 'var(--accent)', fontSize: 10, cursor: 'pointer' }}><Ic n="refresh" size={10} /> 重试</button>}
            <button onClick={() => onRemove(task.id)} style={{ background: 'none', border: 'none', color: 'var(--text-ghost)', cursor: 'pointer', padding: 2 }}><Ic n="close" size={10} /></button>
          </div>
        )
      })}
    </div>
  )
}
