"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchTrigger } from "@/components/search-palette";
import { ProfileMenu } from "@/components/profile-menu";
import { setAssistantOpen } from "@/lib/ai/store";

export type MenuLink = { label: string; href: string; description?: string };

export type HeaderItem = {
  label: string;
  href: string;
  menu?: MenuLink[];
  menuFooter?: { label: string; href: string };
};

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

export function HeaderNav({ items, totals }: { items: HeaderItem[]; totals: { lessons: number; technologies: number } }) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const bar = useRef<HTMLElement>(null);

  // Close menus on navigation (adjusting state while rendering, not in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpenMenu(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    function onPointer(event: PointerEvent) {
      if (!bar.current?.contains(event.target as Node)) setOpenMenu(null);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenMenu(null);
    }
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header className="site-nav" ref={bar}>
      <div className="site-nav__inner">
        <Link href="/" className="brand" aria-label="FrontEndFusion home">
          <span className="brand__mark" aria-hidden="true">
            {"</>"}
          </span>
          <span className="brand__name">FrontEndFusion</span>
        </Link>

        <nav aria-label="Primary" className="site-nav__links">
          <ul>
            {items.map((item) => (
              <li key={item.href} className="site-nav__item">
                {item.menu ? (
                  <>
                    <button
                      type="button"
                      className="nav-link nav-link--menu"
                      aria-expanded={openMenu === item.label}
                      aria-controls={`menu-${item.label}`}
                      data-active={isActive(pathname, item.href) || undefined}
                      onClick={() => setOpenMenu((current) => (current === item.label ? null : item.label))}
                    >
                      {item.label}
                      <svg viewBox="0 0 12 12" aria-hidden="true" width="10" height="10">
                        <path d="M2 4.5l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    {openMenu === item.label && (
                      <div id={`menu-${item.label}`} className="mega">
                        <ul className="mega__grid">
                          {item.menu.map((link) => (
                            <li key={link.href}>
                              <Link href={link.href} className="mega__link">
                                <span className="mega__title">{link.label}</span>
                                {link.description && <span className="mega__desc">{link.description}</span>}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        {item.menuFooter && (
                          <Link href={item.menuFooter.href} className="mega__footer">
                            {item.menuFooter.label} <span aria-hidden="true">→</span>
                          </Link>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="nav-link"
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    data-active={isActive(pathname, item.href) || undefined}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-nav__tools">
          <SearchTrigger />
          <button type="button" className="icon-btn site-nav__ai" onClick={() => setAssistantOpen(true)} aria-label="Open AI assistant" title="AI assistant">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3z" />
              <path d="M19 15l.7 1.8L21.5 17.5l-1.8.7L19 20l-.7-1.8-1.8-.7 1.8-.7L19 15z" />
            </svg>
          </button>
          <ThemeToggle />
          <ProfileMenu totalLessons={totals.lessons} totalTechnologies={totals.technologies} />
          <button
            type="button"
            className="icon-btn site-nav__burger"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((value) => !value)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {mobileOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav id="mobile-navigation" aria-label="Mobile" className="mobile-nav">
          <ul>
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={isActive(pathname, item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
