"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import {
  bookLevels,
  bookTopics,
  type Book,
  type BookAccess,
  type BookLevel,
  type BookTopic,
} from "@/data/books";
import { LevelBadge } from "@/components/level-badge";

type TopicFilter = BookTopic | "All";
type LevelFilter = BookLevel | "All";
type AccessFilter = BookAccess | "All";
type SortKey = "default" | "title-asc" | "title-desc" | "author-asc" | "year-desc";

const PAGE_SIZE = 40;

const inputStyle = {
  background: "var(--bg-card)",
  borderColor: "var(--border)",
  color: "var(--text)",
};

const selectClass =
  "w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus-visible:ring-2";

function BookCover({ src, title }: { src?: string; title: string }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className="flex h-full w-full items-center justify-center text-3xl font-bold"
        style={{
          background: "linear-gradient(135deg, var(--bg-subtle), var(--bg-card))",
          color: "var(--text-muted)",
        }}
        aria-hidden="true"
      >
        {title.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    // Cover images are direct Google-hosted URLs, not in next.config remotePatterns.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={`Cover of ${title}`}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover"
    />
  );
}

function FilterChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold"
      style={{
        borderColor: "var(--secondary)",
        color: "var(--text)",
        background: "var(--bg-subtle)",
      }}
    >
      {label}
      <span aria-hidden="true" className="text-sm leading-none">
        ×
      </span>
      <span className="sr-only">Remove filter</span>
    </button>
  );
}

function Pagination({
  page,
  pageCount,
  onPage,
}: {
  page: number;
  pageCount: number;
  onPage: (page: number) => void;
}) {
  if (pageCount <= 1) return null;

  const pages: number[] = [];
  const add = (n: number) => {
    if (n >= 1 && n <= pageCount && !pages.includes(n)) pages.push(n);
  };
  add(1);
  add(page - 1);
  add(page);
  add(page + 1);
  add(pageCount);
  pages.sort((a, b) => a - b);

  const buttonClass =
    "min-w-9 rounded-lg border px-3 py-1.5 text-sm font-semibold transition";

  return (
    <nav
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
      aria-label="Library pagination"
    >
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onPage(page - 1)}
        className={buttonClass}
        style={{
          borderColor: "var(--border)",
          color: page === 1 ? "var(--text-muted)" : "var(--text)",
          opacity: page === 1 ? 0.5 : 1,
        }}
      >
        <span aria-hidden="true">←</span> Previous
      </button>

      {pages.map((n, index) => (
        <span key={n} className="flex items-center gap-2">
          {index > 0 && n > pages[index - 1] + 1 && (
            <span style={{ color: "var(--text-muted)" }}>…</span>
          )}
          <button
            type="button"
            aria-current={n === page ? "page" : undefined}
            onClick={() => onPage(n)}
            className={buttonClass}
            style={
              n === page
                ? {
                    borderColor: "var(--secondary)",
                    background: "var(--secondary)",
                    color: "#fff",
                  }
                : { borderColor: "var(--border)", color: "var(--text)" }
            }
          >
            {n}
          </button>
        </span>
      ))}

      <button
        type="button"
        disabled={page === pageCount}
        onClick={() => onPage(page + 1)}
        className={buttonClass}
        style={{
          borderColor: "var(--border)",
          color: page === pageCount ? "var(--text-muted)" : "var(--text)",
          opacity: page === pageCount ? 0.5 : 1,
        }}
      >
        Next <span aria-hidden="true">→</span>
      </button>
    </nav>
  );
}

function FilterSelect({
  id,
  label,
  value,
  onChange,
  children,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={selectClass}
        style={inputStyle}
      >
        {children}
      </select>
    </div>
  );
}

