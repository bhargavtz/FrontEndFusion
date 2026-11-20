import Link from "next/link";
import { HeroSearch } from "@/components/search-palette";
import { Playground } from "@/components/playground/playground";
import { OpenAssistantButton } from "@/components/assistant/open-assistant-button";
import { LevelPill } from "@/components/level-pill";
import { HeroBackdrop } from "@/components/home/hero-backdrop";
import { HeroTitle } from "@/components/home/hero-title";
import { HeroStats } from "@/components/home/hero-stats";
import { StartLearningButton } from "@/components/home/start-learning-button";
import { DomainGrid } from "@/components/home/domain-grid";
import { domains } from "@/data/curriculum";
import { docs } from "@/data/docs";
import { projectBriefs } from "@/data/project-briefs";
import { roadmaps } from "@/data/roadmaps";
import { featuredTechnologies, technologies, technologiesByDomain } from "@/data/technologies";

const heroExample = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
  body { font-family: system-ui, sans-serif; display: grid; place-items: center; min-height: 100vh; margin: 0; background: #f8fafc; }
  .counter { text-align: center; }
  output { display: block; font-size: 4rem; font-weight: 700; font-variant-numeric: tabular-nums; }
  button { font: inherit; padding: .6rem 1.1rem; margin: 0 .25rem; border-radius: 10px; border: 1px solid #16a34a; background: #16a34a; color: #fff; cursor: pointer; }
  button.ghost { background: transparent; color: #16a34a; }
  button:focus-visible { outline: 3px solid #86efac; outline-offset: 2px; }
</style>
</head>
<body>
  <main class="counter">
    <output id="count" aria-live="polite">0</output>
    <button id="inc">Add one</button>
    <button id="reset" class="ghost">Reset</button>
  </main>
  <script>
    let count = 0;
    const out = document.getElementById('count');
    document.getElementById('inc').addEventListener('click', () => {
      count += 1;
      out.textContent = count;
      console.log('count is now', count);
    });
    document.getElementById('reset').addEventListener('click', () => {
      count = 0;
      out.textContent = count;
    });
  </script>
</body>
</html>`;

const heroExplanation = [
  "The HTML defines a <main> landmark with an <output> that screen readers announce when it changes (aria-live).",
  "The CSS centres the counter with Grid and styles the buttons, including a visible keyboard focus ring.",
  "The script keeps the count in a variable and updates the DOM from two click handlers.",
  "Change a colour, rename a button, or edit the script — the preview reloads as you type.",
];

export default function HomePage() {
  const careerPaths = roadmaps.filter((r) => ["frontend", "ai-frontend", "advanced-frontend"].includes(r.slug));
  const skillPaths = roadmaps.filter((r) => !careerPaths.includes(r));
  const exampleCount = technologies.reduce((n, t) => n + (t.examples?.length ?? 0), 0);
  const featuredProjects = ["calculator", "todo-app", "dashboard-ui", "ai-chat-interface"]
    .map((slug) => projectBriefs.find((b) => b.slug === slug))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));
  const tools = technologiesByDomain("tooling").concat(technologiesByDomain("ui-libraries"));

  return (
    <main id="main-content">
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="hero hero--terminal" aria-labelledby="hero-title">
        <HeroBackdrop />
        <div className="wrap hero__inner">
          <p className="eyebrow">Free · Open source · No account needed</p>
          <HeroTitle />
          <p className="hero__lead">
            One place for everything frontend — HTML, CSS, JavaScript, TypeScript, React, Next.js, UI libraries, tooling, architecture, and AI-powered development. Every concept comes with code you can run and change.
          </p>

          <HeroSearch />

          <div className="hero__cta">
            <StartLearningButton href="/roadmaps/frontend" label="Start learning" />
            <Link href="/learn" className="btn btn--ghost">
              Browse the curriculum
            </Link>
          </div>

          <HeroStats
            stats={[
              { label: "Technologies", value: technologies.length },
              { label: "In-depth lessons", value: docs.length },
              { label: "Runnable examples", value: exampleCount },
              { label: "Project briefs", value: projectBriefs.length },
            ]}
          />
        </div>
      </section>

      {/* ── Roadmaps ───────────────────────────────────────── */}
      <section className="wrap block" aria-labelledby="roadmaps-h">
        <div className="block__head">
          <p className="eyebrow">Roadmaps</p>
          <h2 id="roadmaps-h">Pick a path, from first tag to professional</h2>
          <p>Each roadmap has stages, milestones, exercises, and projects. Start with the Frontend path if you are new.</p>
        </div>
        <ul className="rows">
          {careerPaths.map((r) => (
            <li key={r.slug}>
              <Link href={`/roadmaps/${r.slug}`} className="row">
                <span className="row__main">
                  <span className="row__title">{r.title}</span>
                  <span className="row__desc">{r.summary}</span>
                </span>
                <span className="row__meta">
                  <span className="row__count">{r.stages.length} stages</span>
                  <span className="row__count">{r.duration}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <ul className="chips">
          {skillPaths.map((r) => (
            <li key={r.slug}>
              <Link href={`/roadmaps/${r.slug}`}>{r.title}</Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Curriculum ─────────────────────────────────────── */}
      <section className="wrap block" aria-labelledby="curriculum-h">
        <div className="block__head">
          <p className="eyebrow">Curriculum</p>
          <h2 id="curriculum-h">Ten domains, one consistent structure</h2>
          <p>Every technology page answers the same questions: what it is, why it exists, how it works — then shows runnable code, common mistakes, and interview questions.</p>
        </div>
        <DomainGrid
          domains={domains.map(({ id, letter, title, tagline, href }) => ({ id, letter, title, tagline, href }))}
        />
      </section>

      {/* ── Popular technologies ───────────────────────────── */}
      <section className="wrap block" aria-labelledby="popular-h">
        <div className="block__head">
          <p className="eyebrow">Popular</p>
          <h2 id="popular-h">Where most people start</h2>
        </div>
        <ul className="chips chips--wide">
          {featuredTechnologies.map((t) => (
            <li key={t.slug}>
              <Link href={`/technologies/${t.slug}`}>{t.name}</Link>
            </li>
          ))}
          <li>
            <Link href="/technologies" className="chips__more">
              All {technologies.length} technologies →
            </Link>
          </li>
        </ul>
      </section>

      {/* ── Learn by coding ────────────────────────────────── */}
      <section className="wrap block" aria-labelledby="coding-h">
        <div className="block__head">
          <p className="eyebrow">Learn by coding</p>
          <h2 id="coding-h">Read it, edit it, see it run</h2>
          <p>
            HTML, CSS, JavaScript, and React examples run in an isolated sandbox right in the page. Copy the whole file or just the lines you select, reset when you break it, and ask the AI assistant about the exact code you highlighted.
          </p>
        </div>
        <Playground id="home-counter" title="A counter in HTML, CSS and JavaScript" language="html" code={heroExample} explanation={heroExplanation} topic="HTML, CSS and JavaScript basics" previewFirst />
        <p className="muted small">
          Examples that need npm packages or a build step are shown read-only and labelled as not runnable here — nothing pretends to run when it cannot.
        </p>
      </section>

      {/* ── AI ─────────────────────────────────────────────── */}
      <section className="wrap block" aria-labelledby="ai-h">
        <div className="split">
          <div>
            <p className="eyebrow">AI-powered development</p>
            <h2 id="ai-h">Use AI professionally — and still understand your code</h2>
            <p>
              Prompting for UI, Claude Code, Cursor, Copilot, MCP, design-to-code, AI review — taught alongside the fundamentals that let you verify what a model gives you.
            </p>
            <p className="hero__cta">
              <Link href="/ai" className="btn btn--primary">
                Explore the AI track
              </Link>
              <OpenAssistantButton label="Try the assistant" />
            </p>
          </div>
          <ul className="plain-list">
            <li>Explain, debug, or convert the code you have selected</li>
            <li>Line-by-line walkthroughs and beginner-friendly explanations</li>
            <li>Generate exercises and project ideas for any topic</li>
            <li>Bring your own key: Anthropic Claude or any OpenAI-compatible endpoint</li>
          </ul>
        </div>
      </section>

      {/* ── Projects ───────────────────────────────────────── */}
      <section className="wrap block" aria-labelledby="projects-h">
        <div className="block__head">
          <p className="eyebrow">Projects</p>
          <h2 id="projects-h">Build to learn</h2>
          <p>{projectBriefs.length} briefs from beginner to advanced, each with requirements, structure, steps, and challenges.</p>
        </div>
        <ul className="rows">
          {featuredProjects.map((b) => (
            <li key={b.slug}>
              <Link href={`/projects/briefs/${b.slug}`} className="row">
                <span className="row__main">
                  <span className="row__title">{b.title}</span>
                  <span className="row__desc">{b.summary}</span>
                </span>
                <LevelPill level={b.level} />
              </Link>
            </li>
          ))}
        </ul>
        <p className="next-link">
          <Link href="/projects">See all projects →</Link>
        </p>
      </section>

      {/* ── Tools ──────────────────────────────────────────── */}
      <section className="wrap block" aria-labelledby="tools-h">
        <div className="block__head">
          <p className="eyebrow">Tools &amp; libraries</p>
          <h2 id="tools-h">The ecosystem around the code</h2>
        </div>
        <ul className="chips chips--wide">
          {tools.map((t) => (
            <li key={t.slug}>
              <Link href={`/technologies/${t.slug}`}>{t.name}</Link>
            </li>
          ))}
          <li>
            <Link href="/resources" className="chips__more">
              Official docs &amp; resources →
            </Link>
          </li>
        </ul>
      </section>

      {/* ── Contribute ─────────────────────────────────────── */}
      <section className="wrap block" aria-labelledby="contribute-h">
        <div className="callout callout--row">
          <div>
            <h2 id="contribute-h">Built in the open</h2>
            <p>
              FrontEndFusion is MIT-licensed. Found a mistake or want a topic added? Every page is an MDX or data file in the repository.
            </p>
          </div>
          <a className="btn btn--ghost" href="https://github.com/bhargavtz/FrontEndFusion" target="_blank" rel="noopener noreferrer">
            Contribute on GitHub ↗
          </a>
        </div>
      </section>
    </main>
  );
}
