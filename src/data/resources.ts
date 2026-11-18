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
 * Reference guides and tools grouped by what you are trying to do.
 * Internal guides point at the in-app docs reader instead of raw markdown files.
 */
export const resourceGroups: ResourceGroup[] = [
  {
    title: "📖 Language & Platform References",
    items: [
      {
        title: "MDN Web Docs",
        href: "https://developer.mozilla.org/en-US/",
        icon: "📚",
        tint: "rgba(14,165,233,.15)",
      },
      {
        title: "javascript.info",
        href: "https://javascript.info/",
        icon: "⚡",
        tint: "rgba(234,179,8,.18)",
      },
      {
        title: "web.dev",
        href: "https://web.dev/",
        icon: "🌐",
        tint: "rgba(34,197,94,.15)",
      },
      {
        title: "Can I use…",
        href: "https://caniuse.com/",
        icon: "✅",
        tint: "rgba(139,92,246,.15)",
      },
      {
        title: "HTML Living Standard",
        href: "https://html.spec.whatwg.org/",
        icon: "📄",
        tint: "rgba(239,68,68,.12)",
      },
    ],
  },
  {
    title: "♿ Accessibility",
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
        title: "The A11Y Project",
        href: "https://www.a11yproject.com/",
        icon: "🧭",
        tint: "rgba(236,72,153,.12)",
      },
      {
        title: "Inclusive Components",
        href: "https://inclusive-components.design/",
        icon: "🧩",
        tint: "rgba(20,184,166,.15)",
      },
    ],
  },
  {
    title: "⚡ Performance & Core Web Vitals",
    items: [
      {
        title: "Google Lighthouse",
        href: "https://developers.google.com/web/tools/lighthouse/",
        icon: "🏮",
        tint: "rgba(239,68,68,.15)",
      },
      {
        title: "PageSpeed Insights",
        href: "https://pagespeed.web.dev/",
        icon: "📊",
        tint: "rgba(14,165,233,.15)",
      },
      {
        title: "WebPageTest",
        href: "https://www.webpagetest.org/",
        icon: "🧪",
        tint: "rgba(34,197,94,.15)",
      },
      {
        title: "Core Web Vitals guide",
        href: "https://web.dev/vitals/",
        icon: "📈",
        tint: "rgba(234,179,8,.15)",
      },
      {
        title: "Bundlephobia",
        href: "https://bundlephobia.com/",
        icon: "📦",
        tint: "rgba(139,92,246,.15)",
      },
    ],
  },
  {
    title: "🧪 Testing & Code Quality",
    items: [
      {
        title: "Playwright",
        href: "https://playwright.dev/",
        icon: "🎭",
        tint: "rgba(34,197,94,.15)",
      },
      {
        title: "Vitest",
        href: "https://vitest.dev/",
        icon: "⚡",
        tint: "rgba(234,179,8,.18)",
      },
      {
        title: "Testing Library",
        href: "https://testing-library.com/",
        icon: "🧪",
        tint: "rgba(239,68,68,.12)",
      },
      {
        title: "ESLint",
        href: "https://eslint.org/",
        icon: "🧹",
        tint: "rgba(139,92,246,.15)",
      },
      {
        title: "Prettier",
        href: "https://prettier.io/",
        icon: "✨",
        tint: "rgba(14,165,233,.15)",
      },
    ],
  },
  {
    title: "🎨 Design, CSS & UI",
    items: [
      {
        title: "Tailwind CSS docs",
        href: "https://tailwindcss.com/docs",
        icon: "🌬️",
        tint: "rgba(14,165,233,.15)",
      },
      {
        title: "shadcn/ui",
        href: "https://ui.shadcn.com/",
        icon: "🧱",
        tint: "rgba(15,23,42,.12)",
      },
      {
        title: "Radix Primitives",
        href: "https://www.radix-ui.com/primitives",
        icon: "♿",
        tint: "rgba(139,92,246,.15)",
      },
      {
        title: "CSS-Tricks",
        href: "https://css-tricks.com/",
        icon: "🎨",
        tint: "rgba(236,72,153,.12)",
      },
      {
        title: "Figma Learn",
        href: "https://help.figma.com/",
        icon: "🧭",
        tint: "rgba(34,197,94,.15)",
      },
    ],
  },
  {
    title: "🤖 AI-Assisted Development",
    items: [
      {
        title: "Anthropic — Claude docs",
        href: "https://docs.anthropic.com/",
        icon: "🤖",
        tint: "rgba(217,119,6,.15)",
      },
      {
        title: "Model Context Protocol",
        href: "https://modelcontextprotocol.io/",
        icon: "🔌",
        tint: "rgba(14,165,233,.15)",
      },
      {
        title: "OpenAI API docs",
        href: "https://platform.openai.com/docs/",
        icon: "🧠",
        tint: "rgba(16,185,129,.15)",
      },
      {
        title: "Prompt engineering guide",
        href: "https://www.promptingguide.ai/",
        icon: "✍️",
        tint: "rgba(139,92,246,.15)",
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
      {
        title: "Complete HTML reference",
        href: "/docs/html-basics",
        icon: "🌐",
        tint: "rgba(34,197,94,.15)",
      },
      {
        title: "Complete CSS reference",
        href: "/docs/css-fundamentals",
        icon: "🎨",
        tint: "rgba(236,72,153,.12)",
      },
    ],
  },
  {
    title: "🏋️ Practice & Inspiration",
    items: [
      {
        title: "Frontend Mentor",
        href: "https://www.frontendmentor.io/",
        icon: "🏆",
        tint: "rgba(234,179,8,.15)",
      },
      {
        title: "freeCodeCamp",
        href: "https://www.freecodecamp.org/",
        icon: "🎓",
        tint: "rgba(34,197,94,.15)",
      },
      {
        title: "CodePen",
        href: "https://codepen.io/",
        icon: "🖊️",
        tint: "rgba(15,23,42,.12)",
      },
      {
        title: "Awwwards",
        href: "https://www.awwwards.com/",
        icon: "✨",
        tint: "rgba(139,92,246,.15)",
      },
    ],
  },
];
