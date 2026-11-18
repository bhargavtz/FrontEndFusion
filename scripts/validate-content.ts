/**
 * Verifies that the curriculum data references real things.
 * Run: npx tsx scripts/validate-content.ts
 */
import fs from "node:fs";
import path from "node:path";
import { technologies } from "../src/data/technologies";
import { roadmaps } from "../src/data/roadmaps";
import { projectBriefs } from "../src/data/project-briefs";

const docSlugs = new Set(
  fs.readdirSync(path.join(process.cwd(), "content/docs")).map((f) => f.replace(/\.mdx$/, "")),
);
const techSlugs = new Set(technologies.map((t) => t.slug));
const briefSlugs = new Set(projectBriefs.map((b) => b.slug));
const errors: string[] = [];
const bad = (msg: string) => errors.push(msg);

const dupes = (items: string[], label: string) => {
  const seen = new Set<string>();
  for (const i of items) {
    if (seen.has(i)) bad(`duplicate ${label}: ${i}`);
    seen.add(i);
  }
};
dupes(technologies.map((t) => t.slug), "technology");
dupes(projectBriefs.map((b) => b.slug), "project brief");
dupes(roadmaps.map((r) => r.slug), "roadmap");

for (const t of technologies) {
  for (const g of t.guides ?? []) if (!docSlugs.has(g)) bad(`tech ${t.slug}: missing guide ${g}`);
  for (const r of t.related ?? []) if (!techSlugs.has(r)) bad(`tech ${t.slug}: missing related ${r}`);
  for (const r of t.prerequisites ?? []) if (!techSlugs.has(r)) bad(`tech ${t.slug}: missing prerequisite ${r}`);
  for (const p of t.projects ?? []) if (!briefSlugs.has(p)) bad(`tech ${t.slug}: missing project ${p}`);
  if (t.guidePrefix && ![...docSlugs].some((d) => d.startsWith(t.guidePrefix!))) bad(`tech ${t.slug}: prefix matches nothing`);
}
for (const r of roadmaps) {
  for (const s of r.stages) {
    for (const t of s.topics) if (!techSlugs.has(t)) bad(`roadmap ${r.slug}: missing topic ${t}`);
    for (const g of s.guides ?? []) if (!docSlugs.has(g)) bad(`roadmap ${r.slug}: missing guide ${g}`);
    for (const p of s.projects ?? []) if (!briefSlugs.has(p)) bad(`roadmap ${r.slug}: missing project ${p}`);
  }
}
for (const b of projectBriefs) for (const l of b.learns) if (!techSlugs.has(l)) bad(`project ${b.slug}: missing tech ${l}`);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`OK: ${technologies.length} technologies, ${roadmaps.length} roadmaps, ${projectBriefs.length} projects, ${docSlugs.size} guides`);
