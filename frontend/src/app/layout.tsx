import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Instrument_Serif,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";

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
    default: "FrontEndFusion — HTML & CSS Learning Hub",
    template: "%s — FrontEndFusion",
  },
  description:
    "An open-source learning hub for HTML5, CSS3, responsive design, and modern frontend techniques — with interactive demos, copy-paste snippets, and in-depth guides.",
  keywords: [
    "HTML",
    "CSS",
    "frontend",
    "responsive design",
    "flexbox",
    "CSS grid",
    "accessibility",
    "web development",
  ],
  authors: [{ name: "FrontEndFusion contributors" }],
  openGraph: {
    title: "FrontEndFusion — HTML & CSS Learning Hub",
    description:
      "Interactive demos, copy-paste form snippets, and a structured learning path for modern frontend development.",
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
      </head>
      <body className="font-sans leading-relaxed antialiased">{children}</body>
    </html>
  );
}
