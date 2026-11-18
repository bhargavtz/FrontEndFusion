import { navItems } from "@/data/navigation";
import { domains } from "@/data/curriculum";
import { docs } from "@/data/docs";
import { featuredTechnologies, technologies as allTechnologies } from "@/data/technologies";
import { HeaderNav, type MenuLink } from "./header-nav";

/** Server wrapper: derives dropdown content from the curriculum so nav never drifts from content. */
export function SiteHeader() {
  const learn: MenuLink[] = domains.map((domain) => ({
    label: domain.title,
    href: domain.href,
    description: domain.tagline,
  }));

  const technologies: MenuLink[] = featuredTechnologies.slice(0, 8).map((tech) => ({
    label: tech.name,
    href: `/technologies/${tech.slug}`,
    description: tech.summary.split(/[.:]/)[0],
  }));

  return (
    <HeaderNav
      totals={{ lessons: docs.length, technologies: allTechnologies.length }}
      items={navItems.map((item) => ({
        label: item.label,
        href: item.href,
        menu: item.menu === "learn" ? learn : item.menu === "technologies" ? technologies : undefined,
        menuFooter:
          item.menu === "learn"
            ? { label: "Browse the full curriculum", href: "/learn" }
            : item.menu === "technologies"
              ? { label: "All technologies", href: "/technologies" }
              : undefined,
      }))}
    />
  );
}
