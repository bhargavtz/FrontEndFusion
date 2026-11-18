"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { resetProgress, useProgress } from "@/lib/progress";
import { setAssistantOpen } from "@/lib/ai/store";

/**
 * "Profile" is a local profile: progress is kept in this browser's
 * localStorage, with no account or server. The menu says so plainly.
 */
export function ProfileMenu({ totalLessons: TOTAL_LESSONS, totalTechnologies: TOTAL_TECHNOLOGIES }: { totalLessons: number; totalTechnologies: number }) {
  const progress = useProgress();
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  const lessonsDone = [...progress].filter((id) => id.startsWith("lesson:")).length;
  const techDone = [...progress].filter((id) => id.startsWith("tech:")).length;
  const percent = Math.round((lessonsDone / TOTAL_LESSONS) * 100);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => !wrap.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="profile" ref={wrap}>
      <button
        type="button"
        className="icon-btn profile__btn"
        aria-expanded={open}
        aria-controls="profile-menu"
        aria-label={`Your progress: ${percent}% of lessons complete`}
        onClick={() => setOpen((v) => !v)}
      >
        <svg viewBox="0 0 36 36" width="26" height="26" aria-hidden="true">
          <circle cx="18" cy="18" r="15" fill="none" stroke="var(--border)" strokeWidth="3" />
          <circle
            cx="18"
            cy="18"
            r="15"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${(percent / 100) * 94.2} 94.2`}
            transform="rotate(-90 18 18)"
          />
          <circle cx="18" cy="15" r="3.2" fill="currentColor" />
          <path d="M11.5 25.5c1.2-3.2 3.6-4.6 6.5-4.6s5.3 1.4 6.5 4.6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div id="profile-menu" className="profile__panel">
          <p className="profile__title">Your learning</p>
          <div className="profile__meter" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label="Lessons completed">
            <span style={{ width: `${percent}%` }} />
          </div>
          <p className="profile__stats">
            {lessonsDone} of {TOTAL_LESSONS} lessons · {techDone} of {TOTAL_TECHNOLOGIES} technologies
          </p>
          <p className="profile__note">Progress is saved in this browser only. There are no accounts.</p>
          <ul className="profile__links">
            <li>
              <Link href="/roadmaps">Pick a roadmap</Link>
            </li>
            <li>
              <button type="button" onClick={() => (setAssistantOpen(true), setOpen(false))}>
                AI assistant & key settings
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("Reset all saved progress on this device?")) resetProgress();
                }}
              >
                Reset progress
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
