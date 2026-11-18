"use client";

import { useEffect } from "react";
import { clearLearningContext, setLearningContext } from "@/lib/ai/store";

/**
 * Tells the AI assistant which topic/page the learner is on. Code examples
 * (Playground) refine this with the code and selection they hold.
 */
export function LearningContext({
  topic,
  location,
  code = "",
  language = "",
}: {
  topic: string;
  location: string;
  code?: string;
  language?: string;
}) {
  useEffect(() => {
    setLearningContext({ topic, location, code, language, selection: "" });
    return () => clearLearningContext(location);
  }, [topic, location, code, language]);
  return null;
}
