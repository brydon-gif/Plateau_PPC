import React from 'react';

/**
 * Input / Textarea field with optional label + hint. Hairline border, red focus ring.
 * Set `multiline` for a textarea.
 */
export function Input({ label, hint, id, multiline = false, rows = 4, invalid = false, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const fieldId = id || (label ? `f-${String(label).toLowerCase().replace(/\s+/g, '-')}` : undefined);
  const border = invalid ? 'var(--cc-red)' : (focus ? 'var(--cc-ink)' : 'var(--border-strong)');
  const shared = {
    width: '100%', boxSizing: 'border-box',
    fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--cc-ink)',
    background: 'var(--cc-white)',
    border: `1px solid ${border}`, borderRadius: 'var(--radius-sm)',
    padding: multiline ? '12px 14px' : '11px 14px',
    outline: 'none',
    boxShadow: focus ? 'var(--focus-ring)' : 'none',
    transition: 'border-color var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)',
    resize: multiline ? 'vertical' : undefined,
    ...style,
  };
  const common = {
    id: fieldId, style: shared,
    onFocus: () => setFocus(true), onBlur: () => setFocus(false),
    ...rest,
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label ? (
        <label htmlFor={fieldId} style={{
          fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 13.5, color: 'var(--cc-ink)',
        }}>{label}</label>
      ) : null}
      {multiline ? <textarea rows={rows} {...common} /> : <input {...common} />}
      {hint ? (
        <span style={{ fontSize: 12.5, color: invalid ? 'var(--cc-red)' : 'var(--text-muted)' }}>{hint}</span>
      ) : null}
    </div>
  );
}
