"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const about = [
  { icon: "🏢", title: "Our Office", detail: "A hub of innovation and collaboration." },
  { icon: "👥", title: "Our Team", detail: "Skilled professionals dedicated to your success." },
  { icon: "🤝", title: "Our Clients", detail: "Trusted by businesses across industries." },
];

const services = [
  { icon: "💻", title: "Web Development", detail: "Responsive, modern, and scalable web solutions." },
  { icon: "📱", title: "Mobile Apps", detail: "Custom app development for iOS and Android." },
  { icon: "📈", title: "Digital Marketing", detail: "Strategies to boost your online presence." },
];

function Placeholder({ label }: { label: string }) {
  return (
    <div
      className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl text-6xl shadow-2xl"
      style={{
        background:
          "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 40%, #c7d2fe 70%, #ddd6fe 100%)",
      }}
      role="img"
      aria-label={label}
    >
      <span aria-hidden="true" className="drop-shadow-lg">🎨</span>
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 30%, #ffffff 0, transparent 50%), radial-gradient(circle at 70% 70%, #818cf8 0, transparent 50%)",
        }}
      />
    </div>
  );
}

export function LandingPageDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-gray-200/60 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#home" className="flex items-center gap-2.5 no-underline">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-black text-white shadow-lg"
              style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)" }}
              aria-hidden="true"
            >
              F
            </span>
            <span className="text-lg font-extrabold tracking-tight text-gray-900">
              FrontEndFusion
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              className="ml-3 rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-gray-800"
            >
              Sign up
            </button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex items-center p-2 md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <svg className="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {open ? (
                <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {open && (
          <div className="border-t border-gray-200 md:hidden">
            <div className="space-y-1 px-4 py-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-100"
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                className="mt-2 w-full rounded-xl bg-gray-900 py-2.5 text-sm font-semibold text-white"
              >
                Sign up
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 60% at 20% 30%, #dbeafe 0, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 70%, #ddd6fe 0, transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-4 inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-700">
                Digital agency · 2026
              </p>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
                Empowering your
                <br />
                <span
                  style={{
                    background: "linear-gradient(120deg, #2563eb, #7c3aed)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  digital success
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600">
                We craft innovative solutions in web development, app design, and
                digital marketing to help your business thrive in the digital age.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-700 hover:shadow-xl"
                >
                  Get started
                </a>
                <a
                  href="#services"
                  className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-gray-400 hover:bg-gray-50"
                >
                  Our services
                </a>
              </div>
              <div className="mt-10 flex items-center gap-6 text-sm text-gray-500">
                <div>
                  <p className="text-2xl font-bold text-gray-900">120+</p>
                  <p>Projects shipped</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">98%</p>
                  <p>Client satisfaction</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                  <p>Years of craft</p>
                </div>
              </div>
            </div>
            <div>
              <Placeholder label="Team illustration placeholder" />
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              About us
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Built for ambitious teams
            </h2>
            <p className="mt-4 text-gray-600">
              At FrontEndFusion, we specialize in creating tailored solutions that
              combine creativity, technology, and strategy to help businesses
              grow. Our dedicated team works tirelessly to deliver excellence in
              every project.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {about.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                  <span aria-hidden="true">{item.icon}</span>
                </div>
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Services
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              What we do best
            </h2>
            <p className="mt-4 text-gray-600">
              We offer a comprehensive range of services to meet your digital
              needs.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-2xl transition group-hover:scale-110">
                  <span aria-hidden="true">{service.icon}</span>
                </div>
                <h3 className="text-lg font-bold">{service.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{service.detail}</p>
                <a
                  href="#contact"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 no-underline hover:gap-2"
                >
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Contact
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Let&apos;s talk
            </h2>
            <p className="mt-4 text-gray-600">
              Have questions or need assistance? We&apos;d love to hear from you!
            </p>
          </div>
          <form
            className="mt-10 space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="lp-name" className="mb-1 block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  id="lp-name"
                  type="text"
                  required
                  placeholder="Jane Smith"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label htmlFor="lp-email" className="mb-1 block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="lp-email"
                  type="email"
                  required
                  placeholder="jane@example.com"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
            <div>
              <label htmlFor="lp-message" className="mb-1 block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="lp-message"
                rows={4}
                required
                placeholder="Tell us about your project…"
                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-2.5 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-700 active:scale-[0.98]"
            >
              Send message
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-gray-200 bg-white py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <p className="text-sm text-gray-500">
            © 2026 FrontEndFusion. All rights reserved.
          </p>
          <div className="flex gap-4">
            {["𝕏", "in", "f", "◎"].map((icon) => (
              <button
                key={icon}
                type="button"
                className="text-gray-400 transition hover:text-gray-900"
                aria-label={`Social link ${icon}`}
              >
                {icon}
              </button>
            ))}
          </div>
          <Link
            href="/"
            className="text-sm font-medium text-blue-600 no-underline hover:underline"
          >
            ← Back to FrontEndFusion
          </Link>
        </div>
      </footer>
    </div>
  );
}
