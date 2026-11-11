"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "#" },
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
  {
    icon: "💻",
    title: "Web Development",
    detail: "Responsive, modern, and scalable web solutions.",
  },
  {
    icon: "📱",
    title: "Mobile Apps",
    detail: "Custom app development for iOS and Android.",
  },
  {
    icon: "📈",
    title: "Digital Marketing",
    detail: "Strategies to boost your online presence.",
  },
];

function Placeholder({ label }: { label: string }) {
  return (
    <div
      className="flex aspect-[4/3] w-full items-center justify-center rounded-xl text-5xl shadow-lg"
      style={{
        background:
          "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 45%, #c7d2fe 100%)",
      }}
      role="img"
      aria-label={label}
    >
      <span aria-hidden="true">🎨</span>
    </div>
  );
}

export function LandingPageDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <nav className="bg-white shadow-lg">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex justify-between">
            <div className="flex space-x-7">
              <a href="#" className="flex items-center px-2 py-4">
                <span
                  className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg text-sm font-black text-white"
                  style={{ background: "linear-gradient(135deg,#3b82f6,#6366f1)" }}
                  aria-hidden="true"
                >
                  F
                </span>
                <span className="text-lg font-semibold text-gray-500">
                  FrontEndFusion
                </span>
              </a>
              <div className="hidden items-center space-x-1 md:flex">
                {navLinks.map((link, index) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`px-2 py-4 font-semibold transition duration-300 ${
                      index === 0
                        ? "border-b-4 border-blue-500 text-blue-600"
                        : "text-gray-500 hover:text-blue-500"
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="hidden items-center space-x-3 md:flex">
              <button
                type="button"
                className="rounded px-2 py-2 font-medium text-gray-500 transition duration-300 hover:bg-gray-200"
              >
                Log In
              </button>
              <button
                type="button"
                className="rounded bg-blue-500 px-2 py-2 font-medium text-white transition duration-300 hover:bg-blue-400"
              >
                Sign Up
              </button>
            </div>
            <button
              type="button"
              className="flex items-center p-2 md:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="landing-mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {open ? (
                  <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <div id="landing-mobile-menu" className="border-t md:hidden">
            <ul className="m-0 list-none p-0">
              {navLinks.map((link, index) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block px-2 py-4 text-sm font-semibold transition duration-300 ${
                      index === 0
                        ? "bg-blue-500 text-white"
                        : "text-gray-700 hover:bg-blue-500 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      <section className="bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-16 md:flex-row md:py-24">
          <div className="flex w-full flex-col items-start justify-center p-4 lg:w-1/2">
            <h1 className="text-4xl tracking-tight text-blue-600 md:text-6xl">
              Welcome to FrontEndFusion
            </h1>
            <h2 className="mb-4 mt-2 text-3xl leading-relaxed md:text-5xl">
              Empowering Your Digital Success
            </h2>
            <p className="mb-6 text-lg text-gray-600">
              We craft innovative solutions in web development, app design, and
              digital marketing to help your business thrive in the digital age.
            </p>
            <a
              href="#contact"
              className="rounded-lg bg-blue-500 px-6 py-3 text-white shadow-lg transition hover:bg-blue-400"
            >
              Get Started
            </a>
          </div>
          <div className="w-full p-4 lg:w-1/2">
            <Placeholder label="Team illustration placeholder" />
          </div>
        </div>
      </section>

      <section id="about" className="bg-gray-100 py-20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-4xl font-semibold text-gray-800">About Us</h2>
          <p className="mx-auto mt-4 max-w-3xl text-gray-600">
            At FrontEndFusion, we specialize in creating tailored solutions that
            combine creativity, technology, and strategy to help businesses grow.
            Our dedicated team works tirelessly to deliver excellence in every
            project.
          </p>
          <div className="mt-8 flex flex-wrap justify-center">
            {about.map((item) => (
              <div key={item.title} className="w-full p-4 md:w-1/3">
                <div className="flex aspect-[4/3] items-center justify-center rounded-xl bg-blue-50 text-5xl">
                  <span aria-hidden="true">{item.icon}</span>
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="mt-2 text-gray-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-4xl font-semibold text-gray-800">Our Services</h2>
          <p className="mt-4 text-gray-600">
            We offer a comprehensive range of services to meet your digital needs.
          </p>
          <div className="mt-8 flex flex-wrap justify-center">
            {services.map((service) => (
              <div key={service.title} className="w-full p-4 md:w-1/3">
                <div className="flex aspect-[4/3] items-center justify-center rounded-xl bg-indigo-50 text-5xl">
                  <span aria-hidden="true">{service.icon}</span>
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-gray-800">
                  {service.title}
                </h3>
                <p className="mt-2 text-gray-600">{service.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-gray-100 py-20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-4xl font-semibold text-gray-800">Contact Us</h2>
          <p className="mt-4 text-gray-600">
            Have questions or need assistance? We&apos;d love to hear from you!
          </p>
          <div className="mt-8 flex justify-center">
            <form
              className="w-full md:w-1/2"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="mb-4">
                <label htmlFor="landing-name" className="sr-only">
                  Name
                </label>
                <input
                  id="landing-name"
                  type="text"
                  placeholder="Name"
                  required
                  className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="landing-email" className="sr-only">
                  Email
                </label>
                <input
                  id="landing-email"
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="landing-message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="landing-message"
                  rows={4}
                  placeholder="Message"
                  required
                  className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="rounded-lg bg-blue-500 px-6 py-3 text-white transition hover:bg-blue-400"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-white py-8">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <p className="text-gray-600">
            © 2026 FrontEndFusion. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center gap-4">
            {["𝕏", "in", "f", "◎"].map((icon) => (
              <button
                key={icon}
                type="button"
                className="text-gray-600 transition hover:text-blue-500"
                aria-label={`Social link ${icon}`}
              >
                {icon}
              </button>
            ))}
          </div>
          <Link
            href="/"
            className="mt-6 inline-block text-sm font-medium text-blue-600 hover:underline"
          >
            ← Back to FrontEndFusion
          </Link>
        </div>
      </footer>
    </div>
  );
}
