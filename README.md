# in vivo site

Custom CSS and JS for invivo.works on Cargo. Cargo holds the content (pages, images, Commerce products). This repo holds the look and behavior: the frosted bars, the wordmark to eye morph, the index, project pages, photo info captions and the cart.

## How it loads

Cargo loads two files from this repo through jsDelivr. Paste this once into Cargo (Site Settings, custom HTML in the head):

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/rentonjosh/in-vivo-site@main/dist/in-vivo.css">
<script defer src="https://cdn.jsdelivr.net/gh/rentonjosh/in-vivo-site@main/dist/in-vivo.js"></script>
```

After that, changes ship by pushing to `main`. jsDelivr caches `@main` for up to 12 hours; after a push, open these two URLs once to refresh it:

- https://purge.jsdelivr.net/gh/rentonjosh/in-vivo-site@main/dist/in-vivo.css
- https://purge.jsdelivr.net/gh/rentonjosh/in-vivo-site@main/dist/in-vivo.js

The live site should load a tagged version (`@v1.0.0` instead of `@main`) so a work-in-progress push never reaches it. The sandbox (in-vivo-copy.cargo.site) loads `@main`.

## Layout

| Path | What it is |
|---|---|
| `dist/in-vivo.css` | Styles Cargo loads. |
| `dist/in-vivo.js` | Behavior Cargo loads. |
| `reference/prototype.html` | The approved browser prototype. The source of truth for how everything should look and move. Open it in a browser to compare. |

## Rules

- "in vivo" is always lowercase.
- Never use em-dashes in any site copy.
- Selected states share one white fill. Frost is `rgba(242,242,242,.78)` with `blur(18px) saturate(1.2)`.
- Bars are pills: 36px desktop, 44px phone. Photo radius is half the bar height.
- Every animation has a reduced-motion fallback (fades only).
