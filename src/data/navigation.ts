export type NavLink = {
  label: string;
  href: string;
  /** One-line description shown in dropdowns. */
  description?: string;
};

export type NavItem = NavLink & {
  /** Dropdown children. Learn and Technologies are generated from the taxonomy. */
  menu?: "learn" | "technologies";
};

/**
 * Primary navigation. Keep this short: depth lives in the dropdowns and
 * in the command palette (⌘K), not in more top-level items.
 */
export const navItems: NavItem[] = [
  { label: "Learn", href: "/learn", menu: "learn" },
  { label: "Technologies", href: "/technologies", menu: "technologies" },
  { label: "Roadmaps", href: "/roadmaps" },
  { label: "Practice", href: "/practice" },
  { label: "Projects", href: "/projects" },
  { label: "AI Development", href: "/ai" },
  { label: "Resources", href: "/resources" },
];

export const navLinks: NavLink[] = navItems;
