"use client";

import { toggleDone, useProgress } from "@/lib/progress";

/** Marks a lesson or technology as complete (stored locally). */
export function MarkDone({ id, label = "Mark as complete" }: { id: string; label?: string }) {
  const done = useProgress().has(id);
  return (
    <button type="button" className={`mark-done ${done ? "is-done" : ""}`} aria-pressed={done} onClick={() => toggleDone(id)}>
      <span aria-hidden="true">{done ? "✓" : "○"}</span> {done ? "Completed" : label}
    </button>
  );
}

/** Small completion tick for list rows. */
export function DoneTick({ id }: { id: string }) {
  const done = useProgress().has(id);
  return done ? (
    <span className="done-tick" title="Completed">
      <span aria-hidden="true">✓</span>
      <span className="sr-only">Completed</span>
    </span>
  ) : null;
}
