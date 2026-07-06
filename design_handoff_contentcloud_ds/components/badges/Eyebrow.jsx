import React from 'react';

/** Red uppercase overline that labels a section or block. */
export function Eyebrow({ children, align = 'left', style, ...rest }) {
  return (
    <div style={{
      fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'var(--fs-eyebrow)',
      textTransform: 'uppercase', letterSpacing: 'var(--ls-eyebrow)',
      color: 'var(--cc-red)', textAlign: align, ...style,
    }} {...rest}>{children}</div>
  );
}
