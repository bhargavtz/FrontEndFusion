import type { Technology } from "./types";

export const fundamentals: Technology[] = [
  {
    slug: "how-the-web-works",
    name: "How the Web Works",
    domain: "web-fundamentals",
    level: "Beginner",
    summary:
      "What happens between typing a URL and seeing pixels: DNS, HTTP, servers, and the browser rendering pipeline.",
    what:
      "The web is a set of documents and applications delivered over HTTP. A browser asks a server for a resource by URL, the server replies with bytes (HTML, CSS, JavaScript, images), and the browser turns those bytes into an interactive page.",
    why:
      "Every frontend decision — caching, bundle size, where code runs, why a layout shifts — traces back to this request/response cycle and the rendering pipeline. Knowing it turns performance and debugging from guesswork into reasoning.",
    how:
      "The browser resolves the domain to an IP address with DNS, opens a TCP (or QUIC) connection secured with TLS, and sends an HTTP request. The server responds with a status code, headers, and a body. The browser parses HTML into the DOM, CSS into the CSSOM, combines them into a render tree, computes layout, paints, and composites layers onto the screen. JavaScript can pause parsing and can change the DOM later, which may trigger layout and paint again.",
    roadmap: [
      "Clients, servers, URLs, and HTTP methods",
      "DNS and HTTPS at a high level",
      "Status codes, headers, and caching",
      "Parsing HTML into the DOM and CSS into the CSSOM",
      "Layout, paint, and compositing",
      "Render-blocking resources and the critical rendering path",
    ],
    concepts: [
      "URL anatomy: scheme, host, path, query, fragment",
      "HTTP request/response, methods, and status codes",
      "DNS resolution and TLS",
      "Cache-Control, ETag, and CDNs",
      "DOM, CSSOM, and render tree",
      "Layout (reflow), paint, and composite",
    ],
    examples: [
      {
        title: "A raw HTTP exchange",
        language: "text",
        code: `GET /index.html HTTP/1.1
Host: example.com
Accept: text/html

HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Cache-Control: max-age=3600

<!doctype html>
<html lang="en">...</html>`,
        explanation: [
          "The first line is the request line: method, path, protocol version.",
          "Headers such as Host and Accept describe the request.",
          "The response starts with a status line; 200 means success.",
          "Cache-Control lets the browser reuse this response for an hour without asking again.",
        ],
      },
    ],
    bestPractices: [
      "Serve everything over HTTPS.",
      "Give static assets long cache lifetimes and fingerprinted file names.",
      "Load CSS early and defer non-critical JavaScript so the first render is not blocked.",
    ],
    mistakes: [
      "Assuming the network is fast — test on throttled 3G/4G profiles in DevTools.",
      "Blocking the parser with synchronous scripts in the <head>.",
      "Confusing the DOM (live object tree) with the HTML source text.",
    ],
    performance: [
      "Fewer round trips matter more than fewer bytes on high-latency connections.",
      "Changing layout properties (width, top) is costlier than changing transform or opacity, which can skip layout and paint.",
    ],
    interview: [
      {
        q: "What happens when you type a URL into the address bar and press Enter?",
        a: "DNS lookup, TCP/TLS connection, HTTP request, server response, HTML parsing into the DOM, CSS into the CSSOM, render tree, layout, paint, and composite. Scripts may block parsing and later mutate the DOM.",
      },
      {
        q: "What is a reflow?",
        a: "Recomputing the geometry of elements after a change that affects layout, such as width, font size, or inserting content. It is expensive because it can cascade through the tree.",
      },
    ],
    exercises: [
      "Open DevTools → Network, reload any site, and identify the HTML document, its status code, and its Cache-Control header.",
      "Record a Performance profile and find the first Layout and Paint events.",
    ],
    docs: [
      { label: "MDN — How the web works", href: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works" },
      { label: "web.dev — Critical rendering path", href: "https://web.dev/articles/critical-rendering-path" },
    ],
    related: ["html", "css", "web-performance"],
  },
  {
    slug: "html",
    name: "HTML",
    domain: "web-fundamentals",
    level: "Beginner",
    featured: true,
    summary:
      "The structure and meaning of every web page: elements, attributes, semantics, forms, and media.",
    what:
      "HTML (HyperText Markup Language) describes the structure and meaning of content using elements such as headings, paragraphs, links, lists, forms, and landmarks.",
    why:
      "Browsers, search engines, and assistive technologies all read HTML. Correct, semantic markup gives you accessibility, SEO, and default behaviour (keyboard support, form submission) for free.",
    how:
      "The browser parses HTML tags into DOM nodes. Each element has built-in semantics (an implicit ARIA role), default styles from the user-agent stylesheet, and sometimes built-in behaviour, such as a <button> being focusable and activating on Enter and Space.",
    prerequisites: ["how-the-web-works"],
    roadmap: [
      "Document structure: doctype, html, head, body",
      "Text: headings, paragraphs, lists, links",
      "Semantic landmarks: header, nav, main, article, footer",
      "Images and media with alt text",
      "Tables with captions and scope",
      "Forms, labels, and validation attributes",
      "Metadata for SEO and sharing",
    ],
    concepts: [
      "Elements, attributes, and nesting",
      "Block vs inline content",
      "Semantic landmarks and heading outline",
      "Forms: label, input types, fieldset, legend",
      "Media: img, picture, video, audio",
      "Metadata: title, meta description, Open Graph",
    ],
    examples: [
      {
        title: "A semantic page skeleton",
        language: "html",
        code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>My first page</title>
</head>
<body>
  <header>
    <nav aria-label="Primary">
      <a href="#about">About</a> · <a href="#contact">Contact</a>
    </nav>
  </header>
  <main>
    <h1>Hello, web</h1>
    <section id="about">
      <h2>About</h2>
      <p>This page uses <strong>semantic</strong> elements.</p>
    </section>
    <section id="contact">
      <h2>Contact</h2>
      <form>
        <label for="email">Email</label>
        <input id="email" type="email" required />
        <button>Send</button>
      </form>
    </section>
  </main>
  <footer><p>© 2026</p></footer>
</body>
</html>`,
        explanation: [
          "lang on <html> lets screen readers pick the right pronunciation.",
          "The viewport meta tag makes the page render at device width on phones.",
          "header, nav, main, and footer are landmarks assistive tech can jump between.",
          "One <h1>, then <h2> sections, gives a clean heading outline.",
          "label for= matches the input id, so clicking the label focuses the field.",
          "type=\"email\" and required give free validation and the right mobile keyboard.",
        ],
      },
    ],
    bestPractices: [
      "Use the element that matches the meaning: <button> for actions, <a> for navigation.",
      "One <h1> per page and no skipped heading levels.",
      "Every image needs alt text; decorative images get alt=\"\".",
      "Every form control needs a visible, associated <label>.",
    ],
    mistakes: [
      "Clickable <div>s instead of <button> — no keyboard or screen reader support.",
      "Choosing headings for their size instead of their level.",
      "Placeholder text used as the only label.",
      "Tables for page layout.",
    ],
    useCases: ["Every website and web app", "Email templates", "Documentation and content sites"],
    interview: [
      {
        q: "What is semantic HTML and why does it matter?",
        a: "Using elements for their meaning (nav, main, article, button) rather than generic divs. It improves accessibility, SEO, and maintainability and gives built-in behaviour.",
      },
      {
        q: "What is the difference between <section> and <div>?",
        a: "<section> is a thematic grouping that normally has a heading; <div> has no meaning and is purely a styling or scripting hook.",
      },
      {
        q: "What does the defer attribute on <script> do?",
        a: "The script downloads in parallel with parsing and runs after the document is parsed, in order. async runs as soon as it downloads, in any order.",
      },
    ],
    exercises: [
      "Rebuild a news article page using only semantic elements, then check its outline with a headings extension.",
      "Build a signup form with labels, a fieldset, and three different input types.",
    ],
    docs: [
      { label: "MDN — HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
      { label: "HTML Living Standard", href: "https://html.spec.whatwg.org/multipage/" },
    ],
    guidePrefix: "html-",
    guides: ["html-basics"],
    related: ["accessibility", "css", "seo", "html-modern-elements"],
    projects: ["personal-portfolio", "landing-page-build"],
  },
  {
    slug: "accessibility",
    name: "Accessibility",
    domain: "web-fundamentals",
    level: "Intermediate",
    featured: true,
    summary:
      "Building interfaces everyone can use: keyboard, screen readers, contrast, motion, and WCAG.",
    what:
      "Accessibility (a11y) is the practice of making websites usable by people with disabilities — visual, motor, auditory, and cognitive — and by anyone in a constrained situation.",
    why:
      "Around one in six people lives with a disability. Accessible sites reach more users, rank better, are easier to test, and are a legal requirement in many regions.",
    how:
      "Browsers expose an accessibility tree built from the DOM: each node has a role, a name, a state, and a value. Assistive technologies read that tree. Semantic HTML fills it in correctly; ARIA attributes patch gaps where HTML has no native element.",
    prerequisites: ["html", "css"],
    roadmap: [
      "WCAG principles: perceivable, operable, understandable, robust",
      "Keyboard navigation and visible focus",
      "Accessible names: labels, alt text, aria-label",
      "Colour contrast and not relying on colour alone",
      "ARIA roles, states, and the first rule of ARIA",
      "Accessible components: dialogs, menus, tabs",
      "Testing with axe, Lighthouse, and a screen reader",
    ],
    concepts: [
      "Accessibility tree: role, name, state",
      "Focus order and focus management",
      "Contrast ratios (4.5:1 body text, 3:1 large text and UI)",
      "Live regions for dynamic updates",
      "prefers-reduced-motion",
    ],
    examples: [
      {
        title: "Accessible disclosure button",
        language: "html",
        code: `<button type="button" aria-expanded="false" aria-controls="faq-1">
  What is FrontEndFusion?
</button>
<div id="faq-1" hidden>
  <p>A free platform for learning frontend development.</p>
</div>

<script>
  const btn = document.querySelector('button');
  const panel = document.getElementById('faq-1');
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    panel.hidden = open;
  });
</script>`,
        explanation: [
          "A real <button> is focusable and keyboard-operable with no extra code.",
          "aria-expanded announces open or closed to screen readers.",
          "aria-controls links the button to the panel it toggles.",
          "The hidden attribute removes the panel from both view and the accessibility tree.",
        ],
      },
    ],
    bestPractices: [
      "Use native elements first; reach for ARIA only when HTML cannot express it.",
      "Never remove focus outlines without providing a better visible focus style.",
      "Move focus into dialogs when they open and back to the trigger when they close.",
      "Respect prefers-reduced-motion for non-essential animation.",
    ],
    mistakes: [
      "role=\"button\" on a div without tabindex and key handlers.",
      "aria-label that contradicts the visible text.",
      "Icon-only buttons with no accessible name.",
      "Relying on automated checkers alone — they catch around a third of issues.",
    ],
    interview: [
      {
        q: "What is the first rule of ARIA?",
        a: "If a native HTML element or attribute gives the semantics and behaviour you need, use it instead of repurposing an element and adding ARIA.",
      },
      {
        q: "How do you make a modal dialog accessible?",
        a: "Use <dialog> with showModal() or role=dialog with aria-modal, give it a label, move focus inside on open, trap focus, close on Escape, and return focus to the trigger.",
      },
    ],
    exercises: [
      "Navigate a site you built using only the keyboard and fix every unreachable control.",
      "Run axe DevTools and fix every reported contrast issue.",
      "Turn on VoiceOver or NVDA and listen to your page's headings list.",
    ],
    docs: [
      { label: "WCAG 2.2 quick reference", href: "https://www.w3.org/WAI/WCAG22/quickref/" },
      { label: "WAI-ARIA Authoring Practices", href: "https://www.w3.org/WAI/ARIA/apg/" },
      { label: "MDN — Accessibility", href: "https://developer.mozilla.org/en-US/docs/Web/Accessibility" },
    ],
    guides: ["accessibility", "html-aria", "html-tabindex", "html-label-element"],
    related: ["html", "css", "testing"],
  },
  {
    slug: "css",
    name: "CSS",
    domain: "web-fundamentals",
    level: "Beginner",
    featured: true,
    summary:
      "Selectors, the cascade, the box model, Flexbox, Grid, responsive design, transitions, and animations.",
    what:
      "CSS (Cascading Style Sheets) controls how HTML looks: colour, typography, spacing, layout, and motion. Rules pair a selector with declarations.",
    why:
      "Separating presentation from structure lets one document adapt to phones, desktops, print, dark mode, and user preferences without changing the HTML.",
    how:
      "The browser collects every rule that matches an element, resolves conflicts with the cascade (origin and importance, layers, specificity, then source order), computes values (inheritance, units), and feeds them into layout. Layout modes — flow, flex, grid, positioned — decide where each box goes.",
    prerequisites: ["html"],
    roadmap: [
      "Selectors, specificity, and the cascade",
      "The box model and box-sizing",
      "Typography and colour",
      "Flexbox for one-dimensional layout",
      "Grid for two-dimensional layout",
      "Responsive design with media and container queries",
      "Custom properties and theming",
      "Transitions and keyframe animations",
      "Architecture: naming, layers, and scale",
    ],
    concepts: [
      "Cascade, specificity, and @layer",
      "Box model: content, padding, border, margin",
      "Display types and formatting contexts",
      "Flexbox and Grid",
      "Positioning and stacking contexts",
      "Units: rem, %, vw, clamp()",
      "Custom properties (variables)",
      "Media queries and container queries",
    ],
    examples: [
      {
        title: "Responsive card grid with Grid and custom properties",
        language: "css",
        markup: `<div class="cards">
  <article class="card"><h3>HTML</h3><p>Structure and meaning.</p></article>
  <article class="card"><h3>CSS</h3><p>Layout and style.</p></article>
  <article class="card"><h3>JavaScript</h3><p>Behaviour.</p></article>
  <article class="card"><h3>React</h3><p>Components.</p></article>
</div>`,
        code: `:root {
  --gap: 1rem;
  --radius: 12px;
  --accent: #16a34a;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: var(--gap);
  padding: var(--gap);
}

.card {
  padding: 1.25rem;
  border: 1px solid #ddd;
  border-radius: var(--radius);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgb(0 0 0 / 0.1);
  border-color: var(--accent);
}

@media (prefers-reduced-motion: reduce) {
  .card { transition: none; }
}`,
        explanation: [
          "Custom properties on :root act as design tokens you can reuse and override.",
          "auto-fit with minmax(14rem, 1fr) creates as many columns as fit — responsive with no media query.",
          "gap spaces the grid tracks without margin arithmetic.",
          "Animating transform and box-shadow on hover; transform is cheap because it skips layout.",
          "The reduced-motion query turns the motion off for people who asked for less.",
        ],
      },
    ],
    bestPractices: [
      "Set box-sizing: border-box globally.",
      "Prefer rem for type and spacing so user font settings are respected.",
      "Use Flexbox for one axis, Grid for two.",
      "Keep specificity low and flat; use @layer to order sources.",
      "Design mobile-first, then add min-width queries.",
    ],
    mistakes: [
      "Fighting specificity with !important.",
      "Fixed heights on text containers, which overflow when content or font size changes.",
      "Magic-number margins instead of gap.",
      "Animating width, height, or top instead of transform.",
    ],
    performance: [
      "Animate only transform and opacity for smooth 60 fps motion.",
      "Avoid huge, deeply nested selectors in very large DOMs.",
      "Inline critical CSS for the first viewport on content sites.",
    ],
    interview: [
      {
        q: "How is specificity calculated?",
        a: "As a tuple of (ID selectors, class/attribute/pseudo-class selectors, type/pseudo-element selectors), compared left to right. Inline styles beat all selectors; !important and cascade layers are resolved before specificity.",
      },
      {
        q: "When would you use Grid over Flexbox?",
        a: "Grid when you control rows and columns together (page layouts, card galleries); Flexbox when content flows along one axis and items size themselves (toolbars, nav bars).",
      },
      {
        q: "What creates a stacking context?",
        a: "Among others: position with a z-index other than auto, opacity below 1, transform, filter, isolation: isolate, and flex/grid children with a z-index.",
      },
    ],
    exercises: [
      "Centre an element horizontally and vertically in three different ways.",
      "Build a holy-grail layout with Grid template areas.",
      "Add a dark theme using only custom properties.",
    ],
    docs: [
      { label: "MDN — CSS", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
      { label: "web.dev — Learn CSS", href: "https://web.dev/learn/css" },
    ],
    guidePrefix: "css-",
    guides: ["css-fundamentals", "advanced-topics"],
    related: ["responsive-design", "tailwind-css", "design-systems"],
    projects: ["responsive-navigation", "landing-page-build"],
  },
  {
    slug: "responsive-design",
    name: "Responsive Design",
    domain: "web-fundamentals",
    level: "Beginner",
    summary:
      "One codebase that adapts to every screen: fluid layouts, media and container queries, responsive images.",
    what:
      "Responsive design is building layouts that adapt to the viewport and container they render in, rather than designing fixed-width pages per device.",
    why:
      "Most traffic is mobile, devices span 320px phones to ultrawide monitors, and users zoom text. Fluid layouts serve all of them from one codebase.",
    how:
      "Fluid units (%, fr, rem, clamp()) let boxes scale; intrinsic layout (auto-fit grids, flex-wrap) reflows content; media queries change rules at viewport breakpoints; container queries change components based on the space their parent gives them; srcset and sizes let the browser pick the right image.",
    prerequisites: ["css"],
    concepts: [
      "Mobile-first min-width queries",
      "Fluid type with clamp()",
      "Intrinsic layouts with auto-fit and flex-wrap",
      "Container queries",
      "Responsive images: srcset, sizes, picture",
    ],
    examples: [
      {
        title: "Container query card",
        language: "css",
        markup: `<div class="card-wrap">
  <div class="card">
    <div style="background:#16a34a;min-height:5rem;border-radius:8px"></div>
    <div><h2>Resize me</h2><p>Drag the preview's bottom-right corner or widen the pane.</p></div>
  </div>
</div>`,
        code: `.card-wrap { container-type: inline-size; }

.card { display: grid; gap: 1rem; }

@container (min-width: 32rem) {
  .card { grid-template-columns: 10rem 1fr; }
}

h2 { font-size: clamp(1.25rem, 1rem + 2vw, 2rem); }`,
        explanation: [
          "container-type makes the wrapper a size container.",
          "The card switches to two columns when its container — not the viewport — is wide enough.",
          "clamp() gives fluid type with a minimum and maximum.",
        ],
      },
    ],
    bestPractices: [
      "Let content decide breakpoints, not device names.",
      "Test at 320px wide and at 200% zoom.",
      "Use container queries for reusable components.",
    ],
    mistakes: [
      "Horizontal scroll caused by fixed widths or 100vw with a scrollbar.",
      "Hiding important content on mobile instead of reorganising it.",
      "Shipping desktop-sized images to phones.",
    ],
    interview: [
      {
        q: "Media queries vs container queries?",
        a: "Media queries respond to the viewport; container queries respond to the size of an ancestor container, which makes components reusable in any layout slot.",
      },
    ],
    docs: [
      { label: "web.dev — Learn Responsive Design", href: "https://web.dev/learn/design" },
      { label: "MDN — Container queries", href: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries" },
    ],
    guides: ["responsive-design", "css-media-queries"],
    related: ["css", "tailwind-css"],
    projects: ["responsive-navigation"],
  },
  {
    slug: "seo",
    name: "SEO for Frontend",
    domain: "web-fundamentals",
    level: "Intermediate",
    summary:
      "Markup, metadata, performance, and rendering choices that make pages discoverable.",
    what:
      "Search engine optimisation on the frontend is making pages crawlable, understandable, and fast: semantic markup, metadata, structured data, and server-rendered content.",
    why:
      "If crawlers cannot fetch or understand content, it will not rank. Many SEO problems are rendering problems — content that only appears after client-side JavaScript runs.",
    concepts: [
      "Title and meta description",
      "Canonical URLs and sitemaps",
      "Open Graph and social cards",
      "Structured data (JSON-LD)",
      "Core Web Vitals as ranking signals",
      "Server rendering vs client rendering",
    ],
    bestPractices: [
      "Unique, descriptive <title> per page.",
      "Render primary content as HTML, not only after hydration.",
      "Use real <a href> links so crawlers can follow them.",
    ],
    mistakes: [
      "Navigation implemented with onClick handlers instead of links.",
      "Duplicate pages without canonical tags.",
    ],
    interview: [
      {
        q: "How does client-side rendering affect SEO?",
        a: "Crawlers must execute JavaScript to see content, which is slower and less reliable. Server rendering or static generation delivers content in the initial HTML.",
      },
    ],
    docs: [
      { label: "Google Search Central — SEO starter guide", href: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" },
      { label: "Next.js — Metadata", href: "https://nextjs.org/docs/app/getting-started/metadata-and-og-images" },
    ],
    guides: ["seo-tips", "html-meta-information"],
    related: ["html", "nextjs", "web-performance"],
  },
];
