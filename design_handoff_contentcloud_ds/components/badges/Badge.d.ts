import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default 'neutral' */
  tone?: 'neutral' | 'red' | 'dark' | 'success' | 'outline';
  children?: React.ReactNode;
}
/** Small status pill. */
export function Badge(props: BadgeProps): JSX.Element;

export interface EyebrowProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'left' | 'center' | 'right';
  children?: React.ReactNode;
}
/** Red uppercase section overline. */
export function Eyebrow(props: EyebrowProps): JSX.Element;

export interface TrustBadgeProps extends React.HTMLAttributes<HTMLElement> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  href?: string;
}
/** Compliance/trust tile: glyph + title + one-line description. */
export function TrustBadge(props: TrustBadgeProps): JSX.Element;
