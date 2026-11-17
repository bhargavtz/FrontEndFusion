# Content authoring (MDX)

All guides and snippets live in `content/` as `.mdx` files. The typed content
layer in `src/lib/content.ts` reads them at build time, so no separate data
arrays need to be maintained.

## Docs

Path: `content/docs/<slug>.mdx`

```mdx
---
title: HTML Basics
description: A short one-line summary used for SEO and cards.
category: Learning Path
order: 1
---

# HTML Basics

Body content goes here.
```

- `category` must be `Learning Path` or `Reference`.
- `order` controls the previous/next navigation and the docs listing.
- The leading `# Title` is stripped by the page header, so keep exactly one.

## Snippets

Path: `content/snippets/<slug>.mdx`

```mdx
---
title: Login Form
description: Email + password inputs with a show/hide toggle.
tags: [Tailwind, Accessible]
icon: 🔐
component: LoginForm
order: 1
---

## Preview

<Preview>
  <LoginForm />
</Preview>

## Notes

- Keep notes short and scannable.

## Source

<SourceCode file="src/components/snippets/login-form.tsx" />
```

- `component` is the name exported from the snippet page's component map.
- `<Preview>` wraps the live demo and gets the snippet's preview background.
- `<SourceCode file="..." />` reads the real file at build time, so displayed
  code never drifts from the component.

## Live code blocks

HTML, CSS, and JS fenced blocks automatically get a **Code / Preview** toggle.
The preview runs in a sandboxed iframe.

````mdx
```html
<button class="btn">Click me</button>
```
````

For CSS and JS the preview is scaffolded with a small sample page.

## Adding a new snippet

1. Create `content/snippets/my-widget.mdx` with the frontmatter above.
2. Create `src/components/snippets/my-widget.tsx`.
3. Add it to `demoComponents` in `src/app/(site)/snippets/[slug]/page.tsx`.
4. Add the slug to `src/data/...` only if another page needs it — the content
   layer discovers it automatically.
