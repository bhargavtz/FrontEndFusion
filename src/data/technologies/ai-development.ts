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
    bestPractices: [
      "Ask for an explanation of anything you do not understand, then check it against official docs.",
      "Work in small steps and commit often so any bad change is easy to revert.",
      "Make the tool run the type-checker, linter, and tests, and read the results yourself.",
      "Check accessibility by keyboard and screen reader; models often miss it.",
      "Keep secrets out of prompts and out of generated code.",
    ],
    mistakes: [
      "Accepting large generated changes without reading them.",
      "Using AI to skip learning fundamentals, then being unable to debug the output.",
      "Trusting invented APIs, props, or package names — verify they exist.",
      "Pasting production secrets or customer data into a prompt.",
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
    ],
    exercises: [
      "Take a component you wrote, ask an AI tool to review it for accessibility, then verify each claim yourself.",
      "Have an assistant generate a form, then list five things it got wrong or missed.",
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
    ],
    bestPractices: [
      "Provide screenshots or a Figma reference when visual fidelity matters.",
      "Ask for one component at a time and review before the next.",
      "Ask the model to list its assumptions.",
    ],
    mistakes: ["One-line prompts such as \"make a nice landing page\".", "Regenerating the entire file for a small tweak and losing earlier fixes."],
    exercises: ["Rewrite a vague prompt into the structure above and compare the two outputs."],
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
    concepts: [
      "The agent loop: plan, act, observe",
      "Permission modes and sandboxing",
      "Project instruction files",
      "Agent skills: reusable, on-demand instructions",
      "Subagents and parallel work",
      "Worktrees and branches for isolation",
      "Hooks to enforce checks",
    ],
    bestPractices: [
      "Start in a clean git state on a branch so every change is reviewable.",
      "Write project rules: commands to run, conventions, and things to avoid.",
      "Require the agent to run build, lint, and tests and show the output.",
      "Keep permission prompts on for commands that delete, push, or touch the network.",
    ],
    mistakes: [
      "Granting blanket permissions in a repository with credentials.",
      "Letting an agent expand scope beyond the request.",
      "Skipping review because the tests pass — tests may be wrong too.",
    ],
    interview: [{ q: "How would you onboard an AI agent to a repository?", a: "Write an instructions file with commands, architecture, conventions, and pitfalls; give it small tasks with tests; review diffs; and add hooks or CI so mistakes are caught automatically." }],
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
    concepts: [
      "Screenshot-to-code with multimodal models",
      "Figma Dev Mode and the Figma MCP server",
      "Mapping Figma variables to design tokens",
      "Reusing existing components",
      "Visual diffing against the reference",
    ],
    bestPractices: [
      "Generate one section at a time and compare it side by side with the design.",
      "Replace absolute positioning with Flexbox or Grid, and fixed sizes with responsive ones.",
      "Add the states a static design does not show: hover, focus, loading, empty, error.",
    ],
    mistakes: ["Shipping generated pixel-perfect-at-1440px layouts that break on phones.", "Hard-coded colours instead of tokens."],
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
    concepts: [
      "Giving the full error, stack trace, and minimal reproduction",
      "Asking for hypotheses ranked by likelihood, then testing each",
      "Review prompts: security, accessibility, performance, readability",
      "Generating tests and checking that they fail without the fix",
      "Browser-driving agents for end-to-end checks",
    ],
    bestPractices: [
      "Ask the model to explain its reasoning, then reproduce the bug yourself.",
      "Confirm a generated test fails before the fix and passes after.",
      "Treat review findings as leads; verify each in the code.",
    ],
    mistakes: ["Applying a fix that silences the error without addressing the cause.", "Trusting generated tests that assert implementation details."],
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
    concepts: ["Servers, clients, and transports", "Tools, resources, and prompts", "Browser automation servers", "Design-tool servers", "Permissions and trust: servers can run code and read data"],
    bestPractices: ["Install only servers you trust and review what each tool can do.", "Scope credentials narrowly.", "Treat content returned by a server (web pages, docs) as untrusted input."],
    mistakes: ["Connecting a server with broad write access to production data.", "Following instructions embedded in fetched page content."],
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
    ],
    bestPractices: ["Write what the code cannot tell you: commands, conventions, and traps.", "Update the file when a convention changes."],
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
    concepts: ["Prototype vs production", "Review checklist: correctness, accessibility, security, performance, dependencies", "Learning by reading generated code", "Technical debt from unreviewed code"],
    bestPractices: [
      "Use vibe coding to explore ideas, then rewrite or review before shipping.",
      "Never merge code you cannot explain.",
      "Use generated code as a reading exercise: trace how it works and what it assumes.",
    ],
    mistakes: ["Shipping a prototype as production.", "Growing a codebase with no tests or structure because \"the AI will fix it\"."],
    interview: [{ q: "Is vibe coding appropriate for production?", a: "Only after human review, tests, and security and accessibility checks. As a way to explore and prototype it is great; as a substitute for understanding the code it is a liability." }],
    docs: [{ label: "Claude Code — Best practices", href: "https://code.claude.com/docs/en/best-practices" }],
    related: ["ai-assisted-development", "ai-code-review"],
  },
];
