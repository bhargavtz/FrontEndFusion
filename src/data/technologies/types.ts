import type { DomainId } from "../curriculum";
import type { ProjectLevel } from "../projects";

/** Languages the code playground can execute in a sandboxed iframe. */
export type RunnableLanguage = "html" | "css" | "js" | "jsx" | "tsx";
export type CodeLanguage = RunnableLanguage | "ts" | "bash" | "json" | "vue" | "svelte" | "astro" | "scss" | "text";

export type CodeExample = {
  title: string;
  language: CodeLanguage;
  code: string;
  /** For CSS examples: the HTML the stylesheet is applied to in the preview. */
  markup?: string;
  /** Line-by-line or step-by-step notes shown under the example. */
  explanation?: string[];
};

export type InterviewQuestion = { q: string; a: string };
export type DocLink = { label: string; href: string };

/**
 * A technology or concept page. Every field except the identity and
 * summary block is optional; the page renders only the sections that
 * have real content, so nothing ships as an empty placeholder.
 */
export type Technology = {
  slug: string;
  name: string;
  domain: DomainId;
  level: ProjectLevel;
  summary: string;
  /** What is it? */
  what: string;
  /** Why does it exist? */
  why: string;
  /** How does it work? */
  how?: string;
  prerequisites?: string[];
  roadmap?: string[];
  concepts: string[];
  examples?: CodeExample[];
  advanced?: string[];
  bestPractices?: string[];
  mistakes?: string[];
  performance?: string[];
  useCases?: string[];
  interview?: InterviewQuestion[];
  exercises?: string[];
  docs: DocLink[];
  /** All MDX guides whose slug starts with this prefix are lessons for this technology. */
  guidePrefix?: string;
  /** Extra MDX guide slugs. */
  guides?: string[];
  related?: string[];
  projects?: string[];
  /** Featured on the homepage and in "popular technologies". */
  featured?: boolean;
};
