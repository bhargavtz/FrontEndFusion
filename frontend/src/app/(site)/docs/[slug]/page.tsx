import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { docs, getDoc } from "@/data/docs";
import { MarkdownBody } from "@/components/markdown";
import { docIcon } from "@/lib/doc-icons";
import {
  extractHeadings,
  readDocSource,
  stripLeadingTitle,
} from "@/lib/docs";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return docs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug);

  if (!doc) {
    return { title: "Guide not found" };
  }

  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: `/docs/${doc.slug}` },
    openGraph: {
      title: `${doc.title} — FrontEndFusion`,
      description: doc.description,
      type: "article",
    },
  };
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = getDoc(slug);

  if (!doc) {
    notFound();
  }

  const source = stripLeadingTitle(readDocSource(doc.slug));
  const headings = extractHeadings(source);
  const icon = docIcon(doc.slug);

  const index = docs.findIndex((item) => item.slug === doc.slug);
  const previous = index > 0 ? docs[index - 1] : null;
  const next = index < docs.length - 1 ? docs[index + 1] : null;

  return (
    <main id="main-content" className="mx-auto max-w-6xl px-4 py-12">
      <nav aria-label="Breadcrumb" className="text-sm">
        <ol
          className="m-0 flex list-none flex-wrap items-center gap-2 p-0"
          style={{ color: "var(--text-muted)" }}
        >
          <li>
            <Link href="/" className="no-underline hover:underline">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/docs" className="no-underline hover:underline">
              Docs
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" style={{ color: "var(--text)" }}>
            {doc.title}
          </li>
        </ol>
      </nav>

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_240px]">
        <div className="min-w-0">
          <header className="mb-8 border-b pb-8" style={{ borderColor: "var(--border)" }}>
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <span className="text-2xl" aria-hidden="true">
                {icon}
              </span>
              <span
                className="rounded-full border px-3 py-1 text-xs font-semibold"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--secondary)",
                }}
              >
                {doc.category}
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {doc.title}
            </h1>
            <p
              className="mt-3 max-w-2xl text-base leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              {doc.description}
            </p>
          </header>

          {headings.length > 0 && (
            <details
              className="mb-8 rounded-xl border p-4 lg:hidden"
              style={{ borderColor: "var(--border)" }}
            >
              <summary className="cursor-pointer text-sm font-semibold">
                On this page
              </summary>
              <ul className="m-0 mt-3 list-none space-y-1.5 p-0 text-sm">
                {headings.map((heading) => (
                  <li
                    key={heading.id}
                    style={{ paddingLeft: heading.depth === 3 ? "1rem" : 0 }}
                  >
                    <a
                      href={`#${heading.id}`}
                      className="no-underline hover:underline"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          )}

          <MarkdownBody content={source} />

          <nav
            className="mt-12 grid grid-cols-1 gap-4 border-t pt-8 sm:grid-cols-2"
            style={{ borderColor: "var(--border)" }}
            aria-label="Guide pagination"
          >
            {previous ? (
              <Link
                href={`/docs/${previous.slug}`}
                className="hub-card no-underline"
                style={{ color: "var(--text)" }}
              >
                <span
                  className="text-xs uppercase tracking-wide"
                  style={{ color: "var(--text-muted)" }}
                >
                  Previous
                </span>
                <span className="mt-1 block font-semibold">
                  <span aria-hidden="true">←</span> {previous.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/docs/${next.slug}`}
                className="hub-card text-right no-underline sm:justify-self-end"
                style={{ color: "var(--text)" }}
              >
                <span
                  className="text-xs uppercase tracking-wide"
                  style={{ color: "var(--text-muted)" }}
                >
                  Next
                </span>
                <span className="mt-1 block font-semibold">
                  {next.title} <span aria-hidden="true">→</span>
                </span>
              </Link>
            ) : null}
          </nav>
        </div>

        {headings.length > 0 && (
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p
                className="mb-3 text-xs font-semibold uppercase tracking-[.14em]"
                style={{ color: "var(--text-muted)" }}
              >
                On this page
              </p>
              <ul className="m-0 list-none space-y-1.5 border-l p-0 text-sm" style={{ borderColor: "var(--border)" }}>
                {headings.map((heading) => (
                  <li
                    key={heading.id}
                    style={{ paddingLeft: heading.depth === 3 ? "1.75rem" : "1rem" }}
                  >
                    <a
                      href={`#${heading.id}`}
                      className="block py-0.5 no-underline hover:underline"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
              <Link
                href="/docs"
                className="mt-6 inline-block text-sm font-semibold no-underline hover:underline"
                style={{ color: "var(--secondary)" }}
              >
                All guides <span aria-hidden="true">→</span>
              </Link>
            </div>
          </aside>
        )}
      </div>
    </main>
  );
}
