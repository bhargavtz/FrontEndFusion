import type { Technology } from "./types";

export const architecture: Technology[] = [
  {
    slug: "component-architecture",
    name: "Component Architecture",
    domain: "architecture",
    level: "Advanced",
    featured: true,
    summary: "Folder structure, composition patterns, reusable components, and boundaries that scale.",
    what:
      "Component architecture is how you split UI into components, where those components live, how they communicate, and which ones may depend on which.",
    why:
      "Small apps survive any structure. Growing apps slow down when every change touches ten files and nobody knows where code belongs.",
    how:
      "Group code by feature rather than by file type, keep generic UI primitives separate from product features, and make data flow one way: data down through props, events up through callbacks. Composition (children, slots) beats configuration (dozens of boolean props).",
    prerequisites: ["react"],
    roadmap: [
      "Components, props, and local state in one file",
      "Composition with children and slots instead of boolean props",
      "Custom hooks for shared behaviour",
      "UI primitives split from feature code",
      "Feature folders with colocated hooks, API calls, and tests, with dependency direction enforced by lint rules",
    ],
    concepts: [
      "Feature-based folders (features/cart, features/auth)",
      "UI primitives vs feature components vs pages",
      "Composition over configuration",
      "Container/presentational split and custom hooks",
      "Compound components",
      "Colocation of styles, tests, and stories",
      "Dependency direction: features may import ui, not the reverse",
    ],
    examples: [
      {
        title: "Feature-based structure",
        language: "text",
        code: `src/
├── app/                 # routes (Next.js) — thin, compose features
├── components/ui/       # Button, Dialog, Input — no business logic
├── features/
│   ├── cart/
│   │   ├── cart-drawer.tsx
│   │   ├── use-cart.ts
│   │   ├── cart.api.ts
│   │   └── cart.test.tsx
│   └── auth/
├── lib/                 # framework-agnostic helpers
└── styles/`,
        explanation: ["Routes compose features; features compose UI primitives.", "Everything a feature needs lives together, so deleting a feature is deleting a folder."],
      },
      {
        title: "Compound components instead of boolean props",
        language: "tsx",
        code: `import { createContext, useContext, useState, type ReactNode } from "react";

type TabsValue = { value: string; setValue: (next: string) => void };
const TabsContext = createContext<TabsValue | null>(null);

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsList and TabsPanel must live inside Tabs");
  return context;
}

function Tabs({ defaultTab, children }: { defaultTab: string; children: ReactNode }) {
  const [value, setValue] = useState(defaultTab);
  return <TabsContext.Provider value={{ value, setValue }}>{children}</TabsContext.Provider>;
}

function TabsList({ tabs }: { tabs: string[] }) {
  const { value, setValue } = useTabs();
  return (
    <div role="tablist" style={{ display: "flex", gap: 6, marginBottom: 10 }}>
      {tabs.map((tab) => (
        <button key={tab} role="tab" aria-selected={value === tab} onClick={() => setValue(tab)}
          style={{ padding: "6px 12px", borderRadius: 999, border: "1px solid #cbd5e1",
            background: value === tab ? "#0f172a" : "transparent",
            color: value === tab ? "#fff" : "#0f172a" }}>
          {tab}
        </button>
      ))}
    </div>
  );
}

function TabsPanel({ name, children }: { name: string; children: ReactNode }) {
  const { value } = useTabs();
  return value === name ? <section role="tabpanel">{children}</section> : null;
}

export default function App() {
  return (
    <main style={{ fontFamily: "system-ui", padding: 16 }}>
      <Tabs defaultTab="Overview">
        <TabsList tabs={["Overview", "Billing", "Team"]} />
        <TabsPanel name="Overview">12,480 requests this month.</TabsPanel>
        <TabsPanel name="Billing">Next invoice: $49 on 1 Dec.</TabsPanel>
        <TabsPanel name="Team">3 members, 2 pending invites.</TabsPanel>
      </Tabs>
    </main>
  );
}`,
        explanation: [
          "The parent owns the only piece of state; children read it through context instead of receiving four props each.",
          "useTabs throws when a child renders outside Tabs, turning a silent layout bug into a clear error message.",
          "Call sites read as markup — Tabs > TabsList + TabsPanel — with no isDark, isBordered, or isCompact prop explosion.",
          "Adding a fourth tab touches the call site only; the components do not change.",
        ],
      },
    ],
    advanced: [
      "Render props and slots for behaviour reuse where a hook cannot carry the markup.",
      "Compound components that share implicit state through context, with a parent/child invariant enforced at runtime.",
      "Headless components: all behaviour in a hook, all markup owned by the consumer.",
      "Server/Client boundaries as an architectural seam — push \"use client\" down to the leaves that need state.",
      "Import boundaries enforced mechanically (import/no-restricted-paths) so the folder rule is not a convention people remember.",
    ],
    bestPractices: ["Accept children instead of adding more props.", "Keep components small enough to describe in one sentence.", "Extract custom hooks for reusable logic, not for every component."],
    mistakes: ["Premature abstraction: a generic component with 20 boolean props.", "Prop drilling through five layers instead of composing or using context.", "A components/ folder that mixes buttons with checkout logic, so nothing can be reused or deleted.", "Barrel re-exports from every folder, which hides cycles and slows dev startup.", "Feature code importing from another feature's internals instead of its public entry point."],
    performance: [
      "Keep \"use client\" at the leaves; every boundary above it turns server-rendered markup into shipped JavaScript.",
      "Deep-import (features/cart/cart-drawer) instead of barrel files — barrels defeat tree-shaking and make dev-server cold starts slower.",
      "Split at route or section granularity with dynamic import, not per component, so the network stays efficient.",
      "Memoise measured hot leaves only; wrapping every component adds comparison cost and hides real re-render sources.",
    ],
    useCases: ["Multi-team SaaS dashboard where each feature owns its folder and tests.", "A design system consumed by several apps from one ui/ layer.", "E-commerce with catalog, cart, and checkout as independent features.", "Admin console with role-based route groups composing the same primitives."],
    interview: [
      { q: "How would you structure a large React app?", a: "Feature folders with colocated components, hooks, API calls, and tests; a shared ui layer of primitives; thin route files; and a rule that dependencies only point inward toward shared code." },
      { q: "When is a prop the wrong answer?", a: "When the parent is passing markup, layout, or behaviour it does not own — pass children or a render function instead. Props should describe what a component is, not every variation of how it looks." },
      { q: "How do you keep boundaries from eroding?", a: "Encode them as lint rules and CI checks, keep a single public entry file per feature, and review imports in pull requests. Conventions that rely on memory erode within a quarter." },
    ],
    exercises: [
      "Refactor a flat components/ folder into features/ plus components/ui/ and list every import whose direction changed.",
      "Replace a component with eight boolean props with a compound API (Tabs, TabsList, TabsPanel) and compare the call sites.",
      "Add an ESLint boundary rule forbidding components/ui from importing features/*, then prove it fails on a deliberate violation.",
      "Move a \"use client\" boundary down two levels and record the JavaScript delta in the build output.",
    ],
    docs: [
      { label: "react.dev — Thinking in React", href: "https://react.dev/learn/thinking-in-react" },
      { label: "Bulletproof React", href: "https://github.com/alan2207/bulletproof-react" },
    ],
    guides: ["best-practices"],
    related: ["state-management", "design-systems"],
    projects: ["saas-dashboard", "design-system-build"],
  },
  {
    slug: "state-management",
    name: "State Management: Redux & Zustand",
    domain: "architecture",
    level: "Advanced",
    summary: "Local, shared, server, and URL state — and when a global store is actually needed.",
    what:
      "State management is deciding where each piece of state lives and how components read and update it. Libraries like Redux Toolkit and Zustand provide global client-side stores.",
    why:
      "Most state bugs come from storing the same data in two places. Classifying state — local UI, shared client, server cache, URL — tells you the right tool for each.",
    how:
      "Local state lives in components. Server data belongs in a cache such as TanStack Query. Filters and pagination often belong in the URL. A global store is for genuinely shared client state: an editor document, a cart, user preferences. Zustand is a small hook-based store; Redux Toolkit adds conventions, DevTools time travel, and middleware.",
    prerequisites: ["react", "javascript"],
    roadmap: [
      "Classify state: local, shared client, server cache, URL",
      "useState, useReducer, and lifting state to the closest common parent",
      "Context for low-frequency shared values",
      "A Zustand store with actions, selectors, and middleware",
      "Redux Toolkit when you need conventions and time travel",
    ],
    concepts: ["Local vs global vs server vs URL state", "Derived state", "Selectors and subscriptions", "Immutability", "Redux Toolkit slices", "Zustand stores", "Context for low-frequency values"],
    examples: [
      {
        title: "A Zustand cart store",
        language: "ts",
        code: `import { create } from "zustand";

type Item = { id: string; price: number; qty: number };
type CartState = {
  items: Item[];
  add: (item: Omit<Item, "qty">) => void;
  remove: (id: string) => void;
};

export const useCart = create<CartState>((set) => ({
  items: [],
  add: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      return {
        items: existing
          ? state.items.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
          : [...state.items, { ...item, qty: 1 }],
      };
    }),
  remove: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
}));

// In a component, select only what you need:
// const count = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));`,
        explanation: ["The store holds state and the actions that change it.", "Updates return new arrays — state is treated as immutable.", "Selecting a slice means the component re-renders only when that slice changes."],
      },
      {
        title: "View state in the URL instead of a store",
        language: "js",
        code: `const app = document.getElementById("app");
app.style.cssText = "font-family:system-ui;padding:16px";

const tabs = ["All", "Shoes", "Bags"];
const data = {
  All: ["Runner", "Sneaker", "Tote", "Weekender"],
  Shoes: ["Runner", "Sneaker"],
  Bags: ["Tote", "Weekender"],
};

function currentTab() {
  const hash = location.hash.replace("#", "");
  return tabs.includes(hash) ? hash : "All";
}

function render() {
  const active = currentTab();
  app.innerHTML = \`
    <div role="tablist" style="display:flex;gap:8px;margin-bottom:12px">
      \${tabs
        .map(
          (tab) => \`<button role="tab" data-tab="\${tab}" aria-selected="\${tab === active}"
             style="padding:6px 12px;border-radius:999px;border:1px solid #cbd5e1;
             background:\${tab === active ? "#0f172a" : "transparent"};
             color:\${tab === active ? "#fff" : "#0f172a"}">\${tab}</button>\`,
        )
        .join("")}
    </div>
    <ul>\${data[active].map((item) => \`<li>\${item}</li>\`).join("")}</ul>
    <p style="color:#64748b;font-size:13px">Bookmarkable: \${location.pathname}\${location.hash}</p>
  \`;

  app.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      location.hash = button.dataset.tab === "All" ? "" : button.dataset.tab;
    });
  });
}

addEventListener("hashchange", render);
render();`,
        explanation: [
          "The selected tab is read from the URL, so refresh, back, and a shared link all restore the same view.",
          "Nothing here needs a global store: there is exactly one source of truth and it lives in the address bar.",
          "Changing the hash pushes a history entry, so Back returns to the previous tab for free.",
          "In a real router this is searchParams (?tab=shoes), which is indexable and easier to read than a hash.",
        ],
      },
    ],
    advanced: [
      "Selector subscriptions: compare with shallow equality or structural sharing, and export a useShallow selector instead of returning fresh objects.",
      "Transient updates — subscribe outside React and write to a ref or DOM node — for high-frequency values like cursor position or scroll.",
      "Normalised entities (byId + allIds) so one update touches one record instead of duplicating it across nested objects.",
      "Middleware that turns actions into a command log, which gives undo/redo, replay, and persistence from the same stream.",
      "Split context by read and write (state context vs dispatch context) so components that only dispatch never re-render, and use useSyncExternalStore when binding a non-React store.",
    ],
    bestPractices: ["Put server data in a server-state cache, not a global store.", "Store the minimum; derive the rest.", "Keep shareable view state (filters, tabs, pages) in the URL."],
    mistakes: ["Copying API responses into Redux and re-implementing caching.", "Using one giant context that re-renders the whole app.", "Deriving values with an effect that writes them back into state, so one change causes two renders and a possible loop.", "Selecting the whole store in every component, then blaming the library for re-renders.", "Persisting the full store to localStorage on every keystroke."],
    performance: [
      "One selector per component returning the smallest value it needs; a selector that builds a new object re-renders on every store change.",
      "Keep large server payloads out of the store so DevTools snapshots, persistence writes, and memory stay small.",
      "Persist only a whitelisted slice (partialize) — serialising the whole store synchronously blocks the main thread.",
      "Batch related updates into one action; React 18 batches inside event handlers, but not across separate awaits.",
    ],
    useCases: ["Cart shared by the header badge, drawer, and checkout page.", "A multi-step wizard holding draft state across steps before submit.", "An editor where toolbar, sidebar, and canvas share selection and undo history.", "Theme, density, and locale preferences applied app-wide."],
    interview: [{ q: "When would you introduce Redux or Zustand?", a: "When client-only state is shared across distant parts of the tree and updated often, and context would cause excess re-renders or prop drilling — not for server data." },
      { q: "Why is a global store a bad place for API data?", a: "A store gives you a value, not freshness. A server-state cache handles staleness, deduplication, retries, background refetch, and invalidation; re-implementing those is where bugs come from." },
      { q: "How does Zustand avoid re-render storms?", a: "Components subscribe through a selector and are notified only when the selected value changes by reference. Returning a new object from the selector defeats that unless you compare shallowly." },
      { q: "What belongs in the URL instead of state?", a: "Anything the user would expect to share, bookmark, or reach with the back button: filters, sort, search term, page, selected tab, and resource ids." },
    ],
    exercises: [
      "Build a cart store with selectors for item count and total, and prove only the badge re-renders when an item is added.",
      "Move filter and page state out of a store into search params and keep the store for the cart only.",
      "Add undo/redo to a Zustand store with a bounded history stack and a Cmd+Z shortcut.",
      "Replace a store slice that holds fetched users with TanStack Query, then delete the slice and its loading flags.",
    ],
    docs: [
      { label: "Redux Toolkit", href: "https://redux-toolkit.js.org/introduction/getting-started" },
      { label: "Zustand", href: "https://zustand.docs.pmnd.rs/getting-started/introduction" },
    ],
    related: ["tanstack-query", "react"],
  },
  {
    slug: "tanstack-query",
    name: "Data Fetching & TanStack Query",
    domain: "architecture",
    level: "Intermediate",
    summary: "Calling APIs from the frontend: caching, loading and error states, mutations, and invalidation.",
    what:
      "TanStack Query is a server-state library: it fetches, caches, deduplicates, and refreshes remote data, and manages mutations and cache invalidation.",
    why:
      "Hand-written useEffect fetching rarely handles race conditions, caching, retries, refetch on focus, or stale data. A server-state cache does, with a small API.",
    how:
      "Each query has a key (for example [\"todos\", filter]). Components using the same key share one cache entry. Data is considered stale after staleTime and refetched in the background; mutations invalidate keys to trigger refetches.",
    prerequisites: ["react", "async-javascript"],
    roadmap: [
      "Query keys and a typed queryFn",
      "Loading, error, and empty states; staleTime and refetch triggers",
      "Mutations and invalidateQueries",
      "Optimistic updates with rollback",
      "Pagination, infinite queries, prefetching, and SSR hydration",
    ],
    concepts: ["Query keys", "staleTime vs gcTime", "Loading, error, and success states", "Mutations and invalidation", "Optimistic updates", "Prefetching", "Typed API clients"],
    examples: [
      {
        title: "Query and mutation",
        language: "tsx",
        code: `import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type Todo = { id: number; title: string };

async function getTodos(): Promise<Todo[]> {
  const res = await fetch("/api/todos");
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  return res.json();
}

export function Todos() {
  const queryClient = useQueryClient();
  const { data, isPending, error } = useQuery({ queryKey: ["todos"], queryFn: getTodos });

  const addTodo = useMutation({
    mutationFn: (title: string) =>
      fetch("/api/todos", { method: "POST", body: JSON.stringify({ title }) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  if (isPending) return <p>Loading…</p>;
  if (error) return <p role="alert">Could not load todos.</p>;
  return (
    <>
      <ul>{data.map((t) => <li key={t.id}>{t.title}</li>)}</ul>
      <button onClick={() => addTodo.mutate("New todo")}>Add</button>
    </>
  );
}`,
      },
    ],
    bestPractices: ["Throw on non-OK responses so error states trigger.", "Build query keys from every variable the query depends on.", "Validate API responses at the boundary."],
    advanced: [
      "Optimistic updates: cancel in-flight queries, snapshot the cache in onMutate, patch it, then roll back from the context in onError and invalidate in onSettled.",
      "Query key factories (todoKeys.list(filter), todoKeys.detail(id)) so invalidation can target a family of keys precisely.",
      "Hydration: prefetch on the server, dehydrate the cache into the HTML, and rehydrate on the client with the same keys so there is no refetch flash.",
      "select to subscribe to a derived slice, and structuralSharing: false when the payload is large and already immutable.",
      "Dependent queries gated with enabled, plus parallel useQueries for variable-length lists and keepPreviousData for paginated tables.",
    ],
    mistakes: [
      "Building the query key from a new object or array literal each render, so the cache never hits.",
      "Returning undefined from queryFn by forgetting to return the fetch promise.",
      "Fetching the same data in useEffect and useQuery, creating two sources of truth.",
      "Setting a global staleTime of Infinity and then debugging why nothing updates.",
      "Invalidating every key with a bare invalidateQueries() after one small mutation.",
    ],
    performance: [
      "Set staleTime per resource instead of leaving the default 0, which refetches on every mount and window focus.",
      "Prefetch on hover or route intent so navigation does not wait on the network.",
      "Keep gcTime short for rare keys so large payloads are garbage-collected instead of held for the session.",
      "Use select for derived data so a large payload does not re-render consumers that only need one field.",
    ],
    useCases: [
      "Dashboard tiles that each refresh on their own cadence.",
      "Debounced search with keepPreviousData to avoid flicker.",
      "Infinite-scroll feed built on useInfiniteQuery.",
      "Admin tables with optimistic row edits and rollback on server rejection.",
    ],
    interview: [
      { q: "What is the difference between staleTime and gcTime?", a: "staleTime is how long data is considered fresh, so no refetch happens. gcTime is how long an unused cache entry is kept in memory after its last subscriber unmounts. They are independent." },
      { q: "How do you make a mutation feel instant?", a: "Cancel in-flight queries for that key, snapshot the cache, write the optimistic value, return the snapshot as context, restore it in onError, and invalidate the key in onSettled so the server value wins." },
      { q: "Why not fetch in useEffect?", a: "You would have to re-implement deduplication, caching, cancellation, retries, and stale-while-revalidate — and you would still race between components that mount at the same time." },
    ],
    exercises: [
      "Add a paginated table and keep the previous page visible while the next loads.",
      "Implement an optimistic toggle with rollback and prove it restores on a forced 500.",
      "Extract a query key factory and use it to invalidate only one list variant.",
      "Prefetch a detail query when a row is hovered, and verify with DevTools that no request fires on click.",
    ],
    docs: [{ label: "TanStack Query", href: "https://tanstack.com/query/latest/docs/framework/react/overview" }],
    guides: ["js-fetch", "js-ajax"],
    related: ["state-management", "async-javascript"],
    projects: ["weather-interface", "admin-dashboard"],
  },
  {
    slug: "forms-validation",
    name: "Forms & Validation",
    domain: "architecture",
    level: "Intermediate",
    summary: "Accessible forms, client and server validation, React Hook Form, and schema validation with Zod.",
    what:
      "Form handling covers collecting input, validating it, showing errors accessibly, submitting it, and handling server responses.",
    why:
      "Forms are where users give you data and where most UX and accessibility bugs live. Validation must be duplicated on the server anyway, so a shared schema saves effort.",
    how:
      "Every field has a value, a validity state, and a message. Native constraint validation (required, type, pattern, min, maxlength) computes validity for free: checkValidity() and input.validity expose it to script, and setCustomValidity lets you add rules the browser cannot express. In React, controlled inputs keep values in state, while React Hook Form keeps them in the DOM and re-renders only the fields that show errors. A schema (Zod or Valibot) parses the whole object once on submit and returns typed data or a field-keyed error map — the same schema runs again on the server.",
    prerequisites: ["html", "accessibility", "react"],
    roadmap: [
      "Labels, input types, and autocomplete attributes",
      "Native constraint validation and checkValidity",
      "Accessible error messages and focus management",
      "Controlled inputs in React, then React Hook Form with a resolver",
      "Zod schemas shared with the server; async and multi-step validation",
    ],
    concepts: ["Native constraint validation", "Accessible errors with aria-describedby and aria-invalid", "React Hook Form", "Zod schemas and type inference", "Server-side validation", "Pending and success states"],
    examples: [
      {
        title: "Native validation with accessible errors",
        language: "html",
        code: `<form id="signup" novalidate>
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required aria-describedby="email-error" />
  <p id="email-error" role="alert" style="color:#b91c1c"></p>
  <button>Sign up</button>
</form>
<script>
  const form = document.getElementById('signup');
  const email = document.getElementById('email');
  const error = document.getElementById('email-error');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!email.checkValidity()) {
      email.setAttribute('aria-invalid', 'true');
      error.textContent = email.validity.valueMissing ? 'Email is required.' : 'Enter a valid email.';
      email.focus();
      return;
    }
    email.removeAttribute('aria-invalid');
    error.textContent = '';
    form.innerHTML = '<p>Thanks — check your inbox.</p>';
  });
</script>`,
        explanation: ["novalidate turns off browser bubbles so we can show our own messages.", "checkValidity() still uses the native rules from type=email and required.", "aria-describedby connects the error text to the field; aria-invalid marks it invalid.", "Focus moves to the first invalid field."],
      },
    ],
    bestPractices: ["Validate on submit, then on change for fields already in error.", "Never rely on client validation alone.", "Keep labels visible; do not use placeholders as labels."],
    advanced: [
      "Async validation with a request id: keep only the latest result, abort the previous request, and show a \"checking\" state so a slow response cannot overwrite a newer one.",
      "Schema composition — base schema plus .pick()/.extend() per step — so a multi-step wizard validates each step and the whole object on submit.",
      "Discriminated unions for forms whose fields depend on a type selector; parse with a discriminant so TypeScript narrows the field set.",
      "Field arrays with stable keys (useFieldArray) so reordering does not lose focus, values, or error state.",
      "Draft preservation: keep form state in session storage or a store keyed by resource id so a failed submit or an auth redirect does not lose input.",
    ],
    mistakes: [
      "Using the placeholder as the only label, so screen readers and autofill lose the field name.",
      "Showing errors before the user has finished the first attempt at a field.",
      "Clearing the form after a failed submit and forcing a full retype.",
      "Trusting client validation for prices, roles, or ownership — the request can be edited.",
      "One aria-live region per field that announces on every keystroke instead of on blur and submit.",
    ],
    performance: [
      "Prefer uncontrolled inputs (React Hook Form) on large forms; controlled inputs re-render the form on every keystroke.",
      "Debounce async checks by 300–500ms and abort the previous request instead of racing.",
      "Validate with a schema once on submit rather than re-parsing the whole object per keystroke.",
      "Split shared schemas into their own module so client bundles import only the rules they actually run.",
    ],
    useCases: [
      "Sign-up and sign-in with password rules and a live strength hint.",
      "Checkout with per-step address and payment validation.",
      "Admin CRUD forms surfacing server constraints (unique slug, taken email) as field errors.",
      "Surveys with conditional questions and repeatable sections.",
    ],
    interview: [
      { q: "Why validate on the server if you already validate on the client?", a: "Client validation is UX; anyone can bypass it with a custom request. The server owns the truth, and it must enforce the same rules before persisting." },
      { q: "How do you make errors accessible?", a: "Give the field an id, point aria-describedby at the message, set aria-invalid, keep the message in the DOM at a stable position, and move focus to the first invalid field on submit." },
      { q: "How does React Hook Form stay fast?", a: "Inputs stay uncontrolled in the DOM and register their own refs; the library subscribes per field, so typing updates that field's subscription rather than re-rendering the whole form." },
      { q: "When is native validation enough?", a: "Simple, single-field rules on a form that works without JavaScript: required, type, pattern, min/max. Anything cross-field or server-dependent needs a schema." },
    ],
    exercises: [
      "Rebuild the example form with React Hook Form and compare the number of re-renders per keystroke.",
      "Add a username availability check with debounce, abort, and a stale-response guard.",
      "Split a checkout form into three steps sharing one Zod schema via pick().",
      "Add a repeatable \"line items\" field array with add, remove, and reorder without losing focus.",
    ],
    docs: [
      { label: "React Hook Form", href: "https://react-hook-form.com/get-started" },
      { label: "Zod", href: "https://zod.dev/" },
      { label: "MDN — Client-side form validation", href: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation" },
    ],
    guides: ["html-forms", "html-input-controls"],
    related: ["accessibility", "auth-ui"],
    projects: ["auth-interface"],
  },
  {
    slug: "auth-ui",
    name: "Authentication UI Flows",
    domain: "architecture",
    level: "Intermediate",
    summary: "Sign-in, sign-up, password reset, OAuth buttons, protected routes, and session-aware UI.",
    what:
      "The frontend half of authentication: forms and flows that collect credentials or redirect to an identity provider, and UI that reacts to the signed-in state.",
    why:
      "Auth screens are the first impression and the most security-sensitive UI. Small details — autocomplete attributes, error wording, redirect handling — matter.",
    how:
      "Sign-in is a credential exchange. The browser posts an identifier and secret, or redirects to an identity provider; the server verifies and sets a session cookie; later requests carry that cookie automatically. OAuth/OIDC replaces the password with a redirect: the app sends the user to the provider with a state value, the provider returns a code to the registered redirect URI, and the server exchanges that code for tokens. The UI's job is to render the right screen for the current session state and gate routes for experience — never as the security boundary.",
    prerequisites: ["html", "forms-validation", "frontend-security"],
    roadmap: [
      "Sign-in and sign-up forms with correct autocomplete attributes",
      "Accessible, generic errors and a pending submit state",
      "Session state: loading, signed-in, signed-out",
      "Protected routes, post-login redirects, and password reset",
      "OAuth/OIDC with PKCE, then passkeys and step-up auth",
    ],
    concepts: ["autocomplete=\"username\" / \"current-password\" / \"new-password\"", "OAuth and OIDC redirect flows", "Passkeys (WebAuthn)", "Protected routes and redirects", "HttpOnly cookies vs tokens in storage", "Generic error messages to avoid account enumeration"],
    examples: [
      {
        title: "Sign-in form with generic errors and a pending state",
        language: "html",
        code: `<form id="signin" novalidate style="max-width:320px;font-family:system-ui;display:grid;gap:12px">
  <h1 style="font-size:20px;margin:0">Sign in</h1>

  <div>
    <label for="email">Email</label>
    <input id="email" name="email" type="email" autocomplete="username"
           required aria-describedby="form-error" style="display:block;width:100%" />
  </div>

  <div>
    <label for="password">Password</label>
    <input id="password" name="password" type="password" autocomplete="current-password"
           required aria-describedby="form-error" style="display:block;width:100%" />
  </div>

  <p id="form-error" role="alert" style="color:#b91c1c;min-height:1.2em;margin:0"></p>
  <button type="submit">Sign in</button>
</form>

<script>
  const form = document.getElementById('signin');
  const error = document.getElementById('form-error');
  const email = document.getElementById('email');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      error.textContent = 'Enter your email and password.';
      return;
    }
    const button = form.querySelector('button');
    button.disabled = true;
    button.textContent = 'Signing in…';

    // Simulated server call. The real one posts to /api/session.
    await new Promise((resolve) => setTimeout(resolve, 800));

    // One message for every failure: no account, wrong password, locked.
    error.textContent = 'That email and password do not match an account.';
    email.setAttribute('aria-invalid', 'true');
    button.disabled = false;
    button.textContent = 'Sign in';
  });
</script>`,
        explanation: [
          "autocomplete=\"username\" and \"current-password\" let password managers fill and save correctly.",
          "Both fields point aria-describedby at one shared error region, so the message is announced with either field.",
          "The single failure message is deliberate: distinguishing unknown email from wrong password tells attackers which accounts exist.",
          "The button is disabled and relabelled during the request so double submits and dead clicks do not happen.",
        ],
      },
    ],
    bestPractices: ["Use a proven auth provider or library; never invent crypto.", "Store sessions in HttpOnly, Secure, SameSite cookies.", "Check authorisation on the server — hiding a button is not security.", "Use one generic message for every credential failure.", "Validate redirect targets against a same-origin allowlist."],
    advanced: [
      "PKCE for public clients: a code verifier and challenge instead of a client secret, which a SPA cannot keep.",
      "Passkeys with conditional UI (autocomplete=\"webauthn\") so the browser offers a passkey inside the email field.",
      "Same-origin redirect validation: store the attempted path, then reject absolute or protocol-relative URLs before navigating back.",
      "Session refresh without a flash: a rolling server cookie or a silent refresh call before expiry, never a blocking spinner on every route.",
      "Account-enumeration resistance extends to timing and to sign-up and reset flows: always answer \"if that account exists, we sent an email\", and require step-up auth for sensitive actions.",
    ],
    mistakes: [
      "Storing access or refresh tokens in localStorage where any injected script can read them.",
      "Protecting routes only on the client, so the API can still be called directly.",
      "Separate error copy for \"no such user\" and \"wrong password\".",
      "Blocking the entire app on a session request so every page flashes a loader.",
      "Redirecting to an unvalidated next= URL after login, which turns your domain into an open redirect.",
    ],
    performance: [
      "Ship the auth screens in their own small route chunk; they are the first paint on mobile and should not pull in the app shell.",
      "Do not gate the whole document on a session fetch — render the shell and stream the rest.",
      "Keep the session in memory for the tab and refetch once on focus, not per component.",
      "Preconnect to the identity provider origin so the redirect round trip starts earlier.",
    ],
    useCases: [
      "SaaS app with email/password plus Google and GitHub sign-in.",
      "B2B product with organisation invites, SSO, and role-based landing pages.",
      "Consumer app using passkeys as the primary factor with email fallback.",
      "Admin console requiring step-up auth for destructive actions.",
    ],
    interview: [
      { q: "Where should a session token live in a SPA?", a: "In an HttpOnly, Secure, SameSite cookie set by the server, so script cannot read it. If a bearer token must be held client-side, keep it in memory and refresh through a backend-for-frontend rather than persisting it in localStorage." },
      { q: "How does the OAuth authorization code flow work?", a: "The app redirects to the provider with client id, redirect URI, scope, state, and a PKCE challenge. The provider authenticates the user and returns a code plus state. The server verifies state, exchanges the code (with the verifier) for tokens, and then creates its own session." },
      { q: "Why are generic error messages important?", a: "Specific messages let an attacker enumerate which emails have accounts, which is the first step of credential stuffing and phishing. One message for all failures removes that signal." },
      { q: "Is hiding a button enough to protect an admin action?", a: "No. The UI can be bypassed or the request replayed; authorisation must be enforced on the server for every request." },
    ],
    exercises: [
      "Add a show/hide password toggle that keeps focus and caret position.",
      "Implement a protected route that redirects to sign-in and returns to the original path, rejecting external URLs.",
      "Wire a Google OAuth flow with PKCE and a state check in the callback.",
      "Add conditional passkey autofill to the email field and handle the unsupported-browser case.",
    ],
    docs: [
      { label: "web.dev — Sign-in form best practices", href: "https://web.dev/articles/sign-in-form-best-practices" },
      { label: "OWASP Authentication Cheat Sheet", href: "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html" },
    ],
    related: ["forms-validation", "frontend-security"],
    projects: ["auth-interface"],
  },
  {
    slug: "error-handling-ui",
    name: "Error Boundaries & Resilient UI",
    domain: "architecture",
    level: "Intermediate",
    summary: "Catching render errors, empty and error states, retries, and graceful degradation.",
    what:
      "Resilient UI plans for failure: network errors, empty data, slow responses, and component crashes, each with a clear state for the user.",
    why:
      "In React, an uncaught render error unmounts the whole tree. Error boundaries contain the damage; designed error and empty states keep users oriented.",
    how:
      "Errors arrive from three places: render (a component throws), async work (a rejected promise or failed fetch), and events (a handler throws). React only catches render errors, and only with a class-based error boundary or the framework equivalent; event-handler and async errors must be caught where they happen and pushed into the same UI state. Model each data region as a small state machine — idle, loading, empty, error, success — so every path has a designed screen instead of a blank box.",
    prerequisites: ["react", "async-javascript"],
    roadmap: [
      "Distinguish render, async, and event-handler errors",
      "A class error boundary with a reset action; framework error.tsx",
      "Designing loading, empty, error, and success states",
      "Retry with backoff and attempt limits",
      "Reporting to a monitoring service without blocking the UI",
    ],
    concepts: ["React error boundaries", "Next.js error.tsx and global-error.tsx", "Loading, empty, error, and success states", "Retry and fallback UI", "Global error reporting"],
    examples: [
      {
        title: "Per-widget error boundary with reset",
        language: "tsx",
        code: `import { Component, useState, type ReactNode } from "react";

type Props = { children: ReactNode; fallback: (reset: () => void) => ReactNode };
type State = { error: Error | null };

class Boundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error) {
    // Replace with your monitoring client.
    console.error("widget failed", error);
  }

  reset = () => this.setState({ error: null });

  render() {
    return this.state.error ? this.props.fallback(this.reset) : this.props.children;
  }
}

function RevenueWidget() {
  const [crashed, setCrashed] = useState(false);
  if (crashed) throw new Error("Revenue chart crashed");
  return <button onClick={() => setCrashed(true)}>Break the widget</button>;
}

export default function App() {
  return (
    <main style={{ fontFamily: "system-ui", padding: 16 }}>
      <h1 style={{ fontSize: 20 }}>Dashboard</h1>
      <Boundary
        fallback={(reset) => (
          <div role="alert" style={{ border: "1px solid #fca5a5", background: "#fef2f2", padding: 12, borderRadius: 8 }}>
            <p style={{ margin: "0 0 8px" }}>This widget could not load.</p>
            <button onClick={reset}>Try again</button>
          </div>
        )}
      >
        <RevenueWidget />
      </Boundary>
      <p>Navigation and the rest of the page keep working.</p>
    </main>
  );
}`,
        explanation: [
          "getDerivedStateFromError turns a thrown error into state, which switches the boundary to its fallback.",
          "componentDidCatch is the only place the error is reported; the fallback stays free of logging logic.",
          "The boundary wraps one widget, so the heading and the rest of the page survive the crash.",
          "Reset clears the error state and re-mounts the children, which is why the widget can recover without a reload.",
        ],
      },
    ],
    bestPractices: ["Place boundaries around independent widgets, not only at the root.", "Say what happened and what the user can do next.", "Report errors to a monitoring service.", "Differentiate empty from failed — never show an empty state for an error.", "Give every error state a way forward: retry, go back, or contact support."],
    advanced: [
      "Placement follows failure domains: one boundary per independent widget, plus a route-level boundary as a last resort — a root-only boundary blanks the whole page.",
      "Boundaries do not catch event-handler or async errors, so route those through the same error state; React 19's onUncaughtError/onCaughtError plus window \"error\" and \"unhandledrejection\" listeners cover the gap.",
      "Separate expected failures (400 validation, 403, 404) from unexpected crashes: only the second group should page someone, and the first should render inline guidance.",
      "Retry with exponential backoff and jitter, cap the attempts, disable the button while retrying, and show the attempt number so users trust it.",
      "Suspense needs an error boundary too: a rejected lazy() import or a failed data promise surfaces as a render error, and a stale chunk needs a full reload fallback.",
    ],
    mistakes: [
      "Wrapping the whole app in a single boundary so one widget crash takes down navigation.",
      "Swallowing errors in an empty catch block, leaving monitoring with nothing to show.",
      "Showing raw error messages or stack traces to users — they leak internals and mean nothing to them.",
      "Rendering \"No results\" when the request actually failed, so users believe the data does not exist.",
      "Retry loops with no cap that hammer an already failing API.",
    ],
    performance: [
      "Keep the fallback tiny and dependency-free; it must render even when the main chunk failed to load.",
      "Report with navigator.sendBeacon or a batched queue so logging never blocks navigation or interaction.",
      "Reserve the same layout space for the fallback as the loaded widget so error states do not shift the page.",
      "Deduplicate identical reports client-side; one crashing render loop can exhaust a monitoring quota in seconds.",
    ],
    useCases: [
      "A dashboard where each chart loads and fails independently.",
      "A checkout page that degrades to a retry panel instead of losing the cart.",
      "Offline-capable apps showing cached data with a reconnecting banner.",
      "Third-party embeds isolated in their own boundary so a vendor script cannot break the page.",
    ],
    interview: [
      { q: "What does an error boundary not catch?", a: "Event handlers, asynchronous callbacks, server-side rendering, and errors thrown in the boundary itself. Those need try/catch, promise handlers, and global listeners." },
      { q: "How does an error boundary recover?", a: "By changing the state that triggered the fallback — typically a reset that clears the captured error, which re-mounts the children; changing the children's key also forces a fresh mount." },
      { q: "How do you decide where boundaries go?", a: "Around independent failure domains that can degrade without taking the page down: widgets, routes, and third-party embeds. Each boundary should have a fallback that still makes sense in place." },
      { q: "What is the difference between an empty state and an error state?", a: "Empty means the request succeeded and there is genuinely nothing to show; error means you do not know, because the request failed. Conflating them misleads users and hides incidents." },
    ],
    exercises: [
      "Add a boundary around a failing chart and confirm the header, sidebar, and navigation still work.",
      "Implement a retry button with exponential backoff, a maximum of three attempts, and a visible attempt counter.",
      "Force a 500 from a mock API and verify the UI shows an error state rather than an empty state.",
      "Wire window \"unhandledrejection\" reporting and confirm a rejected fetch appears once in the console, not twice.",
    ],
    docs: [
      { label: "react.dev — Error boundaries", href: "https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary" },
      { label: "Next.js — Error handling", href: "https://nextjs.org/docs/app/getting-started/error-handling" },
    ],
    guides: ["js-error-handling", "js-global-error-handling-in-browsers"],
    related: ["react", "nextjs"],
  },
  {
    slug: "frontend-security",
    name: "Frontend Security",
    domain: "architecture",
    level: "Advanced",
    summary: "XSS, CSRF, CSP, CORS, dependency risk, and what the browser can and cannot protect.",
    what:
      "Frontend security is preventing attackers from running code in your users' browsers, abusing their sessions, or leaking their data through your UI.",
    why:
      "Anything shipped to the browser is public, and one injected script can read everything on the page. Many breaches start with a frontend mistake.",
    how:
      "The browser runs your JavaScript with the origin's authority: it can read the DOM, any cookie not marked HttpOnly, localStorage, and issue same-origin requests with the user's session. Every defence follows from limiting that authority — encode untrusted data on output, keep secrets out of the bundle, keep the session cookie out of script reach (HttpOnly, Secure, SameSite), and restrict what may execute with CSP. The same-origin policy and CORS stop other sites from reading your responses; they do not protect your API from a script that is already running as you.",
    prerequisites: ["javascript", "how-the-web-works", "dom-and-events"],
    roadmap: [
      "The same-origin policy and how requests carry cookies",
      "XSS: injection points and output encoding",
      "Cookie flags and CSRF: HttpOnly, Secure, SameSite",
      "Content Security Policy in report-only, then enforced",
      "Dependency review and sandboxing untrusted content",
    ],
    concepts: ["XSS and output encoding", "Content Security Policy", "CSRF and SameSite cookies", "CORS (a server-side relaxation, not a protection)", "Sandboxed iframes for untrusted code", "Supply-chain risk", "No secrets in client bundles"],
    examples: [
      {
        title: "Running untrusted code safely",
        language: "html",
        code: `<!-- The playground on this site uses this pattern -->
<iframe
  title="Preview"
  sandbox="allow-scripts"
  srcdoc="<script>parent.document.cookie</script>"
></iframe>
<!-- Without allow-same-origin the frame gets an opaque origin:
     it cannot read the parent page, its cookies, or its storage. -->`,
      },
      {
        title: "Encode on output: innerHTML vs textContent",
        language: "html",
        code: `<p style="font-family:system-ui;margin:0 0 8px">
  Try typing <code>&lt;img src=x onerror=alert(1)&gt;</code> below.
</p>
<textarea id="input" rows="2" style="width:100%;font-family:ui-monospace,monospace">&lt;b&gt;hello&lt;/b&gt;</textarea>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px;font-family:system-ui">
  <section>
    <h2 style="font-size:13px;margin:0 0 6px;color:#b91c1c">innerHTML (unsafe)</h2>
    <div id="unsafe" style="border:1px solid #fca5a5;padding:8px;border-radius:8px;min-height:32px"></div>
  </section>
  <section>
    <h2 style="font-size:13px;margin:0 0 6px;color:#15803d">textContent (safe)</h2>
    <div id="safe" style="border:1px solid #86efac;padding:8px;border-radius:8px;min-height:32px"></div>
  </section>
</div>

<script>
  const input = document.getElementById('input');
  const unsafe = document.getElementById('unsafe');
  const safe = document.getElementById('safe');

  function render() {
    unsafe.innerHTML = input.value; // the browser parses and executes markup
    safe.textContent = input.value;  // the browser renders it as characters
  }

  input.addEventListener('input', render);
  render();
</script>`,
        explanation: [
          "Both panes receive the identical string; only the sink differs, which is the whole of XSS prevention.",
          "innerHTML parses the string as HTML, so an img with onerror becomes live markup and runs script.",
          "textContent creates a text node, so angle brackets are displayed instead of interpreted.",
          "JSX does the textContent equivalent automatically, which is why dangerouslySetInnerHTML needs sanitised input.",
        ],
      },
    ],
    advanced: [
      "Trusted Types (require-trusted-types-for 'script') turns innerHTML, script src, and other DOM sinks into typed violations instead of silent XSS.",
      "Nonce- or hash-based CSP with strict-dynamic: report violations via report-to for a release, then enforce; a permissive 'unsafe-inline' CSP protects nothing.",
      "Subresource Integrity plus pinned versions and a reviewed lockfile close the third-party script path, which no amount of app code fixes.",
      "postMessage needs both an explicit targetOrigin on send and an event.origin check on receive; '*' with session data is a leak.",
      "Token architecture: a backend-for-frontend holding tokens server-side (HttpOnly cookie to the browser), or DPoP-bound tokens, instead of refresh tokens in JS-readable storage — plus COOP/COEP/CORP headers for cross-origin isolation.",
    ],
    bestPractices: ["Let the framework escape output; avoid dangerouslySetInnerHTML with untrusted data.", "Set a strict CSP.", "Never put API secrets in NEXT_PUBLIC_ or VITE_ variables.", "Run untrusted code in a sandboxed iframe without allow-same-origin.", "Add npm audit / dependency review to CI and commit the lockfile."],
    mistakes: ["Believing CORS protects your API from attackers.", "Sanitising on input instead of encoding on output.", "Putting a private API key in a VITE_ or NEXT_PUBLIC_ variable and calling it \"restricted\".", "Setting a CSP that only blocks a few things while allowing 'unsafe-inline' and 'unsafe-eval'.", "Rendering user HTML with innerHTML because it \"looks fine\" in testing."],
    performance: [
      "A strict CSP removes the need to sanitise on hot render paths — parse and sanitise untrusted HTML once when the data arrives, then cache the result.",
      "Prefer nonces generated per request over long hash lists, which inflate the header and must be recomputed on every deploy.",
      "Keep HTML sanitisers off the main thread for large payloads; DOMPurify on megabytes of markup janks the UI — sanitise on the server or in a worker.",
      "Sanitising libraries are bundle weight: load them only on routes that render user-supplied HTML, behind a dynamic import.",
    ],
    useCases: [
      "A CMS-driven marketing site rendering rich text from editors.",
      "A multi-tenant app where customers upload HTML email templates.",
      "A documentation site embedding untrusted code playgrounds.",
      "A fintech dashboard where a session hijack is a direct financial loss.",
    ],
    interview: [{ q: "How do you prevent XSS in a React app?", a: "Rely on JSX's automatic escaping, avoid dangerouslySetInnerHTML (or sanitise with DOMPurify), validate URLs before putting them in href, and add a Content Security Policy." },
      { q: "Does CORS stop attackers from calling my API?", a: "No. CORS tells browsers whether other origins may read responses. curl, server-side scripts, and a same-origin XSS ignore it entirely." },
      { q: "Why is localStorage the wrong place for a session token?", a: "Any script running on the origin can read it, so a single XSS becomes full account takeover with no expiry boundary. HttpOnly cookies are unreadable from script, and SameSite limits cross-site sending." },
      { q: "What actually stops a CSRF attack?", a: "Cookies that the browser will not attach cross-site (SameSite=Lax/Strict), plus server-side origin/Referer checks or a CSRF token bound to the session for state-changing requests." },
    ],
    exercises: [
      "Write a CSP for an app with one inline script using a nonce, ship it in report-only mode, then enforce it.",
      "Take a page that uses innerHTML with user data and replace it with textContent, then add a DOMPurify path for the rich-text case.",
      "Build a playground embed with sandbox=\"allow-scripts\" and prove it cannot read parent cookies.",
      "Add a SameSite cookie plus an origin check to a state-changing POST and demonstrate the blocked cross-site request.",
    ],
    docs: [
      { label: "OWASP XSS Prevention", href: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html" },
      { label: "MDN — Content Security Policy", href: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP" },
    ],
    guides: ["js-security-issues", "js-same-origin-policy-cross-origin-communication"],
    related: ["auth-ui", "testing"],
  },
  {
    slug: "production-frontend",
    name: "Production-Ready Frontend",
    domain: "architecture",
    level: "Advanced",
    summary: "The checklist between \"works on my machine\" and shipping: performance, a11y, SEO, monitoring, CI.",
    what:
      "Production readiness is the set of practices that keep a frontend fast, accessible, observable, and safe to change after launch.",
    why:
      "Users meet the production build on real devices and networks. Regressions you do not measure will ship.",
    how:
      "Production readiness is a set of automated gates rather than a checklist someone remembers. Every pull request runs lint, type-check, tests, and a build; the build produces an immutable artifact that is deployed to a preview URL; smoke tests and performance budgets run against that preview; merging promotes the same artifact behind a CDN. Monitoring closes the loop — real-user metrics, error reports, and SLO burn alerts turn a regression into a ticket instead of a support email.",
    prerequisites: ["git", "testing", "web-performance", "frontend-security", "accessibility"],
    roadmap: [
      "A reproducible build and a committed lockfile",
      "Lint, type-check, tests, and build on every pull request",
      "Preview deployments, smoke tests, and performance budgets",
      "Error and real-user monitoring with release tagging",
      "Staged rollout, feature flags, and a rehearsed rollback",
    ],
    concepts: ["Performance budgets and Lighthouse CI", "Error and real-user monitoring", "Feature flags", "Preview deployments", "Accessibility checks in CI", "Lazy loading and code splitting", "Caching headers and CDNs"],
    examples: [
      {
        title: "A performance budget enforced in CI",
        language: "json",
        code: `{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "url": ["http://localhost:3000/", "http://localhost:3000/pricing"],
      "settings": { "preset": "desktop" }
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 1 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "total-blocking-time": ["error", { "maxNumericValue": 200 }],
        "resource-summary:script:size": ["error", { "maxNumericValue": 174080 }],
        "resource-summary:image:size": ["error", { "maxNumericValue": 307200 }]
      }
    },
    "upload": { "target": "temporary-public-storage" }
  }
}`,
        explanation: [
          "numberOfRuns takes the median of three runs, because a single Lighthouse run is noisy enough to fail randomly.",
          "assertions with the \"error\" level fail the build; use \"warn\" only while you are paying down existing debt.",
          "Script size is budgeted in bytes, so one careless dependency fails the pull request instead of the quarter.",
          "Accessibility is a category floor, not an afterthought audit — it runs on every pull request.",
        ],
      },
      {
        title: "The gate that runs before deploy",
        language: "bash",
        code: `# Fail fast, in order of cost. Every step blocks the merge.
npm ci                 # exact lockfile install, no drift
npm run lint           # eslint with --max-warnings=0
npm run typecheck      # tsc --noEmit
npm run test -- --coverage --run
npm run build          # must produce the deployable artifact
npx lhci autorun       # budget assertions against the built app
# On merge: promote the exact artifact that passed, then smoke test
# the production URL and watch error rate for 15 minutes.`,
        explanation: [
          "npm ci installs from the lockfile and fails on mismatch, so CI and production get identical trees.",
          "--max-warnings=0 turns lint debt into a blocking gate instead of console noise.",
          "The artifact built here is the artifact promoted — never rebuild during deploy.",
          "The post-deploy watch window is part of the gate: a deploy is not done when the upload finishes.",
        ],
      },
    ],
    advanced: [
      "Progressive delivery: promote the same immutable artifact, shift traffic by percentage, and roll back automatically when the error-rate or p75 LCP SLO burns too fast.",
      "Feature flags separate deploy from release; a kill switch must read from a cached last-known state so it still works when the flag service is down.",
      "RUM attribution: sample sessions, tag every error and web-vital with the release SHA and route, so a regression maps to the deploy that caused it.",
      "Cache strategy per asset class — hashed assets immutable for a year, HTML with no-cache plus ETag, and a service worker that never serves stale HTML across a deploy.",
      "Supply-chain hygiene: committed lockfile, dependency review on pull requests, restricted install scripts, and provenance/SBOM for the artifact.",
    ],
    mistakes: [
      "Testing only on a fast laptop and an unthrottled network, then discovering the mobile experience on launch day.",
      "No rollback path because the deploy mutates in place and runs a destructive migration in the same step.",
      "Alerting on every individual error instead of SLO burn, so the team mutes the channel within a week.",
      "Shipping with no error monitoring, so 404s and console errors are invisible until a user emails.",
      "Treating accessibility and SEO as one-time audits rather than gates that run on every pull request.",
    ],
    performance: [
      "Make budgets blocking: a build that exceeds the JavaScript budget should fail, not print a report nobody reads.",
      "Serve hashed assets with long-lived immutable caching and keep only HTML short-lived, so repeat visits fetch almost nothing.",
      "Split by route and defer third-party scripts until interaction or idle; analytics should never compete with LCP.",
      "Track p75 field data per route — lab scores hide the slow-device tail where most bounces happen.",
    ],
    useCases: [
      "A marketing site where a 200 ms regression measurably changes conversion.",
      "A B2B dashboard shipped weekly to thousands of tenants.",
      "An e-commerce store with a hard freeze around peak sales periods.",
      "An internal tool where an outage blocks support staff from working.",
    ],
    interview: [
      { q: "What belongs in a pre-merge CI pipeline?", a: "Lint with zero warnings, type-check, unit and integration tests, a production build, and budget assertions against that build. Each one is fast and deterministic enough that a failure always means a real problem." },
      { q: "How do you roll back safely?", a: "Deploy immutable, versioned artifacts and keep the previous one warm, make migrations backward compatible for one release, and automate rollback on an SLO breach instead of relying on a human noticing." },
      { q: "Lab metrics vs field metrics?", a: "Lighthouse runs on one machine with fixed throttling and is good for catching regressions in CI. Field data (p75 from real users) is the truth about experience; you need both, and only field data reflects devices and networks you do not own." },
      { q: "Why tag errors with the release SHA?", a: "It turns a wall of errors into \"this started with release abc123\", which is the difference between a five-minute rollback and a day of bisecting." },
    ],
    exercises: [
      "Add a Lighthouse CI job with a script-size budget and make it fail on a deliberately added 300 KB dependency.",
      "Set up preview deployments per branch and run a Playwright smoke test against the preview URL.",
      "Add error monitoring with release tagging and trigger a handled error to confirm it appears with the SHA.",
      "Write a one-page rollback runbook and rehearse it on a staging deploy.",
    ],
    bestPractices: ["Run lint, type-check, tests, and build on every pull request.", "Review a preview deployment before merging.", "Track Core Web Vitals from real users.", "Deploy the exact artifact that passed CI — never rebuild during deploy.", "Keep every migration backward compatible for one release so rollback stays possible."],
    docs: [{ label: "web.dev — Learn", href: "https://web.dev/learn" }],
    related: ["web-performance", "testing", "frontend-security"],
  },
];
