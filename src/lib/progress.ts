"use client";

import { useSyncExternalStore } from "react";

/**
 * Learning progress lives in this browser only (localStorage). There are no
 * accounts or servers; clearing site data resets it.
 */
const KEY = "ffe-progress-v1";
const EMPTY: ReadonlySet<string> = new Set();

let done: ReadonlySet<string> = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) done = new Set(JSON.parse(raw) as string[]);
  } catch {
    /* storage unavailable or corrupted */
  }
}

function emit() {
  listeners.forEach((l) => l());
}

export function toggleDone(id: string) {
  load();
  const next = new Set(done);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  done = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify([...next]));
  } catch {
    /* storage unavailable */
  }
  emit();
}

export function resetProgress() {
  done = EMPTY;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* storage unavailable */
  }
  emit();
}

export function useProgress(): ReadonlySet<string> {
  return useSyncExternalStore(
    (cb) => {
      load();
      listeners.add(cb);
      window.addEventListener("storage", cb);
      return () => {
        listeners.delete(cb);
        window.removeEventListener("storage", cb);
      };
    },
    () => {
      load();
      return done;
    },
    () => EMPTY,
  );
}
