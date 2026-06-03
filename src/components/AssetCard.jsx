import { useState } from 'react'

export default function AssetCard({ asset, selected, onClick, onContextMenu }) {
  const [imgError, setImgError] = useState(false)
  return (
    <div onClick={() => onClick(asset.id)}
      onContextMenu={(e) => { e.preventDefault(); onContextMenu(e, asset) }}
      style={{
        borderRadius: 'var(--radius-md)', overflow: 'hidden', cursor: 'pointer',
        border: `1px solid ${selected ? 'var(--accent)' : 'var(--border-subtle)'}`,
        background: 'var(--bg-surface)', transition: 'border-color 0.2s', animation: 'fadeUp 0.4s ease forwards'
      }}
      onMouseEnter={e => { if (!selected) e.currentTarget.style.borderColor = 'var(--border-default)' }}
      onMouseLeave={e => { if (!selected) e.currentTarget.style.borderColor = 'var(--border-subtle)' }}
    >
      <div style={{ aspectRatio: '1', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {asset.url && !imgError ? (
          <img src={asset.url} alt={asset.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={() => setImgError(true)} />
        ) : (
          <div style={{ color: 'var(--text-ghost)', fontSize: 24 }}>{asset.type === 'video' ? '🎬' : '🖼️'}</div>
        )}
      </div>
      <div style={{ padding: '8px 10px' }}>
        <div style={{ fontSize: 11, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{asset.label}</div>
        <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{asset.model}</div>
      </div>
    </div>
  )
}
