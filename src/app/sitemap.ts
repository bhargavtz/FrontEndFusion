import type { MetadataRoute } from "next";
import { docs } from "@/data/docs";
import { snippets } from "@/data/snippets";
import { books } from "@/data/books";
import { projects } from "@/data/projects";
import { technologies } from "@/data/technologies";
import { roadmaps } from "@/data/roadmaps";
import { projectBriefs } from "@/data/project-briefs";

export const dynamic = "force-static";

const base = "https://frontendfusion.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/learn",
    "/technologies",
    "/roadmaps",
    "/practice",
    "/ai",
    "/projects",
    "/snippets",
    "/docs",
    "/resources",
    "/library",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const docRoutes = docs.map((doc) => ({
    url: `${base}/docs/${doc.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const snippetRoutes = snippets.map((s) => ({
    url: `${base}/snippets/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const bookRoutes = books.map((b) => ({
    url: `${base}/library/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const technologyRoutes = technologies.map((t) => ({
    url: `${base}/technologies/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: t.featured ? 0.9 : 0.8,
  }));

  const roadmapRoutes = roadmaps.map((r) => ({
    url: `${base}/roadmaps/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const briefRoutes = projectBriefs.map((b) => ({
    url: `${base}/projects/briefs/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...technologyRoutes,
    ...roadmapRoutes,
    ...briefRoutes,
    ...docRoutes,
    ...snippetRoutes,
    ...bookRoutes,
    ...projectRoutes,
  ];
}
