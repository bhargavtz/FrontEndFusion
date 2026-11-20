import Link from "next/link";
import { domains } from "@/data/curriculum";
import { FooterWordmark } from "./footer-wordmark";

const columns = [
  {
    title: "Learn",
    links: [
      { label: "Curriculum", href: "/learn" },
      { label: "Technologies", href: "/technologies" },
      { label: "Roadmaps", href: "/roadmaps" },
      { label: "All guides", href: "/docs" },
    ],
  },
  {
    title: "Practice",
    links: [
      { label: "Exercises & interviews", href: "/practice" },
      { label: "Projects", href: "/projects" },
      { label: "Snippets", href: "/snippets" },
      { label: "Book library", href: "/library" },
    ],
  },
  {
    title: "AI development",
    links: [
      { label: "AI-powered frontend", href: "/ai" },
      { label: "AI-assisted workflow", href: "/technologies/ai-assisted-development" },
      { label: "Coding agents", href: "/technologies/ai-coding-agents" },
      { label: "MCP", href: "/technologies/mcp-frontend" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "Resources", href: "/resources" },
      { label: "GitHub", href: "https://github.com/bhargavtz/FrontEndFusion" },
      { label: "Contribute", href: "https://github.com/bhargavtz/FrontEndFusion/blob/main/README.md" },
      { label: "Security", href: "https://github.com/bhargavtz/FrontEndFusion/blob/main/SECURITY.md" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="site-footer__top">
          <div className="site-footer__about">
            <p className="brand__name">FrontEndFusion</p>
            <p>
              One place to learn frontend development — from HTML to AI-powered engineering. Read it, run it, build it.
            </p>
          </div>
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2>{column.title}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={link.href}>
                    {link.href.startsWith("http") ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer">
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href}>{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <p className="site-footer__topics">
          {domains.map((domain, i) => (
            <span key={domain.id}>
              <Link href={domain.href}>{domain.title}</Link>
              {i < domains.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>
        <p className="site-footer__legal">© 2024–2026 FrontEndFusion · MIT License · Open source.</p>
      </div>
      <FooterWordmark />
    </footer>
  );
}
