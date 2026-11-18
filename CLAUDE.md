# CLAUDE.md

Guidance for agents working in this repository.

## Repository overview

FrontEndFusion is a **Next.js 16 App Router** frontend learning platform
(static export). It is organised as a curriculum:

- 10 domains → 56 technology pages → 207 MDX lessons
- 9 roadmaps, 17 project briefs, practice (exercises + interview questions)
- a sandboxed code playground and a provider-independent AI assistant
- global search (⌘K), light/dark themes, local progress

Product and architecture decisions live in `docs/PRODUCT.md`. Serverless
backend code may be added later; do not recreate `index.html`, `styles.css`, or
top-level `projects/`, `snippets/`, `resources/` copies.

## Commands

Run everything from the repository root:

```bash
npm run dev      # development server on :3000
npm run build    # production build + type check
npm run lint     # ESLint
npx tsx scripts/validate-content.ts   # curriculum references resolve
```

`next.config.ts` uses `output: "export"`. Read the bundled Next.js docs in
`node_modules/next/dist/docs/` before using an unfamiliar API; this version has
breaking changes from older releases.

## Architecture

```text
./
├── content/docs/*.mdx       # lessons (one file per slug)
├── content/snippets/*.mdx
├── docs/PRODUCT.md          # product + architecture record
├── scripts/validate-content.ts
├── src/app/
│   ├── (site)/              # home, learn, technologies, roadmaps, practice, projects, ai, docs, snippets, library, resources
│   ├── projects/            # standalone demo routes (no site chrome)
│   ├── search-index.json/   # static search index (route handler)
│   ├── globals.css          # Tailwind import, tokens, base + doc styles
│   └── layout.tsx
├── src/styles/platform.css  # layout, nav, playground, palette, assistant styles
├── src/components/          # playground/, assistant/, mdx/, header-nav, search-palette, …
├── src/data/                # curriculum, technologies/, roadmaps, project-briefs, others
└── src/lib/                 # learn.ts, sandbox.ts, highlight.tsx, ai/, progress.ts, content.ts
```

### Data contract

`src/data` is the single source of truth. Never hard-code content in a page that
already exists there.

- `curriculum.ts` — 10 domains (`id`, `letter`, `title`, `tagline`, `description`, `href`)
- `technologies/*.ts` — `Technology` entries (see `technologies/types.ts`); sections render only when filled
- `roadmaps.ts` — stages reference technology, guide and project slugs
- `project-briefs.ts` — 17 briefs; `starter` = runnable single-file solution
- `projects.ts` — 6 interactive demos (routes under `src/app/projects/<slug>`)
- `navigation.ts`, `snippets.ts` (MDX-backed), `docs.ts` (MDX-backed), `resources.ts`, `learning-path.ts` (guide icons), `books.ts`

Rules:

- Every slug referenced by technologies, roadmaps and briefs must exist.
  Run `npx tsx scripts/validate-content.ts` after editing data.
- A `docs` slug is the file name in `content/docs/<slug>.mdx`.
- Lessons attach to a technology via `guidePrefix` or `guides`.
- Do not add empty placeholder sections or lessons; omit what you cannot write well.

### Playground and sandbox (security-critical)

- User/example code runs only in `<iframe sandbox="allow-scripts">`. **Never add
  `allow-same-origin`** and never run user code on the site origin.
- `src/lib/sandbox.ts` builds the iframe document, CSP and the postMessage bridge;
  messages are accepted only from the frame's `contentWindow` and a per-run token.
- `runnability()` decides what runs. Examples importing npm packages are shown
  read-only with an explanation. Do not simulate output.

### AI assistant

- UI depends only on `AIProvider` (`src/lib/ai/types.ts`). Providers are in
  `src/lib/ai/providers/`. There is no backend: keys stay in the browser.
- Never log, persist beyond the user's choice, or send API keys anywhere except the chosen provider.
- Keep client components free of server-only imports (`node:fs`, `@/lib/content`,
  `@/data/docs`, `@/data/snippets`); pass data in as props from a server component.

## Adding content

### Technology

1. Add an entry to a file in `src/data/technologies/` (`slug`, `name`, `domain`, `level`, `summary`, `what`, `why`, `concepts`, `docs` are required).
2. Add `examples` for a playground; add `markup` for CSS examples.
3. Link `related`, `prerequisites`, `projects`, `guidePrefix`/`guides`.
4. Run the validator.

### Lesson

1. Create `content/docs/<slug>.mdx` with frontmatter (`title`, `description`, `category`, `order`) and a single leading `# Title`.
2. Attach it to a technology and run the validator.

### Roadmap / project brief

Add to `roadmaps.ts` / `project-briefs.ts`; run the validator.

### Interactive demo / snippet

Demo: add to `projects.ts`, create `src/app/projects/<slug>/page.tsx`, client code in
`src/components/projects/`, provide a way back to `/`. Snippet: add MDX in
`content/snippets/`, component under `src/components/snippets/`, register it in
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
- Reuse the platform classes in `src/styles/platform.css` (`.wrap`, `.page`, `.rows`/`.row`, `.chips`, `.btn`,
  `.level`, `.tsec`, `.pg*`, `.ai*`) and the older `.hub-card`, `.tech-tag`, `.snippet-card`,
  `.resource-link`, `.doc-body`, `.table-cell`. Prefer flat lists to card grids.
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

1. `npm run build`
2. `npm run lint`
3. `npx tsx scripts/validate-content.ts` after any data change.
4. Spot-check `/`, `/learn`, `/technologies/<slug>` (run its playground), `/roadmaps/<slug>`,
   `/docs/<slug>`, and the touched route in a browser; press ⌘K to check search.
5. Confirm no dead links to removed HTML or Markdown files remain:
   `grep -rn "index.html\|styles.css\|\.md\"" src`
