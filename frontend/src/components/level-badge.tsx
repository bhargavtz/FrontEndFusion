import type { ProjectLevel } from "@/data/projects";

const classByLevel: Record<ProjectLevel, string> = {
  Beginner: "diff-badge diff-beginner",
  Intermediate: "diff-badge diff-intermediate",
  Advanced: "diff-badge diff-advanced",
};

export function LevelBadge({ level }: { level: ProjectLevel }) {
  return <span className={classByLevel[level]}>{level}</span>;
}
