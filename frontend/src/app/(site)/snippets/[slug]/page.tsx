import type { ComponentType } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSnippet, snippets } from "@/data/snippets";
import { TechTags } from "@/components/tech-tags";
import { LoginForm } from "@/components/snippets/login-form";
import { ContactForm } from "@/components/snippets/contact-form";
import { NewsletterForm } from "@/components/snippets/newsletter-form";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const demos: Record<string, ComponentType> = {
  "login-form": LoginForm,
  "contact-form": ContactForm,
  "newsletter-form": NewsletterForm,
};

const canvasBySlug: Record<string, string> = {
  "login-form": "linear-gradient(135deg, #eef2ff 0%, #faf5ff 100%)",
  "contact-form": "linear-gradient(135deg, #f0f9ff 0%, #ecfeff 100%)",
  "newsletter-form": "linear-gradient(135deg, #f5f3ff 0%, #faf5ff 100%)",
};

export function generateStaticParams() {
  return snippets.map((snippet) => ({ slug: snippet.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const snippet = getSnippet(slug);

  if (!snippet) {
    return { title: "Snippet not found" };
  }

  return {
    title: `${snippet.title} Snippet`,
    description: snippet.description,
    alternates: { canonical: `/snippets/${snippet.slug}` },
  };
}

export default async function SnippetPage({ params }: PageProps) {
  const { slug } = await params;
  const snippet = getSnippet(slug);
  const Demo = demos[slug];

  if (!snippet || !Demo) {
    notFound();
  }

  const index = snippets.findIndex((item) => item.slug === snippet.slug);
  const previous = index > 0 ? snippets[index - 1] : null;
  const next = index < snippets.length - 1 ? snippets[index + 1] : null;

  return (
    <main id="main-content" className="mx-auto max-w-6xl px-4 py-12">
      <Link
        href="/#snippets"
        className="text-sm no-underline hover:underline"
        style={{ color: "var(--text-muted)" }}
      >
        <span aria-hidden="true">←</span> All snippets
      </Link>

      <header className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <span className="text-3xl" aria-hidden="true">
              {snippet.icon}
            </span>
            <span
              className="rounded-full border px-3 py-1 text-xs font-semibold"
              style={{
                borderColor: "var(--border)",
                color: "var(--secondary)",
              }}
            >
              {snippet.slug}.html
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {snippet.title}
          </h1>
          <p
            className="mt-2 max-w-2xl text-base"
            style={{ color: "var(--text-muted)" }}
          >
            {snippet.description}
          </p>
        </div>
        <TechTags tags={snippet.tags} />
      </header>

      <div
        className="mt-8 flex items-center justify-center rounded-2xl border p-5 shadow-inner sm:p-10"
        style={{
          background: canvasBySlug[snippet.slug],
          borderColor: "var(--border)",
        }}
      >
        <Demo />
      </div>

      <p
        className="mt-4 text-center text-xs"
        style={{ color: "var(--text-muted)" }}
      >
        Interactive demo — no data leaves your browser.
      </p>

      <nav
        className="mt-10 grid grid-cols-1 gap-4 border-t pt-8 sm:grid-cols-2"
        style={{ borderColor: "var(--border)" }}
        aria-label="Snippet pagination"
      >
        {previous ? (
          <Link
            href={`/snippets/${previous.slug}`}
            className="hub-card no-underline"
            style={{ color: "var(--text)" }}
          >
            <span
              className="text-xs uppercase tracking-wide"
              style={{ color: "var(--text-muted)" }}
            >
              Previous snippet
            </span>
            <span className="mt-1 block font-semibold">
              <span aria-hidden="true">←</span> {previous.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/snippets/${next.slug}`}
            className="hub-card text-right no-underline"
            style={{ color: "var(--text)" }}
          >
            <span
              className="text-xs uppercase tracking-wide"
              style={{ color: "var(--text-muted)" }}
            >
              Next snippet
            </span>
            <span className="mt-1 block font-semibold">
              {next.title} <span aria-hidden="true">→</span>
            </span>
          </Link>
        ) : null}
      </nav>
    </main>
  );
}
