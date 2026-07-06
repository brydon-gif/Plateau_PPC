import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement & HTMLTextAreaElement> {
  label?: React.ReactNode;
  /** Helper or error text under the field. */
  hint?: React.ReactNode;
  /** Render a <textarea>. @default false */
  multiline?: boolean;
  rows?: number;
  invalid?: boolean;
}

/** Text field / textarea with label, hint and red focus ring. */
export function Input(props: InputProps): JSX.Element;
