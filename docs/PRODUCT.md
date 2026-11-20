# FrontEndFusion — product, architecture and audit

This document records the decisions behind the platform: what the repository
contained, what the product became, how it is organised, how the pieces work,
what was tested, and what is still missing.

## 1. Repository audit (before the transformation)

| Area | What existed | Decision |
| --- | --- | --- |
| `content/docs/*.mdx` | 207 guides: 41 HTML, 56 CSS, 101 JavaScript chapters, 4 reference, 5 learning-path guides | **KEEP** untouched. Now surfaced as *lessons* under technology pages |
| `content/snippets/*` | 3 form snippets with live demos | **KEEP** (`/snippets`) |
| `src/app/projects/*` | 6 full-page interactive demos | **KEEP**; now listed under “Interactive demos” on `/projects` and linked from related project briefs |
| `/library` | 720 book/PDF entries, search and filters | **KEEP** (linked from Practice footer column) |
| `/learning` | 6-step list of guides | **MERGE** into `/roadmaps`; the old URL redirects |
| `/resources` | External links + 5 internal links | **KEEP** (linked in nav and footer) |
| Home page | WebGL ASCII hero, “visual lab”, GSAP text reveal, 5 category cards | **REMOVE** — decorative, heavy, and it described the site as an “HTML & CSS hub”. Replaced by a content-first home page |
| `features.ts`, `hero.ts`, `learning-card`, `terminal-rain`, `gradient-showcase`, `react-bits/*`, `SplitText`, `gsap` | Supported the removed home page | **REMOVE** (also drops `gsap` and `@gsap/react`) |
| Navigation | 7 flat links, incl. an in-page anchor (`/#intro`) | **IMPROVE** — dropdowns generated from the curriculum, search, assistant, theme, progress |
| MDX code blocks | Plain text with a Code/Preview toggle | **IMPROVE** — syntax highlighting, copy, Ask-AI, same isolated sandbox |
| Broken link | `/docs/js-getting-started` (in `javascript-basics.mdx`) | **FIXED** |
| Docs page | Reader only | **IMPROVE** — “mark complete”, parent technology link, assistant context |

Missing entirely (**ADD**): TypeScript, frameworks other than HTML/CSS/JS,
Tailwind and the CSS ecosystem, UI libraries, tooling, architecture, AI
development, roadmaps, practice, project briefs, global search, command palette,
real code editor, safe execution, AI assistant, progress tracking.

## 2. Product vision

> Learn frontend. Understand the code. Preview the result. Experiment. Build real projects.

One site that covers the whole path — HTML to AI-powered engineering — where
every concept has the same shape and code is always runnable when it can be,
and honestly labelled when it cannot.

Principles:

1. **Content first.** No decorative effects; flat lists instead of card walls.
2. **One structure.** Every technology page follows the same 20-point template.
3. **Honesty about execution.** A runnable badge, or a plain explanation of why not.
4. **Safe by construction.** User code never runs on the site's origin.
5. **Bring-your-own AI.** No server, no shared key, no vendor lock-in.

## 3. Sitemap

```
/                          Home
/learn                     Curriculum — 10 domains (A–J)
/technologies              Filterable index (56)
/technologies/[slug]       Technology page (template below)
/roadmaps                  9 roadmaps
/roadmaps/[slug]           Stages, topics, lessons, exercises, projects, milestones
/practice                  Exercises + interview questions by domain
/projects                  17 briefs by level + 6 interactive demos
/projects/briefs/[slug]    Brief (requirements → challenges), runnable solution where it fits
/projects/<demo>           Existing full-page demos (no site chrome)
/ai                        AI-powered frontend track + assistant overview
/docs, /docs/[slug]        207 in-depth lessons (MDX)
/snippets, /snippets/[slug]
/library, /library/[slug]
/resources
/search-index.json         Static search index consumed by the command palette
/sitemap.xml, /llms.txt, /robots.txt
```

## 4. Navigation architecture

Header: **Learn ▾ · Technologies ▾ · Roadmaps · Practice · Projects · AI Development · Resources**,
plus search (⌘K / Ctrl+K), AI assistant, theme switch, and a progress/profile menu.

- *Learn* and *Technologies* dropdowns are generated from `src/data/curriculum.ts` and
  the featured technologies, so navigation cannot drift from content.
- Under 1180px the links collapse into a mobile menu; search, assistant, theme and profile stay visible.
- “Profile” is local: progress lives in `localStorage`. There are no accounts and the UI says so.
- Home has a single search field; the full command palette groups results by type.

## 5. Taxonomy

`src/data/curriculum.ts` defines 10 domains:
A Web Fundamentals · B JavaScript · C TypeScript · D CSS Ecosystem · E Frameworks ·
F UI Libraries · G Tools & Workflow · H Architecture & Engineering · I AI-Powered Development · J Projects.

