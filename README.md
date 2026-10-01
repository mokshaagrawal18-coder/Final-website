# Moksha Agrawal — personal site

Static site built with [Astro](https://astro.build). No UI framework, no runtime dependencies. Motion is CSS plus a few small scripts.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs static files to dist/
```

`dist/` can be deployed to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages).

## Before publishing

All links live in `src/data/site.ts`. An empty value hides that link everywhere (nav, footer, contact) instead of showing a broken or generic one.

| What | Where | Status |
| --- | --- | --- |
| Email | `site.email` | set |
| LinkedIn profile URL | `site.linkedin` | **needed** |
| GitHub profile URL | `site.github` | **needed** |
| Résumé PDF | `public/resume/Moksha-Agrawal-Resume.pdf` | set |
| Random Drift link | `site.randomDrift` | optional |
| Healthcare full report | `site.healthcareReport` | optional |
| Final domain | `site` in `astro.config.mjs` | set (mokshaagrawal.vercel.app) |



## Where things live

- `src/styles/global.css`: colour/type/spacing tokens, grid, links and buttons, paper textures, reveal motion, reduced-motion rules
- `src/data/`: all page copy that repeats or is structured (work themes, toolkit, About notes, Notes entries)
- `src/components/`: nav, footer, links, handwritten notes, the route selector, About notes, the future-me letter, the toolkit
- `src/components/visuals/`: the diagrams (explanatory illustrations are labelled as such)
- `src/pages/`: one file per route

## Notes page

Notes content lives directly in `src/pages/notes.astro` (the `changed` and `current` lists at the top).
