"use client";

import Link from "next/link";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import { useSiteTheme } from "@/lib/use-site-theme";

export type DomainItem = {
  id: string;
  letter: string;
  title: string;
  tagline: string;
  href: string;
};

/** The ten curriculum domains. A pointer-following light shows which one you are on. */
export function DomainGrid({ domains }: { domains: DomainItem[] }) {
  const theme = useSiteTheme();

  return (
    <ol className="domains domains--lit">
      {domains.map((d) => (
        <li key={d.id}>
          <SpotlightCard
            theme={theme}
            spotlightColor={theme === "light" ? "rgba(22, 163, 74, 0.3)" : "rgba(74, 222, 128, 0.35)"}
            intensity={0.45}
            spotlightSize={260}
            borderGlow={0.7}
            proximity={90}
            className="domains__card"
          >
            <Link href={d.href}>
              <span className="domains__letter" aria-hidden="true">
                {d.letter}
              </span>
              <span>
                <span className="domains__title">{d.title}</span>
                <span className="domains__desc">{d.tagline}</span>
              </span>
            </Link>
          </SpotlightCard>
        </li>
      ))}
    </ol>
  );
}
