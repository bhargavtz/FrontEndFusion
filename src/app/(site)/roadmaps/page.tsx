import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { roadmaps } from "@/data/roadmaps";

export const metadata: Metadata = {
  title: "Frontend roadmaps",
  description: "Step-by-step learning roadmaps for HTML, CSS, JavaScript, TypeScript, React, Next.js, frontend engineering, and AI-powered development.",
  alternates: { canonical: "/roadmaps" },
};

export default function RoadmapsPage() {
  const featured = roadmaps.filter((r) => r.slug === "frontend" || r.slug === "ai-frontend" || r.slug === "advanced-frontend");
  const focused = roadmaps.filter((r) => !featured.includes(r));

  return (
    <main id="main-content" className="wrap page">
      <PageHeader
        eyebrow="Roadmaps"
        title="Pick a path, then follow it"
        description="Each roadmap lists prerequisites, stages with a clear milestone, exercises, projects, and the lessons to read. Not sure where to start? Take the Frontend Developer path."
      />

      <h2 className="subhead">Career paths</h2>
      <ul className="rows">
        {featured.map((r) => (
          <li key={r.slug}>
            <Link href={`/roadmaps/${r.slug}`} className="row">
              <span className="row__main">
                <span className="row__title">{r.title}</span>
                <span className="row__desc">{r.summary}</span>
              </span>
              <span className="row__meta">
                <span className="row__count">{r.stages.length} stages</span>
                <span className="row__count">{r.duration}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="subhead">Focused skills</h2>
      <ul className="rows">
        {focused.map((r) => (
          <li key={r.slug}>
            <Link href={`/roadmaps/${r.slug}`} className="row">
              <span className="row__main">
                <span className="row__title">{r.title}</span>
                <span className="row__desc">{r.summary}</span>
              </span>
              <span className="row__meta">
                <span className="row__count">{r.stages.length} stages</span>
                <span className="row__count">{r.duration}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
