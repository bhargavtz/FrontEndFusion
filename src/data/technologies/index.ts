import { fundamentals } from "./fundamentals";
import { javascript } from "./javascript";
import { typescript } from "./typescript";
import { cssEcosystem } from "./css-ecosystem";
import { frameworks } from "./frameworks";
import { uiLibraries } from "./ui-libraries";
import { tooling } from "./tooling";
import { architecture } from "./architecture";
import { aiDevelopment } from "./ai-development";
import { deepDives } from "./deep-dives";
import type { DomainId } from "../curriculum";
import type { Technology } from "./types";

export type { Technology, CodeExample, CodeLanguage, RunnableLanguage } from "./types";

export const technologies: Technology[] = [
  ...fundamentals,
  ...javascript,
  ...typescript,
  ...cssEcosystem,
  ...frameworks,
  ...uiLibraries,
  ...tooling,
  ...architecture,
  ...aiDevelopment,
  ...deepDives,
];

export const getTechnology = (slug: string) =>
  technologies.find((technology) => technology.slug === slug);

export const technologiesByDomain = (domain: DomainId) =>
  technologies.filter((technology) => technology.domain === domain);

export const featuredTechnologies = technologies.filter((technology) => technology.featured);
