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
    ],
    bestPractices: ["Accept children instead of adding more props.", "Keep components small enough to describe in one sentence.", "Extract custom hooks for reusable logic, not for every component."],
    mistakes: ["Premature abstraction: a generic component with 20 boolean props.", "Prop drilling through five layers instead of composing or using context."],
    interview: [
      { q: "How would you structure a large React app?", a: "Feature folders with colocated components, hooks, API calls, and tests; a shared ui layer of primitives; thin route files; and a rule that dependencies only point inward toward shared code." },
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
    ],
    bestPractices: ["Put server data in a server-state cache, not a global store.", "Store the minimum; derive the rest.", "Keep shareable view state (filters, tabs, pages) in the URL."],
    mistakes: ["Copying API responses into Redux and re-implementing caching.", "Using one giant context that re-renders the whole app."],
    interview: [{ q: "When would you introduce Redux or Zustand?", a: "When client-only state is shared across distant parts of the tree and updated often, and context would cause excess re-renders or prop drilling — not for server data." }],
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
    concepts: ["autocomplete=\"username\" / \"current-password\" / \"new-password\"", "OAuth and OIDC redirect flows", "Passkeys (WebAuthn)", "Protected routes and redirects", "HttpOnly cookies vs tokens in storage", "Generic error messages to avoid account enumeration"],
    bestPractices: ["Use a proven auth provider or library; never invent crypto.", "Store sessions in HttpOnly, Secure, SameSite cookies.", "Check authorisation on the server — hiding a button is not security."],
    mistakes: ["Storing access tokens in localStorage.", "Protecting routes only on the client."],
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
    concepts: ["React error boundaries", "Next.js error.tsx and global-error.tsx", "Loading, empty, error, and success states", "Retry and fallback UI", "Global error reporting"],
    bestPractices: ["Place boundaries around independent widgets, not only at the root.", "Say what happened and what the user can do next.", "Report errors to a monitoring service."],
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
    ],
    bestPractices: ["Let the framework escape output; avoid dangerouslySetInnerHTML with untrusted data.", "Set a strict CSP.", "Never put API secrets in NEXT_PUBLIC_ or VITE_ variables.", "Run untrusted code in a sandboxed iframe without allow-same-origin."],
    mistakes: ["Believing CORS protects your API from attackers.", "Sanitising on input instead of encoding on output."],
    interview: [{ q: "How do you prevent XSS in a React app?", a: "Rely on JSX's automatic escaping, avoid dangerouslySetInnerHTML (or sanitise with DOMPurify), validate URLs before putting them in href, and add a Content Security Policy." }],
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
    concepts: ["Performance budgets and Lighthouse CI", "Error and real-user monitoring", "Feature flags", "Preview deployments", "Accessibility checks in CI", "Lazy loading and code splitting", "Caching headers and CDNs"],
    bestPractices: ["Run lint, type-check, tests, and build on every pull request.", "Review a preview deployment before merging.", "Track Core Web Vitals from real users."],
    docs: [{ label: "web.dev — Learn", href: "https://web.dev/learn" }],
    related: ["web-performance", "testing", "frontend-security"],
  },
];
