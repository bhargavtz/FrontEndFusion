import type { Technology } from "./types";

export const tooling: Technology[] = [
  {
    slug: "git",
    name: "Git & GitHub",
    domain: "tooling",
    level: "Beginner",
    featured: true,
    summary: "Version control, branches, commits, pull requests, and collaborating on code.",
    what:
      "Git is a distributed version control system that records snapshots of your project. GitHub hosts Git repositories and adds pull requests, code review, issues, and CI.",
    why:
      "Every professional team uses version control. It lets you experiment safely on branches, review changes, and recover any previous state.",
    how:
      "A commit is a snapshot plus a pointer to its parent. Branches are movable pointers to commits. Merging and rebasing combine histories; remotes (origin) are other copies of the repository you push to and pull from.",
    concepts: ["Working tree, staging area, commits", "Branches, merge, and rebase", "Remotes: clone, fetch, pull, push", "Pull requests and code review", "Resolving conflicts", ".gitignore"],
    examples: [
      {
        title: "A feature-branch workflow",
        language: "bash",
        code: `git switch -c feature/navbar     # create and switch to a branch
git add src/components/navbar.tsx
git commit -m "Add responsive navbar"
git push -u origin feature/navbar   # publish the branch
# open a pull request on GitHub, get review, then merge
git switch main && git pull         # update local main`,
      },
    ],
    bestPractices: ["Small, focused commits with messages that explain why.", "Never commit secrets; use .env files listed in .gitignore.", "Pull or rebase before opening a pull request."],
    mistakes: ["Force-pushing to shared branches.", "Committing node_modules or build output."],
    interview: [{ q: "merge vs rebase?", a: "Merge records a merge commit and preserves history as it happened; rebase replays your commits on top of another branch for a linear history. Avoid rebasing commits others have pulled." }],
    docs: [
      { label: "Pro Git book", href: "https://git-scm.com/book/en/v2" },
      { label: "GitHub Docs", href: "https://docs.github.com/en/get-started" },
    ],
    related: ["package-managers", "code-editors"],
  },
  {
    slug: "code-editors",
    name: "VS Code & Cursor",
    domain: "tooling",
    level: "Beginner",
    summary: "Setting up an editor for frontend work: extensions, formatting on save, debugging, and AI features.",
    what:
      "VS Code is the most widely used code editor for web development. Cursor is a VS Code–based editor with AI chat and agent features built in.",
    why:
      "A well-configured editor gives instant type errors, lint feedback, formatting, and navigation — the fastest feedback loop you have.",
    concepts: ["Command palette and multi-cursor editing", "ESLint, Prettier, and Tailwind IntelliSense extensions", "Format on save", "Integrated terminal and debugger", "Workspace settings in .vscode/", "AI chat, inline edits, and agent mode"],
    bestPractices: ["Commit shared workspace settings and recommended extensions.", "Learn keyboard shortcuts for go-to-definition, rename symbol, and search."],
    docs: [
      { label: "VS Code docs", href: "https://code.visualstudio.com/docs" },
      { label: "Cursor docs", href: "https://cursor.com/docs" },
    ],
    related: ["ai-assisted-development", "linting-formatting"],
  },
  {
    slug: "package-managers",
    name: "npm, pnpm & Yarn",
    domain: "tooling",
    level: "Beginner",
    summary: "Installing dependencies, lockfiles, scripts, semantic versioning, and workspaces.",
    what:
      "Package managers install third-party code from the npm registry, record exact versions in a lockfile, and run project scripts defined in package.json.",
    why:
      "Reproducible installs mean every developer and CI machine runs the same code. Scripts give a project a standard interface (dev, build, test).",
    concepts: ["package.json: dependencies vs devDependencies", "Semantic versioning: ^ and ~", "Lockfiles", "npm scripts", "pnpm's content-addressable store", "Workspaces for monorepos", "npx / pnpm dlx"],
    bestPractices: ["Commit the lockfile.", "Use one package manager per repo.", "Audit and update dependencies regularly; remove unused ones."],
    mistakes: ["Deleting the lockfile to \"fix\" install errors.", "Installing build tools as production dependencies."],
    docs: [
      { label: "npm docs", href: "https://docs.npmjs.com/" },
      { label: "pnpm docs", href: "https://pnpm.io/motivation" },
      { label: "Yarn docs", href: "https://yarnpkg.com/getting-started" },
    ],
    related: ["build-tools"],
  },
  {
    slug: "build-tools",
    name: "Vite, Webpack & Turbopack",
    domain: "tooling",
    level: "Intermediate",
    summary: "Dev servers, bundling, hot module replacement, and code splitting.",
    what:
      "Build tools turn source files (TypeScript, JSX, CSS imports) into optimised assets browsers can load, and run a dev server with fast hot reloading.",
    why:
      "Browsers do not understand JSX or TypeScript, and shipping hundreds of unminified modules is slow. Bundlers transform, combine, minify, and split code.",
    how:
      "Vite serves native ES modules in development (transforming files on request) and bundles with Rollup-compatible tooling for production. Webpack builds a dependency graph from entry points through loaders and plugins. Turbopack is the incremental, Rust-based bundler built into Next.js.",
    concepts: ["Module graph and entry points", "Hot module replacement", "Tree shaking", "Code splitting with dynamic import()", "Environment variables", "Source maps"],
    examples: [
      {
        title: "Lazy-load a heavy module",
        language: "js",
        code: `const button = document.querySelector('#chart');
button.addEventListener('click', async () => {
  const { renderChart } = await import('./chart.js'); // split into its own chunk
  renderChart(document.querySelector('#out'));
});`,
      },
    ],
    docs: [
      { label: "Vite guide", href: "https://vite.dev/guide/" },
      { label: "webpack concepts", href: "https://webpack.js.org/concepts/" },
      { label: "Turbopack (Next.js)", href: "https://nextjs.org/docs/app/api-reference/turbopack" },
    ],
    related: ["package-managers", "web-performance"],
  },
  {
    slug: "linting-formatting",
    name: "ESLint & Prettier",
    domain: "tooling",
    level: "Beginner",
    summary: "Catching bugs with lint rules and ending style debates with automatic formatting.",
    what:
      "ESLint statically analyses JavaScript and TypeScript for likely bugs and rule violations. Prettier reformats code to a single consistent style.",
    why:
      "Linters catch mistakes such as missing hook dependencies or unused variables before review; formatters remove style discussion from code review entirely.",
    concepts: ["Flat config (eslint.config.js)", "Rule sets: recommended, react-hooks, jsx-a11y", "Auto-fix", "Prettier as formatter only", "Running both in CI and pre-commit hooks"],
    bestPractices: ["Let Prettier own formatting and ESLint own correctness.", "Enable eslint-plugin-react-hooks and jsx-a11y in React projects."],
    docs: [
      { label: "ESLint docs", href: "https://eslint.org/docs/latest/" },
      { label: "Prettier docs", href: "https://prettier.io/docs/" },
    ],
    related: ["code-editors", "testing"],
  },
  {
    slug: "browser-devtools",
    name: "Browser DevTools",
    domain: "tooling",
    level: "Beginner",
    featured: true,
    summary: "Inspecting elements, debugging JavaScript, profiling performance, and auditing accessibility.",
    what:
      "DevTools are the debugging tools built into Chrome, Edge, Firefox, and Safari: Elements, Console, Sources, Network, Performance, Application, and Lighthouse panels.",
    why:
      "Most frontend bugs are found by inspecting what the browser actually computed, received, and executed — not by reading source code.",
    concepts: ["Elements: computed styles, box model, layout overlays for flex and grid", "Console and breakpoints", "Network: waterfall, throttling, caching", "Performance: long tasks, layout, paint", "Application: storage and service workers", "Lighthouse and accessibility tree"],
    exercises: [
      "Set a conditional breakpoint inside a loop.",
      "Throttle to Slow 4G and find the largest resource on a page.",
      "Use the Grid overlay to debug a misaligned layout.",
    ],
    docs: [{ label: "Chrome DevTools", href: "https://developer.chrome.com/docs/devtools" }],
    related: ["web-performance", "accessibility"],
  },
  {
    slug: "testing",
    name: "Testing: Vitest, Jest, Testing Library & Playwright",
    domain: "tooling",
    level: "Intermediate",
    summary: "Unit, component, and end-to-end tests — and what each layer is good for.",
    what:
      "Vitest and Jest are test runners for unit and component tests. Testing Library renders components and queries them the way users do (by role and label). Playwright drives real browsers for end-to-end tests.",
    why:
      "Tests let you refactor without fear and document expected behaviour. Testing through the accessibility tree also verifies that your UI is usable.",
    concepts: ["Test pyramid / testing trophy", "Queries: getByRole, getByLabelText", "user-event for realistic interaction", "Mocking network with MSW", "E2E: locators, auto-waiting, traces", "Visual regression"],
    examples: [
      {
        title: "Component test with Testing Library",
        language: "tsx",
        code: `import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { Counter } from "./Counter";

test("increments when clicked", async () => {
  render(<Counter />);
  const button = screen.getByRole("button", { name: /count: 0/i });
  await userEvent.click(button);
  expect(screen.getByRole("button", { name: /count: 1/i })).toBeInTheDocument();
});`,
        explanation: ["Query by role and accessible name, as a user or screen reader would find it.", "userEvent simulates a full click, including focus and pointer events.", "Assert on what the user sees, not internal state."],
      },
    ],
    bestPractices: ["Test behaviour, not implementation details.", "Prefer getByRole queries.", "Keep a few critical E2E flows rather than hundreds."],
    mistakes: ["Snapshot tests of entire pages that everyone blindly updates.", "Tests that depend on CSS class names."],
    interview: [{ q: "Unit vs integration vs E2E?", a: "Unit tests check one function in isolation; integration tests check components working together; E2E tests drive the real app in a browser. Lower layers are faster, higher layers give more confidence." }],
    docs: [
      { label: "Vitest", href: "https://vitest.dev/guide/" },
      { label: "Testing Library", href: "https://testing-library.com/docs/" },
      { label: "Playwright", href: "https://playwright.dev/docs/intro" },
      { label: "Jest", href: "https://jestjs.io/docs/getting-started" },
    ],
    guides: ["js-unit-testing-javascript"],
    related: ["storybook", "accessibility"],
  },
  {
    slug: "storybook",
    name: "Storybook",
    domain: "tooling",
    level: "Intermediate",
    summary: "Developing, documenting, and testing components in isolation.",
    what:
      "Storybook is a workshop for UI components. Each story renders a component in a specific state; the docs, interaction tests, and visual tests build on those stories.",
    why:
      "Components are easier to build and review when you can see every state — loading, empty, error, long text — without clicking through the app.",
    concepts: ["Stories (CSF)", "Args and controls", "Docs pages", "Interaction tests", "Accessibility addon", "Visual regression with Chromatic"],
    docs: [{ label: "Storybook docs", href: "https://storybook.js.org/docs" }],
    related: ["design-systems", "testing"],
  },
];
