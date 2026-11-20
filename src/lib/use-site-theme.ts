"use client";

import { useEffect, useState } from "react";

export type SiteTheme = "light" | "dark";

/**
 * Current `data-theme` on <html>, kept in sync with ThemeToggle.
 * Starts as "dark" (the server default) and corrects itself after mount.
 */
export function useSiteTheme(): SiteTheme {
  const [theme, setTheme] = useState<SiteTheme>("dark");

  useEffect(() => {
    const root = document.documentElement;
    const read = () => setTheme(root.dataset.theme === "light" ? "light" : "dark");
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return theme;
}
