"use client";

import { useRef } from "react";
import VariableProximity from "@/components/react-bits/VariableProximity";

/**
 * Page title whose letters swell in weight and size as the cursor comes near
 * (React Bits VariableProximity). Renders the page's single <h1>; the real
 * text is exposed to screen readers by the component itself.
 */
export function ProximityTitle({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  return (
    <h1 ref={ref} className="proximity-title">
      <VariableProximity
        label={text}
        containerRef={ref}
        fromFontVariationSettings="'wght' 600, 'opsz' 40"
        toFontVariationSettings="'wght' 1000, 'opsz' 96"
        radius={150}
        falloff="exponential"
        smoothing={0.25}
        toColor="var(--secondary)"
        scale={1.06}
        lift={0.04}
      />
    </h1>
  );
}
