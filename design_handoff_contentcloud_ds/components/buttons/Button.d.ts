import * as React from 'react';

export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  /** Visual style. @default 'primary' */
  variant?: 'primary' | 'secondary' | 'ghost' | 'link' | 'danger';
  /** @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  /** Render as this element when not a link. @default 'button' */
  as?: 'button' | 'a';
  /** When set, renders an <a>. */
  href?: string;
  disabled?: boolean;
  /** Node rendered before the label. */
  iconLeft?: React.ReactNode;
  /** Node rendered after the label. */
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

/**
 * ContentCloud primary action control.
 * @startingPoint section="Buttons" subtitle="Ink / secondary / link CTAs" viewport="700x160"
 */
export function Button(props: ButtonProps): JSX.Element;
