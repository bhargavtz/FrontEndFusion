import type { MetadataRoute } from "next";

export const dynamic = "force-static";
import { docs } from "@/data/docs";
import { snippets } from "@/data/snippets";
import { books } from "@/data/books";
import { projects } from "@/data/projects";

const base = "https://frontendfusion.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/projects",
    "/snippets",
    "/docs",
    "/resources",
    "/learning",
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

  return [
    ...staticRoutes,
    ...docRoutes,
    ...snippetRoutes,
    ...bookRoutes,
    ...projectRoutes,
  ];
}
