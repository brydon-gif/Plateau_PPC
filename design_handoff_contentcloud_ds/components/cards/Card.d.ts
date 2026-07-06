import * as React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** Surface tone. @default 'default' */
  tone?: 'default' | 'inset' | 'dark';
  /** Glyph/emoji/SVG shown in a tinted tile at the top. */
  icon?: React.ReactNode;
  /** Small uppercase red overline. */
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  /** Body copy (children). */
  children?: React.ReactNode;
  /** Footer slot pinned to the bottom (e.g. a link Button). */
  footer?: React.ReactNode;
  /** Lift + shadow on hover. @default false */
  hoverable?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * ContentCloud content card — feature tiles, product blurbs, panels.
 * @startingPoint section="Cards" subtitle="Feature & content cards" viewport="700x300"
 */
export function Card(props: CardProps): JSX.Element;
