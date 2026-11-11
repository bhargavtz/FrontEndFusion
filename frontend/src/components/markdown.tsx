import Link from "next/link";
import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { createHeadingId } from "@/lib/docs";

function textFromChildren(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(textFromChildren).join("");
  }
  if (children && typeof children === "object" && "props" in children) {
    return textFromChildren(
      (children as { props: { children?: ReactNode } }).props.children,
    );
  }
  return "";
}

export function MarkdownBody({ content }: { content: string }) {
  const nextId = createHeadingId();
  const headingId = (children: ReactNode) => nextId(textFromChildren(children));

  return (
    <div className="doc-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h2 id={headingId(children)}>{children}</h2>
          ),
          h2: ({ children }) => (
            <h2 id={headingId(children)}>{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 id={headingId(children)}>{children}</h3>
          ),
          h4: ({ children }) => <h4>{children}</h4>,
          a: ({ href = "", children }) => {
            if (href.startsWith("http")) {
              return (
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              );
            }
            if (href.startsWith("/")) {
              return <Link href={href}>{children}</Link>;
            }
            return <a href={href}>{children}</a>;
          },
          table: ({ children }) => (
            <div className="table-wrap">
              <table>{children}</table>
            </div>
          ),
          input: ({ type, checked }) => (
            <input
              type={type ?? "checkbox"}
              checked={Boolean(checked)}
              readOnly
              disabled
              aria-label="Task item"
            />
          ),
          // eslint-disable-next-line @next/next/no-img-element
          img: ({ src, alt }) => <img src={src} alt={alt ?? ""} loading="lazy" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
