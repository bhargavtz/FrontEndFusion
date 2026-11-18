"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { providers, getProvider } from "@/lib/ai/providers";
import {
  clearSettings,
  isPersisted,
  setAssistantOpen,
  setPersistence,
  updateSettings,
  useAISettings,
  useAssistantOpen,
  useLearningContext,
} from "@/lib/ai/store";
import { SYSTEM_PROMPT, buildUserPrompt, tasks, type AssistantTask } from "@/lib/ai/tasks";
import { AIError, type ChatMessage } from "@/lib/ai/types";

type Turn = {
  id: number;
  role: "user" | "assistant";
  /** What is shown. */
  display: string;
  /** What is sent to the model (includes the learning context for user turns). */
  content: string;
  error?: string;
};

let turnId = 0;

export function AssistantPanel() {
  const open = useAssistantOpen();
  const context = useLearningContext();
  const settings = useAISettings();
  const provider = getProvider(settings.providerId);

  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [persist, setPersist] = useState(() => typeof window !== "undefined" && isPersisted());

  const abort = useRef<AbortController | null>(null);
  const listEnd = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const hasCode = Boolean(context.selection || context.code);
  const configured = provider.needsBaseUrl ? Boolean(settings.baseUrl && settings.model) : Boolean(settings.apiKey);

  // Focus management: move focus in on open, restore it on close, close with Escape.
  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement as HTMLElement | null;
    panel.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setAssistantOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      returnFocus.current?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    listEnd.current?.scrollIntoView({ block: "end" });
  }, [turns]);

  async function send(task: AssistantTask | null, freeText: string) {
    if (busy) return;
    if (!configured) {
      setShowSettings(true);
      return;
    }

    const content = buildUserPrompt(task, freeText, context);
    const display = [task?.label, freeText.trim()].filter(Boolean).join(" — ");
    const userTurn: Turn = { id: ++turnId, role: "user", display, content };
    const assistantTurn: Turn = { id: ++turnId, role: "assistant", display: "", content: "" };
    const history = [...turns, userTurn];

    setTurns([...history, assistantTurn]);
    setInput("");
    setBusy(true);

    const controller = new AbortController();
    abort.current = controller;
    const messages: ChatMessage[] = history
      .filter((t) => !t.error && t.content)
      .map((t) => ({ role: t.role, content: t.content }));

    try {
      let text = "";
      for await (const delta of provider.stream({ system: SYSTEM_PROMPT, messages }, settings, controller.signal)) {
        text += delta;
        setTurns((prev) => prev.map((t) => (t.id === assistantTurn.id ? { ...t, display: text, content: text } : t)));
      }
    } catch (error) {
      const message = error instanceof AIError ? error.message : error instanceof Error ? error.message : "Something went wrong.";
      if (error instanceof AIError && error.kind === "auth") setShowSettings(true);
      setTurns((prev) => prev.map((t) => (t.id === assistantTurn.id ? { ...t, error: message } : t)));
    } finally {
      setBusy(false);
      abort.current = null;
    }
  }

  function stop() {
    abort.current?.abort();
  }

  if (!open) return null;

  return (
    <aside ref={panel} className="ai" role="complementary" aria-label="AI learning assistant">
      <header className="ai__head">
        <div>
          <h2>AI assistant</h2>
          <p className="ai__context" aria-live="polite">
            {context.topic ? (
              <>
                <strong>{context.topic}</strong>
                {context.selection
                  ? ` · ${context.selection.length} characters selected`
                  : context.code
                    ? " · whole example"
                    : " · no code selected"}
              </>
            ) : (
              "Open a lesson or code example to give me context."
            )}
          </p>
        </div>
        <div className="ai__head-actions">
          <button type="button" onClick={() => setShowSettings((v) => !v)} aria-expanded={showSettings} aria-controls="ai-settings">
            Settings
          </button>
          <button type="button" onClick={() => setAssistantOpen(false)} aria-label="Close assistant">
            ✕
          </button>
        </div>
      </header>

      {showSettings && (
        <form id="ai-settings" className="ai__settings" onSubmit={(e) => e.preventDefault()}>
          <label>
            Provider
            <select
              value={settings.providerId}
              onChange={(e) => {
                const next = getProvider(e.target.value);
                updateSettings({ providerId: next.id, model: next.defaultModel, baseUrl: next.defaultBaseUrl ?? "" });
              }}
            >
              {providers.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </label>
          <p className="ai__hint">{provider.description}</p>
          {provider.needsBaseUrl && (
            <label>
              Base URL
              <input value={settings.baseUrl} onChange={(e) => updateSettings({ baseUrl: e.target.value })} placeholder={provider.defaultBaseUrl} />
            </label>
          )}
          <label>
            Model
            <input value={settings.model} onChange={(e) => updateSettings({ model: e.target.value })} placeholder={provider.defaultModel || "model name"} />
          </label>
          <label>
            API key
            <input
              type="password"
              autoComplete="off"
              spellCheck={false}
              value={settings.apiKey}
              onChange={(e) => updateSettings({ apiKey: e.target.value })}
              placeholder={provider.needsBaseUrl ? "Optional for local servers" : "sk-ant-…"}
            />
          </label>
          <label className="ai__check">
            <input
              type="checkbox"
              checked={persist}
              onChange={(e) => {
                setPersist(e.target.checked);
                setPersistence(e.target.checked);
              }}
            />
            Remember on this device
          </label>
          <p className="ai__hint">
            Your key is stored only in this browser ({persist ? "localStorage" : "this tab's session"}) and sent directly to the provider. It never
            touches this site&apos;s servers. Use a key with a spend limit, and clear it on shared computers.
          </p>
          <button type="button" className="ai__link" onClick={() => (clearSettings(), setPersist(false))}>
            Clear saved key and settings
          </button>
        </form>
      )}

      <div className="ai__tasks" role="group" aria-label="Quick actions">
        {tasks.map((task) => (
          <button
            key={task.id}
            type="button"
            disabled={busy || (task.needsCode && !hasCode)}
            title={task.needsCode && !hasCode ? "Open a code example first" : undefined}
            onClick={() => send(task, "")}
          >
            {task.label}
          </button>
        ))}
      </div>

      <div className="ai__log" role="log" aria-live="polite" aria-relevant="additions text">
        {turns.length === 0 && (
          <div className="ai__empty">
            <p>Pick a quick action or ask a question. I can see the topic and the code you have selected.</p>
            {!configured && (
              <p>
                <button type="button" className="ai__link" onClick={() => setShowSettings(true)}>
                  Add an API key to start
                </button>
              </p>
            )}
          </div>
        )}
        {turns.map((turn) => (
          <article key={turn.id} className={`ai__turn ai__turn--${turn.role}`}>
            <h3 className="sr-only">{turn.role === "user" ? "You" : "Assistant"}</h3>
            {turn.role === "user" ? (
              <p>{turn.display}</p>
            ) : (
              <>
                {turn.display ? (
                  <div className="ai__md">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        a: ({ href, children }) => (
                          <a href={href} target="_blank" rel="noopener noreferrer">
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {turn.display}
                    </ReactMarkdown>
                  </div>
                ) : !turn.error ? (
                  <p className="ai__thinking">Thinking…</p>
                ) : null}
                {turn.error && (
                  <p className="ai__error" role="alert">
                    {turn.error}
                  </p>
                )}
              </>
            )}
          </article>
        ))}
        <div ref={listEnd} />
      </div>

      <form
        className="ai__composer"
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim()) send(null, input);
        }}
      >
        <label htmlFor="ai-input" className="sr-only">
          Ask a question
        </label>
        <textarea
          id="ai-input"
          data-autofocus
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (input.trim()) send(null, input);
            }
          }}
          placeholder="Ask about this topic or code…"
        />
        {busy ? (
          <button type="button" onClick={stop}>
            Stop
          </button>
        ) : (
          <button type="submit" disabled={!input.trim()}>
            Send
          </button>
        )}
      </form>
      <p className="ai__footnote">AI can be wrong. Verify against official docs and run the code yourself.</p>
    </aside>
  );
}
