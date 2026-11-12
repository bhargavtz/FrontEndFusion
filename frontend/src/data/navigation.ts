export type NavLink = {
  label: string;
  href: string;
};

/** Primary site navigation (dataset 1/8 — 2 keys: label, href). */
export const navLinks: NavLink[] = [
  { label: "About", href: "/#intro" },
  { label: "Visual Lab", href: "/#visual-lab" },
  { label: "Projects", href: "/#projects" },
  { label: "Snippets", href: "/#snippets" },
  { label: "Resources", href: "/#resources" },
  { label: "Learn", href: "/#learning" },
];
