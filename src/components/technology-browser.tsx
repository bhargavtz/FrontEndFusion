"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { DomainId } from "@/data/curriculum";
import type { ProjectLevel } from "@/data/projects";
import { LevelPill } from "@/components/level-pill";
import { DoneTick } from "@/components/mark-done";

export type TechRow = {
  slug: string;
  name: string;
  summary: string;
  domain: DomainId;
  level: ProjectLevel;
  concepts: string[];
  lessons: number;
  examples: number;
};

type Props = {
  rows: TechRow[];
  domains: { id: DomainId; title: string }[];
};

export function TechnologyBrowser({ rows, domains }: Props) {
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState<DomainId | "all">("all");
  const [level, setLevel] = useState<ProjectLevel | "all">("all");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter(
      (row) =>
        (domain === "all" || row.domain === domain) &&
        (level === "all" || row.level === level) &&
        (!q || `${row.name} ${row.summary} ${row.concepts.join(" ")}`.toLowerCase().includes(q)),
    );
  }, [rows, query, domain, level]);

  return (
    <div>
      <div className="filters" role="search" aria-label="Filter technologies">
        <div className="field">
          <label htmlFor="tech-q">Filter</label>
          <input id="tech-q" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="e.g. hooks, grid, generics" autoComplete="off" />
        </div>
        <div className="field">
          <label htmlFor="tech-domain">Domain</label>
          <select id="tech-domain" value={domain} onChange={(e) => setDomain(e.target.value as DomainId | "all")}>
            <option value="all">All domains</option>
            {domains.map((d) => (
              <option key={d.id} value={d.id}>
                {d.title}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="tech-level">Level</label>
          <select id="tech-level" value={level} onChange={(e) => setLevel(e.target.value as ProjectLevel | "all")}>
            <option value="all">Any level</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
      </div>

      <p className="filters__count" role="status">
        {visible.length} {visible.length === 1 ? "technology" : "technologies"}
      </p>

      {visible.length === 0 ? (
        <p className="empty">Nothing matches those filters. Clear one to see more.</p>
      ) : (
        <ul className="rows">
          {visible.map((row) => (
            <li key={row.slug}>
              <Link href={`/technologies/${row.slug}`} className="row">
                <span className="row__main">
                  <span className="row__title">
                    {row.name} <DoneTick id={`tech:${row.slug}`} />
                  </span>
                  <span className="row__desc">{row.summary}</span>
                </span>
                <span className="row__meta">
                  {row.examples > 0 && <span className="row__count">{row.examples} runnable</span>}
                  {row.lessons > 0 && <span className="row__count">{row.lessons} lessons</span>}
                  <LevelPill level={row.level} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
