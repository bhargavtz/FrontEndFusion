"use client";

import Link from "next/link";
import StarBorder from "@/components/react-bits/StarBorder";
import { useSiteTheme } from "@/lib/use-site-theme";

/** The single primary call to action on the home page, traced by a moving star. */
export function StartLearningButton({ href, label }: { href: string; label: string }) {
  const theme = useSiteTheme();

  return (
    <StarBorder
      as={Link}
      href={href}
      theme={theme}
      color={theme === "light" ? "#15803d" : "#4ade80"}
      backgroundColor="var(--primary)"
      textColor="#04140a"
      radius={12}
      thickness={1.5}
      duration={5}
      className="hero__start"
    >
      {label}
    </StarBorder>
  );
}
