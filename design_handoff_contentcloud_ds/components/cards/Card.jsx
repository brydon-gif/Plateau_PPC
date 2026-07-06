import React from 'react';

/**
 * ContentCloud surface card. Hairline border on white by default; `inset`
 * sits on the gray band; `dark` inverts. Optional icon/eyebrow/title/body + footer.
 */
export function Card({
  tone = 'default',      // default | inset | dark
  icon,
  eyebrow,
  title,
  children,
  footer,
  hoverable = false,
  as = 'div',
  style,
  ...rest
}) {
  const tones = {
    default: { background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', color: 'var(--text-body)' },
    inset:   { background: 'var(--surface-inset)', border: '1px solid var(--border-subtle)', color: 'var(--text-body)' },
    dark:    { background: 'var(--cc-surface-dark)', border: '1px solid transparent', color: 'var(--cc-on-dark)' },
  };
  const t = tones[tone] || tones.default;
  const onDark = tone === 'dark';

  const base = {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: 24,
    borderRadius: 'var(--radius-lg)',
    transition: 'box-shadow var(--dur-base) var(--ease-standard), transform var(--dur-base) var(--ease-standard), border-color var(--dur-base) var(--ease-standard)',
    ...t,
    ...style,
  };
  const onEnter = (e) => { if (!hoverable) return; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = 'var(--border-strong)'; };
  const onLeave = (e) => { if (!hoverable) return; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = t.border.split(' ').pop(); };

  const Tag = as;
  return (
    <Tag style={base} onMouseEnter={onEnter} onMouseLeave={onLeave} {...rest}>
      {icon ? (
        <div style={{
          width: 44, height: 44, borderRadius: 'var(--radius-md)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: onDark ? 'var(--cc-surface-dark-2)' : 'var(--cc-red-tint)',
          color: 'var(--cc-red)', fontSize: 22, marginBottom: 4,
        }}>{icon}</div>
      ) : null}
      {eyebrow ? (
        <div style={{
          fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 13,
          textTransform: 'uppercase', letterSpacing: 'var(--ls-eyebrow)', color: 'var(--cc-red)',
        }}>{eyebrow}</div>
      ) : null}
      {title ? (
        <h3 style={{
          margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 600,
          fontSize: 20, lineHeight: 'var(--lh-heading)',
          color: onDark ? 'var(--cc-white)' : 'var(--cc-ink)',
        }}>{title}</h3>
      ) : null}
      {children ? (
        <div style={{ fontSize: 15, lineHeight: 'var(--lh-body)', color: onDark ? 'var(--cc-on-dark-muted)' : 'var(--text-body)' }}>{children}</div>
      ) : null}
      {footer ? <div style={{ marginTop: 'auto', paddingTop: 8 }}>{footer}</div> : null}
    </Tag>
  );
}
