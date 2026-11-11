import type { ProjectLevel } from "./projects";

export type LearningStep = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  level: ProjectLevel;
};

/** Structured curriculum (dataset 7/8 — 5 keys: slug, title, description, icon, level). */
export const learningPath: LearningStep[] = [
  {
    slug: "html-basics",
    title: "HTML Basics",
    description: "Structure, semantic tags, forms, multimedia, and accessibility.",
    icon: "📐",
    level: "Beginner",
  },
  {
    slug: "css-fundamentals",
    title: "CSS Fundamentals",
    description: "Selectors, box model, positioning, Flexbox, and CSS Grid basics.",
    icon: "🎨",
    level: "Beginner",
  },
  {
    slug: "responsive-design",
    title: "Responsive Design",
    description: "Media queries, mobile-first approach, Flexbox & Grid layouts.",
    icon: "📱",
    level: "Intermediate",
  },
  {
    slug: "advanced-topics",
    title: "Advanced CSS",
    description:
      "Custom properties, animations, transitions, pseudo-elements, filters, clamp().",
    icon: "✨",
    level: "Advanced",
  },
  {
    slug: "best-practices",
    title: "Best Practices",
    description:
      "BEM, utility-first CSS, performance, accessibility, and Git workflow.",
    icon: "⭐",
    level: "Intermediate",
  },
  {
    slug: "javascript-basics",
    title: "JavaScript Basics",
    description: "DOM, events, fetch API, localStorage, and vanilla JS patterns.",
    icon: "⚡",
    level: "Intermediate",
  },
];
