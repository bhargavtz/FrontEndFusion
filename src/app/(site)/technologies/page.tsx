import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { TechnologyBrowser, type TechRow } from "@/components/technology-browser";
import { domains } from "@/data/curriculum";
import { technologies } from "@/data/technologies";
import { lessonsFor } from "@/lib/learn";

export const metadata: Metadata = {
  title: "Technologies",
  description: "Every frontend technology on FrontEndFusion — languages, frameworks, UI libraries, tools, and AI workflows — with runnable examples.",
  alternates: { canonical: "/technologies" },
};

export default function TechnologiesPage() {
  const rows: TechRow[] = technologies.map((tech) => ({
    slug: tech.slug,
    name: tech.name,
    summary: tech.summary,
    domain: tech.domain,
    level: tech.level,
    concepts: tech.concepts,
    lessons: lessonsFor(tech).length,
    examples: tech.examples?.length ?? 0,
  }));

  return (
    <main id="main-content" className="wrap page">
      <PageHeader
        eyebrow="Technologies"
        title="Every technology, one structure"
        description="Filter by domain or level. Core concepts and framework-specific pages are kept separate, so you learn the idea before the implementation."
      />
      <TechnologyBrowser rows={rows} domains={domains.filter((d) => d.id !== "projects").map((d) => ({ id: d.id, title: d.title }))} />
    </main>
  );
}
