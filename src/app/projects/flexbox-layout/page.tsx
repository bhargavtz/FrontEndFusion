import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Flexbox Showcase",
  description:
    "An interactive visual reference for every major Flexbox container and item property.",
};

const demoStyles = `
.flex-demo {
  --fx-primary: #4f46e5;
  --fx-secondary: #7c3aed;
  --fx-box-bg: #e0e7ff;
  --fx-box-text: #3730a3;
  background: #f8fafc;
  color: #111827;
  min-height: 100vh;
}
.flex-demo .fx-box {
  background: var(--fx-box-bg);
  color: var(--fx-box-text);
  font-weight: 600;
  font-size: .875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 12px;
  min-width: 48px;
  min-height: 48px;
  transition: background .2s, transform .2s;
}
.flex-demo .fx-box.tall { min-height: 80px; }
.flex-demo .fx-box.short { min-height: 36px; }
.flex-demo .fx-demo {
  background: #f1f5f9;
  border-radius: 12px;
  padding: 16px;
  border: 2px dashed #cbd5e1;
  min-height: 80px;
}
.flex-demo .fx-demo .fx-box:hover { background: #c7d2fe; transform: scale(1.05); }
.flex-demo .fx-badge {
  display: inline-block;
  background: var(--fx-primary);
  color: white;
  font-size: .7rem;
  font-family: var(--font-geist-mono), monospace;
  padding: 2px 8px;
  border-radius: 4px;
  margin-left: 6px;
}
.flex-demo .fx-title {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(to right, var(--fx-primary), var(--fx-secondary));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}
`;

const directions = [
  { value: "row", className: "flex-row" },
  { value: "row-reverse", className: "flex-row-reverse" },
  { value: "column", className: "flex-col" },
  { value: "column-reverse", className: "flex-col-reverse" },
];

const justifyValues = [
  { value: "flex-start", className: "justify-start" },
  { value: "center", className: "justify-center" },
  { value: "flex-end", className: "justify-end" },
  { value: "space-between", className: "justify-between" },
  { value: "space-around", className: "justify-around" },
  { value: "space-evenly", className: "justify-evenly" },
];

const alignValues = [
  { value: "flex-start", className: "items-start" },
  { value: "center", className: "items-center" },
  { value: "flex-end", className: "items-end" },
  { value: "stretch", className: "items-stretch" },
  { value: "baseline", className: "items-baseline" },
];

const wrapValues = [
  { value: "nowrap", className: "flex-nowrap overflow-hidden" },
  { value: "wrap", className: "flex-wrap" },
];

const growDemos = [
  {
    label: "flex-grow",
    value: "0",
    note: "default — items keep natural width",
    boxes: [
      { text: "grow:0", style: { flexGrow: 0 } },
      { text: "grow:0", style: { flexGrow: 0 } },
      { text: "grow:0", style: { flexGrow: 0 } },
    ],
  },
  {
    label: "flex-grow",
    value: "1",
    note: "on all — equal sharing of free space",
    boxes: [
      { text: "grow:1", style: { flexGrow: 1 } },
      { text: "grow:1", style: { flexGrow: 1 } },
      { text: "grow:1", style: { flexGrow: 1 } },
    ],
  },
  {
    label: "Mixed grow",
    value: "1 · 2 · 1",
    note: "",
    boxes: [
      { text: "1", style: { flexGrow: 1 } },
      { text: "2 (gets 2×)", style: { flexGrow: 2 } },
      { text: "1", style: { flexGrow: 1 } },
    ],
  },
  {
    label: "flex-basis",
    value: "200px",
    note: "sets starting width before growing",
    boxes: [
      { text: "basis:200px", style: { flexBasis: 200, flexGrow: 1 } },
      { text: "basis:200px", style: { flexBasis: 200, flexGrow: 1 } },
      { text: "basis:200px", style: { flexBasis: 200, flexGrow: 1 } },
    ],
  },
];

const realWorldCards = [
  {
    icon: "🎨",
    title: "Design",
    detail: "Create stunning interfaces with modern CSS techniques.",
  },
  {
    icon: "⚡",
    title: "Performance",
    detail: "Optimize load times and runtime performance for fast UIs.",
  },
  {
    icon: "♿",
    title: "Accessibility",
    detail: "Build inclusive experiences for all users regardless of ability.",
  },
];

