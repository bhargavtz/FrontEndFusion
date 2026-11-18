# FrontEndFusion

**One website for learning everything about frontend development — from HTML fundamentals to AI-powered engineering.**

Learn it, understand the code, preview the result, experiment, and build real projects.

## What's inside

- **Curriculum** — 10 domains and 56 technology pages (HTML, CSS, JavaScript, TypeScript, Tailwind, React, Next.js,
  Vue, Angular, Svelte, Astro, shadcn/ui, Radix, Motion, Git, Vite, testing, state management, security,
  AI coding agents, MCP, …). Every page follows one template: what it is, why it exists, how it works, examples,
  best practices, mistakes, performance, interview questions, exercises, projects, official docs.
- **207 in-depth lessons** — 41 HTML, 56 CSS and 101 JavaScript chapters plus reference guides, written in MDX.
- **Code playground** — CodeMirror editor, syntax highlighting, live preview in an isolated sandbox, console output,
  copy code / copy selection, reset, step-by-step explanations. HTML, CSS, JS, TS and React run in the browser;
  anything that cannot is labelled.
- **AI learning assistant** — knows the current topic and your selected code; 13 tasks (explain, find bugs, convert JS→TS,
  CSS→Tailwind, generate exercises, …). Provider-independent: Anthropic Claude or any OpenAI-compatible endpoint, using your own key.
- **9 roadmaps** — HTML, CSS, JavaScript, TypeScript, React, Next.js, Frontend, Advanced Frontend, AI-Powered Frontend.
- **17 project briefs** (beginner → advanced) plus 6 interactive full-page demos.
- **Practice** — exercises and interview questions for every technology.
- **Global search** (⌘K / Ctrl+K), light/dark themes, local progress tracking, 3 form snippets, a 720-entry book library.

See [`docs/PRODUCT.md`](docs/PRODUCT.md) for the audit, sitemap, navigation, design system, architecture, test results and known limitations.

## Tech stack

Next.js 16 (App Router, static export) · React 19 · TypeScript · Tailwind CSS 4 · MDX (`next-mdx-remote`) ·
CodeMirror 6 · `@anthropic-ai/sdk` (lazy-loaded, optional) · `next/font`.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export + type check
npm run lint
npx tsx scripts/validate-content.ts   # verify curriculum references
```

## Structure

```text
content/docs/*.mdx      lessons (one file per slug)
content/snippets/*.mdx  snippet docs
src/data/               curriculum.ts, technologies/, roadmaps.ts, project-briefs.ts, + existing datasets
src/app/(site)/         learn, technologies, roadmaps, practice, projects, ai, docs, snippets, library, resources
src/app/projects/       standalone interactive demos (no site chrome)
src/components/         playground/, assistant/, mdx/, header, footer, …
src/lib/                learn.ts (lessons + search index), sandbox.ts, highlight.tsx, ai/, progress.ts
src/styles/platform.css layout, navigation, playground, assistant styles
docs/PRODUCT.md         product and architecture decisions
```

## Adding content

**A technology** — add an entry to a file in `src/data/technologies/`. Fill only sections you can write well;
empty sections are not rendered. Add `examples` (with `language`, `code`, `explanation`) to get a runnable playground.
Set `guidePrefix`/`guides` to attach lessons, `related`/`prerequisites` to link pages.

**A lesson** — create `content/docs/<slug>.mdx` with `title`, `description`, `category`, `order`; attach it to a
technology; run `npx tsx scripts/validate-content.ts`.

**A roadmap / project brief** — add to `src/data/roadmaps.ts` / `src/data/project-briefs.ts`. A brief with a `starter`
(single-file HTML) gets a runnable solution.

**An AI provider** — implement `AIProvider` (`src/lib/ai/types.ts`) and register it in `src/lib/ai/providers/index.ts`.

## Privacy and security notes

- Code in the playground runs in an iframe with `sandbox="allow-scripts"` and no `allow-same-origin`; it cannot reach this site's data.
- The AI assistant has no backend. Your API key stays in your browser (`sessionStorage` unless you opt to remember it)
  and goes only to the provider you choose. Use a key with a spend limit.
- Progress is stored in `localStorage` on your device. There are no accounts.

## License

MIT — see [LICENSE](LICENSE).
