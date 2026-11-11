export type Feature = {
  icon: string;
  title: string;
  detail: string;
};

/** Hub highlights (dataset 3/8 — 3 keys: icon, title, detail). */
export const features: Feature[] = [
  { icon: "🎨", title: "Demo Projects", detail: "6 interactive projects" },
  { icon: "✂️", title: "Code Snippets", detail: "Ready-to-use forms" },
  { icon: "📚", title: "Learning Path", detail: "HTML → CSS → Advanced" },
  { icon: "♿", title: "Accessibility", detail: "WCAG best practices" },
];
