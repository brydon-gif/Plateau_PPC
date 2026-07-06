**Card / QuoteCard** — content surfaces. `Card` is the workhorse feature/content tile (icon → eyebrow → title → body → footer). `QuoteCard` is the use-case block with a left red rule.

```jsx
<Card icon="📄" title="Capture and connect sources" hoverable>
  Bring in the content and context that matter.
</Card>

<QuoteCard
  quote="CCBot can help policy teams make complex public information easier to access."
  label="Public information workflows" />
```

- `Card` tones: `default` (white + hairline), `inset` (on gray band), `dark` (inverted).
- Only set `hoverable` on clickable cards; static feature grids stay flat.
- Icon tile uses the red tint background — keep glyphs simple.
