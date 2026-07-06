import React from 'react';

/**
 * FeatureList — the brand's checkmark benefit list. Each item is a red check
 * (or red bullet) followed by copy. Pass an array of strings/nodes to `items`.
 */
export function FeatureList({ items = [], marker = 'check', columns = 1, style, ...rest }) {
  const Mark = () => marker === 'check'
    ? <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ flex: 'none', marginTop: 2 }}>
        <path d="M4 10.5L8 14.5L16 5.5" stroke="var(--cc-red)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    : <span style={{ color: 'var(--cc-red)', fontWeight: 700, lineHeight: 1.5, flex: 'none' }}>{'\u2022'}</span>;

  return (
    <ul style={{
      listStyle: 'none', margin: 0, padding: 0,
      display: 'grid',
      gridTemplateColumns: columns > 1 ? `repeat(${columns}, minmax(0,1fr))` : '1fr',
      gap: '12px 28px', ...style,
    }} {...rest}>
      {items.map((it, i) => (
        <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 15.5, lineHeight: 1.5, color: 'var(--text-body)' }}>
          <Mark />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
