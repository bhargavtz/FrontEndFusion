export type Snippet = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  icon: string;
};

/** Copy-paste form templates (dataset 5/8 — 5 keys: slug, title, description, tags, icon). */
export const snippets: Snippet[] = [
  {
    slug: "login-form",
    title: "Login Form",
    description:
      "Email + password inputs, show/hide toggle, remember me checkbox, social login buttons (Google, GitHub).",
    tags: ["Tailwind", "Accessible", "Responsive"],
    icon: "🔐",
  },
  {
    slug: "contact-form",
    title: "Contact Form",
    description:
      "Name, email, subject dropdown, message textarea with character counter, success toast on submit.",
    tags: ["Tailwind", "Validation", "JS"],
    icon: "✉️",
  },
  {
    slug: "newsletter-form",
    title: "Newsletter Signup",
    description:
      "Card + inline banner variants, topic tags, frequency picker, social proof avatars, success state.",
    tags: ["Tailwind", "Two Variants", "JS"],
    icon: "📬",
  },
];

export const getSnippet = (slug: string) =>
  snippets.find((snippet) => snippet.slug === slug);
