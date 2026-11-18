import Link from "next/link";

/** Shared header for section index pages. */
export function PageHeader({
  eyebrow,
  title,
  description,
  back = { label: "Home", href: "/" },
}: {
  eyebrow: string;
  title: string;
  description: string;
  back?: { label: string; href: string } | null;
}) {
  return (
    <header className="page-head">
      {back && (
        <Link href={back.href} className="page-head__back">
          <span aria-hidden="true">←</span> {back.label}
        </Link>
      )}
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="page-head__lead">{description}</p>
    </header>
  );
}
