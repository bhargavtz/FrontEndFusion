/**
 * Builds the document loaded into the playground's sandboxed iframe.
 *
 * Security model
 * - The iframe uses `sandbox="allow-scripts"` and NEVER `allow-same-origin`,
 *   so user code runs in an opaque origin: it cannot read this site's cookies,
 *   localStorage, or DOM, and cannot make same-origin requests.
 * - The frame talks to the page only through `postMessage`; the parent accepts
 *   messages solely from that frame's `contentWindow` and tags them with a
 *   per-run token.
 * - A Content-Security-Policy meta tag blocks forms posting out, nested
 *   frames, and every script origin except the pinned React/Babel CDN files.
 */

export type RunLanguage = "html" | "css" | "js" | "jsx" | "tsx" | "ts";

export const RUNNABLE: ReadonlySet<string> = new Set(["html", "css", "js", "jsx", "tsx", "ts"]);

export type SandboxMessage =
  | { source: "ffe-sandbox"; token: string; type: "log"; level: "log" | "info" | "warn" | "error"; text: string }
  | { source: "ffe-sandbox"; token: string; type: "ready" }
  | { source: "ffe-sandbox"; token: string; type: "error"; text: string };

const REACT = "https://unpkg.com/react@18.3.1/umd/react.development.js";
const REACT_DOM = "https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js";
const BABEL = "https://unpkg.com/@babel/standalone@7.26.4/babel.min.js";

const BASE_STYLE = `body{margin:0;padding:16px;font-family:ui-sans-serif,system-ui,sans-serif;line-height:1.5}`;

/** Does a JSX/TSX example only depend on React (which the sandbox provides)? */
export function usesOnlyReact(code: string): boolean {
  const imports = [...code.matchAll(/^\s*import\s[^;]*?from\s+["']([^"']+)["']/gm)].map((m) => m[1]);
  return imports.every((source) => source === "react" || source === "react-dom/client");
}

/**
 * Whether the playground can execute this example, and a human-readable reason
 * when it cannot (shown to learners instead of silently doing nothing).
 */
export function runnability(language: string, code: string): { ok: true } | { ok: false; reason: string } {
  if (!RUNNABLE.has(language)) {
    return {
      ok: false,
      reason: `${language.toUpperCase()} cannot be executed in the browser sandbox. Copy it into a local project to run it.`,
    };
  }
  if ((language === "jsx" || language === "tsx") && !usesOnlyReact(code)) {
    return {
      ok: false,
      reason:
        "This example imports npm packages or framework modules that the sandbox does not provide. Run it in a local project; only React itself is available here.",
    };
  }
  return { ok: true };
}

const escapeScript = (value: string) => value.replace(/<\/script/gi, "<\\/script");

/** Console + error bridge injected into every document. */
function bridge(token: string): string {
  return `<script>(function(){
  var T=${JSON.stringify(token)};
  function send(m){try{parent.postMessage(Object.assign({source:"ffe-sandbox",token:T},m),"*")}catch(e){}}
  function fmt(a){return Array.prototype.map.call(a,function(v){
    if(typeof v==="string")return v;
    try{return typeof v==="function"?String(v):JSON.stringify(v,function(k,x){return x===undefined?"undefined":x},2)}catch(e){return String(v)}
  }).join(" ")}
  ["log","info","warn","error"].forEach(function(l){var o=console[l];console[l]=function(){send({type:"log",level:l,text:fmt(arguments)});o.apply(console,arguments)}});
  window.addEventListener("error",function(e){send({type:"error",text:(e.message||"Error")+(e.lineno?" (line "+e.lineno+")":"")})});
  window.addEventListener("unhandledrejection",function(e){send({type:"error",text:"Unhandled rejection: "+(e.reason&&e.reason.message||e.reason)})});
  window.addEventListener("load",function(){send({type:"ready"})});
})();</script>`;
}

const CSP = [
  "default-src 'none'",
  "script-src 'unsafe-inline' 'unsafe-eval' https://unpkg.com https://cdn.tailwindcss.com",
  "style-src 'unsafe-inline' https://fonts.googleapis.com",
  "font-src https://fonts.gstatic.com data:",
  "img-src https: data: blob:",
  "media-src https: data: blob:",
  "connect-src https:",
  "form-action 'none'",
  "frame-src 'none'",
].join("; ");

