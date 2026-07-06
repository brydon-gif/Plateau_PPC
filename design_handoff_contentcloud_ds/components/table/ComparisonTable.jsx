import React from 'react';

/**
 * ComparisonTable — the "Why Choose ContentCloud?" feature matrix. The first
 * value column (ContentCloud) is highlighted with a faint red wash and red text.
 *
 * columns: array of header labels (first data column is the highlighted brand one)
 * rows: [{ feature, values: [brandValue, ...otherValues] }]
 */
export function ComparisonTable({ columns = [], rows = [], style, ...rest }) {
  const cell = { padding: '14px 18px', fontSize: 14.5, lineHeight: 1.4, verticalAlign: 'top' };
  return (
    <div style={{ overflowX: 'auto', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', ...style }} {...rest}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 640, fontFamily: 'var(--font-body)' }}>
        <thead>
          <tr>
            <th style={{ ...cell, textAlign: 'left', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 14, color: 'var(--text-muted)', background: 'var(--cc-gray-50)' }}>Feature</th>
            {columns.map((c, i) => (
              <th key={i} style={{
                ...cell, textAlign: 'center',
                fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 15,
                color: i === 0 ? 'var(--cc-red)' : 'var(--cc-ink)',
                background: i === 0 ? 'var(--cc-red-tint)' : 'var(--cc-gray-50)',
                borderTopRightRadius: i === columns.length - 1 ? 'var(--radius-xl)' : 0,
              }}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri} style={{ borderTop: '1px solid var(--border-subtle)' }}>
              <td style={{ ...cell, fontWeight: 600, color: 'var(--cc-ink)', fontSize: 14.5 }}>{r.feature}</td>
              {r.values.map((v, vi) => (
                <td key={vi} style={{
                  ...cell, textAlign: 'center',
                  color: vi === 0 ? 'var(--cc-red)' : 'var(--text-muted)',
                  fontWeight: vi === 0 ? 600 : 400,
                  background: vi === 0 ? 'var(--cc-red-tint)' : 'transparent',
                }}>{v}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
