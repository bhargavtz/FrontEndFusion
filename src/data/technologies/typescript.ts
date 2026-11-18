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
      {
        title: "as const, satisfies, and type predicates",
        language: "ts",
        code: `const routes = {
  home: "/",
  dashboard: "/dashboard",
  settings: "/settings",
} as const;

type RouteName = keyof typeof routes;
type RoutePath = (typeof routes)[RouteName];

const theme = {
  colors: { brand: "#16a34a", danger: "#dc2626" },
  radius: 8,
} satisfies { colors: Record<string, string>; radius: number };

theme.colors.danger; // concrete keys kept, not just an index signature

const config = { mode: "dark", density: 2 } satisfies {
  mode: "light" | "dark";
  density: number;
};
config.mode.toUpperCase(); // still the literal "dark", not string

function isRouteName(value: string): value is RouteName {
  return value in routes;
}

export function toPath(name: string): RoutePath {
  if (!isRouteName(name)) return routes.home;
  return routes[name]; // narrowed to RouteName, so indexing is safe
}`,
        explanation: [
          "as const freezes every property into a literal type and makes the object readonly.",
          "keyof typeof routes turns the object keys into a union, and indexing it yields the exact path union.",
          "satisfies validates the shape without replacing the inferred type, so theme keeps concrete brand/danger keys instead of the wider Record<string, string> index signature an annotation would impose.",
          "config.mode stays \"dark\", which the annotation form (const config: Config) would have widened away.",
          "A type predicate (`value is RouteName`) teaches the compiler what a runtime check proved, so the index access needs no cast.",
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
    performance: [
      "Types cost nothing at runtime — the compiler erases them — but they cost build time. On large repos use `incremental`, project references, and `skipLibCheck` so editors and CI do not re-check unchanged files and third-party declarations.",
      "Type-level work is paid on every keystroke in the editor. Deeply recursive conditional or mapped types can trip \"Type instantiation is excessively deep\"; add a depth guard or cache the expansion in a named alias.",
      "`import type` (plus `verbatimModuleSyntax`) guarantees a type-only import is removed from the emitted bundle, which keeps large type-only dependencies such as schema or API clients out of the client chunk.",
      "Avoid `enum` and `const enum` in bundled code: enums emit a runtime object and `const enum` breaks under isolated transpilers. A union of string literals disappears completely.",
    ],
    useCases: [
      "A published design system: ship `.d.ts` files with the components so consumers get autocomplete and compile-time errors on prop misuse.",
      "An API client generated from an OpenAPI or GraphQL schema, so a renamed response field fails the build instead of showing up as `undefined` in production.",
      "Migrating a legacy JavaScript app incrementally: `allowJs` + `checkJs` plus a stricter `tsconfig` per folder, tightening one area at a time.",
      "Sharing a validation schema between client and server (for example Zod) and deriving the TypeScript type with `z.infer`, so the runtime check and the static type can never drift apart.",
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
    how:
      "React's types describe JSX as a function call whose return value must be assignable to ReactNode. For each element TypeScript checks every prop against the component's parameter type, and `.tsx` files opt the parser into JSX. Hooks are generic, so `useState<T>` fixes both the value and the setter, while helpers such as `ComponentProps<\"button\">` derive prop types from the DOM instead of being retyped by hand.",
    prerequisites: ["typescript", "react"],
    roadmap: [
      "Annotate props with a type alias and let inference handle local state",
      "Extend native element props with ComponentProps instead of re-declaring them",
      "Type children, events, refs, and context correctly",
      "Model component state as a discriminated union rather than several booleans",
      "Write generic components and polymorphic `as` props for shared primitives",
    ],
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
      "Derive event handlers from the element (React.ComponentProps<\"input\">[\"onChange\"]) instead of hand-writing signatures, so a wrong element type is caught for you.",
      "Type children as ReactNode, not JSX.Element, because most components should accept strings, numbers, and fragments as well as elements.",
    ],
    advanced: [
      "Polymorphic components: `<Box as=\"a\" href=\"...\">` with `as?: ElementType` and `ComponentPropsWithRef<T>` constrained by a generic, so the allowed props change with the rendered tag.",
      "Refs as ordinary props (React 19) versus `forwardRef`, and `useImperativeHandle` for exposing a narrow imperative API instead of the raw DOM node.",
      "Distributive conditional types over unions to derive per-variant props, which is how accessible component libraries type `variant` plus its matching `size` or `tone`.",
      "Module augmentation (`declare module \"react\"`) to extend library types, and global JSX augmentation to type custom elements — powerful, but it leaks to every file in the project.",
      "`NoInfer<T>` to stop a second argument from widening the inferred generic, which is the usual fix when a generic component silently collapses to `unknown`.",
    ],
    mistakes: [
      "Casting props with `as` to silence a spread error. Use `ComponentProps<\"button\">` or `Omit<ComponentProps<\"button\">, \"size\">` instead, so the conflict is expressed rather than hidden.",
      "Writing `useState(\"idle\")` for a status machine, which infers `string` and accepts any value. Pass the union explicitly: `useState<Status>(\"idle\")`.",
      "Typing handlers as `(e: any)` or `(e: Event)`. `React.ChangeEvent<HTMLInputElement>` is what makes `e.currentTarget.value` typed.",
      "Calling `useRef<HTMLDivElement>()` with no argument and then reading `.current` without a null check. Use `useRef<HTMLDivElement>(null)` and optional chaining.",
      "Declaring local copies of DOM props (`onClick?: () => void`). The real handler receives an event, so the copy is narrower than the browser and breaks when forwarded.",
    ],
    performance: [
      "Types are erased, so they never ship — but a long chain of generic React components raises type-check time noticeably in large `.tsx` trees; keep props types named and shallow rather than deeply inferred inline.",
      "Keep `@types/react` and `@types/react-dom` on matching versions. Mismatched majors produce duplicated or contradictory JSX namespaces, which surfaces as enormous error messages and slow editor responses.",
      "`import type { ... } from \"react\"` plus `verbatimModuleSyntax` avoids emitting a runtime import for symbols used only in annotations, which matters in libraries that are tree-shaken by consumers.",
      "Avoid typing heavy runtime data through generic props that force the compiler to instantiate deep types per call site; pass a plain interface or a `Pick` of the domain type instead.",
    ],
    useCases: [
      "An internal design system: every primitive accepts `ComponentProps<\"button\">` plus variants, so product teams get autocomplete and cannot pass an invalid `variant`.",
      "A data table or combobox generic over the row type, where `columns` and `renderRow` stay linked so a column key cannot drift from the row shape.",
      "A multi-step checkout form where each step is a discriminated union member, so the submit handler only sees fields that exist for the current step.",
      "An incremental migration of a Next.js App Router codebase from `.jsx` to `.tsx`, typing the leaf components first and letting prop types flow upward.",
    ],
    interview: [
      {
        q: "Why type props directly instead of using React.FC?",
        a: "React.FC adds an implicit `children` prop, hides generic parameters, and complicates default props and return types. Annotating the parameter (`function Card(props: CardProps)`) is explicit and generic-friendly.",
      },
      {
        q: "ReactNode vs ReactElement vs JSX.Element?",
        a: "ReactNode is the widest: elements, strings, numbers, fragments, null, and arrays of those. ReactElement is a single element object. JSX.Element is ReactElement with unknown props. Use ReactNode for children and ReactElement when exactly one element is required.",
      },
      {
        q: "How do you type a component that renders a different element based on a prop?",
        a: "Make it generic over the tag: `function Box<T extends ElementType>({ as, ...rest }: { as?: T } & ComponentPropsWithRef<T>)`. Inference then requires the props that belong to the chosen element.",
      },
      {
        q: "Why does `useState` sometimes infer `string` when you wanted a union?",
        a: "The initial value is widened to its base type. Give the generic explicitly — `useState<Status>(\"idle\")` — or initialise from a typed constant.",
      },
    ],
    exercises: [
      "Convert a JavaScript `Button` to TypeScript with `ComponentProps<\"button\">` and a `variant` union, then confirm that `<Button variant=\"danger\" />` fails to compile.",
      "Build a generic `<Select<T> options={T[]} value={T} onChange={(v: T) => void} />` and check that `onChange` receives the option type, not `any`.",
      "Type an async data hook as a discriminated union (`idle | loading | success | error`) and make an exhaustive switch render every state.",
      "Add a polymorphic `as` prop to a `Text` component so `as=\"a\"` requires `href` but `as=\"span\"` rejects it.",
      "Take an existing component file, replace every `any` and `as` with real types, and keep `npx tsc --noEmit` clean without changing behaviour.",
    ],
    docs: [
      { label: "React — Using TypeScript", href: "https://react.dev/learn/typescript" },
      { label: "React TypeScript Cheatsheet", href: "https://react-typescript-cheatsheet.netlify.app/" },
    ],
    related: ["typescript", "react"],
  },
];
