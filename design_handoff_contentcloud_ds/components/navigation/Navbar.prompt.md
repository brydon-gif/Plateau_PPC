**Navbar / Footer** — the marketing chrome.

```jsx
<Navbar onPrimary={() => location.assign('/join')} />
<Footer tagline="Your Content, Unlocked." />
```

- `Navbar` is sticky with a blurred translucent white background and a hairline bottom border. Nav items take an optional `caret` for dropdown menus. Right side is always ghost "Book a demo" + primary "Get started".
- `logoSrc` must be a path reachable from the consuming page (copy `assets/logo-mark.svg` alongside).
- `Footer` is light with 5 link columns and a legal strip — not a dark footer.
