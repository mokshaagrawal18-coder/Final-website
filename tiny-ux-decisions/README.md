# Tiny UX Decisions

**How much can one tiny interface change affect a decision?**

An interactive collection of small interface experiments. Each one keeps almost everything the same, changes one small thing, and lets you choose before showing what changed.

This is a standalone project. It is not linked from the personal site. It lives in this folder only until it moves to its own repo.

```bash
cd tiny-ux-decisions
npm install
npm run dev       # version 1: http://localhost:5173  ·  version 2: http://localhost:5173/v2.html
npm run build     # static files in dist/ (relative paths, so it can be hosted from any folder)
```

## Two versions

Both run the same experiments, data and fictional interfaces. Only the page around them differs.

- **Version 1** (`index.html`, `src/App.jsx`, `src/styles.css`): editorial scroll. Cream paper, serif display, mono labels.
- **Version 2** (`v2.html`, `src/v2/`): a design-review document. White page, grey canvas boards, a spec column per test listing what is held constant, magenta redlines for the change, and an extra step where you try to spot the change yourself before it is shown.

Shared: `src/data/experiments.js`, `src/components/interfaces/`, `src/interfaces.css`.

## What's in it

| Section | What it does |
| --- | --- |
| Intro + the rule | "Same choice. Almost the same interface. One small change." |
| 01 The Popular One | Music plans, then the same plans with a "Most popular" badge |
| 02 Already Checked | Flight checkout, then the same checkout with protection pre-selected |
| 03 Only Two Left | Lamp product page, then the same page with "Only 2 left" |
| 04 Leaving So Soon? | Cancel a membership twice: 2-step flow vs. offers → survey → warning |
| 05 Picked For You | Four films, then the same four with "Recommended for you" on one |
| Your choices | Changed / stayed for each experiment. Not a score or a profile. |
| The little things | 12 specimen cards with filters |
| Strip it back | A hotel card with six toggleable persuasion layers |
| What I learned | Short reflection, methodology, "built with" |

## Where things live

- `src/data/experiments.js`: all copy and content (experiments, plans, films, library specimens, strip layers, methodology). Set `SOURCE_URL` here to show the "View source code" link. An empty value hides it.
- `src/components/Experiment.jsx`: the shared A → "one more time" → B → reveal flow
- `src/components/interfaces/`: the fictional interfaces (Listen, Kestrel Air, Milo, Reelhouse)
- `src/components/FrictionExperiment.jsx`: the two cancellation flows
- `src/components/Library.jsx`, `Strip.jsx`, `Sections.jsx`: the library, Strip the Interface, intro/results/ending
- `src/styles.css`: tokens, editorial layout, and the mock-UI styles

## Principles

- No backend, accounts, analytics or AI. Choices live in page memory and vanish on reload.
- In each A/B pair, any space the change needs (a badge, a line of text) is reserved in both versions, so nothing else moves.
- All brands and products are fictional.
