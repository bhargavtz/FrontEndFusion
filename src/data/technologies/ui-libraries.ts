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
    ],
    bestPractices: ["Treat copied components as your design system's starting point.", "Keep the original accessibility behaviour when restyling."],
    mistakes: ["Expecting updates via npm — you re-add or merge changes yourself."],
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
    concepts: [
      "MUI: Material Design, deep theming, large ecosystem including data grid and date pickers",
      "Ant Design: enterprise and admin UIs, rich tables and forms",
      "Chakra UI: style props and a token-based theme",
      "Mantine: broad component set plus hooks, CSS Modules based",
      "Theming via providers and tokens",
    ],
    bestPractices: ["Pick one library per product.", "Configure the theme before building screens.", "Check server-component and bundle-size compatibility for your framework."],
    mistakes: ["Mixing two styled libraries in one app.", "Fighting the library's design language instead of choosing a headless option."],
    interview: [
      {
        q: "Styled library or headless primitives?",
        a: "Styled libraries ship faster when their look is acceptable (admin tools). Headless primitives suit products with a custom brand because they give behaviour without imposing design.",
      },
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
    concepts: ["Component classes plus utility overrides", "Theme switching with data-theme", "Framework-agnostic"],
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
    bestPractices: ["Animate transform and opacity.", "Honour reduced-motion preferences.", "Use CSS transitions for simple hover effects."],
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
    ],
    docs: [{ label: "Lucide", href: "https://lucide.dev/guide/" }],
    related: ["accessibility"],
  },
];
