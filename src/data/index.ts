/**
 * Single source of truth for all FrontEndFusion content.
 *
 * Curriculum model (new):
 *   curriculum      10 domains (A–J)
 *   technologies/   56 technology/concept pages → lessons (content/docs/*.mdx)
 *   roadmaps        9 learning roadmaps
 *   project-briefs  17 project briefs (+ projects.ts: 6 interactive demos)
 *
 * Supporting datasets: navigation, snippets, resources, docs (MDX guides),
 * books, learning-path (guide icons).
 */
export * from "./navigation";
export * from "./curriculum";
export * from "./technologies";
export * from "./roadmaps";
export * from "./project-briefs";
export * from "./projects";
export * from "./snippets";
export * from "./resources";
export * from "./learning-path";
export * from "./docs";
export * from "./books";
