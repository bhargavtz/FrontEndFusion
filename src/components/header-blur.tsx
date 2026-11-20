"use client";

import GradualBlur from "@/components/react-bits/GradualBlur";

/**
 * Soft, progressive blur under the sticky header so content fades as it
 * scrolls beneath it. Hidden at the top of the page (autoHide), decorative.
 */
export function HeaderBlur() {
  return (
    <GradualBlur
      target="page"
      position="top"
      height="7rem"
      strength={2}
      layers={6}
      curve="bezier"
      exponential
      opacity={1}
      autoHide
      zIndex={55}
      className="header-blur"
    />
  );
}