`src/data/technologies/*.ts` holds 56 technology/concept entries (e.g. HTML, Accessibility,
Async JavaScript, TypeScript, Tailwind, React, Next.js, Vue, Angular, Svelte, Astro, shadcn/ui,
Radix, Motion, Git, Vite, Testing, State management, TanStack Query, Frontend security,
AI coding agents, MCP, …). Core concepts and framework-specific pages are separate entries.

Lessons attach to technologies by `guidePrefix` (all `css-*` guides → CSS, all `js-*` → JavaScript)
or an explicit `guides` list. `scripts/validate-content.ts` verifies every reference.

**Technology page template** (sections render only when they have real content — no placeholders):
Overview (what / why) · How it works · Prerequisites · Learning roadmap · Fundamentals · Examples & live preview ·
Advanced concepts · Best practices · Common mistakes · Performance · Real-world use cases · Interview questions ·
Exercises · Projects · Lessons · Official documentation.

## 6. Design system

- Tokens: existing CSS custom properties in `globals.css` (`--bg`, `--bg-card`, `--text`, `--text-muted`,
  `--border`, `--primary`, `--secondary`, `--code-bg`, badge colours) for light and dark.
- Layer: `src/styles/platform.css` — layout primitives (`.wrap`, `.page`), lists (`.rows`, `.row`),
  chips, buttons, header/mega menu, palette, playground, assistant, syntax token colours (`--tok-*`).
- Type: Space Grotesk (headings), Geist (body), Geist Mono (code/eyebrows). Measure capped at 70ch.
- Principles: one accent colour, hairline borders, flat rows instead of cards, motion limited to
  hover/focus and honouring `prefers-reduced-motion`.
- React Bits layer (home page only, added 2026-11): `FaultyTerminal` CRT backdrop behind the hero,
  `DecryptedText` headline decode on load, `CountUp` hero stats, `StarBorder` on the single primary
  CTA, `SpotlightCard` on the ten-domain grid. Components live in `src/components/react-bits/`
  (installed with `npx shadcn@latest add @react-bits/<Name>-TS-TW`); page wrappers live in
  `src/components/home/`. All are client-only, decorative canvases are `aria-hidden`, they pause off
  screen and freeze under `prefers-reduced-motion`. Each upstream file carries one
  `react-hooks/refs` lint exception on its `settingsRef.current = settings` line; re-apply it if a
  component is regenerated. Keep the rest of the site content-first.
- `VariableProximity` page titles on `/ai` and `/learn` only (`proximity` prop on `PageHeader` →
  `src/components/proximity-title.tsx`). Local patch in `react-bits/VariableProximity.tsx`: the upstream
  Google Fonts `@import` is removed and Roboto Flex is self-hosted via `next/font` (`--font-roboto-flex`,
  `opsz` axis, `src/app/layout.tsx`). Re-apply if the component is regenerated. Use on one or two
  showcase pages; plain `<h1>` everywhere else.
- Site chrome (every `(site)` page): `GradualBlur` under the sticky header (hidden at the top of the
  page, `src/components/header-blur.tsx`), a gradient glow line on the header edge, and a closing
  footer band (`src/components/footer-wordmark.tsx`) with a `LetterGlitch` code-glyph field behind a
  `DecryptedText` "FrontEndFusion" wordmark. Both are `aria-hidden` and hidden in print.
- Accessibility: skip link, landmarks, visible focus, `aria-expanded` disclosure menus, combobox/listbox
  palette with `aria-activedescendant`, labelled controls, `role="log"` for console and chat output.

## 7. Technical architecture

Stack unchanged: Next.js 16 App Router (static export), React 19, TypeScript, Tailwind 4, MDX.
Added: CodeMirror 6 (+ Lezer grammars), `@anthropic-ai/sdk` (lazy-loaded).

```
src/data/            curriculum, technologies/, roadmaps, project-briefs, existing datasets
src/lib/learn.ts     lesson resolution + search index builder (server)
src/lib/sandbox.ts   iframe document builder, CSP, runnability rules
src/lib/highlight.tsx Lezer → React highlighting (shared by guides + editor)
src/lib/ai/          provider-independent assistant (types, tasks, store, providers/)
src/lib/progress.ts  local progress store
src/components/playground/   CodeMirror editor + sandboxed preview + console
src/components/assistant/    panel UI, context bridge
```

### Code playground and safe execution

