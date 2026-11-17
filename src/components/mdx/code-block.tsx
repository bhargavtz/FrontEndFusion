"use client";

import { Children, isValidElement, useMemo, useState, type ReactNode } from "react";

function nodeToText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(nodeToText).join("");
  }
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return nodeToText(node.props.children);
  }
  return "";
}

function languageFrom(children: ReactNode): { language: string; code: string } {
  const child = Children.toArray(children)[0];
  if (isValidElement<{ className?: string; children?: ReactNode }>(child)) {
    const className = child.props.className ?? "";
    const match = /language-([\w-]+)/.exec(className);
    return {
      language: match?.[1] ?? "text",
      code: nodeToText(child.props.children).replace(/\n$/, ""),
    };
  }
  return { language: "text", code: nodeToText(children) };
}

const LIVE_LANGUAGES = new Set(["html", "css", "js", "javascript"]);

const CSS_SCAFFOLD = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body { margin: 0; padding: 16px; font-family: ui-sans-serif, system-ui, sans-serif; }
  </style>
  <style>__CODE__</style>
</head>
<body>
  <h1>CSS Preview</h1>
  <p>This paragraph, the heading, and the button below inherit your CSS.</p>
  <button>Sample button</button>
</body>
</html>`;

const JS_SCAFFOLD = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body { margin: 0; padding: 16px; font-family: ui-sans-serif, system-ui, sans-serif; }
    #app { min-height: 120px; }
  </style>
</head>
<body>
  <div id="app"></div>
  <script>__CODE__</script>
</body>
</html>`;

function buildSrcDoc(language: string, code: string): string {
  if (language === "html") return code;
  if (language === "css") return CSS_SCAFFOLD.replace("__CODE__", code);
  return JS_SCAFFOLD.replace("__CODE__", code);
}

export function CodeBlock({ children }: { children?: ReactNode }) {
  const { language, code } = useMemo(() => languageFrom(children), [children]);
  const canPreview = LIVE_LANGUAGES.has(language);
  const [view, setView] = useState<"code" | "preview">("code");

  const srcDoc = useMemo(
    () => (canPreview ? buildSrcDoc(language, code) : ""),
    [canPreview, language, code],
  );

  return (
    <div className="mdx-code">
      <div className="mdx-code__bar">
        <span className="mdx-code__lang">{language}</span>
        {canPreview && (
          <div className="mdx-code__tabs" role="tablist" aria-label="Code or preview">
            <button
              type="button"
              role="tab"
              aria-selected={view === "code"}
              className={view === "code" ? "is-active" : ""}
              onClick={() => setView("code")}
            >
              Code
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={view === "preview"}
              className={view === "preview" ? "is-active" : ""}
              onClick={() => setView("preview")}
            >
              Preview
            </button>
          </div>
        )}
      </div>

      {view === "preview" && canPreview ? (
        <iframe
          title={`${language} preview`}
          srcDoc={srcDoc}
          sandbox="allow-scripts allow-forms allow-modals"
          className="mdx-code__frame"
        />
      ) : (
        <pre>
          <code className={`language-${language}`}>{code}</code>
        </pre>
      )}
    </div>
  );
}
