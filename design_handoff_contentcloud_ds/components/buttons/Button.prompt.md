**Button** — the brand's action control; ink-filled primary for the main CTA, white secondary for adjacent actions, and an inline red `link` variant for "Talk to us" / "Read more" text CTAs.

```jsx
<Button variant="primary" size="lg" href="/join">Get started</Button>
<Button variant="secondary">Book a demo</Button>
<Button variant="link" iconRight={<span>→</span>}>Read more</Button>
```

- `variant`: `primary` (ink `#121827`), `secondary` (white + hairline), `ghost`, `link` (inline red), `danger` (red fill).
- Primary hover darkens to `--cc-ink-hover`; secondary/ghost hover fills `--cc-gray-100`; press nudges down 1px.
- Use exactly one `primary` per surface. Pair with a `secondary` or `link` — never two primaries side by side.
