import type { CSSProperties, ElementType, ReactElement } from "react";

/**
 * Types for the React Bits `SplitText` component added by the shadcn CLI.
 * The generated component is JavaScript, so this declaration gives the rest of
 * the TypeScript app accurate optional props without editing the upstream file.
 */
export type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: "chars" | "words" | "lines" | (string & {});
  from?: Record<string, unknown>;
  to?: Record<string, unknown>;
  threshold?: number;
  rootMargin?: string;
  textAlign?: CSSProperties["textAlign"];
  tag?: ElementType;
  staggerFrom?: "start" | "center" | "end" | "edges" | "random" | number;
  mask?: boolean;
  effect?: "fade" | "blur" | "flip" | "pop" | "skew" | "wave" | "rise";
  trigger?: "view" | "load" | "hover" | "click";
  loop?: boolean;
  loopDelay?: number;
  hoverEffect?: "none" | "lift" | "wave";
  color?: string;
  accentColor?: string;
  aria?: "auto" | "hidden" | "none";
  onLetterAnimationComplete?: () => void;
};

export default function SplitText(props: SplitTextProps): ReactElement;
