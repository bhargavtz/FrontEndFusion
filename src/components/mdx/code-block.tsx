"use client";

import { Children, isValidElement, useId, useMemo, useState, type ReactNode } from "react";
import { highlight } from "@/lib/highlight";
import { buildSrcDoc, RUNNABLE } from "@/lib/sandbox";
import { setAssistantOpen, setLearningContext } from "@/lib/ai/store";

function nodeToText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeToText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return nodeToText(node.props.children);
  return "";
}

function languageFrom(children: ReactNode): { language: string; code: string } {
  const child = Children.toArray(children)[0];
  if (isValidElement<{ className?: string; children?: ReactNode }>(child)) {
    const match = /language-([\w-]+)/.exec(child.props.className ?? "");
    return { language: match?.[1] ?? "text", code: nodeToText(child.props.children).replace(/\n$/, "") };
  }
  return { language: "text", code: nodeToText(children) };
}

const PREVIEWABLE = new Set(["html", "css", "js", "javascript"]);

/**
 * Code block used throughout the MDX guides: syntax highlighting, copy,
 * optional sandboxed preview (HTML/CSS/JS), and "Ask AI about this code".
 * Previews use the same isolated sandbox as the playground (no same-origin).
 */
export function CodeBlock({ children }: { children?: ReactNode }) {
  const { language, code } = useMemo(() => languageFrom(children), [children]);
  const lang = language === "javascript" ? "js" : language;
  const canPreview = PREVIEWABLE.has(language) && RUNNABLE.has(lang);
  const [view, setView] = useState<"code" | "preview">("code");
  const [copied, setCopied] = useState(false);
  const token = useId();

  const highlighted = useMemo(() => highlight(code, lang), [code, lang]);
  const srcDoc = useMemo(() => (canPreview && view === "preview" ? buildSrcDoc({ language: lang, code, token }) : ""), [canPreview, view, lang, code, token]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  }

  function askAI() {
    const selected = typeof window !== "undefined" ? (window.getSelection()?.toString() ?? "") : "";
    setLearningContext({
      topic: document.querySelector("h1")?.textContent ?? "",
      location: window.location.pathname,
      language: lang,
      code,
      selection: code.includes(selected) ? selected : "",
    });
    setAssistantOpen(true);
  }

  return (
    <div className="mdx-code">
      <div className="mdx-code__bar">
        <span className="mdx-code__lang">{language}</span>
        {canPreview && (
          <div className="mdx-code__tabs" role="tablist" aria-label="Code or preview">
            <button type="button" role="tab" aria-selected={view === "code"} className={view === "code" ? "is-active" : ""} onClick={() => setView("code")}>
              Code
            </button>
            <button type="button" role="tab" aria-selected={view === "preview"} className={view === "preview" ? "is-active" : ""} onClick={() => setView("preview")}>
              Preview
            </button>
          </div>
        )}
        <div className="mdx-code__actions">
          <button type="button" onClick={copy}>
            {copied ? "Copied ✓" : "Copy"}
          </button>
          <button type="button" onClick={askAI}>
            Ask AI
          </button>
        </div>
      </div>

      {view === "preview" && canPreview ? (
        <iframe title={`${language} preview`} srcDoc={srcDoc} sandbox="allow-scripts" referrerPolicy="no-referrer" className="mdx-code__frame" />
      ) : (
        <pre tabIndex={0}>
          <code className={`language-${language}`}>{highlighted}</code>
        </pre>
      )}
    </div>
  );
}
