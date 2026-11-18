import type { Technology } from "./types";

export const javascript: Technology[] = [
  {
    slug: "javascript",
    name: "JavaScript",
    domain: "javascript",
    level: "Beginner",
    featured: true,
    summary:
      "Variables, functions, objects, closures, prototypes, modules, and errors — the language behind every interactive page.",
    what:
      "JavaScript is a dynamic, garbage-collected language with first-class functions. It runs in every browser and, through runtimes like Node.js, on servers and in tooling.",
    why:
      "HTML and CSS describe a page; JavaScript makes it respond — to input, to the network, to time. Every frontend framework is JavaScript underneath.",
    how:
      "The engine parses source into an abstract syntax tree, compiles it just in time, and runs it on a single main thread. Each function call gets an execution context with its own scope; closures keep references to outer scopes alive. Objects inherit through a prototype chain.",
    prerequisites: ["html"],
    roadmap: [
      "Values, types, and variables (let, const)",
      "Operators, conditions, and loops",
      "Functions, parameters, and arrow functions",
      "Arrays and objects; destructuring and spread",
      "Scope, hoisting, and closures",
      "this, prototypes, and classes",
      "Modules with import and export",
      "Error handling with try/catch",
      "DOM, events, and async code",
    ],
    concepts: [
      "Primitive vs reference types",
      "let/const and block scope",
      "Closures and lexical scope",
      "Execution context and the call stack",
      "Prototypal inheritance and classes",
      "Higher-order array methods: map, filter, reduce",
      "ES modules",
      "Error handling",
    ],
    examples: [
      {
        title: "Closures and array methods",
        language: "js",
        code: `function createCounter(start = 0) {
  let count = start;
  return {
    increment: () => ++count,
    value: () => count,
  };
}

const counter = createCounter(5);
counter.increment();
counter.increment();
console.log('counter:', counter.value()); // 7

const products = [
  { name: 'Keyboard', price: 49 },
  { name: 'Mouse', price: 19 },
  { name: 'Monitor', price: 199 },
];

const affordable = products
  .filter((p) => p.price < 100)
  .map((p) => p.name);

const total = products.reduce((sum, p) => sum + p.price, 0);

console.log('affordable:', affordable);
console.log('total:', total);`,
        explanation: [
          "createCounter returns functions that still see count after it returns — that is a closure.",
          "count is private: nothing outside can change it except through increment.",
          "filter keeps matching items; map transforms each one; neither mutates the array.",
          "reduce folds the array into one value, starting from 0.",
        ],
      },
    ],
    advanced: [
      "Iterators and generators",
      "Proxy and Reflect",
      "WeakMap and WeakSet for memory-safe caches",
      "Structured clone and immutability patterns",
    ],
    bestPractices: [
      "Default to const; use let only when you reassign.",
      "Use === and !== to avoid coercion surprises.",
      "Prefer pure functions and avoid mutating arguments.",
      "Handle every rejected promise.",
    ],
    mistakes: [
      "Using var and being surprised by function scope and hoisting.",
      "Losing this when passing a method as a callback.",
      "Mutating shared objects or arrays in place.",
      "Comparing objects with === expecting a deep comparison.",
      "Treating an async function's result as a value instead of awaiting or returning the promise.",
    ],
    performance: [
      "Initialise objects with the same properties in the same order every time; engines keep a fast hidden class instead of degrading to dictionary-mode property lookups.",
      "Read layout measurements (offsetWidth, getBoundingClientRect) before the writes that invalidate them, or batch with requestAnimationFrame — each read after a write forces a synchronous reflow.",
      "Hot loops dominate runtime: move invariants out of the loop body and prefer typed arrays for large numeric datasets, where the engine can skip boxing.",
      "Long synchronous work blocks input and paint. Chunk it into slices under ~50ms or move it to a Web Worker.",
    ],
    useCases: [
      "Single-page apps that route between views, fetch JSON, and update the DOM without a full page reload.",
      "Multi-step forms and checkout flows that validate as the user types and keep state between steps.",
      "Dashboards that poll or stream data and re-render counters, charts, and tables on each update.",
      "Browser extensions, build scripts, and CLI tooling that read and transform files or pages outside a server.",
    ],
    interview: [
      {
        q: "What is a closure?",
        a: "A function bundled with references to the variables in the scope where it was created. It can read and update those variables after the outer function returns.",
      },
      {
        q: "Difference between == and ===?",
        a: "== converts operands to a common type before comparing; === compares type and value without conversion.",
      },
      {
        q: "How does prototypal inheritance work?",
        a: "Every object has an internal [[Prototype]] link. Property lookups walk the chain until found or the chain ends at null. Classes are syntax over this mechanism.",
      },
      {
        q: "What is hoisting?",
        a: "Declarations are registered before code runs. var is initialised to undefined; let/const exist in a temporal dead zone until their line runs; function declarations are fully hoisted.",
      },
    ],
    exercises: [
      "Write a once(fn) helper that runs fn only the first time it is called.",
      "Group an array of people by age using reduce.",
      "Implement a tiny event emitter with on, off, and emit.",
    ],
    docs: [
      { label: "MDN — JavaScript Guide", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide" },
      { label: "javascript.info", href: "https://javascript.info/" },
      { label: "ECMAScript specification", href: "https://tc39.es/ecma262/" },
    ],
    guidePrefix: "js-",
    guides: ["javascript-basics"],
    related: ["dom-and-events", "async-javascript", "typescript"],
    projects: ["calculator", "todo-app"],
  },
  {
    slug: "dom-and-events",
    name: "DOM & Events",
    domain: "javascript",
    level: "Beginner",
    summary:
      "Selecting, creating, and updating elements, and responding to user input with events and delegation.",
    what:
      "The Document Object Model is the live tree of objects the browser builds from HTML. JavaScript reads and changes it; the browser re-renders the result.",
    why:
      "Every interaction — a click, a keystroke, a form submit — reaches your code as a DOM event, and every visual change is a DOM update. Frameworks automate this, but they do it with these same APIs.",
    how:
      "Events are dispatched to a target and travel in three phases: capture (window down to target), target, and bubble (back up). Listeners attached to ancestors can therefore handle events from many children — event delegation.",
    prerequisites: ["javascript", "html"],
    roadmap: [
      "Select elements with querySelector and querySelectorAll",
      "Read and write textContent, attributes, classList, and dataset",
      "Create, insert, move, and remove nodes",
      "Listen for events and read the event object (target, currentTarget, key)",
      "Use bubbling for delegation, then render batches with <template> and DocumentFragment",
    ],
    concepts: [
      "querySelector and querySelectorAll",
      "createElement, append, textContent",
      "classList and dataset",
      "addEventListener and event objects",
      "Bubbling, capturing, and delegation",
      "preventDefault and stopPropagation",
    ],
    examples: [
      {
        title: "Event delegation on a list",
        language: "html",
        code: `<ul id="list">
  <li>Learn HTML <button data-action="done">Done</button></li>
  <li>Learn CSS <button data-action="done">Done</button></li>
</ul>
<form id="add">
  <label for="task">New task</label>
  <input id="task" required />
  <button>Add</button>
</form>

<script>
  const list = document.getElementById('list');

  list.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action="done"]');
    if (!button) return;
    button.parentElement.style.textDecoration = 'line-through';
  });

  document.getElementById('add').addEventListener('submit', (event) => {
    event.preventDefault();
    const input = document.getElementById('task');
    const li = document.createElement('li');
    li.textContent = input.value + ' ';
    const done = document.createElement('button');
    done.dataset.action = 'done';
    done.textContent = 'Done';
    li.append(done);
    list.append(li);
    input.value = '';
  });
</script>`,
        explanation: [
          "One click listener on the <ul> handles buttons that exist now and ones added later.",
          "closest() walks up from the clicked node to find the matching button.",
          "preventDefault() stops the form from reloading the page.",
          "textContent (not innerHTML) inserts user input safely, with no HTML injection.",
        ],
      },
    ],
    bestPractices: [
      "Use textContent for user-provided strings.",
      "Delegate events for dynamic lists.",
      "Batch DOM writes; avoid reading layout (offsetHeight) between writes.",
    ],
    mistakes: [
      "innerHTML with untrusted input (XSS).",
      "Adding a listener per item in a large list.",
      "Forgetting to remove listeners on elements that live longer than the component.",
      "Reading offsetHeight or getBoundingClientRect inside a loop of style writes, which forces a reflow per iteration.",
      "Assuming event.target is the element you attached the listener to — currentTarget is that element; target is the deepest node clicked.",
    ],
    advanced: [
      "Passive listeners ({ passive: true }) let the browser scroll or zoom immediately on touch and wheel input instead of waiting to see if your handler calls preventDefault().",
      "CustomEvent with bubbles: true and composed: true crosses shadow DOM boundaries, which is how component libraries expose events that escape an encapsulated root.",
      "DocumentFragment and cloning a <template> build a subtree off-document and insert once, collapsing hundreds of potential reflows into a single layout pass.",
      "Focus management is part of correctness: move focus into a dialog on open, trap Tab inside it with inert on the background, and restore focus to the trigger on close.",
      "Pointer Events unify mouse, touch, and pen; setPointerCapture keeps drag events flowing to your element even when the pointer leaves its box.",
    ],
    performance: [
      "Build and append detached subtrees; every append into a live, rendered parent can trigger style recalculation and layout.",
      "Animate transform and opacity only — those can be composited without layout or paint, while top/left/width animate through the full pipeline.",
      "Delegation cuts listener count from one per row to one per container, which also makes teardown cheap when a list is replaced.",
      "Remove listeners (or pass an AbortController signal) when a widget unmounts; a listener on window retains its closure and every node the closure references.",
    ],
    useCases: [
      "Task boards and to-do lists where rows are created, toggled, and deleted at runtime.",
      "Modal dialogs, dropdown menus, and command palettes that trap focus and close on Escape.",
      "Infinite lists that append the next page when a sentinel element scrolls into view.",
      "Progressive enhancement: a form that still submits without JavaScript, upgraded in place with inline validation.",
    ],
    interview: [
      {
        q: "What is event delegation?",
        a: "Attaching one listener to a common ancestor and using event.target to handle events from its descendants. It relies on bubbling and works for elements added later.",
      },
    ],
    exercises: [
      "Build a filterable table: one text input, one delegated listener on tbody, rows hidden when they do not match the query.",
      "Write a modal that traps Tab inside it, closes on Escape, and returns focus to the button that opened it.",
      "Implement a drag-to-reorder list with Pointer Events only — no library — including a visual placeholder.",
      "Render 1,000 rows twice, once appending in a loop and once with a DocumentFragment, and log the time difference.",
    ],
    docs: [
      { label: "MDN — DOM introduction", href: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction" },
      { label: "MDN — Event bubbling", href: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling" },
    ],
    guides: ["html-event-attributes", "js-data-attributes"],
    related: ["javascript", "react"],
    projects: ["todo-app"],
  },
  {
    slug: "async-javascript",
    name: "Async JavaScript & the Event Loop",
    domain: "javascript",
    level: "Intermediate",
    featured: true,
    summary:
      "Callbacks, promises, async/await, fetch, and how the event loop schedules tasks and microtasks.",
    what:
      "Asynchronous JavaScript is code that starts work now and finishes later — network requests, timers, user events — without blocking the single main thread.",
    why:
      "A frozen main thread means a frozen page. Async patterns let the browser keep rendering and responding while I/O happens in the background.",
    how:
      "The call stack runs synchronous code. When it empties, the event loop drains the microtask queue (promise reactions, queueMicrotask), may render, then takes the next task (timers, events, I/O callbacks). async functions pause at await and resume as a microtask when the awaited promise settles.",
    prerequisites: ["javascript"],
    roadmap: [
      "Callbacks, and why error-first callbacks become hard to follow",
      "Create and chain promises with then, catch, and finally",
      "Rewrite the flow with async/await and try/catch",
      "Run independent work concurrently with Promise.all, allSettled, race, and any",
      "Cancel stale work with AbortController and render loading, error, and empty states",
    ],
    concepts: [
      "Call stack, task queue, microtask queue",
      "Promises: pending, fulfilled, rejected",
      "async/await and try/catch",
      "Promise.all, allSettled, race, any",
      "fetch, Response, and AbortController",
    ],
    examples: [
      {
        title: "Event loop ordering",
        language: "js",
        code: `console.log('1: sync');

setTimeout(() => console.log('4: task (setTimeout)'), 0);

Promise.resolve().then(() => console.log('3: microtask (promise)'));

console.log('2: sync');

async function load() {
  try {
    const [a, b] = await Promise.all([
      new Promise((r) => setTimeout(() => r('first'), 100)),
      new Promise((r) => setTimeout(() => r('second'), 50)),
    ]);
    console.log('5: Promise.all resolved with', a, b);
  } catch (error) {
    console.error('failed', error);
  }
}
load();`,
        explanation: [
          "Synchronous logs run first, in order.",
          "Promise callbacks are microtasks; they run as soon as the stack is empty.",
          "setTimeout callbacks are tasks; they wait for the next loop turn, even with 0ms.",
          "Promise.all waits for both promises and keeps the original order, not the finish order.",
        ],
      },
    ],
    bestPractices: [
      "Always handle rejections with catch or try/catch.",
      "Run independent requests in parallel with Promise.all.",
      "Cancel stale requests with AbortController.",
      "Check response.ok — fetch only rejects on network errors.",
    ],
    mistakes: [
      "await inside a loop for independent requests (sequential instead of parallel).",
      "Assuming fetch throws on a 404 or 500.",
      "Mixing callbacks and promises in the same flow.",
      "Creating a promise executor that throws asynchronously, so the rejection escapes the new Promise.",
      "Using async callbacks in forEach and expecting await to pause the loop.",
    ],
    advanced: [
      "Microtasks starve rendering: a promise chain that always resolves never yields, so the browser cannot paint or handle input. Break out with setTimeout, requestAnimationFrame, or scheduler.yield().",
      "AbortSignal composes — AbortSignal.timeout(5000) and AbortSignal.any([userSignal, timeoutSignal]) let one request be cancelled by several independent sources.",
      "Async iterators (for await...of) consume streams, paginated endpoints, and SSE with natural backpressure instead of buffering everything in memory.",
      "Unhandled rejections are observable: the unhandledrejection event fires in browsers, and Node terminates the process by default — attaching a global handler is a safety net, not a substitute for handling.",
      "Promise.all preserves input order regardless of completion order, so map results into a keyed object when the source array was filtered or reordered.",
    ],
    performance: [
      "Use Promise.all for independent requests: three sequential 200ms awaits cost 600ms; in parallel they cost about 200ms.",
      "Each await adds a microtask hop. In hot loops over data already in memory, a synchronous loop is measurably faster than awaiting per item.",
      "Debounce keystroke-driven requests and abort the previous fetch, so stale responses cannot win the race or waste bandwidth.",
      "Render a skeleton first and let data arrive after; gating the first paint on the network directly worsens LCP.",
    ],
    useCases: [
      "Search-as-you-type with debounce, request cancellation, and a loading indicator.",
      "Dashboards that fan out to several endpoints and render when all of them, or the first of them, resolve.",
      "File uploads with progress events, retry with exponential backoff, and resumable chunks.",
      "Optimistic updates that render immediately and roll back when the server rejects the change.",
    ],
    interview: [
      {
        q: "Explain the event loop.",
        a: "JavaScript runs on one thread with a call stack. When the stack is empty, all queued microtasks run, the browser may render, and then the next macrotask is taken. Promises use the microtask queue; timers and events use task queues.",
      },
      {
        q: "Promise.all vs Promise.allSettled?",
        a: "all rejects as soon as any promise rejects; allSettled waits for every promise and reports each outcome.",
      },
    ],
    exercises: [
      "Fetch a public API, show a loading state, an error state, and the data.",
      "Write a retry(fn, attempts) helper with exponential backoff.",
      "Build a search box that aborts the previous request on every keystroke.",
    ],
    docs: [
      { label: "MDN — Using promises", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises" },
      { label: "Jake Archibald — Tasks, microtasks, queues", href: "https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/" },
    ],
    guides: [
      "js-callbacks",
      "js-promises",
      "js-async-functions-async-await",
      "js-fetch",
      "js-intervals-and-timeouts",
    ],
    related: ["javascript", "browser-apis", "tanstack-query"],
    projects: ["weather-interface"],
  },
  {
    slug: "browser-apis",
    name: "Browser APIs",
    domain: "javascript",
    level: "Intermediate",
    summary:
      "Storage, networking, routing, observers, workers, and clipboard — the platform capabilities that quietly replace a shelf of libraries.",
    what:
      "Browser APIs are the capabilities the platform exposes to JavaScript beyond the language itself: networking, storage, URLs, observers, media, workers, and device features.",
    why:
      "Many features that once needed libraries — lazy loading, intersection detection, dialogs, copying, URL parsing — are now built in, smaller, and faster.",
    how:
      "Each capability is a global constructor or object (fetch, localStorage, IntersectionObserver) implemented by the browser engine and exposed to JavaScript through bindings. Calling one hands work to the browser — network I/O, file access, layout observation — which happens off your thread and is delivered back as tasks or microtasks. Access is scoped per origin, gated by secure context (HTTPS), and sometimes behind an explicit permission prompt.",
    prerequisites: ["javascript", "how-the-web-works"],
    roadmap: [
      "URL, URLSearchParams, and the History API for routing and query state",
      "Web Storage and IndexedDB for persistence",
      "fetch, FormData, Blob, and File for data and uploads",
      "Intersection, Resize, and Mutation observers instead of scroll and resize handlers",
      "Workers, clipboard, notifications, and the permission prompts around them",
    ],
    concepts: [
      "localStorage, sessionStorage, IndexedDB",
      "URL and URLSearchParams",
      "History API",
      "IntersectionObserver, ResizeObserver, MutationObserver",
      "Web Workers",
      "Clipboard API",
      "matchMedia",
    ],
    examples: [
      {
        title: "Reveal on scroll with IntersectionObserver",
        language: "html",
        code: `<style>
  .box { height: 40vh; margin: 1rem 0; border-radius: 12px; background: #e5f5ea;
         opacity: 0; transform: translateY(20px); transition: all .5s ease; }
  .box.visible { opacity: 1; transform: none; }
</style>
<p>Scroll down inside the preview.</p>
<div class="box"></div><div class="box"></div><div class="box"></div>
<script>
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.2 });
  document.querySelectorAll('.box').forEach((el) => observer.observe(el));
</script>`,
        explanation: [
          "The observer is notified when at least 20% of a box enters the viewport.",
          "No scroll listener runs on every frame, so the main thread stays free.",
          "unobserve() stops watching once the animation has played.",
        ],
      },
    ],
    bestPractices: [
      "Feature-detect before using newer APIs.",
      "Wrap storage access in try/catch — it can throw in private mode.",
      "Move heavy computation to a Web Worker.",
    ],
    mistakes: [
      "Storing secrets or tokens in localStorage, where any injected script can read them.",
      "Treating localStorage as a database: it is synchronous, string-only, and capped around 5MB per origin.",
      "Awaiting inside an IndexedDB transaction, which lets it auto-commit before the next request is queued.",
      "Requesting geolocation, notifications, or clipboard access on page load, before any user gesture justifies it.",
    ],
    advanced: [
      "IndexedDB transactions auto-commit when the microtask queue drains without a pending request, so awaiting unrelated work mid-transaction can leave it inactive.",
      "BroadcastChannel and the storage event synchronise state across tabs; navigator.locks gives you a leader election so only one tab polls or refreshes a token.",
      "Structured clone is the boundary for workers and IndexedDB: functions, DOM nodes, and class prototypes do not cross. Transferables (ArrayBuffer, OffscreenCanvas, MessagePort) move ownership instead of copying.",
      "OffscreenCanvas plus a worker keeps rendering off the main thread; canvas.transferControlToOffscreen() is what makes animation immune to layout jank.",
      "Permissions and secure-context rules decide what exists at all — some APIs are undefined on HTTP and some silently resolve to denied, so check Permissions.query as well as feature detection.",
    ],
    performance: [
      "Observers are cheaper than scroll and resize listeners: the browser batches intersection and size changes after layout and delivers them without a handler per frame.",
      "A 200ms main-thread task shows up directly in INP. Move parsing, diffing, hashing, and image manipulation into a Worker.",
      "localStorage is synchronous and blocks paint; keep payloads small and write outside interaction handlers.",
      "Cache API and service workers let repeat visits skip the network entirely, turning a 500ms request into a few milliseconds of disk read.",
    ],
    useCases: [
      "Offline-first note apps that persist drafts in IndexedDB and sync when connectivity returns.",
      "Image galleries that lazy-load with IntersectionObserver and preview local files with FileReader.",
      "Multi-tab dashboards that keep filters, theme, and session state aligned with BroadcastChannel.",
      "Client-side exports that build a Blob and trigger a download without a server round trip.",
    ],
    interview: [
      {
        q: "When would you choose IndexedDB over localStorage?",
        a: "When you need structure, indexes, transactions, or more than a few megabytes. localStorage is a synchronous string map that blocks the main thread; IndexedDB is asynchronous, stores cloned objects, and supports range queries.",
      },
      {
        q: "What can a Web Worker not do?",
        a: "It has no DOM, no window, and no direct access to layout. It communicates with the page through postMessage and structured cloning, or shares memory through SharedArrayBuffer with Atomics.",
      },
      {
        q: "Why is IntersectionObserver preferred over a scroll handler?",
        a: "The browser computes intersections without a listener firing every frame, so there is no forced layout read on scroll and no main-thread work when nothing changes. You also stop observing an element once it has been handled.",
      },
      {
        q: "How do you safely feature-detect a browser API?",
        a: "Check that the constructor or method exists on the global before using it, confirm the context is secure when required, and provide a fallback or polyfill. Wrap the actual call in try/catch for APIs that can throw on permission or quota.",
      },
    ],
    exercises: [
      "Build a theme switcher persisted in localStorage that also updates other open tabs via the storage event.",
      "Write a lazy-image helper using IntersectionObserver and data-src, with a low-quality placeholder and an unobserve on load.",
      "Store 1,000 records in IndexedDB with an index on one field, then time a range query against a full scan.",
      "Offload a large JSON parse and aggregation to a Worker and stream progress back to the page.",
      "Generate a CSV string, download it as a Blob, and revoke the object URL once the download starts.",
    ],
    docs: [
      { label: "MDN — Web APIs", href: "https://developer.mozilla.org/en-US/docs/Web/API" },
    ],
    guides: [
      "js-web-storage",
      "js-history",
      "js-indexeddb",
      "js-geolocation",
      "js-file-api-blobs-and-filereaders",
      "js-requestanimationframe",
      "js-websockets",
    ],
    related: ["async-javascript", "web-performance"],
  },
  {
    slug: "web-performance",
    name: "Web Performance",
    domain: "javascript",
    level: "Advanced",
    featured: true,
    summary:
      "Core Web Vitals, loading strategy, rendering cost, and how to measure before optimising.",
    what:
      "Web performance is how quickly a page becomes visible, usable, and stable, and how smoothly it responds to input.",
    why:
      "Slower pages lose users and revenue. Google's Core Web Vitals — LCP, INP, CLS — are used in search ranking and summarise real-user experience.",
    how:
      "Loading performance depends on the network and the critical path (HTML, render-blocking CSS, fonts, the LCP image). Runtime performance depends on main-thread work: long JavaScript tasks delay input handling and rendering.",
    prerequisites: ["how-the-web-works", "javascript"],
    roadmap: [
      "Capture a field baseline: CrUX or the web-vitals library at the 75th percentile",
      "Profile loading in the Network waterfall and identify the LCP element and render-blocking resources",
      "Fix the critical path: preload fonts and the LCP image, inline critical CSS, defer non-critical JS",
      "Cut main-thread work: split bundles, break long tasks, lazy-load below-the-fold code",
      "Set numeric budgets and monitor them in CI, then re-measure after each change",
    ],
    concepts: [
      "LCP (≤2.5s), INP (≤200ms), CLS (≤0.1)",
      "Critical rendering path",
      "Code splitting and lazy loading",
      "Image formats, sizing, and priority hints",
      "Long tasks and main-thread blocking",
      "Caching and CDNs",
    ],
    examples: [
      {
        title: "Forced reflow vs a single layout flush",
        language: "html",
        code: `<style>
  #stage { position: absolute; left: -9999px; }
  .cell { height: 4px; background: #cfe6d8; margin: 1px 0; }
  body { font: 14px system-ui, sans-serif; padding: 1rem; }
  pre { background: #f4f4f2; padding: .75rem; border-radius: 8px; }
</style>
<div id="stage"></div>
<button id="thrash">Read + write per row</button>
<button id="batch">Write all, then read once</button>
<pre id="out">click a button</pre>
<script>
  const stage = document.getElementById('stage');
  const out = document.getElementById('out');
  const cells = Array.from({ length: 400 }, () => {
    const el = document.createElement('div');
    el.className = 'cell';
    stage.append(el);
    return el;
  });

  document.getElementById('thrash').onclick = () => {
    const start = performance.now();
    for (const el of cells) {
      el.style.width = '100px';
      el.offsetWidth; // forces synchronous layout
    }
    out.textContent = 'thrash: ' + (performance.now() - start).toFixed(1) + ' ms';
  };

  document.getElementById('batch').onclick = () => {
    const start = performance.now();
    for (const el of cells) el.style.width = '120px';
    void stage.offsetWidth; // one layout flush
    out.textContent = 'batch: ' + (performance.now() - start).toFixed(1) + ' ms';
  };
</script>`,
        explanation: [
          "Both buttons make 400 style changes; only the first reads layout inside the loop.",
          "Every offsetWidth read after a write invalidates layout, so the browser recomputes geometry 400 times.",
          "The batched version writes first and forces layout once, so the cost stays flat as the row count grows.",
          "This is the same pattern behind measuring elements in a render loop — the fix is always to group reads and write.",
        ],
      },
    ],
    bestPractices: [
      "Measure with real-user data (CrUX, web-vitals) and the Performance panel before changing code.",
      "Give images explicit width and height to prevent layout shift.",
      "Preload the LCP image and fonts; lazy-load below-the-fold media.",
      "Split long tasks and defer non-critical scripts.",
    ],
    mistakes: [
      "Optimising by intuition without a profile.",
      "Shipping an entire library for one function.",
      "Lazy-loading the hero image.",
      "Judging performance on a fast laptop with a warm cache instead of a mid-tier phone on a throttled connection.",
      "Tracking one lab score and ignoring field data — Lighthouse is a snapshot, CrUX is your users.",
    ],
    advanced: [
      "Third-party scripts often dominate field data: tag managers, chat widgets, and A/B tools load untracked JavaScript, so budget them like first-party code or defer them behind an interaction.",
      "The LCP element changes by viewport and state, so observe largest-contentful-paint entries with PerformanceObserver and read entry.element rather than guessing which image matters.",
      "CLS is not only images: late web fonts (font-display: optional), injected cookie banners, and ads without reserved space all shift layout after paint.",
      "Single-page route changes do not reset LCP or CLS; instrument soft navigations explicitly, or per-route metrics silently report the initial page forever.",
      "Send metrics with attribution (element, route, connection type, device class) — a bare p75 number tells you the page is slow but not which element or audience to fix.",
    ],
    performance: [
      "Every kilobyte of JavaScript costs parse, compile, and execute time, and roughly two to three times more on mid-tier mobile than on a developer laptop.",
      "Server response time sits inside LCP: a 500ms TTFB puts a hard floor under any document-rendered metric.",
      "Write budgets as numbers (for example ≤170KB of compressed JS, LCP ≤2.5s at p75) and fail CI when a pull request exceeds them.",
      "Fingerprinted assets with immutable caching make repeat visits cost a single document request, which is where most traffic actually lands.",
    ],
    useCases: [
      "E-commerce product and category pages, where LCP and CLS move conversion and paid-traffic ROI directly.",
      "Marketing and content sites judged on Core Web Vitals in Search Console and CrUX.",
      "Dashboards whose INP collapses under large tables, charts, and frequent re-renders.",
      "Mobile-first apps serving low-end Android devices over slow or unstable networks.",
    ],
    interview: [
      {
        q: "What are Core Web Vitals?",
        a: "Largest Contentful Paint (loading), Interaction to Next Paint (responsiveness), and Cumulative Layout Shift (visual stability), measured at the 75th percentile of real users.",
      },
      {
        q: "How would you improve INP?",
        a: "Find long tasks in the Performance panel, break them up (yield to the main thread), reduce work in event handlers, debounce expensive updates, and move computation off the main thread.",
      },
    ],
    exercises: [
      "Run Lighthouse on a real page, list the top three opportunities, and predict which one moves LCP before changing anything.",
      "Write a web-vitals reporter that sends LCP, INP, and CLS with their attribution entries to a logging endpoint.",
      "Find a long task over 50ms in the Performance panel and split it with scheduler.yield or a setTimeout boundary.",
      "Add explicit width and height to every image in a page and confirm CLS drops to 0 in the Performance panel.",
      "Add a bundle-size budget to CI and make the build fail when the main chunk exceeds it.",
    ],
    docs: [
      { label: "web.dev — Web Vitals", href: "https://web.dev/articles/vitals" },
      { label: "web.dev — Learn Performance", href: "https://web.dev/learn/performance" },
    ],
    guides: ["js-performance-tips", "css-performance", "js-memory-e-ciency"],
    related: ["nextjs", "browser-devtools", "how-the-web-works"],
  },
];
