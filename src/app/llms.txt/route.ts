import { docs } from "@/data/docs";
import { domains } from "@/data/curriculum";
import { projectBriefs } from "@/data/project-briefs";
import { roadmaps } from "@/data/roadmaps";
import { technologies } from "@/data/technologies";

export const dynamic = "force-static";

const BASE = "https://frontendfusion.vercel.app";

export function GET() {
  const lines: string[] = [
    "# FrontEndFusion",
    "",
    "> A free, open-source platform for learning frontend development — from HTML fundamentals to AI-powered engineering — with runnable code examples, roadmaps, projects, and an AI learning assistant.",
    "",
    `The site has ${domains.length} curriculum domains, ${technologies.length} technology pages, ${docs.length} in-depth lessons, ${roadmaps.length} roadmaps and ${projectBriefs.length} project briefs. Pages are statically generated, so all content is available as plain HTML.`,
    "",
    "## Key pages",
    `- Curriculum: ${BASE}/learn`,
    `- Technologies: ${BASE}/technologies`,
    `- Roadmaps: ${BASE}/roadmaps`,
    `- Practice: ${BASE}/practice`,
    `- Projects: ${BASE}/projects`,
    `- AI development: ${BASE}/ai`,
    `- Guides: ${BASE}/docs`,
    "",
    "## Roadmaps",
    ...roadmaps.map((r) => `- ${r.title}: ${BASE}/roadmaps/${r.slug}`),
    "",
    "## Technologies",
    ...technologies.map((t) => `- ${t.name}: ${BASE}/technologies/${t.slug} — ${t.summary}`),
    "",
    "## Projects",
    ...projectBriefs.map((b) => `- ${b.title} (${b.level}): ${BASE}/projects/briefs/${b.slug}`),
    "",
    "## Lessons",
    ...docs.map((d) => `- ${d.title}: ${BASE}/docs/${d.slug}`),
    "",
    "## Optional",
    `- Sitemap: ${BASE}/sitemap.xml`,
    `- Robots: ${BASE}/robots.txt`,
  ];

  return new Response(`${lines.join("\n")}\n`, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
