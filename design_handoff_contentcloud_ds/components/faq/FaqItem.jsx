import React from 'react';

/**
 * FaqItem — a single accordion row. Question with a +/− affordance; answer
 * expands below a hairline divider. Uncontrolled by default (`defaultOpen`).
 */
export function FaqItem({ question, children, defaultOpen = false, style, ...rest }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div style={{ borderBottom: '1px solid var(--border-subtle)', ...style }} {...rest}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 16, background: 'transparent', border: 'none', cursor: 'pointer',
          padding: '18px 4px', textAlign: 'left',
          fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 16.5, color: 'var(--cc-ink)',
        }}
      >
        <span>{question}</span>
        <span style={{
          flex: 'none', width: 22, height: 22, position: 'relative',
          color: 'var(--cc-red)', fontSize: 20, lineHeight: 1,
          transition: 'transform var(--dur-base) var(--ease-standard)',
          transform: open ? 'rotate(45deg)' : 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>+</span>
      </button>
      <div style={{
        overflow: 'hidden',
        maxHeight: open ? 400 : 0,
        opacity: open ? 1 : 0,
        transition: 'max-height var(--dur-slow) var(--ease-standard), opacity var(--dur-base) var(--ease-standard), padding var(--dur-base) var(--ease-standard)',
        padding: open ? '0 4px 20px' : '0 4px',
      }}>
        <div style={{ fontSize: 15.5, lineHeight: 1.6, color: 'var(--text-body)' }}>{children}</div>
      </div>
    </div>
  );
}
