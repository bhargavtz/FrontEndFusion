import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { LevelPill } from "@/components/level-pill";
import { OpenAssistantButton } from "@/components/assistant/open-assistant-button";
import { technologiesByDomain } from "@/data/technologies";
import { tasks } from "@/lib/ai/tasks";
import { roadmaps } from "@/data/roadmaps";

export const metadata: Metadata = {
  title: "AI-powered frontend development",
  description:
    "Learn to use Claude Code, Cursor, Copilot, MCP and AI builders professionally — prompting for UI, design-to-code, AI review, and human verification.",
  alternates: { canonical: "/ai" },
};

export default function AIPage() {
  const techs = technologiesByDomain("ai-development");
  const roadmap = roadmaps.find((r) => r.slug === "ai-frontend");

  return (
    <main id="main-content" className="wrap page">
      <PageHeader
        eyebrow="AI development"
        proximity
        title="Use AI without losing the fundamentals"
        description="AI tools make strong developers faster, and make weak understanding expensive. This track covers professional workflows — and the review habits that keep you in control of the code."
      />

      <div className="callout">
        <p>
          <strong>The rule on this site:</strong> never merge code you cannot explain. Use AI to explain, draft, review, and test — then read the result, run it, and check it against official docs.
        </p>
      </div>

      <section className="domain" aria-labelledby="ai-topics">
        <div className="domain__head">
          <h2 id="ai-topics">Topics</h2>
        </div>
        <ul className="rows">
          {techs.map((tech) => (
            <li key={tech.slug}>
              <Link href={`/technologies/${tech.slug}`} className="row">
                <span className="row__main">
                  <span className="row__title">{tech.name}</span>
                  <span className="row__desc">{tech.summary}</span>
                </span>
                <LevelPill level={tech.level} />
              </Link>
            </li>
          ))}
        </ul>
        {roadmap && (
          <p className="next-link">
            Following a plan? Start the <Link href={`/roadmaps/${roadmap.slug}`}>{roadmap.title} roadmap</Link>.
          </p>
        )}
      </section>

      <section className="domain" aria-labelledby="assistant">
        <div className="domain__head">
          <h2 id="assistant">The built-in learning assistant</h2>
          <p>
            Open it from any lesson, example, or the header. It knows which topic you are on and which code you have selected, and works with your own API key — nothing passes through this site&apos;s servers. It is provider-independent: use Anthropic Claude, or any OpenAI-compatible endpoint, including a local model.
          </p>
        </div>
        <ul className="chips chips--wide">
          {tasks.map((task) => (
            <li key={task.id}>
              <span>{task.label}</span>
            </li>
          ))}
        </ul>
        <p>
          <OpenAssistantButton />
        </p>
      </section>
    </main>
  );
}
