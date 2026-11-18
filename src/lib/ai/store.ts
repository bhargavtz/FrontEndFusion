"use client";

import { useSyncExternalStore } from "react";
import type { LearningContext, ProviderSettings } from "./types";
import { providers } from "./providers";

/* ── Learning context (what the learner is looking at) ───────────────── */

const emptyContext: LearningContext = { topic: "", location: "", language: "", code: "", selection: "" };
let context: LearningContext = emptyContext;
const contextListeners = new Set<() => void>();

export function setLearningContext(next: Partial<LearningContext>) {
  context = { ...context, ...next };
  contextListeners.forEach((l) => l());
}

export function clearLearningContext(location: string) {
  if (context.location === location) {
    context = emptyContext;
    contextListeners.forEach((l) => l());
  }
}

export function useLearningContext(): LearningContext {
  return useSyncExternalStore(
    (cb) => (contextListeners.add(cb), () => contextListeners.delete(cb)),
    () => context,
    () => emptyContext,
  );
}

/* ── Panel open state ─────────────────────────────────────────────────── */

let open = false;
const openListeners = new Set<() => void>();

export function setAssistantOpen(value: boolean) {
  open = value;
  openListeners.forEach((l) => l());
}

export function useAssistantOpen(): boolean {
  return useSyncExternalStore(
    (cb) => (openListeners.add(cb), () => openListeners.delete(cb)),
    () => open,
    () => false,
  );
}

/* ── Provider settings (sessionStorage by default; opt-in persistence) ── */

const KEY = "ffe-ai-settings";
const PERSIST_KEY = "ffe-ai-persist";

const defaults: ProviderSettings = {
  providerId: providers[0].id,
  apiKey: "",
  model: providers[0].defaultModel,
  baseUrl: "",
};

let settings: ProviderSettings = defaults;
let loaded = false;
const settingsListeners = new Set<() => void>();

function storage(persist: boolean): Storage | null {
  try {
    return persist ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

export function isPersisted(): boolean {
  try {
    return window.localStorage.getItem(PERSIST_KEY) === "1";
  } catch {
    return false;
  }
}

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  const raw = storage(isPersisted())?.getItem(KEY);
  if (raw) {
    try {
      settings = { ...defaults, ...JSON.parse(raw) };
    } catch {
      /* corrupted entry — fall back to defaults */
    }
  }
}

export function updateSettings(patch: Partial<ProviderSettings>, persist = isPersisted()) {
  load();
  settings = { ...settings, ...patch };
  storage(persist)?.setItem(KEY, JSON.stringify(settings));
  settingsListeners.forEach((l) => l());
}

/** Choose where the key lives. Turning persistence off wipes the stored copy. */
export function setPersistence(persist: boolean) {
  load();
  try {
    if (persist) {
      window.localStorage.setItem(PERSIST_KEY, "1");
      window.localStorage.setItem(KEY, JSON.stringify(settings));
    } else {
      window.localStorage.removeItem(PERSIST_KEY);
      window.localStorage.removeItem(KEY);
      window.sessionStorage.setItem(KEY, JSON.stringify(settings));
    }
  } catch {
    /* storage unavailable */
  }
  settingsListeners.forEach((l) => l());
}

export function clearSettings() {
  settings = defaults;
  try {
    window.localStorage.removeItem(KEY);
    window.sessionStorage.removeItem(KEY);
  } catch {
    /* storage unavailable */
  }
  settingsListeners.forEach((l) => l());
}

export function useAISettings(): ProviderSettings {
  return useSyncExternalStore(
    (cb) => {
      load();
      settingsListeners.add(cb);
      return () => settingsListeners.delete(cb);
    },
    () => {
      load();
      return settings;
    },
    () => defaults,
  );
}
