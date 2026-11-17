import fs from "node:fs";
import path from "node:path";
import { CodeBlock } from "./code-block";

/**
 * Renders the source of a file from the repository at build time.
 * Use it in MDX to keep the displayed code in sync with the real component.
 */
export function SourceCode({
  file,
  language = "tsx",
}: {
  file: string;
  language?: string;
}) {
  const filePath = path.join(process.cwd(), file);
  const code = fs.readFileSync(filePath, "utf8").replace(/\n$/, "");

  return (
    <CodeBlock>
      <code className={`language-${language}`}>{code}</code>
    </CodeBlock>
  );
}
