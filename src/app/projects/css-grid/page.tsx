import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CSS Grid Showcase",
  description:
    "Named template areas, magazine layouts, auto-fill, and alignment demos for CSS Grid.",
};

const demoStyles = `
.grid-demo {
  --gx-primary: #0ea5e9;
  --gx-secondary: #06b6d4;
  --gx-cell-bg: #e0f2fe;
  --gx-cell-text: #0369a1;
  background: #f8fafc;
  color: #111827;
  min-height: 100vh;
}
.grid-demo .gx-cell {
  background: var(--gx-cell-bg);
  color: var(--gx-cell-text);
  font-weight: 600;
  font-size: .875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 12px;
  min-height: 56px;
  transition: background .2s;
}
.grid-demo .gx-cell:hover { background: #bae6fd; }
.grid-demo .gx-demo {
  background: #f0f9ff;
  border: 2px dashed #bae6fd;
  border-radius: 12px;
  padding: 12px;
  gap: 8px;
}
.grid-demo .gx-title {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(to right, var(--gx-primary), var(--gx-secondary));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}
.grid-demo .gx-badge {
  display: inline-block;
  background: var(--gx-primary);
  color: white;
  font-size: .7rem;
  font-family: var(--font-geist-mono), monospace;
  padding: 2px 8px;
  border-radius: 4px;
  margin-left: 6px;
}
.grid-demo .gx-magazine {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 200px 150px 180px;
  gap: 12px;
}
.grid-demo .mag-hero { grid-column: 1 / 3; grid-row: 1 / 3; }
.grid-demo .mag-side1 { grid-column: 3 / 5; grid-row: 1; }
.grid-demo .mag-side2 { grid-column: 3; grid-row: 2; }
.grid-demo .mag-side3 { grid-column: 4; grid-row: 2; }
.grid-demo .mag-bottom1 { grid-column: 1; grid-row: 3; }
.grid-demo .mag-bottom2 { grid-column: 2; grid-row: 3; }
.grid-demo .mag-bottom3 { grid-column: 3 / 5; grid-row: 3; }
.grid-demo .gx-dashboard {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "sidebar widget1 widget2"
    "footer footer footer";
  grid-template-columns: 180px 1fr 1fr;
  grid-template-rows: 60px 140px 100px 50px;
  gap: 10px;
}
.grid-demo .dash-header { grid-area: header; }
.grid-demo .dash-sidebar { grid-area: sidebar; }
.grid-demo .dash-main { grid-area: main; }
.grid-demo .dash-w1 { grid-area: widget1; }
.grid-demo .dash-w2 { grid-area: widget2; }
.grid-demo .dash-footer { grid-area: footer; }
@media (max-width: 640px) {
  .grid-demo .gx-magazine {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
  }
  .grid-demo .mag-hero { grid-column: 1 / 3; grid-row: auto; }
  .grid-demo .mag-side1 { grid-column: 1 / 3; grid-row: auto; }
  .grid-demo .mag-side2,
  .grid-demo .mag-side3,
  .grid-demo .mag-bottom1,
  .grid-demo .mag-bottom2 { grid-column: auto; grid-row: auto; }
  .grid-demo .mag-bottom3 { grid-column: 1 / 3; grid-row: auto; }
  .grid-demo .gx-dashboard {
    grid-template-areas:
      "header"
      "main"
      "widget1"
      "widget2"
      "sidebar"
      "footer";
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
}
`;

const basicGrids = [
  {
    label: "3 equal columns",
    value: "repeat(3, 1fr)",
    style: { gridTemplateColumns: "repeat(3, 1fr)" },
    cells: ["1", "2", "3", "4", "5", "6"],
  },
  {
    label: "Fixed + fluid",
    value: "200px 1fr 1fr",
    style: { gridTemplateColumns: "200px 1fr 1fr" },
    cells: ["200px", "1fr", "1fr"],
  },
  {
    label: "Auto-fill responsive",
    value: "repeat(auto-fill, minmax(130px, 1fr))",
    style: { gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))" },
    cells: ["A", "B", "C", "D", "E"],
  },
];

const gapDemos = [
  {
    value: "4px",
    style: { gridTemplateColumns: "repeat(3, 1fr)", gap: 4 },
  },
  {
    value: "24px 8px",
    note: "(row col)",
    style: { gridTemplateColumns: "repeat(3, 1fr)", gap: "24px 8px" },
  },
];

const alignDemos = [
  { value: "start", style: { justifyItems: "start" as const } },
  { value: "center", style: { justifyItems: "center" as const } },
  { value: "stretch", style: { justifyItems: "stretch" as const } },
];

