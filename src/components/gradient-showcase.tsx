"use client";

import { useState } from "react";
import GradientASCII from "@/components/react-bits/gradient-ascii";

const shapes = [
  { id: "horizon", label: "Horizon" },
  { id: "pinch", label: "Pinch" },
  { id: "rise", label: "Rise" },
  { id: "eclipse", label: "Eclipse" },
] as const;

const palettes = [
  {
    id: "verdant",
    label: "Verdant",
    colors: ["#0b3b24", "#16a34a", "#86efac", "#e0f2fe"],
  },
  {
    id: "aurora",
    label: "Aurora",
    colors: ["#0f172a", "#4f46e5", "#c084fc", "#67e8f9"],
  },
  {
    id: "ember",
    label: "Ember",
    colors: ["#3b0a02", "#b91c1c", "#f59e0b", "#fde68a"],
  },
  {
    id: "ice",
    label: "Ice",
    colors: ["#0c2b3a", "#0ea5e9", "#a5f3fc", "#f0f9ff"],
  },
] as const;

const densities = [
  { id: "airy", label: "Airy", value: 0.55 },
  { id: "balanced", label: "Balanced", value: 0.8 },
  { id: "dense", label: "Dense", value: 0.95 },
] as const;

type ShapeId = (typeof shapes)[number]["id"];
type PaletteId = (typeof palettes)[number]["id"];
type DensityId = (typeof densities)[number]["id"];

export function GradientShowcase() {
  const [shape, setShape] = useState<ShapeId>("eclipse");
  const [paletteId, setPaletteId] = useState<PaletteId>("verdant");
  const [densityId, setDensityId] = useState<DensityId>("balanced");

  const palette =
    palettes.find((item) => item.id === paletteId) ?? palettes[0];
  const density =
    densities.find((item) => item.id === densityId) ?? densities[1];
  const shapeLabel =
    shapes.find((item) => item.id === shape)?.label ?? "Horizon";

  return (
    <div className="ascii-lab">
      <div className="ascii-stage">
        <GradientASCII
          colors={[...palette.colors]}
          shape={shape}
          characters=" .,:;+*#%@"
          cellSize={16}
          density={density.value}
          glyphOpacity={0.9}
          gradientOpacity={0.85}
          glow={0.5}
          flicker={0.25}
          softness={0.55}
          scale={1.6}
          flow={0.6}
          speed={0.9}
          grain={0.2}
          variation={1}
          clickEffect="wave"
          intro
          fontFamily='"Geist Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
        />

        <div className="ascii-stage-bar">
          <span className="ascii-live-dot" aria-hidden="true" />
          <span className="ascii-stage-label">GradientASCII</span>
          <span className="ascii-stage-meta">
            {shapeLabel} · {palette.label}
          </span>
        </div>

        <p className="ascii-hint" aria-hidden="true">
          Move the cursor · click to send a wave
        </p>
      </div>

      <div className="ascii-panel">
        <div className="ascii-group">
          <p className="ascii-group-label" id="ascii-shape-label">
            Light shape
          </p>
          <div
            className="ascii-options"
            role="group"
            aria-labelledby="ascii-shape-label"
          >
            {shapes.map((item) => (
              <button
                key={item.id}
                type="button"
                className="ascii-chip"
                aria-pressed={shape === item.id}
                onClick={() => setShape(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="ascii-group">
          <p className="ascii-group-label" id="ascii-palette-label">
            Palette
          </p>
          <div
            className="ascii-options"
            role="group"
            aria-labelledby="ascii-palette-label"
          >
            {palettes.map((item) => (
              <button
                key={item.id}
                type="button"
                className="ascii-chip ascii-chip-swatch"
                aria-pressed={paletteId === item.id}
                onClick={() => setPaletteId(item.id)}
              >
                <span className="ascii-dots" aria-hidden="true">
                  {item.colors.slice(1).map((color) => (
                    <span
                      key={color}
                      className="ascii-dot"
                      style={{ background: color }}
                    />
                  ))}
                </span>
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="ascii-group">
          <p className="ascii-group-label" id="ascii-density-label">
            Density
          </p>
          <div
            className="ascii-options"
            role="group"
            aria-labelledby="ascii-density-label"
          >
            {densities.map((item) => (
              <button
                key={item.id}
                type="button"
                className="ascii-chip"
                aria-pressed={densityId === item.id}
                onClick={() => setDensityId(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <p className="ascii-panel-note">
          WebGL2 ASCII light field from{" "}
          <a
            href="https://reactbits.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Bits
          </a>
          . Rendered locally in a canvas — no images, no tracking.
        </p>
      </div>
    </div>
  );
}
