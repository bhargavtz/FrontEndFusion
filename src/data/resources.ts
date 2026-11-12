export type Resource = {
  title: string;
  href: string;
  icon: string;
  tint: string;
};

export type ResourceGroup = {
  title: string;
  items: Resource[];
};

/**
 * Reference guides (dataset 6/8 — 4 keys per resource: title, href, icon, tint).
 * Internal guides point at the in-app docs reader instead of raw markdown files.
 */
export const resourceGroups: ResourceGroup[] = [
  {
    title: "📖 Official Docs & Tools",
    items: [
      {
        title: "WebAIM — Web Accessibility In Mind",
        href: "https://webaim.org/",
        icon: "♿",
        tint: "rgba(129,196,132,.15)",
      },
      {
        title: "W3C Web Accessibility Initiative",
        href: "https://www.w3.org/WAI/",
        icon: "🌐",
        tint: "rgba(14,165,233,.15)",
      },
      {
        title: "Accessible Colors Checker",
        href: "https://accessible-colors.com/",
        icon: "🎨",
        tint: "rgba(234,179,8,.15)",
      },
      {
        title: "Google Lighthouse",
        href: "https://developers.google.com/web/tools/lighthouse/",
        icon: "🏮",
        tint: "rgba(239,68,68,.15)",
      },
    ],
  },
  {
    title: "📄 In-Project Guides",
    items: [
      {
        title: "Accessibility Best Practices (WCAG)",
        href: "/docs/accessibility",
        icon: "♿",
        tint: "rgba(129,196,132,.15)",
      },
      {
        title: "HTML & CSS Best Practices",
        href: "/docs/best-practices",
        icon: "⭐",
        tint: "rgba(139,92,246,.15)",
      },
      {
        title: "SEO Optimization Tips",
        href: "/docs/seo-tips",
        icon: "🔍",
        tint: "rgba(234,179,8,.15)",
      },
      {
        title: "JavaScript Basics Guide",
        href: "/docs/javascript-basics",
        icon: "⚡",
        tint: "rgba(234,179,8,.2)",
      },
      {
        title: "CSS Quick Reference Cheat Sheet",
        href: "/docs/css-cheatsheet",
        icon: "📋",
        tint: "rgba(14,165,233,.15)",
      },
    ],
  },
];
