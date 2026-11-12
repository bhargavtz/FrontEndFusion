"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { projects, type ProjectLevel } from "@/data/projects";
import { LevelBadge } from "@/components/level-badge";
import { TechTags } from "@/components/tech-tags";

const iconBySlug: Record<string, string> = {
  "responsive-navbar": "🧭",
  "landing-page": "🚀",
  "flexbox-layout": "📐",
  "css-grid": "🗂️",
  "animations": "✨",
  "dark-mode": "🌙",
};

const accentByLevel = {
  Beginner: "from-emerald-400 to-emerald-600",
  Intermediate: "from-amber-400 to-amber-600",
  Advanced: "from-rose-400 to-rose-600",
} as const;

const filters: Array<ProjectLevel | "All"> = [
  "All",
  "Beginner",
  "Intermediate",
  "Advanced",
];

export function ProjectTable() {
  const [active, setActive] = useState<ProjectLevel | "All">("All");

  const visible = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((project) => project.level === active),
    [active],
  );

  return (
    <div>
      <div
        className="mb-6 flex flex-wrap items-center gap-2"
        role="tablist"
        aria-label="Filter projects by difficulty"
      >
        {filters.map((filter) => {
          const count =
            filter === "All"
              ? projects.length
              : projects.filter((project) => project.level === filter).length;
          const isActive = active === filter;
          return (
            <button
              key={filter}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(filter)}
              className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200"
              style={{
                background: isActive
                  ? "color-mix(in srgb, var(--primary) 18%, transparent)"
                  : "transparent",
                borderColor: isActive
                  ? "color-mix(in srgb, var(--primary) 50%, var(--border))"
                  : "var(--border)",
                color: isActive ? "var(--primary)" : "var(--text-muted)",
              }}
            >
              {filter}
              <span
                className="rounded-full px-1.5 text-xs tabular-nums"
                style={{
                  background: isActive
                    ? "color-mix(in srgb, var(--primary) 25%, transparent)"
                    : "var(--bg-subtle)",
                  color: isActive ? "var(--primary)" : "var(--text-muted)",
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, index) => (
          <article
            key={project.slug}
            className="group relative flex flex-col overflow-hidden rounded-2xl border bg-[var(--bg-card)] p-6 shadow-[var(--shadow)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]"
            style={{ borderColor: "var(--border)" }}
          >
            <span
              className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accentByLevel[project.level]}`}
              aria-hidden="true"
            />

            <div className="mb-4 flex items-start justify-between gap-3">
              <span
                className="flex h-11 w-11 items-center justify-center rounded-xl text-xl transition-transform duration-300 group-hover:scale-110"
                style={{
                  background:
                    "color-mix(in srgb, var(--primary) 14%, transparent)",
                }}
                aria-hidden="true"
              >
                {iconBySlug[project.slug] ?? "📦"}
              </span>
              <LevelBadge level={project.level} />
            </div>

            <div className="mb-1 flex items-center gap-2">
              <span
                className="text-xs font-semibold tabular-nums"
                style={{ color: "var(--text-muted)" }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-bold tracking-tight">
                {project.title}
              </h3>
            </div>

            <p
              className="mb-4 flex-1 text-sm leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              {project.description}
            </p>

            <div className="mb-5">
              <TechTags tags={project.tags} />
            </div>

            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold no-underline transition group-hover:gap-2.5"
              style={{ color: "var(--secondary)" }}
            >
              Open demo
              <span aria-hidden="true">→</span>
              <span className="sr-only"> {project.title}</span>
            </Link>
          </article>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="py-12 text-center text-sm" style={{ color: "var(--text-muted)" }}>
          No projects match this filter.
        </p>
      )}
    </div>
  );
}
