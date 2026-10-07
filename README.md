# in vivo site

Custom CSS and JS for invivo.works on Cargo. Cargo holds the content (pages, images, Commerce products). This repo holds the look and behavior: the frosted bars, the wordmark to eye morph, the index, project pages, photo info captions and the cart.

## How it loads

Cargo loads the build through a small loader pasted once into Site Settings → CSS/HTML → HTML (then **Update** and **Publish changes**). The loaders are in `src/loader-sandbox.html` and `src/loader-live.html`.

- The loader asks GitHub for the newest commit on `main` and loads `dist/app.js` and `dist/app.css` from jsDelivr pinned to that commit, so no cache can ever serve an old build. A push is live on the next page load.
- It never runs inside Cargo's editor (framed preview or `/edit`).
- The live site's loader only switches on with `?ivdev` in the address (remembered for that browser tab; `?ivdev=0` turns it off). Visitors see the current site.
- Before launch, the live loader should pin a release tag instead of asking GitHub for `main`.

`dist/in-vivo.js` and `dist/in-vivo.css` are retired, empty files kept for old references.

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
