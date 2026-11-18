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
  if (slug.startsWith("html-") && slug !== "html-basics") return "🌐";
  if (
    slug.startsWith("css-") &&
    slug !== "css-fundamentals" &&
    slug !== "css-cheatsheet"
  ) {
    return "🎨";
  }
  return learningIcons.get(slug) ?? fallbackIcons[slug] ?? "📄";
}
