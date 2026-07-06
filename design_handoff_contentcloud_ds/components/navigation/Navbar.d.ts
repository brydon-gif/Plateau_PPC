import * as React from 'react';

export interface NavItem { label: React.ReactNode; href?: string; caret?: boolean; }

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  logoSrc?: string;
  brand?: React.ReactNode;
  items?: NavItem[];
  onPrimary?: () => void;
  onSecondary?: () => void;
}
/**
 * Sticky marketing top bar (logo + nav + demo/get-started actions).
 * @startingPoint section="Navigation" subtitle="Marketing top nav" viewport="1200x68"
 */
export function Navbar(props: NavbarProps): JSX.Element;

export interface FooterColumn { title: React.ReactNode; links: React.ReactNode[]; }
export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  logoSrc?: string;
  brand?: React.ReactNode;
  tagline?: React.ReactNode;
  columns?: FooterColumn[];
  legal?: React.ReactNode;
}
/** Light multi-column sitemap footer. */
export function Footer(props: FooterProps): JSX.Element;
