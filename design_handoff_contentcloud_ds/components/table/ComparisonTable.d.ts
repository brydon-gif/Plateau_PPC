import * as React from 'react';

export interface ComparisonRow {
  feature: React.ReactNode;
  /** Values per column; index 0 is the highlighted ContentCloud column. */
  values: React.ReactNode[];
}

export interface ComparisonTableProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Column headers; first is the highlighted brand column. */
  columns: React.ReactNode[];
  rows: ComparisonRow[];
}

/**
 * Feature comparison matrix with the ContentCloud column washed in brand red.
 * @startingPoint section="Marketing" subtitle="Why-choose-us comparison matrix" viewport="900x420"
 */
export function ComparisonTable(props: ComparisonTableProps): JSX.Element;
