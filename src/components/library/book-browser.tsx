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

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return books.filter((book) => {
      if (topic !== "All" && book.topic !== topic) return false;
      if (level !== "All" && book.level !== level) return false;
      if (!needle) return true;

      const haystack = [
        book.title,
        book.author,
        book.description,
        book.tags.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(needle);
    });
  }, [books, query, topic, level]);

  const hasFilters = query.trim() !== "" || topic !== "All" || level !== "All";

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div>
          <label htmlFor="book-search" className="mb-2 block text-sm font-semibold">
            Search books
          </label>
          <input
            id="book-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try “closures”, “RAG”, or an author"
            autoComplete="off"
            className="w-full rounded-xl border px-4 py-2.5 text-base outline-none focus-visible:ring-2"
            style={inputStyle}
          />
        </div>

        <div role="group" aria-labelledby="topic-filter-label" className="flex flex-wrap items-center gap-2">
          <span
            id="topic-filter-label"
            className="mr-1 text-xs font-semibold uppercase tracking-[.14em]"
            style={{ color: "var(--text-muted)" }}
          >
            Topic
          </span>
          <FilterButton active={topic === "All"} onClick={() => setTopic("All")}>
            All
          </FilterButton>
          {bookTopics.map((item) => (
            <FilterButton key={item} active={topic === item} onClick={() => setTopic(item)}>
              {item}
            </FilterButton>
          ))}
        </div>

        <div role="group" aria-labelledby="level-filter-label" className="flex flex-wrap items-center gap-2">
          <span
            id="level-filter-label"
            className="mr-1 text-xs font-semibold uppercase tracking-[.14em]"
            style={{ color: "var(--text-muted)" }}
          >
            Level
          </span>
          <FilterButton active={level === "All"} onClick={() => setLevel("All")}>
            All
          </FilterButton>
          {bookLevels.map((item) => (
            <FilterButton key={item} active={level === item} onClick={() => setLevel(item)}>
              {item}
            </FilterButton>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <p aria-live="polite" className="text-sm" style={{ color: "var(--text-muted)" }}>
          Showing {visible.length} of {books.length} books
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setTopic("All");
              setLevel("All");
            }}
            className="text-sm font-semibold underline underline-offset-4"
            style={{ color: "var(--secondary)" }}
          >
            Clear filters
          </button>
        )}
      </div>

      {visible.length === 0 ? (
        <p className="hub-card mt-6 text-center text-sm" style={{ color: "var(--text-muted)" }}>
          No books match these filters. Try a different search or clear the filters.
        </p>
      ) : (
        <ul className="m-0 mt-6 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((book) => (
            <li key={book.slug}>
              <Link
                href={`/library/${book.slug}`}
                className="hub-card flex h-full flex-col no-underline"
                style={{ color: "var(--text)" }}
              >
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span
                    className="rounded-full border px-2.5 py-0.5 text-[.65rem] font-semibold uppercase tracking-wide"
                    style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
                  >
                    {book.topic}
                  </span>
                  <LevelBadge level={book.level} />
                </div>
                <h2 className="mb-1 text-base font-semibold">{book.title}</h2>
                <p className="mb-3 text-xs" style={{ color: "var(--text-muted)" }}>
                  {book.author} · {book.year}
                </p>
                <p className="mb-4 flex-1 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {book.description}
                </p>
                <span className="text-sm font-semibold" style={{ color: "var(--secondary)" }}>
                  View details <span aria-hidden="true">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
