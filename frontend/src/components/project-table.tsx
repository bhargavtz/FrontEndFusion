import Link from "next/link";
import { projects } from "@/data/projects";
import { LevelBadge } from "@/components/level-badge";
import { TechTags } from "@/components/tech-tags";

export function ProjectTable() {
  return (
    <div className="hub-card overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="animated-table w-full border-collapse text-sm">
          <caption className="sr-only">
            FrontEndFusion demo projects, their technologies, and difficulty
            levels
          </caption>
          <thead>
            <tr style={{ background: "rgba(129,196,132,.1)" }}>
              <th
                scope="col"
                className="table-cell px-4 py-3 text-left text-[.7rem] uppercase tracking-[.05em]"
                style={{ color: "var(--text-muted)" }}
              >
                #
              </th>
              <th
                scope="col"
                className="table-cell px-4 py-3 text-left text-[.7rem] uppercase tracking-[.05em]"
                style={{ color: "var(--text-muted)" }}
              >
                Project
              </th>
              <th
                scope="col"
                className="table-cell hidden px-4 py-3 text-left text-[.7rem] uppercase tracking-[.05em] md:table-cell"
                style={{ color: "var(--text-muted)" }}
              >
                Description
              </th>
              <th
                scope="col"
                className="table-cell hidden px-4 py-3 text-left text-[.7rem] uppercase tracking-[.05em] sm:table-cell"
                style={{ color: "var(--text-muted)" }}
              >
                Tags
              </th>
              <th
                scope="col"
                className="table-cell hidden px-4 py-3 text-left text-[.7rem] uppercase tracking-[.05em] sm:table-cell"
                style={{ color: "var(--text-muted)" }}
              >
                Level
              </th>
              <th
                scope="col"
                className="table-cell px-4 py-3 text-left text-[.7rem] uppercase tracking-[.05em]"
                style={{ color: "var(--text-muted)" }}
              >
                Link
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={project.slug}>
                <td
                  className="table-cell px-4 py-3 align-top"
                  style={{ color: "var(--text-muted)" }}
                >
                  {index + 1}
                </td>
                <td className="table-cell px-4 py-3 align-top font-medium">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="no-underline"
                    style={{ color: "var(--text)" }}
                  >
                    {project.title}
                  </Link>
                  <p
                    className="mt-1 text-xs md:hidden"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {project.description}
                  </p>
                  <div className="mt-2 sm:hidden">
                    <LevelBadge level={project.level} />
                  </div>
                </td>
                <td
                  className="table-cell hidden px-4 py-3 align-top md:table-cell"
                  style={{ color: "var(--text-muted)" }}
                >
                  {project.description}
                </td>
                <td className="table-cell hidden px-4 py-3 align-top sm:table-cell">
                  <TechTags tags={project.tags} />
                </td>
                <td className="table-cell hidden px-4 py-3 align-top sm:table-cell">
                  <LevelBadge level={project.level} />
                </td>
                <td className="table-cell px-4 py-3 align-top">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="whitespace-nowrap font-medium no-underline hover:underline"
                    style={{ color: "var(--secondary)" }}
                  >
                    View <span aria-hidden="true">→</span>
                    <span className="sr-only"> {project.title}</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
