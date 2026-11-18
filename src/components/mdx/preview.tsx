import type { ReactNode } from "react";

export function Preview({ children }: { children: ReactNode }) {
  return <div className="mdx-preview">{children}</div>;
}
