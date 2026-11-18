import type { Technology } from "./types";

export const cssEcosystem: Technology[] = [
  {
    slug: "tailwind-css",
    name: "Tailwind CSS",
    domain: "css-ecosystem",
    level: "Beginner",
    featured: true,
    summary:
      "Utility-first CSS: compose designs from small classes, with design tokens and responsive variants built in.",
    what:
      "Tailwind CSS is a utility-first framework. Instead of writing custom selectors, you apply single-purpose classes such as flex, gap-4, and text-lg directly in markup.",
    why:
      "It removes naming decisions and dead CSS, keeps styles next to the markup they affect, and enforces a consistent spacing and colour scale. The build only ships classes you actually use.",
    how:
      "Tailwind scans your source files for class names and generates the matching CSS at build time. In v4, configuration lives in CSS: @import \"tailwindcss\" and an @theme block of design tokens. Variants such as md:, hover:, and dark: wrap utilities in the corresponding media query or selector.",
    prerequisites: ["css"],
    concepts: [
      "Utility classes and the spacing scale",
      "Responsive prefixes: sm, md, lg",
      "State variants: hover, focus-visible, disabled",
      "Dark mode variant",
      "@theme tokens (v4)",
      "Arbitrary values: w-[42rem]",
      "Extracting components instead of @apply everywhere",
    ],
    examples: [
      {
        title: "Responsive card in utilities",
        language: "html",
        code: `<script src="https://cdn.tailwindcss.com"></script>
<div class="min-h-screen bg-slate-50 p-6">
  <article class="mx-auto max-w-md overflow-hidden rounded-2xl border bg-white shadow-sm md:flex md:max-w-2xl">
    <div class="h-40 bg-gradient-to-br from-emerald-400 to-emerald-700 md:h-auto md:w-48"></div>
    <div class="p-6">
      <p class="text-xs font-semibold uppercase tracking-wide text-emerald-700">Tutorial</p>
      <h2 class="mt-1 text-xl font-bold text-slate-900">Learn utility-first CSS</h2>
      <p class="mt-2 text-slate-600">Stack on mobile, side by side from the md breakpoint.</p>
      <button class="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">
        Start
      </button>
    </div>
  </article>
</div>`,
        explanation: [
          "The CDN script is for experiments in this sandbox only; real projects compile Tailwind at build time.",
          "md:flex switches the card to a row at the md breakpoint (48rem) — mobile-first.",
          "Spacing utilities (p-6, mt-4) all come from one consistent scale.",
          "hover: and focus-visible: variants style interaction states without writing selectors.",
        ],
      },
    ],
    bestPractices: [
      "Extract repeated patterns into components, not long @apply rules.",
      "Define colours, fonts, and radii as theme tokens.",
      "Use a class-sorting Prettier plugin for readable class lists.",
      "Never build class names by string concatenation — the scanner cannot see them.",
    ],
    mistakes: [
      "Dynamic class names like `text-${color}-500` that never get generated.",
      "Using the Play CDN in production.",
      "Recreating BEM with @apply and losing the benefits.",
    ],
    interview: [
      {
        q: "How does Tailwind keep the CSS bundle small?",
        a: "It generates CSS only for class names it finds in your source files at build time, so unused utilities are never emitted.",
      },
    ],
    docs: [
      { label: "Tailwind CSS docs", href: "https://tailwindcss.com/docs" },
    ],
    related: ["css", "design-systems", "shadcn-ui"],
  },
  {
    slug: "sass",
    name: "Sass / SCSS",
    domain: "css-ecosystem",
    level: "Intermediate",
    summary: "A CSS preprocessor with variables, nesting, mixins, functions, and modules.",
    what:
      "Sass is a language that compiles to CSS. Its SCSS syntax is a superset of CSS that adds variables, nesting, mixins, functions, loops, and a module system (@use).",
    why:
      "Sass predates native CSS variables and nesting and is still common in large codebases and design systems. Many of its features now exist in CSS itself, so new projects often need less of it.",
    concepts: ["$variables vs CSS custom properties", "Nesting and &", "@mixin and @include", "@use and @forward modules", "Maps and loops"],
    examples: [
      {
        title: "Mixins and nesting",
        language: "scss",
        code: `@use "sass:color";

$brand: #16a34a;

@mixin focus-ring($c: $brand) {
  outline: 2px solid $c;
  outline-offset: 2px;
}

.button {
  background: $brand;
  &:hover { background: color.adjust($brand, $lightness: -8%); }
  &:focus-visible { @include focus-ring; }
}`,
      },
    ],
    bestPractices: ["Use @use, not the deprecated @import.", "Keep nesting shallow (two or three levels).", "Expose runtime-themable values as CSS custom properties."],
    docs: [{ label: "Sass documentation", href: "https://sass-lang.com/documentation/" }],
    related: ["css", "css-modules"],
  },
  {
    slug: "css-modules",
    name: "CSS Modules",
    domain: "css-ecosystem",
    level: "Intermediate",
    summary: "Locally scoped class names generated at build time — plain CSS without global collisions.",
    what:
      "A CSS Module is a .module.css file whose class names are rewritten to unique identifiers at build time and imported into JavaScript as an object.",
    why:
      "It gives component-level scoping with zero runtime cost while you keep writing ordinary CSS. Next.js and Vite support it out of the box.",
    concepts: ["Local scope by default", "Importing styles as an object", ":global escape hatch", "composes"],
    examples: [
      {
        title: "Button.module.css in React",
        language: "tsx",
        code: `// Button.module.css
// .button { padding: 8px 14px; border-radius: 8px; }
// .primary { background: #16a34a; color: white; }

import styles from "./Button.module.css";

export function Button({ children }: { children: React.ReactNode }) {
  return <button className={\`\${styles.button} \${styles.primary}\`}>{children}</button>;
}`,
      },
    ],
    docs: [{ label: "Next.js — CSS Modules", href: "https://nextjs.org/docs/app/getting-started/css" }],
    related: ["css", "sass", "css-in-js"],
  },
  {
    slug: "css-in-js",
    name: "CSS-in-JS & Styled Components",
    domain: "css-ecosystem",
    level: "Advanced",
    summary: "Writing styles in JavaScript — runtime libraries vs zero-runtime extraction, and the trade-offs.",
    what:
      "CSS-in-JS libraries such as styled-components and Emotion let you define styles in JavaScript, co-located with components and driven by props. Zero-runtime tools (vanilla-extract, Panda CSS, Linaria) extract static CSS at build time.",
    why:
      "It solved scoping and dynamic styling before CSS Modules and custom properties were widespread. Runtime libraries add JavaScript work and complicate React Server Components, so the ecosystem has moved toward build-time extraction or utility CSS.",
    concepts: ["Tagged template styled components", "Prop-driven styles", "Theme providers", "Runtime cost and server components", "Zero-runtime extraction"],
    bestPractices: [
      "For new React Server Component apps, prefer CSS Modules, Tailwind, or a zero-runtime library.",
      "Drive dynamic values through CSS custom properties rather than regenerating styles.",
    ],
    mistakes: ["Creating styled components inside render functions, which remounts them every render."],
    docs: [
      { label: "styled-components", href: "https://styled-components.com/docs" },
      { label: "vanilla-extract", href: "https://vanilla-extract.style/" },
    ],
    related: ["css-modules", "tailwind-css"],
  },
  {
    slug: "design-systems",
    name: "Design Systems",
    domain: "css-ecosystem",
    level: "Advanced",
    featured: true,
    summary: "Tokens, components, documentation, and governance that keep a product visually and behaviourally consistent.",
    what:
      "A design system is a shared set of design tokens (colour, type, spacing), accessible components, usage guidelines, and the process that maintains them.",
    why:
      "Without one, every team reinvents buttons and dialogs with slightly different behaviour and accessibility bugs. A system makes good defaults the easy path.",
    how:
      "Tokens are defined once (often as JSON or CSS custom properties) and consumed by both design tools and code. Components wrap tokens and accessibility behaviour behind a stable API. Storybook or a docs site shows each component's states and rules.",
    prerequisites: ["css", "react"],
    concepts: [
      "Design tokens: primitive vs semantic",
      "Theming and dark mode",
      "Component API design: variants, sizes, slots",
      "Headless primitives plus styling",
      "Documentation and visual regression tests",
      "Versioning and contribution model",
    ],
    examples: [
      {
        title: "Semantic tokens on top of primitives",
        language: "css",
        markup: `<main style="background:var(--color-bg);color:var(--color-text);padding:1rem;border-radius:8px">
  <p>Switch <code>data-theme="dark"</code> on this element to retheme the page.</p>
  <button class="btn" style="color:#fff;border:0">Primary action</button>
</main>`,
        code: `:root {
  /* primitives */
  --green-600: #16a34a;
  --gray-50: #f8fafc;
  --gray-900: #0f172a;

  /* semantic tokens */
  --color-bg: var(--gray-50);
  --color-text: var(--gray-900);
  --color-action: var(--green-600);
  --radius-control: 8px;
  --space-2: 0.5rem;
  --space-4: 1rem;
}

[data-theme="dark"] {
  --color-bg: var(--gray-900);
  --color-text: var(--gray-50);
}

.btn {
  background: var(--color-action);
  border-radius: var(--radius-control);
  padding: var(--space-2) var(--space-4);
}`,
        explanation: [
          "Primitives name raw values; semantic tokens name a purpose.",
          "Components use only semantic tokens, so a theme switch changes a handful of variables.",
        ],
      },
    ],
    bestPractices: ["Components consume semantic tokens only.", "Bake accessibility into primitives once.", "Document do and don't examples next to live components."],
    mistakes: ["Building a design system before the product has repeated patterns.", "Hard-coded hex values in components."],
    interview: [
      {
        q: "Primitive vs semantic tokens?",
        a: "Primitives are raw values (green-600). Semantic tokens map intent to primitives (color-action → green-600), so themes and rebrands change mappings, not components.",
      },
    ],
    docs: [
      { label: "W3C Design Tokens format", href: "https://www.designtokens.org/" },
      { label: "Storybook", href: "https://storybook.js.org/docs" },
    ],
    related: ["tailwind-css", "shadcn-ui", "radix-ui", "storybook"],
    projects: ["design-system-build"],
  },
];
