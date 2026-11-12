import Link from "next/link";
import { hero } from "@/data/hero";
import { features } from "@/data/features";
import { projects } from "@/data/projects";
import { snippets } from "@/data/snippets";
import { resourceGroups } from "@/data/resources";
import { learningPath } from "@/data/learning-path";
import { docs } from "@/data/docs";
import { books } from "@/data/books";
import { SectionHeading } from "@/components/section-heading";
import { ProjectTable } from "@/components/project-table";
import { SnippetCard } from "@/components/snippet-card";
import { ResourceGroup } from "@/components/resource-group";
import { LearningCard } from "@/components/learning-card";
import { GradientShowcase } from "@/components/gradient-showcase";
import GradientASCII from "@/components/react-bits/gradient-ascii";
import SplitText from "@/components/SplitText";

const MONO_FONT =
  '"Geist Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <header className="hero-stage relative isolate overflow-hidden">
        <div className="hero-ascii-wrap absolute inset-0 -z-10" aria-hidden="true">
          <GradientASCII
            colors={["#0b3b24", "#15803d", "#4ade80", "#a7f3d0"]}
            shape="eclipse"
            characters=" .:-=+*#%@"
            cellSize={14}
            density={0.7}
            glyphOpacity={0.55}
            gradientOpacity={0.55}
            glow={0.4}
            flicker={0.18}
            softness={0.6}
            scale={2.2}
            flow={0.45}
            speed={0.45}
            grain={0.2}
            variation={3}
            clickEffect="wave"
            intro
            dpr={1.75}
            fontFamily={MONO_FONT}
            className="hero-ascii"
          />
        </div>
        <div
          className="hero-scrim pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
        />
        <div
          className="hero-grid pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
        />

        <div className="relative mx-auto flex min-h-[clamp(38rem,82vh,48rem)] max-w-6xl flex-col items-center justify-center px-4 py-24 text-center sm:py-28">
          <p className="hero-badge">
            <span className="hero-badge-dot" aria-hidden="true" />
            Open-source learning hub
          </p>
          <h1 className="hero-title font-display text-[clamp(2.9rem,7.5vw,5.1rem)] font-bold leading-[0.94] tracking-[-0.045em] text-balance">
            {hero.title}
          </h1>
          <SplitText
            text={hero.subtitle}
            tag="p"
            splitType="words"
            effect="blur"
            trigger="load"
            delay={24}
            duration={1.1}
            aria="none"
            className="hero-subtitle mx-auto mt-5 max-w-xl text-lg leading-relaxed"
          />
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            {hero.actions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={
                  action.variant === "primary"
                    ? "hero-cta hero-cta-primary font-display no-underline"
                    : "hero-cta hero-cta-ghost font-display no-underline"
                }
              >
                {action.label} <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>

          <dl className="hero-stats">
            <div className="hero-stat">
              <dt>In-app guides</dt>
              <dd>{docs.length}</dd>
            </div>
            <div className="hero-stat">
              <dt>Interactive demos</dt>
              <dd>{projects.length}</dd>
            </div>
            <div className="hero-stat">
              <dt>Form snippets</dt>
              <dd>{snippets.length}</dd>
            </div>
            <div className="hero-stat">
              <dt>License</dt>
              <dd>MIT</dd>
            </div>
          </dl>

          <a href="#intro" className="hero-scroll" aria-label="Scroll to content">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v14m0 0l-5-5m5 5l5-5"
              />
            </svg>
          </a>
        </div>
      </header>

      {/* ── Main ─────────────────────────────────────────────── */}
      <main id="main-content" className="mx-auto max-w-6xl px-4 py-16">
        {/* Introduction */}
        <section id="intro" className="mb-20 scroll-mt-24 fade-in">
          <SectionHeading title="What Is FrontEndFusion?" />
          <p
            className="mt-4 max-w-3xl text-lg leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            FrontEndFusion is an open-source collection of HTML &amp; CSS
            demos, code snippets, and learning guides. Whether you&apos;re a
            beginner exploring semantic HTML or an intermediate developer
            mastering CSS Grid and animations — this hub has something for you.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="hub-card text-center">
                <div className="mb-2 text-2xl" aria-hidden="true">
                  {feature.icon}
                </div>
                <p className="text-sm font-semibold">{feature.title}</p>
                <p
                  className="mt-1 text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  {feature.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Visual lab */}
        <section id="visual-lab" className="mb-20 scroll-mt-24 fade-in">
          <SectionHeading
            title="Interactive Visual Lab"
            description="A live WebGL light field made of characters, powered by the GradientASCII component from React Bits. Swap the shape, palette, and density — then move your cursor across it and click for a wave."
          />
          <GradientShowcase />
        </section>

        {/* Projects */}
        <section id="projects" className="mb-20 scroll-mt-24 fade-in">
          <SectionHeading
            title="Projects Overview"
            description="Six hands-on demos. Click any card to open the interactive showcase."
          />
          <ProjectTable />
        </section>

        {/* Snippets */}
        <section id="snippets" className="mb-20 scroll-mt-24 fade-in">
          <SectionHeading
            title="Code Snippets"
            description="Copy-paste ready HTML form templates — fully styled, responsive, and keyboard accessible."
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {snippets.map((snippet) => (
              <SnippetCard key={snippet.slug} snippet={snippet} />
            ))}
          </div>
        </section>

        {/* Resources */}
        <section id="resources" className="mb-20 scroll-mt-24 fade-in">
          <SectionHeading
            title="Resources & Guides"
            description="Reference guides on accessibility, SEO, and frontend best practices."
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {resourceGroups.map((group) => (
              <ResourceGroup key={group.title} group={group} />
            ))}
          </div>
        </section>

        {/* Learning path */}
        <section id="learning" className="mb-20 scroll-mt-24 fade-in">
          <SectionHeading
            title="Learning Path"
            description="A structured guide from HTML basics to advanced CSS techniques."
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {learningPath.map((step) => (
              <LearningCard key={step.slug} step={step} />
            ))}
          </div>
        </section>

        {/* Library CTA */}
        <section
          className="hub-card mb-6 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center"
          style={{
            background:
              "linear-gradient(120deg, var(--bg-card) 0%, var(--bg-subtle) 100%)",
          }}
        >
          <div>
            <h2 className="text-xl font-bold">Find your next free book</h2>
            <p
              className="mt-1 text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              {books.length} free books and official docs for frontend and
              AI-assisted coding, with search, topic and level filters.
            </p>
          </div>
          <Link
            href="/library"
            className="font-display whitespace-nowrap rounded-xl px-5 py-2.5 text-sm font-semibold no-underline transition hover:brightness-110"
            style={{ background: "#2e7d32", color: "#fff" }}
          >
            Browse the library <span aria-hidden="true">→</span>
          </Link>
        </section>

        {/* Docs CTA */}
        <section
          className="hub-card flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center"
          style={{
            background:
              "linear-gradient(120deg, var(--bg-card) 0%, var(--bg-subtle) 100%)",
          }}
        >
          <div>
            <h2 className="text-xl font-bold">Browse the full guide library</h2>
            <p
              className="mt-1 text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              Every tutorial is rendered in-app with a table of contents, code
              samples, and previous/next navigation.
            </p>
          </div>
          <Link
            href="/docs"
            className="font-display whitespace-nowrap rounded-xl px-5 py-2.5 text-sm font-semibold no-underline transition hover:brightness-110"
            style={{ background: "#2e7d32", color: "#fff" }}
          >
            Open Docs <span aria-hidden="true">→</span>
          </Link>
        </section>
      </main>
    </>
  );
}
