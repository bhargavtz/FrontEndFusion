import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export type DocCategory = "Learning Path" | "HTML" | "CSS" | "JavaScript" | "Reference";

export type Doc = {
  slug: string;
  title: string;
  description: string;
  category: DocCategory;
  order: number;
  body: string;
};

export type Snippet = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  icon: string;
  component: string;
  order: number;
  body: string;
};

function readCollection<T extends { slug: string; order?: number }>(
  directory: string,
  map: (data: Record<string, unknown>, body: string, slug: string) => T,
): T[] {
  const dir = path.join(CONTENT_ROOT, directory);

  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      return map(data, content, slug);
    })
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

export const docs: Doc[] = readCollection<Doc>("docs", (data, body, slug) => ({
  slug,
  title: asString(data.title, slug),
  description: asString(data.description),
  category:
    data.category === "Reference"
      ? "Reference"
      : data.category === "HTML"
        ? "HTML"
        : data.category === "CSS"
          ? "CSS"
          : data.category === "JavaScript"
            ? "JavaScript"
            : "Learning Path",
  order: typeof data.order === "number" ? data.order : 0,
  body,
}));

export const snippets: Snippet[] = readCollection<Snippet>("snippets", (data, body, slug) => ({
  slug,
  title: asString(data.title, slug),
  description: asString(data.description),
  tags: asStringArray(data.tags),
  icon: asString(data.icon, "📄"),
  component: asString(data.component),
  order: typeof data.order === "number" ? data.order : 0,
  body,
}));

export const getDoc = (slug: string) => docs.find((doc) => doc.slug === slug);

export const docsByCategory = (category: DocCategory) =>
  docs.filter((doc) => doc.category === category);

export const getSnippet = (slug: string) =>
  snippets.find((snippet) => snippet.slug === slug);
