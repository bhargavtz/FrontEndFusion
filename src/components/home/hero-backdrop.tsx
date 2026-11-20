"use client";

import FaultyTerminal from "@/components/react-bits/FaultyTerminal";
import { useSiteTheme } from "@/lib/use-site-theme";

/**
 * Decorative CRT terminal behind the home hero. The canvas is aria-hidden,
 * pauses off screen, and freezes under prefers-reduced-motion (handled in
 * FaultyTerminal). A scrim keeps the hero text readable.
 */
export function HeroBackdrop() {
  const theme = useSiteTheme();
  const light = theme === "light";

  return (
    <div className="hero__backdrop" aria-hidden="true">
      <FaultyTerminal
        key={theme}
        className="hero__terminal"
        tint={light ? "#15803d" : "#22c55e"}
        lightMode={light}
        scale={1.6}
        gridMul={[2, 1]}
        digitSize={1.3}
        timeScale={0.35}
        scanlineIntensity={0.4}
        glitchAmount={0.8}
        flickerAmount={0.7}
        curvature={0.12}
        brightness={light ? 0.9 : 0.55}
        glyphs="blocks"
        mouseReact
        mouseStrength={0.35}
        vignette={0.4}
        clickEffect="glitch"
      />
      <div className="hero__scrim" />
    </div>
  );
}
