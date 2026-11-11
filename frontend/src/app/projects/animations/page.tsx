import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ShakeButton } from "@/components/projects/shake-button";

export const metadata: Metadata = {
  title: "Animations Demo",
  description:
    "Transitions, loaders, flip cards, progress bars, typewriter, and keyframe animation patterns in CSS.",
};

const demoStyles = `
.anim-demo {
  --an-pink: #ec4899;
  --an-violet: #8b5cf6;
  --an-cyan: #06b6d4;
  --an-green: #10b981;
  background: #f8fafc;
  color: #111827;
  min-height: 100vh;
}
.anim-demo .an-title {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(to right, var(--an-pink), var(--an-violet));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}
.anim-demo .card-lift {
  transition: transform .25s ease, box-shadow .25s ease;
}
.anim-demo .card-lift:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(0,0,0,.12);
}
.anim-demo .btn-ripple {
  position: relative;
  overflow: hidden;
  transition: background .2s;
}
.anim-demo .btn-ripple::after {
  content: '';
  position: absolute;
  inset: 50%;
  background: rgba(255,255,255,.35);
  border-radius: 50%;
  transform: scale(0);
  transition: transform .5s ease, opacity .5s;
  opacity: 0;
}
.anim-demo .btn-ripple:active::after {
  inset: 0;
  transform: scale(1);
  opacity: 1;
  transition: 0s;
}
@keyframes anim-fade-in-up {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes anim-pulse-ring {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(2.4); opacity: 0; }
}
@keyframes anim-bounce {
  0%, 100% { transform: translateY(0); animation-timing-function: cubic-bezier(.8,0,1,1); }
  50% { transform: translateY(-28px); animation-timing-function: cubic-bezier(0,0,.2,1); }
}
@keyframes anim-spin {
  to { transform: rotate(360deg); }
}
@keyframes anim-shimmer {
  from { background-position: -200% 0; }
  to { background-position: 200% 0; }
}
@keyframes anim-typewriter {
  from { width: 0; }
  to { width: 100%; }
}
@keyframes anim-blink {
  0%, 100% { border-color: transparent; }
  50% { border-color: var(--an-violet); }
}
@keyframes anim-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}
@keyframes anim-shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-8px); }
  40% { transform: translateX(8px); }
  60% { transform: translateX(-6px); }
  80% { transform: translateX(6px); }
}
@keyframes anim-fill-bar {
  from { width: 0; }
  to { width: var(--target); }
}
.anim-demo .fade-in-up { animation: anim-fade-in-up .6s ease both; }
.anim-demo .bounce-demo { animation: anim-bounce 1s infinite; }
.anim-demo .spin-demo { animation: anim-spin 1s linear infinite; }
.anim-demo .float-demo { animation: anim-float 3s ease-in-out infinite; }
.anim-demo .shake-demo { animation: anim-shake .5s ease; }
.anim-demo .pulse-dot {
  position: relative;
  width: 14px; height: 14px;
  background: #22c55e;
  border-radius: 50%;
}
.anim-demo .pulse-dot::before {
  content: '';
  position: absolute;
  inset: 0;
  background: #22c55e;
  border-radius: 50%;
  animation: anim-pulse-ring 1.5s ease-out infinite;
}
.anim-demo .skeleton-line {
  background: linear-gradient(90deg, #e2e8f0 25%, #f8fafc 50%, #e2e8f0 75%);
  background-size: 200% 100%;
  animation: anim-shimmer 1.5s infinite;
  border-radius: 4px;
}
.anim-demo .typewriter-text {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  border-right: 3px solid var(--an-violet);
  width: 100%;
  animation: anim-typewriter 2.5s steps(30, end) both, anim-blink .75s step-end infinite;
}
.anim-demo .underline-hover {
  position: relative;
  display: inline-block;
  text-decoration: none;
  font-weight: 600;
  color: var(--an-violet);
}
.anim-demo .underline-hover::after {
  content: '';
  position: absolute;
  left: 0; bottom: -2px;
  width: 100%; height: 2px;
  background: var(--an-violet);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform .3s ease;
}
.anim-demo .underline-hover:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
.anim-demo .flip-card { perspective: 800px; }
.anim-demo .flip-inner {
  position: relative;
  transform-style: preserve-3d;
  transition: transform .6s;
  height: 120px;
}
.anim-demo .flip-card:hover .flip-inner { transform: rotateY(180deg); }
.anim-demo .flip-front,
.anim-demo .flip-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-weight: 600;
}
.anim-demo .flip-back { transform: rotateY(180deg); }
.anim-demo .progress-bar {
  animation: anim-fill-bar 1.5s cubic-bezier(.4,0,.2,1) both;
  animation-delay: .3s;
}
.anim-demo .stagger-1 { animation-delay: 0s; }
.anim-demo .stagger-2 { animation-delay: .1s; }
.anim-demo .stagger-3 { animation-delay: .2s; }
.anim-demo .stagger-4 { animation-delay: .3s; }
`;

