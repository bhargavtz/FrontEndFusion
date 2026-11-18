import type { Metadata } from "next";
import Link from "next/link";
import { docs } from "@/data/docs";
import { docIcon } from "@/lib/doc-icons";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Browse every FrontEndFusion guide: HTML, CSS, responsive design, accessibility, SEO, JavaScript, and more.",
};

function DocLink({ slug }: { slug: string }) {
  const doc = docs.find((item) => item.slug === slug);
  if (!doc) return null;
  const icon = docIcon(slug);

  return (
    <Link
      href={`/docs/${doc.slug}`}
      className="hub-card group flex flex-col no-underline"
      style={{ color: "var(--text)" }}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <span className="text-2xl" aria-hidden="true">
          {icon}
        </span>
        <span
          className="rounded-full border px-2.5 py-0.5 text-[.65rem] font-semibold uppercase tracking-wide"
          style={{
            borderColor: "var(--border)",
            color: "var(--text-muted)",
          }}
        >
          {doc.category}
        </span>
      </div>
      <h3 className="mb-1.5 font-semibold">{doc.title}</h3>
      <p
        className="mb-4 flex-1 text-sm leading-relaxed"
        style={{ color: "var(--text-muted)" }}
      >
        {doc.description}
      </p>
      <span
        className="text-sm font-semibold"
        style={{ color: "var(--secondary)" }}
      >
        Read guide <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}

export default function DocsIndexPage() {
  const learningDocs = docs.filter((doc) => doc.category === "Learning Path");
  const htmlDocs = docs.filter((doc) => doc.category === "HTML");
  const cssDocs = docs.filter((doc) => doc.category === "CSS");
  const jsDocs = docs.filter((doc) => doc.category === "JavaScript");
  const referenceDocs = docs.filter((doc) => doc.category === "Reference");

  return (
    <main id="main-content" className="mx-auto max-w-6xl px-4 py-12">
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
          Documentation
        </p>
        <h1 className="section-title">Guide Library</h1>
        <p className="mt-3 text-lg" style={{ color: "var(--text-muted)" }}>
          {learningDocs.length + referenceDocs.length} in-depth guides plus
          three complete references: {htmlDocs.length} HTML,{" "}
          {cssDocs.length} CSS, and {jsDocs.length} JavaScript chapters, with
          live previews for every example.
        </p>
      </header>

      <section className="mt-12">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 className="text-xl font-bold">Learning Path</h2>
          <span className="text-sm" style={{ color: "var(--text-muted)" }}>
            {learningDocs.length} guides
          </span>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {learningDocs.map((doc) => (
            <DocLink key={doc.slug} slug={doc.slug} />
          ))}
        </div>
      </section>

      <section className="mt-14">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 className="text-xl font-bold">HTML</h2>
          <span className="text-sm" style={{ color: "var(--text-muted)" }}>
            {htmlDocs.length} chapters
          </span>
        </div>
        <p className="mb-5 max-w-3xl text-sm" style={{ color: "var(--text-muted)" }}>
          A complete HTML reference rewritten with fresh examples. Every
          chapter includes runnable code previews, from doctypes and headings
          to forms, canvas, SVG, and ARIA.
        </p>
        <ol className="m-0 grid list-none grid-cols-1 gap-3 p-0 md:grid-cols-2">
          {htmlDocs.map((doc, index) => (
            <li key={doc.slug}>
              <Link
                href={`/docs/${doc.slug}`}
                className="hub-card flex items-center gap-3 no-underline"
                style={{ color: "var(--text)" }}
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold"
                  style={{
                    background: "var(--bg-subtle)",
                    border: "1px solid var(--border)",
                    color: "var(--secondary)",
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-semibold">{doc.title}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 className="text-xl font-bold">CSS</h2>
          <span className="text-sm" style={{ color: "var(--text-muted)" }}>
            {cssDocs.length} chapters
          </span>
        </div>
        <p className="mb-5 max-w-3xl text-sm" style={{ color: "var(--text-muted)" }}>
          A complete CSS reference rebuilt around visual examples. Every chapter
          pairs the CSS with a small HTML demo so you can see the result in the
          live preview.
        </p>
        <ol className="m-0 grid list-none grid-cols-1 gap-3 p-0 md:grid-cols-2">
          {cssDocs.map((doc, index) => (
            <li key={doc.slug}>
              <Link
                href={`/docs/${doc.slug}`}
                className="hub-card flex items-center gap-3 no-underline"
                style={{ color: "var(--text)" }}
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold"
                  style={{
                    background: "var(--bg-subtle)",
                    border: "1px solid var(--border)",
                    color: "var(--secondary)",
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-semibold">{doc.title}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 className="text-xl font-bold">JavaScript</h2>
          <span className="text-sm" style={{ color: "var(--text-muted)" }}>
            {jsDocs.length} chapters
          </span>
        </div>
        <p className="mb-5 max-w-3xl text-sm" style={{ color: "var(--text-muted)" }}>
          A complete JavaScript reference rebuilt with runnable examples. Every
          chapter pairs the code with a small HTML demo so you can see the result
          in the live preview.
        </p>
        <ol className="m-0 grid list-none grid-cols-1 gap-3 p-0 md:grid-cols-2">
          {jsDocs.map((doc, index) => (
            <li key={doc.slug}>
              <Link
                href={`/docs/${doc.slug}`}
                className="hub-card flex items-center gap-3 no-underline"
                style={{ color: "var(--text)" }}
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold"
                  style={{
                    background: "var(--bg-subtle)",
                    border: "1px solid var(--border)",
                    color: "var(--secondary)",
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-semibold">{doc.title}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 className="text-xl font-bold">Reference</h2>
          <span className="text-sm" style={{ color: "var(--text-muted)" }}>
            {referenceDocs.length} guides
          </span>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {referenceDocs.map((doc) => (
            <DocLink key={doc.slug} slug={doc.slug} />
          ))}
        </div>
      </section>
    </main>
  );
}
