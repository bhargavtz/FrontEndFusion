import type { Metadata } from "next";
import { LandingPageDemo } from "@/components/projects/landing-page";

export const metadata: Metadata = {
  title: "Landing Page Demo",
  description:
    "A complete business landing page with hero, about, services, contact form, and footer.",
};

export default function Page() {
  return <LandingPageDemo />;
}
