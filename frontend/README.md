# FrontEndFusion — Next.js app

The FrontEndFusion site: a data-driven learning hub with interactive demos,
form snippets, and a Markdown-backed guide library.

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build and type check |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

## Where things live

- `src/data/` — 8 typed datasets (31 keys) that drive every page.
- `src/app/(site)/` — hub, `/docs`, and `/snippets` routes with shared chrome.
- `src/app/projects/` — standalone demo routes.
- `src/components/` — shared UI, project demos, snippet demos, Markdown.
- `src/components/react-bits/` — upstream React Bits components. `GradientASCII`
  powers the hero and the `/#visual-lab` playground.
- `src/components/SplitText.jsx` — React Bits `SplitText`, installed via shadcn;
  `SplitText.d.ts` supplies its TypeScript props.
- `components.json` — shadcn config and the `@react-bits` registry mapping.
- `content/docs/` — Markdown sources for the nine guides.
- `src/app/globals.css` — theme tokens and shared component styles.

See the repository root [`README.md`](../README.md) and
[`CLAUDE.md`](../CLAUDE.md) for the content model, conventions, and how to add
projects, snippets, or guides.
