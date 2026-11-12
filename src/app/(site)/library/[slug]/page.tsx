import type { Metadata } from "next";
import type { ReactNode } from "react";
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

function ExternalButton({
  href,
  primary = false,
  children,
}: {
  href: string;
  primary?: boolean;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-display inline-block rounded-xl px-5 py-2.5 text-sm font-semibold no-underline transition hover:brightness-110"
      style={
        primary
          ? { background: "#2e7d32", color: "#fff" }
          : { border: "1px solid var(--border)", color: "var(--text)" }
      }
    >
      {children} <span aria-hidden="true">↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export default async function BookPage({ params }: PageProps) {
  const { slug } = await params;
  const book = getBook(slug);

  if (!book) {
    notFound();
  }

  const metaLine = [book.author, book.year].filter(Boolean).join(" · ");

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
          {book.level && <LevelBadge level={book.level} />}
        </div>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          {book.cover && (
            // Cover thumbnails come from Google Drive, which is not in next.config remotePatterns.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={book.cover}
              alt={`Cover of ${book.title}`}
              width={200}
              height={150}
              loading="lazy"
              className="h-auto w-full max-w-[14rem] shrink-0 rounded-xl border object-cover"
              style={{ borderColor: "var(--border)" }}
            />
          )}
          <div className="min-w-0">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {book.title}
            </h1>
            {metaLine && (
              <p className="mt-3 text-base" style={{ color: "var(--text-muted)" }}>
                {metaLine}
              </p>
            )}
            {book.description && (
              <p className="mt-5 max-w-2xl text-base leading-relaxed">
                {book.description}
              </p>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              {book.readUrl && (
                <ExternalButton href={book.readUrl} primary>
                  Read online
                </ExternalButton>
              )}
              {book.downloadUrl && (
                <ExternalButton href={book.downloadUrl}>
                  Download PDF{book.size ? ` (${book.size})` : ""}
                </ExternalButton>
              )}
              {book.href && (
                <ExternalButton href={book.href}>Open book</ExternalButton>
              )}
            </div>
          </div>
        </div>
      </header>

      {book.takeaways && book.takeaways.length > 0 && (
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
      )}

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
