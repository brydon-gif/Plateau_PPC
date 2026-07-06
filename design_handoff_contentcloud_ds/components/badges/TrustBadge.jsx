import React from 'react';

/**
 * TrustBadge — one tile in the "Built for European requirements" compliance grid:
 * a glyph, a bold title and a one-line description. Renders as a link when href set.
 */
export function TrustBadge({ icon, title, description, href, style, ...rest }) {
  const Tag = href ? 'a' : 'div';
  const base = {
    display: 'flex', flexDirection: 'column', gap: 8,
    padding: '18px 18px',
    background: 'var(--surface-card)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-lg)',
    textDecoration: 'none',
    transition: 'border-color var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)',
    ...style,
  };
  const onEnter = (e) => { if (!href) return; e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; };
  const onLeave = (e) => { if (!href) return; e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.boxShadow = 'none'; };
  return (
    <Tag href={href} style={base} onMouseEnter={onEnter} onMouseLeave={onLeave} {...rest}>
      <span style={{ fontSize: 22, lineHeight: 1 }}>{icon}</span>
      <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 15, color: 'var(--cc-ink)' }}>{title}</span>
      <span style={{ fontSize: 13.5, lineHeight: 1.45, color: 'var(--text-muted)' }}>{description}</span>
    </Tag>
  );
}
