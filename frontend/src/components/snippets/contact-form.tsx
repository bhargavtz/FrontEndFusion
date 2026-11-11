"use client";

import { useRef, useState } from "react";

const MAX_MESSAGE = 500;

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="w-full max-w-xl">
      <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="h-1.5 bg-gradient-to-r from-sky-400 to-cyan-400" />

        <div className="p-8">
          <h2 className="mb-1 text-2xl font-bold text-gray-900">Get in Touch</h2>
          <p className="mb-7 text-sm text-gray-500">
            Fill in the form below and we&apos;ll get back to you within 24 hours.
          </p>

          {sent && (
            <div
              role="status"
              className="mb-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4"
            >
              <svg
                className="h-5 w-5 flex-shrink-0 text-green-500"
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
              <div>
                <p className="text-sm font-medium text-green-800">Message sent!</p>
                <p className="text-xs text-green-600">
                  Thanks for reaching out. We&apos;ll reply soon.
                </p>
              </div>
            </div>
          )}

          <form
            ref={formRef}
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
              formRef.current?.reset();
              setMessage("");
            }}
          >
            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  placeholder="Jane Smith"
                  required
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/25"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  placeholder="jane@example.com"
                  required
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/25"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="contact-subject"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Subject
              </label>
              <select
                id="contact-subject"
                name="subject"
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/25"
              >
                <option value="">Select a topic…</option>
                <option value="general">General Inquiry</option>
                <option value="support">Technical Support</option>
                <option value="billing">Billing</option>
                <option value="partnership">Partnership</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mb-5">
              <label
                htmlFor="contact-message"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                maxLength={MAX_MESSAGE}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Tell us how we can help…"
                className="w-full resize-none rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/25"
              />
              <p className="mt-1 text-right text-xs text-gray-500">
                <span aria-live="polite">{message.length}</span>/{MAX_MESSAGE}
              </p>
            </div>

            <div className="mb-6 flex items-start gap-2">
              <input
                type="checkbox"
                id="contact-privacy"
                name="privacy"
                required
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-sky-700 focus:ring-sky-500"
              />
              <label htmlFor="contact-privacy" className="text-xs text-gray-500">
                I agree to the{" "}
                <button type="button" className="text-sky-700 hover:underline">
                  Privacy Policy
                </button>{" "}
                and consent to being contacted.
              </label>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-sky-700 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800 active:scale-[.98]"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              Send Message
            </button>
          </form>

          <div className="mt-8 grid grid-cols-1 gap-4 border-t border-gray-100 pt-6 text-center sm:grid-cols-3">
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                Email
              </p>
              <p className="text-sm text-gray-700">hello@example.com</p>
            </div>
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                Phone
              </p>
              <p className="text-sm text-gray-700">+1 (555) 000-0000</p>
            </div>
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                Hours
              </p>
              <p className="text-sm text-gray-700">Mon–Fri, 9am–5pm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
