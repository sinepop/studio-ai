const IC = {
  send: "M5 12h14|M12.5 5.5L20 12l-7.5 6.5",
  gear: "M12.2 2a2.2 2.2 0 012.2 2.2v.4a2.4 2.4 0 001.3.9l.4-.1a2.2 2.2 0 012.8 2.8l-.1.4a2.4 2.4 0 00.9 1.3v.4a2.2 2.2 0 01-2.2 2.2h-.4a2.4 2.4 0 00-1.3.9l-.1.4a2.2 2.2 0 01-2.8 2.8l-.4-.1a2.4 2.4 0 00-1.3.9v.4a2.2 2.2 0 01-2.2 2.2h-.4A2.2 2.2 0 018 22.4v-.4a2.4 2.4 0 00-.9-1.3l-.4.1a2.2 2.2 0 01-2.8-2.8l.1-.4A2.4 2.4 0 003.1 17v-.4A2.2 2.2 0 01.9 14.4h-.4",
  close: "M16 8L8 16|M8 8l8 8",
  chevDown: "M6 9l6 6 6-6",
  trash: "M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 002 2h8a2 2 0 002-2l1-12M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3",
  download: "M12 3v12M7 10l5 5 5-5|M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2",
  image: "M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z|M3 15l4.6-4.6a1 1 0 011.4 0L13 14.4l2.6-2.6a1 1 0 011.4 0L21 15|M9 9.5a1 1 0 100-2 1 1 0 000 2z",
  film: "M3 3h18v18H3z|M8 3v18M16 3v18M3 10h18M3 15h18",
  sparkle: "M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83",
  grid: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  link: "M10 14a3.5 3.5 0 005 0l3-3a3.5 3.5 0 00-5-5l-1 1M14 10a3.5 3.5 0 00-5 0l-3 3a3.5 3.5 0 005 5l1-1",
  check: "M20 6L9 17l-5-5",
  alert: "M10.3 3.5L1.6 18a1.5 1.5 0 001.3 2.5h20.2a1.5 1.5 0 001.3-2.5L13.7 3.5a1.5 1.5 0 00-2.6 0zM12 10v4M12 18h.01",
  refresh: "M21 2v6h-6|M3 22v-6h6|M3.4 9.2a8 8 0 0114.2-3.4L21 10|M20.6 14.8A8 8 0 013.4 18.2L3 14",
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z|M12 9.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z",
}

export default function Ic({ n, size = 15, color = 'currentColor', sw = 1.5 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none"
      stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle' }}>
      {(IC[n] || '').split('|').map((d, i) => <path key={i} d={d.trim()} />)}
    </svg>
  )
}
