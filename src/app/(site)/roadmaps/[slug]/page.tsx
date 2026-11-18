import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LearningContext } from "@/components/assistant/learning-context";
import { MarkDone } from "@/components/mark-done";
import { getProjectBrief } from "@/data/project-briefs";
import { getRoadmap, roadmaps } from "@/data/roadmaps";
import { getTechnology } from "@/data/technologies";
import { docs } from "@/data/docs";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return roadmaps.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const roadmap = getRoadmap(slug);
  if (!roadmap) return { title: "Not found" };
  return {
    title: `${roadmap.title} roadmap`,
    description: roadmap.summary,
    alternates: { canonical: `/roadmaps/${roadmap.slug}` },
  };
}

export default async function RoadmapPage({ params }: PageProps) {
  const { slug } = await params;
  const roadmap = getRoadmap(slug);
  if (!roadmap) notFound();

  const index = roadmaps.findIndex((r) => r.slug === roadmap.slug);
  const next = roadmaps[index + 1];

  return (
    <main id="main-content" className="wrap page">
      <LearningContext topic={`${roadmap.title} roadmap`} location={`/roadmaps/${roadmap.slug}`} />
      <nav aria-label="Breadcrumb" className="crumbs">
        <ol>
          <li>
            <Link href="/roadmaps">Roadmaps</Link>
          </li>
          <li aria-current="page">{roadmap.title}</li>
        </ol>
      </nav>

      <header className="page-head">
        <p className="eyebrow">Roadmap</p>
        <h1>{roadmap.title} roadmap</h1>
        <p className="page-head__lead">{roadmap.summary}</p>
        <dl className="facts">
          <div>
            <dt>For</dt>
            <dd>{roadmap.audience}</dd>
          </div>
          <div>
            <dt>Time</dt>
            <dd>{roadmap.duration}</dd>
          </div>
          <div>
            <dt>Prerequisites</dt>
            <dd>{roadmap.prerequisites.join(", ")}</dd>
          </div>
        </dl>
      </header>

      <ol className="stages">
        {roadmap.stages.map((stage, i) => {
          const topics = stage.topics.map((t) => getTechnology(t)).filter((t): t is NonNullable<typeof t> => Boolean(t));
          const guides = (stage.guides ?? []).map((g) => docs.find((d) => d.slug === g)).filter((d): d is NonNullable<typeof d> => Boolean(d));
          const projects = (stage.projects ?? []).map((p) => getProjectBrief(p)).filter((p): p is NonNullable<typeof p> => Boolean(p));
          return (
            <li key={stage.title} className="stage">
              <div className="stage__num" aria-hidden="true">
                {i + 1}
              </div>
              <div className="stage__body">
                <h2>{stage.title}</h2>
                <p className="muted">{stage.goal}</p>

                <h3>Topics</h3>
                <ul className="chips">
                  {topics.map((t) => (
                    <li key={t.slug}>
                      <Link href={`/technologies/${t.slug}`}>{t.name}</Link>
                    </li>
                  ))}
                </ul>

                {guides.length > 0 && (
                  <>
                    <h3>Read</h3>
                    <ul className="plain-list">
                      {guides.map((g) => (
                        <li key={g.slug}>
                          <Link href={`/docs/${g.slug}`}>{g.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <h3>Practise</h3>
                <ul className="plain-list">
                  {stage.exercises.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>

                {projects.length > 0 && (
                  <>
                    <h3>Build</h3>
                    <ul className="plain-list">
                      {projects.map((p) => (
                        <li key={p.slug}>
                          <Link href={`/projects/briefs/${p.slug}`}>{p.title}</Link> — {p.level}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <p className="milestone">
                  <strong>Milestone:</strong> {stage.milestone}
                </p>
                <MarkDone id={`stage:${roadmap.slug}:${i}`} label="Mark stage complete" />
              </div>
            </li>
          );
        })}
      </ol>

      {next && (
        <p className="next-link">
          Next roadmap: <Link href={`/roadmaps/${next.slug}`}>{next.title}</Link>
        </p>
      )}
    </main>
  );
}
