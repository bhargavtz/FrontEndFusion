"use client";

import Link from "next/link";
import { useState } from "react";
import { navLinks } from "@/data/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

function SunIcon() {
  return (
    <svg
      className="h-4 w-4"
      style={{ color: "var(--text-muted)" }}
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
  );
}

function MoonIcon() {
  return (
    <svg
      className="h-4 w-4"
      style={{ color: "var(--text-muted)" }}
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
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="site-nav" aria-label="Primary">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="font-display flex items-center gap-2 text-lg font-bold tracking-[-0.03em] no-underline"
          style={{
            backgroundImage:
              "linear-gradient(120deg, var(--primary), var(--secondary))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
          }}
          onClick={() => setOpen(false)}
        >
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ background: "var(--primary)" }}
            aria-hidden="true"
          />
          FrontEndFusion
        </Link>

        <div className="flex items-center gap-3">
          <ul className="m-0 hidden list-none items-center gap-6 p-0 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="nav-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <SunIcon />
            <ThemeToggle />
            <MoonIcon />
          </div>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border md:hidden"
            style={{ borderColor: "var(--border)", color: "var(--text)" }}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-navigation"
          className="border-t px-4 pb-4 md:hidden"
          style={{ borderColor: "var(--border)" }}
        >
          <ul className="m-0 flex list-none flex-col gap-1 p-0 pt-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-lg px-3 py-2.5 text-sm no-underline"
                  style={{ color: "var(--text)" }}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
