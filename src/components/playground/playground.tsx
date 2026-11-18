"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CodeEditor } from "./code-editor";
import { buildSrcDoc, runnability, type SandboxMessage } from "@/lib/sandbox";
import { setAssistantOpen, setLearningContext, clearLearningContext } from "@/lib/ai/store";

export type PlaygroundProps = {
  title: string;
  language: string;
  code: string;
  /** Markup the CSS is applied to (CSS examples only). */
  markup?: string;
  /** Line-by-line / step-by-step notes explaining the output. */
  explanation?: string[];
  /** Used by the AI assistant to understand what the learner is studying. */
  topic: string;
  /** Unique id for this example on the page. */
  id: string;
  /** Start in the preview tab on narrow screens. */
  previewFirst?: boolean;
};

type LogLine = { level: "log" | "info" | "warn" | "error"; text: string };

let tokenCounter = 0;
const nextToken = () => `t${Date.now().toString(36)}${(tokenCounter++).toString(36)}`;

export function Playground({ title, language, code: initialCode, markup, explanation, topic, id, previewFirst }: PlaygroundProps) {
  const [code, setCode] = useState(initialCode);
  const [selection, setSelection] = useState("");
  const [srcDoc, setSrcDoc] = useState("");
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [status, setStatus] = useState<"idle" | "running" | "ready">("idle");
  const [copied, setCopied] = useState<"" | "all" | "selection">("");
  const [pane, setPane] = useState<"code" | "preview">(previewFirst ? "preview" : "code");
  const [visible, setVisible] = useState(false);

  const root = useRef<HTMLElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const token = useRef("");
  const location = `playground:${id}`;

  const canRun = useMemo(() => runnability(language, code), [language, code]);
  const dirty = code !== initialCode;

  // Only boot iframes (and CDN downloads) for examples the learner has scrolled to.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const run = useCallback(() => {
    if (!runnability(language, code).ok) return;
    token.current = nextToken();
    setLogs([]);
    setStatus("running");
    setSrcDoc(buildSrcDoc({ language, code, markup, token: token.current }));
  }, [language, code, markup]);

  // Run on first visibility, then re-run shortly after the learner stops typing.
  const firstRun = useRef(true);
  useEffect(() => {
    if (!visible) return;
    const delay = firstRun.current ? 0 : 700;
    firstRun.current = false;
    const timer = window.setTimeout(run, delay);
    return () => window.clearTimeout(timer);
  }, [visible, run]);

  // Receive console output / errors — only from this example's frame and run token.
  useEffect(() => {
    function onMessage(event: MessageEvent<SandboxMessage>) {
      const data = event.data;
      if (!data || data.source !== "ffe-sandbox") return;
      if (event.source !== frame.current?.contentWindow) return;
      if (data.token !== token.current) return;
      if (data.type === "ready") setStatus("ready");
      else if (data.type === "log") setLogs((prev) => [...prev.slice(-199), { level: data.level, text: data.text }]);
      else if (data.type === "error") setLogs((prev) => [...prev.slice(-199), { level: "error", text: data.text }]);
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  // Tell the assistant what this example is (code, language, selection).
  const publishContext = useCallback(
    (nextSelection: string) =>
      setLearningContext({ topic, location, language, code, selection: nextSelection }),
    [topic, location, language, code],
  );
  useEffect(() => () => clearLearningContext(location), [location]);

  // Offer this example to the assistant as soon as the learner reaches it.
  useEffect(() => {
    if (visible) publishContext("");
    // Only on first reveal; later edits publish through focus/selection handlers.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  async function copy(text: string, which: "all" | "selection") {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(which);
      window.setTimeout(() => setCopied(""), 1600);
    } catch {
      setCopied("");
    }
  }

  function askAI() {
    publishContext(selection);
    setAssistantOpen(true);
  }

  return (
    <section ref={root} className="pg" aria-label={`${title} — code playground`} data-playground={id}>
      <header className="pg__bar">
        <div className="pg__title">
          <span className="pg__lang">{language}</span>
          <h3>{title}</h3>
          {dirty && <span className="pg__dirty">edited</span>}
        </div>
        <div className="pg__actions" role="toolbar" aria-label="Code actions">
          {canRun.ok && (
            <button type="button" className="pg__btn pg__btn--primary" onClick={run}>
              Run <kbd>⌘↵</kbd>
            </button>
          )}
          <button type="button" className="pg__btn" onClick={() => copy(code, "all")}>
            {copied === "all" ? "Copied ✓" : "Copy code"}
          </button>
          <button
            type="button"
            className="pg__btn"
            disabled={!selection}
            onClick={() => copy(selection, "selection")}
            title={selection ? "Copy only the selected lines" : "Select lines in the editor to copy a snippet"}
          >
            {copied === "selection" ? "Copied ✓" : "Copy selection"}
          </button>
          <button type="button" className="pg__btn" onClick={() => setCode(initialCode)} disabled={!dirty}>
            Reset
          </button>
          <button type="button" className="pg__btn pg__btn--ai" onClick={askAI}>
            Ask AI
          </button>
        </div>
      </header>

      {canRun.ok && (
        <div className="pg__tabs" role="tablist" aria-label="Editor or preview">
          <button type="button" role="tab" aria-selected={pane === "code"} onClick={() => setPane("code")}>
            Code
          </button>
          <button type="button" role="tab" aria-selected={pane === "preview"} onClick={() => setPane("preview")}>
            Preview
          </button>
        </div>
      )}

      <div className={`pg__grid ${canRun.ok ? "" : "pg__grid--single"}`} data-pane={pane}>
        <div className="pg__editor" onFocus={() => publishContext(selection)}>
          <CodeEditor
            value={code}
            language={language}
            label={`${title} — ${language} editor`}
            onChange={setCode}
            onSelectionChange={(s) => {
              setSelection(s);
              setLearningContext({ topic, location, language, code, selection: s });
            }}
            onRun={run}
          />
        </div>

        {canRun.ok ? (
          <div className="pg__preview">
            <div className="pg__preview-head">
              <span>Live preview</span>
              <span className="pg__status" role="status">
                {status === "running" ? "Running…" : status === "ready" ? "Ready" : visible ? "" : "Scroll to load"}
              </span>
            </div>
            {visible ? (
              <iframe
                ref={frame}
                title={`${title} — live preview`}
                srcDoc={srcDoc}
                sandbox="allow-scripts"
                referrerPolicy="no-referrer"
                className="pg__frame"
              />
            ) : (
              <div className="pg__frame pg__frame--idle" />
            )}
            <div className="pg__console" role="log" aria-label="Console output" aria-live="polite">
              <div className="pg__console-head">
                <span>Console</span>
                {logs.length > 0 && (
                  <button type="button" onClick={() => setLogs([])}>
                    Clear
                  </button>
                )}
              </div>
              {logs.length === 0 ? (
                <p className="pg__console-empty">console.log output appears here.</p>
              ) : (
                <ul>
                  {logs.map((line, i) => (
                    <li key={i} data-level={line.level}>
                      {line.text}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : (
          <p className="pg__notice" role="note">
            <strong>Not runnable here.</strong> {canRun.reason}
          </p>
        )}
      </div>

      <p className="pg__sandbox-note">
        {canRun.ok
          ? "Runs in an isolated sandbox with no access to this site's data. Edit the code — the preview updates automatically."
          : "Read-only reference — editing works, execution is unavailable for this language."}
      </p>

      {explanation && explanation.length > 0 && (
        <div className="pg__explain">
          <h4>How it works</h4>
          <ol>
            {explanation.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}
