import type { Metadata } from "next";
import Link from "next/link";
import { books } from "@/data/books";
import { BookBrowser } from "@/components/library/book-browser";

export const metadata: Metadata = {
  title: "Book Library",
  description:
    "Free programming books and official docs for web frontend and AI & LLM coding, with search and filters.",
  alternates: { canonical: "/library" },
};

export default function LibraryPage() {
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
          Library
        </p>
        <h1 className="section-title">Free Programming Books</h1>
        <p className="mt-3 text-lg" style={{ color: "var(--text-muted)" }}>
          Programming books for frontend development, AI-assisted coding, and
          more. Search by title, author, or category, then open an entry for its
          details, cover, and read or download links.
        </p>
      </header>

      <div className="mt-10">
        <BookBrowser books={books} />
      </div>
    </main>
  );
}
