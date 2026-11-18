import type { ProjectLevel } from "@/data/projects";

export function LevelPill({ level }: { level: ProjectLevel }) {
  return <span className={`level level--${level.toLowerCase()}`}>{level}</span>;
}
