"use client";

import { useState } from "react";

const topics = [
  "HTML Tips",
  "CSS Tricks",
  "UI Patterns",
  "Accessibility",
  "Performance",
];

export function NewsletterForm() {
  const [subscribed, setSubscribed] = useState(false);
  const [inlineSubscribed, setInlineSubscribed] = useState(false);
  const [frequency, setFrequency] = useState("weekly");

  return (
    <div className="w-full max-w-lg">
      <div className="rounded-2xl bg-white p-8 text-center shadow-xl">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100">
          <svg
            className="h-8 w-8 text-violet-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>

        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          Stay in the loop
        </h2>
        <p className="mb-6 text-sm text-gray-500">
          Get weekly tips on HTML, CSS, and frontend development. No spam,
          unsubscribe anytime.
        </p>

        <div className="mb-7 flex flex-wrap justify-center gap-2">
          {topics.map((topic) => (
            <span
              key={topic}
              className="rounded-full border border-violet-500/30 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700"
            >
              {topic}
            </span>
          ))}
        </div>

        {subscribed ? (
          <div className="py-4" role="status">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-8 w-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">
              You&apos;re subscribed!
            </h3>
            <p className="text-sm text-gray-500">
              Thanks for joining. Check your inbox for a confirmation email.
            </p>
            <button
              type="button"
              onClick={() => setSubscribed(false)}
              className="mt-4 text-sm font-medium text-violet-600 hover:underline"
            >
              Subscribe another email
            </button>
          </div>
        ) : (
          <>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setSubscribed(true);
              }}
            >
              <div className="mb-3 text-left">
                <label
                  htmlFor="newsletter-name"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  First name{" "}
                  <span className="font-normal text-gray-500">(optional)</span>
                </label>
                <input
                  type="text"
                  id="newsletter-name"
                  name="first-name"
                  placeholder="Jane"
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 transition focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/25"
                />
              </div>

              <div className="mb-5 text-left">
                <label
                  htmlFor="newsletter-email"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Email address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="newsletter-email"
                  name="email"
                  placeholder="jane@example.com"
                  required
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 transition focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/25"
                />
              </div>

              <fieldset className="mb-5 text-left">
                <legend className="mb-2 text-sm font-medium text-gray-700">
                  Delivery frequency
                </legend>
                <div className="flex gap-3">
                  {["weekly", "monthly"].map((option) => (
                    <label
                      key={option}
                      className={`flex flex-1 cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 transition hover:border-violet-300 ${
                        frequency === option
                          ? "border-violet-400 bg-violet-50/60"
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="frequency"
                        value={option}
                        checked={frequency === option}
                        onChange={() => setFrequency(option)}
                        className="text-violet-600 focus:ring-violet-500"
                      />
                      <span className="text-sm capitalize text-gray-700">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <button
                type="submit"
                className="w-full rounded-lg bg-violet-600 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 active:scale-[.98]"
              >
                Subscribe for free →
              </button>
            </form>

            <p className="mt-4 text-xs text-gray-500">
              By subscribing you agree to our{" "}
              <button type="button" className="text-violet-700 hover:underline">
                Privacy Policy
              </button>
              . We&apos;ll never share your data.
            </p>
          </>
        )}

        <div className="mt-7 flex items-center justify-center gap-2 border-t border-gray-100 pt-6">
          <div className="flex -space-x-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-violet-300 text-xs font-bold text-white">
              A
            </div>
            <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-purple-400 text-xs font-bold text-white">
              B
            </div>
            <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-indigo-400 text-xs font-bold text-white">
              C
            </div>
          </div>
          <p className="text-xs text-gray-500">
            Join <strong className="text-gray-700">2,400+</strong> developers
          </p>
        </div>
      </div>

      {/* Inline banner variant */}
      <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 p-6 sm:flex-row">
        <div className="text-center text-white sm:text-left">
          <p className="text-base font-semibold">Weekly Frontend Digest</p>
          <p className="text-sm text-violet-100">Practical tips, no noise.</p>
        </div>
        {inlineSubscribed ? (
          <p className="text-sm font-semibold text-white" role="status">
            Subscribed — check your inbox.
          </p>
        ) : (
          <form
            className="flex w-full gap-2 sm:w-auto"
            onSubmit={(event) => {
              event.preventDefault();
              setInlineSubscribed(true);
            }}
          >
            <label htmlFor="banner-email" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="banner-email"
              required
              placeholder="Enter your email"
              className="w-full flex-1 rounded-lg border-0 px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-white sm:w-56"
            />
            <button
              type="submit"
              className="whitespace-nowrap rounded-lg bg-white px-4 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
