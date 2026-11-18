"use client";

import { useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLine,
  highlightActiveLineGutter,
  drawSelection,
} from "@codemirror/view";
import { defaultKeymap, history, historyKeymap, indentWithTab } from "@codemirror/commands";
import { bracketMatching, indentOnInput, syntaxHighlighting } from "@codemirror/language";
import { closeBrackets } from "@codemirror/autocomplete";
import { classHighlighter } from "@lezer/highlight";
import { languageSupport } from "@/lib/highlight";

type Props = {
  value: string;
  language: string;
  label: string;
  onChange: (value: string) => void;
  onSelectionChange?: (selection: string) => void;
  /** Called on Ctrl/Cmd+Enter. */
  onRun?: () => void;
  readOnly?: boolean;
};

/** CodeMirror 6 editor themed entirely with the site's CSS custom properties. */
export function CodeEditor({ value, language, label, onChange, onSelectionChange, onRun, readOnly }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const view = useRef<EditorView | null>(null);
  const callbacks = useRef({ onChange, onSelectionChange, onRun });

  useEffect(() => {
    callbacks.current = { onChange, onSelectionChange, onRun };
  });

  useEffect(() => {
    if (!host.current) return;

    const support = languageSupport(language);
    const state = EditorState.create({
      doc: value,
      extensions: [
        lineNumbers(),
        highlightActiveLineGutter(),
        highlightActiveLine(),
        drawSelection(),
        history(),
        indentOnInput(),
        bracketMatching(),
        closeBrackets(),
        syntaxHighlighting(classHighlighter),
        ...(support ? [support] : []),
        keymap.of([
          { key: "Mod-Enter", run: () => (callbacks.current.onRun?.(), true) },
          indentWithTab,
          ...defaultKeymap,
          ...historyKeymap,
        ]),
        EditorState.readOnly.of(Boolean(readOnly)),
        EditorView.editable.of(!readOnly),
        EditorView.contentAttributes.of({ "aria-label": label, "aria-multiline": "true" }),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) callbacks.current.onChange(update.state.doc.toString());
          if (update.selectionSet || update.docChanged) {
            const { from, to } = update.state.selection.main;
            callbacks.current.onSelectionChange?.(from === to ? "" : update.state.sliceDoc(from, to));
          }
        }),
      ],
    });

    view.current = new EditorView({ state, parent: host.current });
    return () => {
      view.current?.destroy();
      view.current = null;
    };
    // The editor is created once per language/read-only mode; value changes are synced below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, readOnly, label]);

  // Sync external value changes (e.g. Reset) into the editor without echoing them back.
  useEffect(() => {
    const current = view.current;
    if (!current) return;
    if (current.state.doc.toString() !== value) {
      current.dispatch({ changes: { from: 0, to: current.state.doc.length, insert: value } });
    }
  }, [value]);

  return <div ref={host} className="cm-host" />;
}
