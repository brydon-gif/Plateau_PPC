import * as React from 'react';

export interface QuoteCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The quoted sentence (quotation marks are added automatically). */
  quote: React.ReactNode;
  /** Bold attribution line, e.g. "Public information workflows". */
  label: React.ReactNode;
  /** Uppercase kicker under the label. @default 'Representative use case' */
  kicker?: React.ReactNode;
  /** @default 'inset' */
  tone?: 'inset' | 'plain';
}

/** Use-case / testimonial card with a left red accent rule. */
export function QuoteCard(props: QuoteCardProps): JSX.Element;
