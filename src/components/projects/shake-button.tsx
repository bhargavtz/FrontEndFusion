"use client";

import { useState } from "react";

export function ShakeButton() {
  const [animationKey, setAnimationKey] = useState(0);

  return (
    <button
      key={animationKey}
      type="button"
      className="shake-demo rounded-lg bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-200"
      onClick={() => setAnimationKey((value) => value + 1)}
    >
      Click to shake
    </button>
  );
}
