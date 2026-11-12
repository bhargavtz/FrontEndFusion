"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const features = [
  {
    icon: "⚡",
    title: "Instant",
    detail: "Sub-50ms interactions with zero layout shift.",
  },
  {
    icon: "♿",
    title: "Accessible",
    detail: "Keyboard, screen reader, and reduced-motion ready.",
  },
  {
    icon: "📱",
    title: "Responsive",
    detail: "Fluid from 320px to ultra-wide displays.",
  },
];

function BrandMark() {
  return (
    <span
      className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-black text-white shadow-lg"
      style={{
        background: "linear-gradient(135deg, #22c55e, #16a34a)",
        boxShadow: "0 8px 20px rgba(34, 197, 94, 0.35)",
      }}
      aria-hidden="true"
    >
      F
    </span>
  );
}

export function ResponsiveNavbarDemo() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean) as Element[];
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    const firstLink = drawerRef.current?.querySelector<HTMLElement>("a, button");
    firstLink?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <nav
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "color-mix(in srgb, var(--bg-card) 82%, transparent)"
            : "transparent",
          backdropFilter: scrolled ? "blur(18px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(18px) saturate(180%)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--border)"
            : "1px solid transparent",
          boxShadow: scrolled ? "var(--shadow)" : "none",
        }}
        aria-label="Primary"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="#home" className="group flex items-center gap-2.5 no-underline">
            <BrandMark />
            <span className="text-lg font-extrabold tracking-tight">
              MyWebsite
            </span>
            <span
              className="hidden rounded-full border px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-widest sm:inline"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-muted)",
              }}
            >
              2026
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                  style={{
                    color: isActive ? "var(--primary)" : "var(--text)",
                  }}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                  <span
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full transition-all duration-300"
                    style={{
                      background: "var(--primary)",
                      transform: isActive ? "scaleX(1)" : "scaleX(0)",
                      transformOrigin: "left",
                    }}
                    aria-hidden="true"
                  />
                </a>
              );
            })}
            <a
              href="#contact"
              className="ml-3 rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:brightness-110"
              style={{
                background: "var(--button-bg)",
                boxShadow: "0 8px 20px color-mix(in srgb, var(--primary) 30%, transparent)",
              }}
            >
              Get started
            </a>
          </div>

          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border transition hover:bg-[var(--bg-subtle)] md:hidden"
            style={{ borderColor: "var(--border)", color: "var(--text)" }}
            aria-expanded={open}
            aria-controls="modern-mobile-drawer"
            aria-label="Open navigation menu"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div
          className="fixed inset-0 z-[60] md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => {
              setOpen(false);
              buttonRef.current?.focus();
            }}
            aria-hidden="true"
          />
          <div
            ref={drawerRef}
            id="modern-mobile-drawer"
            className="absolute right-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto border-l p-6 shadow-2xl"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border)",
            }}
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="text-base font-extrabold tracking-tight">
                MyWebsite
              </span>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  buttonRef.current?.focus();
                }}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg transition hover:bg-[var(--bg-subtle)]"
                style={{ color: "var(--text)" }}
                aria-label="Close navigation menu"
              >
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
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium transition hover:bg-[var(--bg-subtle)]"
                  style={{
                    color: active === link.href ? "var(--primary)" : "var(--text)",
                    background:
                      active === link.href
                        ? "color-mix(in srgb, var(--primary) 12%, transparent)"
                        : "transparent",
                  }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-4 rounded-xl px-4 py-3 text-center text-base font-semibold text-white shadow-lg"
                style={{ background: "var(--button-bg)" }}
              >
                Get started
              </a>
            </nav>
            <p className="mt-8 text-xs" style={{ color: "var(--text-muted)" }}>
              Built with semantic HTML, ARIA, and progressive enhancement.
            </p>
          </div>
        </div>
      )}

      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <section id="home" className="scroll-mt-24 py-12 text-center sm:py-20">
          <p
            className="mb-4 inline-block rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-muted)",
            }}
          >
            Project 01 · 2026 edition
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
            A navbar that
            <br />
            <span
              style={{
                backgroundImage:
                  "linear-gradient(120deg, var(--primary), var(--secondary))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              stays out of the way
            </span>
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed sm:text-lg"
            style={{ color: "var(--text-muted)" }}
          >
            Glass surface, scroll-aware elevation, animated active indicator,
            focus-trapped mobile drawer, and full keyboard support — built
            without a single dependency.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#services"
              className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:brightness-110"
              style={{ background: "var(--button-bg)" }}
            >
              Explore features
            </a>
            <Link
              href="/"
              className="rounded-xl border px-5 py-2.5 text-sm font-semibold no-underline transition hover:bg-[var(--bg-subtle)]"
              style={{ borderColor: "var(--border)", color: "var(--text)" }}
            >
              ← Back to hub
            </Link>
          </div>
        </section>

        <section id="about" className="scroll-mt-24 py-12">
          <div className="grid gap-6 sm:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border p-6 transition hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--border)",
                  boxShadow: "var(--shadow)",
                }}
              >
                <div
                  className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl text-lg"
                  style={{
                    background:
                      "color-mix(in srgb, var(--primary) 14%, transparent)",
                  }}
                  aria-hidden="true"
                >
                  {feature.icon}
                </div>
                <h2 className="text-base font-bold">{feature.title}</h2>
                <p
                  className="mt-1 text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {feature.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="scroll-mt-24 py-12">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">
            Interaction checklist
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              "Sticky surface turns to glass on scroll",
              "Active link follows the section in view",
              "Mobile drawer traps focus and closes on Escape",
              "Body scroll locked while the drawer is open",
              "Reduced-motion users get no animation",
              "All targets are at least 44×44px",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border p-4"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--border)",
                }}
              >
                <span
                  className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ background: "var(--primary)" }}
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="contact" className="scroll-mt-24 py-12">
          <div
            className="rounded-3xl border p-8 text-center sm:p-12"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in srgb, var(--primary) 18%, var(--bg-card)), var(--bg-card))",
              borderColor: "var(--border)",
              boxShadow: "var(--shadow-lg)",
            }}
          >
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Try the mobile menu
            </h2>
            <p
              className="mx-auto mt-3 max-w-xl text-sm leading-relaxed sm:text-base"
              style={{ color: "var(--text-muted)" }}
            >
              Resize below the <code>md</code> breakpoint, or use the hamburger
              in the top right. Press <kbd className="rounded border px-1.5 py-0.5 text-xs" style={{ borderColor: "var(--border)" }}>Esc</kbd> to close.
            </p>
          </div>
        </section>
      </main>

      <footer
        className="border-t py-8 text-center text-sm"
        style={{ color: "var(--text-muted)", borderColor: "var(--border)" }}
      >
        FrontEndFusion — Responsive Navbar · 2026 edition
      </footer>
    </div>
  );
}
