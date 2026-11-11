# CLAUDE.md

Guidance for agents working in this repository.

## Repository overview

FrontEndFusion is a **Next.js 16 App Router** learning site for HTML, CSS, and
frontend fundamentals. It is no longer a static HTML/CSS project. The entire
site lives in `frontend/`:

- interactive project demos
- copy-paste form snippets
- nine Markdown-backed guides
- a data-driven hub page with light/dark theming

The repository root intentionally contains only project documentation and the
`frontend/` app. Do not recreate `index.html`, `styles.css`, or root-level
`projects/`, `snippets/`, `resources/`, or `web-dev-learning-path/` copies.

## Commands

Run everything from `frontend/`:

```bash
npm run dev      # development server on :3000
npm run build    # production build + type check
npm run lint     # ESLint
```

`next.config.ts` enables `cacheComponents` and `partialPrefetching`. Read the
bundled Next.js docs in `frontend/node_modules/next/dist/docs/` before using an
unfamiliar API; this version has breaking changes from older releases.

## Architecture

```text
frontend/
├── content/docs/*.md        # guide bodies (one file per docs.ts slug)
├── src/app/
│   ├── (site)/              # hub, /docs, /snippets with shared chrome
│   ├── projects/            # standalone demo routes (no site chrome)
│   ├── globals.css          # Tailwind import, tokens, shared styles
│   └── layout.tsx           # <html>, metadata, pre-paint theme script
├── src/components/          # UI, project demos, snippet demos, markdown
├── src/data/                # single source of truth (8 datasets / 31 keys)
└── src/lib/                 # markdown + icon helpers
```

### Data contract

All content comes from `src/data`. `src/data/index.ts` exports `siteData`
(the eight datasets) and `dataSummary`. The eight datasets and their keys:

1. `navigation.ts` — `label`, `href`
2. `hero.ts` — `title`, `subtitle`, `actions`
3. `features.ts` — `icon`, `title`, `detail`
4. `projects.ts` — `slug`, `title`, `description`, `tags`, `level`
5. `snippets.ts` — `slug`, `title`, `description`, `tags`, `icon`
6. `resources.ts` — `title`, `href`, `icon`, `tint`
7. `learning-path.ts` — `slug`, `title`, `description`, `icon`, `level`
8. `docs.ts` — `slug`, `title`, `description`, `category`

Rules:

- Never hard-code content in a page that already exists in `src/data`.
- A `docs.ts` slug must match `content/docs/<slug>.md`.
- Project/snippet slugs must match their route folders and component maps.
- Keep the 8/31 count in sync if the schema changes, and update the README
  table at the same time.

## Adding content

### Guide

1. Create `frontend/content/docs/<slug>.md` with a single leading `# Title`.
2. Add `{ slug, title, description, category }` to `src/data/docs.ts`.
3. Optionally add the same slug to `src/data/learning-path.ts`.

The docs route strips the leading H1, builds a table of contents from `##` and
`###` headings, and renders Markdown with `react-markdown` + `remark-gfm`.

### Project

1. Add `{ slug, title, description, tags, level }` to `src/data/projects.ts`.
2. Create `src/app/projects/<slug>/page.tsx` as a server component.
3. Export `metadata` from the page.
4. Put client interactivity in `src/components/projects/<demo>.tsx`.

Demo pages sit outside the `(site)` route group, so they do not inherit the
site header/footer. Each demo must provide its own way back to `/`.

### Snippet

1. Add `{ slug, title, description, tags, icon }` to `src/data/snippets.ts`.
2. Add a client component under `src/components/snippets/`.
3. Register it in the `demos` record in
   `src/app/(site)/snippets/[slug]/page.tsx`.

## Conventions

### Next.js

- `params` and `searchParams` are Promises in pages: `const { slug } = await params`.
- Static dynamic routes use `generateStaticParams()`.
- Prefer server components. Add `"use client"` only for state, effects, or
  browser APIs.
- Use `next/link` for internal navigation and `next/font` for fonts.
- Do not add CDN `<script>` or `<link>` tags for CSS frameworks. Tailwind is
  compiled locally from `globals.css`.

### Styling

- Theme tokens are CSS custom properties on `:root` / `[data-theme="light"]`
  and `[data-theme="dark"]` in `globals.css`. Use `var(--bg)`, `var(--bg-card)`,
  `var(--text)`, `var(--text-muted)`, `var(--border)`, `var(--primary)`, and
  `var(--secondary)` instead of hard-coded colors.
- `data-theme` lives on `<html>`. `ThemeToggle` and the inline boot script in
  `layout.tsx` own it; `localStorage` key is `ffe-theme`.
- Element selectors (`body`, `a`) live in `@layer base` so Tailwind utilities
  can override them. New global element rules must follow the same pattern.
- Reuse `.hub-card`, `.section-title`, `.tech-tag`, `.diff-badge`,
  `.snippet-card`, `.resource-link`, `.doc-body`, and `.table-cell`.
- Demo pages may use scoped `<style>` blocks, but scope every selector under a
  demo wrapper. Never style `body`, `nav`, or `table` globally from a demo.

### Content and accessibility

- Use semantic landmarks and a single `<h1>` per page.
- Label every form control; connect hints and errors with `aria-describedby`.
- Keep heading order and table captions/`scope` attributes.
- Ensure interactive targets are keyboard reachable and show focus.
- Respect `prefers-reduced-motion`; shared styled already disable animation.
- Add `alt` text to images; decorative icons get `aria-hidden="true"`.

## Verification

Before finishing a change:

1. `cd frontend && npm run build`
2. `npm run lint`
3. Spot-check `/`, `/docs`, `/docs/<slug>`, `/snippets/<slug>`, and the touched
   project route in a browser.
4. Confirm no dead links to removed HTML or Markdown files remain:
   `grep -rn "index.html\|styles.css\|\.md\"" frontend/src`