export default function Page() {
  return (
    <div className="flex-demo">
      <style>{demoStyles}</style>

      <header className="bg-indigo-700 px-6 py-10 text-center text-white">
        <h1 className="mb-2 text-3xl font-bold">CSS Flexbox Showcase</h1>
        <p className="mx-auto max-w-xl text-sm text-indigo-200">
          Interactive visual reference for every major Flexbox property —
          container and item level.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block text-sm text-indigo-300 underline hover:text-white"
        >
          ← Back to Hub
        </Link>
      </header>

      <main className="mx-auto max-w-4xl space-y-14 px-6 py-10">
        <section>
          <h2 className="fx-title mb-1">flex-direction</h2>
          <p className="mb-6 text-sm text-gray-500">
            Controls the main axis direction of flex items.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {directions.map((direction) => (
              <div key={direction.value}>
                <p className="mb-2 text-sm font-medium text-gray-700">
                  flex-direction:{" "}
                  <span className="fx-badge">{direction.value}</span>
                </p>
                <div className={`fx-demo flex gap-2 ${direction.className}`}>
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="fx-box">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="fx-title mb-1">justify-content</h2>
          <p className="mb-6 text-sm text-gray-500">
            Aligns items along the <em>main axis</em> (horizontal for row).
          </p>
          <div className="space-y-4">
            {justifyValues.map((item) => (
              <div key={item.value}>
                <p className="mb-2 text-sm font-medium text-gray-700">
                  justify-content: <span className="fx-badge">{item.value}</span>
                </p>
                <div className={`fx-demo flex gap-2 ${item.className}`}>
                  {["A", "B", "C"].map((label) => (
                    <div key={label} className="fx-box">
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="fx-title mb-1">align-items</h2>
          <p className="mb-6 text-sm text-gray-500">
            Aligns items along the <em>cross axis</em> (vertical for row). Items
            have different heights to show the effect.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {alignValues.map((item) => (
              <div key={item.value}>
                <p className="mb-2 text-sm font-medium text-gray-700">
                  align-items: <span className="fx-badge">{item.value}</span>
                </p>
                <div
                  className={`fx-demo flex gap-2 ${item.className}`}
                  style={{ height: 120 }}
                >
                  {item.value === "baseline" ? (
                    <>
                      <div className="fx-box text-2xl">A</div>
                      <div className="fx-box text-sm">B</div>
                      <div className="fx-box text-xs">C</div>
                    </>
                  ) : item.value === "stretch" ? (
                    <>
                      <div className="fx-box" style={{ minHeight: 0 }}>
                        A
                      </div>
                      <div className="fx-box" style={{ minHeight: 0 }}>
                        B
                      </div>
                      <div className="fx-box" style={{ minHeight: 0 }}>
                        C
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="fx-box">A</div>
                      <div className="fx-box tall">B</div>
                      <div className="fx-box short">C</div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="fx-title mb-1">flex-wrap</h2>
          <p className="mb-6 text-sm text-gray-500">
            Controls whether items wrap onto multiple lines.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {wrapValues.map((item) => (
              <div key={item.value}>
                <p className="mb-2 text-sm font-medium text-gray-700">
                  flex-wrap: <span className="fx-badge">{item.value}</span>
                </p>
                <div className={`fx-demo flex gap-2 ${item.className}`}>
                  {[1, 2, 3, 4, 5].map((item2) => (
                    <div
                      key={item2}
                      className="fx-box"
                      style={{ minWidth: 60 }}
                    >
                      {item2}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="fx-title mb-1">
            flex-grow · flex-shrink · flex-basis
          </h2>
          <p className="mb-6 text-sm text-gray-500">
            Item-level properties controlling how items grow, shrink, and what
            their starting size is.
          </p>
          <div className="space-y-5">
            {growDemos.map((demo) => (
              <div key={`${demo.label}-${demo.value}`}>
                <p className="mb-2 text-sm font-medium text-gray-700">
                  {demo.label}: <span className="fx-badge">{demo.value}</span>{" "}
                  {demo.note}
                </p>
                <div className="fx-demo flex flex-wrap gap-2">
                  {demo.boxes.map((box, index) => (
                    <div
                      key={`${box.text}-${index}`}
                      className="fx-box"
                      style={box.style}
                    >
                      {box.text}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="fx-title mb-1">align-self</h2>
          <p className="mb-6 text-sm text-gray-500">
            Overrides{" "}
            <code className="rounded bg-gray-100 px-1 text-xs">align-items</code>{" "}
            for a single item.
          </p>
          <div
            className="fx-demo flex items-start gap-2"
            style={{ height: 120 }}
          >
            <div className="fx-box">default</div>
            <div className="fx-box" style={{ alignSelf: "center" }}>
              center
            </div>
            <div className="fx-box" style={{ alignSelf: "flex-end" }}>
              end
            </div>
            <div
              className="fx-box"
              style={{ alignSelf: "stretch", minHeight: 0 }}
            >
              stretch
            </div>
          </div>
        </section>

        <section>
          <h2 className="fx-title mb-1">Real-World Example — Card Layout</h2>
          <p className="mb-6 text-sm text-gray-500">
            A typical responsive card grid using Flexbox.
          </p>
          <div className="flex flex-wrap gap-5">
            {realWorldCards.map((card) => (
              <div
                key={card.title}
                className="flex flex-col gap-3 rounded-xl bg-white p-5 shadow"
                style={{ flex: "1 1 220px" }}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-xl"
                  aria-hidden="true"
                >
                  {card.icon}
                </div>
                <h3 className="font-semibold text-gray-900">{card.title}</h3>
                <p className="flex-1 text-sm text-gray-500">{card.detail}</p>
                <a
                  href="#"
                  className="self-start text-sm font-medium text-indigo-600 hover:underline"
                >
                  Learn more →
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-10 border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        FrontEndFusion — CSS Flexbox Showcase
      </footer>
    </div>
  );
}
