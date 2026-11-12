export type NavLink = {
  label: string;
  href: string;
};

/** Primary site navigation (dataset 1/9 — 2 keys: label, href). */
export const navLinks: NavLink[] = [
  { label: "About", href: "/#intro" },
  { label: "Projects", href: "/#projects" },
  { label: "Snippets", href: "/#snippets" },
  { label: "Resources", href: "/#resources" },
  { label: "Library", href: "/library" },
  { label: "Learn", href: "/#learning" },
];
