import type { Technology } from "./types";

export const aiDevelopment: Technology[] = [
  {
    slug: "ai-assisted-development",
    name: "AI-Assisted Frontend Development",
    domain: "ai-development",
    level: "Beginner",
    featured: true,
    summary: "How to use AI coding tools professionally — without losing your grip on the fundamentals.",
    what:
      "AI-assisted development means using language-model tools — chat, inline completion, and coding agents — to write, explain, refactor, test, and review code, while you remain responsible for the result.",
    why:
      "These tools remove boilerplate and shorten the path from idea to working UI. But a model can produce code that looks right and is subtly wrong, inaccessible, or insecure. Only someone who understands HTML, CSS, JavaScript, and the framework can tell the difference.",
    how:
      "Tools fall into three shapes: autocomplete (suggests the next lines), chat (answers questions about selected code), and agents (read your repo, edit files, run commands, and iterate against tests or the browser). The quality of the output depends mostly on the context you provide: the relevant files, the constraints, and a way for the tool to verify its work.",
    prerequisites: ["html", "css", "javascript"],
    roadmap: [
      "Learn the fundamentals first — you cannot review what you do not understand",
      "Use chat to explain unfamiliar code, then re-explain it yourself",
      "Use inline completion for boilerplate you could write",
      "Give agents small, verifiable tasks with tests or a browser check",
      "Review every diff as if a junior wrote it",
      "Set project rules and conventions the tool must follow",
    ],
    concepts: [
      "Autocomplete vs chat vs agent workflows",
      "Context: files, rules, and examples",
      "Verification loops: types, tests, linter, browser",
      "Prompting as writing a clear spec",
      "Project instruction files (CLAUDE.md, AGENTS.md, rules files)",
      "Security and privacy of code sent to a model",
    ],
    examples: [
      {
        title: "A review gate that blocks unreviewed code",
        language: "html",
        code: `<style>
  body { font-family: system-ui, sans-serif; margin: 0; padding: 2rem; background: #0f172a; color: #e2e8f0; }
  .gate { max-width: 34rem; margin: 0 auto; display: grid; gap: 0.75rem; }
  .check {
    display: flex; gap: 0.75rem; align-items: flex-start;
    padding: 0.75rem 1rem; border: 1px solid #334155; border-radius: 10px;
    background: #1e293b; cursor: pointer;
  }
  .check input { margin-top: 0.15rem; width: 1.1rem; height: 1.1rem; accent-color: #22c55e; }
  .check:focus-within { outline: 2px solid #38bdf8; outline-offset: 2px; }
  .check span { font-size: 0.95rem; line-height: 1.4; }
  button {
    padding: 0.7rem 1rem; border: 0; border-radius: 8px; font-weight: 600;
    background: #334155; color: #94a3b8; cursor: not-allowed;
  }
  button[data-ready="true"] { background: #16a34a; color: #fff; cursor: pointer; }
</style>
<div class="gate">
  <h2>Merge checklist</h2>
  <label class="check"><input type="checkbox"><span>I can explain every line of this diff.</span></label>
  <label class="check"><input type="checkbox"><span>Type-check, lint and tests pass locally.</span></label>
  <label class="check"><input type="checkbox"><span>Keyboard and screen-reader pass done.</span></label>
  <label class="check"><input type="checkbox"><span>No new dependency without a stated reason.</span></label>
  <button id="merge" data-ready="false" disabled>Approve merge</button>
</div>
<script>
  const boxes = [...document.querySelectorAll('input[type=checkbox]')];
  const merge = document.getElementById('merge');
  boxes.forEach((box) => box.addEventListener('change', () => {
    const ready = boxes.every((b) => b.checked);
    merge.dataset.ready = String(ready);
    merge.disabled = !ready;
  }));
</script>`,
        explanation: [
          "The checklist turns review from a feeling into an explicit gate — the same idea as a PR template.",
          "The button only enables when every item is confirmed, so 'looks fine' is not a path to merge.",
          "Each checkbox uses a real label and focus-within styling, which is the minimum accessibility bar for generated forms.",
          "Read this as a model for the discipline, not just a widget: the checks are the part AI tools cannot do for you.",
        ],
      },
      {
        title: "Validate model output before it reaches the UI",
        language: "ts",
        code: `type Suggestion = { label: string; href: string; confidence: number };

function parseSuggestions(raw: unknown): Suggestion[] {
  if (!Array.isArray(raw)) throw new Error("Expected an array of suggestions");
  return raw.map((item, index) => {
    if (typeof item !== "object" || item === null) {
      throw new Error("Item " + index + " is not an object");
    }
    const { label, href, confidence } = item as Record<string, unknown>;
    if (typeof label !== "string" || typeof href !== "string") {
      throw new Error("Item " + index + " has a bad shape");
    }
    // Model output is untrusted input: reject links that leave the app.
    if (!href.startsWith("/")) {
      throw new Error("Item " + index + " links outside the app: " + href);
    }
    return { label, href, confidence: typeof confidence === "number" ? confidence : 0 };
  });
}

// The render layer only ever receives values that passed this gate.
const safe = parseSuggestions(await response.json());`,
        explanation: [
          "Structured output from a model is text, not a typed object — narrow it at the boundary.",
          "The href check is the realistic risk: a model will happily invent absolute or javascript: URLs.",
          "Returning a normalised object means a missing field degrades instead of crashing the render.",
          "Keep the parser next to the API client so every consumer shares the same gate.",
        ],
      },
    ],
    advanced: [
      "Treat model output as untrusted input: validate against a schema at the boundary before it is rendered or persisted, exactly like a network response.",
      "Pin the model and tool versions in your workflow. Behaviour drifts between releases, so re-run a handful of representative prompts after every upgrade.",
      "Scope instructions per directory. Long context dilutes attention, so a 30-line rule file for one app beats a 300-line file at the repo root.",
      "Cap autonomy structurally: permission modes, a container or sandbox, and command allowlists for anything that touches the network, git remotes, or secrets.",
      "Record the prompt, model, and diff in the pull request. Review then covers how the change was produced, which is where the risk actually lives.",
      "Prefer deterministic tooling for mechanical work — codemods, formatters, codemod-style renames — and reserve the model for judgement calls.",
    ],
    bestPractices: [
      "Ask for an explanation of anything you do not understand, then check it against official docs.",
      "Work in small steps and commit often so any bad change is easy to revert.",
      "Make the tool run the type-checker, linter, and tests, and read the results yourself.",
      "Check accessibility by keyboard and screen reader; models often miss it.",
      "Keep secrets out of prompts and out of generated code.",
      "Require a stated reason for every new dependency; the model will add one to save three lines.",
    ],
    mistakes: [
      "Accepting large generated changes without reading them.",
      "Using AI to skip learning fundamentals, then being unable to debug the output.",
      "Trusting invented APIs, props, or package names — verify they exist.",
      "Pasting production secrets or customer data into a prompt.",
      "Judging a change by whether it runs, instead of whether it is correct, accessible, and maintainable.",
      "Letting a tool rewrite a file wholesale for a one-line fix, discarding earlier review.",
    ],
    performance: [
      "Context is the budget: sending a whole repository slows responses and lowers accuracy, so point at the five to ten files that matter.",
      "Inline completion latency grows with file size and open editor tabs; split very large files and disable unused extensions to keep suggestions instant.",
      "Generated dependencies cost bundle size for the life of the project — check the bundle diff for every package a tool adds.",
      "Batch mechanical edits with scripts rather than asking a model to touch hundreds of files one call at a time.",
    ],
    useCases: [
      "Bootstrapping a new page from an existing design and component library.",
      "Migrating a codebase to a new API with an agent that runs the build after every step.",
      "Explaining an unfamiliar legacy component before changing it.",
      "Writing first-draft tests for a form, then tightening the assertions by hand.",
      "Turning a support ticket with a screenshot into a scoped reproduction case.",
    ],
    interview: [
      {
        q: "How do you use AI tools without losing code quality?",
        a: "Small scoped tasks, clear constraints, automated checks (types, lint, tests), line-by-line review of every diff, and a rule that I must be able to explain every line I merge.",
      },
      {
        q: "What are the risks of AI-generated frontend code?",
        a: "Hallucinated APIs, outdated patterns, inaccessible markup, security flaws such as XSS, unnecessary dependencies, and plausible code that does not match the real requirements.",
      },
      {
        q: "Where do you draw the line for autonomy?",
        a: "Agents may run read-only and verification commands freely. Publishing, deleting, installing, or touching network and secrets require an explicit human decision.",
      },
    ],
    exercises: [
      "Take a component you wrote, ask an AI tool to review it for accessibility, then verify each claim yourself.",
      "Have an assistant generate a form, then list five things it got wrong or missed.",
      "Write a schema parser for one structured model output and prove it rejects a malformed item.",
      "Compare the bundle size before and after a generated feature that adds a dependency.",
    ],
    docs: [
      { label: "Claude Code docs", href: "https://code.claude.com/docs" },
      { label: "GitHub Copilot docs", href: "https://docs.github.com/en/copilot" },
      { label: "Cursor docs", href: "https://cursor.com/docs" },
      { label: "OpenCode docs", href: "https://opencode.ai/docs" },
    ],
    related: ["prompting-for-ui", "ai-code-review", "vibe-coding"],
    projects: ["ai-chat-interface"],
  },
  {
    slug: "prompting-for-ui",
    name: "Prompt Engineering for UI Generation",
    domain: "ai-development",
    level: "Intermediate",
    summary: "Writing prompts that produce accessible, on-brand, maintainable components and landing pages.",
    what:
      "Prompting for UI is writing a specification precise enough that a model generates the component you actually need: structure, states, tokens, accessibility, and the stack to use.",
    why:
      "Vague prompts get generic, templated designs. Specific prompts — with constraints and examples — produce code you can ship with light edits.",
    how:
      "A strong UI prompt states: the goal and audience, the stack and versions, the design tokens or reference, every state to handle (loading, empty, error, focus), accessibility requirements, what not to do, and how to verify the result.",
    prerequisites: ["html", "css", "react", "ai-assisted-development"],
    roadmap: [
      "Write the spec before the prompt: goal, audience, stack, states, constraints",
      "Pass your design tokens and one existing component as the style reference",
      "Ask for a plan or component API first, then approve it before any markup",
      "Iterate with targeted diffs instead of regenerating the whole file",
      "Check the result against acceptance criteria: keyboard, contrast, responsive, states",
      "Save the prompts that worked as reusable templates or project skills",
    ],
    concepts: [
      "Goal, stack, constraints, states, acceptance criteria",
      "Giving the model your design tokens and existing components",
      "Asking for a plan before code",
      "Iterating with diffs instead of regenerating everything",
      "Negative constraints (no new dependencies, no inline styles)",
    ],
    examples: [
      {
        title: "A structured component prompt",
        language: "text",
        code: `Build a pricing section for a Next.js 16 App Router project (TypeScript, Tailwind v4).

Context
- Use our tokens: bg-card, text-muted, border, primary. Reuse components/ui/button.tsx.
- Three plans in a responsive grid: 1 column on mobile, 3 from md.

Requirements
- Server Component; no client JavaScript.
- Semantic markup: <section aria-labelledby>, each plan a <article> with a heading.
- The popular plan is visually emphasised, and also marked in text (not colour alone).
- Visible focus styles; contrast at least 4.5:1.

Constraints
- No new dependencies. No inline styles. No images.

Deliverable
- One file: components/pricing.tsx, plus a 3-line note on any trade-offs.`,
        explanation: [
          "It names the stack and versions so the model does not guess.",
          "It points to existing tokens and components to keep the output on-brand.",
          "Accessibility is a requirement, not an afterthought.",
          "Constraints and a deliverable prevent scope creep and surprise dependencies.",
        ],
      },
      {
        title: "Ask for the missing states in a second pass",
        language: "text",
        code: `Now extend components/pricing.tsx with the states the design did not show.

- Loading: skeleton rows that match the final layout height (no layout shift).
- Empty: when the plans array is empty, render a short message and a contact link.
- Error: a retry action, announced with role="alert".
- Keyboard: tab order follows visual order; the popular plan is not the only tab stop.

Return only the diff. Do not change the exported props or the tokens used.`,
        explanation: [
          "Designs show the happy path; generating the other states explicitly is where AI saves the most time.",
          "Naming role=alert and layout shift gives the model something checkable instead of a vibe.",
          "'Return only the diff' keeps review small and preserves the decisions you already approved.",
        ],
      },
    ],
    advanced: [
      "Front-load examples. A twenty-line snippet of your house style teaches conventions far better than a paragraph of adjectives.",
      "Use negative constraints deliberately: models default to the most common pattern on the internet, not yours, so forbid useEffect, inline styles, or new packages explicitly.",
      "Ask for a self-critique pass against a checklist; the second response reliably catches state and accessibility gaps the first one skipped.",
      "Structure output for review: one component per file, explicit prop types, no opportunistic refactors, so the diff stays readable.",
      "Ground the prompt in real data shapes — paste an actual API response — to prevent invented fields, dead branches, and fake loading paths.",
    ],
    bestPractices: [
      "Provide screenshots or a Figma reference when visual fidelity matters.",
      "Ask for one component at a time and review before the next.",
      "Ask the model to list its assumptions.",
      "State the acceptance criteria so the model can check itself before returning.",
      "Pin versions in the prompt; 'Tailwind' and 'Tailwind v4' produce different code.",
    ],
    mistakes: [
      "One-line prompts such as \"make a nice landing page\".",
      "Regenerating the entire file for a small tweak and losing earlier fixes.",
      "Describing the look but not the behaviour, then being surprised by missing hover, focus, and error states.",
      "Letting the model choose the component library, so the page ships with a second design system inside it.",
    ],
    performance: [
      "One precise prompt is cheaper than three vague regeneration rounds; context up front reduces total tokens.",
      "Ask for the smallest viable file — oversized output raises latency and review time and adds unused code.",
      "Keep visual references small: crop the region you need instead of sending a full-page screenshot at 4x.",
      "Reuse a single conversation per component rather than restarting; restating context each time multiplies cost.",
    ],
    useCases: [
      "First drafts of settings, pricing, and dashboard pages from a Figma frame.",
      "Producing compact and comfortable variants of an existing table or card for quick comparison.",
      "Writing the empty, loading, and error states a designer never specified.",
      "Converting a marketing screenshot into a responsive, semantic section.",
    ],
    interview: [
      {
        q: "What separates a good UI prompt from a vague one?",
        a: "A good prompt fixes the goal, stack and versions, tokens, component reuse, every state, accessibility constraints, and acceptance criteria. A vague prompt leaves all of those to the model's defaults.",
      },
      {
        q: "How do you keep generated components on-brand?",
        a: "Pass the design tokens and one existing component as the reference, and forbid new colours, fonts, and dependencies in the constraints.",
      },
      {
        q: "Why ask for a plan before code?",
        a: "Structure and scope are cheap to correct in a plan and expensive to correct in a finished file. Approving the plan also prevents the model from quietly redesigning the page.",
      },
      {
        q: "How do you avoid a giant unreviewable diff?",
        a: "Ask for one component per response and request diffs against the approved version instead of regenerating the file.",
      },
    ],
    exercises: [
      "Rewrite a vague prompt into the structure above and compare the two outputs.",
      "Take an approved component and prompt only for its missing states, returning a diff.",
      "Prompt the same card twice, once with tokens supplied and once without, then diff the hard-coded values.",
      "Write a reusable prompt template with placeholders for stack, tokens, and states.",
    ],
    docs: [{ label: "Anthropic — Prompt engineering overview", href: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview" }],
    related: ["ai-assisted-development", "design-to-code"],
  },
  {
    slug: "ai-coding-agents",
    name: "Coding Agents: Claude Code, Cursor, Copilot & OpenCode",
    domain: "ai-development",
    level: "Intermediate",
    featured: true,
    summary: "What agentic coding tools do, how they differ, and how to run them on a real project safely.",
    what:
      "Coding agents are tools that read your repository, plan, edit multiple files, run commands, and iterate on the results. Examples include Claude Code (terminal and desktop), Cursor (an AI-first editor), GitHub Copilot (editor and cloud agents), and OpenCode (an open-source terminal agent).",
    why:
      "Multi-file changes, migrations, test writing, and bug investigation are tasks where an agent saves hours — if it is steered and verified.",
    how:
      "An agent loop sends your request plus repository context to a model, which responds with tool calls: read a file, search, edit, run tests. The tool executes them, returns results, and the loop continues until done. Permissions control which commands run without asking. Project files such as CLAUDE.md, AGENTS.md, or rules files give the agent persistent instructions.",
    prerequisites: ["git", "code-editors", "ai-assisted-development"],
    roadmap: [
      "Start with an inline assistant on a single file and review the diff",
      "Move to a terminal or editor agent for read-only exploration before edits",
      "Write an AGENTS.md with commands, conventions, and known traps",
      "Add verification: type-check, lint, tests, and a browser check",
      "Use branches and isolated worktrees for risky or parallel work",
      "Add hooks and CI so the same checks run even when you forget",
    ],
    concepts: [
      "The agent loop: plan, act, observe",
      "Permission modes and sandboxing",
      "Project instruction files",
      "Agent skills: reusable, on-demand instructions",
      "Subagents and parallel work",
      "Worktrees and branches for isolation",
      "Hooks to enforce checks",
    ],
    examples: [
      {
        title: "A scoped agent session from a clean branch",
        language: "bash",
        code: `git switch -c agent/pricing-table         # isolate the work
npm run lint && npx tsc --noEmit          # confirm a clean baseline first

# Give the agent one bounded task with a definition of done:
#   "Add a pricing table at app/pricing/page.tsx using components/ui/card.tsx.
#    Done means: npm run build passes, focus outlines are visible, no new deps."

git diff                                  # read every changed line yourself
npm test -- --run                         # verify the agent's claims
git commit -am "Add pricing table"`,
        explanation: [
          "A branch plus a clean baseline makes the agent's changes easy to isolate, review, and revert.",
          "The task names the files, the component to reuse, and the exact definition of done.",
          "You run verification instead of trusting the agent's summary — that is the whole discipline.",
        ],
      },
      {
        title: "Permissions that allow checks and require approval for the rest",
        language: "json",
        code: `{
  "permissions": {
    "allow": ["Bash(npm run lint)", "Bash(npm run build)", "Bash(npx tsc --noEmit)"],
    "ask": ["Bash(git push:*)", "Bash(npm install:*)"],
    "deny": ["Read(./.env*)", "Bash(rm:*)", "Bash(curl:*)"]
  }
}`,
        explanation: [
          "Verification commands run without prompting, so the fast loop stays fast.",
          "Publishing and installing change shared state and require a human decision.",
          "Secrets are denied at the read layer rather than merely discouraged in the prompt.",
          "Exact option names differ slightly between tools; the shape — allow, ask, deny — is the portable idea.",
        ],
      },
    ],
    advanced: [
      "Give the loop a stop condition: a failing test that must pass. Without one, an agent keeps polishing and drifting past scope.",
      "Isolate concurrent work in git worktrees. Two agents in one working tree will fight over the lockfile and each other's edits.",
      "Use hooks for determinism — run the formatter after every edit and block writes to generated or vendored paths.",
      "Split models by role: cheap and fast for search and summarisation, strong for the plan and the final diff review.",
      "Watch context growth. Long sessions carry stale file reads; restart with a written summary when the task changes.",
      "Make the repository legible: small files, obvious names, and a real README do more for agent accuracy than any prompt trick.",
    ],
    bestPractices: [
      "Start in a clean git state on a branch so every change is reviewable.",
      "Write project rules: commands to run, conventions, and things to avoid.",
      "Require the agent to run build, lint, and tests and show the output.",
      "Keep permission prompts on for commands that delete, push, or touch the network.",
      "Keep tasks small enough for one reviewable diff, and commit between them.",
      "Read the diff before you read the summary — summaries are generated from intent, not from the code.",
    ],
    mistakes: [
      "Granting blanket permissions in a repository with credentials.",
      "Letting an agent expand scope beyond the request.",
      "Skipping review because the tests pass — tests may be wrong too.",
      "Interrupting and re-prompting instead of stopping to fix the context, which produces thrash across three files.",
      "Running two agents in the same working tree and losing track of which change came from where.",
    ],
    performance: [
      "Agent wall-clock time is dominated by tool round-trips, not tokens: one precise read beats twelve exploratory greps.",
      "Keep the verify loop incremental — tsc --noEmit --incremental, lint only changed files — so each iteration is seconds, not minutes.",
      "Keep install and dev-server caches warm; a cold npm install inside a sandbox adds minutes to every session.",
      "Trim always-loaded instructions; every rule is re-sent on every turn of the loop.",
    ],
    useCases: [
      "Framework migrations where the same mechanical change touches sixty files.",
      "Writing tests for an untested module and fixing what they reveal.",
      "Investigating a production bug from a stack trace plus the failing route.",
      "Scaffolding a feature from a written spec, then handing the diff to a human for review.",
      "Auditing a codebase for a deprecated API and applying the fix in reviewed batches.",
    ],
    interview: [
      { q: "How would you onboard an AI agent to a repository?", a: "Write an instructions file with commands, architecture, conventions, and pitfalls; give it small tasks with tests; review diffs; and add hooks or CI so mistakes are caught automatically." },
      {
        q: "What is the agent loop?",
        a: "Send the request plus context to the model; it returns tool calls such as read, search, edit, or run tests; the harness executes them and returns results; repeat until the stop condition is met.",
      },
      {
        q: "How do you keep an agent from damaging a repository?",
        a: "Branch and worktree isolation, permission allowlists, denied reads for secrets, no network by default, and a human reviewing every diff before merge.",
      },
      {
        q: "When is an agent the wrong tool?",
        a: "When the task is ambiguous, when correctness is invisible without domain knowledge, or when a deterministic codemod would do the job faster and exactly.",
      },
    ],
    exercises: [
      "Write an AGENTS.md for one of your repos, then have a fresh session attempt a task and check whether it followed the rules.",
      "Run the same task twice: once with no verification step, once with a failing test as the definition of done. Compare the diffs.",
      "Run two agents in separate worktrees on independent tasks and merge both.",
      "Add a hook that formats files after each edit and confirm it fires.",
      "Tighten a permission config so installs and pushes require approval, then verify the agent still completes a normal task.",
    ],
    docs: [
      { label: "Claude Code docs", href: "https://code.claude.com/docs" },
      { label: "Cursor docs", href: "https://cursor.com/docs" },
      { label: "GitHub Copilot docs", href: "https://docs.github.com/en/copilot" },
      { label: "OpenCode docs", href: "https://opencode.ai/docs" },
      { label: "AGENTS.md", href: "https://agents.md/" },
    ],
    related: ["ai-assisted-development", "mcp-frontend", "agent-skills"],
  },
  {
    slug: "design-to-code",
    name: "Design-to-Code: Figma, Screenshots & Generators",
    domain: "ai-development",
    level: "Intermediate",
    summary: "Turning Figma files and screenshots into components — and the cleanup they always need.",
    what:
      "Design-to-code workflows convert a visual reference — a Figma frame, a screenshot, a sketch — into markup and styles, using Figma's Dev Mode and MCP server, multimodal models, or AI website builders.",
    why:
      "They get you from pixels to a first draft quickly. Treated as a draft, that saves real time; treated as final code, it produces div soup with absolute positioning.",
    how:
      "A model with image input reads the reference; with design-tool access it can also read layers, tokens, and components directly. You supply your component library and token names so it maps design values to your system instead of hard-coding hex values.",
    prerequisites: ["html", "css", "prompting-for-ui", "design-systems"],
    roadmap: [
      "Rebuild one static section by hand from a screenshot to learn what the model must infer",
      "Generate the same section with a multimodal model and diff the two versions",
      "Export Figma variables and map them to your tokens before generating any component",
      "Replace absolute positioning and fixed widths with flex, grid, and clamp()",
      "Add the states the design omits: hover, focus, loading, empty, error",
      "Set up a comparison loop: side by side, then a screenshot diff at three widths",
    ],
    concepts: [
      "Screenshot-to-code with multimodal models",
      "Figma Dev Mode and the Figma MCP server",
      "Mapping Figma variables to design tokens",
      "Reusing existing components",
      "Visual diffing against the reference",
    ],
    examples: [
      {
        title: "From fixed mock values to a fluid, token-driven card",
        language: "html",
        code: `<style>
  :root {
    --bg: #0b1220;
    --surface: #16213a;
    --text: #e6edf7;
    --muted: #9db0c9;
    --accent: #38bdf8;
    --radius: 14px;
    --space: clamp(1rem, 2vw, 1.75rem);
  }
  body { margin: 0; padding: var(--space); background: var(--bg); color: var(--text); font-family: system-ui, sans-serif; }
  .grid { display: grid; gap: var(--space); grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr)); }
  .card {
    display: grid;
    gap: 0.75rem;
    padding: var(--space);
    background: var(--surface);
    border: 1px solid #24314d;
    border-radius: var(--radius);
  }
  .card h3 { margin: 0; font-size: 1.1rem; }
  .card p { margin: 0; color: var(--muted); line-height: 1.5; }
  .card a { color: var(--accent); font-weight: 600; text-decoration: none; }
  .card a:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 4px; }
</style>
<div class="grid">
  <article class="card">
    <h3>Team workspace</h3>
    <p>Shared dashboards, roles, and audit history for growing teams.</p>
    <a href="#pricing">See pricing</a>
  </article>
  <article class="card">
    <h3>Enterprise</h3>
    <p>Custom contracts, SSO, and a dedicated support channel.</p>
    <a href="#contact">Talk to sales</a>
  </article>
</div>`,
        explanation: [
          "Design exports usually give one width; auto-fit with minmax() reproduces the intent at every width.",
          "Figma pixel values become tokens (--space, --radius) and clamp() instead of hard-coded numbers.",
          "The heading, paragraph, and link are real elements with a visible focus style — the design does not show focus, so you add it.",
          "No wrapper divs survive review: the grid holds articles directly.",
        ],
      },
      {
        title: "A token bridge generated from Figma variables",
        language: "json",
        code: `{
  "figmaVariables": {
    "color/surface": "#16213A",
    "color/text": "#E6EDF7",
    "color/accent": "#38BDF8",
    "space/4": "16px",
    "radius/card": "14px"
  },
  "cssVariables": {
    "--surface": "var(--color-surface)",
    "--text": "var(--color-text)",
    "--accent": "var(--color-accent)",
    "--space-4": "16px",
    "--radius-card": "14px"
  }
}`,
        explanation: [
          "Generate this bridge once and components reference tokens only, never raw hex values.",
          "Keeping the design names on one side and your names on the other makes re-sync a script rather than a rewrite.",
          "Any generated CSS that contains a literal hex value is a bug you can now detect in review.",
        ],
      },
    ],
    advanced: [
      "Read structure, not pixels: auto-layout maps to flex, constraints map to grid, and layer names tell you the component boundaries.",
      "Ask for a component API — props, variants, states — before markup, so variations are data rather than duplicated blocks.",
      "Diff screenshots at three widths; output that is pixel-perfect at 1440px routinely collapses at 375px.",
      "Replace exported PNGs and JPEGs with SVG for icons and illustrations, and use one responsive image with srcset otherwise.",
      "Treat generated copy as placeholder and route real text through the content layer, or every future copy change becomes a code change.",
      "Reconcile spacing scales explicitly; designers often use 4/8/12/24 while your tokens expose 4/8/16/24, and the model will invent the gap.",
    ],
    bestPractices: [
      "Generate one section at a time and compare it side by side with the design.",
      "Replace absolute positioning with Flexbox or Grid, and fixed sizes with responsive ones.",
      "Add the states a static design does not show: hover, focus, loading, empty, error.",
      "Delete every wrapper div the generator added that carries no layout or semantics.",
      "Map exported colours and spacing to tokens in the same pass, before the component spreads.",
    ],
    mistakes: [
      "Shipping generated pixel-perfect-at-1440px layouts that break on phones.",
      "Hard-coded colours instead of tokens.",
      "Accepting a screenshot of a modal as the component, including the backdrop, in page flow.",
      "Keeping exported images at their design resolution, which multiplies page weight.",
      "Trusting generated alt text for decorative images — decorative images need alt=\"\" instead.",
    ],
    performance: [
      "Generated markup often doubles DOM depth; flattening wrappers reduces style recalculation and layout cost on long pages.",
      "Design exports are usually several times larger than needed; compress, serve modern formats, and set width and height to avoid layout shift.",
      "Check that a generated section did not import a whole icon or UI package for one glyph.",
      "Prefer CSS gradients and shapes over exported images for decorative backgrounds.",
    ],
    useCases: [
      "Rebuilding a marketing landing page from a Figma file in a day.",
      "Converting a reference screenshot into an internal prototype for a product discussion.",
      "Turning a design-system frame into production components that reuse existing primitives.",
      "Generating three layout variants to test information hierarchy before committing to a design.",
    ],
    interview: [
      {
        q: "Why is design-to-code output a draft rather than production code?",
        a: "Models infer layout from pixels, so they favour absolute positions, fixed widths, and one-off colours. Production needs flow layout, tokens, real states, semantics, and responsive behaviour.",
      },
      {
        q: "How do you keep generated UI on-system?",
        a: "Supply tokens, component names, and constraints up front; then in review replace hard-coded values, delete duplicate primitives, and delete empty wrappers.",
      },
      {
        q: "What does Figma Dev Mode or the Figma MCP server add over a screenshot?",
        a: "Structured layer, layout, and variable data instead of a flat image, which removes most guessing about spacing, hierarchy, and component reuse.",
      },
      {
        q: "How do you verify fidelity?",
        a: "Compare at multiple breakpoints with a screenshot diff, then check behaviour the design cannot show: focus order, hover, loading, and error states.",
      },
    ],
    exercises: [
      "Convert a screenshot of a pricing card into a responsive component that uses tokens only; verify at 375px and 1440px.",
      "Export a Figma frame's variables and write the CSS custom property bridge.",
      "Take a generated section and rewrite it with semantic landmarks and full keyboard support.",
      "Build loading, empty, and error variants of a generated list.",
      "Count and remove every wrapper div in a generated page, then confirm nothing visually changed.",
    ],
    docs: [
      { label: "Figma Dev Mode", href: "https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode" },
      { label: "Figma MCP server", href: "https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server" },
    ],
    related: ["prompting-for-ui", "mcp-frontend"],
  },
  {
    slug: "ai-code-review",
    name: "AI Debugging, Code Review & Testing",
    domain: "ai-development",
    level: "Intermediate",
    summary: "Using models to find bugs, review diffs, and generate tests — and verifying their claims.",
    what:
      "AI review and debugging means feeding error messages, stack traces, diffs, or failing tests to a model and asking for causes, fixes, and risks. AI-powered UI testing uses agents or generated Playwright tests to exercise flows.",
    why:
      "A second pair of eyes that never gets tired catches typos, missed edge cases, and accessibility problems early. It is still a suggestion engine, not an authority.",
    how:
      "A review prompt sends the smallest useful context — the diff, the surrounding file, the error or stack trace, and the requirement it should be judged against. The model returns candidate causes or findings, and each one is a hypothesis: you confirm it by reproducing the bug, opening the cited line, or running the test it proposed. Unless the tool can execute the app, every claim it makes about runtime behaviour is unverified.",
    prerequisites: ["javascript", "testing", "ai-assisted-development"],
    roadmap: [
      "Paste the smallest reproduction: the error, the stack trace, and the failing input",
      "Ask for ranked hypotheses before any patch",
      "Verify each hypothesis by running code, not by reading the explanation",
      "Review with fixed lenses: correctness, security, accessibility, performance",
      "Generate a test, then confirm it fails without the fix and passes with it",
      "Automate the loop in CI with a review bot and flaky-test triage",
    ],
    concepts: [
      "Giving the full error, stack trace, and minimal reproduction",
      "Asking for hypotheses ranked by likelihood, then testing each",
      "Review prompts: security, accessibility, performance, readability",
      "Generating tests and checking that they fail without the fix",
      "Browser-driving agents for end-to-end checks",
    ],
    examples: [
      {
        title: "A minimal reproduction harness",
        language: "js",
        code: `// The bug: totals over 1000 cents render with a stray zero.
function formatPrice(cents, currency = "USD") {
  const amount = (cents / 100).toFixed(2);
  return amount + " " + currency;
}

const cases = [
  { in: [0], out: "0.00 USD" },
  { in: [999], out: "9.99 USD" },
  { in: [1000], out: "10.00 USD" }, // fails before the fix
  { in: [123456], out: "1234.56 USD" },
];

for (const { in: args, out } of cases) {
  const actual = formatPrice(...args);
  console.log(actual === out ? "pass" : "FAIL", args[0], "->", actual, "expected", out);
}`,
        explanation: [
          "A repro is a table of inputs and expected outputs, not a paragraph of description.",
          "Exactly one case fails, which proves the bug and pins it to a code path.",
          "The passing cases are the regression net: a fix that breaks them is rejected.",
          "Give a model this table plus the function and the diagnosis is usually immediate.",
        ],
      },
      {
        title: "A review prompt that asks for ranked hypotheses",
        language: "text",
        code: `Context
- Next.js App Router, React 19. Diff below touches components/checkout-form.tsx.
- Symptom: the submit button stays disabled after a valid card number.
- Full error: "Warning: Cannot update a component while rendering a different component".

Task
1. List at most four candidate causes, most likely first, each with the file and line.
2. For each, state the observation that would confirm or rule it out.
3. Do not propose a patch until I pick a cause.

Constraints
- Assume no new dependencies. Do not modify tests.`,
        explanation: [
          "Ranked hypotheses beat a single confident answer, because the runner-up is often the real cause.",
          "Asking for file and line makes the finding checkable instead of plausible.",
          "Deferring the patch keeps you in control of the diagnosis.",
        ],
      },
    ],
    advanced: [
      "Require a file and line citation for every finding. Uncited findings are usually pattern matching against the file's vocabulary.",
      "Distinguish 'what the code does' from 'what it should do' and pass the requirement or test explicitly; otherwise the review only checks internal consistency.",
      "Mutation-test generated suites: flip an operator or a boundary and see whether the tests still pass. If they do, the assertions are decorative.",
      "Scope reviews to the diff. A forty-line diff produces sharper findings than a nine-hundred-line file, where attention spreads thin.",
      "Separate discovery from repair: one session to find and rank causes, a fresh one to patch, so the second is not anchored on the first's wrong guess.",
      "Sandbox generated tests with a timeout — a test that hangs the suite is itself a defect.",
    ],
    bestPractices: [
      "Ask the model to explain its reasoning, then reproduce the bug yourself.",
      "Confirm a generated test fails before the fix and passes after.",
      "Treat review findings as leads; verify each in the code.",
      "Give the requirement or acceptance criteria, not just the diff.",
      "Keep a fixed review checklist so results are comparable between runs.",
    ],
    mistakes: [
      "Applying a fix that silences the error without addressing the cause.",
      "Trusting generated tests that assert implementation details.",
      "Sending the whole repository when the failing function and its input would do.",
      "Accepting 'this is a race condition' as a diagnosis without a reproduction that shows the interleaving.",
      "Letting a review bot post fifty low-confidence comments, which trains the team to ignore all of them.",
    ],
    performance: [
      "Context size drives cost and latency linearly — send the diff and the two or three files it touches.",
      "Run AI review asynchronously on pull requests; blocking a developer on a model round-trip destroys flow.",
      "Cache summaries of unchanged modules so repeat reviews skip re-reading stable code.",
      "Restrict the review bot to a targeted test subset; the full suite per review is slow and flaky.",
    ],
    useCases: [
      "Pre-review on pull requests to catch accessibility and security issues before a human looks.",
      "Triaging a flaky Playwright test by comparing passing and failing traces.",
      "Explaining an unfamiliar stack trace and proposing the smallest fix.",
      "Generating a regression test from a fixed bug report.",
      "Sweeping a codebase for a repeated anti-pattern after one instance is found.",
    ],
    interview: [
      {
        q: "How do you trust an AI-proposed fix?",
        a: "Reproduce the bug first, apply the fix on a branch, then confirm the new test fails before and passes after. The explanation is a lead; the run is the evidence.",
      },
      {
        q: "What makes an AI review prompt effective?",
        a: "A narrow scope (the diff), explicit review lenses, the requirement or test to judge against, and an instruction to cite files and lines.",
      },
      {
        q: "Where is AI review weakest?",
        a: "On business logic and product intent, because nothing in the code states what correct means. You must supply the spec.",
      },
      {
        q: "How do you detect weak generated tests?",
        a: "Mutate the implementation and check that the suite fails. Tests that still pass are asserting the shape of the code rather than its behaviour.",
      },
    ],
    exercises: [
      "Take a bug you fixed, remove the fix, and ask a model for ranked hypotheses; score how many were right.",
      "Generate tests for a component, then mutate one condition and check whether the suite catches it.",
      "Write three review prompts (security, accessibility, performance) and compare findings on the same diff.",
      "Build a script that runs a generated test suite and reports failures with output.",
      "Replace a failing-test description with an input/expected-output table and compare the model's accuracy.",
    ],
    docs: [{ label: "Playwright — Test generation", href: "https://playwright.dev/docs/codegen-intro" }],
    related: ["testing", "ai-assisted-development"],
  },
  {
    slug: "mcp-frontend",
    name: "MCP for Frontend Development",
    domain: "ai-development",
    level: "Advanced",
    summary: "The Model Context Protocol: giving AI tools access to browsers, design files, docs, and your project.",
    what:
      "The Model Context Protocol (MCP) is an open standard for connecting AI applications to external tools and data. An MCP server exposes tools (actions) and resources (data) that any MCP-aware client can use.",
    why:
      "Instead of copy-pasting screenshots and docs, an agent can open your app in a browser, read a Figma frame, query documentation, or inspect network logs directly.",
    how:
      "The client (Claude Code, Cursor, an IDE) launches or connects to an MCP server over stdio or HTTP, lists its tools with JSON schemas, and lets the model call them. Typical frontend servers: browser automation (Playwright), design tools (Figma), library docs, and project-specific servers.",
    prerequisites: ["ai-coding-agents", "browser-devtools"],
    roadmap: [
      "Understand the client/server split and the stdio versus HTTP transports",
      "Install one read-only server (docs or browser) and inspect its tool list",
      "Use it on a real task: read a page, capture a screenshot, fetch a schema",
      "Scope credentials, then enable write tools only where they are needed",
      "Write a small project server exposing your content or design tokens",
      "Add guardrails: allowlists, logs, and a rule for untrusted content",
    ],
    concepts: ["Servers, clients, and transports", "Tools, resources, and prompts", "Browser automation servers", "Design-tool servers", "Permissions and trust: servers can run code and read data"],
    examples: [
      {
        title: "Registering a browser server with a client",
        language: "json",
        code: `{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest", "--headless"],
      "env": {}
    },
    "docs": {
      "type": "http",
      "url": "https://example.com/mcp",
      "headers": { "Authorization": "Bearer $DOCS_TOKEN" }
    }
  }
}`,
        explanation: [
          "stdio servers are launched as child processes; HTTP servers are connected to over the network.",
          "Credentials come from the environment, never from a committed file.",
          "Keep the browser server headless and pointed at a local dev server, not a signed-in production account.",
          "The exact file name and keys vary by client (.mcp.json, settings.json, an app UI); the server definition is the portable part.",
        ],
      },
      {
        title: "A narrow, structured tool",
        language: "ts",
        code: `import { z } from "zod";

// One tool, one job, one schema. Avoid a generic "run_command" escape hatch.
server.registerTool(
  "get_design_token",
  {
    description: "Look up a design token by name, e.g. color/surface.",
    inputSchema: { name: z.string().min(1).max(80) },
  },
  async ({ name }) => {
    const value = tokens[name];
    if (!value) {
      return { isError: true, content: [{ type: "text", text: "Unknown token: " + name }] };
    }
    return { content: [{ type: "text", text: JSON.stringify({ name, value }) }] };
  },
);`,
        explanation: [
          "A typed input schema is what lets the model call the tool correctly without guessing arguments.",
          "Returning structured JSON keeps the response short and parseable; prose burns context.",
          "Errors are returned as tool results, not thrown, so the model can recover instead of ending the turn.",
          "The registerTool shape is close to the official SDK but has changed across versions — check the docs for your installed version.",
        ],
      },
    ],
    advanced: [
      "Tools are the security boundary. A browser server can read whatever session that profile holds, so give it a clean profile with no production credentials.",
      "Return compact structured output. Every token a tool returns competes with the user's task for the context window.",
      "Design narrow, idempotent tools: 'run_lint' is auditable and safe to retry, 'run_command' is a shell with a friendly name.",
      "Treat fetched content as untrusted input. Prompt injection through a rendered page, a README, or a doc comment is the defining new attack surface.",
      "Pin server versions. A dependency bump can widen permissions or change a tool schema without any visible prompt change.",
      "Budget tool latency: a browser server that boots Chromium per call turns a five-step task into a two-minute wait.",
    ],
    bestPractices: [
      "Install only servers you trust and review what each tool can do.",
      "Scope credentials narrowly.",
      "Treat content returned by a server (web pages, docs) as untrusted input.",
      "Enable read tools first; add write tools per task rather than permanently.",
      "Log which tools ran so an unexpected action is traceable after the fact.",
    ],
    mistakes: [
      "Connecting a server with broad write access to production data.",
      "Following instructions embedded in fetched page content.",
      "Exposing a generic shell command tool because it is convenient, which deletes every other guardrail.",
      "Sending whole accessibility trees or full-page screenshots every call and exhausting the context budget.",
      "Assuming a server's tool list is stable across versions and breaking automated workflows on upgrade.",
    ],
    performance: [
      "Each tool call is a round trip; a 'read several files' tool beats ten sequential single-file calls.",
      "Cap screenshot dimensions and DOM snapshots — a full-page PNG can cost thousands of tokens in one call.",
      "Start servers lazily; ones that boot a browser add seconds to the first interaction of every session.",
      "Cache documentation lookups locally so repeated identical queries do not re-fetch.",
    ],
    useCases: [
      "Let an agent open the local dev server, submit a form, and read console errors.",
      "Pull a Figma frame's structure and variables while generating components.",
      "Query documentation for the exact installed version instead of relying on training data.",
      "Expose your own content API so agents edit data files rather than hard-coding strings.",
      "Inspect network requests in a running app to debug a failing fetch.",
    ],
    interview: [
      {
        q: "What problem does MCP solve?",
        a: "It standardises how an AI client discovers and calls external tools and reads resources, so one server works across Claude Code, Cursor, IDEs, and custom clients instead of one bespoke integration each.",
      },
      {
        q: "What is the difference between tools and resources?",
        a: "Tools are model-invoked actions with JSON schemas and possible side effects; resources are data the client can read and attach to context, addressed by URI.",
      },
      {
        q: "What is the main risk of connecting a server?",
        a: "Over-broad permissions plus untrusted content: injected instructions arriving through fetched pages or files, and tools that can mutate production state.",
      },
      {
        q: "When would you write your own server?",
        a: "When the agent repeatedly needs project-specific data or a safe, narrow action — design tokens, a content API, a deploy preview check — and a shell command would be too broad.",
      },
    ],
    exercises: [
      "Configure a browser server and have an agent verify a form's validation messages.",
      "Write a read-only server exposing your design tokens and call it from your editor agent.",
      "Audit an installed server's tool list and write down which tools can mutate state.",
      "Add an allowlist so only read-only tools are enabled in your main project.",
      "Write a prompt-injection test page and confirm your agent refuses to act on it.",
    ],
    docs: [
      { label: "Model Context Protocol", href: "https://modelcontextprotocol.io/" },
      { label: "Playwright MCP", href: "https://github.com/microsoft/playwright-mcp" },
    ],
    related: ["ai-coding-agents", "agent-skills", "design-to-code"],
  },
  {
    slug: "agent-skills",
    name: "Agent Skills & Project Rules",
    domain: "ai-development",
    level: "Intermediate",
    summary: "Packaging your team's conventions so every AI session follows them.",
    what:
      "Agent skills and rules files are reusable instructions — Markdown with optional scripts — that an AI tool loads when relevant: how to add a page, which components to reuse, how to run checks.",
    why:
      "Without them, each session rediscovers your conventions or ignores them. With them, generated code matches your architecture from the first attempt.",
    how:
      "Instructions reach the model as text in context, either always (a root AGENTS.md or CLAUDE.md) or on demand, when a short description matches the task. Because that text competes with everything else in the window, short and specific rules change behaviour while long prose gets skimmed. The file should hold what the code cannot show: commands, architecture decisions, conventions, and traps that have already caused real bugs.",
    prerequisites: ["git", "ai-coding-agents"],
    roadmap: [
      "Write a root AGENTS.md with the commands and the three most common mistakes",
      "Add folder-level rules for areas with different conventions",
      "Package a repeatable workflow as a skill with a trigger description",
      "Include a verification step the agent can run itself",
      "Prune continuously: delete any rule the linter now enforces",
    ],
    concepts: ["CLAUDE.md / AGENTS.md at repo root", "Skills loaded on demand by description", "Rules scoped to folders or file types", "Keeping instructions short, current, and verifiable"],
    examples: [
      {
        title: "A useful project instruction",
        language: "text",
        code: `# Commands
npm run dev     # dev server on :3000
npm run build   # production build + type check
npm run lint

# Rules
- Prefer Server Components; add "use client" only for state or browser APIs.
- Use design tokens (var(--bg), var(--text)); never hard-code colours.
- Every form control needs a label; every image needs alt text.
- Content comes from src/data — never hard-code it in pages.`,
      },
      {
        title: "A skill that triggers on its own description",
        language: "text",
        code: `---
name: add-marketing-page
description: Use when adding or editing a marketing page under app/(marketing) —
  covers the section components, metadata, and the required OG image.
---

# Adding a marketing page

1. Copy app/(marketing)/pricing/page.tsx as the skeleton.
2. Compose sections from components/marketing/*, never raw divs.
3. Export metadata with title, description, and openGraph.images.
4. Add the route to src/data/navigation.ts.
5. Run: npm run lint && npm run build

Do not add client components to marketing pages unless a section needs
interaction; the whole route is statically rendered today.`,
        explanation: [
          "The description is the API: it is what the tool searches when deciding to load the skill.",
          "A numbered procedure with real paths beats a paragraph of guidance.",
          "The final line records a constraint the code does not make obvious, which is exactly what belongs here.",
        ],
      },
    ],
    advanced: [
      "Skills are discovered by description, not by name, so write the trigger text in the user's phrasing rather than the internal feature name.",
      "Put invariants in prose and mechanics in scripts. Anything that must happen identically every time belongs in a command the agent runs.",
      "Scope hierarchically: a thirty-line file in one app beats a three-hundred-line root file, because attention is finite and local rules are more relevant.",
      "Version rules with the code and review edits to them like code; a wrong rule corrupts every future session silently and invisibly.",
      "State the definition of done explicitly — tests pass, no new dependencies, keyboard checked — so the agent can decide when to stop.",
      "Prefer pointers over pasted content: give paths and let the agent read the file when the task needs it.",
    ],
    bestPractices: ["Write what the code cannot tell you: commands, conventions, and traps.", "Update the file when a convention changes.", "One rule per line, imperative, and checkable.", "Include the exact verification commands and their expected outcome.", "Delete rules the tooling already enforces."],
    mistakes: [
      "Writing platitudes the model already follows, such as 'write clean code' or 'be careful with security'.",
      "Duplicating what ESLint or TypeScript enforces, then letting the two drift apart.",
      "Documenting an aspirational architecture the repo does not actually follow, so generated code fits a system that does not exist.",
      "Never updating the file after a tool or convention changes, leaving instructions that break the build.",
      "Loading every skill unconditionally, which turns a focused prompt into a wall of competing rules.",
    ],
    performance: [
      "Always-loaded rules are re-sent on every request; keep the root file under roughly a hundred lines and push detail into on-demand skills.",
      "One good example compresses better than three paragraphs and is followed more reliably.",
      "Reference files by path instead of pasting them, so large content is read only when relevant.",
      "Remove stale rules — they add latency and create contradictions the model has to resolve at generation time.",
    ],
    useCases: [
      "Onboarding every agent session to a monorepo's app and package boundaries without a human explainer.",
      "Standardising how new pages, forms, and route handlers are created across a team.",
      "Encoding accessibility and security checks as mandatory workflow steps.",
      "Capturing a migration playbook once and reusing it across dozens of files.",
      "Handing a codebase to a contractor with the same conventions a staff engineer would explain.",
    ],
    interview: [
      {
        q: "What belongs in AGENTS.md versus a linter?",
        a: "Anything mechanically checkable belongs in tooling. The file holds judgement calls, commands, architecture, and traps that no tool can detect.",
      },
      {
        q: "How do you know a rule is working?",
        a: "Run a fresh session on a representative task and diff the result against the rule. If it is ignored, the rule is too vague, too long, or contradicted elsewhere in the file.",
      },
      {
        q: "Why keep rules short?",
        a: "Attention is finite and instructions compete with the task. Long files get partially followed, so precision beats completeness.",
      },
      {
        q: "How is a skill different from a rules file?",
        a: "A rules file is always in context; a skill is loaded on demand when its description matches, which keeps the baseline context small.",
      },
    ],
    exercises: [
      "Write a thirty-line AGENTS.md, then have two fresh sessions attempt the same task and compare compliance.",
      "Convert a repeated manual checklist into a script the agent must run.",
      "Add folder-scoped rules for a directory with different conventions and verify they do not leak elsewhere.",
      "Audit an existing rules file and delete everything a linter already enforces.",
      "Write a skill whose description is phrased the way a teammate would ask for the task, then check that it triggers.",
    ],
    docs: [{ label: "AGENTS.md", href: "https://agents.md/" }, { label: "Claude Code — Memory and CLAUDE.md", href: "https://code.claude.com/docs/en/memory" }],
    related: ["ai-coding-agents"],
  },
  {
    slug: "vibe-coding",
    name: "Vibe Coding & Human Review",
    domain: "ai-development",
    level: "Beginner",
    summary: "Where prompt-driven building shines, where it breaks, and the review discipline that makes it professional.",
    what:
      "\"Vibe coding\" is building software by describing what you want and accepting generated code with little inspection. It is excellent for prototypes and throwaway tools, and risky for anything others depend on.",
    why:
      "It lowers the barrier to making things, which is valuable. But code nobody understands cannot be debugged, secured, or maintained — so the line between a prototype and a product is whether a human understood and reviewed it.",
    how:
      "The loop is describe, generate, run, describe again, with the model holding most of the mental model. It works when feedback is immediate and visible — a page you can look at — and fails where correctness is invisible, such as money, auth, permissions, or dates. The professional version keeps the loop but adds a gate: read the diff, run the checks, and be able to explain the change before it ships.",
    prerequisites: ["ai-assisted-development"],
    roadmap: [
      "Prototype one small tool end to end to feel how fast the loop is",
      "Read the generated code and trace a single request through it",
      "Add a review gate: types, lint, tests, and a keyboard check",
      "Refactor one messy generated area to see what the debt actually costs",
      "Decide per project where prototypes stop and reviewed code starts",
    ],
    concepts: ["Prototype vs production", "Review checklist: correctness, accessibility, security, performance, dependencies", "Learning by reading generated code", "Technical debt from unreviewed code"],
    examples: [
      {
        title: "The same card, generated versus reviewed",
        language: "html",
        code: `<style>
  body { margin: 0; padding: 2rem; font-family: system-ui, sans-serif; background: #0f172a; color: #e6edf7; }
  .row { display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr)); }

  /* Generated: magic numbers and absolute positioning */
  .gen { position: relative; height: 190px; width: 300px; background: #1b2740; border-radius: 9px; }
  .gen h3 { position: absolute; top: 37px; left: 23px; font-size: 17px; margin: 0; }
  .gen p { position: absolute; top: 68px; left: 23px; width: 250px; font-size: 13px; margin: 0; }
  .gen a { position: absolute; top: 148px; left: 23px; font-size: 13px; color: #38bdf8; }

  /* Reviewed: flow layout, tokens, real focus state */
  .rev { display: grid; gap: 0.5rem; padding: 1.5rem; background: #1b2740; border-radius: 10px; }
  .rev h3 { margin: 0; font-size: 1.05rem; }
  .rev p { margin: 0; color: #9db0c9; line-height: 1.5; }
  .rev a { color: #38bdf8; font-weight: 600; }
  .rev a:focus-visible { outline: 2px solid #38bdf8; outline-offset: 3px; border-radius: 4px; }

  .label { font-size: 0.75rem; letter-spacing: 0.08em; text-transform: uppercase; color: #64748b; margin: 0 0 0.5rem; }
</style>
<div class="row">
  <section>
    <p class="label">Generated, shipped as-is</p>
    <div class="gen">
      <h3>Team workspace</h3>
      <p>Shared dashboards and roles.</p>
      <a href="#">See pricing</a>
    </div>
  </section>
  <section>
    <p class="label">After review</p>
    <article class="rev">
      <h3>Team workspace</h3>
      <p>Shared dashboards and roles.</p>
      <a href="#pricing">See pricing</a>
    </article>
  </section>
</div>`,
        explanation: [
          "Both look similar at this width; only one survives a longer string, a narrower viewport, or a zoomed font size.",
          "The reviewed version replaces absolute offsets with flow layout, so content defines the height.",
          "It also adds a real focus style — the generated version has none, which is a keyboard failure nobody sees in a screenshot.",
          "This is the whole review conversation in one frame: same pixels, different resilience.",
        ],
      },
      {
        title: "The gate a prototype must pass to ship",
        language: "bash",
        code: `# Every step must pass before the prototype is promoted.
npx tsc --noEmit          # types: catches invented props and shapes
npm run lint              # conventions and likely bugs
npm test -- --run         # behaviour, not appearance
npm run build             # the route actually compiles for production
# then, by hand:
#   - tab through every interactive element
#   - resize to 375px and zoom to 200%
#   - list every assumption in the README`,
        explanation: [
          "Automated checks catch the cheap failures; the manual pass catches the ones tools cannot see.",
          "Zoom and narrow widths expose fixed layouts that looked fine at desktop size.",
          "Listing assumptions is the real gate: if you cannot write them down, you cannot maintain the code.",
        ],
      },
    ],
    advanced: [
      "Protect the feedback loop: a live preview with hot reload is what makes prompting effective. Without it you are guessing from prose.",
      "Learn to spot invisible-correctness zones — auth, money, timezones, permissions, deletion — where the loop must stop and a test must exist.",
      "Commit before each regeneration. 'It worked a minute ago' is only recoverable if the working state is a snapshot.",
      "Rewriting a three-hundred-line generated file you now understand is often cheaper than patching it forever.",
      "Use the prototype to discover requirements, then write the spec from it; the artefact's value is the learning, not the code.",
      "Keep generated experiments out of the main branch: a spike branch and a clean rewrite is the cheapest professional pattern.",
    ],
    bestPractices: [
      "Use vibe coding to explore ideas, then rewrite or review before shipping.",
      "Never merge code you cannot explain.",
      "Use generated code as a reading exercise: trace how it works and what it assumes.",
      "Keep prototypes in their own branch or repo so they cannot quietly become production.",
      "Write down the assumptions the code made for you; they are the requirements you forgot to state.",
    ],
    mistakes: [
      "Shipping a prototype as production.",
      "Growing a codebase with no tests or structure because \"the AI will fix it\".",
      "Regenerating a whole page to change a label, then losing three earlier fixes.",
      "Adding a dependency in every iteration until the prototype installs eleven packages for one form.",
      "Treating a successful build as proof of correctness, when the build never exercises the flow.",
    ],
    performance: [
      "Prototypes accumulate unused dependencies and duplicated CSS quickly; measure bundle size before promoting one.",
      "Repeated full-file regeneration inflates files with dead code and unused props — prune each pass.",
      "Long chat sessions carrying the entire prototype slow down and drift; start fresh with a written summary once the design settles.",
      "Fixed pixel layouts force horizontal scrolling on mobile, which is both a usability and a perceived-performance problem.",
    ],
    useCases: [
      "Weekend tools and internal dashboards nobody will maintain for years.",
      "Design explorations where three variants are cheaper to generate than to draw.",
      "Teaching yourself a framework by reading code you prompted into existence.",
      "Client prototypes used to agree on scope before real implementation.",
      "One-off scripts and converters that never need to be robust.",
    ],
    interview: [
      { q: "Is vibe coding appropriate for production?", a: "Only after human review, tests, and security and accessibility checks. As a way to explore and prototype it is great; as a substitute for understanding the code it is a liability." },
      {
        q: "How do you decide a prototype is ready to promote?",
        a: "When someone can explain the code, the automated checks pass, the flow has tests, and the invisible-correctness paths (auth, money, data) have been reviewed deliberately.",
      },
      {
        q: "What technical debt does it create fastest?",
        a: "Unnamed magic numbers, duplicated styles, unused dependencies, and absent error states — all cheap to add in the moment and expensive to remove later.",
      },
      {
        q: "What is the cheapest professional version of the workflow?",
        a: "Vibe code on a throwaway branch, extract the requirements you learned, then implement the real thing with review and tests.",
      },
    ],
    exercises: [
      "Build a small tool by prompting only, then write down every assumption the code makes that you did not specify.",
      "Take a generated page and rewrite one component by hand without looking at the original; compare the two.",
      "Add build, lint, and type checks as a gate and see how many generated changes fail.",
      "Find three places in a prototype where correctness is invisible and list the tests they need.",
      "Measure the bundle size of a prototype, remove every unused dependency, and compare.",
    ],
    docs: [{ label: "Claude Code — Best practices", href: "https://code.claude.com/docs/en/best-practices" }],
    related: ["ai-assisted-development", "ai-code-review"],
  },
];
