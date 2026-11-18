import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Instrument_Serif,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";
import "../styles/platform.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://frontendfusion.vercel.app"),
  title: {
    default: "FrontEndFusion — Learn frontend development, from HTML to AI-powered engineering",
    template: "%s — FrontEndFusion",
  },
  description:
    "Learn every part of frontend development in one place — HTML, CSS, JavaScript, TypeScript, React, Next.js, UI libraries, tooling, architecture and AI-powered development — with runnable code, roadmaps, projects and an AI learning assistant.",
  keywords: [
    "frontend development",
    "learn HTML CSS JavaScript",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "frontend roadmap",
    "AI-assisted development",
  ],
  authors: [{ name: "FrontEndFusion contributors" }],
  openGraph: {
    title: "FrontEndFusion — Learn frontend development",
    description:
      "Runnable code, roadmaps, projects, and an AI learning assistant for every part of frontend development.",
    type: "website",
  },
};

const themeScript = `(function(){try{var t=localStorage.getItem('ffe-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='dark';}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "FrontEndFusion",
              url: "https://frontendfusion.vercel.app",
              description:
                "A free, open-source platform for learning frontend development from HTML fundamentals to AI-powered engineering.",
              publisher: {
                "@type": "Organization",
                name: "FrontEndFusion contributors",
              },
            }),
          }}
        />
      </head>
      <body className="font-sans leading-relaxed antialiased">{children}</body>
    </html>
  );
}
