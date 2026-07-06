import React from 'react';

/**
 * QuoteCard — representative use-case / testimonial block with a left red accent
 * rule, italic quote and a two-line attribution (label + kicker).
 */
export function QuoteCard({ quote, label, kicker = 'Representative use case', tone = 'inset', style, ...rest }) {
  const bg = tone === 'plain' ? 'var(--surface-card)' : 'var(--surface-inset)';
  return (
    <div style={{
      position: 'relative',
      background: bg,
      border: '1px solid var(--border-subtle)',
      borderLeft: 'var(--accent-bar) solid var(--cc-red)',
      borderRadius: 'var(--radius-lg)',
      padding: '22px 26px',
      display: 'flex', flexDirection: 'column', gap: 16,
      ...style,
    }} {...rest}>
      <p style={{
        margin: 0, fontFamily: 'var(--font-body)', fontStyle: 'italic',
        fontSize: 17, lineHeight: 1.5, color: 'var(--cc-gray-700)',
      }}>{'\u201C'}{quote}{'\u201D'}</p>
      <div>
        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 15, color: 'var(--cc-ink)' }}>{label}</div>
        <div style={{
          fontFamily: 'var(--font-heading)', fontSize: 12, fontWeight: 500,
          textTransform: 'uppercase', letterSpacing: 'var(--ls-eyebrow)', color: 'var(--text-muted)', marginTop: 3,
        }}>{kicker}</div>
      </div>
    </div>
  );
}