export default function Page() {
  return (
    <div className="grid-demo">
      <style>{demoStyles}</style>

      <header className="bg-sky-600 px-6 py-10 text-center text-white">
        <h1 className="mb-2 text-3xl font-bold">CSS Grid Showcase</h1>
        <p className="mx-auto max-w-xl text-sm text-sky-200">
          Visual demos of CSS Grid — from basics to magazine layouts and named
          template areas.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block text-sm text-sky-300 underline hover:text-white"
        >
          ← Back to Hub
        </Link>
      </header>

      <main className="mx-auto max-w-4xl space-y-14 px-6 py-10">
        <section>
          <h2 className="gx-title mb-1">grid-template-columns</h2>
          <p className="mb-6 text-sm text-gray-500">
            Define the number and size of columns.
          </p>
          <div className="space-y-5">
            {basicGrids.map((grid) => (
              <div key={grid.value}>
                <p className="mb-2 text-sm font-medium text-gray-700">
                  {grid.label}: <span className="gx-badge">{grid.value}</span>
                </p>
                <div className="gx-demo" style={{ display: "grid", ...grid.style }}>
                  {grid.cells.map((cell, index) => (
                    <div key={`${grid.value}-${index}`} className="gx-cell">
                      {cell}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="gx-title mb-1">gap</h2>
          <p className="mb-6 text-sm text-gray-500">
            Spacing between rows and columns.{" "}
            <code className="rounded bg-gray-100 px-1 text-xs">gap: row col</code>{" "}
            or a single value for both.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {gapDemos.map((demo) => (
              <div key={demo.value}>
                <p className="mb-2 text-sm font-medium text-gray-700">
                  gap: <span className="gx-badge">{demo.value}</span>{" "}
                  {demo.note}
                </p>
                <div className="gx-demo" style={{ display: "grid", ...demo.style }}>
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="gx-cell">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="gx-title mb-1">grid-column & grid-row span</h2>
          <p className="mb-6 text-sm text-gray-500">
            Make items span multiple columns or rows.
          </p>
          <div
            className="gx-demo"
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}
          >
            <div
              className="gx-cell"
              style={{
                gridColumn: "span 2 / span 2",
                background: "#bfdbfe",
                color: "#1e40af",
              }}
            >
              span 2 cols
            </div>
            <div className="gx-cell">3</div>
            <div className="gx-cell">4</div>
            <div className="gx-cell">5</div>
            <div
              className="gx-cell"
              style={{
                gridColumn: "span 3 / span 3",
                background: "#bbf7d0",
                color: "#166534",
              }}
            >
              span 3 cols
            </div>
            <div
              className="gx-cell"
              style={{
                gridColumn: 1,
                gridRow: "span 2 / span 2",
                background: "#fde68a",
                color: "#92400e",
              }}
            >
              row span 2
            </div>
            {["B", "C", "D", "E", "F", "G"].map((label) => (
              <div key={label} className="gx-cell">
                {label}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="gx-title mb-1">Named Template Areas — Dashboard</h2>
          <p className="mb-2 text-sm text-gray-500">
            <code className="rounded bg-gray-100 px-1 text-xs">
              grid-template-areas
            </code>{" "}
            lets you draw your layout visually in CSS.
          </p>
          <pre className="mb-5 overflow-x-auto rounded-xl bg-gray-900 p-4 text-xs text-green-400">
            <code>{`grid-template-areas:
  "header  header  header"
  "sidebar main    main"
  "sidebar widget1 widget2"
  "footer  footer  footer";`}</code>
          </pre>
          <div className="gx-dashboard">
            <div
              className="gx-cell dash-header"
              style={{ background: "#dbeafe", color: "#1e40af" }}
            >
              Header
            </div>
            <div
              className="gx-cell dash-sidebar"
              style={{
                background: "#f3e8ff",
                color: "#7e22ce",
                writingMode: "vertical-lr",
                textAlign: "center",
              }}
            >
              Sidebar
            </div>
            <div
              className="gx-cell dash-main"
              style={{ background: "#dcfce7", color: "#166534" }}
            >
              Main Content
            </div>
            <div
              className="gx-cell dash-w1"
              style={{ background: "#fef9c3", color: "#854d0e" }}
            >
              Widget 1
            </div>
            <div
              className="gx-cell dash-w2"
              style={{ background: "#ffe4e6", color: "#9f1239" }}
            >
              Widget 2
            </div>
            <div
              className="gx-cell dash-footer"
              style={{ background: "#f1f5f9", color: "#475569" }}
            >
              Footer
            </div>
          </div>
        </section>

        <section>
          <h2 className="gx-title mb-1">Magazine Layout</h2>
          <p className="mb-5 text-sm text-gray-500">
            A classic editorial grid using explicit line placement.
          </p>
          <div className="gx-magazine">
            <div
              className="gx-cell mag-hero"
              style={{ background: "#dbeafe", color: "#1d4ed8", fontSize: "1rem" }}
            >
              Hero Story
              <br />
              <span className="text-xs font-normal opacity-60">
                col 1–2 · row 1–2
              </span>
            </div>
            <div
              className="gx-cell mag-side1"
              style={{ background: "#fce7f3", color: "#9d174d" }}
            >
              Feature A
            </div>
            <div
              className="gx-cell mag-side2"
              style={{ background: "#dcfce7", color: "#166534" }}
            >
              Feature B
            </div>
            <div
              className="gx-cell mag-side3"
              style={{ background: "#fef9c3", color: "#854d0e" }}
            >
              Feature C
            </div>
            <div
              className="gx-cell mag-bottom1"
              style={{ background: "#ede9fe", color: "#5b21b6" }}
            >
              Article 1
            </div>
            <div
              className="gx-cell mag-bottom2"
              style={{ background: "#ffedd5", color: "#9a3412" }}
            >
              Article 2
            </div>
            <div
              className="gx-cell mag-bottom3 text-sm"
              style={{ background: "#e0f2fe", color: "#0369a1" }}
            >
              Wide Article — col 3–4
            </div>
          </div>
        </section>

        <section>
          <h2 className="gx-title mb-1">Alignment in Grid</h2>
          <p className="mb-6 text-sm text-gray-500">
            Control how items sit inside their grid cells.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {alignDemos.map((demo) => (
              <div key={demo.value}>
                <p className="mb-2 text-sm font-medium text-gray-700">
                  justify-items: <span className="gx-badge">{demo.value}</span>
                </p>
                <div
                  className="gx-demo"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    height: 100,
                    ...demo.style,
                  }}
                >
                  <div
                    className="gx-cell"
                    style={demo.value === "stretch" ? undefined : { width: 60 }}
                  >
                    A
                  </div>
                  <div
                    className="gx-cell"
                    style={demo.value === "stretch" ? undefined : { width: 60 }}
                  >
                    B
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-10 border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        FrontEndFusion — CSS Grid Showcase
      </footer>
    </div>
  );
}
