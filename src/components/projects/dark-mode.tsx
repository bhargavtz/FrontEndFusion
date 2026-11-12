"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

type DemoTheme = "light" | "dark";

const THEME_KEY = "ffe-dark-demo-theme";
const THEME_EVENT = "ffe-dark-demo-theme-change";

const demoStyles = `
.dark-demo {
  --dm-bg-page: #f8fafc;
  --dm-bg-card: #ffffff;
  --dm-bg-nav: #ffffff;
  --dm-bg-subtle: #f1f5f9;
  --dm-text-primary: #0f172a;
  --dm-text-secondary: #475569;
  --dm-text-muted: #94a3b8;
  --dm-border: #e2e8f0;
  --dm-accent: #22c55e;
  --dm-accent-hover: #16a34a;
  --dm-shadow: 0 4px 20px rgba(0,0,0,.08);
  --dm-toggle-bg: #e2e8f0;
  --dm-toggle-thumb: #ffffff;
  --dm-code-bg: #f1f5f9;
  background: var(--dm-bg-page);
  color: var(--dm-text-primary);
  transition: background .3s ease, color .3s ease;
  min-height: 100vh;
  font-family: var(--font-geist-sans), system-ui, sans-serif;
}
.dark-demo[data-demo-theme="dark"] {
  --dm-bg-page: #0f172a;
  --dm-bg-card: #1e293b;
  --dm-bg-nav: #1e293b;
  --dm-bg-subtle: #334155;
  --dm-text-primary: #f1f5f9;
  --dm-text-secondary: #94a3b8;
  --dm-text-muted: #64748b;
  --dm-border: #334155;
  --dm-accent: #4ade80;
  --dm-accent-hover: #86efac;
  --dm-shadow: 0 4px 20px rgba(0,0,0,.4);
  --dm-toggle-bg: #22c55e;
  --dm-toggle-thumb: #f1f5f9;
  --dm-code-bg: #0f172a;
}
.dark-demo .dm-nav {
  background: var(--dm-bg-nav);
  border-bottom: 1px solid var(--dm-border);
  box-shadow: var(--dm-shadow);
  transition: background .3s, border-color .3s;
}
.dark-demo .dm-card {
  background: var(--dm-bg-card);
  border: 1px solid var(--dm-border);
  box-shadow: var(--dm-shadow);
  border-radius: 16px;
  padding: 1.5rem;
  transition: background .3s, border-color .3s, box-shadow .3s;
}
.dark-demo .dm-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--dm-text-primary);
  transition: color .3s;
}
.dark-demo .dm-badge {
  display: inline-block;
  font-size: .7rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 99px;
  background: rgba(34,197,94,.15);
  color: var(--dm-accent);
  transition: background .3s, color .3s;
}
.dark-demo[data-demo-theme="dark"] .dm-badge {
  background: rgba(129,140,248,.15);
}
.dark-demo .dm-input {
  background: var(--dm-bg-subtle);
  border: 1px solid var(--dm-border);
  color: var(--dm-text-primary);
  border-radius: 8px;
  padding: 8px 12px;
  font-size: .875rem;
  width: 100%;
  transition: background .3s, border-color .3s, color .3s;
}
.dark-demo .dm-input:focus {
  outline: none;
  border-color: var(--dm-accent);
  box-shadow: 0 0 0 3px rgba(34,197,94,.2);
}
.dark-demo table { width: 100%; border-collapse: collapse; }
.dark-demo th, .dark-demo td {
  padding: 10px 14px;
  border-bottom: 1px solid var(--dm-border);
  text-align: left;
  font-size: .875rem;
  transition: border-color .3s;
}
.dark-demo th {
  color: var(--dm-text-muted);
  font-weight: 600;
  font-size: .75rem;
  text-transform: uppercase;
  letter-spacing: .04em;
}
.dark-demo tr:last-child td { border-bottom: none; }
.dark-demo tr:hover td { background: var(--dm-bg-subtle); }
.dark-demo code {
  background: var(--dm-code-bg);
  color: var(--dm-accent);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: .85em;
  font-family: var(--font-geist-mono), monospace;
  transition: background .3s;
}
.dark-demo a { color: var(--dm-accent); transition: color .2s; }
.dark-demo a:hover { color: var(--dm-accent-hover); }
.dark-demo .dm-toggle {
  width: 48px; height: 26px;
  background: var(--dm-toggle-bg);
  border-radius: 99px;
  cursor: pointer;
  position: relative;
  transition: background .3s;
  flex-shrink: 0;
  border: 0;
  padding: 0;
}
.dark-demo .dm-thumb {
  width: 20px; height: 20px;
  background: var(--dm-toggle-thumb);
  border-radius: 50%;
  position: absolute;
  top: 3px; left: 3px;
  transition: transform .3s cubic-bezier(.4,0,.2,1), background .3s;
  box-shadow: 0 1px 4px rgba(0,0,0,.2);
}
.dark-demo[data-demo-theme="dark"] .dm-thumb { transform: translateX(22px); }
`;

