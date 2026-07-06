import * as React from 'react';

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The figure — "Cited", "5+", "Fewer", "~1–3s". */
  value: React.ReactNode;
  /** Muted supporting label under the value. */
  label: React.ReactNode;
  /** @default 'center' */
  align?: 'center' | 'left';
  /** @default 'md' */
  size?: 'sm' | 'md' | 'lg';
}

/** Outcome/benefit figure — large red number over a muted label. */
export function Stat(props: StatProps): JSX.Element;
