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
    ],
    interview: [
      {
        q: "What is event delegation?",
        a: "Attaching one listener to a common ancestor and using event.target to handle events from its descendants. It relies on bubbling and works for elements added later.",
      },
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
      "Storage, fetch, history, observers, workers, clipboard, and other platform capabilities.",
    what:
      "Browser APIs are the capabilities the platform exposes to JavaScript beyond the language itself: networking, storage, URLs, observers, media, workers, and device features.",
    why:
      "Many features that once needed libraries — lazy loading, intersection detection, dialogs, copying, URL parsing — are now built in, smaller, and faster.",
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
    mistakes: ["Storing secrets or tokens in localStorage, where any injected script can read them."],
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
    concepts: [
      "LCP (≤2.5s), INP (≤200ms), CLS (≤0.1)",
      "Critical rendering path",
      "Code splitting and lazy loading",
      "Image formats, sizing, and priority hints",
      "Long tasks and main-thread blocking",
      "Caching and CDNs",
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
    docs: [
      { label: "web.dev — Web Vitals", href: "https://web.dev/articles/vitals" },
      { label: "web.dev — Learn Performance", href: "https://web.dev/learn/performance" },
    ],
    guides: ["js-performance-tips", "css-performance", "js-memory-e-ciency"],
    related: ["nextjs", "browser-devtools", "how-the-web-works"],
  },
];
