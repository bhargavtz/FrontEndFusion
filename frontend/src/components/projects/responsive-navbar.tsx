"use client";

import Link from "next/link";
import { useState } from "react";

const links = ["Home", "About", "Services", "Contact"];

function BrandMark() {
  return (
    <span
      className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-black text-white"
      style={{
        background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
      }}
      aria-hidden="true"
    >
      F
    </span>
  );
}

export function ResponsiveNavbarDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex items-center">
              <a href="#" className="group flex flex-shrink-0 items-center">
                <BrandMark />
                <span className="ml-2 text-xl font-bold text-gray-800 transition-colors group-hover:text-indigo-600">
                  MyWebsite
                </span>
              </a>
            </div>

            <div className="hidden items-center space-x-4 sm:ml-6 sm:flex">
              {links.map((label, index) => (
                <a
                  key={label}
                  href={index === 0 ? "#" : `#${label.toLowerCase()}`}
                  className={`group rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 hover:bg-gray-100 hover:text-indigo-600 ${
                    index === 0 ? "text-indigo-600" : "text-gray-700"
                  }`}
                >
                  <span className="relative">
                    {label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full ${
                        index === 0 ? "w-full" : "w-0"
                      }`}
                    />
                  </span>
                </a>
              ))}
              <button
                type="button"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Get started
              </button>
            </div>

            <div className="-mr-2 flex items-center sm:hidden">
              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 transition-all hover:bg-gray-100 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset"
                aria-expanded={open}
                aria-controls="demo-mobile-menu"
                aria-label={open ? "Close main menu" : "Open main menu"}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  {open ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {open && (
          <div id="demo-mobile-menu" className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {links.map((label) => (
                <a
                  key={label}
                  href={label === "Home" ? "#" : `#${label.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 transition-all duration-300 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  {label}
                </a>
              ))}
              <button
                type="button"
                className="mt-2 w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white"
              >
                Get started
              </button>
            </div>
          </div>
        )}
      </nav>

      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="rounded-2xl bg-white p-8 shadow-md">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[.16em] text-indigo-600">
            Project 01 · Beginner
          </p>
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">
            Responsive Navbar
          </h1>
          <p className="mt-4 max-w-2xl text-gray-600">
            A mobile-first sticky navigation bar with a hamburger toggle,
            keyboard-accessible button, and animated underline hover effects.
            Resize the window below the <code>sm</code> breakpoint to try the
            mobile menu.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Tailwind", "Responsive", "React state", "A11y"].map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700"
              >
                {tag}
              </span>
            ))}
          </div>
          <Link
            href="/"
            className="mt-6 inline-block text-sm font-medium text-indigo-600 hover:underline"
          >
            ← Back to FrontEndFusion
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            ["Sticky", "The nav stays visible as the page scrolls."],
            ["Toggle", "State-driven mobile panel with aria-expanded."],
            ["Motion", "Underlines grow on hover, respecting reduced motion."],
          ].map(([title, detail]) => (
            <div key={title} className="rounded-xl border border-gray-200 bg-white p-5">
              <h2 className="font-semibold text-gray-800">{title}</h2>
              <p className="mt-1 text-sm text-gray-500">{detail}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
