"use client";

import { setAssistantOpen } from "@/lib/ai/store";

export function OpenAssistantButton({ label = "Open the AI assistant" }: { label?: string }) {
  return (
    <button type="button" className="btn btn--primary" onClick={() => setAssistantOpen(true)}>
      {label}
    </button>
  );
}
