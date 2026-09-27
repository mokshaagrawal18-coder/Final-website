# Moksha Agrawal — personal site

Static site built with [Astro](https://astro.build). No UI framework, no runtime dependencies. Motion is CSS plus a few small scripts.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs static files to dist/
```

`dist/` can be deployed to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages).

## Before publishing

| What | Where |
| --- | --- |
| Email, LinkedIn, GitHub URLs | `src/data/site.ts` |
| Résumé PDF | `public/resume/Moksha-Agrawal-Resume.pdf` |
| Home portrait | `public/images/portrait.jpg` |
| About portrait (optional, falls back to the Home one) | `public/images/portrait-about.jpg` |
| Random Drift link | `site.randomDrift` in `src/data/site.ts` |
| Healthcare full report (optional) | `site.healthcareReport` in `src/data/site.ts` |
| Final domain | `site` in `astro.config.mjs` |

Until a portrait exists, a labelled placeholder frame holds its space.

## Where things live

- `src/styles/global.css`: colour/type/spacing tokens, grid, links and buttons, paper textures, reveal motion, reduced-motion rules
- `src/data/`: all page copy that repeats or is structured (work themes, toolkit, About notes, Notes entries)
- `src/components/`: nav, footer, links, handwritten notes, the route selector, About notes, the future-me letter, the toolkit
- `src/components/visuals/`: the diagrams (explanatory illustrations are labelled as such)
- `src/pages/`: one file per route

## Adding a note

Add an entry to `notesList` in `src/data/notes.ts`. Set `featured: true` for the top slots (max 3). The empty state disappears automatically.
