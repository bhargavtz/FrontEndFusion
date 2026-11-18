import { Fragment, type ReactNode } from "react";
import { classHighlighter, highlightCode } from "@lezer/highlight";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import type { LanguageSupport } from "@codemirror/language";

/** Languages with a real grammar. Everything else renders as plain text. */
export function languageSupport(language: string): LanguageSupport | null {
  switch (language) {
    case "html":
    case "vue":
    case "svelte":
    case "astro":
      return html();
    case "css":
    case "scss":
      return css();
    case "js":
    case "javascript":
    case "json":
      return javascript();
    case "jsx":
      return javascript({ jsx: true });
    case "ts":
    case "typescript":
      return javascript({ typescript: true });
    case "tsx":
      return javascript({ jsx: true, typescript: true });
    default:
      return null;
  }
}

/**
 * Highlights code into React nodes using the same Lezer grammars as the editor.
 * Token classes are `tok-*` (see `.tok-*` rules in globals.css).
 */
export function highlight(code: string, language: string): ReactNode {
  const support = languageSupport(language);
  if (!support) return code;

  const tree = support.language.parser.parse(code);
  const nodes: ReactNode[] = [];
  let key = 0;

  highlightCode(
    code,
    tree,
    classHighlighter,
    (text, classes) => {
      nodes.push(
        classes ? (
          <span key={key++} className={classes}>
            {text}
          </span>
        ) : (
          <Fragment key={key++}>{text}</Fragment>
        ),
      );
    },
    () => nodes.push("\n"),
  );

  return nodes;
}
