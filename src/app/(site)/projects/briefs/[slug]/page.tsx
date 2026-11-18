import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LearningContext } from "@/components/assistant/learning-context";
import { LevelPill } from "@/components/level-pill";
import { MarkDone } from "@/components/mark-done";
import { Playground } from "@/components/playground/playground";
import { getProjectBrief, projectBriefs } from "@/data/project-briefs";
import { getTechnology } from "@/data/technologies";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projectBriefs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const brief = getProjectBrief(slug);
  if (!brief) return { title: "Not found" };
  return {
    title: `${brief.title} — ${brief.level} project`,
    description: brief.summary,
    alternates: { canonical: `/projects/briefs/${brief.slug}` },
  };
}

export default async function ProjectBriefPage({ params }: PageProps) {
  const { slug } = await params;
  const brief = getProjectBrief(slug);
  if (!brief) notFound();

  const learns = brief.learns.map((s) => getTechnology(s)).filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <main id="main-content" className="wrap page">
      <LearningContext topic={`${brief.title} project`} location={`/projects/briefs/${brief.slug}`} />
      <nav aria-label="Breadcrumb" className="crumbs">
        <ol>
          <li>
            <Link href="/projects">Projects</Link>
          </li>
          <li aria-current="page">{brief.title}</li>
        </ol>
      </nav>

      <header className="page-head">
        <div className="tech-head__meta">
          <LevelPill level={brief.level} />
          {brief.technologies.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
        <h1>{brief.title}</h1>
        <p className="page-head__lead">{brief.summary}</p>
        <MarkDone id={`project:${brief.slug}`} label="Mark project complete" />
      </header>

      <div className="brief">
        <section aria-labelledby="req">
          <h2 id="req">Requirements</h2>
          <ul className="plain-list">
            {brief.requirements.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="design">
          <h2 id="design">Design reference</h2>
          <p>{brief.designNotes}</p>
        </section>

        <section aria-labelledby="skills">
          <h2 id="skills">You will practise</h2>
          <ul className="chips">
            {learns.map((t) => (
              <li key={t.slug}>
                <Link href={`/technologies/${t.slug}`}>{t.name}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="structure">
          <h2 id="structure">Folder structure</h2>
          <pre className="plain-pre">
            <code>{brief.structure}</code>
          </pre>
        </section>

        <section aria-labelledby="steps">
          <h2 id="steps">Step by step</h2>
          <ol className="steps">
            {brief.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </section>

        {brief.starter ? (
          <section aria-labelledby="solution">
            <h2 id="solution">Complete code &amp; live preview</h2>
            <p className="muted">
              Try to build it yourself first, then compare. The whole solution is a single file you can edit, run, copy, and reset.
            </p>
            <Playground id={`brief-${brief.slug}`} title={`${brief.title} — complete solution`} language="html" code={brief.starter} topic={`${brief.title} project`} previewFirst />
          </section>
        ) : (
          <section aria-labelledby="solution">
            <h2 id="solution">Complete code</h2>
            <p className="muted">
              This project needs a multi-file setup with a build tool or framework, so it is not run in the browser sandbox. Follow the steps above, and ask the AI assistant for scaffolding for any single file.
            </p>
          </section>
        )}

        {brief.demo && (
          <section aria-labelledby="demo">
            <h2 id="demo">Reference demo</h2>
            <p>
              See a finished version: <Link href={`/projects/${brief.demo}`}>open the interactive demo</Link>.
            </p>
          </section>
        )}

        <section aria-labelledby="challenges">
          <h2 id="challenges">Challenges</h2>
          <ul className="plain-list">
            {brief.challenges.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="improve">
          <h2 id="improve">Possible improvements</h2>
          <ul className="plain-list">
            {brief.improvements.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
