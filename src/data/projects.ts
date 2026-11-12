export type ProjectLevel = "Beginner" | "Intermediate" | "Advanced";

export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  level: ProjectLevel;
};

/** Interactive demo projects (dataset 4/8 — 5 keys: slug, title, description, tags, level). */
export const projects: Project[] = [
  {
    slug: "responsive-navbar",
    title: "Responsive Navbar",
    description:
      "Mobile-first sticky navbar with hamburger toggle and animated underline hover effects.",
    tags: ["Tailwind", "Responsive", "JS"],
    level: "Beginner",
  },
  {
    slug: "landing-page",
    title: "Landing Page",
    description:
      "Full business landing page: Hero, About, Services, Contact form, Footer.",
    tags: ["Tailwind", "Font Awesome", "Responsive"],
    level: "Beginner",
  },
  {
    slug: "flexbox-layout",
    title: "Flexbox Showcase",
    description:
      "Visual, interactive demo of every major Flexbox property — containers and items.",
    tags: ["Flexbox", "CSS", "Interactive"],
    level: "Intermediate",
  },
  {
    slug: "css-grid",
    title: "CSS Grid Showcase",
    description:
      "Named template areas, magazine layout, auto-fill, and alignment demos.",
    tags: ["Grid", "CSS", "Layout"],
    level: "Intermediate",
  },
  {
    slug: "animations",
    title: "Animations",
    description:
      "Transitions, loaders, flip cards, progress bars, typewriter, and keyframe patterns.",
    tags: ["Animations", "Keyframes", "CSS"],
    level: "Intermediate",
  },
  {
    slug: "dark-mode",
    title: "Dark Mode Toggle",
    description:
      "CSS custom properties + JS localStorage toggle with system preference detection.",
    tags: ["CSS Variables", "JS", "Theming"],
    level: "Advanced",
  },
];

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);
