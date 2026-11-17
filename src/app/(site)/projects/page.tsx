import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ProjectTable } from "@/components/project-table";

export const metadata: Metadata = {
  title: "Projects",
  description: "Hands-on HTML and CSS demos, from responsive navbars to CSS Grid and animations.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <main id="main-content" className="mx-auto max-w-6xl px-4 py-12">
      <PageHeader
        eyebrow="Projects"
        title="Interactive Projects"
        description="Six hands-on demos. Filter by difficulty, then open any card to try the interactive showcase."
      />
      <div className="mt-12">
        <ProjectTable />
      </div>
    </main>
  );
}
