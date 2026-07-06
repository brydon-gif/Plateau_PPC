import React from 'react';

/**
 * Footer — light multi-column sitemap footer. Brand blurb on the left, link
 * columns on the right, legal line beneath a hairline divider.
 */
export function Footer({
  logoSrc = 'assets/logo-mark.svg',
  brand = 'ContentCloud',
  tagline = 'Your Content, Unlocked.',
  columns = [
    { title: 'Products', links: ['CCBot', 'Memory'] },
    { title: 'Solutions', links: ['EU Institutions', 'Enterprise', 'Academia & Researchers'] },
    { title: 'Resources', links: ['Documentation', 'Blog', 'Case Studies', 'FAQ', 'Trust Center'] },
    { title: 'Company', links: ['About Us', 'Contact', 'Status'] },
    { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies'] },
  ],
  legal = '© 2026 ContentCloud. All rights reserved.',
  style,
  ...rest
}) {
  return (
    <footer style={{ background: 'var(--cc-white)', borderTop: '1px solid var(--border-subtle)', ...style }} {...rest}>
      <div style={{
        maxWidth: 'var(--container)', margin: '0 auto', padding: '56px 24px 28px',
        display: 'grid', gridTemplateColumns: '1.4fr repeat(5, 1fr)', gap: 32,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <img src={logoSrc} alt="" height={24} />
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 17, color: 'var(--cc-ink)' }}>{brand}</span>
          </div>
          <p style={{ margin: 0, fontSize: 14, color: 'var(--text-muted)', maxWidth: 220 }}>{tagline}</p>
        </div>
        {columns.map((col, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 13, color: 'var(--cc-ink)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{col.title}</div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
              {col.links.map((l, j) => (
                <li key={j}>
                  <a href="#" style={{ fontSize: 14, color: 'var(--cc-gray-600)', textDecoration: 'none' }}
                     onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--cc-red)'; }}
                     onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--cc-gray-600)'; }}>{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '18px 24px', display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{legal}</span>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>ContentCloud is the AI division of EWORX S.A.</span>
        </div>
      </div>
    </footer>
  );
}
