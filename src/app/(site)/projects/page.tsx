import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { ProjectTable } from "@/components/project-table";
import { levels } from "@/data/curriculum";
import { projectBriefs } from "@/data/project-briefs";

export const metadata: Metadata = {
  title: "Projects",
  description: "Seventeen frontend project briefs from beginner to advanced, plus six interactive demos.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <main id="main-content" className="wrap page">
      <PageHeader
        eyebrow="Projects"
        title="Build real things"
        description="Each brief has requirements, design notes, technologies, a folder structure, step-by-step guidance, challenges, and ideas to extend it. The calculator and to-do projects include a complete, runnable solution."
      />

      {levels.map((level) => (
        <section key={level} className="domain" aria-labelledby={`lvl-${level}`}>
          <div className="domain__head">
            <h2 id={`lvl-${level}`}>{level}</h2>
          </div>
          <ul className="rows">
            {projectBriefs
              .filter((b) => b.level === level)
              .map((brief) => (
                <li key={brief.slug}>
                  <Link href={`/projects/briefs/${brief.slug}`} className="row">
                    <span className="row__main">
                      <span className="row__title">{brief.title}</span>
                      <span className="row__desc">{brief.summary}</span>
                    </span>
                    <span className="row__meta">
                      {brief.starter && <span className="row__count">runnable solution</span>}
                      <span className="row__count">{brief.technologies.slice(0, 3).join(" · ")}</span>
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      ))}

      <section className="domain" aria-labelledby="demos">
        <div className="domain__head">
          <h2 id="demos">Interactive demos</h2>
          <p>Full-page demonstrations of layout, theming, and animation. Open one to see the finished result.</p>
        </div>
        <ProjectTable />
      </section>
    </main>
  );
}