const cssSnippet = `:root {
  --bg: #f8fafc;
  --text: #0f172a;
  --accent: #22c55e;
}

[data-theme="dark"] {
  --bg: #0f172a;
  --text: #f1f5f9;
  --accent: #4ade80;
}

body {
  background: var(--bg);
  color: var(--text);
  transition: background 0.3s, color 0.3s;
}`;

const jsSnippet = `const html = document.documentElement;
const stored = localStorage.getItem('theme');
const sysDark = matchMedia('(prefers-color-scheme: dark)').matches;

// Apply saved or system preference
html.dataset.theme = stored ?? (sysDark ? 'dark' : 'light');

function toggleTheme() {
  const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
  html.dataset.theme = next;
  localStorage.setItem('theme', next);
}`;

function subscribeTheme(callback: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  window.addEventListener(THEME_EVENT, callback);
  window.addEventListener("storage", callback);
  media.addEventListener("change", callback);
  return () => {
    window.removeEventListener(THEME_EVENT, callback);
    window.removeEventListener("storage", callback);
    media.removeEventListener("change", callback);
  };
}

function getThemeSnapshot(): DemoTheme {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark" || saved === "light") return saved;
  } catch {
    /* ignore */
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function subscribeSystemPreference(callback: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getSystemPreference() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function DarkModeDemo() {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    () => "light" as DemoTheme,
  );
  const systemPreference = useSyncExternalStore(
    subscribeSystemPreference,
    getSystemPreference,
    () => "light",
  );

  function toggle() {
    const next: DemoTheme = theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  }

  return (
    <div className="dark-demo" data-demo-theme={theme}>
      <style>{demoStyles}</style>

      <nav className="dm-nav sticky top-0 z-10 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-lg"
            style={{ background: "var(--dm-accent)" }}
          >
            <svg
              className="h-4 w-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <span className="font-bold" style={{ color: "var(--dm-text-primary)" }}>
            FrontEndFusion
          </span>
          <span className="dm-badge hidden sm:inline">Dark Mode Demo</span>
        </div>

        <div className="flex items-center gap-3">
          <svg
            className="h-4 w-4"
            style={{ color: "var(--dm-text-muted)" }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m8.66-9H21M3 12H2m15.07-7.07l-.71.71M6.64 17.36l-.71.71M17.36 17.36l.71.71M6.64 6.64l.71.71M12 5a7 7 0 100 14A7 7 0 0012 5z"
            />
          </svg>
          <button
            type="button"
            className="dm-toggle"
            role="switch"
            aria-checked={theme === "dark"}
            aria-label="Toggle dark mode"
            onClick={toggle}
          >
            <span className="dm-thumb" />
          </button>
          <svg
            className="h-4 w-4"
            style={{ color: "var(--dm-text-muted)" }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl space-y-8 px-6 py-10">
        <div className="py-6 text-center">
          <h1
            className="mb-3 text-4xl font-bold"
            style={{ color: "var(--dm-text-primary)" }}
          >
            Dark Mode Toggle
          </h1>
          <p
            className="mx-auto max-w-lg text-base"
            style={{ color: "var(--dm-text-secondary)" }}
          >
            Built with CSS custom properties. The theme is saved to{" "}
            <code>localStorage</code> and respects{" "}
            <code>prefers-color-scheme</code>.
          </p>
          <p className="mt-2 text-sm" style={{ color: "var(--dm-text-muted)" }}>
            System preference: <span>{systemPreference}</span>
          </p>
          <Link
            href="/"
            className="mt-4 inline-block text-sm underline"
            style={{ color: "var(--dm-text-muted)" }}
          >
            ← Back to Hub
          </Link>
        </div>

        <div className="dm-card">
          <h2 className="dm-title mb-4">How It Works</h2>
          <ol
            className="space-y-3 text-sm"
            style={{ color: "var(--dm-text-secondary)" }}
          >
            <li className="flex gap-3">
              <span className="dm-badge mt-0.5 flex-shrink-0">1</span>
              All colors are defined as CSS custom properties in <code>:root</code>{" "}
              (light) and <code>[data-theme=&quot;dark&quot;]</code>.
            </li>
            <li className="flex gap-3">
              <span className="dm-badge mt-0.5 flex-shrink-0">2</span>
              JavaScript toggles <code>data-theme=&quot;dark&quot;</code> on{" "}
              <code>&lt;html&gt;</code>, instantly re-mapping every token.
            </li>
            <li className="flex gap-3">
              <span className="dm-badge mt-0.5 flex-shrink-0">3</span>
              The chosen theme is persisted in <code>localStorage</code> so it
              survives page reloads.
            </li>
            <li className="flex gap-3">
              <span className="dm-badge mt-0.5 flex-shrink-0">4</span>
              On first visit, the OS-level <code>prefers-color-scheme</code>{" "}
              media query is checked as the default.
            </li>
          </ol>
        </div>

        <div className="dm-card">
          <h2 className="dm-title mb-4">The CSS Pattern</h2>
          <pre
            className="overflow-x-auto rounded-xl p-4 text-xs"
            style={{
              background: "var(--dm-code-bg)",
              color: "var(--dm-text-secondary)",
            }}
          >
            <code>{cssSnippet}</code>
          </pre>
        </div>

        <div className="dm-card">
          <h2 className="dm-title mb-4">The JavaScript</h2>
          <pre
            className="overflow-x-auto rounded-xl p-4 text-xs"
            style={{
              background: "var(--dm-code-bg)",
              color: "var(--dm-text-secondary)",
            }}
          >
            <code>{jsSnippet}</code>
          </pre>
        </div>

        <div className="dm-card">
          <h2 className="dm-title mb-5">UI Components Responding to Theme</h2>
          <div className="space-y-5">
            <div>
              <label
                htmlFor="dm-search"
                className="mb-1 block text-sm font-medium"
                style={{ color: "var(--dm-text-secondary)" }}
              >
                Search
              </label>
              <input
                id="dm-search"
                type="text"
                placeholder="Type something…"
                className="dm-input"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
                style={{ background: "var(--dm-accent)" }}
              >
                Primary
              </button>
              <button
                type="button"
                className="rounded-lg border px-4 py-2 text-sm font-semibold transition"
                style={{
                  borderColor: "var(--dm-border)",
                  color: "var(--dm-text-primary)",
                  background: "var(--dm-bg-subtle)",
                }}
              >
                Secondary
              </button>
              <button
                type="button"
                className="rounded-lg px-4 py-2 text-sm font-medium"
                style={{ color: "var(--dm-accent)" }}
              >
                Ghost
              </button>
            </div>

            <div
              className="overflow-hidden rounded-xl border"
              style={{ borderColor: "var(--dm-border)" }}
            >
              <table>
                <thead>
                  <tr style={{ background: "var(--dm-bg-subtle)" }}>
                    <th>Property</th>
                    <th>Light</th>
                    <th>Dark</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Background</td>
                    <td>#f8fafc</td>
                    <td>#0f172a</td>
                  </tr>
                  <tr>
                    <td>Surface</td>
                    <td>#ffffff</td>
                    <td>#1e293b</td>
                  </tr>
                  <tr>
                    <td>Text</td>
                    <td>#0f172a</td>
                    <td>#f1f5f9</td>
                  </tr>
                  <tr>
                    <td>Accent</td>
                    <td>#22c55e</td>
                    <td>#4ade80</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <footer
        className="mt-10 border-t py-6 text-center text-sm"
        style={{ color: "var(--dm-text-muted)", borderColor: "var(--dm-border)" }}
      >
        FrontEndFusion — Dark Mode Toggle Demo
      </footer>
    </div>
  );
}
