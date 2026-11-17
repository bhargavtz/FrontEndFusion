import type { Metadata } from "next";
import { learningPath } from "@/data/learning-path";
import { PageHeader } from "@/components/page-header";
import { LearningCard } from "@/components/learning-card";

export const metadata: Metadata = {
  title: "Learning Path",
  description: "A structured route from HTML basics to advanced CSS techniques.",
  alternates: { canonical: "/learning" },
};

export default function LearningPage() {
  return (
    <main id="main-content" className="mx-auto max-w-6xl px-4 py-12">
      <PageHeader
        eyebrow="Learn"
        title="Learning Path"
        description="A structured guide from HTML basics to advanced CSS techniques. Follow the steps in order, or jump to any guide."
      />
      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {learningPath.map((step) => (
          <LearningCard key={step.slug} step={step} />
        ))}
      </div>
    </main>
  );
}
