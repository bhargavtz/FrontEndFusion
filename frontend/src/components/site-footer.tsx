import Link from "next/link";

export function SiteFooter() {
  return (
    <footer
      className="mt-24 border-t py-12 transition-all"
      style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p
              className="text-base font-extrabold tracking-tight"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, var(--primary), var(--secondary))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              FrontEndFusion
            </p>
            <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
              A learning hub for HTML, CSS, and modern frontend.
            </p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/docs" className="no-underline hover:underline">
              Docs
            </Link>
            <Link href="/#projects" className="no-underline hover:underline">
              Projects
            </Link>
            <Link href="/#visual-lab" className="no-underline hover:underline">
              Visual Lab
            </Link>
            <Link href="/#snippets" className="no-underline hover:underline">
              Snippets
            </Link>
            <Link href="/#learning" className="no-underline hover:underline">
              Learn
            </Link>
            <Link
              href="https://github.com/bhargavtz/FrontEndFusion"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:no-underline"
            >
              GitHub
            </Link>
          </nav>
        </div>
        <div
          className="mt-8 flex flex-col items-start justify-between gap-2 border-t pt-6 text-xs sm:flex-row sm:items-center"
          style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
        >
          <p>© 2024–2026 FrontEndFusion · MIT License</p>
          <p>Built with Next.js, TypeScript, and Tailwind CSS 4.</p>
        </div>
      </div>
    </footer>
  );
}
