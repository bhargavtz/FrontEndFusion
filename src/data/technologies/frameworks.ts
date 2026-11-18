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
    interview: [{ q: "computed vs watch?", a: "computed derives a cached value from reactive sources; watch runs side effects when sources change." }],
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
        explanation: ["Everything renders to HTML at build time.", "Only Counter ships JavaScript, and only when it scrolls into view."],
      },
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
    concepts: ["Route modules: loader, action, default component", "Nested routes and <Outlet>", "<Form> and progressive enhancement", "Pending UI", "SPA mode vs framework mode"],
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
    concepts: ["createSignal, createMemo, createEffect", "Components run once", "Control flow components: <Show>, <For>", "Stores"],
    docs: [{ label: "SolidJS docs", href: "https://docs.solidjs.com/" }],
    related: ["react", "svelte"],
  },
];
