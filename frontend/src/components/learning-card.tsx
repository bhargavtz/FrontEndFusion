import Link from "next/link";
import type { LearningStep } from "@/data/learning-path";
import { LevelBadge } from "@/components/level-badge";

export function LearningCard({ step }: { step: LearningStep }) {
  return (
    <Link
      href={`/docs/${step.slug}`}
      className="hub-card block no-underline"
      style={{ color: "var(--text)" }}
    >
      <div className="mb-3 text-xl" aria-hidden="true">
        {step.icon}
      </div>
      <h3 className="mb-1 font-semibold">{step.title}</h3>
      <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
        {step.description}
      </p>
      <span className="mt-3 inline-block">
        <LevelBadge level={step.level} />
      </span>
    </Link>
  );
}