- Editor: CodeMirror 6, syntax highlighting for HTML/CSS/JS/JSX/TS/TSX, line numbers, history, bracket matching, ⌘/Ctrl+Enter to run.
- Features: copy full code, copy only the selection, reset, live preview, console capture, line-by-line explanation list, “Ask AI”.
- **Execution is isolated.** Previews run in `<iframe sandbox="allow-scripts">` **without** `allow-same-origin`,
  giving the frame an opaque origin: it cannot read the site's cookies, storage or DOM (verified in the
  browser: `iframe.contentDocument` is inaccessible). A CSP meta tag inside the frame blocks nested frames, form posts
  and non-HTTPS/CDN scripts. The parent accepts `postMessage` only from that frame's window and a per-run token.
- Language support: HTML, CSS (applied to supplied markup), JS and TypeScript (Babel standalone, console output),
  React JSX/TSX (React 18 UMD + Babel from pinned unpkg URLs). **Not runnable here:** examples importing npm packages
  or framework modules (Next.js, Vue, Svelte, Angular, Astro, Radix, Motion…), shell and SCSS. The UI says so instead of faking a result.
- Frames boot only when scrolled near, so pages with several examples don't download React/Babel eagerly.

### AI learning assistant

- `AIProvider` interface (`stream()` yields text deltas). Providers: **Anthropic** (official SDK, streaming,
  default model `claude-opus-5-5`, server-side refusal fallback enabled) and **OpenAI-compatible** (any `/chat/completions`
  endpoint, including local Ollama). Add a provider by implementing the interface and registering it.
- 13 tasks: explain, line-by-line, beginner, find bugs, fix, improve, JS→TS, CSS→Tailwind, generate React component,
  compare frameworks, generate exercises, project idea, explain architecture.
- Context: the topic/page, the example's code, and the learner's current editor selection are attached to every request.
  Snippet text is treated as data in the system prompt.
- **Keys and privacy.** There is no backend. The learner supplies their own key; it is held in `sessionStorage` by default
  (opt-in `localStorage`) and sent only to the chosen provider. The panel states this and offers “clear key”.
  A hosted deployment that wants to offer AI without BYOK would add a server route behind the same `AIProvider` interface.

## 8. Testing results (this change)

| Check | Result |
| --- | --- |
| `npx tsc --noEmit` | clean |
| `npm run lint` | clean |
| `npm run build` (static export) | success — 1,032 static pages |
| `scripts/validate-content.ts` | OK: 56 technologies, 9 roadmaps, 17 projects, 207 guides — all slugs resolve |
| Internal link crawl of `out/` | 1 broken link found (`/docs/js-getting-started`) and fixed; 0 remaining |
| Browser: home, technology page, roadmap, project brief | render; no console errors |
| Browser: JS example | runs; console output captured (`counter: 7`, etc.); status “Ready” |
| Browser: React example | loads React/Babel in the sandbox, status “Ready”, no errors |
| Browser: sandbox isolation | `iframe.contentDocument` inaccessible from the page |
| Browser: ⌘K palette | opens, returns grouped results for “async”, closes on Escape |
| Browser: assistant panel | opens with focus in the input; code-only actions disabled until code is in context |
| Mobile 375px | header overflow found and fixed; page width equals viewport |
| Calculator solution logic | simulated in Node (2+3=5, 2+3×4=20 left-to-right, 0.1+0.2=0.3, 1÷0 → Error after fix) |

**Not verified** (be aware): a live request to Anthropic or an OpenAI-compatible endpoint (no key available in the test environment),
screen-reader behaviour, Lighthouse scores, Safari/Firefox, the TSX example's visual output, and the three CSS-with-markup previews.

## 9. Known limitations and future roadmap

Limitations
- Technology pages are hand-written data. Depth varies: the core ones (HTML, CSS, JS, TS, React, Next.js, Tailwind, testing, state, security, AI workflow)
  are detailed; Angular, Solid, Svelte, Astro, React Router, component-library comparisons and several tooling pages are shorter overviews.
- The three project briefs with runnable solutions are the only ones with complete code; the others give steps and structure, not a full multi-file solution.
- React/TS execution needs network access to unpkg; there is no offline mode and no bundler, so no npm imports.
- Progress is per-browser; there is no sync, accounts, streaks or certificates.
- Search is a lightweight client-side scorer over a static index (no typo tolerance).

Future
1. Full multi-file project solutions with an in-browser bundler (WebContainers or Sandpack) so npm packages can run.
2. Vue/Svelte live previews via their compilers.
3. Typo-tolerant search (e.g. Fuse.js or MiniSearch) built at compile time.
4. Optional server route + auth for hosted AI without bring-your-own-key.
5. Lighthouse and axe checks in CI; Playwright tests for the playground and palette.
6. Expand Angular, Solid, Astro, and UI-library pages to the full template; add Redux/Zustand runnable demos.
7. Optional accounts and cross-device progress.
