import Link from "next/link";

export function SiteFooter() {
  return (
    <footer
      className="border-t py-9 transition-all"
      style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      <div className="mx-auto max-w-6xl px-4 text-center">
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          © 2024–2026 FrontEndFusion.{" "}
          <Link
            href="https://github.com/bhargavtz/FrontEndFusion"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 underline underline-offset-2 hover:no-underline"
          >
            GitHub
          </Link>
          <span aria-hidden="true"> · </span>
          MIT License
        </p>
        <p className="mt-2 text-xs" style={{ color: "var(--text-muted)" }}>
          Built with Next.js, TypeScript, and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
