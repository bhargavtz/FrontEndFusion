export type RoadmapStage = {
  title: string;
  goal: string;
  /** Technology slugs (src/data/technologies). */
  topics: string[];
  /** Extra guide slugs from content/docs. */
  guides?: string[];
  milestone: string;
  exercises: string[];
  /** Project brief slugs (src/data/project-briefs). */
  projects?: string[];
};

export type Roadmap = {
  slug: string;
  title: string;
  audience: string;
  summary: string;
  duration: string;
  prerequisites: string[];
  stages: RoadmapStage[];
};

export const roadmaps: Roadmap[] = [
  {
    slug: "html",
    title: "HTML Developer",
    audience: "Complete beginners",
    summary: "Write structured, semantic, accessible HTML.",
    duration: "2–3 weeks",
    prerequisites: ["A computer and a browser"],
    stages: [
      {
        title: "Foundations",
        goal: "Understand how a page is delivered and what HTML does.",
        topics: ["how-the-web-works", "html"],
        guides: ["html-getting-started", "html-doctypes", "html-headings", "html-paragraphs"],
        milestone: "Publish a valid one-page document with headings, text, and links.",
        exercises: ["Mark up a recipe with headings, lists, and images.", "Validate the page with the W3C validator."],
      },
      {
        title: "Semantics, forms, and media",
        goal: "Choose the right element for every piece of content.",
        topics: ["html", "accessibility"],
        guides: ["html-sectioning-elements", "html-forms", "html-input-controls", "html-tables", "html-media-elements"],
        milestone: "A contact page with a labelled, validated form and a captioned table.",
        exercises: ["Fix every issue reported by an accessibility checker.", "Build a form using five different input types."],
        projects: ["personal-portfolio"],
      },
    ],
  },
  {
    slug: "css",
    title: "CSS Developer",
    audience: "Beginners who know basic HTML",
    summary: "Style and lay out pages with modern CSS.",
    duration: "4–6 weeks",
    prerequisites: ["HTML basics"],
    stages: [
      {
        title: "The cascade and the box model",
        goal: "Predict which rule wins and how big a box is.",
        topics: ["css"],
        guides: ["css-getting-started", "css-selectors", "css-cascade-and-specificity", "css-box-model"],
        milestone: "Style a long article with a typographic scale and consistent spacing.",
        exercises: ["Reproduce a magazine article layout.", "Explain every specificity conflict in a messy stylesheet."],
      },
      {
        title: "Layout",
        goal: "Use Flexbox and Grid for real layouts.",
        topics: ["css", "responsive-design"],
        guides: ["css-flexbox", "css-grid", "css-positioning", "css-media-queries"],
        milestone: "A responsive landing page with no horizontal scroll from 320px to 1440px.",
        exercises: ["Build a holy-grail layout with Grid areas.", "Build a card grid with auto-fit."],
        projects: ["landing-page-build", "responsive-navigation"],
      },
      {
        title: "Polish and scale",
        goal: "Add motion, theming, and structure.",
        topics: ["css", "tailwind-css", "design-systems"],
        guides: ["css-custom-properties", "css-transitions", "css-animations", "advanced-topics"],
        milestone: "A themed component set with light and dark modes.",
        exercises: ["Add dark mode using custom properties.", "Replace a hover animation's layout properties with transform."],
      },
    ],
  },
  {
    slug: "javascript",
    title: "JavaScript Developer",
    audience: "Learners comfortable with HTML and CSS",
    summary: "Go from variables to async code and browser APIs.",
    duration: "6–8 weeks",
    prerequisites: ["HTML and CSS basics"],
    stages: [
      {
        title: "Language core",
        goal: "Write correct JavaScript without a framework.",
        topics: ["javascript"],
        guides: ["js-getting-started-with-javascript", "js-javascript-variables", "js-functions", "js-arrays", "js-objects", "js-scope"],
        milestone: "Solve 20 small problems using arrays, objects, and closures.",
        exercises: ["Implement your own map, filter, and reduce.", "Write a function that deep-clones plain data."],
      },
      {
        title: "The browser",
        goal: "Make pages respond to users.",
        topics: ["dom-and-events", "browser-apis"],
        guides: ["js-web-storage", "js-json"],
        milestone: "Ship a calculator and a to-do app without libraries.",
        exercises: ["Add keyboard support to both projects.", "Persist the to-do list safely."],
        projects: ["calculator", "todo-app"],
      },
      {
        title: "Async and the event loop",
        goal: "Reason about when code runs.",
        topics: ["async-javascript"],
        guides: ["js-promises", "js-async-functions-async-await", "js-fetch", "js-modules", "js-error-handling"],
        milestone: "A weather app with search, loading, error, and cancellation.",
        exercises: ["Predict the output order of mixed timers and promises.", "Add retry with backoff."],
        projects: ["weather-interface"],
      },
      {
        title: "Quality and performance",
        goal: "Make it fast and safe.",
        topics: ["web-performance", "browser-devtools", "testing"],
        guides: ["js-performance-tips", "js-unit-testing-javascript"],
        milestone: "Profile and halve the slowest interaction in one of your apps.",
        exercises: ["Write unit tests for your calculator's compute function."],
      },
    ],
  },
  {
    slug: "typescript",
    title: "TypeScript Developer",
    audience: "JavaScript developers",
    summary: "Add types incrementally and use the type system to prevent bugs.",
    duration: "3–4 weeks",
    prerequisites: ["JavaScript fundamentals"],
    stages: [
      {
        title: "Everyday types",
        goal: "Annotate, infer, and narrow.",
        topics: ["typescript"],
        milestone: "Convert a 500-line JavaScript project to strict TypeScript.",
        exercises: ["Replace every any with a real type or unknown.", "Model a state machine with a discriminated union."],
      },
      {
        title: "Generics and utilities",
        goal: "Write reusable, well-typed abstractions.",
        topics: ["typescript"],
        milestone: "Publish a typed utility library with generics and tests.",
        exercises: ["Implement your own Pick, Omit, and Readonly."],
      },
      {
        title: "TypeScript in React",
        goal: "Type components, hooks, and events.",
        topics: ["typescript-react", "react"],
        milestone: "A typed component library with exported prop types.",
        exercises: ["Build a generic Table<T> component."],
        projects: ["dashboard-ui"],
      },
    ],
  },
  {
    slug: "react",
    title: "React Developer",
    audience: "Developers comfortable with JavaScript",
    summary: "Think in components and state, then scale up.",
    duration: "6–8 weeks",
    prerequisites: ["JavaScript, ES modules, array methods"],
    stages: [
      {
        title: "Components and state",
        goal: "Describe UI as a function of state.",
        topics: ["react"],
        milestone: "Rebuild your vanilla to-do app in React.",
        exercises: ["Lift state between sibling components.", "Add filters using derived data, not extra state."],
        projects: ["todo-app"],
      },
      {
        title: "Effects, data, and forms",
        goal: "Synchronise with the outside world correctly.",
        topics: ["react", "tanstack-query", "forms-validation"],
        milestone: "A data-driven app with loading, error, and optimistic updates.",
        exercises: ["Replace a useEffect fetch with TanStack Query."],
        projects: ["weather-interface", "auth-interface"],
      },
      {
        title: "Architecture",
        goal: "Structure a growing app.",
        topics: ["component-architecture", "state-management", "error-handling-ui"],
        milestone: "A dashboard with feature folders, shared UI primitives, and error boundaries.",
        exercises: ["Move a feature into its own folder with tests."],
        projects: ["dashboard-ui", "admin-dashboard"],
      },
    ],
  },
  {
    slug: "nextjs",
    title: "Next.js Developer",
    audience: "React developers",
    summary: "Build production sites with the App Router.",
    duration: "4–6 weeks",
    prerequisites: ["React and TypeScript"],
    stages: [
      {
        title: "Routing and rendering",
        goal: "Understand layouts and Server vs Client Components.",
        topics: ["nextjs"],
        milestone: "A multi-route site with shared layouts and dynamic pages.",
        exercises: ["Convert a client-fetching page to a Server Component."],
      },
      {
        title: "Metadata, performance, and content",
        goal: "Make it fast and discoverable.",
        topics: ["seo", "web-performance"],
        milestone: "Lighthouse scores of 95+ across the board on a content site.",
        exercises: ["Add Open Graph metadata and a sitemap."],
        projects: ["blog-interface"],
      },
      {
        title: "Full application",
        goal: "Ship a complete product UI.",
        topics: ["component-architecture", "production-frontend"],
        milestone: "Deploy a multi-page app with loading and error UI.",
        exercises: ["Add a global error boundary and not-found page."],
        projects: ["multi-page-nextjs-app", "saas-dashboard"],
      },
    ],
  },
  {
    slug: "frontend",
    title: "Frontend Developer",
    audience: "Career starters and switchers",
    summary: "The complete path from first tag to employable frontend developer.",
    duration: "9–12 months",
    prerequisites: ["None"],
    stages: [
      { title: "Web fundamentals", goal: "HTML, CSS, and accessibility.", topics: ["how-the-web-works", "html", "css", "accessibility", "responsive-design"], milestone: "A responsive, accessible portfolio.", exercises: ["Get a 100 Lighthouse accessibility score."], projects: ["personal-portfolio"] },
      { title: "JavaScript", goal: "Language core, DOM, and async.", topics: ["javascript", "dom-and-events", "async-javascript"], milestone: "Three framework-free apps.", exercises: ["Build a calculator, a to-do app, and a weather app."], projects: ["calculator", "todo-app", "weather-interface"] },
      { title: "Tooling", goal: "Git, npm, DevTools, linting.", topics: ["git", "package-managers", "browser-devtools", "linting-formatting"], milestone: "Contribute a pull request to an open-source project.", exercises: ["Set up ESLint and Prettier in a new repo."] },
      { title: "React and TypeScript", goal: "Component-driven development.", topics: ["typescript", "react", "typescript-react", "tailwind-css"], milestone: "A typed React dashboard.", exercises: ["Port a vanilla project to React."], projects: ["dashboard-ui"] },
      { title: "Next.js and data", goal: "Full-site development.", topics: ["nextjs", "tanstack-query", "forms-validation"], milestone: "A deployed multi-page app.", exercises: ["Add authentication UI."], projects: ["ecommerce-frontend", "blog-interface"] },
      { title: "Quality", goal: "Test and measure.", topics: ["testing", "web-performance", "frontend-security"], milestone: "CI that runs lint, tests, and a build.", exercises: ["Write one Playwright test for a critical flow."] },
    ],
  },
  {
    slug: "advanced-frontend",
    title: "Advanced Frontend Engineer",
    audience: "Developers with production experience",
    summary: "Architecture, performance, design systems, and engineering leadership skills.",
    duration: "Ongoing",
    prerequisites: ["React, TypeScript, and a shipped project"],
    stages: [
      { title: "Architecture", goal: "Scale codebases and teams.", topics: ["component-architecture", "state-management", "production-frontend"], milestone: "Document and migrate a feature to a cleaner boundary.", exercises: ["Write an architecture decision record."], projects: ["saas-dashboard"] },
      { title: "Design systems", goal: "Own a component platform.", topics: ["design-systems", "storybook", "radix-ui"], milestone: "A versioned component package with docs and tests.", exercises: ["Add automated accessibility checks to every story."], projects: ["design-system-build"] },
      { title: "Performance and security", goal: "Budgets, monitoring, and threat models.", topics: ["web-performance", "frontend-security"], milestone: "A performance budget enforced in CI.", exercises: ["Threat-model a form-heavy feature."], projects: ["complex-data-viz"] },
    ],
  },
  {
    slug: "ai-frontend",
    title: "AI-Powered Frontend Developer",
    audience: "Developers who know the fundamentals",
    summary: "Use AI tools professionally and build AI-powered interfaces.",
    duration: "4–6 weeks",
    prerequisites: ["HTML, CSS, JavaScript, and React basics"],
    stages: [
      { title: "Working with AI tools", goal: "Assist, don't abdicate.", topics: ["ai-assisted-development", "prompting-for-ui", "vibe-coding"], milestone: "Ship a feature where you can explain every generated line.", exercises: ["Keep a log of AI mistakes you caught in review."] },
      { title: "Agents and context", goal: "Give tools the right context.", topics: ["ai-coding-agents", "agent-skills", "mcp-frontend", "design-to-code"], milestone: "A repository with instructions, hooks, and checks an agent follows.", exercises: ["Write an AGENTS.md for one of your projects."] },
      { title: "Verification", goal: "Trust but verify.", topics: ["ai-code-review", "testing", "frontend-security"], milestone: "A review checklist applied to five generated PRs.", exercises: ["Find the bug in AI-generated code on purpose."] },
      { title: "Build AI interfaces", goal: "Streaming UI and safe previews.", topics: ["async-javascript", "error-handling-ui"], milestone: "A chat UI with streaming, stop, and retry.", exercises: ["Add safe markdown rendering."], projects: ["ai-chat-interface", "ai-website-builder"] },
    ],
  },
];

export const getRoadmap = (slug: string) => roadmaps.find((roadmap) => roadmap.slug === slug);
