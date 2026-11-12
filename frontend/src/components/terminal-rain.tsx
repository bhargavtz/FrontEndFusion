"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "FrontEndFusionHTMLCSSJSReactNextTS";

type Drop = {
  x: number;
  y: number;
  speed: number;
  trail: number[];
  chars: string[];
};

export function TerminalRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const fontSize = 22;
    const columnWidth = 26;
    const trailLength = 18;

    let width = 0;
    let height = 0;
    let columns = 0;
    let drops: Drop[] = [];
    let raf = 0;
    let lastTime = 0;
    const fps = 30;
    const interval = 1000 / fps;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.font = `${fontSize}px var(--font-geist-mono, ui-monospace, monospace)`;
      ctx!.textBaseline = "top";

      columns = Math.floor(width / columnWidth);
      drops = Array.from({ length: columns }, (_, i) => ({
        x: i * columnWidth + (columnWidth - fontSize) / 2,
        y: Math.random() * -height,
        speed: 1.2 + Math.random() * 2.2,
        trail: [],
        chars: [],
      }));
    }

    function step(now: number) {
      raf = requestAnimationFrame(step);
      if (now - lastTime < interval) return;
      lastTime = now;

      ctx!.clearRect(0, 0, width, height);

      const isDark =
        document.documentElement.dataset.theme !== "light";
      const headColor = isDark ? "134, 239, 172" : "22, 163, 74";
      const trailColor = isDark ? "34, 197, 94" : "21, 128, 61";

      for (const drop of drops) {
        drop.y += drop.speed;
        drop.trail.unshift(drop.y);
        drop.chars.unshift(GLYPHS[Math.floor(Math.random() * GLYPHS.length)]);
        if (drop.trail.length > trailLength) {
          drop.trail.pop();
          drop.chars.pop();
        }

        for (let i = 0; i < drop.trail.length; i++) {
          const ty = drop.trail[i];
          if (ty < -fontSize || ty > height + fontSize) continue;
          const alpha = (1 - i / trailLength) * 0.9;
          ctx!.fillStyle = `rgba(${i === 0 ? headColor : trailColor}, ${alpha})`;
          ctx!.fillText(drop.chars[i], drop.x, ty);
        }

        if (drop.y > height + trailLength * fontSize) {
          drop.y = Math.random() * -height * 0.5;
          drop.trail = [];
          drop.chars = [];
          drop.speed = 1.2 + Math.random() * 2.2;
        }
      }
    }

    resize();
    raf = requestAnimationFrame(step);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        lastTime = 0;
        raf = requestAnimationFrame(step);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="terminal-rain pointer-events-none fixed inset-0 z-[1]"
    />
  );
}
