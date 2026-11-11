import type { Metadata } from "next";
import { DarkModeDemo } from "@/components/projects/dark-mode";

export const metadata: Metadata = {
  title: "Dark Mode Toggle Demo",
  description:
    "CSS custom properties plus localStorage theme switching with system preference detection.",
};

export default function Page() {
  return <DarkModeDemo />;
}
