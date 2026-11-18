import type { Technology } from "./types";

export const typescript: Technology[] = [
  {
    slug: "typescript",
    name: "TypeScript",
    domain: "typescript",
    level: "Intermediate",
    featured: true,
    summary:
      "Static types for JavaScript: inference, interfaces, unions, narrowing, generics, and utility types.",
    what:
      "TypeScript is a superset of JavaScript that adds a static type system. The compiler checks types, then strips them to emit plain JavaScript.",
    why:
      "Types catch whole classes of bugs before code runs, document intent, and power editor autocomplete and safe refactors. On teams and large codebases they are close to essential.",
    how:
      "The checker infers types from values and annotations and verifies every expression against them. Types are structural: two types are compatible if their shapes match, regardless of their names. Nothing about types exists at runtime.",
    prerequisites: ["javascript"],
    roadmap: [
      "Basic annotations and inference",
      "Object types, interfaces, and type aliases",
      "Union and literal types",
      "Narrowing with typeof, in, and discriminated unions",
      "Generics",
      "Utility types: Partial, Pick, Omit, Record",
      "Mapped and conditional types",
      "tsconfig and strict mode",
      "TypeScript with React",
    ],
    concepts: [
      "Type inference",
      "Structural typing",
      "Unions, intersections, and literals",
      "Narrowing and discriminated unions",
      "Generics and constraints",
      "Utility, mapped, and conditional types",
      "unknown vs any vs never",
      "satisfies and as const",
    ],
    examples: [
      {
        title: "Discriminated unions and generics",
        language: "ts",
        code: `type Loading = { status: "loading" };
type Success<T> = { status: "success"; data: T };
type Failure = { status: "error"; message: string };
type Result<T> = Loading | Success<T> | Failure;

type User = { id: number; name: string; email?: string };

function render(result: Result<User[]>): string {
  switch (result.status) {
    case "loading":
      return "Loading…";
    case "error":
      return \`Error: \${result.message}\`;
    case "success":
      return result.data.map((u) => u.name).join(", ");
  }
}

function first<T>(items: readonly T[]): T | undefined {
  return items[0];
}

type UserPreview = Pick<User, "id" | "name">;
const preview: UserPreview = { id: 1, name: "Ada" };
const user = first([preview]); // inferred as UserPreview | undefined`,
        explanation: [
          "Each state has a literal status field — that field discriminates the union.",
          "Inside each case, TypeScript narrows result, so result.data only exists on success.",
          "If you add a new status and forget a case, strict mode flags the missing return.",
          "first<T> keeps the element type, so callers get precise results without casts.",
          "Pick builds a new type from selected keys of an existing one.",
        ],
      },
    ],
    advanced: [
      "Template literal types",
      "Conditional types with infer",
      "Variance and function parameter bivariance",
      "Declaration files (.d.ts) and module augmentation",
      "Branded types for IDs",
    ],
    bestPractices: [
      "Enable \"strict\": true from day one.",
      "Let inference work; annotate function boundaries and exported APIs.",
      "Prefer unknown over any for untrusted input, then narrow.",
      "Model state with discriminated unions instead of optional flags.",
      "Validate external data at runtime (for example with Zod) — types alone do not check API responses.",
    ],
    mistakes: [
      "Silencing errors with any or as instead of fixing the type.",
      "Assuming types validate data at runtime.",
      "Over-engineering types that nobody can read.",
      "Using enums where a union of string literals is simpler.",
    ],
    interview: [
      {
        q: "interface vs type alias?",
        a: "Both describe object shapes. Interfaces can be reopened (declaration merging) and extended; type aliases can express unions, intersections, tuples, and mapped types. Use either consistently for objects.",
      },
      {
        q: "unknown vs any?",
        a: "any disables checking. unknown accepts any value but forces you to narrow before using it, so it is the safe type for untrusted input.",
      },
      {
        q: "What is a discriminated union?",
        a: "A union of object types that share a literal property (the discriminant). Checking that property narrows the union to one member.",
      },
      {
        q: "What does satisfies do?",
        a: "It checks that an expression matches a type without widening the expression's inferred type, so you keep literal precision and still get validation.",
      },
    ],
    exercises: [
      "Type an API client that returns Result<T> for every endpoint.",
      "Write DeepReadonly<T> with a mapped, recursive type.",
      "Convert a JavaScript utility file to TypeScript with strict mode on.",
    ],
    docs: [
      { label: "TypeScript Handbook", href: "https://www.typescriptlang.org/docs/handbook/intro.html" },
      { label: "TypeScript Playground", href: "https://www.typescriptlang.org/play" },
    ],
    related: ["typescript-react", "javascript", "react"],
  },
  {
    slug: "typescript-react",
    name: "TypeScript with React",
    domain: "typescript",
    level: "Intermediate",
    summary:
      "Typing props, children, events, state, refs, context, and generic components.",
    what:
      "Using TypeScript to describe React component props, state, and events so mistakes in component usage are caught at compile time.",
    why:
      "Components are contracts. Typed props document what a component accepts and catch misuse across a large codebase.",
    prerequisites: ["typescript", "react"],
    concepts: [
      "Props types and default values",
      "ReactNode for children",
      "Event types: React.ChangeEvent, React.FormEvent",
      "useState with unions and generics",
      "useRef<HTMLInputElement>(null)",
      "ComponentProps<'button'> to extend native props",
      "Generic components",
    ],
    examples: [
      {
        title: "Typed, extendable button",
        language: "tsx",
        code: `import { useState, type ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  variant?: "primary" | "ghost";
};

function Button({ variant = "primary", style, ...rest }: ButtonProps) {
  const colors =
    variant === "primary"
      ? { background: "#16a34a", color: "white" }
      : { background: "transparent", color: "#16a34a" };
  return (
    <button
      {...rest}
      style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid #16a34a", ...colors, ...style }}
    />
  );
}

export default function App() {
  const [count, setCount] = useState<number>(0);
  return (
    <main style={{ fontFamily: "system-ui", padding: 16, display: "flex", gap: 8 }}>
      <Button onClick={() => setCount((c) => c + 1)}>Clicked {count}</Button>
      <Button variant="ghost" onClick={() => setCount(0)}>Reset</Button>
    </main>
  );
}`,
        explanation: [
          "ComponentProps<\"button\"> gives every native button prop (onClick, disabled, aria-*).",
          "The variant union restricts values to the two supported styles.",
          "...rest forwards native props, so the component behaves like a real button.",
          "useState<number> is explicit here, though inference from 0 would also work.",
        ],
      },
    ],
    bestPractices: [
      "Type props with a type alias next to the component.",
      "Extend native element props instead of re-declaring them.",
      "Avoid React.FC; annotate props directly.",
    ],
    docs: [
      { label: "React — Using TypeScript", href: "https://react.dev/learn/typescript" },
      { label: "React TypeScript Cheatsheet", href: "https://react-typescript-cheatsheet.netlify.app/" },
    ],
    related: ["typescript", "react"],
  },
];
