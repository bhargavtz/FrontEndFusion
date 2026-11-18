import type { ProjectLevel } from "./projects";

/**
 * The FrontEndFusion learning taxonomy.
 *
 * Domain → Technology → Lesson (MDX guide in content/docs).
 * Domains are fixed product categories; technologies live in
 * src/data/technologies/*; lessons are matched to technologies by
 * `guidePrefix` (e.g. every `css-*.mdx` guide belongs to CSS).
 */
export type DomainId =
  | "web-fundamentals"
  | "javascript"
  | "typescript"
  | "css-ecosystem"
  | "frameworks"
  | "ui-libraries"
  | "tooling"
  | "architecture"
  | "ai-development"
  | "projects";

export type Domain = {
  id: DomainId;
  letter: string;
  title: string;
  tagline: string;
  description: string;
  /** Primary entry point for the domain. */
  href: string;
};

export const domains: Domain[] = [
  {
    id: "web-fundamentals",
    letter: "A",
    title: "Web Fundamentals",
    tagline: "How the web works, HTML, CSS, accessibility",
    description:
      "The platform underneath every framework: how browsers fetch and render pages, semantic HTML, accessible markup, and the CSS layout engine.",
    href: "/learn#web-fundamentals",
  },
  {
    id: "javascript",
    letter: "B",
    title: "JavaScript",
    tagline: "The language of the browser",
    description:
      "Values, functions, objects, the DOM, events, async code, the event loop, modules, browser APIs, and performance.",
    href: "/learn#javascript",
  },
  {
    id: "typescript",
    letter: "C",
    title: "TypeScript",
    tagline: "Types for JavaScript at scale",
    description:
      "Static types, inference, narrowing, generics, utility types, and typing React components safely.",
    href: "/learn#typescript",
  },
  {
    id: "css-ecosystem",
    letter: "D",
    title: "CSS Ecosystem",
    tagline: "Tailwind, Sass, CSS Modules, design systems",
    description:
      "How teams style real products: utility-first CSS, preprocessors, scoped styles, CSS-in-JS, and token-driven design systems.",
    href: "/learn#css-ecosystem",
  },
  {
    id: "frameworks",
    letter: "E",
    title: "Frameworks",
    tagline: "React, Next.js, Vue, Svelte, Angular, Astro",
    description:
      "Component models, rendering strategies, and routing. Learn the shared concepts first, then see how each framework implements them.",
    href: "/learn#frameworks",
  },
  {
    id: "ui-libraries",
    letter: "F",
    title: "UI Libraries",
    tagline: "shadcn/ui, Radix, MUI, Motion, icons",
    description:
      "Component libraries, headless primitives, animation libraries, and icon sets — what each is for and when to pick it.",
    href: "/learn#ui-libraries",
  },
  {
    id: "tooling",
    letter: "G",
    title: "Tools & Workflow",
    tagline: "Git, npm, Vite, DevTools, testing",
    description:
      "The daily toolkit: editors, version control, package managers, bundlers, linters, browser DevTools, and test runners.",
    href: "/learn#tooling",
  },
  {
    id: "architecture",
    letter: "H",
    title: "Architecture & Engineering",
    tagline: "State, data fetching, performance, security",
    description:
      "Building frontends that survive growth: component architecture, state management, forms, performance budgets, security, and testing strategy.",
    href: "/learn#architecture",
  },
  {
    id: "ai-development",
    letter: "I",
    title: "AI-Powered Development",
    tagline: "Claude Code, Cursor, Copilot, MCP",
    description:
      "Using AI coding tools professionally: prompting for UI, design-to-code, AI review and debugging, MCP, agent skills — and reviewing every line yourself.",
    href: "/ai",
  },
  {
    id: "projects",
    letter: "J",
    title: "Projects",
    tagline: "Beginner to advanced builds",
    description:
      "Seventeen project briefs with requirements, structure, steps, and challenges, plus six interactive demos.",
    href: "/projects",
  },
];

export const getDomain = (id: DomainId) => domains.find((domain) => domain.id === id);

export const levels: ProjectLevel[] = ["Beginner", "Intermediate", "Advanced"];
