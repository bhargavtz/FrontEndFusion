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
    prerequisites: [],
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
    advanced: [
      "HTTP/2 and HTTP/3 multiplex many requests over one connection; HTTP/3 runs on QUIC over UDP so one lost packet no longer stalls every response.",
      "The preload scanner parses ahead of the main parser, so assets referenced in early HTML are discovered sooner than assets injected by scripts.",
      "Cross-origin fetches are gated by the same-origin policy and CORS: the browser sends an Origin header and, for non-simple requests, a preflight OPTIONS before the real call.",
      "Speculative loading (preconnect, dns-prefetch, prefetch) and the back/forward cache trade bandwidth for latency; a page restored from bfcache runs no network code at all.",
      "A service worker is a scriptable proxy between the page and the network, which is what makes offline support and custom caching strategies possible.",
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
    useCases: [
      "Diagnosing a slow first paint by reading the DevTools Network waterfall for render-blocking requests.",
      "Designing a cache-header and CDN strategy for a site with users on several continents.",
      "Explaining to stakeholders why a client-rendered dashboard feels slower than a statically served page.",
      "Tracking down a CORS failure that only appears in the browser and never in curl.",
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
    advanced: [
      "The HTML parser is error-tolerant: it inserts implied elements (html, body, tbody), closes tags it thinks are unclosed, and builds a DOM that can differ from the source you wrote.",
      "Scripts without async or defer block the parser because they may call document.write; the preload scanner can still fetch later assets while the main parser waits.",
      "Shadow DOM and custom elements add encapsulation and lifecycle hooks without changing the meaning of the outer document.",
      "The accessibility tree is derived from HTML: role, name, state, and value come from native semantics, and ARIA only overrides what HTML cannot express.",
      "<dialog>, <template>, and <slot> move behaviour that used to need libraries — focus trapping, inert backgrounds, the top layer — into the platform.",
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
    performance: [
      "Keep render-critical markup early in the document; the preload scanner only discovers assets as HTML streams in, so late CSS and JS delay first paint.",
      "Add loading=\"lazy\" and decoding=\"async\" to below-the-fold images, but keep the LCP image eager with fetchpriority=\"high\".",
      "Avoid embedding large SVGs or base64 data URIs in the initial HTML — they inflate the document and block parsing of everything after them.",
      "Changing attributes and text is cheap; replacing a large HTML subtree forces style recalculation, layout, and paint.",
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
    advanced: [
      "display:none, visibility:hidden, and aria-hidden=\"true\" all remove a node from the accessibility tree; opacity:0 does not — its content is still announced and still focusable.",
      "Single-page apps must manage focus on route change: move focus to the new <h1> or <main> and announce the navigation in a polite live region, or screen reader users never learn the page changed.",
      "aria-live=\"polite\" queues announcements while \"assertive\" interrupts; mounting an always-present live region and updating its text is more reliable than creating one on demand.",
      "The inert attribute and native <dialog> give real modal semantics — background content is unfocusable and hidden from assistive tech without a hand-written focus trap.",
      "forced-colors and prefers-contrast modes override author colours, so components that rely on background images or custom focus rings need explicit testing in Windows High Contrast.",
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
    performance: [
      "Prefer native HTML and CSS for behaviour (details/summary, dialog, :focus-visible) over JavaScript focus traps and custom widgets — less code on the main thread.",
      "Keep live regions small and mounted only while needed; a large region that re-renders can re-announce the same text repeatedly.",
      "Run axe as a unit or component test, not on every production render — auditing tools add measurable CPU cost.",
      "Give reduced-motion users a CSS-only fallback instead of shipping a second animation library.",
    ],
    useCases: [
      "Public-sector and regulated products that must meet WCAG 2.2 AA.",
      "Design systems where every component ships with correct roles, names, and keyboard behaviour.",
      "Checkout and onboarding flows that must be completable by keyboard and screen reader alone.",
      "Enterprise dashboards and data tables read by assistive technology.",
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
    advanced: [
      "@layer orders whole stylesheets (base, components, utilities) before specificity is considered, so utilities can win without !important.",
      "@property registers a typed custom property with a syntax, initial value, and inheritance rule, which makes it animatable and prevents invalid values from silently falling back.",
      "Containment (contain: layout paint, content-visibility: auto) lets the browser skip layout and paint for off-screen subtrees.",
      "subgrid lets a nested grid adopt its parent's tracks, so cards in different columns align to the same row lines.",
      "Logical properties (margin-inline, padding-block, inset-inline-start) make a layout follow writing-mode and RTL direction with no extra overrides.",
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
    useCases: [
      "Design systems built on custom-property tokens and themes.",
      "Marketing sites that need fast first paint without a component library.",
      "Dashboards with dense Grid layouts and resizable panels.",
      "Print stylesheets and downloadable documents rendered from HTML.",
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
    roadmap: [
      "Mobile-first layout with fluid units and min-width queries",
      "Intrinsic components: flex-wrap, auto-fit grids, clamp() type",
      "Container queries so components adapt to their slot, not the viewport",
      "Responsive images with srcset, sizes, and picture",
      "Test at 320px, at 200% zoom, and with reduced motion",
    ],
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
    advanced: [
      "Container query length units (cqw, cqi, cqmin) size type and spacing to the container, so a card typography scale works in both a sidebar and a full-width hero.",
      "The dynamic viewport units dvh, svh, and lvh describe the viewport as mobile browser chrome shows and hides; 100vh keeps the largest size and causes clipped layouts.",
      "For srcset, the browser picks a candidate from sizes, device pixel ratio, and Save-Data — art direction (different crops) needs <picture> with media attributes instead.",
      "Fluid type from clamp() plus a modular scale removes most breakpoint-specific font sizes and keeps the ratio intact between them.",
      ":has() and style queries let a component change layout based on its content or an ancestor state, replacing resize-observer JavaScript.",
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
    performance: [
      "srcset and sizes cut image bytes on small screens; preload the LCP image instead of lazy-loading it.",
      "Prefer CSS media and container queries to window.resize listeners, which fire on every frame and force layout reads.",
      "Render one responsive layout and reflow it with CSS rather than shipping separate hidden desktop and mobile trees.",
      "content-visibility: auto on far-below-the-fold sections skips their rendering work until they approach the viewport.",
    ],
    useCases: [
      "Marketing sites that must look right from a 320px phone to an ultrawide monitor.",
      "Dashboards with user-resizable panels of unknown width.",
      "Embeddable widgets dropped into host pages with unpredictable containers.",
      "Email-adjacent and print layouts that must survive narrow clients.",
    ],
    interview: [
      {
        q: "Media queries vs container queries?",
        a: "Media queries respond to the viewport; container queries respond to the size of an ancestor container, which makes components reusable in any layout slot.",
      },
    ],
    exercises: [
      "Rebuild a three-column desktop layout as a mobile-first single column, then add exactly one min-width query where the content actually becomes cramped.",
      "Convert a card's viewport media query into a container query, then place the same card in a narrow sidebar and a wide main column.",
      "Add srcset and sizes to a hero image and verify in DevTools that a simulated phone downloads the smaller candidate.",
      "Test your page at 320px wide and at 200% zoom; remove every horizontal scrollbar.",
      "Replace one window.resize JavaScript handler with a CSS container query and delete the listener.",
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
    how:
      "A crawler fetches a URL, parses the returned HTML, extracts text and links, and queues the <a href> targets it finds. Pages whose content only appears after JavaScript get a second rendering pass, which is slower and may be truncated by a render budget. Ranking then blends relevance (does the page answer the query), authority (links and reputation), and page-experience signals such as Core Web Vitals.",
    prerequisites: ["html", "how-the-web-works"],
    roadmap: [
      "Crawlability: robots.txt, XML sitemaps, and real <a href> links",
      "On-page basics: unique title, meta description, one h1, descriptive headings",
      "Semantic HTML plus JSON-LD structured data that matches visible content",
      "Rendering strategy: SSR or static HTML for primary content",
      "Core Web Vitals, image and font optimisation",
      "Measurement with Search Console and analytics",
    ],
    concepts: [
      "Title and meta description",
      "Canonical URLs and sitemaps",
      "Open Graph and social cards",
      "Structured data (JSON-LD)",
      "Core Web Vitals as ranking signals",
      "Server rendering vs client rendering",
    ],
    examples: [
      {
        title: "An SEO-ready document head with structured data",
        language: "html",
        code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Espresso Basics — A Practical Guide | Brew School</title>
  <meta
    name="description"
    content="Learn espresso dose, grind, and timing in ten minutes, with a troubleshooting table for sour and bitter shots."
  />
  <link rel="canonical" href="https://example.com/guides/espresso-basics" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="Espresso Basics — A Practical Guide" />
  <meta property="og:description" content="Dose, grind, and timing explained with a troubleshooting table." />
  <meta name="twitter:card" content="summary_large_image" />
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Espresso Basics — A Practical Guide",
      "author": { "@type": "Person", "name": "Sam Rivera" },
      "datePublished": "2026-01-14"
    }
  </script>
</head>
<body>
  <main>
    <h1>Espresso basics</h1>
    <p>Espresso pushes hot water through finely ground coffee at roughly nine bar.</p>
    <h2>Dial in the grind</h2>
    <p>Start at 18 g in, 36 g out, in 25 to 30 seconds.</p>
  </main>
</body>
</html>`,
        explanation: [
          "The title names the topic and the brand, and stays unique to this page.",
          "The meta description is a readable summary, not a keyword list.",
          "rel=canonical tells crawlers which URL is the original when variants exist.",
          "Open Graph and Twitter tags control the card shown when the link is shared.",
          "The Article JSON-LD repeats facts that are already visible on the page.",
          "The main content is plain HTML in the first response, so it is indexable without executing JavaScript.",
        ],
      },
      {
        title: "Per-page metadata with the Next.js Metadata API",
        language: "ts",
        code: `import type { Metadata } from "next";

export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug);

  return {
    title: \`\${post.title} | Brew School\`,
    description: post.excerpt,
    alternates: { canonical: \`/guides/\${post.slug}\` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}`,
        explanation: [
          "generateMetadata runs on the server and returns tags rendered into the initial HTML.",
          "title and description are derived from the record, so every page is unique.",
          "alternates.canonical emits a single canonical URL for the page.",
          "Server-rendered metadata reaches crawlers and social scrapers without executing client JavaScript.",
        ],
      },
    ],
    advanced: [
      "Googlebot renders JavaScript on a queue with a limited budget; a hydration error or a client-only route can leave a page indexed with an empty body.",
      "Canonical, hreflang, and sitemap signals must agree. When they conflict, search engines pick the strongest cluster and may ignore the others entirely.",
      "Structured data only earns rich results when it matches visible content; mismatched or invalid JSON-LD can trigger manual actions rather than a feature.",
      "INP replaced FID as a Core Web Vital, so interaction latency now depends on long tasks, main-thread yielding, and third-party script cost.",
      "Crawl stats and log files reveal budget wasted on faceted URLs, redirect chains, and soft 404s that no dashboard reports.",
    ],
    bestPractices: [
      "Unique, descriptive <title> per page.",
      "Render primary content as HTML, not only after hydration.",
      "Use real <a href> links so crawlers can follow them.",
    ],
    mistakes: [
      "Navigation implemented with onClick handlers instead of links.",
      "Duplicate pages without canonical tags.",
      "Publishing one thin page per keyword variant instead of consolidating into a single strong page.",
    ],
    performance: [
      "Server-render or statically generate primary content so it arrives in the first HTML response.",
      "Keep the LCP element — usually the hero image or h1 — discoverable in the initial HTML, preloaded and not lazy-loaded.",
      "Cut third-party scripts; they are the most common cause of poor INP and total blocking time.",
      "Self-host fonts with font-display: swap and preload only the face used above the fold.",
    ],
    useCases: [
      "Content sites and blogs that depend on organic search traffic.",
      "E-commerce product and category pages with Product and Breadcrumb structured data.",
      "SaaS marketing sites competing for high-intent comparison keywords.",
      "Documentation sites where developers search for exact error messages.",
    ],
    interview: [
      {
        q: "How does client-side rendering affect SEO?",
        a: "Crawlers must execute JavaScript to see content, which is slower and less reliable. Server rendering or static generation delivers content in the initial HTML.",
      },
      {
        q: "How do you handle duplicate or parameterised URLs?",
        a: "Choose one canonical URL, 301 old paths to it, add rel=canonical to surviving variants, and keep them out of the sitemap. Conflicting signals are ignored, so canonical tags, internal links, and the sitemap must agree.",
      },
    ],
    exercises: [
      "Write a unique title and meta description for three pages of your site, then check their lengths in a SERP preview tool.",
      "Add Article or Product JSON-LD to a page and validate it with the Rich Results Test.",
      "Disable JavaScript, reload your site, and confirm the primary content is still in the HTML.",
      "Run Lighthouse and fix the LCP image discovery warning it reports.",
      "Generate an XML sitemap for your routes and verify every URL returns 200 without a redirect.",
    ],
    docs: [
      { label: "Google Search Central — SEO starter guide", href: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" },
      { label: "Next.js — Metadata", href: "https://nextjs.org/docs/app/getting-started/metadata-and-og-images" },
    ],
    guides: ["seo-tips", "html-meta-information"],
    related: ["html", "nextjs", "web-performance"],
  },
];
