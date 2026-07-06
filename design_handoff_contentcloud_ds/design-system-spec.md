# ContentCloud Design System

A brand & UI system reverse-engineered from the live marketing site
**https://www.contentcloud.com/** (home + `/products/ccbot`), captured via the
Porter web-scraping tool on 3 July 2026. Use it to build on-brand ContentCloud
landing pages, product pages and marketing assets.

> **ContentCloud** — "Your Content, Unlocked." A growing ecosystem of secure,
> compliant enterprise-AI tools for EU institutions and businesses. Two products
> ship today: **CCBot** (an intelligent assistant giving cited, multilingual
> answers across documents and sites) and **Memory** (private recall + governed
> team memory). ContentCloud is the AI division of **EWORX S.A.**

## Sources
- Live site: `https://www.contentcloud.com/` and `https://www.contentcloud.com/products/ccbot`
- Extracted branding tokens (fonts, colors, radii, components) + full-page screenshots.
- Logo mark decoded from the site's inline header SVG → `assets/logo-mark.svg` (+ white variant).

---

## Content fundamentals
How ContentCloud writes:
- **Voice:** measured, trustworthy, enterprise/public-sector. Leads with *security,
  compliance, sovereignty* (EU data residency, GDPR, EU AI Act). Confident but not hypey.
- **Person:** addresses the reader as **"you / your organization"**; refers to itself as
  **"ContentCloud"** or **"we"**. Products are named actors ("CCBot ingests…", "Memory captures…").
- **Casing:** Sentence case for body and most headings. Section titles are set in the
  Jura display face (which reads geometric/technical). Eyebrows are UPPERCASE + tracked.
- **Claims are hedged & precise:** "Representative use case", "Typical answers return in
  ~1–3 seconds", "aligned to enterprise requirements". Avoids absolute promises except the
  brand pillar ("never hallucinates — only uses your content").
- **Qualitative stats:** outcome figures are often words, not numbers — **Fewer / Faster /
  More**, **Cited**, **5+**. Keep Stat values short.
- **Emoji:** used **functionally** as trust-tile glyphs (🇪🇺 🔒 🛡️ 🔐 ✅ 🏛️) and step icons
  (📄 🧠 ✅). Not decorative, never in running prose.
- **CTAs:** "Explore products", "Talk to us", "Book a demo", "Get started", "Read more →".
  Exactly one primary (ink) CTA per surface, paired with a secondary or red text-link.

## Visual foundations
- **Color:** a near-black **navy ink `#121827`** + a single hot **brand red `#D02807`**, on a
  **cool gray** neutral ramp (`#F9FAFB`→`#111827`) over white. Red is used sparingly — emphasis
  words in headlines, eyebrows, checkmarks, the highlighted comparison column, link text. A dark
  navy surface family carries the CCBot chat widget, the closing CTA band, and footers-on-dark.
  Saturation stays low everywhere except the red. See `tokens/colors.css`.
- **Type:** **Jura** for display/headings (geometric, wide, slightly technical, rounded terminals)
  set at weight 400–600 and tracked slightly tight; **Source Sans 3** for body & UI. Eyebrows are
  Jura, uppercase, letter-spaced. Big hero display (~64–72px). See `tokens/typography.css`.
- **Layout:** centered `max-width: 1200px` container, generous section rhythm
  (`--section-y` ≈ 64–112px). Alternating white / `gray-50`–`gray-100` bands separated by hairline
  borders give the page its quiet rhythm. Grids with `gap` (2–3 col feature/trust grids).
- **Surfaces & borders:** flat. **Hairline `1px` borders (`#E5E7EB`)** do most of the work;
  corners are modest — **8px** buttons, **6px** inputs, **12–16px** cards/panels. Soft, low-spread
  shadows are reserved for genuinely floating UI (dropdowns, the chat widget, hover-lift cards).
- **Accents:** use-case / quote cards carry a **3px left red rule**. Icon tiles sit on a faint red
  tint (`#FDF0EC`). The comparison table washes the ContentCloud column in the same red tint.
- **Motion:** restrained — 120–320ms, standard/`ease-out` easing. Hover = subtle bg fill or a
  −2px card lift + shadow; press = 1px nudge down. No bounces, no parallax-heavy motion.
- **Imagery:** the hero uses a faint 3D wireframe render of the hexagonal logo motif. In this
  system that render is stood in for with the **logo mark at ~5% opacity** as a backdrop motif
  (the real PNGs are CORS-locked — see Caveats). Drop real product/hero imagery into the same slot.
- **Buttons:** primary = ink fill / white text; secondary = white + hairline; ghost = bare;
  link = inline red text (underline on hover); danger = red fill (used on dark bands).

## Iconography
- **Trust / step glyphs are emoji** rendered at ~22px inside tinted tiles — this is the brand's
  actual approach on the home page (flag/lock/shield/checkmark). Reuse emoji for these tiles rather
  than importing an icon set.
- **UI affordances** are minimal inline SVG drawn from tokens: the FeatureList red checkmark, the
  FAQ `+`/`×` (a rotating plus), nav dropdown carets (▼). No icon font is shipped.
- **The one real brand asset is the logo mark** (`assets/logo-mark.svg` + `-white.svg`) — a
  hexagonal interlocking "C". Never redraw it; always reference the file.
- If a richer line-icon set is ever needed, substitute **Lucide** (matches the thin, geometric feel)
  and flag the addition — none is bundled today.

---

## Index / manifest
- **`styles.css`** — root entry; `@import`s all tokens + fonts. Consumers link this one file.
- **`tokens/`** — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `effects.css`.
- **`assets/`** — `logo-mark.svg`, `logo-mark-white.svg`.
- **`guidelines/`** — foundation specimen cards (Colors, Type, Spacing, Brand).
- **`components/`** — reusable React primitives (`export function`, `.d.ts`, `.prompt.md`, `.card.html` each):
  - `buttons/` Button · `cards/` Card, QuoteCard · `badges/` Badge, Eyebrow, TrustBadge
  - `stats/` Stat · `feature/` FeatureList · `faq/` FaqItem · `forms/` Input
  - `table/` ComparisonTable · `navigation/` Navbar, Footer
- **`ui_kits/website/index.html`** — full ContentCloud homepage recreation composing the primitives
  (also a Marketing starting point).
- **`_ds_bundle.js`** — compiled component bundle. Auto-generated; safe to overwrite. Do not hand-edit.
- **`SKILL.md`** — Agent-Skills entry point.

## Caveats
- **Fonts** are loaded from Google Fonts (Jura, Source Sans 3) — the real families the site uses,
  not substitutes. To self-host, drop `.woff2` files in `assets/fonts/` and swap the `@import` in
  `tokens/fonts.css` for `@font-face` rules.
- **Hero 3D render, favicon and OG image could not be copied** — those files are served with
  CORS restrictions. The hero uses the logo mark as a faded motif placeholder instead. Send me the
  real `home-3d-light.png` / `home-3d-dark.png` if you want them embedded.
- Colors/spacing were sampled from the site's exposed brand metadata + screenshots, so a few values
  (semantic greens/ambers for the compare cards) are close approximations — tell me if you have exact hex.
