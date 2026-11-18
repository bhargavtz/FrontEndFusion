import type { Technology } from "./types";

export const uiLibraries: Technology[] = [
  {
    slug: "shadcn-ui",
    name: "shadcn/ui",
    domain: "ui-libraries",
    level: "Intermediate",
    featured: true,
    summary: "Copy-in components built on Radix and Tailwind that you own and edit — not a dependency.",
    what:
      "shadcn/ui is a collection of accessible React components that a CLI copies into your project as source files. They combine Radix UI primitives (behaviour and accessibility) with Tailwind CSS (styling).",
    why:
      "Packaged UI libraries are hard to customise deeply. Owning the source means you can change anything, while still starting from well-built, accessible components. Its registry format also lets other libraries, such as React Bits, distribute components the same way.",
    how:
      "npx shadcn@latest init writes a components.json config and theme tokens. npx shadcn@latest add button copies components/ui/button.tsx into your repo. From then on it is your code.",
    prerequisites: ["react", "tailwind-css"],
    roadmap: [
      "Create a React or Next.js app with Tailwind and the @/* path alias already working.",
      "Run the init CLI and read the generated components.json and globals.css tokens.",
      "Add two or three primitives (button, input, dialog) and read their source.",
      "Re-theme through CSS variables, including dark mode, without editing components.",
      "Extend a component with class-variance-authority variants, then ship your own registry item.",
    ],
    concepts: ["CLI and components.json", "Registry-based distribution", "Radix primitives underneath", "cn() helper and class-variance-authority", "Theme tokens as CSS variables"],
    examples: [
      {
        title: "Adding and using a component",
        language: "bash",
        code: `npx shadcn@latest init
npx shadcn@latest add button dialog

# then in a component:
# import { Button } from "@/components/ui/button";
# <Button variant="outline" size="sm">Save</Button>`,
      },
      {
        title: "Theme tokens as CSS variables",
        language: "css",
        code: `:root {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --primary: 221 83% 53%;
  --primary-foreground: 210 40% 98%;
  --radius: 0.5rem;
}

[data-theme="dark"] {
  --background: 222 47% 11%;
  --foreground: 210 40% 98%;
  --primary: 221 83% 60%;
}

.card {
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  border: 1px solid hsl(var(--foreground) / 0.15);
  border-radius: var(--radius);
  padding: 1rem 1.25rem;
  font-family: system-ui, sans-serif;
}

.btn {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border: 0;
  border-radius: calc(var(--radius) - 2px);
  padding: 0.5rem 0.9rem;
  font: inherit;
  cursor: pointer;
}`,
        markup: `<div class="card">
  <h3>Theme tokens</h3>
  <p>Components read CSS variables, so a single class change restyles the app.</p>
  <button class="btn">Primary action</button>
</div>`,
        explanation: [
          "Colours are stored as bare H S L channels, not full hsl() values, so opacity modifiers can wrap them: hsl(var(--primary) / 0.5).",
          ":root holds the light theme and a data-theme selector overrides the same variables for dark mode.",
          "--radius is shared by every component, which is why changing one number reshapes the whole UI.",
          "No component source is edited here, so upstream re-adds stay easy to diff.",
        ],
      },
    ],
    advanced: [
      "class-variance-authority turns a variant matrix into one cva() call, so only declared variants type-check and class strings never drift.",
      "Radix Slot plus asChild lets Button render as an <a> or a framework Link while keeping styles, refs, and keyboard behaviour.",
      "Registry JSON (files, registryDependencies, cssVars) is the packaging format: point your own CLI at a team registry to share components.",
      "The CLI rewrites import specifiers from the aliases in components.json, so tsconfig paths must be correct before init.",
      "Theme variables can be scoped to a subtree, which enables per-tenant branding or a live theme preview without reloading.",
    ],
    bestPractices: [
      "Treat copied components as your design system's starting point.",
      "Keep the original accessibility behaviour when restyling.",
      "Change tokens in globals.css before editing component files — most rebrands need no source edits.",
      "Keep components/ui for primitives and compose product components outside it so upgrades stay legible.",
      "Re-add a component into a scratch branch and diff it instead of overwriting a customised file.",
    ],
    mistakes: [
      "Expecting updates via npm — you re-add or merge changes yourself.",
      "Deleting aria-* attributes or Radix wrappers while restyling, which breaks keyboard and screen-reader behaviour.",
      "Hard-coding hex colours in components instead of using theme tokens, so dark mode silently breaks.",
      "Adding every component up front, leaving dead files and unused Radix packages in the bundle.",
    ],
    performance: [
      "Only the components you add ship, but each pulls its own Radix package — audit bundle growth when adding many.",
      "Import icons by name (import { Check } from \"lucide-react\") to keep tree-shaking effective.",
      "Static shadcn markup can render from Server Components with zero client JS; add \"use client\" only at interactive leaves.",
      "Heavy overlays (command palette, data table) should load on demand rather than in the initial route bundle.",
    ],
    useCases: [
      "SaaS dashboards and admin panels that need accessible dialogs, tables, and forms quickly.",
      "Design systems where the team wants to own and version component source.",
      "Marketing sites on Next.js that need a few interactive primitives without a runtime UI dependency.",
      "Prototypes that must later be rebranded without forking a third-party library.",
    ],
    interview: [
      {
        q: "Is shadcn/ui a component library?",
        a: "It is a distribution mechanism: a CLI plus a registry that copies source into your repo. Your runtime dependencies are Radix and Tailwind, not shadcn itself.",
      },
      {
        q: "How do you receive upstream fixes?",
        a: "Re-run the add command into a scratch branch and diff it against your version, then merge by hand. There is no automatic upgrade path, which is the cost of ownership.",
      },
      {
        q: "How does theming work?",
        a: "Components read CSS custom properties such as --primary and --radius. Editing those variables in globals.css re-themes every component, and a dark class or attribute swaps the variable set.",
      },
      {
        q: "When would you not choose it?",
        a: "When you need a maintained dependency with long-term support, or you are not on React with Tailwind. Copy-in code makes your team the maintainer.",
      },
    ],
    exercises: [
      "Add button and badge, then add a destructive variant with cva and confirm unknown variants are a type error.",
      "Rebrand the app by editing only CSS variables, including dark mode, without touching components/ui.",
      "Wrap Button with asChild so it renders a framework Link and keeps its focus ring.",
      "Build a confirm dialog that closes on Escape and returns focus to the trigger.",
      "Publish a PageHeader component as a registry item and install it in a second app.",
    ],
    docs: [{ label: "shadcn/ui docs", href: "https://ui.shadcn.com/docs" }],
    related: ["radix-ui", "tailwind-css", "design-systems"],
  },
  {
    slug: "radix-ui",
    name: "Radix UI & Headless UI",
    domain: "ui-libraries",
    level: "Intermediate",
    summary: "Unstyled, accessible primitives — dialogs, menus, tabs, popovers — that you style yourself.",
    what:
      "Headless component libraries such as Radix Primitives, Headless UI, and React Aria provide behaviour, keyboard interaction, focus management, and ARIA wiring with no visual styles.",
    why:
      "Accessible menus, comboboxes, and dialogs are hard to build correctly. Headless primitives solve the behaviour once and leave the design to you.",
    how:
      "Each primitive is a compound component: a Root owns state and context, while Trigger, Content, and friends read it. The library handles focus trapping and restoration, Escape and outside-click dismissal, aria-expanded and aria-controls wiring, scroll locking, and collision-aware positioning through Floating UI. You supply className and CSS; behaviour stays identical across every product that uses it.",
    prerequisites: ["react", "accessibility"],
    roadmap: [
      "Understand compound components: Root, Trigger, Portal, Content, Close.",
      "Style a Dialog with your own CSS and verify keyboard and screen-reader behaviour.",
      "Add controlled state (open / onOpenChange) and drive it from the URL or a store.",
      "Explore positioning primitives: Popover, Tooltip, DropdownMenu, and their data-side attributes.",
      "Add exit animations with forceMount, then wrap the primitive in your design-system component.",
    ],
    concepts: ["Compound components (Dialog.Root, Dialog.Trigger, Dialog.Content)", "Controlled and uncontrolled state", "asChild / slot composition", "Focus trapping and return", "Portals"],
    examples: [
      {
        title: "Radix dialog anatomy",
        language: "tsx",
        code: `import * as Dialog from "@radix-ui/react-dialog";

export function ConfirmDelete() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>Delete project</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="overlay" />
        <Dialog.Content className="dialog">
          <Dialog.Title>Delete project?</Dialog.Title>
          <Dialog.Description>This cannot be undone.</Dialog.Description>
          <Dialog.Close>Cancel</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}`,
        explanation: ["Focus moves into the dialog and returns to the trigger on close.", "Escape and overlay clicks close it; Title and Description label it for screen readers."],
      },
    ],
    advanced: [
      "forceMount on Portal and Content keeps the node in the tree so an exit animation can finish before unmount.",
      "Compose with asChild to merge behaviour onto your own element through Slot, avoiding an extra wrapper and a second focus stop.",
      "Popper primitives expose CSS variables such as --radix-popper-available-height, which lets you cap a popover's height without measuring in JS.",
      "Radix marks the rest of the page inert while a modal is open, which is exactly why Content must be portalled to the body.",
      "data-state=\"open\" / \"closed\" and data-side attributes let CSS drive animations and arrows without duplicating state in React.",
    ],
    bestPractices: [
      "Always render Title and Description, or supply aria-label and aria-describedby, so dialogs are announced correctly.",
      "Mount portals at the app root to avoid overflow clipping and stacking-context bugs.",
      "Style from data-state and data-side attributes rather than mirroring open state in your own class names.",
      "Prefer asChild over nesting a button inside a button.",
      "Let the primitive own keyboard handling instead of adding your own Escape listener.",
    ],
    mistakes: [
      "Dropping the Portal or Overlay while restyling, which breaks focus trapping and scroll lock.",
      "Replacing semantic triggers with div onClick, losing keyboard activation and button semantics.",
      "Animating Content without forceMount, so exit transitions never play.",
      "Stacking two modals without managing focus order, leaving the page behind tabbable.",
      "Passing aria-label on both the trigger and the content, producing duplicated announcements.",
    ],
    performance: [
      "Import per primitive (import * as Dialog from \"@radix-ui/react-dialog\") so unused primitives stay out of the bundle.",
      "Menus and popovers only mount while open — keep heavy content out of the initial render and load it on open.",
      "Prefer CSS transitions keyed to data-state over JS animation loops for open and close.",
      "The Floating UI positioning layer is small but non-trivial; avoid dozens of simultaneous poppers on one screen.",
    ],
    useCases: [
      "Design systems that need accessible primitives with a bespoke visual language.",
      "Command palettes, dropdown menus, and dialogs in dashboard products.",
      "Marketing sites that must stay keyboard accessible with minimal JavaScript.",
      "Multi-team platforms where behaviour is standardised separately from styling.",
    ],
    interview: [
      {
        q: "What does headless mean here?",
        a: "The component ships behaviour, state, ARIA attributes, and event wiring but no CSS. Every visual decision — including hover and focus styles — is yours.",
      },
      {
        q: "How does a Radix dialog handle focus?",
        a: "On open it moves focus into Content, traps Tab and Shift+Tab inside, makes the rest of the page inert, and returns focus to the trigger when it closes.",
      },
      {
        q: "What is asChild for?",
        a: "It merges the primitive's props and behaviour onto its single child via Slot, so your existing Button or Link becomes the trigger without an extra DOM node.",
      },
      {
        q: "How do you animate an exit?",
        a: "Set forceMount on Portal and Content so the element survives the state change, then let AnimatePresence or a CSS transition finish before unmounting.",
      },
    ],
    exercises: [
      "Build a DropdownMenu with checkbox and radio items and verify arrow-key and typeahead navigation.",
      "Add a controlled Dialog driven by the URL hash that closes with history back.",
      "Style a Tooltip arrow with data-side so it points correctly on all four sides.",
      "Add an exit transition to a Dialog using forceMount and confirm focus still returns to the trigger.",
      "Refactor a hand-rolled tabs component onto Tabs.Root and compare the accessibility tree.",
    ],
    docs: [
      { label: "Radix Primitives", href: "https://www.radix-ui.com/primitives/docs/overview/introduction" },
      { label: "Headless UI", href: "https://headlessui.com/" },
      { label: "React Aria", href: "https://react-spectrum.adobe.com/react-aria/" },
    ],
    related: ["shadcn-ui", "accessibility"],
  },
  {
    slug: "component-libraries",
    name: "MUI, Ant Design, Chakra UI & Mantine",
    domain: "ui-libraries",
    level: "Intermediate",
    summary: "Full, styled React component libraries — how they differ and when to choose one.",
    what:
      "Styled component libraries ship complete, themed components (buttons, tables, date pickers, forms) installed as npm dependencies.",
    why:
      "They make internal tools and dashboards fast to build. The trade-off is a distinct visual identity that takes effort to customise, and extra bundle weight.",
    how:
      "Each library wraps the app in a provider that injects design tokens, then components read those tokens through props, a styled API, or CSS variables. MUI resolves the sx prop and theme through Emotion, Ant Design generates CSS-in-JS from ConfigProvider tokens, Chakra compiles style props and recipes, and Mantine emits CSS Modules with CSS variables. In all four you configure tokens once at the root and compose components instead of restyling each instance.",
    prerequisites: ["react", "css", "design-systems"],
    roadmap: [
      "Choose one library from the product's look and the specific components it needs.",
      "Install the provider, CSS baseline or reset, and a minimal theme (colour, spacing, type).",
      "Build two real screens to learn the layout, form, and table primitives.",
      "Wrap the library in your own thin components so app code imports from one place.",
      "Measure bundle impact and lazy-load the heavy widgets (data grid, date pickers, charts).",
    ],
    concepts: [
      "MUI: Material Design, deep theming, large ecosystem including data grid and date pickers",
      "Ant Design: enterprise and admin UIs, rich tables and forms",
      "Chakra UI: style props and a token-based theme",
      "Mantine: broad component set plus hooks, CSS Modules based",
      "Theming via providers and tokens",
    ],
    examples: [
      {
        title: "Centralising tokens in a theme",
        language: "ts",
        code: `import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#2563eb" },
    background: { default: "#f8fafc" },
  },
  shape: { borderRadius: 8 },
  typography: { fontFamily: "system-ui, sans-serif" },
  components: {
    MuiButton: {
      styleOverrides: { root: { textTransform: "none" } },
    },
  },
});

// Mount once at the root, then every component reads these tokens:
// <ThemeProvider theme={theme}><CssBaseline /><App /></ThemeProvider>`,
        explanation: [
          "The theme object is the single source of truth; components never hard-code colour or radius.",
          "components.styleOverrides is the supported hook for global tweaks, so you avoid !important.",
          "createTheme can take a base theme and merge it, which is how you build brand variants.",
          "The provider must wrap the tree once — nested providers duplicate work and split the token set.",
        ],
      },
      {
        title: "The token layer these libraries generate",
        language: "css",
        code: `.k-btn {
  background: hsl(var(--brand));
  color: hsl(var(--on-brand));
  border: 0;
  border-radius: var(--radius);
  padding: 0.55rem 1rem;
  font: 600 0.9rem/1.2 system-ui, sans-serif;
  cursor: pointer;
  transition: filter 0.15s;
}

.k-btn:hover { filter: brightness(1.08); }

.k-field {
  display: grid;
  gap: 0.35rem;
  font-family: system-ui, sans-serif;
}

.k-input {
  border: 1px solid hsl(var(--ink) / 0.25);
  border-radius: var(--radius);
  padding: 0.5rem 0.65rem;
  font: inherit;
  background: hsl(var(--surface));
  color: hsl(var(--ink));
}

.k-input:focus-visible {
  outline: 2px solid hsl(var(--brand));
  outline-offset: 2px;
}`,
        markup: `<div style="--brand: 221 83% 53%; --on-brand: 0 0% 100%; --ink: 222 47% 11%; --surface: 0 0% 100%; --radius: 8px; padding: 1rem; background: #f8fafc; font-family: system-ui, sans-serif;">
  <div class="k-field" style="max-width: 20rem;">
    <label for="email">Work email</label>
    <input id="email" class="k-input" type="email" placeholder="you@company.com" />
    <button class="k-btn" type="button">Send invite</button>
  </div>
</div>`,
        explanation: [
          "This is the contract underneath MUI, Chakra, and Mantine: tokens become CSS variables, components consume them.",
          "Because state lives in CSS (hover, focus-visible), no JS is needed for visual states.",
          "Swapping --brand re-brands every component at once, which is the same lever the library theme exposes.",
          "Reimplementing the pattern once makes theme overrides in a real library far easier to reason about.",
        ],
      },
    ],
    advanced: [
      "MUI with SSR needs an Emotion cache extracted per request, or the first paint arrives unstyled and then flashes.",
      "MUI's components.styleOverrides and variants targeting named slots go deeper than className overrides and survive upgrades.",
      "Ant Design's ConfigProvider plus the App component keeps message, notification, and modal instances context-aware under React 18 StrictMode.",
      "Chakra v3 compiles style props and recipes to CSS variables, so overrides belong in recipe definitions rather than ad-hoc props.",
      "Tree-shaking differs: MUI named imports are fine in v5+, while Ant Design historically needed modular imports or babel-plugin-import.",
    ],
    bestPractices: [
      "Pick one library per product.",
      "Configure the theme before building screens.",
      "Check server-component and bundle-size compatibility for your framework.",
      "Wrap library components in your own layer so a future migration touches one folder.",
      "Pin versions and read the migration guide before major upgrades; theming APIs change often.",
    ],
    mistakes: [
      "Mixing two styled libraries in one app.",
      "Fighting the library's design language instead of choosing a headless option.",
      "Overriding with !important instead of the documented theme or slot API, which breaks on upgrade.",
      "Assuming server rendering: most kits need a client boundary and a provider at the app root.",
      "Importing from deep internal paths, which bypasses tree-shaking and breaks between minor versions.",
    ],
    performance: [
      "Measure first: one MUI DataGrid or Ant Design Table can add hundreds of kB, so lazy-load heavy widgets per route.",
      "Prefer per-component imports; for Ant Design enable modular imports so one Button does not pull the whole es tree.",
      "CSS-in-JS inserts styles at runtime; MUI and Chakra both offer static extraction or zero-runtime paths that cut this cost.",
      "Keep a single provider — nested providers duplicate theme objects and re-render whole subtrees on change.",
    ],
    useCases: [
      "Internal admin and back-office tools where delivery speed beats a bespoke look.",
      "Data-heavy dashboards needing tables, filters, and date pickers out of the box.",
      "Enterprise apps with strict form, validation, and localisation requirements.",
      "MVPs that need a complete component set in days rather than weeks.",
    ],
    interview: [
      {
        q: "Styled library or headless primitives?",
        a: "Styled libraries ship faster when their look is acceptable (admin tools). Headless primitives suit products with a custom brand because they give behaviour without imposing design.",
      },
      {
        q: "Why do these libraries fight a unique brand?",
        a: "Their components encode a design language with deep specificity and internal class names. Overriding every part costs more than starting from headless primitives and writing the CSS once.",
      },
      {
        q: "How do you keep a library upgradeable?",
        a: "Use documented theme and slot APIs, wrap components in your own layer, avoid !important and internal selectors, and take one major upgrade at a time.",
      },
      {
        q: "What is the SSR problem with CSS-in-JS?",
        a: "Styles are generated during render. Without extracting them per request the server sends unstyled HTML and the client re-inserts styles, causing a flash. MUI solves it with an Emotion cache, Chakra with its own extraction step.",
      },
    ],
    exercises: [
      "Build a settings form with a TextField, Select, and a theme override, using no !important.",
      "Rebuild the same screen in Mantine and note which primitives cost the least code.",
      "Add a dark-mode toggle by switching the theme's palette mode only.",
      "Lazy-load a data grid and measure the route's first-load JS before and after.",
      "Write a thin wrapper that re-exports five library components and blocks direct imports elsewhere.",
    ],
    docs: [
      { label: "MUI", href: "https://mui.com/material-ui/getting-started/" },
      { label: "Ant Design", href: "https://ant.design/docs/react/introduce" },
      { label: "Chakra UI", href: "https://chakra-ui.com/docs/get-started/installation" },
      { label: "Mantine", href: "https://mantine.dev/getting-started/" },
    ],
    related: ["radix-ui", "design-systems"],
  },
  {
    slug: "daisyui",
    name: "DaisyUI",
    domain: "ui-libraries",
    level: "Beginner",
    summary: "Semantic component classes (btn, card, modal) as a Tailwind plugin, with built-in themes.",
    what:
      "DaisyUI is a Tailwind CSS plugin that adds component class names such as btn, card, and navbar on top of Tailwind's utilities.",
    why:
      "It shortens markup for common components and works with any framework — including plain HTML — because it is only CSS.",
    how:
      "The plugin registers component rules into Tailwind's components layer, so a class like btn expands at build time into colours, padding, radius, and state styles driven by CSS variables. Each theme is a variable set selected by data-theme on an ancestor, which means switching themes is an attribute change with no JavaScript re-render. The output is a static stylesheet, so server-rendered templates and static HTML get identical results.",
    prerequisites: ["html", "css", "tailwind-css"],
    roadmap: [
      "Install Tailwind, then add daisyui as a plugin in the CSS entry file.",
      "Rebuild a card and a form using only component classes.",
      "Pick a theme and set data-theme on the html element.",
      "Add a theme switcher that persists the choice and applies it before first paint.",
      "Write a brand theme with CSS variables or the plugin's theme block.",
    ],
    concepts: ["Component classes plus utility overrides", "Theme switching with data-theme", "Framework-agnostic"],
    examples: [
      {
        title: "Installing the plugin",
        language: "bash",
        code: `npm install -D daisyui@latest

# In your Tailwind CSS entry file:
# @import "tailwindcss";
# @plugin "daisyui" {
#   themes: light --default, dark --prefersdark;
# }

# Tailwind v3 instead uses tailwind.config.js:
# plugins: [require("daisyui")]`,
        explanation: [
          "No JavaScript runtime is added — the plugin only emits CSS into the build.",
          "Listing themes explicitly keeps the stylesheet small because every theme is a variable set.",
          "The --default and --prefersdark flags pick the initial theme and respect the OS setting.",
        ],
      },
      {
        title: "The class and theme contract",
        language: "html",
        code: `<!doctype html>
<html lang="en" data-theme="light">
<head>
  <meta charset="utf-8" />
  <style>
    :root, [data-theme="light"] {
      --p: 221 83% 53%; --pc: 0 0% 100%;
      --b1: 0 0% 100%; --bc: 222 47% 11%;
      --rounded-btn: 0.5rem;
    }
    [data-theme="dark"] { --b1: 222 47% 11%; --bc: 210 40% 98%; --p: 221 83% 60%; }
    body {
      margin: 0; min-height: 100vh; display: grid; place-items: center;
      background: hsl(var(--b1)); color: hsl(var(--bc));
      font-family: system-ui, sans-serif; transition: background 0.2s;
    }
    .card {
      background: hsl(var(--b1)); border: 1px solid hsl(var(--bc) / 0.2);
      border-radius: 1rem; padding: 1.25rem 1.5rem; width: min(22rem, 90vw);
      box-shadow: 0 10px 30px hsl(var(--bc) / 0.08);
    }
    .btn {
      border: 0; border-radius: var(--rounded-btn); padding: 0.55rem 1rem;
      font: inherit; font-weight: 600; cursor: pointer;
      background: hsl(var(--p)); color: hsl(var(--pc));
    }
    .btn:active { transform: scale(0.97); }
  </style>
</head>
<body>
  <div class="card">
    <p><strong>theme:</strong> <span id="name">light</span></p>
    <h2>Semantic classes</h2>
    <p>One class set, many themes. Flip data-theme and every component follows.</p>
    <button class="btn" id="toggle">Toggle theme</button>
  </div>
  <script>
    const root = document.documentElement;
    const name = document.getElementById("name");
    document.getElementById("toggle").onclick = () => {
      root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
      name.textContent = root.dataset.theme;
    };
  </script>
</body>
</html>`,
        explanation: [
          "The real plugin generates these .btn and .card rules at build time; this stand-in shows the markup and theme contract you write against.",
          "Semantic classes describe intent (btn, card, badge) while utilities handle one-off tweaks.",
          "Every colour is a CSS variable, so a single attribute on html re-themes the page with no re-render.",
          "Component classes carry no behaviour — the button is real HTML, so keyboard and form semantics still work.",
        ],
      },
    ],
    advanced: [
      "Themes are plain CSS variable sets, so a brand theme can be a standalone file swapped at runtime without rebuilding components.",
      "A prefix option (prefix: \"d-\") namespaces every class, which prevents collisions inside an existing design system.",
      "themes: false disables the built-in set so you ship only your own variables, cutting the plugin's CSS substantially.",
      "Components live in the components layer, so utilities always win the cascade without !important or specificity hacks.",
      "Scoping data-theme to a subtree enables embedded widgets or live previews with a theme different from the page.",
    ],
    bestPractices: [
      "Use component classes for structure and utilities for one-off tweaks, not both for the same property.",
      "Set data-theme on html and apply the stored theme before paint to avoid a flash.",
      "Ship only the themes you actually support; each one adds variables and rules.",
      "Keep semantic HTML — .btn is styling, not behaviour.",
      "Add a prefix when adopting DaisyUI inside a product that already owns generic class names.",
    ],
    mistakes: [
      "Treating .modal as accessible by itself: DaisyUI styles a dialog but adds no focus trap or keyboard handling.",
      "Loading DaisyUI after your own stylesheet, so your overrides unexpectedly lose the cascade.",
      "Setting both a component class and a utility for the same property and guessing which wins.",
      "Enabling all built-in themes, which inflates CSS and slows first paint.",
      "Using div elements with component classes where a button or nav would give free semantics.",
    ],
    performance: [
      "Trim the theme list — theme variable sets are most of the plugin's CSS output.",
      "Tailwind emits only classes it finds, so unused component classes cost nothing; unused themes still cost.",
      "A locally built stylesheet is cached once, unlike runtime CSS-in-JS which re-inserts styles per session.",
      "Inline the theme-init script so the correct theme is set before first paint and avoid layout shift.",
    ],
    useCases: [
      "Static sites and prototypes where a full React component library is overkill.",
      "Admin panels built with server templates in Rails, Django, Laravel, or Astro.",
      "Tailwind-based design systems that need theming without a JS runtime.",
      "Docs and demos where readable markup matters more than a component API.",
    ],
    interview: [
      {
        q: "Is DaisyUI a component library like MUI?",
        a: "No. It ships CSS classes, not JavaScript components. Behaviour for dialogs, dropdowns, and tabs comes from the browser, Alpine, or your framework.",
      },
      {
        q: "How does theming work?",
        a: "Each theme is a set of CSS custom properties applied through data-theme on an ancestor. Changing the attribute restyles everything with no React re-render.",
      },
      {
        q: "Why do utilities beat component classes?",
        a: "DaisyUI writes into Tailwind's components layer and utilities live in a later layer, so a utility overrides .btn without !important.",
      },
      {
        q: "What is the main bundle risk?",
        a: "Themes. Every enabled theme emits a full variable set, so trimming the list is the biggest single CSS win.",
      },
    ],
    exercises: [
      "Add DaisyUI to a Tailwind project and rebuild a card plus a form using only component classes.",
      "Build a three-theme switcher that persists the choice and survives reload without a flash.",
      "Create a custom brand theme with CSS variables and check both light and dark variants.",
      "Replace a hand-rolled modal with dialog and modal classes, then document the accessibility you still must add.",
      "Add a prefix and verify no existing .btn rule in the project collides.",
    ],
    docs: [{ label: "DaisyUI docs", href: "https://daisyui.com/docs/intro/" }],
    related: ["tailwind-css"],
  },
  {
    slug: "motion",
    name: "Motion (Framer Motion)",
    domain: "ui-libraries",
    level: "Intermediate",
    summary: "Declarative animation for React and JavaScript: transitions, gestures, layout and exit animations.",
    what:
      "Motion (formerly Framer Motion) is an animation library. In React you animate with <motion.div animate={...}>; it also offers a framework-agnostic animate() API.",
    why:
      "Exit animations, shared-layout transitions, and gesture-driven motion are painful to hand-roll. Motion handles interruption, springs, and hardware acceleration.",
    how:
      "You declare a target; Motion interpolates from the element's current value using a spring or tween and writes the result to the DOM, mostly through transforms and the Web Animations API. Interruption works by reading the current value and velocity and re-targeting from there, so mid-flight changes never snap. AnimatePresence intercepts unmounting children so an exit animation can run before the node is removed.",
    prerequisites: ["react", "css", "javascript"],
    roadmap: [
      "Animate one element with initial, animate, and transition.",
      "Add gestures (whileHover, whileTap, drag) and variants for lists.",
      "Handle unmounting with exit and AnimatePresence.",
      "Share layout between states with layout and layoutId.",
      "Respect reduced motion and profile frame cost in the browser performance panel.",
    ],
    concepts: ["animate, initial, exit", "AnimatePresence for unmounting", "layout and layoutId", "Springs vs tweens", "useReducedMotion"],
    examples: [
      {
        title: "Fade-in list items",
        language: "tsx",
        code: `import { motion, useReducedMotion } from "motion/react";

export function Item({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.li
      initial={{ opacity: 0, y: reduce ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.li>
  );
}`,
      },
    ],
    advanced: [
      "Variants with staggerChildren and delayChildren orchestrate a list from the parent, so children carry no individual timings.",
      "layoutId pairs two elements across states or routes so one morphs into the other; do not mount both copies at once or the pair breaks.",
      "useAnimate and useMotionValue give imperative control for canvas, scroll-linked values, or springs outside the render cycle.",
      "MotionConfig reducedMotion=\"user\" applies the OS preference app-wide instead of guarding every component.",
      "LazyMotion with the domAnimation feature bundle removes roughly two thirds of the full bundle on content pages.",
    ],
    bestPractices: [
      "Animate transform and opacity.",
      "Honour reduced-motion preferences.",
      "Use CSS transitions for simple hover effects.",
      "Orchestrate with variants rather than sprinkling delays on each child.",
      "Keep layout animations to a handful of elements, never long lists.",
    ],
    mistakes: [
      "Animating width, height, or top where scale or grid-template-rows would avoid layout work.",
      "Forgetting AnimatePresence, so exit animations never run because React unmounts immediately.",
      "Putting layout on every row of a long list, forcing measurement of each child on every frame.",
      "Duplicating an element with the same layoutId, which makes the morph jump between the two.",
      "Ignoring reduced motion, which can cause discomfort for users who asked for less movement.",
    ],
    performance: [
      "motion/react is roughly 30-50 kB gzipped; on content pages prefer LazyMotion with the domAnimation bundle.",
      "Layout animations read and write the DOM each frame — cap how many elements participate.",
      "Use CSS transitions when there is no orchestration, exit, or gesture requirement.",
      "Scroll effects should use useScroll and useTransform (motion values) instead of setState per frame.",
    ],
    useCases: [
      "Marketing pages with scroll reveals and shared-element transitions.",
      "Product micro-interactions: toasts, modals, list reordering, tab indicators.",
      "Onboarding flows and route transitions in single-page apps.",
      "Drag surfaces such as kanban boards and sortable lists.",
    ],
    interview: [
      {
        q: "How does Motion interrupt a running animation without a jump?",
        a: "It reads the current value and velocity, then re-targets a new spring or tween from that state, so motion continues smoothly instead of restarting.",
      },
      {
        q: "Why does exit not work without AnimatePresence?",
        a: "React removes the element as soon as it leaves the tree. AnimatePresence intercepts the removal, keeps the child mounted, runs exit, then unmounts it.",
      },
      {
        q: "How do layout animations work?",
        a: "Motion measures the element before and after a layout change and applies a transform that visually starts at the old box, then animates to zero — no CSS layout animation needed.",
      },
      {
        q: "Spring or tween?",
        a: "Springs for physical, interruptible motion tied to gesture velocity; tweens with a duration and easing when you need predictable timing.",
      },
    ],
    exercises: [
      "Build a toast stack with AnimatePresence where toasts animate in and out and the list reflows smoothly.",
      "Create a tab indicator that slides using a shared layoutId.",
      "Add drag-to-dismiss on a sheet with a velocity-based exit.",
      "Wrap the app in MotionConfig and verify every non-essential animation is disabled under reduced motion.",
      "Swap a full import for LazyMotion and measure the bundle difference.",
    ],
    docs: [{ label: "Motion docs", href: "https://motion.dev/docs" }],
    related: ["css", "react"],
  },
  {
    slug: "icon-libraries",
    name: "Lucide & Icon Libraries",
    domain: "ui-libraries",
    level: "Beginner",
    summary: "Tree-shakable SVG icon sets and how to use icons accessibly.",
    what:
      "Icon libraries such as Lucide, Heroicons, Phosphor, and Tabler ship consistent SVG icons as framework components or raw SVG.",
    why:
      "Consistent stroke widths and sizes make interfaces feel coherent; per-icon imports keep bundles small.",
    how:
      "Most sets publish one component per icon, and each renders inline SVG whose strokes and fills reference currentColor. A bundler tree-shakes named imports, so only the icons you reference are bundled — a namespace import defeats that. At runtime an icon is just inline SVG, so it inherits text colour and can be sized in em units alongside the type scale.",
    prerequisites: ["html", "css", "react", "accessibility"],
    roadmap: [
      "Pick one set whose stroke weight matches the design.",
      "Import icons by name and size them with width, height, or CSS.",
      "Colour them with currentColor so they follow text and hover states.",
      "Mark decorative icons aria-hidden and give icon-only buttons an accessible name.",
      "Add a small Icon wrapper to standardise size, stroke, and title handling.",
    ],
    concepts: ["Named imports for tree-shaking", "currentColor and sizing", "Decorative vs meaningful icons", "Icon-only buttons need an accessible name"],
    examples: [
      {
        title: "Accessible icon button",
        language: "tsx",
        code: `import { Trash2 } from "lucide-react";

export function DeleteButton() {
  return (
    <button type="button" aria-label="Delete item">
      <Trash2 size={18} aria-hidden="true" />
    </button>
  );
}`,
      },
      {
        title: "Icon sizing and colour with currentColor",
        language: "css",
        code: `.toolbar {
  display: flex;
  gap: 0.25rem;
  font-family: system-ui, sans-serif;
}

.icon-btn {
  display: inline-grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid hsl(222 47% 11% / 0.15);
  border-radius: 0.5rem;
  background: transparent;
  color: hsl(222 47% 11%);
  cursor: pointer;
}

.icon-btn:hover { background: hsl(221 83% 53% / 0.12); }
.icon-btn:focus-visible { outline: 2px solid hsl(221 83% 53%); outline-offset: 2px; }

/* Icons inherit colour and track the type scale. */
.icon-btn svg {
  width: 1.15em;
  height: 1.15em;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.75;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.icon-btn[disabled] { color: hsl(222 47% 11% / 0.35); cursor: not-allowed; }`,
        markup: `<div class="toolbar" style="font-size: 16px; padding: 1rem;">
  <button class="icon-btn" type="button" aria-label="Edit item">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
  </button>
  <button class="icon-btn" type="button" aria-label="Delete item">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M6 6l1 14h10l1-14" /></svg>
  </button>
  <button class="icon-btn" type="button" aria-label="Archive item" disabled>
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16v13H4z" /><path d="M2 4h20v3H2z" /><path d="M10 12h4" /></svg>
  </button>
</div>`,
        explanation: [
          "stroke: currentColor makes the icon follow the button's text colour, including hover and disabled states.",
          "width and height in em keep icons proportional when the surrounding font-size changes or the user zooms.",
          "Each icon-only button has an aria-label, and the SVG is aria-hidden so nothing is announced twice.",
          "viewBox is what allows one path set to scale to any size without redrawing.",
        ],
      },
    ],
    advanced: [
      "A single Icon wrapper enforces size and stroke and makes swapping icon sets a one-file change.",
      "For icon-heavy pages, a sprite sheet of <symbol> definitions plus <use> removes duplicated path data.",
      "Decorative icons use aria-hidden while meaningful ones use role=\"img\" with a <title> — never both on one node.",
      "Sizing in em units keeps icons aligned with the type scale, including browser zoom and user font preferences.",
      "In Server Components icons are plain SVG with no client JS; keep them outside client boundaries where possible.",
    ],
    bestPractices: [
      "Import per icon rather than through a barrel that re-exports everything.",
      "Give every icon-only control an aria-label or a visually hidden text label.",
      "Keep one stroke width across the product; mixed weights read as inconsistent.",
      "Set icons to currentColor and size them relative to text.",
      "Prefer inline SVG to icon fonts: they inherit colour, scale crisply, and add no blocking request.",
    ],
    mistakes: [
      "Using an icon as the only label for an action, leaving assistive tech with an unlabelled button.",
      "Namespace-importing the whole set, which defeats tree-shaking and multiplies bundle size.",
      "Hard-coding a black fill so icons disappear in dark mode.",
      "Mixing several icon sets on one screen, producing inconsistent stroke weights and corners.",
      "Exporting icons as PNGs, which blur on zoom, ignore colour, and add requests.",
    ],
    performance: [
      "Named imports let the bundler drop unused icons; verify with a bundle analyser after adopting a set.",
      "Every inline SVG adds DOM nodes, so very long lists are better served by one sprite or a CSS mask.",
      "Rendering icons inside a client component pulls React into that bundle — render them from the server where possible.",
      "Avoid icon fonts: they add a render-blocking request and a flash of unstyled glyphs.",
    ],
    useCases: [
      "Navigation and toolbars where a consistent visual language matters.",
      "Empty states and onboarding screens that need to match interface stroke weight.",
      "Data tables with sort, status, and trend indicators.",
      "Marketing feature grids using large decorative icons.",
    ],
    interview: [
      {
        q: "Why prefer inline SVG components over an icon font?",
        a: "They inherit currentColor, scale without blurring, can be tree-shaken per icon, and can carry accessible names. Fonts give glyphs with no accessibility hooks plus a blocking request.",
      },
      {
        q: "When does an icon need alt text?",
        a: "Only when it conveys meaning on its own. Decorative icons get aria-hidden=\"true\"; meaningful ones get a <title> or adjacent text label.",
      },
      {
        q: "How do you keep icon bundles small?",
        a: "Import icons individually, avoid namespace imports, and audit the bundle. If one page needs dozens, a single sprite or mask approach is smaller than many components.",
      },
      {
        q: "Why use currentColor?",
        a: "It makes the icon inherit the surrounding text colour, so hover, disabled, and dark-mode states need no icon-specific CSS.",
      },
    ],
    exercises: [
      "Replace three PNG icons in a page with inline SVG and confirm colour inherits on hover.",
      "Build an IconButton component whose types require a label.",
      "Audit a page's bundle before and after switching from namespace imports to named imports.",
      "Convert a twenty-icon toolbar to a sprite sheet and compare DOM size.",
      "Add a MeaningfulIcon component using role=\"img\" and a title, then check it with a screen reader.",
    ],
    docs: [{ label: "Lucide", href: "https://lucide.dev/guide/" }],
    related: ["accessibility"],
  },
];
