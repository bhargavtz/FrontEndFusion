export type DocCategory = "Learning Path" | "Reference";

export type Doc = {
  slug: string;
  title: string;
  description: string;
  category: DocCategory;
};

/** In-app guide library (dataset 8/8 — 4 keys: slug, title, description, category). */
export const docs: Doc[] = [
  {
    slug: "html-basics",
    title: "HTML Basics",
    description:
      "Learn HTML from the ground up: structure, elements, text, links, lists, tables, forms, semantic markup, media, and accessibility.",
    category: "Learning Path",
  },
  {
    slug: "css-fundamentals",
    title: "CSS Fundamentals",
    description:
      "Selectors, the box model, positioning, Flexbox, and CSS Grid — the foundation of every layout.",
    category: "Learning Path",
  },
  {
    slug: "responsive-design",
    title: "Responsive Design",
    description:
      "Media queries, mobile-first thinking, fluid type and spacing, and responsive layouts with Flexbox and Grid.",
    category: "Learning Path",
  },
  {
    slug: "advanced-topics",
    title: "Advanced CSS",
    description:
      "Custom properties, transitions, keyframe animations, pseudo-elements, filters, clamp(), and more.",
    category: "Learning Path",
  },
  {
    slug: "best-practices",
    title: "Frontend Best Practices",
    description:
      "Habits that keep code maintainable: semantic HTML, scalable CSS, performance, accessibility, and Git workflow.",
    category: "Learning Path",
  },
  {
    slug: "accessibility",
    title: "Accessibility Best Practices (WCAG)",
    description:
      "Practical WCAG guidance: semantics, contrast, keyboard access, ARIA, media alternatives, and testing.",
    category: "Reference",
  },
  {
    slug: "seo-tips",
    title: "SEO Optimization Tips",
    description:
      "Semantic markup, metadata, heading hierarchy, performance, and structured data for discoverability.",
    category: "Reference",
  },
  {
    slug: "javascript-basics",
    title: "JavaScript Basics",
    description:
      "DOM selection, events, fetch, localStorage, and the vanilla JavaScript patterns behind interactive UIs.",
    category: "Reference",
  },
  {
    slug: "css-cheatsheet",
    title: "CSS Quick Reference",
    description:
      "Selectors, units, layout, typography, color, and modern CSS functions in one scannable sheet.",
    category: "Reference",
  },
];

export const getDoc = (slug: string) => docs.find((doc) => doc.slug === slug);

export const docsByCategory = (category: DocCategory) =>
  docs.filter((doc) => doc.category === category);
