import Link from "next/link";
import type { Snippet } from "@/data/snippets";
import { TechTags } from "@/components/tech-tags";

export function SnippetCard({ snippet }: { snippet: Snippet }) {
  return (
    <article className="snippet-card">
      <div className="snippet-header">
        <span className="snippet-dot" style={{ background: "#ef4444" }} />
        <span className="snippet-dot" style={{ background: "#f59e0b" }} />
        <span className="snippet-dot" style={{ background: "#22c55e" }} />
        <span
          className="ml-2 font-mono text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          {snippet.slug}.html
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 text-2xl" aria-hidden="true">
          {snippet.icon}
        </div>
        <h3 className="mb-1 text-base font-semibold">{snippet.title}</h3>
        <p
          className="mb-3 flex-1 text-xs leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          {snippet.description}
        </p>
        <div className="mb-4">
          <TechTags tags={snippet.tags} />
        </div>
        <Link
          href={`/snippets/${snippet.slug}`}
          className="inline-flex w-fit items-center gap-1 rounded-lg px-4 py-1.5 text-xs font-semibold no-underline transition hover:brightness-110"
          style={{
            background: "rgba(129,196,132,.15)",
            color: "var(--secondary)",
            border: "1px solid rgba(129,196,132,.3)",
          }}
        >
          Open Snippet <span aria-hidden="true">→</span>
          <span className="sr-only"> {snippet.title}</span>
        </Link>
      </div>
    </article>
  );
}
