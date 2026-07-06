import * as React from 'react';

export interface FaqItemProps extends React.HTMLAttributes<HTMLDivElement> {
  question: React.ReactNode;
  /** The answer body. */
  children?: React.ReactNode;
  defaultOpen?: boolean;
}

/** Single FAQ accordion row with a rotating red +/× affordance. */
export function FaqItem(props: FaqItemProps): JSX.Element;
