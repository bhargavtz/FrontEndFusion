import type { Technology } from "./types";

/**
 * Focused technology pages for core topics that the broader pages only
 * touched on. Each one points at the matching in-depth lessons.
 */
export const deepDives: Technology[] = [
  {
    slug: "flexbox",
    name: "Flexbox",
    domain: "web-fundamentals",
    level: "Beginner",
    summary: "One-dimensional layout: distribute, align and size items along a single axis.",
    what:
      "Flexbox is a CSS layout mode for arranging items in one direction, either a row or a column. A flex container controls how its direct children grow, shrink and align.",
    why:
      "Before Flexbox, centring a block vertically or making columns the same height needed floats and hacks. Flexbox makes these one or two declarations, and it is the right tool for toolbars, navigation bars, card footers and form rows.",
    how:
      "Setting display: flex makes the children flex items. The main axis follows flex-direction. justify-content distributes space along the main axis, align-items aligns across it, and each item's flex-grow, flex-shrink and flex-basis decide how free space is shared. Items start from their flex-basis, then grow or shrink to fit the container.",
    prerequisites: ["css"],
    roadmap: [
      "The main and cross axes, and flex-direction",
      "justify-content and align-items",
      "gap for spacing between items",
      "flex-grow, flex-shrink and flex-basis (the flex shorthand)",
      "flex-wrap and align-content for multiple lines",
      "Per-item overrides with align-self and order",
      "Patterns: centring, sticky footers, equal-height cards",
    ],
    concepts: [
      "Main axis vs cross axis",
      "justify-content, align-items, align-self",
      "flex-grow, flex-shrink, flex-basis",
      "min-width: auto and why items overflow",
      "gap instead of margins",
      "flex-wrap",
    ],
    examples: [
      {
        title: "A navigation bar with a centred logo and pushed-right actions",
        language: "html",
        code: `<style>
  .bar {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1rem;
    background: #0f172a;
    color: #f8fafc;
    font-family: system-ui, sans-serif;
  }
  .bar .logo { font-weight: 700; }
  .bar nav { display: flex; gap: 0.75rem; }
  .bar nav a { color: #86efac; text-decoration: none; }
  .bar .actions { margin-left: auto; }   /* push to the right */
  .bar button {
    padding: 0.4rem 0.8rem; border: 0; border-radius: 6px;
    background: #16a34a; color: #fff; cursor: pointer;
  }
</style>
<header class="bar">
  <span class="logo">Acme</span>
  <nav aria-label="Primary">
    <a href="#">Docs</a>
    <a href="#">Pricing</a>
  </nav>
  <div class="actions"><button>Sign in</button></div>
</header>`,
        explanation: [
          "display: flex on .bar lays the logo, nav and actions out in a row.",
          "align-items: center vertically centres every item, whatever its height.",
          "gap: 1rem spaces the items without margin arithmetic.",
          "margin-left: auto on .actions absorbs all remaining space, so the button sits at the far right.",
        ],
      },
      {
        title: "Equal-height cards with a button pinned to the bottom",
        language: "html",
        code: `<style>
  .cards { display: flex; flex-wrap: wrap; gap: 1rem; padding: 1rem; font-family: system-ui, sans-serif; }
  .card {
    flex: 1 1 14rem;          /* grow and shrink, starting from 14rem */
    display: flex;
    flex-direction: column;
    padding: 1rem;
    border: 1px solid #cbd5e1;
    border-radius: 10px;
  }
  .card p { flex: 1; }        /* body takes the free height */
  .card button {
    margin-top: 1rem;
    padding: 0.5rem;
    border: 0; border-radius: 6px;
    background: #16a34a; color: #fff;
  }
</style>
<div class="cards">
  <article class="card"><h3>Starter</h3><p>For personal projects.</p><button>Choose</button></article>
  <article class="card"><h3>Team</h3><p>For small teams who need shared workspaces, role-based access and priority support.</p><button>Choose</button></article>
  <article class="card"><h3>Enterprise</h3><p>Custom contracts.</p><button>Contact us</button></article>
</div>`,
        explanation: [
          "Items in a row stretch to the tallest card by default, so the cards are equal height.",
          "flex: 1 1 14rem lets each card grow to fill space but wrap onto a new line below 14rem.",
          "Inside each card, a column flex layout lets the paragraph take the spare height.",
          "The buttons line up at the bottom regardless of how long each description is.",
        ],
      },
    ],
    bestPractices: [
      "Use Flexbox for one axis at a time; use Grid when you need rows and columns together.",
      "Prefer gap over margins between siblings.",
      "Set min-width: 0 on flex children that contain long text or code, so they can shrink.",
      "Let flex-basis and wrapping do the responsive work before writing media queries.",
    ],
    mistakes: [
      "Using flex: 1 everywhere, which ignores content size and makes items unevenly wide.",
      "Forgetting that flex-basis overrides width.",
      "Expecting align-items to centre along the main axis; that is justify-content.",
      "Long words overflowing a flex item because min-width is auto.",
    ],
    performance: ["Flexbox layout is cheap, but changing flex properties on many items in a loop still forces layout."],
    useCases: ["Toolbars and navigation bars", "Form rows with a label and input", "Card footers and sticky page footers", "Centring a single element"],
    interview: [
      {
        q: "What is the difference between justify-content and align-items?",
        a: "justify-content distributes items along the main axis (the flex-direction). align-items aligns them along the cross axis. With flex-direction: column the meanings swap in terms of screen direction.",
      },
      {
        q: "What does flex: 1 mean?",
        a: "It is shorthand for flex: 1 1 0%: grow and shrink equally from a zero basis, so items share free space equally.",
      },
      {
        q: "Why does a flex item sometimes refuse to shrink below its content width?",
        a: "min-width defaults to auto for flex items, which means the minimum is the content's minimum size. Setting min-width: 0 (or overflow: hidden) lets it shrink.",
      },
    ],
    exercises: [
      "Centre a box both horizontally and vertically inside a 300px-tall container.",
      "Build a holy-grail layout (header, footer, sidebar, content) with a column flex container and a row flex middle.",
      "Make a tag list that wraps and keeps consistent gaps at every width.",
    ],
    docs: [
      { label: "MDN — Basic concepts of flexbox", href: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox" },
      { label: "CSS-Tricks — A Complete Guide to Flexbox", href: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/" },
    ],
    guides: ["css-flexbox"],
    related: ["css-grid", "css", "responsive-design"],
    featured: true,
  },
  {
    slug: "css-grid",
    name: "CSS Grid",
    domain: "web-fundamentals",
    level: "Intermediate",
    summary: "Two-dimensional layout with rows and columns, named areas, and responsive tracks without media queries.",
    what:
      "CSS Grid is a layout system that divides a container into rows and columns. Children can be placed into specific cells or spans, or flow in automatically.",
    why:
      "Page layouts, dashboards and galleries are two-dimensional. Grid lets you control both axes at once, which Flexbox can only approximate with nested containers.",
    how:
      "display: grid creates the grid. grid-template-columns and grid-template-rows define tracks, with fr units sharing free space. Items are placed automatically in order, or explicitly by line number or named area. auto-fit with minmax() creates as many columns as fit, which gives responsive layouts without media queries.",
    prerequisites: ["css", "flexbox"],
    roadmap: [
      "Tracks, lines and cells",
      "The fr unit and minmax()",
      "gap for row and column spacing",
      "Placing items with lines and spans",
      "Named grid areas",
      "auto-fit and auto-fill for responsive tracks",
      "Alignment: justify-items, align-items, place-items",
      "Subgrid and implicit tracks",
    ],
    concepts: [
      "Explicit vs implicit tracks",
      "fr units and minmax()",
      "repeat(auto-fit, minmax(...))",
      "grid-template-areas",
      "grid-column and grid-row spans",
      "Alignment of items vs tracks",
    ],
    examples: [
      {
        title: "A page layout with named areas",
        language: "html",
        code: `<style>
  body { margin: 0; font-family: system-ui, sans-serif; }
  .page {
    display: grid;
    min-height: 100vh;
    grid-template-columns: 14rem 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      "header header"
      "side   main"
      "footer footer";
    gap: 0;
  }
  header { grid-area: header; background: #0f172a; color: #fff; padding: 1rem; }
  aside  { grid-area: side;   background: #e2e8f0; padding: 1rem; }
  main   { grid-area: main;   padding: 1rem; }
  footer { grid-area: footer; background: #0f172a; color: #94a3b8; padding: 0.75rem 1rem; }
  @media (max-width: 40rem) {
    .page { grid-template-columns: 1fr; grid-template-areas: "header" "main" "side" "footer"; }
  }
</style>
<div class="page">
  <header>Site header</header>
  <aside>Sidebar</aside>
  <main><h1>Main content</h1><p>Resize the preview to see the layout change.</p></main>
  <footer>Footer</footer>
</div>`,
        explanation: [
          "grid-template-areas draws the layout as text, which is easy to read and change.",
          "Each element claims an area with grid-area; the names must match the template.",
          "The 1fr column takes whatever width the 14rem sidebar leaves.",
          "The media query reorders the areas into a single column on small screens.",
        ],
      },
      {
        title: "A responsive gallery with no media queries",
        language: "html",
        code: `<style>
  .gallery {
    display: grid;
    gap: 0.75rem;
    padding: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    font-family: system-ui, sans-serif;
  }
  .tile {
    aspect-ratio: 1;
    display: grid;
    place-items: center;
    border-radius: 10px;
    color: #052e16;
    font-weight: 700;
  }
  .tile:nth-child(3n)  { grid-column: span 2; aspect-ratio: auto; min-height: 10rem; }
</style>
<div class="gallery">
  <div class="tile" style="background:#bbf7d0">1</div>
  <div class="tile" style="background:#86efac">2</div>
  <div class="tile" style="background:#4ade80">3</div>
  <div class="tile" style="background:#22c55e">4</div>
  <div class="tile" style="background:#16a34a;color:#fff">5</div>
  <div class="tile" style="background:#15803d;color:#fff">6</div>
</div>`,
        explanation: [
          "repeat(auto-fit, minmax(10rem, 1fr)) creates as many 10rem-minimum columns as fit the width.",
          "Resize the preview and the number of columns changes with no breakpoint.",
          "Every third tile spans two columns, which is a grid placement, not a flex trick.",
          "place-items: center centres each tile's content on both axes.",
        ],
      },
    ],
    bestPractices: [
      "Name areas for page layouts; use numeric lines for data grids.",
      "Use auto-fit with minmax() for card grids before adding breakpoints.",
      "Prefer gap over margins for spacing between tracks.",
      "Pair Grid for the page with Flexbox for the components inside it.",
    ],
    mistakes: [
      "Using many nested grids where one grid with spans would do.",
      "Forgetting that grid-template-areas needs a rectangle of cells.",
      "Expecting auto-fill and auto-fit to behave differently when there are few items; auto-fit stretches them, auto-fill keeps empty tracks.",
      "Setting fixed heights on rows and then wondering why content overflows.",
    ],
    performance: ["Grid is efficient, but very large grids with thousands of cells should be virtualised in JavaScript."],
    useCases: ["Application shells and dashboards", "Image and product galleries", "Magazine-style layouts", "Forms with aligned columns"],
    interview: [
      {
        q: "When do you choose Grid over Flexbox?",
        a: "When layout is two-dimensional: you need to align rows and columns together, or place items across both axes. Flexbox suits one-dimensional flow where items size themselves.",
      },
      {
        q: "What does fr do?",
        a: "fr is a flexible track unit. After fixed and content-sized tracks are placed, the remaining space is divided among fr tracks in proportion to their values.",
      },
      {
        q: "auto-fit vs auto-fill?",
        a: "Both create as many tracks as fit. auto-fit collapses empty tracks so the existing items stretch to fill the row; auto-fill keeps the empty tracks.",
      },
    ],
    exercises: [
      "Rebuild a newspaper layout with a headline spanning all columns and two article columns beneath it.",
      "Make a photo gallery where the first image is twice as large, using grid-column and grid-row spans.",
      "Create a form layout with labels in one column and inputs in the other, aligned at every width.",
    ],
    docs: [
      { label: "MDN — CSS Grid layout", href: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout" },
      { label: "Grid by Example", href: "https://gridbyexample.com/" },
    ],
    guides: ["css-grid", "css-layout-control"],
    related: ["flexbox", "responsive-design", "css"],
    featured: true,
  },
  {
    slug: "css-animations",
    name: "CSS Transitions & Animations",
    domain: "web-fundamentals",
    level: "Intermediate",
    summary: "Smooth state changes with transitions, multi-step motion with keyframes, and motion that respects user preferences.",
    what:
      "Transitions animate a property between two values when its state changes, such as hover. Keyframe animations define a sequence of states over time that can loop or run once.",
    why:
      "Motion communicates cause and effect: a button responds, a panel arrives, a loader shows progress. Done well it makes interfaces feel responsive; done badly it causes nausea and distraction.",
    how:
      "The browser interpolates animatable values frame by frame. Compositor-friendly properties (transform and opacity) can run on the GPU without re-running layout, which is why they animate smoothly. transition-property, duration, timing function and delay control a transition. @keyframes defines intermediate states that animation: name applies over time.",
    prerequisites: ["css"],
    roadmap: [
      "Which properties are animatable",
      "transition: property, duration, timing-function, delay",
      "@keyframes and the animation shorthand",
      "Cheap properties: transform and opacity",
      "Easing functions and cubic-bezier()",
      "prefers-reduced-motion",
    ],
    concepts: [
      "transition shorthand",
      "@keyframes with from/to or percentages",
      "animation-fill-mode and iteration-count",
      "Timing functions: ease, linear, steps(), cubic-bezier()",
      "Compositor properties",
      "prefers-reduced-motion",
    ],
    examples: [
      {
        title: "A hover card with a transition and a looping loader",
        language: "html",
        code: `<style>
  body { font-family: system-ui, sans-serif; padding: 1rem; }
  .card {
    display: inline-block;
    padding: 1rem 1.25rem;
    border-radius: 12px;
    background: #fff;
    border: 1px solid #cbd5e1;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }
  .card:hover { transform: translateY(-4px); box-shadow: 0 10px 24px rgb(0 0 0 / 0.12); }

  .spinner {
    width: 2rem; height: 2rem; margin-top: 1.5rem;
    border: 4px solid #bbf7d0; border-top-color: #16a34a; border-radius: 50%;
    animation: spin 0.9s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  @media (prefers-reduced-motion: reduce) {
    .card { transition: none; }
    .spinner { animation-duration: 3s; }   /* slower, still visibly working */
  }
</style>
<div class="card">
  <strong>Hover me</strong>
  <p>I lift on hover.</p>
  <div class="spinner" role="status" aria-label="Loading"></div>
</div>`,
        explanation: [
          "The transition lists the property to animate (transform and box-shadow) and how long it takes.",
          "transform moves the element without triggering layout, so the lift stays smooth.",
          "@keyframes spin describes the start and end state; linear infinite makes it loop forever.",
          "The reduced-motion query removes the card transition and slows the spinner for people who ask for less motion.",
        ],
      },
    ],
    bestPractices: [
      "Animate transform and opacity; avoid animating width, height, top and left.",
      "Keep most UI transitions between 150ms and 300ms.",
      "Always provide a reduced-motion alternative for non-essential motion.",
      "Give a looping animation a clear purpose, and stop it when the content is no longer relevant.",
    ],
    mistakes: [
      "Animating layout properties, which causes jank on low-end devices.",
      "Using transition: all, which animates properties you did not intend and hurts performance.",
      "Forgetting that transitions do not run on initial render unless the state actually changes.",
      "Removing focus outlines during animation, which hides keyboard focus.",
    ],
    performance: [
      "Only transform and opacity are guaranteed to be cheap; box-shadow and filter are often costly when large.",
      "Use will-change sparingly and only for animations that actually run.",
    ],
    useCases: ["Button and link hover states", "Menus and panels opening", "Loading indicators", "Page transitions"],
    interview: [
      {
        q: "Why is transform better than top for moving an element?",
        a: "transform does not change layout, so the browser can animate it on the compositor without recalculating the positions of other elements. top triggers layout on every frame.",
      },
      {
        q: "What is the difference between a transition and an animation?",
        a: "A transition runs between two states when a property changes. An animation uses @keyframes and can run without any state change, loop, and have multiple steps.",
      },
    ],
    exercises: [
      "Make a button whose background transitions from green to dark green on hover and back on blur.",
      "Build a three-dot typing indicator using keyframes with staggered animation-delay values.",
      "Add a prefers-reduced-motion rule to an existing animation and test it in the DevTools rendering panel.",
    ],
    docs: [
      { label: "MDN — Using CSS transitions", href: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transitions/Using_CSS_transitions" },
      { label: "MDN — Using CSS animations", href: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations" },
    ],
    guides: ["css-transitions", "css-animations"],
    related: ["css", "web-performance", "accessibility"],
  },
  {
    slug: "css-architecture",
    name: "CSS Architecture",
    domain: "css-ecosystem",
    level: "Advanced",
    summary: "Keeping CSS maintainable at scale: naming conventions, cascade layers, specificity discipline and component scope.",
    what:
      "CSS architecture is the set of conventions a team uses to organise stylesheets: how classes are named, how files are split, how the cascade is ordered and how components are kept from styling each other.",
    why:
      "Global CSS grows into a web of overrides where every change is risky. A clear architecture makes styles predictable, easy to delete and safe to change.",
    how:
      "Three approaches dominate. Naming methodologies such as BEM make each class's role explicit. Cascade layers (@layer) order whole groups of styles, so a reset or a utility layer always wins or loses in a known way. Scoped approaches (CSS Modules, component-scoped styles, utility classes) remove the shared namespace entirely.",
    prerequisites: ["css"],
    roadmap: [
      "Specificity and why it escalates",
      "BEM naming: block, element, modifier",
      "Cascade layers with @layer",
      "Design tokens with custom properties",
      "Scoped styles: CSS Modules and utilities",
      "Folder structure and file ownership",
    ],
    concepts: [
      "BEM (block__element--modifier)",
      "@layer for ordering reset, base, components and utilities",
      "Specificity budget: keep selectors flat",
      "Design tokens as custom properties",
      "Component scope",
      "Dead CSS detection",
    ],
    examples: [
      {
        title: "Cascade layers with a BEM component",
        language: "html",
        code: `<style>
  @layer reset, base, components, utilities;

  @layer reset {
    * { box-sizing: border-box; }
    body { margin: 0; font-family: system-ui, sans-serif; }
  }

  @layer base {
    :root { --radius: 10px; --accent: #16a34a; }
  }

  @layer components {
    .button { padding: 0.6rem 1rem; border-radius: var(--radius); border: 0; cursor: pointer; }
    .button--primary { background: var(--accent); color: #fff; }
    .button__icon { margin-right: 0.4rem; }
  }

  /* Utilities win over components, regardless of selector specificity */
  @layer utilities {
    .mt-4 { margin-top: 1rem; }
    .button--primary { background: #0f172a; }   /* overrides the component */
  }
</style>
<button class="button button--primary mt-4"><span class="button__icon">★</span>Save</button>`,
        explanation: [
          "@layer lists the layers in priority order; later layers beat earlier ones, whatever their specificity.",
          "The reset and base layers set the foundation, components build on tokens.",
          "BEM names (.button, .button__icon, .button--primary) show the structure in the class name.",
          "The utility layer overrides the component colour without !important or a more specific selector.",
        ],
      },
    ],
    bestPractices: [
      "Pick one naming convention and apply it everywhere.",
      "Keep selectors shallow; avoid selectors that depend on the DOM structure of other components.",
      "Put design values in tokens, not in component rules.",
      "Delete styles when a component is deleted; scoped styles make this automatic.",
    ],
    mistakes: [
      "Mixing BEM with nested Sass selectors until the class names no longer describe the markup.",
      "Escalating specificity with !important or IDs.",
      "Styling elements by tag name inside components, which leaks into other components.",
      "Creating a utility class for every value instead of using tokens.",
    ],
    interview: [
      {
        q: "What problem does BEM solve?",
        a: "Global class names collide and selectors become coupled to structure. BEM encodes the block, element and modifier in the name, so each class has a single, flat, predictable specificity.",
      },
      {
        q: "What does @layer change?",
        a: "It groups rules into named layers whose order is set explicitly. Layer order beats specificity, so you can control precedence between reset, base, component and utility styles.",
      },
    ],
    exercises: [
      "Convert a small stylesheet with nested selectors into BEM classes without changing the visual result.",
      "Organise an existing project's CSS into reset, base, components and utilities layers.",
    ],
    docs: [
      { label: "MDN — @layer", href: "https://developer.mozilla.org/en-US/docs/Web/CSS/@layer" },
      { label: "BEM methodology", href: "https://getbem.com/introduction/" },
    ],
    guides: ["css-css-design-patterns", "css-cascade-and-specificity"],
    related: ["css", "design-systems", "css-modules"],
  },
  {
    slug: "js-closures-and-scope",
    name: "Closures & Scope",
    domain: "javascript",
    level: "Intermediate",
    summary: "How variables are found, how functions remember their surroundings, and the patterns that rely on it.",
    what:
      "Scope decides where a variable is visible. A closure is a function together with the variables from the scope where it was created, which it can still read and change after that scope has finished.",
    why:
      "Closures are how JavaScript does private state, event handlers that remember their data, memoisation, and partial application. Most bugs with loops, timers and callbacks come from misunderstanding them.",
    how:
      "Each block, function and module creates a scope. When code uses a name, the engine searches the current scope, then each enclosing scope, up to the global scope (lexical scoping). A function keeps a reference to the environment it was defined in, so that environment stays alive for as long as the function is reachable.",
    prerequisites: ["javascript"],
    roadmap: [
      "Global, function and block scope",
      "let and const versus var",
      "Lexical scope and the scope chain",
      "Closures: private state and factories",
      "Closures in loops and timers",
      "Memoisation and partial application",
    ],
    concepts: [
      "Lexical (static) scope",
      "Block scope with let and const",
      "The temporal dead zone",
      "Closures and captured variables",
      "IIFE and module-style privacy",
      "Closures in loops",
    ],
    examples: [
      {
        title: "Private state and the classic loop bug",
        language: "js",
        code: `// 1. A closure keeps private state
function createAccount(startingBalance) {
  let balance = startingBalance;   // not reachable from outside
  return {
    deposit(amount) { balance += amount; return balance; },
    withdraw(amount) {
      if (amount > balance) throw new Error('Insufficient funds');
      balance -= amount;
      return balance;
    },
    get balance() { return balance; },
  };
}
const account = createAccount(100);
account.deposit(50);
console.log('balance:', account.balance);   // 150

// 2. The loop bug: var shares one variable across iterations
var callsVar = [];
for (var i = 0; i < 3; i++) callsVar.push(() => i);
console.log('var:', callsVar.map((f) => f()));  // [3, 3, 3]

// 3. let creates a fresh binding per iteration
const callsLet = [];
for (let j = 0; j < 3; j++) callsLet.push(() => j);
console.log('let:', callsLet.map((f) => f()));  // [0, 1, 2]`,
        explanation: [
          "balance lives inside createAccount, so only the returned methods can change it.",
          "The getter gives read-only access; code outside cannot change balance except through deposit and withdraw.",
          "With var, every arrow function closes over the same i, which is 3 by the time they run.",
          "With let, each iteration gets its own j, so each closure remembers its own value.",
        ],
      },
    ],
    bestPractices: [
      "Default to const and let; avoid var in new code.",
      "Keep closures small and capture only what they need, to avoid holding large objects in memory.",
      "Use closures for private state instead of exposing mutable properties.",
    ],
    mistakes: [
      "Using var in loops with callbacks or timers.",
      "Capturing a large object in a long-lived listener, which prevents garbage collection.",
      "Assuming a closure copies its variables; it keeps a live reference.",
      "Shadowing a variable accidentally with a same-named inner declaration.",
    ],
    performance: ["Closures are cheap to create, but a closure created inside a hot loop allocates a function each time."],
    useCases: ["Event handlers that remember their data", "Private counters and caches", "Memoisation", "Module patterns before ES modules"],
    interview: [
      {
        q: "What is a closure? Give an example.",
        a: "A function that retains access to variables from its defining scope after that scope has returned. For example, a counter factory returns an increment function that keeps updating its private count.",
      },
      {
        q: "Why does the classic setTimeout-in-a-loop example print the same value?",
        a: "With var there is one binding for the whole loop, so every callback sees its final value. let creates a new binding per iteration.",
      },
      {
        q: "What is the temporal dead zone?",
        a: "The period from the start of a block to a let or const declaration, where the name exists but cannot be read yet. Reading it throws a ReferenceError.",
      },
    ],
    exercises: [
      "Write makeCounter(step) that returns increment, decrement and reset, with the count private.",
      "Write memoize(fn) that caches results by argument, using a closure for the cache.",
      "Fix a loop of timeouts so each prints its own index, first with var and then with let.",
    ],
    docs: [
      { label: "MDN — Closures", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures" },
      { label: "MDN — Scope", href: "https://developer.mozilla.org/en-US/docs/Glossary/Scope" },
    ],
    guides: ["js-scope", "js-functions", "js-declarations-and-assignments"],
    related: ["javascript", "async-javascript"],
    featured: true,
  },
  {
    slug: "js-modules",
    name: "JavaScript Modules",
    domain: "javascript",
    level: "Intermediate",
    summary: "Splitting code into files with import and export, and how browsers and bundlers load them.",
    what:
      "ES modules are JavaScript's built-in system for splitting code into files. A module exports values, and other modules import them by a static path. Each module has its own scope and runs once.",
    why:
      "Large apps need boundaries: code that can be tested alone, loaded on demand and reused. Modules replaced global scripts and manual load-order management.",
    how:
      "Browsers load <script type=\"module\"> and follow import statements, fetching each file once and caching it. Module code is strict by default and runs deferred. Imports are live bindings: an importer sees updates to an exported let. Bundlers such as Vite, webpack and Turbopack resolve these graphs at build time and tree-shake unused exports.",
    prerequisites: ["javascript"],
    roadmap: [
      "Named and default exports",
      "import syntax and aliases",
      "type=\"module\" in the browser",
      "Dynamic import() for code splitting",
      "Circular dependencies and why to avoid them",
      "Tree shaking and side-effect-free modules",
    ],
    concepts: [
      "export and import (named, default, namespace)",
      "Dynamic import()",
      "Live bindings",
      "Strict mode and module scope",
      "Tree shaking",
      "Circular imports",
    ],
    examples: [
      {
        title: "A module with named exports, loaded from a second file",
        language: "html",
        code: `<!-- The file "math.js" would normally be a separate file. Here it is inlined with a blob
     URL so the example runs in the sandbox. -->
<script type="module">
  // Pretend this is "./math.js"
  const mathSource = \`
    export const TAX = 0.2;
    export function withTax(price) { return price * (1 + TAX); }
    export default function format(n) { return '£' + n.toFixed(2); }
  \`;
  const url = URL.createObjectURL(new Blob([mathSource], { type: 'text/javascript' }));

  // A dynamic import: the module is loaded only when this line runs.
  const { withTax, TAX, default: format } = await import(url);

  console.log('tax rate:', TAX);
  console.log('total:', format(withTax(50)));
</script>`,
        explanation: [
          "Named exports (TAX, withTax) are imported in braces by name.",
          "The default export is imported under any name; here it is renamed to format.",
          "import() returns a promise for the module namespace, so it can be awaited or split into a separate chunk by a bundler.",
          "Real projects use import { withTax } from './math.js' with a file path instead of a blob URL.",
        ],
      },
    ],
    bestPractices: [
      "Export small, named things; keep default exports for a single main thing per file.",
      "Use import() for routes or features that users may never open.",
      "Keep modules free of side effects on import so bundlers can drop unused code.",
      "Use type=\"module\" for scripts that use import or export; add defer for classic scripts.",
    ],
    mistakes: [
      "Expecting modules to run synchronously in order; they are deferred and may load in parallel.",
      "Importing a whole library namespace when one function is needed, which defeats tree shaking.",
      "Circular imports that read a value before the module that defines it has run.",
      "Forgetting the file extension in browser ESM, which bundlers do not require but the browser does.",
    ],
    performance: ["Each module is a network request in the browser without bundling; bundlers combine them. HTTP/2 reduces the cost."],
    useCases: ["Organising component libraries", "Lazy-loading routes", "Sharing utilities between apps", "Writing testable units"],
    interview: [
      {
        q: "What is the difference between CommonJS require and ES module import?",
        a: "require is synchronous and runs at call time, with values copied when exported. import is static and analysable, with live bindings, and it enables tree shaking.",
      },
      {
        q: "What does dynamic import() give you?",
        a: "It loads a module on demand and returns a promise. Bundlers use it as a split point, so the code only downloads when needed.",
      },
    ],
    exercises: [
      "Split a calculator into a module for the maths and a module for the DOM, then import both in a page.",
      "Use dynamic import() to load a heavy feature only when a button is clicked.",
    ],
    docs: [
      { label: "MDN — JavaScript modules", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules" },
      { label: "Vite — Features", href: "https://vite.dev/guide/features" },
    ],
    guides: ["js-modules", "js-modularization-techniques"],
    related: ["build-tools", "javascript", "web-performance"],
  },
  {
    slug: "js-error-handling",
    name: "Error Handling",
    domain: "javascript",
    level: "Intermediate",
    summary: "Throwing and catching errors, typed error classes, async failures, and reporting problems without hiding them.",
    what:
      "Error handling is how code signals that something went wrong and how it recovers or reports it. JavaScript uses throw and try/catch, with Error objects carrying a message, name and stack.",
    why:
      "Users meet failures constantly: networks drop, data is malformed, permissions are denied. Handling them deliberately turns crashes into messages and retries, and makes bugs visible instead of silent.",
    how:
      "throw stops the current function and unwinds the call stack until a matching catch is found. Asynchronous errors do not reach synchronous try/catch; they reject a promise, which must be caught with await inside try, or .catch(). Unhandled rejections and uncaught errors surface through window events, which is where monitoring tools hook in.",
    prerequisites: ["javascript", "async-javascript"],
    roadmap: [
      "throw, try, catch and finally",
      "The Error object: name, message, stack, cause",
      "Custom error classes",
      "Async errors and promises",
      "Global handlers for uncaught errors",
      "Error boundaries in UI frameworks",
    ],
    concepts: [
      "throw and try/catch/finally",
      "Error subclasses and error.cause",
      "Rejected promises",
      "window error and unhandledrejection events",
      "Validation vs exceptional failures",
    ],
    examples: [
      {
        title: "A typed error and a retry that only retries network failures",
        language: "html",
        code: `<script>
  class ApiError extends Error {
    constructor(message, status) {
      super(message, { cause: undefined });
      this.name = 'ApiError';
      this.status = status;
    }
  }

  // Simulated API: fails with 503 the first two times, then succeeds.
  let attempts = 0;
  async function fakeFetch() {
    attempts++;
    if (attempts <= 2) throw new ApiError('Service unavailable', 503);
    if (attempts === 3) return { ok: true, data: 'hello' };
    throw new ApiError('Not found', 404);
  }

  async function withRetry(fn, retries = 3) {
    for (let i = 1; i <= retries; i++) {
      try {
        return await fn();
      } catch (error) {
        const retryable = error instanceof ApiError && error.status >= 500;
        if (!retryable || i === retries) throw error;   // give up on client errors
        console.warn('attempt ' + i + ' failed, retrying:', error.message);
      }
    }
  }

  withRetry(fakeFetch)
    .then((result) => console.log('success:', result))
    .catch((error) => console.error(error.name + ' (' + error.status + '): ' + error.message));
</script>`,
        explanation: [
          "ApiError extends Error so callers can tell API failures apart from programming errors with instanceof.",
          "withRetry catches each failure, but only retries server errors (5xx); a 4xx is rethrown immediately.",
          "await inside try is what lets an asynchronous rejection be caught.",
          "The final .catch handles whatever is left after retries, so no error disappears silently.",
        ],
      },
    ],
    bestPractices: [
      "Throw Error objects, not strings, so stacks are available.",
      "Catch errors where you can act on them; let the rest propagate to a boundary that reports them.",
      "Never swallow an error with an empty catch block.",
      "Log with context (what was attempted, with which input) and report to monitoring in production.",
    ],
    mistakes: [
      "Empty catch blocks that hide bugs.",
      "Using try/catch around an async call without await, so the rejection is never caught.",
      "Retrying every error, including validation failures that will never succeed.",
      "Using exceptions for normal control flow, such as expected 'not found' results.",
    ],
    performance: ["Exceptions are relatively expensive to create because of the stack trace; do not throw in tight loops for expected cases."],
    useCases: ["Form and API failures shown to users", "Retrying flaky requests", "Reporting crashes to monitoring", "Validating input at boundaries"],
    interview: [
      {
        q: "Why does try/catch not catch an error thrown inside a setTimeout callback?",
        a: "The callback runs later, after the try block has finished, on a fresh call stack. The error has no enclosing try at that time, so it must be handled inside the callback or by a global error listener.",
      },
      {
        q: "How do you catch errors from a promise?",
        a: "Use .catch() on the chain, or await the promise inside a try/catch in an async function. Forgetting both leaves an unhandled rejection.",
      },
      {
        q: "What is error.cause for?",
        a: "It attaches the original error to a new, higher-level error, so you can wrap a low-level failure with context while keeping the original available.",
      },
    ],
    exercises: [
      "Write a parseJSON(text) that returns a default value on failure and reports the error once.",
      "Add an unhandledrejection listener that shows a friendly message on the page.",
      "Create a ValidationError class and show its field name in a form.",
    ],
    docs: [
      { label: "MDN — Control flow and error handling", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling" },
      { label: "MDN — Error.cause", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause" },
    ],
    guides: ["js-error-handling", "js-global-error-handling-in-browsers"],
    related: ["error-handling-ui", "async-javascript", "production-frontend"],
  },
  {
    slug: "ts-generics-and-utility-types",
    name: "Generics & Utility Types",
    domain: "typescript",
    level: "Advanced",
    summary: "Writing reusable typed functions and types with generics, constraints, and the built-in utility types.",
    what:
      "Generics are type parameters: placeholders that a caller fills in, so one function or type works for many types while keeping the exact type information. Utility types such as Partial, Pick and Omit are built-in generic transformations of other types.",
    why:
      "Without generics, reusable code falls back to any and loses type safety. Generics keep relationships between inputs and outputs, such as 'this array of users returns a user', which any would discard.",
    how:
      "A type parameter like <T> is inferred from arguments at each call. Constraints (T extends ...) limit what T may be. Utility types are mapped and conditional types under the hood: Partial<T> maps each key to optional, Pick<T, K> keeps the keys in K, and Record<K, V> builds an object type from a key union.",
    prerequisites: ["typescript"],
    roadmap: [
      "Generic functions and inference",
      "Constraints with extends",
      "Generic interfaces and classes",
      "keyof and indexed access types",
      "Built-in utility types",
      "Mapped and conditional types",
    ],
    concepts: [
      "Type parameters and inference",
      "extends constraints and default type parameters",
      "keyof and T[K]",
      "Partial, Required, Readonly, Pick, Omit, Record",
      "ReturnType, Parameters, Awaited",
      "Conditional types with infer",
    ],
    examples: [
      {
        title: "A typed pick and a generic async result",
        language: "ts",
        code: `type User = { id: number; name: string; email: string; passwordHash: string };

// Generic over the object type and the chosen keys
function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) result[key] = obj[key];
  return result;
}

const user: User = { id: 1, name: 'Ada', email: 'ada@example.com', passwordHash: 'x' };
const publicUser = pick(user, ['id', 'name']);   // type: { id: number; name: string }
// pick(user, ['phone']);                         // error: 'phone' is not a key of User

// Result type for a call that may fail
type Result<T> = { ok: true; value: T } | { ok: false; error: string };

async function load<T>(fetcher: () => Promise<T>): Promise<Result<T>> {
  try {
    return { ok: true, value: await fetcher() };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'unknown' };
  }
}

// Utility types derived from a function
async function getUser(id: number): Promise<User> { return user; }
type Loaded = Awaited<ReturnType<typeof getUser>>;   // User

// Make every field optional for an update payload, but keep names checked
type UserPatch = Partial<Pick<User, 'name' | 'email'>>;
const patch: UserPatch = { name: 'Ada Lovelace' };`,
        explanation: [
          "pick is generic over T and K, and K extends keyof T, so only real keys can be requested.",
          "The return type Pick<T, K> keeps the exact property types, so publicUser.name is a string.",
          "Result<T> is a discriminated union: checking ok narrows to either value or error.",
          "Awaited<ReturnType<typeof getUser>> derives the resolved type from the function, so the type stays in sync with the code.",
          "Partial<Pick<...>> gives an update type that only allows the fields you chose, all optional.",
        ],
      },
    ],
    bestPractices: [
      "Let the compiler infer type parameters; add explicit ones only at public API boundaries.",
      "Constrain generics as tightly as the function needs.",
      "Derive types from values (typeof, ReturnType) to avoid duplication.",
      "Prefer a named type alias for complicated generic results so error messages stay readable.",
    ],
    mistakes: [
      "Using generics that appear only once in the signature; they add noise without relating anything.",
      "Using any inside a generic function to silence an error instead of constraining T.",
      "Writing deeply nested conditional types that nobody can read.",
      "Assuming Partial is deep; it only makes the top-level properties optional.",
    ],
    performance: ["Type-checking cost rises with very deep conditional and recursive types; keep them shallow in hot paths."],
    useCases: ["Typed API clients", "Reusable form and table components", "Typed state selectors", "Library APIs"],
    interview: [
      {
        q: "What is the difference between T extends keyof X and an unconstrained T?",
        a: "The constraint limits T to valid keys of X, so indexing X[T] is safe. Without it, T could be any type and the index access would be a compile error.",
      },
      {
        q: "What does Omit do internally?",
        a: "It is Pick<T, Exclude<keyof T, K>>: it takes the keys of T that are not in K and picks them.",
      },
      {
        q: "What does infer do?",
        a: "Inside a conditional type, infer declares a type variable to capture a part of the checked type, such as the element type of an array or the return type of a function.",
      },
    ],
    exercises: [
      "Write a generic groupBy<T, K extends string> that returns Record<K, T[]>.",
      "Build a typed fetchJson<T>(url) that returns a Result<T> and narrow it in a caller.",
      "Use ReturnType and Parameters to wrap a function without retyping its signature.",
    ],
    docs: [
      { label: "TypeScript Handbook — Generics", href: "https://www.typescriptlang.org/docs/handbook/2/generics.html" },
      { label: "TypeScript Handbook — Utility Types", href: "https://www.typescriptlang.org/docs/handbook/utility-types.html" },
    ],
    related: ["typescript", "typescript-react"],
  },
  {
    slug: "html-modern-elements",
    name: "Modern HTML Elements",
    domain: "web-fundamentals",
    level: "Intermediate",
    summary: "Native disclosure, dialogs, templates, meters and input hints: interactive HTML without a library.",
    what:
      "HTML has built-in elements for many interactions that were once rebuilt with JavaScript: expandable sections (details), modal dialogs (dialog), reusable markup (template), value gauges (meter) and mobile keyboard hints (inputmode).",
    why:
      "Native elements come with keyboard handling, focus management and screen reader roles for free. Using them first means less code to maintain and fewer accessibility bugs.",
    how:
      "details and summary toggle a section without any script, and the browser exposes the open state to assistive tech. dialog.showModal() opens a modal that traps focus, closes on Escape and sits in the top layer. template holds markup that is parsed but not rendered until you clone it. meter represents a scalar value within a known range, and inputmode asks mobile browsers for a suitable keyboard.",
    prerequisites: ["html"],
    roadmap: [
      "details and summary for disclosure",
      "dialog for modal and non-modal windows",
      "template for reusable markup",
      "meter and progress for values and progress",
      "inputmode and autocomplete for form usability",
    ],
    concepts: [
      "Native disclosure with details/summary",
      "dialog.showModal() and dialog.close()",
      "template and cloneNode()",
      "meter vs progress",
      "inputmode vs type",
    ],
    examples: [
      {
        title: "A disclosure list and a native modal dialog",
        language: "html",
        code: `<style>
  body { font-family: system-ui, sans-serif; padding: 1rem; }
  details { border: 1px solid #cbd5e1; border-radius: 8px; padding: 0.6rem 0.9rem; margin-bottom: 0.5rem; }
  summary { cursor: pointer; font-weight: 600; }
  dialog { border: 0; border-radius: 12px; padding: 1.25rem; max-width: 22rem; }
  dialog::backdrop { background: rgb(15 23 42 / 0.5); }
  button { padding: 0.5rem 0.9rem; border-radius: 6px; border: 0; background: #16a34a; color: #fff; cursor: pointer; }
</style>

<details open>
  <summary>What is the free plan?</summary>
  <p>It includes up to three projects and community support.</p>
</details>
<details>
  <summary>Can I cancel at any time?</summary>
  <p>Yes. Cancellation takes effect at the end of the billing period.</p>
</details>

<button id="open">Delete project…</button>
<dialog id="confirm" aria-labelledby="title">
  <h2 id="title">Delete this project?</h2>
  <p>This cannot be undone.</p>
  <form method="dialog">
    <button value="cancel">Cancel</button>
    <button value="delete" style="background:#b91c1c">Delete</button>
  </form>
</dialog>
<p id="result" aria-live="polite"></p>

<script>
  const dialog = document.getElementById('confirm');
  document.getElementById('open').addEventListener('click', () => dialog.showModal());
  dialog.addEventListener('close', () => {
    document.getElementById('result').textContent =
      dialog.returnValue === 'delete' ? 'Project deleted.' : 'Nothing was deleted.';
  });
</script>`,
        explanation: [
          "details needs no JavaScript: clicking summary toggles the section, and open sets the default state.",
          "showModal() makes the dialog modal: the rest of the page is inert, Escape closes it, and focus returns to the button.",
          "A form with method=\"dialog\" closes the dialog when a button is pressed and stores that button's value in returnValue.",
          "The close event reads returnValue, so the page reacts to the user's choice without extra state.",
        ],
      },
      {
        title: "A template cloned into a list, with meter and inputmode",
        language: "html",
        code: `<style>
  body { font-family: system-ui, sans-serif; padding: 1rem; }
  li { margin: 0.4rem 0; }
  meter { width: 12rem; vertical-align: middle; }
</style>

<template id="row">
  <li>
    <span class="name"></span>
    <meter min="0" max="100"></meter>
  </li>
</template>
<ul id="skills"></ul>

<label for="score">Add a skill score (0–100)</label>
<input id="score" type="text" inputmode="numeric" pattern="[0-9]*" autocomplete="off" />
<button id="add">Add</button>

<script>
  const template = document.getElementById('row');
  const list = document.getElementById('skills');
  const skills = [['HTML', 90], ['CSS', 75]];

  function addRow(name, value) {
    const row = template.content.cloneNode(true);   // a fresh copy of the markup
    row.querySelector('.name').textContent = name + ' (' + value + ')';
    row.querySelector('meter').value = value;
    list.append(row);
  }
  skills.forEach(([name, value]) => addRow(name, value));

  document.getElementById('add').addEventListener('click', () => {
    const value = Number(document.getElementById('score').value);
    if (Number.isFinite(value) && value >= 0 && value <= 100) addRow('Custom', value);
  });
</script>`,
        explanation: [
          "template is parsed once but not rendered; template.content.cloneNode(true) makes an independent copy for each row.",
          "meter shows a value within min and max; unlike progress it is for a measurement, not a task's completion.",
          "inputmode=\"numeric\" asks phones for a number keypad while keeping the field a text input, so pattern can accept leading zeros.",
          "Values are checked before use, so an invalid entry is simply ignored.",
        ],
      },
    ],
    bestPractices: [
      "Use details/summary before writing a custom accordion; it is accessible by default.",
      "Use showModal() rather than a div with a backdrop; you get focus trapping and Escape for free.",
      "Give dialog an accessible name with aria-labelledby or aria-label.",
      "Pair inputmode with type or pattern; inputmode changes the keyboard, not validation.",
    ],
    mistakes: [
      "Using dialog.show() for a modal; it opens without blocking the page or trapping focus.",
      "Using meter for task progress, where progress is the right element.",
      "Expecting template contents to exist in the DOM until they are cloned.",
      "Using inputmode=\"numeric\" on a field that needs decimals or negative numbers without checking the keyboard on real devices.",
    ],
    performance: ["Cloning a template is cheaper than building the same markup with createElement calls for each item."],
    useCases: ["FAQ and settings sections", "Confirmation prompts and login dialogs", "Repeated rows such as cart items", "Scores, quotas and storage usage"],
    interview: [
      {
        q: "How is dialog.showModal() different from dialog.show()?",
        a: "showModal() opens the dialog in the top layer, makes the rest of the page inert, traps focus and closes on Escape. show() opens it as a non-modal element that does not block interaction.",
      },
      {
        q: "When would you use meter instead of progress?",
        a: "meter is for a measurement within a known range, such as disk usage or a score. progress is for the completion of a task that is in flight.",
      },
    ],
    exercises: [
      "Build a FAQ with five details elements, and make only one open at a time using the name attribute.",
      "Create a dialog-based edit form that returns the entered values with method=\"dialog\".",
      "Use a template to render a list of product cards from an array of objects.",
    ],
    docs: [
      { label: "MDN — details", href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details" },
      { label: "MDN — dialog", href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog" },
      { label: "MDN — template", href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/template" },
      { label: "MDN — inputmode", href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inputmode" },
    ],
    guides: ["html-forms", "html-input-controls"],
    related: ["html", "accessibility", "forms-validation"],
  },
];
