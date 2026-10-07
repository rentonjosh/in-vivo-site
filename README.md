# in vivo site

Custom CSS and JS for invivo.works on Cargo. Cargo holds the content (pages, images, Commerce products). This repo holds the look and behavior: the frosted bars, the wordmark to eye morph, the index, project pages, photo info captions and the cart.

## How it loads

Cargo loads the build through a small loader pasted once into Site Settings → CSS/HTML → HTML (then **Update** and **Publish changes**). The loaders are in `src/loader-sandbox.html` and `src/loader-live.html`.

- The loader asks GitHub for the newest commit on `main` and loads `dist/app.js` and `dist/app.css` from jsDelivr pinned to that commit, so no cache can ever serve an old build. A push is live on the next page load.
- It never runs inside Cargo's editor (framed preview or `/edit`).
- The live site's loader only switches on with `?ivdev` in the address (remembered for that browser tab; `?ivdev=0` turns it off). Visitors see the current site.
- At launch, paste `dist/loader-launch.html` instead. It has no `?ivdev` gate and loads a fixed release tag (no GitHub API call, so no rate limit). To ship a later build: `python3 tools/build.py <version>`, commit, `git tag v<version>`, push the tag, then paste the new `dist/loader-launch.html` and Publish.
- Old addresses from the previous site (`/about`, `/about-1`, `/art` to the art filter, `/shop`, `/store`) are rewritten to their new place by the `OLD` table in `src/app.template.js`. `/process` and any other page address open that page if it is tagged; an unknown address falls back to the index.
- Images carry a `srcset` width ladder (480 to 1800) from Cargo's freight server, so phones and desktop columns load only the size they show.

`dist/in-vivo.js` and `dist/in-vivo.css` are retired, empty files kept for old references.

## Build

`python3 tools/build.py <version>` writes `dist/` from `src/` (styles, markup, app template, bootstrap), the reusable prototype code in `tools/parts.json`, and the morph shapes inside `reference/prototype.html`.

## Content model in Cargo

Each work is a Cargo page. Set its tags in the page list: right-click the page → Settings… → Tags (separate by comma), then **Publish changes**. The tags fill the index: `cat:` (object, wearable, art, documentation; old `sculpture` and `mixed media` tags read as art), `reg:` (fine art, hybrid, statement, process...), `cy:` (6-digit cypher), `sub:` (grey label after the title; no commas, since commas separate tags), `name:` (shown title when it should differ from the Cargo page title, e.g. two pages both shown as burner), and flags `roman` (title not italic), `dark`, `contain`, `inquire`, `draft` (keeps it off the index).

- A work must **not** be hidden in Cargo: Cargo's public page list leaves hidden pages out. Cargo's own rendering is replaced, so showing them changes nothing visible.
- The index follows Cargo's page order (drag pages in the page list).
- The cover is the page's Cargo thumbnail. On the page, the first image leads; text lines `label: value` become info rows and a short lowercase line on its own starts a section. Links back to the home page ("in vivo", "back home") and a line repeating the title are dropped.
- A Cargo product placed in the page becomes the buy panel, with one row of buttons per option (Size, Color...).
- The about page: tag it `about` and leave it shown.

## Layout

| Path | What it is |
|---|---|
| `dist/app.js`, `dist/app.css` | The build the loaders fetch. |
| `dist/in-vivo.js`, `dist/in-vivo.css` | Retired, empty. |
| `src/loader-*.html` | What is pasted into Cargo's custom HTML. |
| `src/` | Sources for the build. |
| `tools/build.py` | Builds `dist/`. |
| `reference/prototype.html` | The approved browser prototype. The source of truth for how everything should look and move. Open it in a browser to compare. |

## Rules

- "in vivo" is always lowercase.
- Never use em-dashes in any site copy.
- Selected states share one white fill. Frost is `rgba(242,242,242,.78)` with `blur(18px) saturate(1.2)`.
- Bars are pills: 36px desktop, 44px phone. Photo radius is half the bar height.
- Every animation has a reduced-motion fallback (fades only).

- Index order: newest first by finish date. Tag `d:YYMMDD` (or `d:YYMM`); otherwise the year in `sub:` counts. Undated works sit at the top, `reg:process` works at the end, and Cargo's page order breaks ties.
