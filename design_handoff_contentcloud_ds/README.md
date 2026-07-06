# Handoff: ContentCloud Design System

## Overview
This is the **ContentCloud brand design system** — reverse-engineered from the live
marketing site (contentcloud.com) — for implementing ContentCloud-branded pages/apps
in a real codebase. It is not one screen; it's the full foundation (tokens + reusable
components) plus one worked example (a homepage recreation).

## About the design files
Everything here is an **HTML/React design reference**, built to preview instantly in a
browser with no build step (inline styles, CSS custom properties, UMD React from a CDN).
It is **not production code to import as-is**. The task is to **recreate this system
inside the target codebase's real stack** (Next.js, Vite+React, plain CSS, Tailwind,
whatever the repo already uses) — porting the tokens and component behavior faithfully,
not copy-pasting the `.jsx` files verbatim (they use `React.createElement`/inline-style
patterns meant for design tooling, not app code style).

## Fidelity
**High-fidelity.** Colors, type, spacing and component behavior are all final values
sampled directly from the live site. Treat hex values, font families, radii and spacing
as exact, not placeholders.

## Design tokens
All defined in `tokens/*.css` (imported by `styles.css`). Summary:
- **Color:** ink `#121827` (headings/primary buttons), brand red `#D02807` (accents,
  links, one emphasis word per headline), cool gray ramp `#F9FAFB`→`#111827` for
  surfaces/text, dark navy surface family (`#121827`/`#1B2333`) for the chat widget and
  closing CTA band. Full ramps + semantic aliases in `tokens/colors.css`.
- **Type:** headings in **Jura** (400–600 weight, tight tracking), body/UI in
  **Source Sans 3**. Scale + line-heights in `tokens/typography.css`.
- **Spacing:** 4px base unit, scale up to 128px; section rhythm ~64–112px vertical.
  See `tokens/spacing.css`.
- **Radius:** 6px inputs, 8px buttons, 12–16px cards/panels. `tokens/spacing.css`.
- **Elevation/motion:** flat by default (hairline `1px #E5E7EB` borders do most of the
  work); soft shadows only on floating UI; 120–320ms standard/ease-out transitions.
  `tokens/effects.css`.

## Components
Each in `components/<group>/`, with source (`.jsx`), a type contract (`.d.ts`), usage
notes (`.prompt.md`), and an isolated preview (`.card.html`):
- `buttons/Button` — primary (ink)/secondary/ghost/link/danger, 3 sizes
- `cards/Card`, `cards/QuoteCard` — feature tiles + left-red-rule use-case quotes
- `badges/Badge`, `badges/Eyebrow`, `badges/TrustBadge` — pills, red section overlines, compliance tiles
- `stats/Stat` — big red outcome figure + muted label
- `feature/FeatureList` — red-checkmark benefit list
- `faq/FaqItem` — accordion row
- `forms/Input` — text/textarea field with focus ring
- `table/ComparisonTable` — "why choose us" matrix, brand column highlighted red
- `navigation/Navbar`, `navigation/Footer` — marketing chrome

Read each `.prompt.md` for intended usage before reimplementing.

## Worked example
`ui_kits/website/index.html` — a full homepage recreation composing every component
(hero, trust grid, product spotlight, outcomes, use cases, comparison table, FAQ, CTA,
footer). Use it as the reference layout when the target is a marketing homepage.

## Assets
`assets/logo-mark.svg` (+ `-white.svg`) — the real ContentCloud hexagonal "C" mark,
decoded from the site's own inline SVG. Use these files directly; never redraw the mark.
Note: the site's 3D hero render, favicon, and OG image could not be captured (CORS) —
flagged in `readme.md`; ask the ContentCloud team for those source files if needed.

## Content & voice
See `readme.md` → "Content fundamentals" and "Iconography" sections: tone, casing rules,
CTA vocabulary, and the emoji-as-trust-icon convention. Follow these when writing new copy.

## Files in this bundle
- `readme.md` — full narrative spec (read this first)
- `styles.css` + `tokens/*.css` — all design tokens
- `assets/*.svg` — logo marks
- `components/**` — component source + docs + previews
- `guidelines/*.card.html` — foundation specimens (color/type/spacing/brand)
- `ui_kits/website/index.html` — homepage recreation
- `_ds_bundle.js` — compiled preview bundle for the `.card.html` files (design-tool
  artifact only — do not port this file itself, it's a UMD shim, not app code)
