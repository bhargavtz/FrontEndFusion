export type HeroAction = {
  label: string;
  href: string;
  variant: "primary" | "outline";
};

export type Hero = {
  title: string;
  subtitle: string;
  actions: HeroAction[];
};

/** Hero copy (dataset 2/8 — 3 keys: title, subtitle, actions). */
export const hero: Hero = {
  title: "FrontEndFusion",
  subtitle:
    "A complete learning hub for HTML5, CSS3, responsive design, and modern frontend techniques.",
  actions: [
    { label: "View Projects", href: "/#projects", variant: "primary" },
    { label: "Start Learning", href: "/#learning", variant: "outline" },
  ],
};