const entranceCards = [
  { icon: "📐", label: "HTML" },
  { icon: "🎨", label: "CSS" },
  { icon: "⚡", label: "JavaScript" },
  { icon: "♿", label: "A11y" },
];

const progressBars = [
  { label: "HTML", value: 90, color: "#fb923c", delay: "0.3s" },
  { label: "CSS", value: 85, color: "#3b82f6", delay: "0.5s" },
  { label: "JavaScript", value: 70, color: "#facc15", delay: "0.7s" },
  { label: "Accessibility", value: 80, color: "#22c55e", delay: "0.9s" },
];

export default function Page() {
  return (
    <div className="anim-demo">
      <style>{demoStyles}</style>

      <header
        className="px-6 py-10 text-center"
        style={{ background: "linear-gradient(135deg, #8b5cf6, #ec4899)" }}
      >
        <h1 className="mb-2 text-3xl font-bold text-white">
          CSS Animations Showcase
        </h1>
        <p className="mx-auto max-w-xl text-sm text-purple-100">
          Transitions, keyframe animations, hover effects, and real-world UI
          patterns — all in pure CSS.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block text-sm text-purple-200 underline hover:text-white"
        >
          ← Back to Hub
        </Link>
      </header>

      <main className="mx-auto max-w-4xl space-y-14 px-6 py-10">
        <section>
          <h2 className="an-title mb-1">CSS Transitions</h2>
          <p className="mb-6 text-sm text-gray-500">
            Smooth property changes on hover or state change.
          </p>
          <div className="flex flex-wrap items-start gap-5">
            <div className="card-lift w-44 cursor-pointer rounded-xl bg-white p-5 text-center shadow">
              <div className="mb-2 text-2xl" aria-hidden="true">
                🚀
              </div>
              <p className="text-sm font-medium text-gray-700">Hover to lift</p>
              <p className="mt-1 text-xs text-gray-500">
                transform + box-shadow
              </p>
            </div>

            <div
              className="group relative w-44 cursor-pointer overflow-hidden rounded-xl bg-white p-5 text-center shadow"
              style={{ transition: "background .4s ease" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-pink-500 opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="mb-2 text-2xl" aria-hidden="true">
                  🎨
                </div>
                <p className="text-sm font-medium text-gray-700 transition-colors duration-300 group-hover:text-white">
                  Hover for color
                </p>
                <p className="mt-1 text-xs text-gray-500 transition-colors duration-300 group-hover:text-purple-100">
                  opacity transition
                </p>
              </div>
            </div>

            <div className="w-44 cursor-pointer rounded-xl bg-white p-5 text-center shadow transition-transform duration-300 hover:scale-110">
              <div className="mb-2 text-2xl" aria-hidden="true">
                🔍
              </div>
              <p className="text-sm font-medium text-gray-700">
                Hover to scale
              </p>
              <p className="mt-1 text-xs text-gray-500">scale(1.1)</p>
            </div>

            <button
              type="button"
              className="btn-ripple cursor-pointer rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white shadow hover:bg-violet-700"
            >
              Click me (ripple)
            </button>
          </div>
        </section>

        <section>
          <h2 className="an-title mb-1">Loading Indicators</h2>
          <p className="mb-6 text-sm text-gray-500">
            Common loading UI patterns using CSS animations.
          </p>
          <div className="flex flex-wrap items-center gap-8">
            <div className="text-center">
              <div className="spin-demo mx-auto h-10 w-10 rounded-full border-4 border-violet-200 border-t-violet-600" />
              <p className="mt-3 text-xs text-gray-500">Spinner</p>
            </div>
            <div className="text-center">
              <div className="flex h-10 items-center justify-center">
                <div className="pulse-dot" />
              </div>
              <p className="mt-3 text-xs text-gray-500">Pulse dot</p>
            </div>
            <div className="text-center">
              <div className="flex h-10 items-end justify-center gap-1.5">
                <div className="bounce-demo stagger-1 h-2.5 w-2.5 rounded-full bg-pink-500" />
                <div className="bounce-demo stagger-2 h-2.5 w-2.5 rounded-full bg-violet-500" />
                <div className="bounce-demo stagger-3 h-2.5 w-2.5 rounded-full bg-cyan-500" />
              </div>
              <p className="mt-3 text-xs text-gray-500">Staggered bounce</p>
            </div>
            <div className="w-48 rounded-xl bg-white p-4 shadow">
              <div className="skeleton-line mb-2 h-3 w-3/4" />
              <div className="skeleton-line mb-2 h-3 w-full" />
              <div className="skeleton-line mb-3 h-3 w-5/6" />
              <div className="skeleton-line h-8 w-full rounded-lg" />
              <p className="mt-2 text-center text-xs text-gray-500">
                Skeleton shimmer
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="an-title mb-1">Entrance Animations</h2>
          <p className="mb-6 text-sm text-gray-500">
            Staggered fade-in-up on page load.
          </p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {entranceCards.map((card, index) => (
              <div
                key={card.label}
                className={`fade-in-up stagger-${index + 1} rounded-xl bg-white p-4 text-center shadow`}
              >
                <div className="mb-1 text-xl" aria-hidden="true">
                  {card.icon}
                </div>
                <p className="text-sm font-medium text-gray-700">{card.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="an-title mb-1">Text Effects</h2>
          <div className="space-y-6">
            <div className="rounded-xl bg-white p-5 shadow">
              <p className="mb-2 font-mono text-xs text-gray-500">
                typewriter effect
              </p>
              <p className="typewriter-text font-mono text-lg font-medium text-gray-800">
                Building the web, one line at a time.
              </p>
            </div>
            <div className="flex flex-wrap gap-6 rounded-xl bg-white p-5 shadow">
              <a href="#" className="underline-hover">
                Learn HTML
              </a>
              <a
                href="#"
                className="underline-hover"
                style={{ color: "var(--an-pink)", "--an-violet": "var(--an-pink)" } as CSSProperties}
              >
                Master CSS
              </a>
              <a
                href="#"
                className="underline-hover"
                style={{ color: "var(--an-cyan)", "--an-violet": "var(--an-cyan)" } as CSSProperties}
              >
                Explore JavaScript
              </a>
            </div>
          </div>
        </section>

        <section>
          <h2 className="an-title mb-1">3D Flip Card</h2>
          <p className="mb-6 text-sm text-gray-500">
            Hover over the card to see a 3D perspective flip.
          </p>
          <div className="flex flex-wrap gap-5">
            <div className="flip-card w-44 cursor-pointer">
              <div className="flip-inner">
                <div className="flip-front bg-violet-600 text-white">
                  <div className="text-center">
                    <div className="text-2xl" aria-hidden="true">
                      🃏
                    </div>
                    <p className="mt-1 text-sm">Hover me</p>
                  </div>
                </div>
                <div className="flip-back bg-pink-500 text-white">
                  <div className="text-center">
                    <p className="px-3 text-sm font-medium">
                      CSS 3D transforms are awesome!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flip-card w-44 cursor-pointer">
              <div className="flip-inner">
                <div className="flip-front bg-cyan-500 text-white">
                  <div className="text-center">
                    <div className="text-2xl" aria-hidden="true">
                      🌍
                    </div>
                    <p className="mt-1 text-sm">Front</p>
                  </div>
                </div>
                <div className="flip-back bg-green-500 text-white">
                  <div className="text-center">
                    <p className="px-3 text-sm font-medium">
                      Back side reveals here!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="an-title mb-1">More Keyframe Patterns</h2>
          <div className="flex flex-wrap items-center gap-8">
            <div className="text-center">
              <div className="float-demo text-4xl" aria-hidden="true">
                🎈
              </div>
              <p className="mt-3 text-xs text-gray-500">Float</p>
            </div>
            <div className="text-center">
              <ShakeButton />
              <p className="mt-2 text-xs text-gray-500">
                Re-triggers on click
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="an-title mb-1">Animated Progress Bars</h2>
          <p className="mb-6 text-sm text-gray-500">
            Bars animate to target width on page load.
          </p>
          <div className="space-y-4 rounded-xl bg-white p-6 shadow">
            {progressBars.map((bar) => (
              <div key={bar.label}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium text-gray-700">{bar.label}</span>
                  <span className="text-gray-500">{bar.value}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="progress-bar h-full rounded-full"
                    style={
                      {
                        width: `${bar.value}%`,
                        background: bar.color,
                        animationDelay: bar.delay,
                        "--target": `${bar.value}%`,
                      } as CSSProperties
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-10 border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        FrontEndFusion — CSS Animations Showcase
      </footer>
    </div>
  );
}