export function BookBrowser({ books }: { books: Book[] }) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<TopicFilter>("All");
  const [level, setLevel] = useState<LevelFilter>("All");
  const [access, setAccess] = useState<AccessFilter>("All");
  const [sort, setSort] = useState<SortKey>("default");
  const [onlyWithCover, setOnlyWithCover] = useState(false);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    const result = books.filter((book) => {
      if (topic !== "All" && book.topic !== topic) return false;
      if (level !== "All" && book.level !== level) return false;
      if (access !== "All" && (book.access ?? "Free") !== access) return false;
      if (onlyWithCover && !book.cover) return false;
      if (!needle) return true;

      const haystack = [
        book.title,
        book.author,
        book.description,
        book.topic,
        book.tags.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(needle);
    });

    const sorted = [...result];
    switch (sort) {
      case "title-asc":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "author-asc":
        sorted.sort((a, b) => (a.author ?? "").localeCompare(b.author ?? ""));
        break;
      case "year-desc":
        sorted.sort((a, b) => (b.year ?? "").localeCompare(a.year ?? ""));
        break;
    }
    return sorted;
  }, [books, query, topic, level, access, sort, onlyWithCover]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const start = (currentPage - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);

  const updateQuery = (value: string) => {
    setQuery(value);
    setPage(1);
  };
  const updateTopic = (value: TopicFilter) => {
    setTopic(value);
    setPage(1);
  };
  const updateLevel = (value: LevelFilter) => {
    setLevel(value);
    setPage(1);
  };
  const updateAccess = (value: AccessFilter) => {
    setAccess(value);
    setPage(1);
  };
  const updateSort = (value: SortKey) => {
    setSort(value);
    setPage(1);
  };
  const updateOnlyWithCover = (value: boolean) => {
    setOnlyWithCover(value);
    setPage(1);
  };

  const hasFilters =
    query.trim() !== "" ||
    topic !== "All" ||
    level !== "All" ||
    access !== "All" ||
    sort !== "default" ||
    onlyWithCover;

  const clearFilters = () => {
    setQuery("");
    setTopic("All");
    setLevel("All");
    setAccess("All");
    setSort("default");
    setOnlyWithCover(false);
    setPage(1);
  };

  return (
    <div>
      <div
        className="grid grid-cols-1 gap-4 rounded-2xl border p-5 sm:grid-cols-2 lg:grid-cols-3"
        style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
      >
        <div className="sm:col-span-2 lg:col-span-3">
          <label htmlFor="book-search" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
            Search
          </label>
          <input
            id="book-search"
            type="search"
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
            placeholder="Try “closures”, “RAG”, or an author"
            autoComplete="off"
            className="w-full rounded-xl border px-4 py-2.5 text-base outline-none focus-visible:ring-2"
            style={inputStyle}
          />
        </div>

        <FilterSelect id="book-topic" label="Category" value={topic} onChange={(v) => updateTopic(v as TopicFilter)}>
          <option value="All">All categories</option>
          {bookTopics.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </FilterSelect>

        <FilterSelect id="book-level" label="Level" value={level} onChange={(v) => updateLevel(v as LevelFilter)}>
          <option value="All">All levels</option>
          {bookLevels.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </FilterSelect>

        <FilterSelect id="book-access" label="Source" value={access} onChange={(v) => updateAccess(v as AccessFilter)}>
          <option value="All">All sources</option>
          <option value="Free">Free / official</option>
          <option value="Third-party listing">Third-party listing</option>
        </FilterSelect>

        <FilterSelect id="book-sort" label="Sort by" value={sort} onChange={(v) => updateSort(v as SortKey)}>
          <option value="default">Default order</option>
          <option value="title-asc">Title A → Z</option>
          <option value="title-desc">Title Z → A</option>
          <option value="author-asc">Author A → Z</option>
          <option value="year-desc">Newest year first</option>
        </FilterSelect>

        <div className="flex items-end sm:col-span-2 lg:col-span-3">
          <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold">
            <input
              type="checkbox"
              checked={onlyWithCover}
              onChange={(event) => updateOnlyWithCover(event.target.checked)}
              className="h-4 w-4 rounded"
            />
            Only books with a cover image
          </label>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p aria-live="polite" className="text-sm" style={{ color: "var(--text-muted)" }}>
          Showing <strong>{start + 1}–{Math.min(start + PAGE_SIZE, filtered.length)}</strong> of{" "}
          {filtered.length} books · Page {currentPage} of {pageCount}
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-sm font-semibold underline underline-offset-4"
            style={{ color: "var(--secondary)" }}
          >
            Clear all filters
          </button>
        )}
      </div>

      {hasFilters && (
        <div className="mt-3 flex flex-wrap gap-2">
          {query.trim() && (
            <FilterChip label={`Search: ${query.trim()}`} onRemove={() => updateQuery("")} />
          )}
          {topic !== "All" && (
            <FilterChip label={topic} onRemove={() => updateTopic("All")} />
          )}
          {level !== "All" && (
            <FilterChip label={level} onRemove={() => updateLevel("All")} />
          )}
          {access !== "All" && (
            <FilterChip label={access} onRemove={() => updateAccess("All")} />
          )}
          {onlyWithCover && (
            <FilterChip label="With cover" onRemove={() => updateOnlyWithCover(false)} />
          )}
        </div>
      )}

      {visible.length === 0 ? (
        <p className="hub-card mt-6 text-center text-sm" style={{ color: "var(--text-muted)" }}>
          No books match these filters. Try a different search or clear the filters.
        </p>
      ) : (
        <ul className="m-0 mt-6 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((book) => (
            <li key={book.slug}>
              <Link
                href={`/library/${book.slug}`}
                className="hub-card library-card flex h-full flex-col no-underline"
                style={{ color: "var(--text)" }}
              >
                <div className="library-card__cover">
                  <BookCover src={book.cover} title={book.title} />
                </div>
                <div className="library-card__body flex flex-1 flex-col">
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
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Pagination page={currentPage} pageCount={pageCount} onPage={setPage} />
    </div>
  );
}
