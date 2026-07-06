import * as React from 'react';

export interface FeatureListProps extends React.HTMLAttributes<HTMLUListElement> {
  /** The benefit lines. */
  items: React.ReactNode[];
  /** @default 'check' */
  marker?: 'check' | 'dot';
  /** Split into N columns. @default 1 */
  columns?: number;
}

/** Red-checkmark benefit list, as used under CCBot / Memory. */
export function FeatureList(props: FeatureListProps): JSX.Element;
