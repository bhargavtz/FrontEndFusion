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
      "A commit is a snapshot plus a pointer to its parent. Branches are movable pointers to commits. Merging and rebasing combine histories; remotes (origin) are other copies of the repository you push to and pull from. The index (staging area) is a third tree that sits between your working files and the next commit, which is why a change must be staged before it is recorded. Almost every Git command only moves pointers or copies objects, so history is additive: old commits stay reachable until garbage collection.",
    prerequisites: ["how-the-web-works"],
    roadmap: [
      "init, status, add, commit, log — the local loop",
      "Branches: switch, merge, and resolving your first conflict",
      "Remotes: clone, fetch, pull, push, and tracking branches",
      "Pull requests: review, amend, squash, and keep a branch current",
      "Undo tools: restore, revert, reset, and reflog",
      "Team habits: conventional commit messages, hooks, and protected branches",
    ],
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
      {
        title: "Recover work and find the commit that broke things",
        language: "bash",
        code: `git reflog                        # every position HEAD has pointed at
git switch -c rescue HEAD@{1}     # branch from the previous position

git log --oneline --graph --all   # read the shape of history

git bisect start
git bisect bad HEAD               # this commit is broken
git bisect good v1.4.0            # this tag was fine
# Git checks out a middle commit, you test it, then mark good or bad
git bisect reset                  # return to where you started`,
        explanation: [
          "reflog is a local log of pointer movements, so it can recover commits that no branch points to any more.",
          "A new branch created from a reflog entry makes that commit reachable again before garbage collection.",
          "--graph draws the parent relationships, which makes merge commits and stray branches obvious.",
          "bisect is a binary search over history: log2(n) tests find the first bad commit instead of reading every diff.",
        ],
      },
    ],
    bestPractices: [
      "Small, focused commits with messages that explain why, not just what.",
      "Never commit secrets; keep them in .env files listed in .gitignore and rotate any key that leaks.",
      "Pull or rebase onto main before opening a pull request so review sees only your change.",
      "Use a branch per change and delete it after merge; long-lived branches are where conflicts breed.",
      "Learn the undo command for each layer: restore for files, reset for staging, revert for published commits.",
    ],
    mistakes: [
      "Force-pushing to shared branches, which silently deletes commits teammates already pulled.",
      "Committing node_modules, build output, or large binaries; add them to .gitignore and rewrite before they reach the remote.",
      "Amending or rebasing commits that others have pulled, then wondering why history is duplicated.",
      "Committing everything with git add . and accidentally including editor files or debug logging.",
      "Resolving a conflict by keeping one side wholesale instead of reading both changes.",
    ],
    advanced: [
      "Interactive rebase (git rebase -i --autosquash) rewrites local history: squash, reword, reorder, or drop commits before review; fixup! commits automate the squash.",
      "git worktree add gives a second checkout of the same repository, so you can hotfix main without stashing or cloning.",
      "Partial and shallow clones (--filter=blob:none, --depth=1) plus sparse-checkout make huge monorepos workable by fetching paths and blobs on demand.",
      "git bisect run ./test.sh automates the binary search, and git cherry-pick -x replays a fix onto a release branch while recording its origin.",
      "Server-side and client-side hooks (pre-commit, commit-msg, pre-push) enforce formatting and commit conventions, but only if the team installs them consistently.",
    ],
    performance: [
      "Repository size is dominated by binary blobs in history; route images, fonts, and design exports to Git LFS or object storage instead of commits.",
      "Sparse-checkout and partial clone cut clone time and disk use dramatically in monorepos without changing the developer workflow.",
      "Large, frequently written working trees slow down status and diff; keep node_modules and build folders ignored rather than merely untracked.",
      "Shallow CI clones are faster, but jobs that need tags, blame, or a diff against a base branch must fetch the missing history explicitly.",
    ],
    useCases: [
      "Feature branches with pull-request review on a team project",
      "Rolling back a bad deploy with git revert while keeping the audit trail",
      "Experimenting on a spike branch that may be thrown away",
      "Release tags and hotfix branches for a versioned product",
    ],
    interview: [
      { q: "merge vs rebase?", a: "Merge records a merge commit and preserves history as it happened; rebase replays your commits on top of another branch for a linear history. Avoid rebasing commits others have pulled." },
      { q: "git reset, git revert, and git restore — what is the difference?", a: "reset moves the branch pointer and can unstage or discard changes (history rewrite); revert creates a new commit that undoes an earlier one (safe on shared branches); restore only replaces file contents in the working tree or index." },
      { q: "What is a detached HEAD and how do you get out of it?", a: "HEAD points directly at a commit instead of a branch, so new commits belong to no branch. Create a branch with git switch -c <name> to keep them, or switch back to a branch to leave the commits behind." },
      { q: "Why does Git sometimes fast-forward instead of creating a merge commit?", a: "When the target branch has no new commits since the feature branched, its pointer can simply move forward. --no-ff forces a merge commit to preserve the feature boundary." },
    ],
    exercises: [
      "Create a branch, make three commits, then squash them into one with an interactive rebase and verify the message.",
      "Deliberately delete a branch, recover its tip through the reflog, and confirm the files returned.",
      "Simulate a conflict between two branches and resolve it by hand, keeping changes from both sides.",
      "Use git bisect to locate a commit that introduced a failing test in a small repo.",
      "Write a .gitignore for a Next.js project and confirm git status shows no build output.",
    ],
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
      "A well-configured editor gives instant type errors, lint feedback, formatting, and navigation — the fastest feedback loop you have. Editors that speak the Language Server Protocol can offer the same intelligence for any language without shipping a compiler into the UI.",
    how:
      "The editor is a thin shell around an extension host: a separate Node.js process where extensions run, so a slow or crashing extension cannot freeze the window. Language intelligence comes from language servers that index your project and answer requests (completion, definition, diagnostics) over JSON-RPC; TypeScript, ESLint, and Tailwind each ship one. Cursor and Copilot add a model client on top: it reads open files and retrieved context, proposes diffs, and applies them through the same edit APIs a human would use.",
    prerequisites: ["how-the-web-works"],
    roadmap: [
      "Command palette, quick open, and multi-cursor editing",
      "Extensions for ESLint, Prettier, and Tailwind IntelliSense",
      "Format on save plus a shared .vscode/settings.json",
      "The integrated terminal, tasks, and the JavaScript debugger",
      "AI features: inline edit, chat with context, and reviewing agent diffs",
    ],
    concepts: ["Command palette and multi-cursor editing", "ESLint, Prettier, and Tailwind IntelliSense extensions", "Format on save", "Integrated terminal and debugger", "Workspace settings in .vscode/", "AI chat, inline edits, and agent mode"],
    examples: [
      {
        title: "Shared workspace settings",
        language: "json",
        code: `{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.preferences.importModuleSpecifier": "non-relative",
  "files.exclude": {
    "**/.next": true,
    "**/dist": true
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/pnpm-lock.yaml": true
  }
}`,
        explanation: [
          "Committed under .vscode/, these settings apply to everyone who opens the repo.",
          "editor.defaultFormatter pins Prettier so the choice does not depend on local install order.",
          "Using the workspace TypeScript version (typescript.tsdk) keeps editor errors identical to CI.",
          "non-relative import specifiers make refactors cheaper because moves do not rewrite paths.",
          "Excluding build output from search keeps results relevant and the file watcher quiet.",
        ],
      },
      {
        title: "Debug a dev server from launch.json",
        language: "json",
        code: `{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug client",
      "type": "pwa-chrome",
      "request": "launch",
      "url": "http://localhost:3000",
      "webRoot": "\${workspaceFolder}",
      "sourceMaps": true
    },
    {
      "name": "Node: current file",
      "type": "node",
      "request": "launch",
      "program": "\${file}",
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}`,
        explanation: [
          "Each configuration is a named way to start a debugger, selectable from the Run and Debug panel.",
          "The pwa-chrome type (the built-in JS debugger) attaches breakpoints to a running page and maps bundles back through source maps.",
          "webRoot tells the debugger where the project root is so relative paths resolve.",
          "skipFiles keeps the call stack focused on your code instead of Node internals.",
        ],
      },
    ],
    bestPractices: [
      "Commit shared workspace settings and recommended extensions so the whole team gets the same lint, format, and TypeScript behaviour.",
      "Learn keyboard shortcuts for go-to-definition, rename symbol, and search; the mouse is the slow path.",
      "Let the editor's TypeScript version come from the project, not the built-in one, to avoid version drift with CI.",
      "Turn on format on save and let the formatter own whitespace so diffs contain only real changes.",
      "Review AI-generated diffs hunk by hunk; apply the parts you understand and reject the rest.",
    ],
    mistakes: [
      "Installing dozens of overlapping extensions, several of which format on save and fight each other.",
      "Relying on editor-only settings without committing them, so a teammate's editor behaves differently.",
      "Debugging with console.log alone when breakpoints would show the actual call stack and variable state.",
      "Accepting a large AI edit without running the app, then bisecting a change that was never reviewed.",
    ],
    advanced: [
      "Language servers are separate processes with their own memory and CPU; a project-wide rename or a typed ESLint run can be the slowest thing in the editor.",
      "Multi-root workspaces (.code-workspace) let one window hold several packages, with per-folder settings and a shared search scope.",
      "Tasks and problem matchers turn an arbitrary CLI command into editor-integrated output with clickable file positions.",
      "Dev Containers and Remote-SSH run the extension host on another machine or container, which keeps local and CI toolchains identical.",
      "Conditional keybindings and snippets with variables (TM_FILENAME_BASE, TM_DIRECTORY) automate repetitive scaffolding without an extension.",
    ],
    performance: [
      "Extensions run in an extension-host process; one that scans the whole workspace on every save will slow every edit.",
      "Excluding node_modules, build output, and lockfiles from search and the file watcher keeps memory and CPU down as a repo grows.",
      "Very large single files disable some features because the tokenizer and language server stop at a size limit; split generated files instead of editing them in place.",
      "AI context requests cost latency and tokens; scope them to the open file and relevant symbols rather than the entire repository.",
    ],
    useCases: [
      "Onboarding a new developer to a repo with committed settings and recommended extensions",
      "Debugging a React render bug with breakpoints and the component call stack",
      "Standardising formatting across a team without review comments about whitespace",
      "Editing a remote server or container from a laptop through Remote-SSH",
    ],
    interview: [
      { q: "What problem does the Language Server Protocol solve?", a: "It decouples language intelligence from the editor: a language provider implements one server, and any LSP-capable editor gets completion, diagnostics, and navigation. Instead of every editor implementing every language, you need one client per editor and one server per language." },
      { q: "Why does an editor show a TypeScript error that the build does not?", a: "The editor may be using its bundled TypeScript version or a stale language-server state, while the build uses the project's compilerOptions. Pointing the editor at the workspace TypeScript version removes the mismatch." },
      { q: "What should you check before accepting an AI-generated edit?", a: "Whether it compiles and tests pass, whether it touched files outside the task, whether error and loading states are handled, and whether any new dependency or secret was introduced." },
    ],
    exercises: [
      "Create a .vscode/settings.json and extensions.json for a React repo and verify format on save works on a fresh clone.",
      "Set a conditional breakpoint inside a list render and inspect the props of the item that renders incorrectly.",
      "Write a launch.json that debugs a Node script with arguments and confirm the call stack stops on a throw.",
      "Configure a Tailwind class-order-on-save setup and confirm a messy className is reordered.",
      "Use an AI inline edit to refactor one function, then review the diff and reject one hunk on purpose.",
    ],
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
      "Reproducible installs mean every developer and CI machine runs the same code. Scripts give a project a standard interface (dev, build, test). Without a lockfile, two installs a week apart can resolve different transitive versions, and the bug only appears on one machine.",
    how:
      "The manager reads package.json, walks each dependency's own dependencies, and resolves a single version per package or nests duplicates when ranges conflict. The result is written to a lockfile and materialised into node_modules. npm and Yarn hoist most packages to the top level to keep the tree shallow; pnpm stores one copy of each version in a global content-addressable store and links it into a strict node_modules where packages only see their declared dependencies. Installing with a lockfile present is a replay, not a resolution, which is why it is deterministic.",
    prerequisites: ["javascript"],
    roadmap: [
      "package.json: dependencies, devDependencies, and scripts",
      "Semantic versioning ranges and what ^ and ~ actually allow",
      "Lockfiles and the difference between install and ci",
      "Workspaces for a multi-package repository",
      "Debugging the tree: why, list, dedupe, and overrides",
      "Supply-chain hygiene: audit, provenance, and install scripts",
    ],
    concepts: ["package.json: dependencies vs devDependencies", "Semantic versioning: ^ and ~", "Lockfiles", "npm scripts", "pnpm's content-addressable store", "Workspaces for monorepos", "npx / pnpm dlx"],
    examples: [
      {
        title: "Everyday install and script commands",
        language: "bash",
        code: `# Install exactly what the lockfile pins (what CI should run)
npm ci

# Add a runtime dependency and a dev-only tool
npm install zod
npm install -D vitest

# Run project scripts
npm run dev
npm run build -- --mode production   # extra args after --

# Inspect before changing anything
npm ls react                 # which version is actually installed
npm outdated                 # newer versions that satisfy or exceed ranges
npm audit --omit=dev         # vulnerabilities in shipped code only`,
        explanation: [
          "ci deletes node_modules and installs strictly from the lockfile, failing if package.json and the lockfile disagree.",
          "-D records the package in devDependencies so it is skipped in production installs.",
          "Arguments after -- are forwarded to the underlying script, not eaten by the package manager.",
          "ls and outdated answer questions about the resolved tree rather than the ranges you wrote.",
        ],
      },
      {
        title: "A package.json with scripts, engines, and an override",
        language: "json",
        code: `{
  "name": "acme-web",
  "private": true,
  "packageManager": "pnpm@9.12.0",
  "engines": { "node": ">=20.11" },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "lint": "eslint . --max-warnings=0",
    "test": "vitest run",
    "prepare": "husky"
  },
  "dependencies": {
    "next": "^15.1.0",
    "react": "^19.0.0"
  },
  "devDependencies": {
    "typescript": "~5.7.2"
  },
  "pnpm": {
    "overrides": { "cookie": "^0.7.0" }
  }
}`,
        explanation: [
          "packageManager pins the tool itself, so Corepack installs the same version everywhere.",
          "engines documents the Node version the project supports; CI can enforce it with engine-strict.",
          "A caret allows minor and patch updates, a tilde only patches — choose deliberately per package.",
          "overrides forces a transitive dependency to a safe version when a direct upgrade is not available.",
        ],
      },
    ],
    bestPractices: [
      "Commit the lockfile and install with the frozen/ci command in automation.",
      "Use one package manager per repo and pin it with a packageManager field or Corepack.",
      "Audit and update dependencies regularly; remove unused ones instead of leaving them for the bundler to ignore.",
      "Keep build, lint, and test tooling in devDependencies so production images stay small.",
      "Read release notes for major versions and upgrade one dependency family at a time.",
    ],
    mistakes: ["Deleting the lockfile to \"fix\" install errors — it hides the real conflict and changes every version at once.", "Installing build tools as production dependencies.", "Mixing package managers so two lockfiles and two node_modules layouts disagree.", "Committing a lockfile generated by a different registry or a different major version of the manager.", "Ignoring peer dependency warnings until a runtime error appears in a library you did not write."],
    advanced: [
      "pnpm's strict node_modules prevents phantom dependencies: a package can only import what it declares, which surfaces missing dependencies locally instead of in production.",
      "peerDependencies express compatibility with the host app (React, a bundler) and are not installed by the consumer; getting them wrong is the usual cause of duplicate React copies.",
      "Overrides and resolutions repair a vulnerable or broken transitive package when the parent has not shipped a fix, at the cost of a divergence from the upstream graph.",
      "Workspace protocols (workspace:*) link local packages during development but are rewritten to real versions when publishing.",
      "Registry features such as npm provenance, trusted publishing, and ignore-scripts reduce supply-chain risk; .npmrc configures scoped registries and auth tokens per scope.",
    ],
    performance: [
      "Install time is dominated by network round-trips and postinstall scripts; a warm CI cache keyed on the lockfile turns a minute into seconds.",
      "pnpm's content-addressable store hard-links packages across projects, so a second checkout of the same dependencies costs almost no disk.",
      "Duplicate versions of a large library (two Reacts, two date libraries) both ship to the browser; dedupe them rather than accepting the tree.",
      "The dependency count itself is a bundle cost: every added package brings its own transitive graph and maintenance surface.",
    ],
    useCases: [
      "Reproducible CI installs for a production web app",
      "A monorepo where an app and a shared UI package are developed together",
      "Patching a transitive vulnerability without waiting for the parent package",
      "Trying a CLI tool once with npx without adding it to the project",
    ],
    interview: [
      { q: "What is the difference between package.json and the lockfile?", a: "package.json declares ranges and intent; the lockfile records the exact resolved version, integrity hash, and tree that satisfied those ranges. The lockfile is what makes installs deterministic." },
      { q: "What do ^1.2.3 and ~1.2.3 allow?", a: "^ allows any 1.x.x at or above 1.2.3 (not 2.0.0); ~ allows 1.2.x (patch updates only). Exact pins allow nothing." },
      { q: "dependencies vs devDependencies vs peerDependencies?", a: "dependencies ship with the app at runtime; devDependencies are needed only to build, test, or lint; peerDependencies declare a host requirement the consumer must provide, common for plugins and UI libraries." },
      { q: "Why is pnpm install often faster and smaller?", a: "It writes each package version once to a global content-addressable store and hard-links files into node_modules, and its strict layout avoids hoisting the whole tree into every project." },
    ],
    exercises: [
      "Add a script that runs lint and tests together, then call it from CI with a single command.",
      "Break a lockfile on purpose and observe the difference between npm install and npm ci.",
      "Run npm ls on a project and find a duplicated transitive dependency, then dedupe or override it.",
      "Convert a two-package repo to workspaces and link the shared package with workspace:*.",
      "Use npx to run a formatter once without adding it to package.json, then explain when that is a bad idea.",
    ],
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
      "Vite serves native ES modules in development (transforming files on request) and bundles with Rollup-compatible tooling for production. Webpack builds a dependency graph from entry points through loaders and plugins. Turbopack is the incremental, Rust-based bundler built into Next.js. In all three the same three phases apply: resolve imports into a graph, transform each module through the appropriate loader or plugin, then emit chunks with content hashes and a manifest the server or HTML can reference.",
    prerequisites: ["js-modules", "package-managers"],
    roadmap: [
      "Why bundling exists: modules, transforms, and the network",
      "Dev server and hot module replacement",
      "Production builds: minification, hashing, and source maps",
      "Code splitting with dynamic import and manual chunks",
      "Environment variables, asset handling, and public paths",
      "Reading a bundle analysis and acting on it",
    ],
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
      {
        title: "Split vendor code into stable chunks (Vite config)",
        language: "ts",
        code: `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2020",
    sourcemap: "hidden",
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          charts: ["recharts"],
        },
      },
    },
  },
});`,
        explanation: [
          "target tells the minifier which syntax it may keep, so no legacy polyfills are added.",
          "sourcemap: \"hidden\" emits maps for error tracking without advertising them to browsers.",
          "manualChunks moves rarely changing libraries into their own files so app changes do not bust their cache.",
          "Chunk names should follow deploy cadence: libraries change monthly, app code changes hourly.",
        ],
      },
    ],
    advanced: [
      "Hot module replacement works through an accept boundary: a module that calls import.meta.hot.accept re-runs without a reload, and if nobody accepts, the update bubbles up to a full reload.",
      "Tree shaking depends on static ESM analysis plus side-effect metadata; a package with sideEffects unset or CommonJS output cannot be pruned safely.",
      "Content hashing plus a manifest is what makes long-lived caching safe: the HTML points at hashed filenames, so a deploy invalidates exactly the changed chunks.",
      "Persistent caching and incremental graphs (Turbopack, Vite's dependency pre-bundling, webpack filesystem cache) trade disk for startup time and must be invalidated when config changes.",
      "SSR builds externalise dependencies so server code is not bundled; getting the external list wrong produces duplicate copies of React or a package that only works in Node.",
    ],
    bestPractices: [
      "Commit the lockfile and pin build-tool major versions; bundler upgrades change output shape and are worth a dedicated PR.",
      "Inspect the bundle on every meaningful feature, not only when performance is already bad.",
      "Keep the build deterministic: no timestamps or random ids in output, so caches and diffs behave.",
      "Fail the build on type errors and lint errors rather than shipping them and fixing later.",
      "Define environment variables explicitly with a prefix rule so secrets cannot leak into client bundles.",
    ],
    mistakes: [
      "Importing a whole library for one function, then wondering why the bundle grew by 200 kB.",
      "Putting secrets in variables the bundler inlines into client code.",
      "Disabling minification or source maps in production to \"improve performance\" and losing debuggability.",
      "Using a barrel file (index.ts re-exporting everything) that defeats tree shaking across a package.",
      "Assuming the dev server's behaviour equals the production build; dev is unbundled and unminified by design.",
    ],
    performance: [
      "Split by route and by deploy cadence: initial JS should cover the current screen, not the whole app.",
      "Pre-bundling dependencies in dev (esbuild in Vite) turns hundreds of module requests into a few, which is why first start is slower than later ones.",
      "Modern targets remove transpilation and polyfill weight; supporting very old browsers is a deliberate cost, not a default.",
      "A bundle analyzer is the only reliable way to find weight: guesses about which import is large are usually wrong.",
    ],
    useCases: [
      "A marketing site that ships almost no JavaScript and hydrates only interactive islands",
      "A dashboard that lazy-loads each route and a charting library",
      "A component library built to ESM and CJS with preserved type declarations",
      "A monorepo where apps share source packages and a single build graph",
    ],
    interview: [
      { q: "Why is Vite's dev server fast on a cold start?", a: "It does not bundle the app. It serves source files as native ES modules and transforms them on demand, pre-bundling only dependencies with esbuild, so startup cost scales with what the browser requests rather than the repo size." },
      { q: "What does tree shaking require to work?", a: "Static ES module syntax, no side effects in unused modules (or accurate sideEffects metadata), and a bundler in production mode that can analyse the graph. CommonJS require defeats it." },
      { q: "What is the difference between a source map and a hidden source map?", a: "Both map minified output back to source; hidden maps are emitted without a sourceMappingURL comment, so browsers do not fetch them but error-reporting tools can upload them privately." },
      { q: "How does HMR avoid a full page reload?", a: "The dev server sends an update for the changed module; if an ancestor module registered import.meta.hot.accept, the runtime re-executes just that boundary. Otherwise the update propagates to the entry and the page reloads." },
    ],
    exercises: [
      "Add a dynamic import for a modal or chart and confirm in the Network panel that it loads only when opened.",
      "Run a bundle analysis and reduce the largest chunk without changing features.",
      "Configure manualChunks so vendor code keeps its hash across an app-only change.",
      "Break tree shaking with a barrel file, measure the difference, then fix it.",
      "Ship a production build with hidden source maps and verify the map is not fetched by the browser.",
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
      "Linters catch mistakes such as missing hook dependencies or unused variables before review; formatters remove style discussion from code review entirely. Both matter most as a shared, automated gate: a rule enforced by tooling is a rule nobody has to argue about in a pull request.",
    how:
      "ESLint parses each file into an AST and walks it, invoking rule visitors for nodes they care about; a rule reports a problem at a node location and may offer a fix that rewrites that range. Flat config composes arrays of config objects, later entries overriding earlier ones for matching globs. Fixes are applied in up to ten passes because one fix can create or remove another problem. Prettier never sees a style preference: it parses the file, discards the original whitespace, and prints the AST back according to its options, so it cannot change behaviour while guaranteeing a stable result.",
    prerequisites: ["javascript", "code-editors"],
    roadmap: [
      "Why linting and formatting are separate concerns",
      "ESLint flat config: files, ignores, rules, and extends",
      "Prettier options and .prettierignore",
      "Turning off stylistic ESLint rules in favour of the formatter",
      "Editor integration, pre-commit hooks, and CI enforcement",
      "Typed lint rules and gradual adoption in a legacy codebase",
    ],
    concepts: ["Flat config (eslint.config.js)", "Rule sets: recommended, react-hooks, jsx-a11y", "Auto-fix", "Prettier as formatter only", "Running both in CI and pre-commit hooks"],
    examples: [
      {
        title: "Flat ESLint config for a React + TypeScript app",
        language: "ts",
        code: `// eslint.config.mjs
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-config-prettier";

export default [
  { ignores: ["dist/**", ".next/**", "coverage/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    plugins: { "react-hooks": reactHooks, "jsx-a11y": jsxA11y },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.flatConfigs.recommended.rules,
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
  prettier, // must be last: disables stylistic rules Prettier owns
];`,
        explanation: [
          "Flat config is a plain array, so ordering is the precedence: later entries win for matching files.",
          "ignores at the top keeps generated output and build folders out of every rule.",
          "recommendedTypeChecked enables rules that need type information and therefore a parser project.",
          "projectService resolves the right tsconfig per file, which is faster than a single giant project.",
          "eslint-config-prettier must come last so no stylistic rule fights the formatter.",
        ],
      },
      {
        title: "Prettier options plus the commands that enforce them",
        language: "json",
        code: `{
  "semi": true,
  "singleQuote": false,
  "printWidth": 90,
  "tabWidth": 2,
  "trailingComma": "all",
  "arrowParens": "always",
  "plugins": ["prettier-plugin-tailwindcss"]
}`,
        explanation: [
          "These options are the whole style contract; anything not listed uses Prettier's default.",
          "trailingComma: all makes diffs smaller because adding a final item only adds a line.",
          "The Tailwind plugin sorts class names, which removes a common review argument.",
          "Enforce with prettier --check . in CI and prettier --write . locally; add a .prettierignore for build output.",
        ],
      },
    ],
    bestPractices: [
      "Let Prettier own formatting and ESLint own correctness; run eslint-config-prettier last to disable conflicts.",
      "Enable eslint-plugin-react-hooks and jsx-a11y in React projects — they catch real bugs and accessibility failures.",
      "Run lint and format checks in CI with --max-warnings=0 so warnings cannot accumulate into noise.",
      "Fix a rule violation properly rather than disabling it; when a disable is justified, add the reason in the same line.",
      "Adopt new rules incrementally: turn them on as warnings, fix the backlog, then promote to errors.",
    ],
    mistakes: [
      "Running Prettier through ESLint, which doubles the work and produces confusing conflict errors.",
      "Turning on every recommended rule at once in a legacy repo and burying the team in thousands of warnings.",
      "Using eslint-disable-next-line without a comment, so nobody knows whether it is still needed.",
      "Formatting generated or vendored files because they were not added to the ignore files.",
      "Treating a green lint run as proof of correctness; lint rules check patterns, not behaviour.",
    ],
    advanced: [
      "Type-aware rules (no-floating-promises, no-misused-promises) require a parser project and are among the highest-value checks in a TypeScript codebase, at a real CPU cost.",
      "Custom rules are small AST visitors with a fixer function; writing one is often cheaper than reviewing the same mistake repeatedly.",
      "eslint-plugin-boundaries and import/no-restricted-paths encode architectural layering as machine-checked rules instead of documentation.",
      "Prettier's stability comes from printing the AST, so it may reformat code that is semantically identical; this is why --check in CI must match the exact plugin and option set used locally.",
      "Alternatives such as Biome and oxlint reimplement the same rule sets in Rust for much faster runs; the trade-off is plugin ecosystem coverage, especially for framework-specific rules.",
    ],
    performance: [
      "Type-aware linting can be several times slower than syntax-only linting; scope it to changed files locally and run the full pass in CI.",
      "Lint only what changed with lint-staged or a monorepo task runner, so a one-line edit does not re-lint the repository.",
      "Prettier reformats whole files and is I/O bound; ignoring build output and generated code is the biggest single win.",
      "Running formatter and linter as separate parallel steps in CI is faster than chaining them in one job.",
    ],
    useCases: [
      "A team standardising style so code review discusses logic only",
      "Catching missing useEffect dependencies before they become stale-state bugs",
      "Enforcing accessible labels and alt text with jsx-a11y",
      "Blocking a merge when a pull request adds lint warnings",
    ],
    interview: [
      { q: "ESLint vs Prettier — why use both?", a: "ESLint understands code structure and can flag likely bugs and enforce semantic conventions; Prettier only reformats. Formatting rules inside ESLint are slower and conflict with Prettier, so the common setup is ESLint for correctness and Prettier for style." },
      { q: "What changed with flat config?", a: "eslint.config.js replaced .eslintrc with a plain array of config objects, explicit plugins, and glob-based files/ignores. Precedence is array order rather than the old cascade of extends and overrides." },
      { q: "How does ESLint autofix work, and why can one pass be insufficient?", a: "A rule reports a fix as a text range replacement; ESLint applies fixes and re-lints, up to ten passes, because a fix can expose or resolve other problems. Fixes that would overlap are deferred to the next pass." },
      { q: "When is a disable comment acceptable?", a: "When the rule is wrong for a specific, explained case — for example a third-party API that requires a non-null assertion. Add the reason and the rule name so the exception can be reviewed later." },
    ],
    exercises: [
      "Set up a flat ESLint config for a React + TypeScript project with react-hooks and jsx-a11y, then break a hook rule and fix it.",
      "Add Prettier with a .prettierignore covering build output and confirm --check passes in CI.",
      "Configure format on save plus fix-on-save and resolve a conflict where two tools fight over the same file.",
      "Turn one rule into a warning, fix the existing violations, then promote it to an error.",
      "Write a one-line disable comment with a justification and explain in a note why a code change was not better.",
    ],
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
      "Most frontend bugs are found by inspecting what the browser actually computed, received, and executed — not by reading source code. The DevTools panels expose the same data the rendering engine uses, so they answer questions that no amount of logging can.",
    how:
      "DevTools is a client of the Chrome DevTools Protocol: panels open protocol domains (DOM, CSS, Network, Debugger, Profiler) and receive events and snapshots from the renderer process. The Elements panel is a live view of the DOM tree with styles resolved from the CSSOM, so edits are applied to the running page, not to disk. Sources maps minified bundles back to original files through source maps, which is how breakpoints land in your TypeScript. The Performance panel records a sampling profile plus trace events (tasks, layout, paint, GC) on a shared timeline, which is what makes a long task or a forced reflow visible as a discrete block.",
    prerequisites: ["html", "css"],
    roadmap: [
      "Elements and Styles: computed values, box model, layout overlays",
      "Console: log levels, tables, groups, and live expressions",
      "Sources: breakpoints, conditional breakpoints, and step debugging",
      "Network: waterfall, throttling, caching, and request blocking",
      "Performance: recording a trace and reading long tasks",
      "Application and Lighthouse: storage, service workers, audits",
    ],
    concepts: ["Elements: computed styles, box model, layout overlays for flex and grid", "Console and breakpoints", "Network: waterfall, throttling, caching", "Performance: long tasks, layout, paint", "Application: storage and service workers", "Lighthouse and accessibility tree"],
    examples: [
      {
        title: "Use the console as a structured debugging tool",
        language: "html",
        code: `<button id="load">Load rows</button>
<pre id="out"></pre>
<script>
  const rows = [
    { id: 1, name: "Ada", role: "admin" },
    { id: 2, name: "Linus", role: "editor" },
  ];

  document.querySelector("#load").addEventListener("click", () => {
    console.group("load rows");
    console.table(rows);                 // sortable, inspectable table
    console.time("render");
    document.querySelector("#out").textContent = rows
      .map((r) => r.id + " " + r.name)
      .join("\\n");
    console.timeEnd("render");           // prints elapsed ms

    performance.mark("rows-rendered");
    console.groupEnd();
  });
</script>`,
        explanation: [
          "console.group collapses related output so a noisy handler stays readable.",
          "console.table renders arrays of objects with sortable columns, which beats looping console.log.",
          "console.time and timeEnd measure a span without changing the code you ship.",
          "performance.mark adds a custom timestamp you can find in a Performance trace.",
          "Everything here is inspectable in the Console panel; try it with the panel open.",
        ],
      },
      {
        title: "Detect long tasks in the field",
        language: "js",
        code: `const log = [];

if ("PerformanceObserver" in window) {
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        log.push({ name: entry.name, ms: Math.round(entry.duration) });
      }
      console.table(log);
    });
    observer.observe({ type: "longtask", buffered: true });
  } catch (error) {
    console.warn("longtask entries are not supported here", error);
  }
}

// Block the main thread for ~120 ms so the observer has something to report.
const end = performance.now() + 120;
while (performance.now() < end) {}

document.body.textContent = "Long tasks captured: " + log.length;`,
        explanation: [
          "A long task is any main-thread block over 50 ms, the threshold where input starts to feel delayed.",
          "buffered: true replays tasks that happened before the observer was created.",
          "The busy loop is deliberately bad code: it shows what a heavy synchronous handler looks like to the browser.",
          "In production you would send this data to analytics instead of logging it, ideally sampled.",
        ],
      },
    ],
    bestPractices: [
      "Keep the console clean in development; a wall of leftover logs hides the one message that matters.",
      "Disable cache and use throttling when testing network behaviour, or you will measure your laptop instead of your users.",
      "Use local overrides to experiment with CSS and responses without editing source files.",
      "Record a Performance trace before optimising, and compare traces rather than guessing.",
      "Check the accessibility tree and keyboard navigation alongside the visual result.",
    ],
    mistakes: [
      "Leaving console.log statements in production code instead of removing them or routing through a logger.",
      "Debugging layout with the Styles pane only, ignoring the computed values and the layout overlay.",
      "Measuring performance with the cache enabled and a fast connection, then concluding the app is fine.",
      "Testing a fix with a hard reload while a service worker keeps serving the old bundle from cache.",
      "Editing the DOM in DevTools and assuming the change persisted; panel edits are runtime only.",
    ],
    advanced: [
      "The Protocol Monitor and CDP endpoints let you script DevTools: a Node client can capture traces, emulate devices, or block requests in CI without a human at the panel.",
      "Event Listener Breakpoints pause execution when a specific event fires on any element, which finds the handler responsible when you cannot locate the source by searching.",
      "The Coverage panel reports unused bytes per file; combined with a Performance trace it separates download cost from parse and execute cost.",
      "Heap snapshots and the allocation timeline reveal detached DOM nodes kept alive by a closure or a listener, a leak that no profiler summary shows directly.",
      "Request blocking and response overrides simulate slow or failing APIs, letting you exercise error and loading states without touching the backend.",
    ],
    performance: [
      "CPU throttling (4x or 6x) approximates a mid-range phone; untrottled local profiles hide most main-thread problems.",
      "The Performance panel's bottom-up view attributes time to the functions that actually ran, which is more reliable than reading a flame chart top-down.",
      "Network waterfall gaps often mean request chains or blocking scripts, not slow servers; fix the ordering before adding bandwidth.",
      "Lighthouse gives a lab score, but field data (CrUX or your own RUM) is what reflects real users and real devices.",
    ],
    useCases: [
      "Diagnosing a layout shift caused by an image without intrinsic dimensions",
      "Finding the handler that fires on every keystroke and blocks typing",
      "Verifying that a cache header actually produced a memory-cache hit",
      "Auditing a page for missing labels and poor colour contrast",
    ],
    interview: [
      { q: "What is the Chrome DevTools Protocol?", a: "A JSON-based protocol that exposes browser internals — DOM, CSS, network, debugging, profiling — to clients. DevTools is one client; Puppeteer, Playwright, and Lighthouse are others, which is why they can do much of what the panels do." },
      { q: "How do you tell whether a page has a layout thrashing problem?", a: "In a Performance trace, look for repeating forced reflow markers interleaved with style writes: code that reads layout (offsetHeight, getBoundingClientRect) right after mutating styles forces synchronous layout on each iteration." },
      { q: "When would you reach for the Performance panel instead of Lighthouse?", a: "Lighthouse scores a single load against fixed conditions. The Performance panel records a specific interaction or timeline, so it is the tool for understanding why a scroll, click, or animation drops frames." },
      { q: "Why might a breakpoint in a TypeScript file not hit?", a: "Source maps are missing or stale, the served bundle does not match the local build, or the breakpoint sits in code the bundler tree-shook away. Confirm the mapped source in Sources and that the dev server is serving the current build." },
    ],
    exercises: [
      "Set a conditional breakpoint inside a loop.",
      "Throttle to Slow 4G and find the largest resource on a page.",
      "Use the Grid overlay to debug a misaligned layout.",
      "Record a Performance trace of a button click and identify the longest task by name.",
      "Block a network request with DevTools and make the UI show a real error state.",
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
      "Tests let you refactor without fear and document expected behaviour. Testing through the accessibility tree also verifies that your UI is usable: a component whose button has no accessible name is both harder to test and harder to operate with a screen reader.",
    how:
      "A runner (Vitest or Jest) discovers test files, then executes each file in an isolated environment: Vitest reuses Vite's transform pipeline, so TypeScript and JSX work without a separate build, and a DOM implementation such as jsdom or happy-dom supplies document and window. Testing Library renders a component into a detached container and resolves queries against that DOM using the same role and name computations a browser exposes, which is why getByRole matches what assistive tech announces. Playwright instead launches a real browser, talks to it over the DevTools protocol, and auto-waits for locators to become actionable; assertions retry until they pass or time out, which removes most manual sleeps.",
    prerequisites: ["javascript", "typescript-react"],
    roadmap: [
      "Structure: describe/it or test, arrange-act-assert",
      "Queries and user-event: test what a user sees and does",
      "Mocking: functions, modules, timers, and network with MSW",
      "Component integration tests with providers and router",
      "E2E with Playwright: locators, auto-waiting, fixtures, traces",
      "What to test where: the testing trophy and risk-based coverage",
    ],
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
      {
        title: "An end-to-end flow with Playwright",
        language: "ts",
        code: `import { expect, test } from "@playwright/test";

test("a signed-in user can create an item", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill("ada@example.com");
  await page.getByLabel("Password").fill("correct-horse");
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();

  await page.getByRole("button", { name: "New item" }).click();
  await page.getByLabel("Title").fill("First item");
  await page.getByRole("button", { name: "Save" }).click();

  await expect(page.getByRole("listitem")).toContainText("First item");
});`,
        explanation: [
          "Locators are lazy and re-resolve on every action, so a re-render between steps does not stale them.",
          "getByLabel and getByRole double as an accessibility check: if the locator cannot find it, a screen reader likely cannot either.",
          "expect(...).toBeVisible() retries until the assertion passes, so no arbitrary waits are needed.",
          "Reuse authenticated state with a storageState fixture instead of logging in for every test.",
        ],
      },
    ],
    bestPractices: ["Test behaviour, not implementation details.", "Prefer getByRole queries.", "Keep a few critical E2E flows rather than hundreds."],
    mistakes: ["Snapshot tests of entire pages that everyone blindly updates.", "Tests that depend on CSS class names.", "Sleeping or waiting for a fixed timeout in E2E tests instead of asserting on a condition that retries.", "Mocking the module under test, so the test passes while the real integration is broken."],
    interview: [{ q: "Unit vs integration vs E2E?", a: "Unit tests check one function in isolation; integration tests check components working together; E2E tests drive the real app in a browser. Lower layers are faster, higher layers give more confidence." }],
    advanced: [
      "Share MSW request handlers between tests and the dev server, so mocked responses stay identical to the states you develop against.",
      "user-event with fake timers requires advancing timers explicitly (advanceTimers by the debounce delay) or interactions hang; this is the usual cause of flaky debounced-input tests.",
      "Playwright fixtures and storageState authenticate once per worker instead of per test, cutting suite time dramatically while keeping tests isolated.",
      "The trace viewer records DOM snapshots, network, and console per step, which turns a CI-only failure into a replayable timeline.",
      "Contract tests or generated types from an OpenAPI schema catch backend drift that mocks happily hide; mutation testing then measures whether the assertions actually detect faults.",
    ],
    performance: [
      "Prefer happy-dom for large suites when you do not need layout, and jsdom only for tests that depend on real geometry.",
      "Keep the default isolated environment per file; disabling isolation trades correctness for speed and should be a measured exception.",
      "In monorepos, run only affected tests locally (changed files plus dependents) and the full suite in CI.",
      "Playwright scales with workers and shards; parallelise in CI rather than making individual tests longer, and reuse auth state to avoid repeated logins.",
    ],
    useCases: [
      "A checkout flow where a regression costs real revenue",
      "A design-system package whose component APIs must stay stable",
      "A form with conditional validation that is tedious to verify by hand",
      "A bug fix that gets a regression test before the fix lands",
    ],
    exercises: [
      "Write a component test that queries only by role and label, then rename a CSS class and confirm it still passes.",
      "Add a test for the error state by rejecting the mocked request, and assert the retry button works.",
      "Test a debounced search input using fake timers and user-event without any real waiting.",
      "Write one Playwright test for a critical path and run it with a trace on failure.",
      "Introduce a deliberate bug and confirm at least one test fails; if none does, strengthen the assertions.",
    ],
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
    summary: "A workshop for building, documenting, and testing UI components in isolation, one state at a time.",
    what:
      "Storybook is a workshop for UI components. Each story renders a component in a specific state; the docs, interaction tests, and visual tests build on those stories.",
    why:
      "Components are easier to build and review when you can see every state — loading, empty, error, long text — without clicking through the app. Stories also give designers and reviewers a shared reference, and because they run outside the app, they cannot rely on incidental global state.",
    how:
      "Storybook builds and serves a separate app: a manager UI plus your components rendered in an isolated iframe preview. Each story is a Component Story Format object exporting args and a render function; the preview renders that story on its own, so only the decorators you add supply providers or global CSS. Addons communicate with the preview over a channel (postMessage/WebSocket), which is how controls change args live and how play functions report test results. The test runner loads the same preview in a real browser and executes each story's play function and accessibility checks.",
    prerequisites: ["react", "typescript-react", "testing"],
    roadmap: [
      "First story for an existing component",
      "Args, argTypes, and controls for every meaningful state",
      "Decorators for providers, themes, and layout",
      "Autodocs and documentation pages",
      "Play functions and the a11y addon as tests",
      "Visual regression and CI publishing",
    ],
    concepts: ["Stories (CSF)", "Args and controls", "Docs pages", "Interaction tests", "Accessibility addon", "Visual regression with Chromatic"],
    examples: [
      {
        title: "A typed story covering three states",
        language: "tsx",
        code: `import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta = {
  title: "UI/Button",
  component: Button,
  args: { children: "Save", variant: "primary", onClick: () => {} },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "ghost"] },
  },
  parameters: { layout: "centered" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Ghost: Story = { args: { variant: "ghost" } };

export const Loading: Story = {
  args: { loading: true, children: "Saving" },
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector("button");
    if (!button || button.getAttribute("aria-busy") !== "true") {
      throw new Error("loading state must expose aria-busy");
    }
  },
};`,
        explanation: [
          "satisfies Meta<typeof Button> type-checks the story config and still preserves literal types.",
          "meta.args are the defaults every story inherits; a story only overrides what changes.",
          "argTypes drive the Controls panel, so reviewers can explore variants without code.",
          "The Loading story asserts an accessibility contract in a play function, which runs in the browser.",
          "Name stories by state (Loading, Empty, Error) rather than by prop value.",
        ],
      },
    ],
    bestPractices: [
      "Write one story per meaningful state, including empty, error, loading, and long-content cases.",
      "Use args as the single source of truth; add a story when a state would need a code change, not when it needs a control.",
      "Keep decorators minimal and identical to the real app's providers so previews do not drift from production.",
      "Run play functions and the a11y addon in CI so stories act as tests, not just documentation.",
      "Colocate stories next to components and exclude them from the production bundle.",
    ],
    mistakes: [
      "Hardcoding props inside a story's render function, which makes the controls panel useless.",
      "Rebuilding the whole app shell in decorators until the preview no longer resembles production.",
      "Treating Storybook as a second design system with styles that never ship.",
      "Leaving stories broken for months; a failing story is worse than no story because it trains people to ignore the tool.",
      "Publishing internal or experimental stories to everyone without a naming or tag convention.",
    ],
    advanced: [
      "Portable stories (composeStories) let Vitest render the exact story configuration, so a story is the test fixture instead of a duplicate setup.",
      "The play function uses @storybook/test (Testing Library plus Vitest spies) and step() to group interactions, which produces readable output in the interactions panel and in CI.",
      "Chromatic or another visual service snapshots every story; turbo-snap compares against the baseline of the last accepted commit to keep the diff small.",
      "Global types and the toolbar let you switch theme, locale, or viewport once and have every story follow, which catches layout differences that per-story props miss.",
      "The MSW addon and loader-level mocking let you drive loading, error, and pagination states deterministically without a backend.",
    ],
    performance: [
      "Each addon adds manager and preview code; the a11y, docs, and controls trio is usually enough, and extras should earn their startup cost.",
      "Storybook build time scales with the number of stories and the size of the imported graph; keep heavy fixtures inside story-level loaders rather than module scope.",
      "A large single Storybook can be split by package in a monorepo so a change only rebuilds the affected workshop.",
      "Visual tests should target changed stories (affected-story detection) instead of re-snapshotting everything on every commit.",
    ],
    useCases: [
      "A design system where every component state needs documentation for consumers",
      "Reviewing visual changes from a pull request before merging",
      "Building a component before the page or API that will use it exists",
      "Catching accessibility regressions on states nobody clicks through manually",
    ],
    interview: [
      { q: "What is a story, and what is CSF?", a: "A story is one rendered state of a component. Component Story Format is the ES module convention for declaring stories: a default export holds metadata (title, component, args, decorators) and named exports are the individual stories." },
      { q: "How do interaction tests in Storybook actually run?", a: "A play function receives the canvas and Testing Library helpers and runs after render. It executes in a real browser when the test runner or a CI job loads the story, so it can assert on focus, events, and async UI." },
      { q: "Storybook vs writing the same component test in Vitest?", a: "They overlap. Storybook is optimised for browsing and documenting states and for visual review; portable stories let the same story double as a test fixture so the setup is not duplicated." },
      { q: "Why does a component look different inside Storybook than in the app?", a: "Missing global CSS, a different provider tree, or decorator-level layout. Forgetting to import the app's stylesheet or theme provider is the most common cause." },
    ],
    exercises: [
      "Add stories for a Button covering default, disabled, loading, and long-label states.",
      "Replace a hardcoded render function with args and add a control for the variant prop.",
      "Write a play function that opens a dropdown and asserts the option list is visible.",
      "Run the a11y addon on every story and fix one violation it reports.",
      "Set up a Chromatic or equivalent visual check and approve a deliberate style change.",
    ],
    docs: [{ label: "Storybook docs", href: "https://storybook.js.org/docs" }],
    related: ["design-systems", "testing", "component-architecture"],
  },
];
