import Link from "next/link";

/** Shared header for section index pages (projects, snippets, resources, learning). */
export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <>
      <Link
        href="/"
        className="text-sm no-underline hover:underline"
        style={{ color: "var(--text-muted)" }}
      >
        <span aria-hidden="true">←</span> Back to hub
      </Link>

      <header className="mt-5 max-w-3xl">
        <p
          className="mb-2 text-xs font-semibold uppercase tracking-[.18em]"
          style={{ color: "var(--secondary)" }}
        >
          {eyebrow}
        </p>
        <h1 className="section-title">{title}</h1>
        <p className="mt-3 text-lg" style={{ color: "var(--text-muted)" }}>
          {description}
        </p>
      </header>
    </>
  );
}
