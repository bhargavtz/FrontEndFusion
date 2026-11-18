import type { ProjectLevel } from "./projects";

export type ProjectBrief = {
  slug: string;
  title: string;
  level: ProjectLevel;
  summary: string;
  technologies: string[];
  /** Slugs from src/data/technologies the project practises. */
  learns: string[];
  requirements: string[];
  designNotes: string;
  structure: string;
  steps: string[];
  challenges: string[];
  improvements: string[];
  /**
   * A complete, runnable single-file solution. Present only where the whole
   * project fits in one HTML file and can run in the sandboxed playground.
   */
  starter?: string;
  /** Existing interactive demo route under /projects/<slug>, if any. */
  demo?: string;
};

const calculatorStarter = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Calculator</title>
<style>
  * { box-sizing: border-box; }
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #0f172a; font-family: system-ui, sans-serif; }
  .calc { width: min(20rem, 92vw); background: #1e293b; border-radius: 16px; padding: 1rem; box-shadow: 0 20px 40px rgb(0 0 0 / .4); }
  output { display: block; min-height: 3.5rem; padding: .5rem .75rem; text-align: right; font-size: 2rem; color: #f8fafc; overflow-x: auto; }
  .keys { display: grid; grid-template-columns: repeat(4, 1fr); gap: .5rem; }
  button { font: inherit; font-size: 1.25rem; padding: .9rem 0; border: 0; border-radius: 10px; background: #334155; color: #f8fafc; cursor: pointer; }
  button:hover { background: #475569; }
  button:focus-visible { outline: 3px solid #4ade80; outline-offset: 2px; }
  .op { background: #16a34a; } .op:hover { background: #22c55e; }
  .wide { grid-column: span 2; }
</style>
</head>
<body>
<main class="calc" aria-label="Calculator">
  <output id="display" aria-live="polite">0</output>
  <div class="keys" id="keys">
    <button data-key="clear" class="wide">C</button>
    <button data-key="back">⌫</button>
    <button data-key="/" class="op">÷</button>
    <button data-key="7">7</button><button data-key="8">8</button><button data-key="9">9</button><button data-key="*" class="op">×</button>
    <button data-key="4">4</button><button data-key="5">5</button><button data-key="6">6</button><button data-key="-" class="op">−</button>
    <button data-key="1">1</button><button data-key="2">2</button><button data-key="3">3</button><button data-key="+" class="op">+</button>
    <button data-key="0" class="wide">0</button><button data-key=".">.</button><button data-key="=" class="op">=</button>
  </div>
</main>
<script>
  const display = document.getElementById('display');
  let left = null, operator = null, current = '0', overwrite = true;

  function compute(a, op, b) {
    if (op === '+') return a + b;
    if (op === '-') return a - b;
    if (op === '*') return a * b;
    if (op === '/') return b === 0 ? NaN : a / b;
    return b;
  }
  function show(value) {
    display.textContent = String(value) === 'NaN' ? 'Error' : String(value);
  }
  function press(key) {
    if (/^[0-9]$/.test(key)) {
      current = overwrite ? key : current + key;
      overwrite = false;
    } else if (key === '.') {
      if (overwrite) { current = '0.'; overwrite = false; }
      else if (!current.includes('.')) current += '.';
    } else if (key === 'clear') {
      left = null; operator = null; current = '0'; overwrite = true;
    } else if (key === 'back') {
      current = current.length > 1 ? current.slice(0, -1) : '0';
    } else {
      const value = parseFloat(current);
      if (operator && !overwrite) left = compute(left, operator, value);
      else if (left === null || key === '=') left = value;
      operator = key === '=' ? null : key;
      current = String(+left.toFixed(10));
      overwrite = true;
    }
    show(current);
  }
  document.getElementById('keys').addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (btn) press(btn.dataset.key);
  });
  document.addEventListener('keydown', (e) => {
    if (/^[0-9.+\\-*/]$/.test(e.key)) press(e.key);
    else if (e.key === 'Enter' || e.key === '=') press('=');
    else if (e.key === 'Backspace') press('back');
    else if (e.key === 'Escape') press('clear');
  });
</script>
</body>
</html>`;

const todoStarter = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>To-do</title>
<style>
  body { font-family: system-ui, sans-serif; max-width: 32rem; margin: 2rem auto; padding: 0 1rem; color: #0f172a; }
  form { display: flex; gap: .5rem; }
  input[type=text] { flex: 1; padding: .6rem .75rem; border: 1px solid #94a3b8; border-radius: 8px; font: inherit; }
  button { font: inherit; padding: .6rem .9rem; border: 0; border-radius: 8px; background: #16a34a; color: #fff; cursor: pointer; }
  button.ghost { background: transparent; color: #b91c1c; padding: .2rem .5rem; }
  :focus-visible { outline: 3px solid #16a34a; outline-offset: 2px; }
  ul { list-style: none; padding: 0; }
  li { display: flex; align-items: center; gap: .6rem; padding: .6rem 0; border-bottom: 1px solid #e2e8f0; }
  li span { flex: 1; } li.done span { text-decoration: line-through; color: #64748b; }
  .filters { display: flex; gap: .5rem; margin: 1rem 0; }
  .filters button[aria-pressed=true] { background: #0f172a; }
  .filters button { background: #e2e8f0; color: #0f172a; }
</style>
</head>
<body>
<h1>To-do</h1>
<form id="form">
  <label for="title" class="sr" style="position:absolute;left:-9999px">New task</label>
  <input id="title" type="text" placeholder="What needs doing?" required />
  <button>Add</button>
</form>
<div class="filters" role="group" aria-label="Filter tasks">
  <button data-filter="all" aria-pressed="true">All</button>
  <button data-filter="active" aria-pressed="false">Active</button>
  <button data-filter="done" aria-pressed="false">Done</button>
</div>
<ul id="list"></ul>
<p id="count" aria-live="polite"></p>
<script>
  let tasks = [], filter = 'all', nextId = 1;
  const list = document.getElementById('list');

  function render() {
    const visible = tasks.filter((t) => filter === 'all' || (filter === 'done') === t.done);
    list.innerHTML = '';
    for (const t of visible) {
      const li = document.createElement('li');
      li.className = t.done ? 'done' : '';
      const box = document.createElement('input');
      box.type = 'checkbox'; box.checked = t.done; box.id = 't' + t.id;
      box.addEventListener('change', () => { t.done = box.checked; render(); });
      const label = document.createElement('span');
      label.textContent = t.title;
      const del = document.createElement('button');
      del.className = 'ghost'; del.textContent = 'Delete';
      del.setAttribute('aria-label', 'Delete ' + t.title);
      del.addEventListener('click', () => { tasks = tasks.filter((x) => x !== t); render(); });
      li.append(box, label, del);
      list.append(li);
    }
    document.getElementById('count').textContent = tasks.filter((t) => !t.done).length + ' left';
  }
  document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('title');
    tasks.push({ id: nextId++, title: input.value.trim(), done: false });
    input.value = ''; render();
  });
  document.querySelector('.filters').addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    filter = b.dataset.filter;
    document.querySelectorAll('.filters button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    render();
  });
  render();
</script>
</body>
</html>`;

export const projectBriefs: ProjectBrief[] = [
  {
    slug: "personal-portfolio",
    title: "Personal Portfolio",
    level: "Beginner",
    summary: "A one-page portfolio with about, projects, and contact sections that works from 320px up.",
    technologies: ["HTML", "CSS", "Flexbox", "Grid"],
    learns: ["html", "css", "responsive-design", "accessibility"],
    requirements: [
      "Header with in-page navigation and a skip link",
      "Hero with your name, role, and one call to action",
      "Projects grid (at least three items) with real links",
      "Contact section using a labelled form or mailto link",
      "Responsive from 320px to 1440px with no horizontal scroll",
      "Passes a keyboard-only walkthrough",
    ],
    designNotes:
      "Pick one typeface pair, one accent colour, and a spacing scale (4/8/16/24/48). Study the portfolios of developers you admire for hierarchy, but design your own.",
    structure: `portfolio/
├── index.html
├── styles.css
└── images/`,
    steps: [
      "Write the HTML with landmarks and a correct heading outline before any CSS.",
      "Add a CSS reset, custom properties for colours and spacing, and base typography.",
      "Lay out the header with Flexbox and the projects with an auto-fit Grid.",
      "Add responsive tweaks with min-width media queries.",
      "Add hover and focus states and a prefers-reduced-motion rule.",
      "Audit with Lighthouse and fix every accessibility issue.",
    ],
    challenges: ["Add a dark theme using custom properties.", "Add a smooth-scroll active-section indicator using IntersectionObserver."],
    improvements: ["Convert to Next.js with MDX project pages.", "Add Open Graph tags and a sitemap."],
    demo: "landing-page",
  },
  {
    slug: "landing-page-build",
    title: "Product Landing Page",
    level: "Beginner",
    summary: "Hero, features, pricing, FAQ, and footer — practise layout and visual hierarchy.",
    technologies: ["HTML", "CSS", "Tailwind CSS"],
    learns: ["css", "tailwind-css", "responsive-design"],
    requirements: [
      "Hero with headline, subheading, and a primary action",
      "Three-feature section and a three-tier pricing table",
      "FAQ using <details> and <summary>",
      "Sticky header collapsing to a menu on mobile",
      "Contrast of at least 4.5:1 for all text",
    ],
    designNotes: "One primary action per section. Use size and weight, not colour, for hierarchy.",
    structure: `landing/
├── index.html
└── styles.css`,
    steps: ["Write copy first.", "Mark up sections semantically.", "Build mobile layout, then enhance for desktop.", "Add the FAQ with native disclosure elements.", "Test at 200% zoom."],
    challenges: ["Rebuild it with Tailwind utilities.", "Add an annual/monthly pricing toggle."],
    improvements: ["Add scroll-reveal animation that respects reduced-motion."],
    demo: "landing-page",
  },
  {
    slug: "calculator",
    title: "Calculator",
    level: "Beginner",
    summary: "A keyboard-accessible calculator: state, event delegation, and edge cases.",
    technologies: ["HTML", "CSS", "JavaScript"],
    learns: ["javascript", "dom-and-events"],
    requirements: [
      "Digits, decimal, + − × ÷, equals, clear, and backspace",
      "Keyboard support (digits, operators, Enter, Backspace, Escape)",
      "Division by zero shows an error instead of crashing",
      "Result announced to screen readers (aria-live)",
    ],
    designNotes: "Large, well-spaced targets (at least 44px). Distinct style for operators.",
    structure: `calculator/
├── index.html
├── styles.css
└── calculator.js`,
    steps: [
      "Model the state: left operand, operator, current input, and an overwrite flag.",
      "Use one delegated click listener on the key grid.",
      "Write compute(a, op, b) as a pure function.",
      "Handle chained operations (2 + 3 × 4 evaluated left to right).",
      "Add keyboard support and aria-live.",
    ],
    challenges: ["Respect operator precedence.", "Add percentage and sign toggle.", "Show a history list."],
    improvements: ["Port to React with useReducer.", "Add unit tests for compute()."],
    starter: calculatorStarter,
  },
  {
    slug: "todo-app",
    title: "To-Do Application",
    level: "Beginner",
    summary: "Add, complete, filter, and delete tasks — your first real piece of state management.",
    technologies: ["HTML", "CSS", "JavaScript", "React (variant)"],
    learns: ["javascript", "dom-and-events", "react"],
    requirements: [
      "Add tasks with a labelled form; reject empty input",
      "Toggle done, delete, and filter (all, active, done)",
      "Remaining count announced politely",
      "Persist to localStorage (challenge)",
    ],
    designNotes: "Keep it quiet: one accent colour, clear completed state.",
    structure: `todo/
├── index.html
├── styles.css
└── app.js`,
    steps: ["Keep tasks in an array; render() rebuilds the list from state.", "Never mutate DOM and state separately — change state, then render.", "Use textContent for task titles.", "Add filter buttons with aria-pressed."],
    challenges: ["Persist to localStorage with a try/catch.", "Edit tasks inline.", "Rebuild in React and compare the code."],
    improvements: ["Drag-and-drop reordering with keyboard support.", "Sync to an API with TanStack Query."],
    starter: todoStarter,
  },
  {
    slug: "responsive-navigation",
    title: "Responsive Navigation",
    level: "Beginner",
    summary: "A navbar that becomes an accessible disclosure menu on small screens.",
    technologies: ["HTML", "CSS", "JavaScript"],
    learns: ["html", "css", "accessibility"],
    requirements: [
      "Inline links on desktop; button-toggled menu on mobile",
      "aria-expanded and aria-controls kept in sync",
      "Escape closes the menu and returns focus to the button",
      "Current page indicated with aria-current",
    ],
    designNotes: "Navigation is a list of links inside <nav>. Do not use role=menu — it is for application menus.",
    structure: `nav/
├── index.html
├── nav.css
└── nav.js`,
    steps: ["Build the desktop layout with Flexbox.", "Hide the list under 48rem and add the toggle button.", "Sync ARIA state in the click handler.", "Add Escape handling and focus return."],
    challenges: ["Add a dropdown submenu with keyboard support.", "Hide on scroll down, show on scroll up."],
    improvements: ["Build it as a reusable React component."],
    demo: "responsive-navbar",
  },
  {
    slug: "dashboard-ui",
    title: "Dashboard UI",
    level: "Intermediate",
    summary: "A responsive dashboard shell with KPI cards, a chart area, and a data table.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    learns: ["react", "typescript-react", "css", "component-architecture"],
    requirements: ["Sidebar that collapses on mobile", "Four KPI cards with loading skeletons", "Sortable table with accessible sort buttons", "Light and dark themes"],
    designNotes: "Dense but calm: neutral surfaces, one accent, tabular numerals for figures.",
    structure: `src/
├── app/
├── components/ui/
├── features/dashboard/
└── lib/`,
    steps: ["Build the layout shell with CSS Grid.", "Create ui primitives (Card, Button, Table).", "Feed components from typed mock data.", "Add skeleton and empty states.", "Add the theme toggle with CSS variables."],
    challenges: ["Make the table keyboard navigable.", "Add column visibility controls."],
    improvements: ["Replace mock data with TanStack Query."],
  },
  {
    slug: "weather-interface",
    title: "Weather Interface",
    level: "Intermediate",
    summary: "Search a city, fetch a forecast, and handle loading, error, and empty states.",
    technologies: ["JavaScript or React", "fetch", "Open-Meteo API"],
    learns: ["async-javascript", "tanstack-query"],
    requirements: ["City search with debounce", "Current conditions and 5-day forecast", "Distinct loading, error, and no-results states", "Cancel stale requests with AbortController"],
    designNotes: "Use the weather condition to drive an icon and a subtle background, never as the only way to convey information.",
    structure: `weather/
├── src/api/weather.ts
├── src/components/
└── src/App.tsx`,
    steps: ["Read the Open-Meteo geocoding and forecast docs.", "Write typed API functions that throw on non-OK responses.", "Debounce the search input.", "Render each async state explicitly.", "Abort the previous request when a new one starts."],
    challenges: ["Remember recent searches.", "Support °C/°F."],
    improvements: ["Use geolocation with permission handling.", "Cache with TanStack Query."],
  },
  {
    slug: "ecommerce-frontend",
    title: "E-commerce Frontend",
    level: "Intermediate",
    summary: "Product listing, filters, product detail, cart, and checkout UI.",
    technologies: ["Next.js", "TypeScript", "Zustand"],
    learns: ["nextjs", "state-management", "forms-validation"],
    requirements: ["Product grid with URL-driven filters and sorting", "Product detail pages with metadata", "Cart drawer with quantity controls", "Accessible checkout form with validation"],
    designNotes: "Prioritise product imagery and price clarity; keep the checkout distraction-free.",
    structure: `src/
├── app/(shop)/products/[slug]/
├── features/cart/
└── features/checkout/`,
    steps: ["Model products with typed data.", "Keep filters in the URL with searchParams.", "Build the cart store.", "Build a validated checkout form.", "Add loading and error UI."],
    challenges: ["Optimistic cart updates.", "Persist the cart across sessions."],
    improvements: ["Add search with highlighted matches."],
  },
  {
    slug: "auth-interface",
    title: "Authentication Interface",
    level: "Intermediate",
    summary: "Sign in, sign up, and password reset screens with accessible validation.",
    technologies: ["React", "React Hook Form", "Zod"],
    learns: ["forms-validation", "auth-ui", "accessibility"],
    requirements: ["Correct autocomplete attributes", "Inline errors linked with aria-describedby", "Password visibility toggle", "Pending and error states on submit", "Generic failure message that does not reveal whether the account exists"],
    designNotes: "Single-column, large targets, minimal chrome.",
    structure: `features/auth/
├── sign-in-form.tsx
├── sign-up-form.tsx
└── schemas.ts`,
    steps: ["Define Zod schemas.", "Wire them to React Hook Form.", "Render accessible error messages.", "Mock the API and test failure paths."],
    challenges: ["Add passkey sign-in UI.", "Add a strength meter that is announced to screen readers."],
    improvements: ["Connect a real auth provider."],
  },
  {
    slug: "admin-dashboard",
    title: "Admin Dashboard",
    level: "Intermediate",
    summary: "CRUD interface with tables, filters, forms in dialogs, and role-aware UI.",
    technologies: ["React", "TanStack Query", "shadcn/ui"],
    learns: ["tanstack-query", "shadcn-ui", "radix-ui"],
    requirements: ["Paginated, sortable data table", "Create and edit in an accessible dialog", "Delete with confirmation and undo", "Hide actions the user's role cannot perform"],
    designNotes: "Efficiency over decoration.",
    structure: `features/users/
├── users-table.tsx
├── user-dialog.tsx
└── users.api.ts`,
    steps: ["Build the table with server-style pagination.", "Add dialogs using Radix.", "Use mutations with invalidation.", "Add optimistic delete with rollback."],
    challenges: ["Bulk actions with keyboard selection."],
    improvements: ["URL-synced table state."],
  },
  {
    slug: "blog-interface",
    title: "Blog Interface",
    level: "Intermediate",
    summary: "A content site with MDX posts, tags, search, reading time, and great metadata.",
    technologies: ["Next.js", "MDX", "TypeScript"],
    learns: ["nextjs", "seo", "web-performance"],
    requirements: ["Static post pages from MDX with generateStaticParams", "Tag index and per-tag pages", "Table of contents from headings", "Open Graph metadata and sitemap"],
    designNotes: "Optimise for reading: 60–75 character measure, generous line height.",
    structure: `content/posts/*.mdx
src/app/blog/[slug]/page.tsx
src/lib/posts.ts`,
    steps: ["Parse frontmatter with gray-matter.", "Render MDX on the server.", "Generate static params.", "Add metadata per post.", "Add RSS."],
    challenges: ["Syntax highlighting at build time.", "Client-side search over a prebuilt index."],
    improvements: ["Add comments via a hosted service."],
  },
  {
    slug: "saas-dashboard",
    title: "SaaS Dashboard",
    level: "Advanced",
    summary: "A multi-tenant-style app shell: routing, auth-aware layouts, settings, billing UI, and charts.",
    technologies: ["Next.js", "TypeScript", "TanStack Query", "Tailwind"],
    learns: ["nextjs", "component-architecture", "state-management", "production-frontend"],
    requirements: ["Nested layouts with a persistent sidebar", "Settings with tabs and form validation", "Billing page with plan state", "Loading and error boundaries per route segment", "Lighthouse accessibility ≥ 95"],
    designNotes: "Design the empty, loading, and error states first.",
    structure: `src/app/(app)/
├── layout.tsx
├── dashboard/
├── settings/
└── billing/`,
    steps: ["Plan routes and layouts.", "Build the design-system primitives.", "Add data layer and error handling.", "Add tests for critical flows.", "Add monitoring hooks."],
    challenges: ["Command palette.", "Feature flags."],
    improvements: ["Real-time updates with WebSockets or SSE."],
  },
  {
    slug: "complex-data-viz",
    title: "Data Visualisation",
    level: "Advanced",
    summary: "Interactive charts with accessible alternatives: tooltips, brushing, and a data table fallback.",
    technologies: ["React", "SVG", "D3 scales"],
    learns: ["react", "accessibility", "web-performance"],
    requirements: ["Line and bar charts drawn with SVG", "Keyboard-accessible data points", "Table view of the same data", "Responsive with ResizeObserver", "Colour-blind-safe palette"],
    designNotes: "Label directly; avoid legends that force eye travel; never rely on colour alone.",
    structure: `components/chart/
├── line-chart.tsx
├── scales.ts
└── data-table.tsx`,
    steps: ["Compute scales from data.", "Render axes and marks in SVG.", "Add focusable marks with aria labels.", "Add the data table view.", "Memoise expensive calculations."],
    challenges: ["Brush to zoom.", "Canvas fallback for 50,000 points."],
    improvements: ["Animate transitions respecting reduced motion."],
  },
  {
    slug: "design-system-build",
    title: "Advanced Design System",
    level: "Advanced",
    summary: "Tokens, themed components, Storybook docs, and tests — packaged for reuse.",
    technologies: ["React", "TypeScript", "Storybook", "Radix"],
    learns: ["design-systems", "storybook", "radix-ui", "testing"],
    requirements: ["Primitive and semantic tokens with light/dark themes", "At least ten accessible components", "A story per state of each component", "Interaction and accessibility tests", "Versioned package build"],
    designNotes: "API consistency matters more than component count.",
    structure: `packages/ui/
├── src/tokens/
├── src/components/
├── .storybook/
└── package.json`,
    steps: ["Define tokens.", "Build primitives on Radix.", "Write stories with controls.", "Add axe checks in Storybook.", "Publish to a private registry or workspace."],
    challenges: ["Visual regression tests.", "Theme contract validation."],
    improvements: ["Codemods for breaking changes."],
  },
  {
    slug: "multi-page-nextjs-app",
    title: "Multi-Page Next.js Application",
    level: "Advanced",
    summary: "A complete App Router site with layouts, dynamic routes, metadata, and streaming UI.",
    technologies: ["Next.js", "TypeScript", "MDX"],
    learns: ["nextjs", "seo", "web-performance"],
    requirements: ["At least six routes including a dynamic one", "Shared and nested layouts", "loading.tsx and error.tsx", "Per-page metadata and a sitemap", "Image and font optimisation"],
    designNotes: "Pick a content domain you care about.",
    structure: `src/app/
├── (marketing)/
├── (docs)/[slug]/
├── sitemap.ts
└── layout.tsx`,
    steps: ["Plan the sitemap.", "Build layouts.", "Implement data and dynamic routes.", "Add metadata and Open Graph images.", "Measure with Lighthouse and fix."],
    challenges: ["Partial prerendering with Suspense boundaries."],
    improvements: ["Internationalised routing."],
  },
  {
    slug: "ai-chat-interface",
    title: "AI-Powered Chat Interface",
    level: "Advanced",
    summary: "A streaming chat UI with message history, markdown rendering, stop/retry, and error handling.",
    technologies: ["React", "TypeScript", "Server-Sent Events"],
    learns: ["async-javascript", "ai-assisted-development", "error-handling-ui"],
    requirements: ["Token-by-token streaming with an AbortController stop button", "Markdown with safe code-block rendering", "Auto-scroll that does not fight the user", "Retry, copy, and error states", "aria-live region for new messages"],
    designNotes: "Make state obvious: sending, streaming, done, failed.",
    structure: `features/chat/
├── use-chat.ts
├── message-list.tsx
├── composer.tsx
└── provider.ts`,
    steps: ["Define a provider interface so the model is swappable.", "Parse the stream and append deltas to state.", "Render markdown without raw HTML.", "Add stop and retry.", "Keep API keys on a server route, never in the browser."],
    challenges: ["Tool-call rendering.", "Conversation persistence."],
    improvements: ["Add attachment support."],
  },
  {
    slug: "ai-website-builder",
    title: "AI Website Builder Frontend",
    level: "Advanced",
    summary: "A prompt box, a sandboxed live preview, a code panel, and version history for generated pages.",
    technologies: ["React", "iframe sandbox", "CodeMirror"],
    learns: ["frontend-security", "ai-assisted-development", "design-to-code"],
    requirements: ["Prompt input that streams generated HTML", "Preview in an iframe with sandbox and no same-origin", "Editable code panel synced with the preview", "Undo/redo version history", "Export as a single HTML file"],
    designNotes: "Split view with draggable divider; mobile uses tabs.",
    structure: `features/builder/
├── prompt-panel.tsx
├── preview-frame.tsx
├── code-panel.tsx
└── history.ts`,
    steps: ["Build the sandboxed preview first.", "Add the editor and debounce updates.", "Define the generation provider interface.", "Store versions as immutable snapshots.", "Validate and size-limit generated output."],
    challenges: ["Section-level regeneration.", "Component palette."],
    improvements: ["Collaborative editing."],
  },
];

export const getProjectBrief = (slug: string) =>
  projectBriefs.find((brief) => brief.slug === slug);
