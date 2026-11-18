import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { domains, type DomainId } from "@/data/curriculum";
import { technologies } from "@/data/technologies";

export const metadata: Metadata = {
  title: "Practice",
  description: "Hands-on exercises and interview questions for every frontend technology.",
  alternates: { canonical: "/practice" },
};

export default function PracticePage() {
  const groups = domains
    .filter((d) => d.id !== "projects")
    .map((domain) => ({
      domain,
      techs: technologies.filter((t) => t.domain === (domain.id as DomainId) && ((t.exercises?.length ?? 0) > 0 || (t.interview?.length ?? 0) > 0)),
    }))
    .filter((g) => g.techs.length > 0);

  const exerciseCount = technologies.reduce((n, t) => n + (t.exercises?.length ?? 0), 0);
  const interviewCount = technologies.reduce((n, t) => n + (t.interview?.length ?? 0), 0);

  return (
    <main id="main-content" className="wrap page">
      <PageHeader
        eyebrow="Practice"
        title="Exercises and interview questions"
        description={`${exerciseCount} exercises and ${interviewCount} interview questions, grouped by domain. Try to answer before opening the answer. For bigger builds, see the projects.`}
      />
      <p>
        <Link className="btn btn--ghost" href="/projects">
          Browse projects →
        </Link>
      </p>

      {groups.map(({ domain, techs }) => (
        <section key={domain.id} className="domain" aria-labelledby={`p-${domain.id}`}>
          <div className="domain__head">
            <p className="eyebrow">Domain {domain.letter}</p>
            <h2 id={`p-${domain.id}`}>{domain.title}</h2>
          </div>
          {techs.map((tech) => (
            <div key={tech.slug} className="practice-tech">
              <h3>
                <Link href={`/technologies/${tech.slug}`}>{tech.name}</Link>
              </h3>
              {tech.exercises && (
                <>
                  <h4>Exercises</h4>
                  <ol className="steps">
                    {tech.exercises.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ol>
                </>
              )}
              {tech.interview && (
                <>
                  <h4>Interview questions</h4>
                  <div className="qa">
                    {tech.interview.map((item) => (
                      <details key={item.q}>
                        <summary>{item.q}</summary>
                        <p>{item.a}</p>
                      </details>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </section>
      ))}
    </main>
  );
}
