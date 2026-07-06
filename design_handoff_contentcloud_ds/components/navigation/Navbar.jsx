import React from 'react';
import { Button } from '../buttons/Button.jsx';

/**
 * Navbar — sticky top bar: logo + wordmark, center nav (items may show a caret),
 * and right-side actions (secondary "Book a demo" + primary "Get started").
 * Pass `logoSrc` (defaults to the ink mark) and an `items` array.
 */
export function Navbar({
  logoSrc = 'assets/logo-mark.svg',
  brand = 'ContentCloud',
  items = [
    { label: 'Products', caret: true },
    { label: 'Solutions', caret: true },
    { label: 'Plans' },
    { label: 'Resources', caret: true },
    { label: 'Company', caret: true },
  ],
  onPrimary,
  onSecondary,
  style,
  ...rest
}) {
  const [hovered, setHovered] = React.useState(-1);
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 40,
      background: 'rgba(255,255,255,0.9)', backdropFilter: 'saturate(180%) blur(10px)',
      borderBottom: '1px solid var(--border-subtle)',
      ...style,
    }} {...rest}>
      <nav style={{
        maxWidth: 'var(--container)', margin: '0 auto',
        padding: '0 24px', height: 68,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
      }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none' }}>
          <img src={logoSrc} alt="" height={26} />
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 18, color: 'var(--cc-ink)', letterSpacing: '-0.01em' }}>{brand}</span>
        </a>

        <ul style={{ display: 'flex', alignItems: 'center', gap: 4, listStyle: 'none', margin: 0, padding: 0 }}>
          {items.map((it, i) => (
            <li key={i}>
              <a href={it.href || '#'}
                 onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(-1)}
                 style={{
                   display: 'inline-flex', alignItems: 'center', gap: 5,
                   padding: '8px 12px', borderRadius: 'var(--radius-md)',
                   fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 15,
                   color: hovered === i ? 'var(--cc-ink)' : 'var(--cc-gray-700)',
                   background: hovered === i ? 'var(--cc-gray-100)' : 'transparent',
                   textDecoration: 'none', transition: 'background var(--dur-fast) var(--ease-standard)',
                 }}>
                {it.label}
                {it.caret ? <span style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 1 }}>{'\u25BC'}</span> : null}
              </a>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Button variant="ghost" size="sm" onClick={onSecondary}>Book a demo</Button>
          <Button variant="primary" size="sm" onClick={onPrimary}>Get started</Button>
        </div>
      </nav>
    </header>
  );
}
