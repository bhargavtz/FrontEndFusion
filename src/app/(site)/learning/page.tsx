import type { Metadata } from "next";
import Link from "next/link";
import { RedirectTo } from "@/components/redirect-to";

export const metadata: Metadata = {
  title: "Learning path",
  robots: { index: false },
  alternates: { canonical: "/roadmaps" },
};

/** Legacy URL. The learning path was merged into the roadmaps. */
export default function LearningRedirect() {
  return (
    <main id="main-content" className="wrap page">
      <RedirectTo href="/roadmaps" />
      <p>
        The learning path moved. Go to the <Link href="/roadmaps">roadmaps</Link>.
      </p>
    </main>
  );
}
