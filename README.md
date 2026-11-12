# FrontEndFusion

**A Next.js learning hub for HTML, CSS, and modern frontend development.**

FrontEndFusion combines interactive demos, copy-paste form snippets, and a full
guide library in one structured app. All site content lives in typed data
modules, so pages are generated from a single source of truth instead of
hand-maintained HTML.

## ✨ What's inside

- **6 interactive project demos** — responsive navbar, landing page, Flexbox,
  CSS Grid, animations, and a dark-mode toggle.
- **An interactive WebGL visual lab** — a live `GradientASCII` light field from
  React Bits powers the hero and a playground where you can swap shapes,
  palettes, and density.
- **GSAP text reveals** — the hero subtitle uses the React Bits `SplitText`
  component for a staggered word animation.
- **3 copy-paste form snippets** — login, contact, and newsletter, each with
  working client-side interactions.
- **9 in-app guides** — HTML, CSS, responsive design, advanced CSS, best
  practices, accessibility, SEO, JavaScript, and a CSS cheat sheet.
- **Dark and light themes** with system-preference detection, `localStorage`
  persistence, and no flash on first paint.
- **Accessible by default** — semantic landmarks, skip link, labelled controls,
  visible focus states, and reduced-motion support.

## 🛠 Tech stack

- [Next.js 16](https://nextjs.org/) (App Router, Cache Components)
- React 19 and TypeScript
- Tailwind CSS 4
- `react-markdown` + `remark-gfm` for the guide library
- [GSAP](https://gsap.com/) + `@gsap/react` for the hero `SplitText` reveal
- `next/font` — Geist (body), Space Grotesk (display), Instrument Serif
  (editorial accents), and Geist Mono (code)

## 🚀 Run locally

```bash
cd frontend
npm install
npm run dev
```

Open <http://localhost:3000>.

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |

## 🗂 Project structure

```text
FrontEndFusion/
├── README.md
├── CLAUDE.md
├── LICENSE
├── SECURITY.md
└── frontend/
    ├── content/
    │   └── docs/              # Markdown sources for every guide (9 files)
    ├── public/
    └── src/
        ├── app/
        │   ├── (site)/        # Hub, docs, and snippets (shared header/footer)
        │   │   ├── page.tsx
        │   │   ├── docs/
        │   │   └── snippets/
        │   ├── projects/      # Standalone interactive demo routes
        │   ├── globals.css    # Theme tokens and shared component styles
        │   └── layout.tsx     # Root layout, metadata, theme bootstrap
        ├── components/
        │   ├── projects/      # Interactive demo components
        │   ├── snippets/      # Form demo components
        │   ├── react-bits/    # Upstream React Bits components (GradientASCII)
        │   └── ...            # Header, footer, cards, table, markdown
        ├── data/              # 8 typed datasets — 31 keys
        └── lib/               # Markdown and icon helpers
```

## 🧩 Content model — 8 datasets, 31 keys

Every page reads from `frontend/src/data`. The exported `siteData` object in
`src/data/index.ts` is the single entry point.

| # | Dataset | File | Keys |
| --- | --- | --- | --- |
| 1 | Navigation | `navigation.ts` | `label`, `href` |
| 2 | Hero | `hero.ts` | `title`, `subtitle`, `actions` |
| 3 | Features | `features.ts` | `icon`, `title`, `detail` |
| 4 | Projects | `projects.ts` | `slug`, `title`, `description`, `tags`, `level` |
| 5 | Snippets | `snippets.ts` | `slug`, `title`, `description`, `tags`, `icon` |
| 6 | Resources | `resources.ts` | `title`, `href`, `icon`, `tint` |
| 7 | Learning path | `learning-path.ts` | `slug`, `title`, `description`, `icon`, `level` |
| 8 | Docs | `docs.ts` | `slug`, `title`, `description`, `category` |

Guide bodies live in `frontend/content/docs/<slug>.md`. The slug in `docs.ts`
must match the Markdown filename.

## 🧭 Routes

| Route | Description |
| --- | --- |
| `/` | Hub with a WebGL visual lab, features, projects, snippets, resources, and learning path |
| `/docs` | Full guide library |
| `/docs/[slug]` | Rendered guide with table of contents and prev/next navigation |
| `/snippets/[slug]` | Interactive form demo |
| `/projects/responsive-navbar` | Responsive navbar demo |
| `/projects/landing-page` | Landing page demo |
| `/projects/flexbox-layout` | Flexbox showcase |
| `/projects/css-grid` | CSS Grid showcase |
| `/projects/animations` | CSS animation showcase |
| `/projects/dark-mode` | Scoped dark-mode toggle demo |

## ➕ Adding content

**A new guide**

1. Add `frontend/content/docs/my-guide.md`.
2. Add an entry to `docs` in `src/data/docs.ts` with the same slug.
3. Optionally add it to `learningPath` in `src/data/learning-path.ts`.

**A new project**

1. Add an entry to `src/data/projects.ts`.
2. Create `src/app/projects/<slug>/page.tsx`.
3. Put interactive UI in `src/components/projects/` and keep the page a server
   component so it can export metadata.

**A new snippet**

1. Add an entry to `src/data/snippets.ts`.
2. Build the client component in `src/components/snippets/`.
3. Register it in the `demos` map in
   `src/app/(site)/snippets/[slug]/page.tsx`.

## 🎨 Theming

Theme tokens are CSS custom properties in `globals.css`:

- `:root`, `[data-theme="light"]` — light palette
- `[data-theme="dark"]` — dark palette

A small inline script in `src/app/layout.tsx` applies the stored or system
theme before paint. The header toggle writes `ffe-theme` to `localStorage`.
Use the token variables (`var(--bg)`, `var(--text)`, `var(--primary)`, …)
rather than hard-coded colors so both themes keep working.

## ♿ Accessibility

- Semantic landmarks and a skip-to-content link.
- Labelled inputs, `aria-expanded` menu buttons, and `role="switch"` theme
  toggle.
- Visible `:focus-visible` outlines.
- Reduced-motion media query disables non-essential animation.
- Tables include captions and scoped headers.

## 🤝 Contributing

1. Fork the repository.
2. Create a branch: `git checkout -b feature/my-change`.
3. Make the change and run `npm run build` inside `frontend/`.
4. Open a pull request describing the change.

## 🙏 Credits

The hero background and visual lab use the open-source
[`GradientASCII`](https://reactbits.dev) component from
[React Bits](https://reactbits.dev), adapted to TypeScript and styled for this
site. It renders entirely in the browser with WebGL2. The hero subtitle uses
React Bits' `SplitText` (installed through the shadcn CLI) for its word reveal;
`frontend/components.json` maps the `@react-bits` registry for future additions.

## 📄 License

MIT — see [`LICENSE`](./LICENSE).

## 📫 Contact

- GitHub: [bhargavtz](https://github.com/bhargavtz)
- Email: bhargav05@yandex.com
