import type { Metadata } from "next";
import { resourceGroups } from "@/data/resources";
import { PageHeader } from "@/components/page-header";
import { ResourceGroup } from "@/components/resource-group";

export const metadata: Metadata = {
  title: "Resources",
  description: "Reference guides and official tools on accessibility, SEO, and frontend best practices.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  return (
    <main id="main-content" className="mx-auto max-w-6xl px-4 py-12">
      <PageHeader
        eyebrow="Resources"
        title="Resources & Guides"
        description="Official docs, accessibility tools, and our own in-project guides in one place."
      />
      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
        {resourceGroups.map((group) => (
          <ResourceGroup key={group.title} group={group} />
        ))}
      </div>
    </main>
  );
}
