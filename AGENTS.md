# AGENTS.md

Guidance for AI coding agents working in this repository. (Human-facing docs: `README.md`. Machine-readable site summary served to web-crawling agents: `public/llms.txt`.)

## What this is

The source for **stevenhan.net** - Steven X. Han's personal one-page site. It is a
single, static, content-in-the-HTML landing page: a dark, kinetic hero with a
cycling role, a short tagline, and a list of small web tools. There is no backend
and no client-side router.

## Stack

- **Vite** + **TypeScript**. No UI framework - the page is authored directly in `index.html`.
- Vanilla CSS in `src/styles.css` (custom properties, `clamp()`, CSS grid, keyframe reveals).
- One small progressive-enhancement script, `src/main.ts` (the role flipper). The page
  is fully readable with JavaScript disabled.
- Fonts: Space Grotesk / Instrument Sans / Newsreader via Google Fonts.
- Analytics: Google Analytics + Microsoft Clarity (snippets in `index.html`).

## Layout

```
index.html            # the entire page: content + meta/OG/JSON-LD + analytics
src/main.ts           # role flipper (enhancement only)
src/styles.css        # all styles
public/               # copied verbatim to the site root at build time
  llms.txt            # machine-readable profile for LLMs/agents
  robots.txt          # welcomes crawlers; points to sitemap + llms.txt
  sitemap.xml
  site.webmanifest
  favicon.svg, favicon.ico, icon-192.png, icon-512.png, apple-touch-icon.png, og-image.png
  CNAME               # stevenhan.net (custom domain)
.github/workflows/deploy.yml   # builds and publishes to the gh-pages branch on push to main
```

## Commands

- `npm install` - install dependencies.
- `npm run dev` - local dev server.
- `npm run build` - type-check (`tsc --noEmit`) then build to `dist/`.
- `npm run preview` - preview the production build.
- `npm run deploy` - manual publish of `dist/` to the `gh-pages` branch (CI does this automatically).

## Conventions

- **Content lives in `index.html`.** Keep it there (not injected by JS) so crawlers and
  AI agents see it without executing scripts.
- **Keep JS optional.** Anything in `src/main.ts` must be a non-essential enhancement and
  must respect `prefers-reduced-motion`.
- **One accent colour.** Amber (`--amber`, `#e8a33d`) on warm near-black. Do not introduce
  new accent hues; tint neutrals toward the palette.
- **Never use em dashes or en dashes** in content; use a normal hyphen.
- If you change the roles list, update all three copies: `ROLES` in `src/main.ts`, the
  initial visible `.flip__word` in `index.html` (which must equal `ROLES[0]`), and the
  `.sr-only` fallback sentence in `index.html`.
- Keep the two structured-data blocks in `index.html` (Person + ItemList) and
  `public/llms.txt` in sync with the visible content.
- Deploy targets the **`gh-pages` branch** (built artifacts). Source lives on **`main`**.
  Do not commit to `gh-pages` by hand.
