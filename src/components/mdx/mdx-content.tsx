import Link from "next/link";
import type { ReactNode } from "react";
import type { MDXComponents } from "mdx/types";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { createHeadingId } from "@/lib/docs";
import { CodeBlock } from "./code-block";
import { Preview } from "./preview";
import { SourceCode } from "./source-code";

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

export function MdxContent({
  source,
  components = {},
}: {
  source: string;
  components?: MDXComponents;
}) {
  const nextId = createHeadingId();
  const headingId = (children: ReactNode) => nextId(textFromChildren(children));

  const baseComponents: MDXComponents = {
    h1: ({ children }: { children?: ReactNode }) => (
      <h2 id={headingId(children)}>{children}</h2>
    ),
    h2: ({ children }: { children?: ReactNode }) => (
      <h2 id={headingId(children)}>{children}</h2>
    ),
    h3: ({ children }: { children?: ReactNode }) => (
      <h3 id={headingId(children)}>{children}</h3>
    ),
    h4: ({ children }: { children?: ReactNode }) => <h4>{children}</h4>,
    a: ({
      href = "",
      children,
    }: {
      href?: string;
      children?: ReactNode;
    }) => {
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
    table: ({ children }: { children?: ReactNode }) => (
      <div className="table-wrap">
        <table>{children}</table>
      </div>
    ),
    pre: ({ children }: { children?: ReactNode }) => (
      <CodeBlock>{children}</CodeBlock>
    ),
    img: ({ src, alt }: { src?: string; alt?: string }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt ?? ""} loading="lazy" />
    ),
    Preview,
    SourceCode,
  };

  return (
    <div className="doc-body">
      <MDXRemote
        source={source}
        components={{ ...baseComponents, ...components }}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </div>
  );
}
