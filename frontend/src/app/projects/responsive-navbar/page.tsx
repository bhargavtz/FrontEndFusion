import type { Metadata } from "next";
import { ResponsiveNavbarDemo } from "@/components/projects/responsive-navbar";

export const metadata: Metadata = {
  title: "Responsive Navbar Demo",
  description:
    "A mobile-first sticky navbar with a hamburger toggle and animated underline hover effects.",
};

export default function Page() {
  return <ResponsiveNavbarDemo />;
}
