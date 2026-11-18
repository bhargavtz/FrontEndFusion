import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { LevelPill } from "@/components/level-pill";
import { DoneTick } from "@/components/mark-done";
import { domains } from "@/data/curriculum";
import { technologiesByDomain } from "@/data/technologies";
import { projectBriefs } from "@/data/project-briefs";
import { lessonsFor } from "@/lib/learn";

export const metadata: Metadata = {
  title: "Learn frontend development",
  description:
    "The complete frontend curriculum: web fundamentals, JavaScript, TypeScript, the CSS ecosystem, frameworks, UI libraries, tooling, architecture, and AI-powered development.",
  alternates: { canonical: "/learn" },
};

export default function LearnPage() {
  return (
    <main id="main-content" className="wrap page">
      <PageHeader
        eyebrow="Curriculum"
        title="Learn frontend, in order"
        description="Ten domains, from how the web works to AI-powered engineering. Each technology page follows the same shape: what it is, why it exists, how it works, runnable examples, mistakes, interview questions, and exercises."
      />

      <nav aria-label="Curriculum domains" className="chip-row">
        {domains.map((domain) => (
          <a key={domain.id} href={`#${domain.id}`} className="chip">
            <span className="chip__letter">{domain.letter}</span> {domain.title}
          </a>
        ))}
      </nav>

      {domains.map((domain) => {
        const techs = technologiesByDomain(domain.id);
        return (
          <section key={domain.id} id={domain.id} className="domain" aria-labelledby={`${domain.id}-h`}>
            <div className="domain__head">
              <p className="eyebrow">Domain {domain.letter}</p>
              <h2 id={`${domain.id}-h`}>{domain.title}</h2>
              <p>{domain.description}</p>
            </div>

            {domain.id === "projects" ? (
              <ul className="rows">
                {projectBriefs.map((brief) => (
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
            ) : (
              <ul className="rows">
                {techs.map((tech) => {
                  const lessons = lessonsFor(tech).length;
                  return (
                    <li key={tech.slug}>
                      <Link href={`/technologies/${tech.slug}`} className="row">
                        <span className="row__main">
                          <span className="row__title">
                            {tech.name} <DoneTick id={`tech:${tech.slug}`} />
                          </span>
                          <span className="row__desc">{tech.summary}</span>
                        </span>
                        <span className="row__meta">
                          {lessons > 0 && <span className="row__count">{lessons} lessons</span>}
                          <LevelPill level={tech.level} />
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        );
      })}
    </main>
  );
}
