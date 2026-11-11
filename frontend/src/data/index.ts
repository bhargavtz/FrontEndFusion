/**
 * Single source of truth for all FrontEndFusion content.
 *
 * 8 datasets — 31 keys:
 *   1. navigation      label, href                                         (2)
 *   2. hero            title, subtitle, actions                            (3)
 *   3. features        icon, title, detail                                 (3)
 *   4. projects        slug, title, description, tags, level                (5)
 *   5. snippets        slug, title, description, tags, icon                 (5)
 *   6. resources       title, href, icon, tint                              (4)
 *   7. learningPath    slug, title, description, icon, level                (5)
 *   8. docs            slug, title, description, category                   (4)
 *                                                                        ---
 *                                                                         31
 */
export * from "./navigation";
export * from "./hero";
export * from "./features";
export * from "./projects";
export * from "./snippets";
export * from "./resources";
export * from "./learning-path";
export * from "./docs";

import { navLinks } from "./navigation";
import { hero } from "./hero";
import { features } from "./features";
import { projects } from "./projects";
import { snippets } from "./snippets";
import { resourceGroups } from "./resources";
import { learningPath } from "./learning-path";
import { docs } from "./docs";

export const siteData = {
  navigation: navLinks,
  hero,
  features,
  projects,
  snippets,
  resources: resourceGroups,
  learningPath,
  docs,
} as const;

export const dataSummary = {
  datasets: Object.keys(siteData).length,
  keys: 31,
  items: {
    navigation: navLinks.length,
    features: features.length,
    projects: projects.length,
    snippets: snippets.length,
    resources: resourceGroups.reduce((total, group) => total + group.items.length, 0),
    learningPath: learningPath.length,
    docs: docs.length,
  },
} as const;
