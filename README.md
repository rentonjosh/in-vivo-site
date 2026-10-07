# in vivo site

Custom CSS and JS for invivo.works on Cargo. Cargo holds the content (pages, images, Commerce products). This repo holds the look and behavior: the frosted bars, the wordmark to eye morph, the index, project pages, photo info captions and the cart.

## How it loads

Cargo loads two files from this repo through jsDelivr. Paste this once into Cargo (Site Settings, custom HTML in the head):

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/rentonjosh/in-vivo-site@main/dist/in-vivo.css">
<script defer src="https://cdn.jsdelivr.net/gh/rentonjosh/in-vivo-site@main/dist/in-vivo.js"></script>
```

After that, changes ship by pushing to `main`. Those two files are a small, stable bootstrap: browsers cache them for a week, so they never change. The bootstrap loads the real build (`dist/app.js`, `dist/app.css`) with a per-minute cache key, so a push shows up within a minute or two once jsDelivr is refreshed:

- https://purge.jsdelivr.net/gh/rentonjosh/in-vivo-site@main/dist/app.js
- https://purge.jsdelivr.net/gh/rentonjosh/in-vivo-site@main/dist/app.css

The live site loads the build only for visitors who open it with `?ivdev` (remembered for that browser tab; `?ivdev=0` turns it off). Before launch, the live site switches to a tagged version so a work-in-progress push never reaches it.

## Build

`python3 tools/build.py <version>` writes `dist/` from `src/` (styles, markup, app template, bootstrap), the reusable prototype code in `tools/parts.json`, and the morph shapes inside `reference/prototype.html`.

## Content model in Cargo

Each work is a Cargo page. Its tags fill the index: `cat:` (object, wearable, sculpture, mixed media, documentation), `reg:` (fine art, hybrid, statement, process...), `cy:` (6-digit cypher), `sub:` (grey label after the title), and flags `roman` (title not italic), `dark`, `contain`, `inquire`. The first image is the cover; text lines `label: value` become info rows and a short lowercase line on its own starts a section. A Cargo product placed in the page becomes the buy panel.

## Layout

| Path | What it is |
|---|---|
| `dist/in-vivo.js`, `dist/in-vivo.css` | Stable bootstrap Cargo loads. |
| `dist/app.js`, `dist/app.css` | The build. |
| `src/` | Sources for the build. |
| `tools/build.py` | Builds `dist/`. |
| `reference/prototype.html` | The approved browser prototype. The source of truth for how everything should look and move. Open it in a browser to compare. |

## Rules

- "in vivo" is always lowercase.
- Never use em-dashes in any site copy.
- Selected states share one white fill. Frost is `rgba(242,242,242,.78)` with `blur(18px) saturate(1.2)`.
- Bars are pills: 36px desktop, 44px phone. Photo radius is half the bar height.
- Every animation has a reduced-motion fallback (fades only).
