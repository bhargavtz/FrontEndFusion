import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { books, getBook } from "@/data/books";
import { LevelBadge } from "@/components/level-badge";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const instant = false;

export function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = getBook(slug);

  if (!book) {
    return { title: "Book not found" };
  }

  return {
    title: book.title,
    description: book.description,
    alternates: { canonical: `/library/${book.slug}` },
    openGraph: {
      title: `${book.title} — FrontEndFusion`,
      description: book.description,
      type: "article",
    },
  };
}

export default async function BookPage({ params }: PageProps) {
  const { slug } = await params;
  const book = getBook(slug);

  if (!book) {
    notFound();
  }

  return (
    <main id="main-content" className="mx-auto max-w-4xl px-4 py-12">
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
            <Link href="/library" className="no-underline hover:underline">
              Library
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" style={{ color: "var(--text)" }}>
            {book.title}
          </li>
        </ol>
      </nav>

      <header className="mt-8 border-b pb-8" style={{ borderColor: "var(--border)" }}>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span
            className="rounded-full border px-3 py-1 text-xs font-semibold"
            style={{ borderColor: "var(--border)", color: "var(--secondary)" }}
          >
            {book.topic}
          </span>
          <LevelBadge level={book.level} />
          <span
            className="rounded-full border px-3 py-1 text-xs font-semibold"
            style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
          >
            Free
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {book.title}
        </h1>
        <p className="mt-3 text-base" style={{ color: "var(--text-muted)" }}>
          {book.author} · {book.year} · {book.source}
        </p>
        <p className="mt-5 max-w-2xl text-base leading-relaxed">
          {book.description}
        </p>
        <a
          href={book.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-display mt-6 inline-block rounded-xl px-5 py-2.5 text-sm font-semibold no-underline transition hover:brightness-110"
          style={{ background: "#2e7d32", color: "#fff" }}
        >
          Open book <span aria-hidden="true">↗</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </header>

      <section className="mt-10" aria-labelledby="takeaways-heading">
        <h2 id="takeaways-heading" className="text-xl font-bold">
          Key takeaways
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed">
          {book.takeaways.map((takeaway) => (
            <li key={takeaway}>{takeaway}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10" aria-labelledby="tags-heading">
        <h2 id="tags-heading" className="text-xl font-bold">
          Topics
        </h2>
        <ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0">
          {book.tags.map((tag) => (
            <li key={tag} className="tech-tag">
              {tag}
            </li>
          ))}
        </ul>
      </section>

      <nav
        className="mt-14 border-t pt-8"
        style={{ borderColor: "var(--border)" }}
        aria-label="Library navigation"
      >
        <Link
          href="/library"
          className="text-sm font-semibold no-underline hover:underline"
          style={{ color: "var(--secondary)" }}
        >
          <span aria-hidden="true">←</span> Back to all books
        </Link>
      </nav>
    </main>
  );
}
