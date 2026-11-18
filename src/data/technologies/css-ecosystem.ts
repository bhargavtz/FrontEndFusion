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
    what: "Tailwind CSS is a utility-first framework. Instead of writing custom selectors, you apply single-purpose classes such as flex, gap-4, and text-lg directly in markup.",
    why: "It removes naming decisions and dead CSS, keeps styles next to the markup they affect, and enforces a consistent spacing and colour scale. The build only ships classes you actually use.",
    how: 'Tailwind scans your source files for class names and generates the matching CSS at build time. In v4, configuration lives in CSS: @import "tailwindcss" and an @theme block of design tokens. Variants such as md:, hover:, and dark: wrap utilities in the corresponding media query or selector.',
    prerequisites: ["css"],
    roadmap: [
      "Utilities, the spacing scale, and reading a design in spacing and colour steps",
      "Responsive prefixes and state variants: md:, hover:, focus-visible:",
      "Theme tokens with @theme, plus dark mode",
      "Extracting a component when the same class list repeats",
      "Arbitrary values, custom variants, and auditing the generated CSS size",
    ],
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
    advanced: [
      "Variants stack left to right, so dark:md:hover:bg-emerald-700 applies every condition, and @custom-variant lets you define your own (for example one keyed on pointer: coarse).",
      "Every @theme token is emitted as a CSS custom property, so utilities and arbitrary values such as bg-(--brand) read the same value, and plain CSS can consume it too.",
      "v4 detects sources automatically, but @source adds paths (a component package inside node_modules) and @source inline(...) safelists classes that only exist as strings.",
      "@utility registers a custom utility that participates in variants and layers, unlike a bare class in a stylesheet; @apply only works inside a layer.",
      "Built-in container queries: @container on a parent and @md: on children size a component to its container width instead of the viewport, which is what reusable cards need.",
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
    performance: [
      "The engine emits only the utilities it can see, but scanning is text-based: a class name assembled at runtime disappears from the CSS, so it silently fails rather than bloating the bundle.",
      "Keep the source set narrow. Scanning a large monorepo or a vendored node_modules directory slows every dev rebuild and inflates the safelist.",
      "Resist @apply in hot components: it duplicates declarations into each component's layer instead of sharing one utility class.",
      "Theme tokens compile to a single :root block of custom properties, so a large palette costs bytes but no per-component output.",
    ],
    useCases: [
      "Marketing and landing pages where a small team needs to ship layouts fast.",
      "App shells and dashboards that share tokens through @theme and a few extracted components.",
      "Component libraries such as shadcn/ui, where utilities are the styling API passed to consumers.",
      "Prototypes in plain HTML or JSX where inventing selector names would add friction.",
    ],
    interview: [
      {
        q: "How does Tailwind keep the CSS bundle small?",
        a: "It generates CSS only for class names it finds in your source files at build time, so unused utilities are never emitted.",
      },
      {
        q: "Are arbitrary values a substitute for design tokens?",
        a: "No. Each w-[437px] is a one-off literal, so repeating one scatters magic numbers and turns a rebrand into a search-and-replace. Use them for genuinely unique geometry and promote repeated values into @theme.",
      },
      {
        q: "Does Tailwind remove the need to learn CSS?",
        a: "No. Every utility maps to CSS properties, and layout bugs still come from misunderstanding flex, grid, and the cascade. Tailwind changes how you write CSS, not whether you understand it.",
      },
    ],
    exercises: [
      "Rebuild a pricing card using only utilities, with no custom CSS beyond one gradient backdrop.",
      "Extract that card into a React component, then write an @apply version and note which one is easier to change when the design shifts.",
      "Add an @theme block with three semantic colours and drive a data-theme switch from them.",
      "Make the card switch from stacked to side-by-side with a container query instead of a viewport breakpoint.",
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
    summary:
      "A CSS preprocessor with variables, nesting, mixins, functions, and modules.",
    what: "Sass is a language that compiles to CSS. Its SCSS syntax is a superset of CSS that adds variables, nesting, mixins, functions, loops, and a module system (@use).",
    why: "Sass predates native CSS variables and nesting and is still common in large codebases and design systems. Many of its features now exist in CSS itself, so new projects often need less of it.",
    how: "Sass compiles ahead of time: the compiler resolves variables, expands nesting into full descendant selectors, inlines mixins, and evaluates functions to produce ordinary CSS. The module system loads each file once, gives its members a namespace, and @forward re-exports them, so one entry file assembles the stylesheet. Bundlers such as Vite and Next.js run that compiler as part of the build.",
    prerequisites: ["css"],
    roadmap: [
      "Variables, nesting, and the & parent reference",
      "Mixins, functions, and @content slots",
      "The module system: @use, namespaces, and @forward",
      "Maps and loops that generate variant classes",
      "Interop with CSS custom properties and a modern build pipeline",
    ],
    concepts: [
      "$variables vs CSS custom properties",
      "Nesting and &",
      "@mixin and @include",
      "@use and @forward modules",
      "Maps and loops",
    ],
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
      {
        title: "What the compiler actually emits",
        language: "css",
        markup: `<button class="button">Save</button>`,
        code: `.button {
  background: #16a34a;
}

.button:hover {
  background: #149841;
}

.button:focus-visible {
  outline: 2px solid #16a34a;
  outline-offset: 2px;
}`,
        explanation: [
          "Nesting became full selectors; the source had a single .button block with two & references.",
          "The @include inlined the mixin's two declarations, so nothing about mixins survives into the output.",
          "color.adjust ran at compile time, which is why the hover colour is a literal rather than a function call.",
        ],
      },
    ],
    advanced: [
      "Built-in modules (sass:math, sass:color, sass:meta, sass:selector) replace the old global functions; color.adjust and math.div are the modern forms and avoid deprecation warnings.",
      '@forward "./tokens" with ($brand: #0ea5e9) configures a module\'s !default variables at load time, which is how a themeable library exposes knobs without a settings file.',
      "@mixin with an @content block wraps caller-supplied rules, so a respond($bp) helper can add a media query without knowing what goes inside it.",
      "@each over a map generates modifier classes at build time, keeping the source short while the output stays plain CSS with no runtime cost.",
      "@use evaluates a module once per compilation and in a stable order, whereas @import re-ran the file each time and leaked every member into global scope.",
    ],
    bestPractices: [
      "Use @use, not the deprecated @import.",
      "Keep nesting shallow (two or three levels).",
      "Expose runtime-themable values as CSS custom properties.",
    ],
    mistakes: [
      "Staying on @import, which duplicates CSS and disappears in Dart Sass 3.",
      "Nesting five levels deep, producing selectors with needless specificity that are hard to override.",
      "Storing theme colours in Sass variables when they need to change at runtime; use a custom property.",
      "Building a mixin library that copies 40 declarations into every selector that includes it.",
    ],
    performance: [
      "Compilation happens at build time, so the runtime cost is zero; watch dev rebuild speed instead, since deep @use graphs and big @each loops add compile time.",
      "Every @include duplicates declarations in the output — a mixin used in 100 selectors can add thousands of lines of CSS.",
      "Values that change per instance belong in CSS custom properties; a Sass variable is inlined as a literal at compile time.",
    ],
    useCases: [
      "Legacy enterprise apps and design systems already authored in SCSS.",
      "Generating spacing or colour utilities from a map at build time.",
      "Theming a component library through configurable !default variables.",
      "Customising Bootstrap 5 or another framework whose source is Sass.",
    ],
    interview: [
      {
        q: "Why did Sass deprecate @import in favour of @use?",
        a: "@import evaluated the file every time it was imported, duplicating output, and dumped members into the global namespace. @use loads a module once, namespaces its members, and makes dependencies explicit.",
      },
      {
        q: "When should a value be a CSS custom property instead of a Sass variable?",
        a: "Whenever it must change at runtime: theme switching, user preference, or per-instance overrides. Sass variables are compiled into literals and vanish from the output.",
      },
      {
        q: "What does & do in a nested rule?",
        a: "It refers to the resolved parent selector, so &:hover, &--large and .dark & compose new selectors without repeating the parent's text.",
      },
    ],
    exercises: [
      "Convert a file that uses @import into @use with namespaces and confirm the duplicated output is gone.",
      "Write a respond($breakpoint) mixin that wraps @content in a media query and apply it to three components.",
      "Model a spacing scale as a Sass map and generate margin utilities with @each.",
      "Create a themeable button module with !default variables and override them from the entry file using @use with.",
    ],
    docs: [
      {
        label: "Sass documentation",
        href: "https://sass-lang.com/documentation/",
      },
    ],
    related: ["css", "css-modules"],
  },
  {
    slug: "css-modules",
    name: "CSS Modules",
    domain: "css-ecosystem",
    level: "Intermediate",
    summary:
      "Locally scoped class names generated at build time — plain CSS without global collisions.",
    what: "A CSS Module is a .module.css file whose class names are rewritten to unique identifiers at build time and imported into JavaScript as an object.",
    why: "It gives component-level scoping with zero runtime cost while you keep writing ordinary CSS. Next.js and Vite support it out of the box.",
    how: "The bundler treats a *.module.css file as a module: it rewrites each local class to a unique name derived from the file path and a hash, emits the resulting CSS into the build, and exports a JavaScript object mapping the original names to the generated ones. At runtime styles.button is just a string, so nothing is computed during render. :global(...) opts a selector out of hashing, and composes merges classes from another file into the exported name.",
    prerequisites: ["css", "javascript"],
    roadmap: [
      "Local scope by default, and reading the imported class map",
      "Applying several classes and composing shared styles",
      ":global for third-party markup and :export for values",
      "Typing the import in TypeScript",
      "Keeping modules flat and auditing for duplicated CSS",
    ],
    concepts: [
      "Local scope by default",
      "Importing styles as an object",
      ":global escape hatch",
      "composes",
    ],
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
      {
        title: "What the browser actually receives",
        language: "css",
        markup: `<button class="button primary">Save changes</button>
<button class="button danger">Delete</button>`,
        code: `/* Hashing only renames classes; the CSS itself is ordinary. */
.button {
  padding: 8px 14px;
  border: 0;
  border-radius: 8px;
  font: 600 14px system-ui, sans-serif;
  cursor: pointer;
}

.primary { background: #16a34a; color: #fff; }
.danger  { background: #dc2626; color: #fff; }`,
        explanation: [
          "A real build would rename these to button_a1b2c and primary_d4e5f; the cascade behaves identically.",
          "Both buttons share .button, which is why composes is cheaper than copying declarations into each variant.",
          "Each rule has one class of specificity, so the rule that appears later in the stylesheet wins.",
        ],
      },
    ],
    advanced: [
      "Generated names include a hash of the file's path and content, so two files may both define .button and never collide, and a changed file gets fresh names to defeat stale caches.",
      'composes: base from "./base.module.css" adds a second class to the element rather than copying declarations, so overrides still follow source order and specificity, not the order inside composes.',
      "The :export block exposes values to JavaScript as named exports, which is how a module can hand a brand colour to a canvas or chart library.",
      "composes ... from global lets a local class inherit a global utility (a reset or a type scale) without duplicating its CSS.",
      'Bundler options such as localsConvention: "camelCaseOnly" map kebab-case classes to camelCase keys, so styles.primaryButton works for .primary-button.',
    ],
    bestPractices: [
      "One module per component, named after it, so the file and the component are obviously paired.",
      "Keep selectors to a single class; scoping already isolates them, and descendant chains only raise specificity.",
      "Put shared values in :root custom properties instead of long composes chains.",
      "Use :global only for third-party markup you do not control, and nest it under a local parent when possible.",
    ],
    mistakes: [
      "Writing a class name as a literal string and expecting it to match the hashed one.",
      "Reaching into child components with descendant selectors, which breaks their encapsulation the moment their markup changes.",
      "Assuming composes order controls precedence; import order and specificity do.",
      "Importing the same module through two different paths, which can emit the CSS twice.",
    ],
    performance: [
      "Zero runtime: classes are static strings, so there is no style serialization, cache, or re-injection on render.",
      "CSS is extracted at build time and can be code-split per route by the bundler, so a route only downloads its own styles.",
      "Referencing classes dynamically (styles[name]) keeps the CSS but hides the dependency from tooling that prunes unused modules.",
      "composes adds class names to the element, never duplicated declarations to the stylesheet, so shared CSS stays small.",
    ],
    useCases: [
      "Next.js App Router components that need scoped styles without shipping a runtime.",
      "Incrementally migrating one large global stylesheet into component-owned files.",
      "Design-system packages that publish plain CSS a host app can consume.",
      "Teams with deep CSS skills who do not want to learn a new styling syntax.",
    ],
    interview: [
      {
        q: "How do CSS Modules prevent collisions?",
        a: "The bundler rewrites each local class into a unique generated name and exports the mapping to JavaScript. Two files can each define .button and receive different generated names.",
      },
      {
        q: "How is composes different from a Sass mixin?",
        a: "composes adds another class name to the element, so the declarations exist once in a shared rule. A mixin copies the declarations into every selector that includes it.",
      },
      {
        q: "Do CSS Modules work without a build step?",
        a: "No. It is a build-time convention implemented by bundlers such as webpack, Vite, Next.js and Parcel. The browser only ever sees ordinary CSS and class strings.",
      },
    ],
    exercises: [
      "Split a 300-line global stylesheet into three modules and verify no selector leaks between components.",
      "Build Button.module.css with base, primary and danger classes, then compose them through a typed variant map in TypeScript.",
      "Expose a brand colour with :export and use it to colour a canvas chart.",
      "Style a third-party date picker with :global rules scoped under a local wrapper.",
    ],
    docs: [
      {
        label: "Next.js — CSS Modules",
        href: "https://nextjs.org/docs/app/getting-started/css",
      },
    ],
    related: ["css", "sass", "css-in-js"],
  },
  {
    slug: "css-in-js",
    name: "CSS-in-JS & Styled Components",
    domain: "css-ecosystem",
    level: "Advanced",
    summary:
      "Writing styles in JavaScript — runtime libraries vs zero-runtime extraction, and the trade-offs.",
    what: "CSS-in-JS libraries such as styled-components and Emotion let you define styles in JavaScript, co-located with components and driven by props. Zero-runtime tools (vanilla-extract, Panda CSS, Linaria) extract static CSS at build time.",
    why: "It solved scoping and dynamic styling before CSS Modules and custom properties were widespread. Runtime libraries add JavaScript work and complicate React Server Components, so the ecosystem has moved toward build-time extraction or utility CSS.",
    how: "A runtime library takes a tagged template, evaluates it with the component's props, turns the result into a unique class, inserts the rule into a style element, and returns the class name. Styles are therefore generated during render, which is what allows prop-driven values. Zero-runtime compilers run the same authoring step at build time, emitting static CSS plus a stable class, so the browser downloads only a stylesheet.",
    prerequisites: ["css", "react"],
    roadmap: [
      "Tagged templates and the styled API",
      "Props, variants, and theme providers",
      "Composing styles and one-off rules with the css helper",
      "The runtime cost, specificity by insertion order, and SSR extraction",
      "Migrating to zero-runtime extraction or utility CSS",
    ],
    concepts: [
      "Tagged template styled components",
      "Prop-driven styles",
      "Theme providers",
      "Runtime cost and server components",
      "Zero-runtime extraction",
    ],
    examples: [
      {
        title: "How a runtime CSS-in-JS engine works, in 25 lines",
        language: "html",
        code: `<div id="app"></div>
<script>
  const sheet = document.createElement("style");
  document.head.append(sheet);
  const cache = new Map();
  let n = 0;

  // A minimal stand-in for a runtime CSS-in-JS library's css helper.
  function css(strings, ...values) {
    const body = strings.reduce((out, chunk, i) => out + chunk + (values[i] ?? ""), "");
    if (cache.has(body)) return cache.get(body);
    const cls = "c" + (n++).toString(36);
    sheet.textContent += "." + cls + "{" + body + "}";
    cache.set(body, cls);
    return cls;
  }

  const base = css\`padding: 10px 16px; border: 0; border-radius: 8px; font: 600 14px system-ui;\`;
  const primary = css\`background: #16a34a; color: #fff; cursor: pointer;\`;
  const danger = css\`background: #dc2626; color: #fff; cursor: pointer;\`;

  document.querySelector("#app").innerHTML = \`
    <button class="\${base} \${primary}">Save</button>
    <button class="\${base} \${danger}">Delete</button>\`;
</script>`,
        explanation: [
          "Each css tag call builds one rule from the template and inserts it into a single style element — the same move styled-components makes during render.",
          "Identical bodies are deduplicated, so rendering the same props twice reuses one class instead of growing the stylesheet.",
          "The helper returns a plain class string, so the component markup is only string concatenation.",
          "Feed a colour from props into the template instead of a literal and you have the dynamic-style model, along with its cost.",
        ],
      },
    ],
    advanced: [
      "On the server there is no document to insert into, so you collect rules with a StyleSheet manager and inline them in the response; skipping this causes a flash of unstyled content.",
      "Dynamic values create one class per distinct value, so a slider-driven width can insert thousands of rules in a session; route those values through CSS custom properties instead.",
      "Generated rules have flat class specificity, so overrides depend on insertion order — the most recently inserted rule wins, not the most recently imported one.",
      "Transient props (styled-components' $size) and shouldForwardProp keep styling inputs off the DOM, avoiding React warnings and leaking design details into markup.",
      "Zero-runtime compilers (vanilla-extract, Linaria, Panda CSS) evaluate the same authoring model at build time into static or atomic CSS, which is what makes them compatible with Server Components.",
    ],
    bestPractices: [
      "For new React Server Component apps, prefer CSS Modules, Tailwind, or a zero-runtime library.",
      "Drive dynamic values through CSS custom properties rather than regenerating styles.",
      "Let the design system own theme values, so runtime and static styling read the same custom properties.",
      "Enable the library's Babel or compiler plugin so class names are deterministic between server and client.",
    ],
    mistakes: [
      "Creating styled components inside render functions, which remounts them every render.",
      "Interpolating raw user input into a template, where it becomes CSS text; validate it or pass it as a custom property.",
      "Mounting runtime CSS-in-JS inside a Server Component tree, where it cannot insert styles.",
      "Escalating specificity with && or !important to beat third-party CSS instead of scoping the override.",
    ],
    performance: [
      "Runtime libraries ship the styling engine to the client (styled-components is roughly 12 kB gzipped) and do parse-and-insert work on every new style.",
      "Distinct prop values mean distinct rules, so the CSSOM can grow without bound in long sessions; dynamic values belong in custom properties.",
      "Zero-runtime extraction moves all of that to the build, so the CSS is cacheable, code-split, and free of render-time work.",
      "SSR extraction costs CPU per request; memoise by component and props, or precompute at build time.",
    ],
    useCases: [
      "Component libraries that want styling to be part of a typed component API.",
      "Apps with deep theming and prop-driven variants where utility class lists become unreadable.",
      "Existing styled-components or Emotion codebases where a rewrite is not justified.",
      "Design systems using vanilla-extract for typed, zero-runtime theme contracts.",
    ],
    interview: [
      {
        q: "Why are many teams moving off runtime CSS-in-JS?",
        a: "It ships a runtime, inserts styles during render (costly on updates), needs explicit SSR extraction, and does not run in React Server Components. Zero-runtime tools keep the authoring model but emit static CSS.",
      },
      {
        q: "How do you style from a dynamic value without creating endless classes?",
        a: 'Set a CSS custom property on the element, for example style={{ "--hue": hue }}, and reference it from a rule that is generated once.',
      },
      {
        q: "What is a transient prop?",
        a: "A prop prefixed with $ that the style function consumes but does not forward to the DOM node, which keeps invalid attributes and implementation details out of the markup.",
      },
    ],
    exercises: [
      "Recreate the 25-line css runtime, then add deduplication and prove identical styles reuse one class.",
      "Convert a prop-driven styled button to a custom-property version and confirm many colours share a single class.",
      "Add server-side extraction to a small SSR page and inline the collected styles in the head.",
      "Port one styled component to vanilla-extract and compare the built CSS and JS bundles.",
    ],
    docs: [
      {
        label: "styled-components",
        href: "https://styled-components.com/docs",
      },
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
    summary:
      "Tokens, components, documentation, and governance that keep a product visually and behaviourally consistent.",
    what: "A design system is a shared set of design tokens (colour, type, spacing), accessible components, usage guidelines, and the process that maintains them.",
    why: "Without one, every team reinvents buttons and dialogs with slightly different behaviour and accessibility bugs. A system makes good defaults the easy path.",
    how: "Tokens are defined once (often as JSON or CSS custom properties) and consumed by both design tools and code. Components wrap tokens and accessibility behaviour behind a stable API. Storybook or a docs site shows each component's states and rules.",
    prerequisites: ["css", "react"],
    roadmap: [
      "Inventory the UI and agree on the first ten components",
      "Define primitive and semantic tokens, then wire them to CSS custom properties",
      "Build accessible components on headless primitives with variant APIs",
      "Document states and rules in Storybook, with visual regression tests",
      "Version, deprecate, and govern contributions across teams",
    ],
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
    advanced: [
      "Three token tiers — primitive, semantic, component (--button-bg: var(--color-action)) — mean a rebrand edits the mapping layer and no component file.",
      'Theming by re-declaring semantic tokens under a selector ([data-theme="dark"]) rather than passing classes or props, so every component themes at once, including portalled dialogs if the attribute lands on :root.',
      "Contract tests catch drift: visual regression per story plus automated a11y checks fail a build when a token, state, or focus ring silently changes.",
      "The public API is more than props: removing a prop, renaming a token, or changing a default is a major version, so docs, codemods, and deprecation aliases are part of the release.",
      "Headless architecture keeps behaviour and accessibility in primitives (Radix, React Aria) and styling in a thin layer, so one primitive can back several visual variants without duplicating keyboard handling.",
    ],
    bestPractices: [
      "Components consume semantic tokens only.",
      "Bake accessibility into primitives once.",
      "Document do and don't examples next to live components.",
    ],
    mistakes: [
      "Building a design system before the product has repeated patterns.",
      "Hard-coded hex values in components.",
      "Shipping components with no deprecation path, so consumers pin old versions instead of upgrading.",
      "Documenting components somewhere nobody on the team opens; docs live with the code or they rot.",
      "Making one team the owner of every component, which turns the system into a delivery bottleneck.",
    ],
    performance: [
      "Ship tokens once as custom properties on :root; component CSS then stays tiny and themes cost a handful of overrides.",
      "Barrel imports pull an entire component package into the bundle — expose per-component entry points and mark the package sideEffects: false.",
      "Duplicating a full stylesheet per theme scales badly; selector-scoped token overrides keep one copy of the CSS.",
      "Visual regression is usually the slowest CI job, so snapshot only changed stories and run the full set nightly.",
    ],
    useCases: [
      "Multi-product companies where several apps must feel like one brand.",
      "A white-label product with per-tenant themes and branding.",
      "Consolidating duplicated buttons, modals, and fields after a merger or replatform.",
      "An open-source component library that accepts external contributions.",
    ],
    interview: [
      {
        q: "Primitive vs semantic tokens?",
        a: "Primitives are raw values (green-600). Semantic tokens map intent to primitives (color-action → green-600), so themes and rebrands change mappings, not components.",
      },
      {
        q: "When does a component belong in the design system?",
        a: "When at least two products need the same behaviour and accessibility contract, or when inconsistency causes real user harm. One-off layout stays in the app.",
      },
      {
        q: "How do you support several themes without duplicating the CSS?",
        a: 'Override semantic tokens under a selector — :root, [data-theme="dark"], or a tenant wrapper — so one stylesheet serves every theme.',
      },
    ],
    exercises: [
      "Audit one product screen and list every distinct button style, then reduce them to three token-driven variants.",
      "Add a dark theme by overriding semantic tokens only, with no component changes.",
      "Write a Storybook story per component state and add a visual regression test for two of them.",
      "Rename a token while keeping a deprecated alias for one minor version, and document the migration.",
    ],
    docs: [
      {
        label: "W3C Design Tokens format",
        href: "https://www.designtokens.org/",
      },
      { label: "Storybook", href: "https://storybook.js.org/docs" },
    ],
    related: ["tailwind-css", "shadcn-ui", "radix-ui", "storybook"],
    projects: ["design-system-build"],
  },
];
