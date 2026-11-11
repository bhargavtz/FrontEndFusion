import fs from "node:fs";
import path from "node:path";

export type Heading = {
  id: string;
  text: string;
  depth: 2 | 3;
};

const DOCS_DIR = path.join(process.cwd(), "content", "docs");

export function readDocSource(slug: string) {
  const filePath = path.join(DOCS_DIR, `${slug}.md`);
  return fs.readFileSync(filePath, "utf8");
}

/** Remove the leading H1 so the page header is the only page title. */
export function stripLeadingTitle(markdown: string) {
  return markdown.replace(/^#\s+.+\r?\n+/, "");
}

export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-");
}

/**
 * Creates a stateful slugger so repeated headings get unique ids
 * (`example`, `example-1`, `example-2`, …). The docs page and the Markdown
 * renderer both walk headings in document order, so their ids stay in sync.
 */
export function createHeadingId() {
  const counts = new Map<string, number>();

  return (text: string) => {
    const base = slugifyHeading(text);
    const count = counts.get(base) ?? 0;
    counts.set(base, count + 1);
    return count === 0 ? base : `${base}-${count}`;
  };
}

export function extractHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  const nextId = createHeadingId();
  let insideFence = false;

  for (const rawLine of markdown.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (line.startsWith("```")) {
      insideFence = !insideFence;
      continue;
    }
    if (insideFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;

    const text = match[2].replace(/[`*_]/g, "").trim();
    headings.push({
      id: nextId(text),
      text,
      depth: match[1].length as 2 | 3,
    });
  }

  return headings;
}