function wrap(head: string, body: string, token: string): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta http-equiv="Content-Security-Policy" content="${CSP}" />
${bridge(token)}
${head}
</head>
<body>
${body}
</body>
</html>`;
}

/** Strips imports from "react" and rewrites them to globals; picks the root component. */
function prepareReactSource(code: string): { source: string; component: string } {
  let source = code
    .replace(/^\s*import\s+React(?:\s*,\s*\{([^}]*)\})?\s+from\s+["']react["'];?\s*$/gm, (_m, named?: string) =>
      named ? `const {${cleanNamed(named)}} = React;` : "",
    )
    .replace(/^\s*import\s+\{([^}]*)\}\s+from\s+["']react["'];?\s*$/gm, (_m, named: string) => {
      const cleaned = cleanNamed(named);
      return cleaned ? `const {${cleaned}} = React;` : "";
    })
    .replace(/^\s*import\s+\*\s+as\s+React\s+from\s+["']react["'];?\s*$/gm, "")
    .replace(/^\s*import\s+type\s+[^;]+;?\s*$/gm, "")
    .replace(/^\s*"use client";?\s*$/gm, "");

  let component = "App";
  const fn = /export\s+default\s+(?:async\s+)?function\s+(\w+)/.exec(source);
  const ident = /export\s+default\s+(\w+)\s*;?\s*$/m.exec(source);
  if (fn) {
    component = fn[1];
    source = source.replace(/export\s+default\s+/, "");
  } else if (ident) {
    component = ident[1];
    source = source.replace(/export\s+default\s+\w+\s*;?\s*$/m, "");
  } else if (/export\s+default\s+/.test(source)) {
    source = source.replace(/export\s+default\s+/, "const __Default = ");
    component = "__Default";
  }
  source = source.replace(/^\s*export\s+(?=(?:const|function|class|type|interface)\b)/gm, "");
  return { source, component };
}

function cleanNamed(named: string): string {
  return named
    .split(",")
    .map((part) => part.trim())
    .filter((part) => part && !part.startsWith("type "))
    .map((part) => part.replace(/\s+as\s+/, ": "))
    .join(", ");
}

export type BuildInput = {
  language: string;
  code: string;
  /** For CSS examples: the markup the stylesheet should be applied to. */
  markup?: string;
  token: string;
};

const DEFAULT_CSS_MARKUP = `<main>
  <h1>CSS preview</h1>
  <p>This paragraph and the controls below pick up your styles.</p>
  <button type="button">Button</button>
  <a href="#">A link</a>
</main>`;

export function buildSrcDoc({ language, code, markup, token }: BuildInput): string {
  switch (language) {
    case "html": {
      // Full documents are used as written, with the bridge + CSP injected at the top of <head>.
      if (/<head[\s>]/i.test(code)) {
        return code.replace(
          /<head([^>]*)>/i,
          (_m, attrs: string) =>
            `<head${attrs}>\n<meta http-equiv="Content-Security-Policy" content="${CSP}" />\n${bridge(token)}`,
        );
      }
      return wrap(`<style>${BASE_STYLE}</style>`, code, token);
    }
    case "css":
      return wrap(
        `<style>${BASE_STYLE}</style>\n<style>${escapeScript(code)}</style>`,
        markup ?? DEFAULT_CSS_MARKUP,
        token,
      );
    case "js":
      return wrap(
        `<style>${BASE_STYLE}</style>`,
        `<div id="app"></div>\n<script>\ntry{\n${escapeScript(code)}\n}catch(e){console.error(e&&e.message||e)}\n</script>`,
        token,
      );
    case "ts":
    case "jsx":
    case "tsx": {
      const isReact = language !== "ts";
      const prepared = isReact ? prepareReactSource(code) : { source: code, component: "" };
      const presets = isReact ? '["typescript","react"]' : '["typescript"]';
      const filename = isReact ? "app.tsx" : "app.ts";
      const runner = `
(function(){
  var src=${JSON.stringify(prepared.source)};
  try{
    var out=Babel.transform(src,{presets:${presets},filename:${JSON.stringify(filename)},sourceType:"script"}).code;
    ${
      isReact
        ? `var run=new Function("React","ReactDOM",out+"\\n;return typeof ${prepared.component}!=='undefined'?${prepared.component}:null;");
    var C=run(React,ReactDOM);
    if(!C){throw new Error("No component found. Export a default component, or name it App.");}
    ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(C));`
        : `(new Function(out))();`
    }
  }catch(e){console.error(e&&e.message||String(e));}
})();`;
      const scripts = isReact
        ? `<script crossorigin src="${REACT}"></script>\n<script crossorigin src="${REACT_DOM}"></script>\n<script src="${BABEL}"></script>`
        : `<script src="${BABEL}"></script>`;
      return wrap(
        `<style>${BASE_STYLE}</style>\n${scripts}`,
        `<div id="root"></div>\n<script>${escapeScript(runner)}</script>`,
        token,
      );
    }
    default:
      return wrap(`<style>${BASE_STYLE}</style>`, "<p>Nothing to preview.</p>", token);
  }
}
