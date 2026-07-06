import React from 'react';

/**
 * Stat — an outcome figure: a large red value over a muted label.
 * Used in the "Typical Outcomes" and product hero strips (e.g. "Cited", "5+", "Fewer").
 */
export function Stat({ value, label, align = 'center', size = 'md', style, ...rest }) {
  const sizes = { sm: 32, md: 44, lg: 56 };
  const fs = sizes[size] || sizes.md;
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 4,
      textAlign: align, alignItems: align === 'center' ? 'center' : 'flex-start', ...style,
    }} {...rest}>
      <div style={{
        fontFamily: 'var(--font-heading)', fontWeight: 600, lineHeight: 1,
        fontSize: fs, color: 'var(--cc-red)', letterSpacing: '-0.01em',
      }}>{value}</div>
      <div style={{ fontSize: 14.5, lineHeight: 1.4, color: 'var(--text-muted)', maxWidth: 200 }}>{label}</div>
    </div>
  );
}
