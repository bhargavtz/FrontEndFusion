import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { LevelPill } from "@/components/level-pill";
import { MarkDone } from "@/components/mark-done";
import { Playground } from "@/components/playground/playground";
import { LearningContext } from "@/components/assistant/learning-context";
import { getDomain } from "@/data/curriculum";
import { getProjectBrief } from "@/data/project-briefs";
import { getTechnology, technologies } from "@/data/technologies";
import { lessonsFor } from "@/lib/learn";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return technologies.map((tech) => ({ slug: tech.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tech = getTechnology(slug);
  if (!tech) return { title: "Not found" };
  return {
    title: `${tech.name} — learn, run and practise`,
    description: tech.summary,
    alternates: { canonical: `/technologies/${tech.slug}` },
    openGraph: { title: `${tech.name} — FrontEndFusion`, description: tech.summary, type: "article" },
  };
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="tsec" aria-labelledby={`${id}-h`}>
      <h2 id={`${id}-h`}>{title}</h2>
      {children}
    </section>
  );
}

const List = ({ items }: { items: string[] }) => (
  <ul className="plain-list">
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

export default async function TechnologyPage({ params }: PageProps) {
  const { slug } = await params;
  const tech = getTechnology(slug);
  if (!tech) notFound();

  const domain = getDomain(tech.domain);
  const lessons = lessonsFor(tech);
  const related = (tech.related ?? []).map((s) => getTechnology(s)).filter((t): t is NonNullable<typeof t> => Boolean(t));
  const prerequisites = (tech.prerequisites ?? []).map((s) => getTechnology(s)).filter((t): t is NonNullable<typeof t> => Boolean(t));
  const briefs = (tech.projects ?? []).map((s) => getProjectBrief(s)).filter((b): b is NonNullable<typeof b> => Boolean(b));

  const toc: { id: string; label: string }[] = [
    { id: "overview", label: "Overview" },
    ...(tech.how ? [{ id: "how", label: "How it works" }] : []),
    ...(tech.prerequisites?.length ? [{ id: "prerequisites", label: "Prerequisites" }] : []),
    ...(tech.roadmap?.length ? [{ id: "roadmap", label: "Learning roadmap" }] : []),
    { id: "fundamentals", label: "Fundamentals" },
    ...(tech.examples?.length ? [{ id: "examples", label: "Examples & live preview" }] : []),
    ...(tech.advanced?.length ? [{ id: "advanced", label: "Advanced concepts" }] : []),
    ...(tech.bestPractices?.length ? [{ id: "best-practices", label: "Best practices" }] : []),
    ...(tech.mistakes?.length ? [{ id: "mistakes", label: "Common mistakes" }] : []),
    ...(tech.performance?.length ? [{ id: "performance", label: "Performance" }] : []),
    ...(tech.useCases?.length ? [{ id: "use-cases", label: "Real-world use cases" }] : []),
    ...(tech.interview?.length ? [{ id: "interview", label: "Interview questions" }] : []),
    ...(tech.exercises?.length ? [{ id: "exercises", label: "Exercises" }] : []),
    ...(briefs.length ? [{ id: "projects", label: "Projects" }] : []),
    ...(lessons.length ? [{ id: "lessons", label: `Lessons (${lessons.length})` }] : []),
    { id: "docs", label: "Official documentation" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: tech.name,
    description: tech.summary,
    proficiencyLevel: tech.level,
    publisher: { "@type": "Organization", name: "FrontEndFusion" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LearningContext topic={tech.name} location={`/technologies/${tech.slug}`} />
      <main id="main-content" className="wrap page">
        <nav aria-label="Breadcrumb" className="crumbs">
          <ol>
            <li>
              <Link href="/learn">Learn</Link>
            </li>
            {domain && (
              <li>
                <Link href={domain.href}>{domain.title}</Link>
              </li>
            )}
            <li aria-current="page">{tech.name}</li>
          </ol>
        </nav>

        <div className="doc-layout">
          <article className="doc-main">
            <header className="tech-head">
              <div className="tech-head__meta">
                <LevelPill level={tech.level} />
                {domain && <span className="tag">{domain.title}</span>}
                {lessons.length > 0 && <span className="tag">{lessons.length} lessons</span>}
                {(tech.examples?.length ?? 0) > 0 && <span className="tag">{tech.examples!.length} runnable examples</span>}
              </div>
              <h1>{tech.name}</h1>
              <p className="page-head__lead">{tech.summary}</p>
              <MarkDone id={`tech:${tech.slug}`} label="Mark technology as learned" />
            </header>

            <Section id="overview" title="Overview">
              <h3>What is it?</h3>
              <p>{tech.what}</p>
              <h3>Why does it exist?</h3>
              <p>{tech.why}</p>
            </Section>

            {tech.how && (
              <Section id="how" title="How it works">
                <p>{tech.how}</p>
              </Section>
            )}

            {prerequisites.length > 0 && (
              <Section id="prerequisites" title="Prerequisites">
                <ul className="plain-list">
                  {prerequisites.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/technologies/${p.slug}`}>{p.name}</Link> — {p.summary.split(/[.:]/)[0]}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {tech.roadmap && (
              <Section id="roadmap" title="Learning roadmap">
                <ol className="steps">
                  {tech.roadmap.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </Section>
            )}

            <Section id="fundamentals" title="Fundamentals">
              <p>The core ideas to be comfortable with:</p>
              <List items={tech.concepts} />
            </Section>

            {tech.examples && (
              <Section id="examples" title="Examples & live preview">
                <p className="muted">
                  Edit any example and the preview updates. Select lines and use <em>Copy selection</em> to copy a snippet, or <em>Ask AI</em> to explain what you selected.
                </p>
                {tech.examples.map((example, index) => (
                  <Playground
                    key={example.title}
                    id={`${tech.slug}-${index}`}
                    title={example.title}
                    language={example.language}
                    code={example.code}
                    markup={example.markup}
                    explanation={example.explanation}
                    topic={tech.name}
                  />
                ))}
              </Section>
            )}

            {tech.advanced && (
              <Section id="advanced" title="Advanced concepts">
                <List items={tech.advanced} />
              </Section>
            )}
            {tech.bestPractices && (
              <Section id="best-practices" title="Best practices">
                <List items={tech.bestPractices} />
              </Section>
            )}
            {tech.mistakes && (
              <Section id="mistakes" title="Common mistakes">
                <List items={tech.mistakes} />
              </Section>
            )}
            {tech.performance && (
              <Section id="performance" title="Performance considerations">
                <List items={tech.performance} />
              </Section>
            )}
            {tech.useCases && (
              <Section id="use-cases" title="Real-world use cases">
                <List items={tech.useCases} />
              </Section>
            )}

            {tech.interview && (
              <Section id="interview" title="Interview questions">
                <div className="qa">
                  {tech.interview.map((item) => (
                    <details key={item.q}>
                      <summary>{item.q}</summary>
                      <p>{item.a}</p>
                    </details>
                  ))}
                </div>
              </Section>
            )}

            {tech.exercises && (
              <Section id="exercises" title="Practical exercises">
                <ol className="steps">
                  {tech.exercises.map((exercise) => (
                    <li key={exercise}>{exercise}</li>
                  ))}
                </ol>
              </Section>
            )}

            {briefs.length > 0 && (
              <Section id="projects" title="Projects">
                <ul className="rows">
                  {briefs.map((brief) => (
                    <li key={brief.slug}>
                      <Link href={`/projects/briefs/${brief.slug}`} className="row">
                        <span className="row__main">
                          <span className="row__title">{brief.title}</span>
                          <span className="row__desc">{brief.summary}</span>
                        </span>
                        <LevelPill level={brief.level} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {lessons.length > 0 && (
              <Section id="lessons" title={`Lessons (${lessons.length})`}>
                <p className="muted">In-depth guides with code, in curriculum order.</p>
                <ol className="lesson-list">
                  {lessons.map((lesson) => (
                    <li key={lesson.slug}>
                      <Link href={`/docs/${lesson.slug}`}>
                        <span>{lesson.title}</span>
                        <span className="muted">{lesson.description}</span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </Section>
            )}

            <Section id="docs" title="Official documentation">
              <ul className="plain-list">
                {tech.docs.map((doc) => (
                  <li key={doc.href}>
                    <a href={doc.href} target="_blank" rel="noopener noreferrer">
                      {doc.label} <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Section>

            {related.length > 0 && (
              <Section id="related" title="Keep going">
                <ul className="rows">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/technologies/${r.slug}`} className="row">
                        <span className="row__main">
                          <span className="row__title">{r.name}</span>
                          <span className="row__desc">{r.summary}</span>
                        </span>
                        <LevelPill level={r.level} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Section>
            )}
          </article>

          <aside className="toc" aria-label="On this page">
            <p className="toc__title">On this page</p>
            <ul>
              {toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>{item.label}</a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </main>
    </>
  );
}
