"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { SearchEntry, SearchKind } from "@/lib/learn";

/* ── open state shared between the header button, hero box and ⌘K ───── */
let open = false;
let initialQuery = "";
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export function openSearch(query = "") {
  initialQuery = query;
  open = true;
  emit();
}
function closeSearch() {
  open = false;
  emit();
}
function useOpen() {
  return useSyncExternalStore(
    (cb) => (listeners.add(cb), () => listeners.delete(cb)),
    () => open,
    () => false,
  );
}

const KIND_ORDER: SearchKind[] = ["Technology", "Lesson", "Roadmap", "Project", "Snippet", "Example", "Interview", "Tool", "Domain"];

const KIND_LABEL: Record<SearchKind, string> = {
  Technology: "Technologies",
  Lesson: "Lessons",
  Roadmap: "Roadmaps",
  Project: "Projects",
  Snippet: "Snippets",
  Example: "Code examples",
  Interview: "Interview questions",
  Tool: "Tools & libraries",
  Domain: "Topics",
};

/** Small, dependency-free scorer: every query word must match somewhere. */
function search(index: SearchEntry[], query: string, limit = 40): SearchEntry[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];

  const scored: { entry: SearchEntry; score: number }[] = [];
  for (const entry of index) {
    const title = entry.title.toLowerCase();
    const desc = entry.description.toLowerCase();
    const keys = entry.keywords.toLowerCase();
    let score = 0;
    let ok = true;
    for (const word of words) {
      let s = 0;
      if (title === word) s += 12;
      else if (title.startsWith(word)) s += 8;
      else if (title.includes(word)) s += 5;
      if (desc.includes(word)) s += 2;
      if (keys.includes(word)) s += 1;
      if (s === 0) {
        ok = false;
        break;
      }
      score += s;
    }
    if (ok) {
      // Prefer pages over deep entries when scores tie.
      if (entry.kind === "Technology" || entry.kind === "Roadmap") score += 1.5;
      scored.push({ entry, score });
    }
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, limit).map((s) => s.entry);
}

const SUGGESTED = ["react hooks", "flexbox", "async await", "accessibility", "typescript generics", "nextjs", "tailwind", "claude code"];

export function SearchTrigger() {
  const isOpen = useOpen();

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (open) closeSearch();
        else openSearch();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button type="button" className="search-btn" onClick={() => openSearch()} aria-label="Search (⌘K)" aria-haspopup="dialog">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <span className="search-btn__label">Search</span>
        <kbd aria-hidden="true">⌘K</kbd>
      </button>
      {isOpen && <Palette />}
    </>
  );
}

function Palette() {
  const router = useRouter();
  const [index, setIndex] = useState<SearchEntry[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [query, setQueryRaw] = useState(initialQuery);
  const [active, setActive] = useState(0);
  const setQuery = (value: string) => {
    setQueryRaw(value);
    setActive(0);
  };
  const input = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    opener.current = document.activeElement as HTMLElement | null;
    input.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      opener.current?.focus?.();
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch("/search-index.json")
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error(String(response.status)))))
      .then((data: SearchEntry[]) => !cancelled && setIndex(data))
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, []);

  const results = useMemo(() => (index ? search(index, query) : []), [index, query]);

  // Group while preserving the flat order for keyboard navigation.
  const grouped = useMemo(() => {
    const groups = new Map<SearchKind, SearchEntry[]>();
    for (const entry of results) {
      const list = groups.get(entry.kind) ?? [];
      list.push(entry);
      groups.set(entry.kind, list);
    }
    const ordered = KIND_ORDER.filter((kind) => groups.has(kind)).map((kind) => ({
      kind,
      entries: (groups.get(kind) ?? []).slice(0, 6),
    }));
    return ordered;
  }, [results]);

  const flat = useMemo(() => grouped.flatMap((group) => group.entries), [grouped]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  function go(entry: SearchEntry) {
    closeSearch();
    router.push(entry.href);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeSearch();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => Math.min(i + 1, flat.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter" && flat[active]) {
      event.preventDefault();
      go(flat[active]);
    } else if (event.key === "Tab") {
      // Keep focus inside the dialog.
      event.preventDefault();
      input.current?.focus();
    }
  }

  const starts = grouped.reduce<number[]>((acc, group, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + grouped[i - 1].entries.length);
    return acc;
  }, []);

  return (
    <div className="palette" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && closeSearch()}>
      <div className="palette__box" role="dialog" aria-modal="true" aria-label="Search FrontEndFusion" onKeyDown={onKeyDown}>
        <div className="palette__input">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input
            ref={input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search technologies, lessons, code, roadmaps, interview questions…"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-results"
            aria-activedescendant={flat[active] ? `palette-opt-${active}` : undefined}
            aria-autocomplete="list"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd>esc</kbd>
        </div>

        <div className="palette__body">
          {failed && <p className="palette__msg">Search is unavailable right now. Try the Learn or Technologies pages.</p>}
          {!failed && !index && <p className="palette__msg">Loading index…</p>}

          {index && query.trim() === "" && (
            <div className="palette__suggest">
              <p>Try searching for</p>
              <ul>
                {SUGGESTED.map((s) => (
                  <li key={s}>
                    <button type="button" onClick={() => setQuery(s)}>
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
              <p className="palette__browse">
                Or browse: <Link href="/learn" onClick={closeSearch}>Learn</Link> · <Link href="/roadmaps" onClick={closeSearch}>Roadmaps</Link> ·{" "}
                <Link href="/practice" onClick={closeSearch}>Practice</Link> · <Link href="/projects" onClick={closeSearch}>Projects</Link>
              </p>
            </div>
          )}

          {index && query.trim() !== "" && flat.length === 0 && (
            <p className="palette__msg">
              No results for “{query}”. Try a broader word like “css”, “react”, or “async”.
            </p>
          )}

          {flat.length > 0 && (
            <ul id="palette-results" ref={listRef} role="listbox" aria-label="Results" className="palette__list">
              {grouped.map((group, groupIndex) => (
                <li key={group.kind} role="presentation">
                  <p className="palette__group" role="presentation">
                    {KIND_LABEL[group.kind]}
                  </p>
                  <ul role="presentation">
                    {group.entries.map((entry, entryIndex) => {
                      const i = starts[groupIndex] + entryIndex;
                      return (
                        <li
                          key={entry.id}
                          id={`palette-opt-${i}`}
                          role="option"
                          aria-selected={i === active}
                          data-index={i}
                          className="palette__opt"
                          onMouseMove={() => setActive(i)}
                          onClick={() => go(entry)}
                        >
                          <span className="palette__title">{entry.title}</span>
                          <span className="palette__desc">{entry.description}</span>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

/** Large search field for the homepage; opens the palette seeded with what was typed. */
export function HeroSearch() {
  const [value, setValue] = useState("");
  return (
    <form
      className="hero-search"
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        openSearch(value);
      }}
    >
      <label htmlFor="hero-search-input" className="sr-only">
        Search technologies, lessons and code examples
      </label>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" />
      </svg>
      <input
        id="hero-search-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search React, Flexbox, async/await, TypeScript…"
        autoComplete="off"
      />
      <button type="submit">Search</button>
    </form>
  );
}
