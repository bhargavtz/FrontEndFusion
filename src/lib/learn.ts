import { docs, type Doc } from "@/data/docs";
import { domains } from "@/data/curriculum";
import { technologies, type Technology } from "@/data/technologies";
import { projectBriefs } from "@/data/project-briefs";
import { projects } from "@/data/projects";
import { roadmaps } from "@/data/roadmaps";
import { snippets } from "@/data/snippets";

/** Lessons (MDX guides) that belong to a technology, in curriculum order. */
export function lessonsFor(technology: Technology): Doc[] {
  const explicit = (technology.guides ?? [])
    .map((slug) => docs.find((doc) => doc.slug === slug))
    .filter((doc): doc is Doc => Boolean(doc));
  const prefixed = technology.guidePrefix
    ? docs.filter(
        (doc) =>
          doc.slug.startsWith(technology.guidePrefix!) &&
          !explicit.some((e) => e.slug === doc.slug),
      )
    : [];
  return [...explicit, ...prefixed];
}

export function technologyHref(slug: string) {
  return `/technologies/${slug}`;
}

export type SearchKind =
  | "Technology"
  | "Lesson"
  | "Roadmap"
  | "Project"
  | "Snippet"
  | "Interview"
  | "Example"
  | "Tool"
  | "Domain";

export type SearchEntry = {
  id: string;
  kind: SearchKind;
  title: string;
  description: string;
  href: string;
  /** Extra searchable words. */
  keywords: string;
};

/** Flat, serialisable index consumed by the command palette. Built at build time. */
export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];

  for (const domain of domains) {
    entries.push({
      id: `domain:${domain.id}`,
      kind: "Domain",
      title: domain.title,
      description: domain.tagline,
      href: domain.href,
      keywords: domain.description,
    });
  }

  for (const tech of technologies) {
    const isTool = tech.domain === "tooling" || tech.domain === "ui-libraries";
    entries.push({
      id: `tech:${tech.slug}`,
      kind: isTool ? "Tool" : "Technology",
      title: tech.name,
      description: tech.summary,
      href: technologyHref(tech.slug),
      keywords: tech.concepts.join(" "),
    });
    for (const example of tech.examples ?? []) {
      entries.push({
        id: `example:${tech.slug}:${example.title}`,
        kind: "Example",
        title: example.title,
        description: `${tech.name} · ${example.language.toUpperCase()} example`,
        href: `${technologyHref(tech.slug)}#examples`,
        keywords: example.code.slice(0, 400),
      });
    }
    for (const item of tech.interview ?? []) {
      entries.push({
        id: `interview:${tech.slug}:${item.q}`,
        kind: "Interview",
        title: item.q,
        description: `${tech.name} interview question`,
        href: `${technologyHref(tech.slug)}#interview`,
        keywords: item.a,
      });
    }
  }

  for (const doc of docs) {
    entries.push({
      id: `doc:${doc.slug}`,
      kind: "Lesson",
      title: doc.title,
      description: doc.description,
      href: `/docs/${doc.slug}`,
      keywords: doc.category,
    });
  }

  for (const roadmap of roadmaps) {
    entries.push({
      id: `roadmap:${roadmap.slug}`,
      kind: "Roadmap",
      title: `${roadmap.title} Roadmap`,
      description: roadmap.summary,
      href: `/roadmaps/${roadmap.slug}`,
      keywords: roadmap.stages.map((stage) => stage.title).join(" "),
    });
  }

  for (const brief of projectBriefs) {
    entries.push({
      id: `project:${brief.slug}`,
      kind: "Project",
      title: brief.title,
      description: `${brief.level} · ${brief.summary}`,
      href: `/projects/briefs/${brief.slug}`,
      keywords: brief.technologies.join(" "),
    });
  }

  for (const project of projects) {
    entries.push({
      id: `demo:${project.slug}`,
      kind: "Project",
      title: `${project.title} (demo)`,
      description: project.description,
      href: `/projects/${project.slug}`,
      keywords: project.tags.join(" "),
    });
  }

  for (const snippet of snippets) {
    entries.push({
      id: `snippet:${snippet.slug}`,
      kind: "Snippet",
      title: snippet.title,
      description: snippet.description,
      href: `/snippets/${snippet.slug}`,
      keywords: snippet.tags.join(" "),
    });
  }

  return entries;
}
