import type { Metadata } from "next";
import { snippets } from "@/data/snippets";
import { PageHeader } from "@/components/page-header";
import { SnippetCard } from "@/components/snippet-card";

export const metadata: Metadata = {
  title: "Code Snippets",
  description: "Copy-paste ready HTML form templates: fully styled, responsive, and keyboard accessible.",
  alternates: { canonical: "/snippets" },
};

export default function SnippetsPage() {
  return (
    <main id="main-content" className="mx-auto max-w-6xl px-4 py-12">
      <PageHeader
        eyebrow="Snippets"
        title="Code Snippets"
        description="Copy-paste ready HTML form templates. Each one is fully styled, responsive, and keyboard accessible."
      />
      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
        {snippets.map((snippet) => (
          <SnippetCard key={snippet.slug} snippet={snippet} />
        ))}
      </div>
    </main>
  );
}
