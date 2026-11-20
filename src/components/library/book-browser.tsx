"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import {
  bookLevels,
  bookTopics,
  type Book,
  type BookLevel,
  type BookTopic,
} from "@/data/books";
import { LevelBadge } from "@/components/level-badge";

type TopicFilter = BookTopic | "All";
type LevelFilter = BookLevel | "All";
type SourceFilter = "All" | "Free" | "Third-party listing";
type SortOption =
  | "default"
  | "title-asc"
  | "title-desc"
  | "author-asc"
  | "year-desc";

const PAGE_SIZE = 40;

const inputStyle = {
  background: "var(--bg-card)",
  borderColor: "var(--border)",
  color: "var(--text)",
};

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className="rounded-full border px-3.5 py-1.5 text-sm font-semibold transition"
      style={{
        borderColor: active ? "var(--secondary)" : "var(--border)",
        background: active ? "var(--secondary)" : "transparent",
        color: active ? "#fff" : "var(--text-muted)",
      }}
    >
      {children}
    </button>
  );
}

export function BookBrowser({ books }: { books: Book[] }) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<TopicFilter>("All");
  const [level, setLevel] = useState<LevelFilter>("All");
  const [source, setSource] = useState<SourceFilter>("All");
  const [sort, setSort] = useState<SortOption>("default");
  const [coverOnly, setCoverOnly] = useState(false);
  const [page, setPage] = useState(1);

  const resetPage = () => setPage(1);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();

    let result = books.filter((book) => {
      if (topic !== "All" && book.topic !== topic) return false;
      if (level !== "All" && book.level !== level) return false;
      if (source !== "All") {
        const access = book.access ?? "Free";
        if (source === "Free" && access !== "Free") return false;
        if (source === "Third-party listing" && access !== "Third-party listing")
          return false;
      }
      if (coverOnly && !book.cover) return false;
      if (!needle) return true;

      const haystack = [
        book.title,
        book.author ?? "",
        book.description ?? "",
        book.tags.join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });

    // Sort
    if (sort === "title-asc") {
      result = [...result].sort((a, b) =>
        a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
      );
    } else if (sort === "title-desc") {
      result = [...result].sort((a, b) =>
        b.title.localeCompare(a.title, undefined, { sensitivity: "base" })
      );
    } else if (sort === "author-asc") {
      result = [...result].sort((a, b) =>
        (a.author ?? "").localeCompare(b.author ?? "", undefined, {
          sensitivity: "base",
        })
      );
    } else if (sort === "year-desc") {
      result = [...result].sort((a, b) => {
        const ya = parseInt(a.year ?? "0", 10) || 0;
        const yb = parseInt(b.year ?? "0", 10) || 0;
        return yb - ya;
      });
    }

    return result;
  }, [books, query, topic, level, source, coverOnly, sort]);

  const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pageItems = visible.slice(start, end);

  const hasFilters =
    query.trim() !== "" ||
    topic !== "All" ||
    level !== "All" ||
    source !== "All" ||
    coverOnly ||
    sort !== "default";

  const clearFilters = () => {
    setQuery("");
    setTopic("All");
    setLevel("All");
    setSource("All");
    setSort("default");
    setCoverOnly(false);
    resetPage();
  };

  // Page number list with ellipsis
  const pageNumbers: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
  } else {
    pageNumbers.push(1);
    if (safePage > 3) pageNumbers.push("...");
    for (
      let i = Math.max(2, safePage - 1);
      i <= Math.min(totalPages - 1, safePage + 1);
      i++
    ) {
      pageNumbers.push(i);
    }
    if (safePage < totalPages - 2) pageNumbers.push("...");
    pageNumbers.push(totalPages);
  }

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div>
          <label htmlFor="book-search" className="mb-2 block text-sm font-semibold">
            Search
          </label>
          <input
            id="book-search"
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              resetPage();
            }}
            placeholder="Try “closures”, “RAG”, or an author"
            autoComplete="off"
            className="w-full rounded-xl border px-4 py-2.5 text-base outline-none focus-visible:ring-2"
            style={inputStyle}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label
              htmlFor="book-topic"
              className="mb-2 block text-sm font-semibold"
            >
              Category
            </label>
            <select
              id="book-topic"
              value={topic}
              onChange={(event) => {
                setTopic(event.target.value as TopicFilter);
                resetPage();
              }}
              className="w-full rounded-xl border px-4 py-2.5 text-base"
              style={inputStyle}
            >
              <option value="All">All categories</option>
              {bookTopics.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="book-level"
              className="mb-2 block text-sm font-semibold"
            >
              Level
            </label>
            <select
              id="book-level"
              value={level}
              onChange={(event) => {
                setLevel(event.target.value as LevelFilter);
                resetPage();
              }}
              className="w-full rounded-xl border px-4 py-2.5 text-base"
              style={inputStyle}
            >
              <option value="All">All levels</option>
              {bookLevels.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="book-source"
              className="mb-2 block text-sm font-semibold"
            >
              Source
            </label>
            <select
              id="book-source"
              value={source}
              onChange={(event) => {
                setSource(event.target.value as SourceFilter);
                resetPage();
              }}
              className="w-full rounded-xl border px-4 py-2.5 text-base"
              style={inputStyle}
            >
              <option value="All">All sources</option>
              <option value="Free">Free / official</option>
              <option value="Third-party listing">Third-party listing</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="book-sort"
              className="mb-2 block text-sm font-semibold"
            >
              Sort by
            </label>
            <select
              id="book-sort"
              value={sort}
              onChange={(event) => {
                setSort(event.target.value as SortOption);
                resetPage();
              }}
              className="w-full rounded-xl border px-4 py-2.5 text-base"
              style={inputStyle}
            >
              <option value="default">Default order</option>
              <option value="title-asc">Title A → Z</option>
              <option value="title-desc">Title Z → A</option>
              <option value="author-asc">Author A → Z</option>
              <option value="year-desc">Newest year first</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            id="book-cover-only"
            type="checkbox"
            checked={coverOnly}
            onChange={(event) => {
              setCoverOnly(event.target.checked);
              resetPage();
            }}
            className="h-4 w-4 rounded"
            style={{ accentColor: "var(--secondary)" }}
          />
          <label
            htmlFor="book-cover-only"
            className="text-sm font-semibold"
            style={{ color: "var(--text-muted)" }}
          >
            Only books with a cover image
          </label>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p aria-live="polite" className="text-sm" style={{ color: "var(--text-muted)" }}>
          Showing{" "}
          <strong>
            {visible.length === 0 ? 0 : start + 1}–{Math.min(end, visible.length)}
          </strong>{" "}
          of {visible.length} books · Page {safePage} of {totalPages}
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-sm font-semibold underline underline-offset-4"
            style={{ color: "var(--secondary)" }}
          >
            Clear filters
          </button>
        )}
      </div>

      {pageItems.length === 0 ? (
        <p className="hub-card mt-6 text-center text-sm" style={{ color: "var(--text-muted)" }}>
          No books match these filters. Try a different search or clear the filters.
        </p>
      ) : (
        <ul className="m-0 mt-6 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-2 lg:grid-cols-3">
          {pageItems.map((book) => (
            <li key={book.slug}>
              <Link
                href={`/library/${book.slug}`}
                className="hub-card flex h-full flex-col no-underline"
                style={{ color: "var(--text)" }}
              >
                {book.cover && (
                  // Cover thumbnails come from Google / OpenLibrary, not in next.config remotePatterns.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={book.cover}
                    alt={`Cover of ${book.title}`}
                    loading="lazy"
                    className="mb-3 h-44 w-full rounded-lg border object-cover"
                    style={{ borderColor: "var(--border)" }}
                  />
                )}
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span
                    className="rounded-full border px-2.5 py-0.5 text-[.65rem] font-semibold uppercase tracking-wide"
                    style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
                  >
                    {book.topic}
                  </span>
                  {book.level && <LevelBadge level={book.level} />}
                </div>
                <h2 className="mb-1 text-base font-semibold">{book.title}</h2>
                {(book.author || book.year) && (
                  <p className="mb-3 text-xs" style={{ color: "var(--text-muted)" }}>
                    {[book.author, book.year].filter(Boolean).join(" · ")}
                  </p>
                )}
                {book.description && (
                  <p className="mb-4 flex-1 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {book.description}
                  </p>
                )}
                <span className="text-sm font-semibold" style={{ color: "var(--secondary)" }}>
                  View details <span aria-hidden="true">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          aria-label="Pagination"
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
        >
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className="rounded-lg border px-3 py-1.5 text-sm font-semibold transition disabled:opacity-40"
            style={{ borderColor: "var(--border)", color: "var(--text)" }}
          >
            Previous
          </button>
          {pageNumbers.map((n, idx) =>
            n === "..." ? (
              <span
                key={`ellipsis-${idx}`}
                className="px-2 text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                …
              </span>
            ) : (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n as number)}
                aria-current={n === safePage ? "page" : undefined}
                className="rounded-lg border px-3 py-1.5 text-sm font-semibold transition"
                style={{
                  borderColor:
                    n === safePage ? "var(--secondary)" : "var(--border)",
                  background: n === safePage ? "var(--secondary)" : "transparent",
                  color: n === safePage ? "#fff" : "var(--text)",
                }}
              >
                {n}
              </button>
            )
          )}
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            className="rounded-lg border px-3 py-1.5 text-sm font-semibold transition disabled:opacity-40"
            style={{ borderColor: "var(--border)", color: "var(--text)" }}
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
}