import type { Technology } from "./types";

export const frameworks: Technology[] = [
  {
    slug: "react",
    name: "React",
    domain: "frameworks",
    level: "Intermediate",
    featured: true,
    summary:
      "Components, JSX, props, state, hooks, context, forms, and rendering performance.",
    what:
      "React is a library for building user interfaces from components — functions that take props and return a description of the UI. React updates the DOM to match that description.",
    why:
      "Describing UI as a function of state (UI = f(state)) removes manual DOM bookkeeping. Components compose into large apps, and the ecosystem (Next.js, React Native, component libraries) is the largest in frontend.",
    how:
      "When state changes, React re-runs the affected components to get a new element tree, compares it with the previous one (reconciliation), and commits the minimal DOM changes. Hooks attach state and effects to a component by call order, which is why they must be called unconditionally at the top level.",
    prerequisites: ["javascript", "dom-and-events"],
    roadmap: [
      "JSX and components",
      "Props and composition (children)",
      "State with useState",
      "Rendering lists with keys; conditional rendering",
      "Events and controlled forms",
      "Effects and synchronising with external systems",
      "Context for shared values",
      "Custom hooks",
      "Performance: memo, useMemo, useCallback, transitions",
      "Server Components (with a framework)",
    ],
    concepts: [
      "Components and JSX",
      "Props are read-only; state is owned",
      "Lifting state up",
      "Keys and reconciliation",
      "useState, useEffect, useRef, useContext, useReducer",
      "Custom hooks",
      "Rules of hooks",
      "Suspense and transitions",
      "Server vs Client Components",
    ],
    examples: [
      {
        title: "State, lists, and a controlled form",
        language: "jsx",
        code: `import { useState } from "react";

function TaskItem({ task, onToggle }) {
  return (
    <li>
      <label style={{ textDecoration: task.done ? "line-through" : "none" }}>
        <input type="checkbox" checked={task.done} onChange={() => onToggle(task.id)} />{" "}
        {task.title}
      </label>
    </li>
  );
}

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Learn JSX", done: true },
    { id: 2, title: "Understand state", done: false },
  ]);
  const [title, setTitle] = useState("");

  function addTask(event) {
    event.preventDefault();
    if (!title.trim()) return;
    setTasks((prev) => [...prev, { id: Date.now(), title, done: false }]);
    setTitle("");
  }

  function toggle(id) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  const remaining = tasks.filter((t) => !t.done).length;

  return (
    <main style={{ fontFamily: "system-ui", padding: 16 }}>
      <h1>Tasks ({remaining} left)</h1>
      <form onSubmit={addTask}>
        <label htmlFor="title">New task </label>
        <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button>Add</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={toggle} />
        ))}
      </ul>
    </main>
  );
}`,
        explanation: [
          "TaskItem receives data and a callback through props; it owns no state.",
          "App owns the tasks array — the single source of truth, lifted up to the common parent.",
          "The input is controlled: its value comes from state and every keystroke updates state.",
          "setTasks(prev => ...) uses the functional form so updates never read stale state.",
          "map + spread returns a new array and a new object — React relies on new references to detect change.",
          "remaining is derived during render, not stored in state.",
          "key={task.id} lets React match items between renders.",
        ],
      },
    ],
    advanced: [
      "useReducer for complex state transitions",
      "useSyncExternalStore for external stores",
      "Suspense, use(), and streaming",
      "Error boundaries",
      "React Compiler and automatic memoisation",
      "Compound components and render props",
    ],
    bestPractices: [
      "Derive values during render instead of syncing them with effects.",
      "Keep state minimal and as close as possible to where it is used.",
      "Use stable, unique keys — never array indexes for reorderable lists.",
      "Reach for useEffect only to synchronise with something outside React.",
      "Measure with React DevTools Profiler before adding memoisation.",
    ],
    mistakes: [
      "Mutating state (push, direct assignment) so React never re-renders.",
      "Effects that set state derived from props, causing double renders.",
      "Missing effect dependencies, leading to stale closures.",
      "Defining components inside other components.",
    ],
    performance: [
      "Split large client bundles with lazy() and Suspense.",
      "Virtualise long lists (TanStack Virtual).",
      "Use startTransition for non-urgent updates such as filtering.",
    ],
    useCases: ["Single-page apps", "Dashboards", "Design systems", "Native apps with React Native"],
    interview: [
      {
        q: "What is reconciliation?",
        a: "React's process of comparing the new element tree to the previous one and computing the minimal DOM changes. Element type and key decide whether a node is updated or replaced.",
      },
      {
        q: "Why must hooks be called in the same order?",
        a: "React stores hook state in a list per component and matches calls by position. Conditional calls would shift positions and attach state to the wrong hook.",
      },
      {
        q: "When do you need useEffect?",
        a: "To synchronise with an external system — subscriptions, timers, non-React widgets, network requests without a data library. Not for deriving data or handling user events.",
      },
      {
        q: "Controlled vs uncontrolled inputs?",
        a: "A controlled input's value comes from React state and changes through onChange. An uncontrolled input keeps its own value in the DOM, read with a ref or FormData.",
      },
    ],
    exercises: [
      "Add filters (all, active, done) to the task list without storing filtered data in state.",
      "Extract a useLocalStorage(key, initial) custom hook.",
      "Build an accessible tabs component with roving focus.",
    ],
    docs: [
      { label: "react.dev — Learn", href: "https://react.dev/learn" },
      { label: "react.dev — Reference", href: "https://react.dev/reference/react" },
    ],
    related: ["nextjs", "typescript-react", "state-management", "tanstack-query"],
    projects: ["todo-app", "dashboard-ui", "ecommerce-frontend"],
  },
  {
    slug: "nextjs",
    name: "Next.js",
    domain: "frameworks",
    level: "Intermediate",
    featured: true,
    summary:
      "The React framework: App Router, layouts, Server and Client Components, data fetching, metadata, and rendering strategies.",
    what:
      "Next.js is a React framework that adds file-based routing, server rendering, static generation, data fetching, image and font optimisation, and a build pipeline.",
    why:
      "React alone is a UI library; production apps also need routing, SEO-friendly HTML, code splitting, and caching. Next.js provides those with conventions instead of configuration.",
    how:
      "Folders in app/ define routes; page.tsx renders a route and layout.tsx wraps its children and persists across navigation. Components are Server Components by default: they render on the server, can await data directly, and send no JavaScript. Files marked \"use client\" become Client Components that hydrate and handle interactivity. Routes are prerendered at build time when possible and rendered on demand when they read request-time data.",
    prerequisites: ["react", "typescript"],
    roadmap: [
      "Project structure and the app/ directory",
      "Pages, layouts, and nested routes",
      "Links and navigation",
      "Server vs Client Components",
      "Data fetching in Server Components",
      "Dynamic routes and generateStaticParams",
      "Metadata and SEO",
      "Images, fonts, and scripts",
      "Loading and error UI",
      "Caching and rendering strategies",
      "Deployment",
    ],
    concepts: [
      "App Router file conventions: page, layout, loading, error, not-found",
      "Server Components and \"use client\" boundaries",
      "Static vs dynamic rendering",
      "Streaming with Suspense",
      "Route params as Promises (Next.js 15+)",
      "Metadata API",
      "next/image and next/font",
      "Route handlers and Server Actions",
    ],
    examples: [
      {
        title: "Dynamic route with static params and metadata",
        language: "tsx",
        code: `// app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  return { title: post?.title ?? "Not found", description: post?.excerpt };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </article>
  );
}`,
        explanation: [
          "The [slug] folder makes a dynamic segment.",
          "params is a Promise in current Next.js, so it is awaited.",
          "generateStaticParams lists slugs to prerender at build time.",
          "generateMetadata sets per-page <title> and description for SEO.",
          "The page is an async Server Component — it fetches data directly, no useEffect.",
          "notFound() renders the nearest not-found UI with a 404 status.",
        ],
      },
    ],
    advanced: [
      "Parallel and intercepting routes: render a modal over a feed while the URL still points at a shareable page.",
      "Partial Prerendering serves a static shell from the cache and streams dynamic holes into it at request time.",
      "Server Actions plus revalidatePath/revalidateTag let a mutation invalidate exactly the cached data it touched.",
      "Middleware runs before routing to handle auth redirects, locale negotiation, and A/B bucketing at the edge.",
      "Route handlers with runtime streaming (ReadableStream) for SSE or long-lived AI responses.",
      "after() schedules work that must finish after the response is sent, such as analytics or cache warming.",
    ],
    bestPractices: [
      "Keep components on the server by default; push \"use client\" to the leaves.",
      "Pass serialisable props from Server to Client Components.",
      "Fetch data where it is used; parallelise independent requests.",
      "Use next/link, next/image, and next/font.",
      "Read the docs for your exact version — the App Router evolves quickly.",
    ],
    mistakes: [
      "Marking a whole page \"use client\" for one interactive button.",
      "Importing server-only code (secrets, database clients) into Client Components.",
      "Using useEffect to fetch data a Server Component could fetch.",
    ],
    performance: [
      "Every \"use client\" boundary adds hydration work; move the directive down to the smallest interactive leaf instead of the page.",
      "next/font self-hosts and inlines font CSS, removing a render-blocking request and the layout shift from late font swaps.",
      "next/image emits a responsive srcset and reserves intrinsic space, so images never cause Cumulative Layout Shift.",
      "Watch the First Load JS column in the build output; anything imported into a layout ships to every route in that segment.",
    ],
    useCases: [
      "Marketing sites and blogs that need crawlable HTML and a fast first paint",
      "Authenticated dashboards with request-time data and streamed skeletons",
      "Storefronts where product pages are static but the cart and checkout are dynamic",
      "Multi-tenant SaaS with per-tenant metadata, layouts, and route-level caching",
    ],
    interview: [
      {
        q: "Server Components vs Client Components?",
        a: "Server Components render on the server, can access data and secrets directly, and ship no JavaScript. Client Components hydrate in the browser and can use state, effects, and browser APIs.",
      },
      {
        q: "Static vs dynamic rendering?",
        a: "Static routes render at build time (or on revalidation) and are served from cache. Dynamic routes render per request because they use request-time data such as cookies, headers, or uncached fetches.",
      },
    ],
    exercises: [
      "Build a blog with a list page, a dynamic post page, and per-post metadata.",
      "Add a loading.tsx skeleton and an error.tsx boundary to a route.",
    ],
    docs: [
      { label: "Next.js documentation", href: "https://nextjs.org/docs" },
      { label: "Next.js Learn", href: "https://nextjs.org/learn" },
    ],
    related: ["react", "seo", "web-performance"],
    projects: ["blog-interface", "multi-page-nextjs-app", "saas-dashboard"],
  },
  {
    slug: "vue",
    name: "Vue.js",
    domain: "frameworks",
    level: "Intermediate",
    summary: "A progressive framework with reactive state, single-file components, and an approachable template syntax.",
    what:
      "Vue is a JavaScript framework built around a reactivity system and HTML-based templates. Single-file components (.vue) hold template, script, and styles together.",
    why:
      "It can be adopted incrementally — from a script tag to a full app with Nuxt — and its templates feel familiar to people coming from HTML.",
    how:
      "ref() and reactive() wrap values in proxies that track which effects read them. When a value changes, Vue re-runs only the dependent render functions and patches the DOM.",
    prerequisites: ["html", "css", "javascript"],
    roadmap: [
      "Templates, directives, and mustache interpolation",
      "Reactivity with ref and reactive",
      "computed, watch, and lifecycle hooks",
      "Components: props, emits, and slots",
      "Single-file components and scoped styles",
      "Pinia for shared state and Vue Router for navigation",
      "Nuxt for SSR, file-based routing, and data fetching",
    ],
    concepts: ["Composition API: ref, reactive, computed, watch", "Template directives: v-if, v-for, v-model", "Single-file components", "Props and emits", "Pinia for state", "Nuxt for SSR"],
    examples: [
      {
        title: "Counter component",
        language: "vue",
        code: `<script setup>
import { ref, computed } from "vue";
const count = ref(0);
const double = computed(() => count.value * 2);
</script>

<template>
  <button @click="count++">Count: {{ count }}</button>
  <p>Double: {{ double }}</p>
</template>`,
        explanation: ["ref creates reactive state; computed derives from it and caches.", "In templates, refs are unwrapped automatically, so no .value is needed."],
      },
    ],
    advanced: [
      "shallowRef and markRaw opt large immutable payloads out of deep proxying, which is the usual fix for slow renders on big API responses.",
      "effectScope groups watchers and computed values created outside a component so they can be disposed together.",
      "defineAsyncComponent with <Suspense> gives per-route loading states while the chunk downloads.",
      "Custom directives (v-focus, v-click-outside) are the escape hatch for DOM behaviour that templates cannot express.",
      "Render functions and h() for components whose markup is genuinely data-driven, such as virtualised tables.",
      "<KeepAlive> with include/exclude preserves component state across route changes without leaking every visited view.",
    ],
    bestPractices: [
      "Use ref for primitives and reactive for object graphs, and never keep the same data in both.",
      "Derive values with computed instead of mirroring them into state and syncing with watch.",
      "Type the component contract with defineProps<Props>() and defineEmits<Emits>() rather than runtime objects.",
      "Restrict watch to side effects; use computed when you only need a new value.",
      "Emit events instead of mutating props — props are a one-way binding from parent to child.",
    ],
    mistakes: [
      "Destructuring a reactive object, which copies values and breaks the proxy link so updates stop.",
      "Forgetting .value in script, or adding it in the template where refs unwrap automatically.",
      "Mutating props directly instead of emitting an event to the owner.",
      "Using v-if and v-for on the same element, where v-if cannot see the loop variable.",
      "Reaching for Vuex in a new project; Pinia is the current official store.",
    ],
    performance: [
      "v-once and v-memo skip re-rendering subtrees whose inputs never change, which matters in long lists.",
      "shallowRef avoids proxying deeply nested objects that are replaced wholesale on each fetch.",
      "defineAsyncComponent keeps rarely visited routes out of the initial bundle.",
      "KeepAlive trades memory for instant back-navigation; cap it with max and include so it cannot grow forever.",
    ],
    useCases: [
      "Admin panels and internal tools built quickly by small teams",
      "Marketing sites and documentation generated with Nuxt",
      "Progressive enhancement: mount a Vue island inside an existing server-rendered page",
      "Design systems distributed as a typed component library with scoped styles",
    ],
    interview: [
      { q: "computed vs watch?", a: "computed derives a cached value from reactive sources and only recomputes when those sources change; watch runs side effects when sources change and is the right tool for imperative work such as fetching or logging." },
      {
        q: "Why does destructuring props or reactive state break reactivity?",
        a: "Reactivity lives in the proxy. Destructuring reads each property once at setup time and stores a plain value, so later mutations never reach that copy. Use props.x directly, or toRefs to keep a live link.",
      },
      {
        q: "ref vs reactive?",
        a: "ref wraps any value in an object with a .value getter and tracks it, which works for primitives and is unwrapped in templates. reactive returns a proxy of an object and cannot hold primitives or be reassigned without losing reactivity.",
      },
      {
        q: "What does <script setup> compile to?",
        a: "It is sugar for a setup() function: top-level bindings become template scope, imported components are registered automatically, and defineProps/defineEmits are compiled into options rather than runtime lookups.",
      },
    ],
    exercises: [
      "Rebuild the counter with reactive state, a computed total, and a watch that logs every change with old and new values.",
      "Create TodoList.vue with typed props, a typed emits contract, and a named slot for the empty state.",
      "Extract a useFetch(url) composable that returns data, error, and loading, and aborts the request on unmount.",
      "Add Pinia to a two-route app and keep a cart total consistent across navigation.",
    ],
    docs: [{ label: "Vue documentation", href: "https://vuejs.org/guide/introduction.html" }],
    related: ["react", "svelte"],
  },
  {
    slug: "angular",
    name: "Angular",
    domain: "frameworks",
    level: "Advanced",
    summary: "A batteries-included TypeScript framework with dependency injection, signals, routing, and forms.",
    what:
      "Angular is a full framework from Google: components, a router, forms, an HTTP client, dependency injection, testing tools, and a CLI, all in TypeScript.",
    why:
      "Large organisations value its strong conventions and the fact that most architectural decisions are already made for them.",
    how:
      "The compiler turns templates into instructions that create DOM nodes once and update only the bindings that changed. After events, timers, or signal writes, change detection walks the component tree and refreshes dirty components; zoneless apps schedule that walk from signal reads instead of patching browser APIs. Dependency injection resolves services from an injector hierarchy, so a root provider is a singleton while a route-level provider gets its own instance.",
    prerequisites: ["typescript", "html", "css"],
    roadmap: [
      "Components, templates, and bindings",
      "Standalone components and the CLI workflow",
      "Signals: signal, computed, effect",
      "Dependency injection and services",
      "Routing with lazy loadComponent",
      "Reactive forms and custom validators",
      "HttpClient with interceptors and RxJS operators",
      "Testing with TestBed and zoneless change detection",
    ],
    concepts: ["Standalone components", "Signals and computed", "Dependency injection and services", "Control flow (@if, @for)", "Reactive forms", "RxJS observables"],
    examples: [
      {
        title: "Standalone component with a signal",
        language: "ts",
        code: `import { Component, signal } from "@angular/core";

@Component({
  selector: "app-counter",
  template: \`<button (click)="increment()">Count: {{ count() }}</button>\`,
})
export class CounterComponent {
  count = signal(0);
  increment() {
    this.count.update((n) => n + 1);
  }
}`,
      },
    ],
    advanced: [
      "Zoneless change detection (provideZonelessChangeDetection) removes Zone.js, but anything outside a signal write must call markForCheck explicitly.",
      "inject() works only inside an injection context: a field initialiser, constructor, factory, or runInInjectionContext block.",
      "@defer blocks with on viewport / on interaction / when triggers give component-level lazy loading without a router.",
      "A custom ControlValueAccessor lets any component participate in reactive forms as if it were a native input.",
      "Signal inputs (input(), output(), model()) replace @Input/@Output and make the data flow visible to the compiler.",
      "Route-level providers and EnvironmentInjector.create allow services and components to be instantiated dynamically with their own lifetime.",
    ],
    bestPractices: [
      "Write standalone components with provideRouter; NgModules are legacy for new code.",
      "Use OnPush or signals so change detection only visits components whose inputs actually changed.",
      "Keep components presentational and move HTTP, caching, and business rules into injectable services.",
      "Tie long-lived subscriptions to the component with takeUntilDestroyed instead of manual unsubscribe bookkeeping.",
      "Lazy-load feature routes and heavy widgets so the initial bundle stays small.",
    ],
    mistakes: [
      "Calling methods in templates for derived values, which re-runs them on every change-detection cycle.",
      "Mutating an array in place under OnPush and expecting a re-render; replace the reference or use a signal.",
      "Subscribing in the component without unsubscribing, leaking the subscription for the life of the app.",
      "Assuming effect() replaces computed(); effects are for side effects, not for deriving state.",
      "Importing a component into declarations in a standalone app instead of its imports array.",
    ],
    performance: [
      "@defer keeps below-the-fold widgets out of the initial bundle until a trigger fires.",
      "OnPush plus signals reduces how many components are checked per cycle, which is the main lever on large apps.",
      "Track items in @for with track item.id so Angular reuses DOM nodes instead of recreating the list.",
      "Production builds enable AOT, tree-shaking, and build optimisation; a dev build can be several times larger.",
    ],
    useCases: [
      "Enterprise dashboards with long-lived teams and strict architectural conventions",
      "Internal tools where complex forms and validation dominate the UI",
      "Large multi-feature apps that need routing, DI, and HTTP out of the box",
      "Cross-platform apps shared with Ionic or Electron",
    ],
    interview: [
      {
        q: "How does Angular's change detection work?",
        a: "Angular walks the component tree and checks bindings for changes. Zone.js historically triggered that walk after any async task; a zoneless app schedules it from signal writes and explicit marks. OnPush components are skipped unless an input reference changes, an event fires inside them, or they are marked dirty.",
      },
      {
        q: "What problem do signals solve?",
        a: "They make state changes explicit and dependency-tracked, so Angular can schedule targeted updates instead of checking everything. computed caches derived values and effect runs side effects when its dependencies change.",
      },
      {
        q: "Standalone components vs NgModules?",
        a: "A standalone component declares its own imports and needs no module. Dependencies become visible at the file level, tree-shaking improves, and it is the default style in current Angular.",
      },
      {
        q: "Promise vs observable in Angular?",
        a: "A promise resolves once and cannot be cancelled. An observable is a cancellable stream that can emit many values; HttpClient returns cold observables, so the request only starts on subscribe and operators can retry, debounce, or combine it.",
      },
    ],
    exercises: [
      "Build a standalone counter with signal and computed, then convert an @Input to input().",
      "Create a ProductService using HttpClient, call it from an OnPush component, and render loading and error states.",
      "Add a reactive form with an async validator that rejects an already-registered email.",
      "Lazy-load a settings route with loadComponent and confirm a separate chunk in the build output.",
    ],
    docs: [{ label: "angular.dev", href: "https://angular.dev/overview" }],
    related: ["typescript", "react"],
  },
  {
    slug: "svelte",
    name: "Svelte & SvelteKit",
    domain: "frameworks",
    level: "Intermediate",
    summary: "A compiler-first framework with runes for reactivity, and SvelteKit for routing and server rendering.",
    what:
      "Svelte compiles components into efficient JavaScript that updates the DOM directly, without a virtual DOM. SvelteKit is its application framework with file-based routing, loaders, and SSR.",
    why:
      "Less boilerplate and small output bundles. Reactivity is explicit with runes ($state, $derived, $effect) in Svelte 5.",
    how:
      "Svelte is a compiler, not a runtime. It analyses each component and emits code that builds its DOM once, then updates only the text or attribute bound to a changed value. In Svelte 5 the runes ($state, $derived, $effect, $props) declare reactive sources, and the compiler wires each one to the smallest DOM operation that depends on it. SvelteKit layers a Vite-based router on top: a route folder maps to +page.svelte, a +page.server.ts load runs on the server, and form actions handle mutations.",
    prerequisites: ["html", "css", "javascript"],
    roadmap: [
      "Components, markup expressions, and scoped styles",
      "Runes: $state, $derived, $effect, $props",
      "Template blocks: {#if}, {#each}, {#await}, {#snippet}",
      "Events, bindings, and form handling",
      "SvelteKit routing, layouts, and load functions",
      "Form actions and progressive enhancement",
      "Adapters and deployment targets",
    ],
    concepts: ["Runes: $state, $derived, $effect, $props", "Template blocks: {#if}, {#each}", "SvelteKit routes: +page.svelte, +page.server.ts", "load functions", "Form actions"],
    examples: [
      {
        title: "Svelte 5 counter",
        language: "svelte",
        code: `<script>
  let count = $state(0);
  let double = $derived(count * 2);
</script>

<button onclick={() => count++}>Count: {count}</button>
<p>Double: {double}</p>`,
      },
    ],
    advanced: [
      "$state.raw and $state.snapshot skip deep proxying for large arrays or third-party objects you replace wholesale.",
      "Snippets with {@render} replace slots and let markup be passed as a value and reused without a wrapper component.",
      "$effect.pre runs before the DOM updates, and untrack() excludes a read from an effect's dependency set.",
      "use:enhance with a custom submit function enables optimistic updates and inline errors on form actions.",
      "+page.ts load versus +page.server.ts load: only the server file can touch secrets, cookies, or the database directly.",
      "$bindable() props and two-way binding with bind: keep parent and child in sync without event boilerplate.",
    ],
    bestPractices: [
      "Use $derived for computed values; do not mirror derived data into $state and keep two copies in sync.",
      "Keep $effect for work that touches the outside world, and avoid assigning state inside it.",
      "Return serialisable data from load; it is serialised and sent to the browser.",
      "Put secrets and database code in +page.server.ts or +server.ts, never in a universal load.",
      "Let scoped styles do the work and reach for :global() only for third-party markup.",
    ],
    mistakes: [
      "Writing derived state into $state and syncing it with an effect, which causes double renders and drift.",
      "Importing a server-only module into a component, breaking the build or leaking a secret.",
      "Using Svelte 4 syntax (on:click, export let) in a Svelte 5 project where onclick and $props are the current form.",
      "Forgetting {@render children()} after converting a slot-based layout to snippets, which silently drops content.",
      "Assuming a $state.raw array is reactive to push(); raw values only update on reassignment.",
    ],
    performance: [
      "There is no virtual DOM or diffing pass, so update cost scales with what actually changed, not with tree size.",
      "SvelteKit prerenders static routes when you export const prerender = true, serving plain HTML from a CDN.",
      "{#await} with a pending snippet keeps the shell visible while data loads instead of blocking the render.",
      "{#key} destroys and recreates a subtree, which is correct for a deliberate reset but expensive inside a list.",
    ],
    useCases: [
      "Content sites and blogs where prerendered HTML gives a fast first paint",
      "Dashboards that must stay responsive on low-end devices with small bundles",
      "Embeddable widgets mounted into an existing server-rendered page",
      "Forms that work without JavaScript through SvelteKit actions",
    ],
    interview: [
      {
        q: "How is Svelte different from React?",
        a: "React ships a runtime that diffs a virtual tree and re-runs components. Svelte compiles components into imperative DOM updates at build time, so there is no diffing step, components run once, and the runtime is tiny.",
      },
      {
        q: "What are runes?",
        a: "Compiler-recognised primitives that declare reactivity: $state for mutable state, $derived for computed values, $effect for side effects, and $props for inputs. They replace Svelte 4's implicit let reactivity and $: labels.",
      },
      {
        q: "Universal load vs server load?",
        a: "A universal load in +page.ts runs on the server during SSR and again in the browser. A +page.server.ts load always runs on the server, so it can read cookies, environment secrets, and the database.",
      },
      {
        q: "How do form actions work without JavaScript?",
        a: "The form posts to the page's actions object, the server runs the action and re-renders with the returned data. use:enhance upgrades the same markup to fetch-based submission when JavaScript is available.",
      },
    ],
    exercises: [
      "Build a filterable list with $state, $derived, and a keyed {#each} block.",
      "Convert a slot-based card layout to snippets with {@render} and confirm named content still renders.",
      "Create a SvelteKit route with a +page.server.ts load plus a form action that validates and inserts an item.",
      "Mark a static page with export const prerender = true and verify the build output contains HTML only.",
    ],
    docs: [
      { label: "Svelte docs", href: "https://svelte.dev/docs/svelte/overview" },
      { label: "SvelteKit docs", href: "https://svelte.dev/docs/kit/introduction" },
    ],
    related: ["vue", "react"],
  },
  {
    slug: "astro",
    name: "Astro",
    domain: "frameworks",
    level: "Intermediate",
    summary: "Content-first sites that ship zero JavaScript by default, with interactive islands from any framework.",
    what:
      "Astro is a web framework for content-heavy sites. Pages render to static HTML, and only components marked with a client: directive hydrate as interactive islands.",
    why:
      "Blogs, docs, and marketing sites rarely need a full client-side app. Astro keeps them fast while still letting you use React, Vue, or Svelte components where interactivity is needed.",
    how:
      "Astro runs each .astro file's frontmatter on the server or at build time, renders the template to an HTML string, and strips every component import unless the tag carries a client: directive. During astro build, routes are walked and emitted as static HTML, with a small module graph per page for the islands that need JavaScript. Each island hydrates independently, so two widgets boot separately instead of hydrating the whole document.",
    prerequisites: ["html", "css", "javascript"],
    roadmap: [
      "The .astro file: frontmatter, template, and scoped styles",
      "Components, props, and layouts with <slot />",
      "Content collections, schemas, and getCollection",
      "Adding the first interactive island with client:visible",
      "Rendering modes: static, server, and per-route overrides",
      "Deployment through an adapter",
    ],
    concepts: ["Islands architecture", "client:load, client:visible, client:idle", "Content collections", "Static and server output", "Framework integrations"],
    examples: [
      {
        title: "A page with one interactive island",
        language: "astro",
        code: `---
import Counter from "../components/Counter.jsx";
const posts = await Astro.glob("../posts/*.md");
---
<h1>Blog</h1>
<ul>{posts.map((p) => <li>{p.frontmatter.title}</li>)}</ul>
<Counter client:visible />`,
        explanation: ["Everything renders to HTML at build time.", "Only Counter ships JavaScript, and only when it scrolls into view.", "Note: Astro.glob was removed in Astro 5. Use getCollection with a content collection instead — see the next example."],
      },
      {
        title: "A blog index from a content collection",
        language: "astro",
        code: `---
import { getCollection } from "astro:content";
import Layout from "../layouts/Layout.astro";

const posts = (await getCollection("blog")).sort(
  (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime(),
);
---

<Layout title="Blog">
  <h1>Blog</h1>
  <ul>
    {posts.map((post) => (
      <li>
        <a href={"/blog/" + post.id + "/"}>{post.data.title}</a>
      </li>
    ))}
  </ul>
</Layout>`,
        explanation: [
          "Frontmatter runs at build time, so the file read happens once per build, not per visitor.",
          "getCollection returns every entry in the blog collection with validated frontmatter.",
          "Sorting on a Date field works because the collection schema coerced it during validation.",
          "The list is plain HTML: no JavaScript is shipped for this page at all.",
          "Layout provides the shared head tags and nav; the page supplies the slot content.",
        ],
      },
    ],
    advanced: [
      "client:only=\"react\" skips server rendering for components that touch window or a browser-only library at import time.",
      "Server islands (server:defer) stream a personalised fragment into an otherwise cached page.",
      "A Zod schema per collection makes a typo in frontmatter a build error rather than a blank page.",
      "export const prerender = false switches one route to on-demand rendering while the rest stay static.",
      "The ClientRouter enables view transitions and client-side navigation without turning the site into an SPA.",
      "Astro Actions give typed server functions that validate input with Zod and work progressively.",
    ],
    bestPractices: [
      "Start with zero client: directives and add one only where interactivity is genuinely required.",
      "Prefer client:visible or client:idle over client:load for anything below the fold.",
      "Define a content collection schema so malformed frontmatter fails the build.",
      "Share head tags, fonts, and nav through a layout instead of repeating them per page.",
      "Keep frontmatter lean — it runs at build time, and slow calls there slow every build.",
    ],
    mistakes: [
      "Sprinkling client:load everywhere and losing the zero-JS advantage that motivated using Astro.",
      "Using Astro.glob, which was removed in Astro 5; use getCollection or import.meta.glob.",
      "Passing a secret from frontmatter into an island's props, which serialises it into client HTML.",
      "Assuming page <script> tags bundle like a SPA; Astro hoists and deduplicates them, so shared helpers belong in a module.",
      "Expecting scoped styles to reach child components; use :global() or is:global deliberately.",
    ],
    performance: [
      "Default output is HTML with no framework runtime, so Time to Interactive is close to First Contentful Paint.",
      "client:visible defers an island's JavaScript until it enters the viewport, keeping the initial payload small.",
      "Astro emits per-page CSS and inlines small stylesheets instead of shipping one global bundle.",
      "server:defer streams slow fragments after the cached shell, so the page stays cacheable.",
    ],
    useCases: [
      "Marketing sites and landing pages that must pass Core Web Vitals",
      "Documentation and blogs with thousands of Markdown or MDX pages",
      "Storefront catalogues that are static but need a cart island",
      "Incremental migration of a React or Vue app one page at a time",
    ],
    interview: [
      {
        q: "What is an island?",
        a: "A self-contained interactive component embedded in otherwise static HTML. Each island hydrates on its own, so the page pays JavaScript cost only for the widgets that need it.",
      },
      {
        q: "How does Astro decide what ships JavaScript?",
        a: "Only a component with a client: directive is hydrated. Pages, layouts, and components without one render to HTML and contribute no component code to the bundle.",
      },
      {
        q: "Static vs server output?",
        a: "Static builds every route to HTML at build time. Server renders routes per request, which is required for auth, personalisation, or fresh data. Astro lets you mix both per route.",
      },
      {
        q: "How do you load Markdown content today?",
        a: "Define a collection in src/content.config.ts with a schema, then query it with getCollection. Astro.glob was removed in Astro 5.",
      },
    ],
    exercises: [
      "Build a blog index and post page from a blog content collection with a Zod schema.",
      "Add a search filter island with client:visible and confirm the rest of the page ships no JavaScript.",
      "Add ClientRouter plus a shared layout and verify navigation animates between pages.",
      "Switch one route to prerender = false and read a query parameter on the server.",
    ],
    docs: [{ label: "Astro docs", href: "https://docs.astro.build/" }],
    related: ["nextjs", "web-performance"],
  },
  {
    slug: "react-router",
    name: "React Router (framework mode) & Remix",
    domain: "frameworks",
    level: "Intermediate",
    summary: "Route modules with loaders, actions, and nested layouts — the Remix model, now part of React Router.",
    what:
      "React Router v7 can run as a full-stack framework (the successor to Remix): each route module exports a loader for data, an action for mutations, and a component.",
    why:
      "It embraces web fundamentals — HTML forms, HTTP caching, progressive enhancement — and keeps data loading next to the route that needs it.",
    how:
      "Every route is a module that can export loader (runs on the server before render and returns data), action (runs on POST/PUT/PATCH/DELETE), and a default component that reads the data with useLoaderData. Nested routes render into the parent's <Outlet />, and a navigation only runs the loaders of routes that actually changed — everything else keeps its data. <Form> submits a real HTML form, so mutations work before hydration and upgrade to fetch submissions once JavaScript loads.",
    prerequisites: ["react", "javascript", "html-modern-elements"],
    roadmap: [
      "Routes, nested layouts, and <Outlet />",
      "Loaders and useLoaderData",
      "Actions and <Form>",
      "Pending UI with useNavigation and useFetcher",
      "Route-level error boundaries",
      "Typed routes from react-router typegen",
      "Deployment: SPA mode, a Node server, or a platform preset",
    ],
    concepts: ["Route modules: loader, action, default component", "Nested routes and <Outlet>", "<Form> and progressive enhancement", "Pending UI", "SPA mode vs framework mode"],
    examples: [
      {
        title: "A route module with a loader, an action, and pending state",
        language: "ts",
        code: `// app/routes/projects.$projectId.tsx
import type { Route } from "./+types/projects.$projectId";
import { Form, redirect, useLoaderData, useNavigation } from "react-router";
import { db } from "~/lib/db.server";

export async function loader({ params }: Route.LoaderArgs) {
  const project = await db.project.findUnique({ where: { id: params.projectId } });
  if (!project) throw new Response("Not found", { status: 404 });
  return { project };
}

export async function action({ request, params }: Route.ActionArgs) {
  const form = await request.formData();
  const title = String(form.get("title") ?? "").trim();
  if (!title) return { error: "Title is required" };
  await db.project.update({ where: { id: params.projectId }, data: { title } });
  return redirect("/projects/" + params.projectId);
}

export default function ProjectRoute() {
  const { project } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const busy = navigation.state === "submitting";

  return (
    <Form method="post">
      <input name="title" defaultValue={project.title} aria-label="Project title" />
      <button disabled={busy}>{busy ? "Saving..." : "Save"}</button>
    </Form>
  );
}`,
        explanation: [
          "loader runs on the server before the component renders, so there is no loading flash and no useEffect fetch.",
          "Typing loader and action with Route.LoaderArgs / Route.ActionArgs comes from react-router typegen.",
          "Throwing a Response is how a loader returns a 404; the nearest ErrorBoundary renders it.",
          "action reads FormData from the real request, validates on the server, and returns field errors.",
          "redirect() ends the action by navigating, and the router re-runs loaders for the new location.",
          "<Form> renders a real form element, so the same flow works with JavaScript disabled.",
          "useNavigation().state is \"submitting\" while the action is in flight, which drives the disabled button.",
        ],
      },
    ],
    advanced: [
      "useFetcher runs a loader or action without navigating, which is the right tool for inline likes, autosave, and search suggestions.",
      "shouldRevalidate stops a loader from re-running on navigations where its data cannot have changed.",
      "clientLoader with hydrate lets cached server data paint instantly and then refresh in the browser.",
      "defer plus <Await> streams slow, non-critical data after the main render instead of blocking the route.",
      "Export headers and middleware per route for cache-control and auth checks that must happen before the loader.",
      "useRevalidator and revalidation keys force a targeted refresh after an out-of-band mutation.",
    ],
    bestPractices: [
      "Load data in loaders; do not duplicate the fetch in a useEffect.",
      "Authorise and validate inside loaders and actions — the client is never a trust boundary.",
      "Return only what the component needs; loader output is serialised over the wire.",
      "Use <Form> rather than onSubmit plus fetch so the mutation works before hydration.",
      "Let the router revalidate after an action instead of manually refetching in the component.",
    ],
    mistakes: [
      "Calling useLoaderData in a component that is not rendered under the matching route.",
      "Returning a Response from a loader and then treating its type as a plain object.",
      "Throwing for expected validation failures instead of returning errors from the action to render inline.",
      "Redirecting with window.location, which loses router state; use redirect() instead.",
      "Putting secrets or server-only imports in clientLoader, which runs in the browser.",
    ],
    performance: [
      "Nested routes only run the loader of the changed segment, so parent data is fetched once per session rather than per navigation.",
      "Each route module is its own chunk, so code splitting follows the route tree automatically.",
      "shouldRevalidate avoids refetching a list when only an unrelated search param changed.",
      "defer plus <Await> keeps the shell interactive while slow data streams in.",
    ],
    useCases: [
      "CRUD dashboards where every screen is a form plus a table",
      "Internal tools that must keep working on browsers with JavaScript disabled",
      "Multi-tenant SaaS where loaders scope every query by the authenticated session",
      "Migrating a Remix app, which now runs on React Router v7",
    ],
    interview: [
      {
        q: "Why loaders instead of useEffect?",
        a: "Loaders run before the route renders, so there is no loading flash or request waterfall from child components. They run on the server, can query the database directly, and their results stay cached in the router until a navigation or action invalidates them.",
      },
      {
        q: "How does progressive enhancement work here?",
        a: "<Form> renders a real <form>. Without JavaScript the browser posts to the server, the action runs, and a full HTML document is returned. With JavaScript the router intercepts the submit and performs the same action plus revalidation without a page reload.",
      },
      {
        q: "loader vs clientLoader?",
        a: "A loader runs on the server during SSR and navigation. A clientLoader runs in the browser, for data that must come from a browser-held credential or an external API.",
      },
      {
        q: "How does revalidation work after a mutation?",
        a: "When an action completes, the router re-runs the loaders of every active route. shouldRevalidate can opt individual routes out so unnecessary work is skipped.",
      },
    ],
    exercises: [
      "Build a contacts list with a nested detail route and a loader per route.",
      "Add a create form whose action validates server-side and returns field-level errors.",
      "Use useFetcher for a favourite toggle that updates without navigating.",
      "Add shouldRevalidate so changing a sidebar filter does not refetch the contact list.",
    ],
    docs: [{ label: "React Router docs", href: "https://reactrouter.com/home" }],
    related: ["react", "nextjs"],
  },
  {
    slug: "solidjs",
    name: "SolidJS",
    domain: "frameworks",
    level: "Advanced",
    summary: "Fine-grained reactivity with signals and JSX — components run once, and only the bindings update.",
    what:
      "SolidJS uses JSX like React but compiles it to real DOM nodes wired to signals. Component functions run once; only the expressions that read a signal update when it changes.",
    why:
      "Very fast updates and a small runtime. It is also a clear way to learn signals, the reactivity model many frameworks have since adopted.",
    how:
      "The compiler turns each JSX expression into an effect that creates or updates a specific DOM node. createSignal returns a getter and a setter; reading the getter inside a computation subscribes that computation to the signal. When the setter runs, Solid re-executes only the computations that read it and patches the exact text node or attribute — there is no component re-render and no tree diff.",
    prerequisites: ["javascript", "typescript"],
    roadmap: [
      "JSX and components that run once",
      "createSignal and createMemo",
      "createEffect and what tracking scope means",
      "Control flow: <Show>, <For>, <Switch>",
      "createStore for nested state",
      "Context and createResource for async data",
      "Solid Router and SolidStart for SSR",
    ],
    concepts: ["createSignal, createMemo, createEffect", "Components run once", "Control flow components: <Show>, <For>", "Stores"],
    examples: [
      {
        title: "A filterable list with fine-grained updates",
        language: "jsx",
        code: `import { createSignal, createMemo, For, Show } from "solid-js";

const initial = [
  { id: 1, title: "Learn signals", done: true },
  { id: 2, title: "Understand memos", done: false },
  { id: 3, title: "Try stores", done: false },
];

export default function App() {
  const [tasks, setTasks] = createSignal(initial);
  const [query, setQuery] = createSignal("");

  const visible = createMemo(() =>
    tasks().filter((task) => task.title.toLowerCase().includes(query().toLowerCase())),
  );
  const remaining = createMemo(() => tasks().filter((task) => !task.done).length);

  const toggle = (id) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  return (
    <main style={{ "font-family": "system-ui", padding: "16px" }}>
      <h1>Tasks ({remaining()} left)</h1>
      <input
        placeholder="Filter"
        value={query()}
        onInput={(event) => setQuery(event.currentTarget.value)}
      />
      <ul>
        <For each={visible()}>
          {(task) => (
            <li>
              <label>
                <input type="checkbox" checked={task.done} onChange={() => toggle(task.id)} />
                {task.title}
              </label>
            </li>
          )}
        </For>
      </ul>
      <Show when={visible().length === 0}>
        <p>No tasks match that filter.</p>
      </Show>
    </main>
  );
}`,
        explanation: [
          "The component body runs exactly once; nothing above re-executes when state changes.",
          "Reading tasks() inside createMemo subscribes the memo to that signal, so it recomputes only on change.",
          "remaining() and visible() are cached derivations, not values recomputed on every render.",
          "<For> keys rows by item identity, so only the row whose object changed gets updated.",
          "JSX attribute expressions are compiled into effects, which is why unchecked() renders as a live binding.",
          "Solid uses onInput rather than onChange for text inputs because it maps to the native event model.",
        ],
      },
    ],
    advanced: [
      "on() and untrack() control exactly which reads an effect depends on, which prevents accidental re-runs.",
      "createSelector turns per-row selection checks into one subscription instead of one per row.",
      "batch() groups several writes so dependents see a single consistent update.",
      "solid-js/store's produce and path setters update nested state without cloning the whole object.",
      "createResource with Suspense and ErrorBoundary is the idiomatic async data path.",
      "Server functions in SolidStart (\"use server\") let a client event call server code with an RPC boundary.",
    ],
    bestPractices: [
      "Never destructure props; access props.x where it is used so the getter stays live.",
      "Use createMemo for derivations read in several places, not createEffect that writes another signal.",
      "Render lists with <For> instead of map() so Solid can reuse rows.",
      "Create all reactive primitives unconditionally, at the top level of the component.",
      "Wrap related writes in batch() when they should notify once.",
    ],
    mistakes: [
      "Destructuring props (const { name } = props), which copies a value once and stops updating.",
      "Expecting the component function to re-run like React and putting logic that must repeat in the body.",
      "Creating signals or effects inside conditionals or loops, breaking the stable ordering primitives rely on.",
      "Using map() in JSX, which recreates every row on any change.",
      "Reading a signal inside untrack() and then wondering why the effect never reacts.",
    ],
    performance: [
      "Updates touch only the DOM nodes bound to the changed signal, so cost scales with the change, not the component tree.",
      "createSelector makes list selection O(1) instead of one subscription per row.",
      "batch() collapses multiple writes into one update pass, avoiding intermediate recomputes.",
      "The runtime is only a few kilobytes because the compiler emits direct DOM operations instead of a diffing layer.",
    ],
    useCases: [
      "Data-dense dashboards that update frequently and must stay responsive",
      "Apps for low-end devices where bundle size and update cost both matter",
      "Interactive widgets embedded in otherwise static pages",
      "Learning signals before using them in Angular or Vue",
    ],
    interview: [
      {
        q: "How is Solid different from React?",
        a: "Solid compiles JSX to real DOM operations and tracks dependencies with signals at runtime. Components run once and only the expressions reading a changed signal re-execute. React re-runs the component and diffs a virtual tree.",
      },
      {
        q: "Signal vs memo vs effect?",
        a: "A signal is writable reactive state. A memo is a cached derivation that recomputes only when its dependencies change. An effect runs a side effect after the reactive graph settles, and is not the place to derive state.",
      },
      {
        q: "Why can't you destructure props?",
        a: "Props are a proxy that reads lazily. Destructuring copies the current value at setup time, so later updates never reach the component.",
      },
      {
        q: "What does <For> add over map()?",
        a: "<For> keys rows by item reference and only creates or disposes the rows that changed. map() rebuilds the whole list whenever the array changes.",
      },
    ],
    exercises: [
      "Build a filterable list with createSignal and createMemo, and confirm the component body logs only once.",
      "Refactor a map() list to <For> and verify only the toggled row updates.",
      "Add a createStore cart with nested quantities and update it with produce.",
      "Load data with createResource and render it inside Suspense with an ErrorBoundary fallback.",
    ],
    docs: [{ label: "SolidJS docs", href: "https://docs.solidjs.com/" }],
    related: ["react", "svelte"],
  },
];
