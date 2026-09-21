# stevenhan.net

Personal one-page site for **Steven X. Han** - a dark, kinetic landing page built as a
fast static document.

- **Vite + TypeScript**, no UI framework - the content is authored directly in `index.html`.
- Near-zero JavaScript: the page renders and reads fully without it; the only script is the
  cycling role animation, which respects `prefers-reduced-motion`.
- Agent- and SEO-friendly: real semantic HTML, Open Graph / Twitter cards, JSON-LD structured
  data, a `sitemap.xml`, and an [`llms.txt`](public/llms.txt) profile for AI agents.

## Develop

```bash
npm install
npm run dev        # local dev server
npm run build      # type-check + build to dist/
npm run preview    # preview the production build
```

## Deploy

Hosted on **Vercel**. Every push to `main` deploys automatically (Vite preset; see
`vercel.json`), served at [stevenhan.net](https://stevenhan.net).

## Working on this repo?

See [`AGENTS.md`](AGENTS.md) for conventions (both for people and coding agents).
