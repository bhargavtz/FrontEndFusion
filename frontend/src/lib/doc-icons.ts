import { learningPath } from "@/data/learning-path";

const fallbackIcons: Record<string, string> = {
  accessibility: "♿",
  "seo-tips": "🔍",
  "javascript-basics": "⚡",
  "css-cheatsheet": "📋",
};

const learningIcons = new Map(
  learningPath.map((step) => [step.slug, step.icon]),
);

export function docIcon(slug: string) {
  return learningIcons.get(slug) ?? fallbackIcons[slug] ?? "📄";
}
