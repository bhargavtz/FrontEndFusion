import Link from "next/link";
import { ProximityTitle } from "@/components/proximity-title";

/** Shared header for section index pages. */
export function PageHeader({
  eyebrow,
  title,
  description,
  back = { label: "Home", href: "/" },
  proximity = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  back?: { label: string; href: string } | null;
  /** Letters react to the cursor (VariableProximity). Use on one or two showcase pages only. */
  proximity?: boolean;
}) {
  return (
    <header className="page-head">
      {back && (
        <Link href={back.href} className="page-head__back">
          <span aria-hidden="true">←</span> {back.label}
        </Link>
      )}
      <p className="eyebrow">{eyebrow}</p>
      {proximity ? <ProximityTitle text={title} /> : <h1>{title}</h1>}
      <p className="page-head__lead">{description}</p>
    </header>
  );
}
