import React from 'react';

/**
 * Small pill label — status tags like "Now in pilot", "GDPR", "New".
 * tones: neutral | red | dark | success | outline
 */
export function Badge({ tone = 'neutral', children, style, ...rest }) {
  const tones = {
    neutral: { background: 'var(--cc-gray-100)', color: 'var(--cc-gray-700)', border: '1px solid transparent' },
    red:     { background: 'var(--cc-red-tint)', color: 'var(--cc-red)', border: '1px solid transparent' },
    dark:    { background: 'var(--cc-surface-dark)', color: 'var(--cc-white)', border: '1px solid transparent' },
    success: { background: 'var(--cc-success-tint)', color: 'var(--cc-success)', border: '1px solid transparent' },
    outline: { background: 'transparent', color: 'var(--cc-gray-600)', border: '1px solid var(--border-strong)' },
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 12,
      letterSpacing: '0.02em', padding: '4px 10px',
      borderRadius: 'var(--radius-full)', lineHeight: 1.4, whiteSpace: 'nowrap',
      ...t, ...style,
    }} {...rest}>{children}</span>
  );
}
