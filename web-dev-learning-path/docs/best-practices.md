# Frontend Best Practices

Habits and patterns that separate maintainable, scalable code from a tangled mess.

---

## 1. HTML Best Practices

### Use semantic elements
Always pick the element whose meaning matches the content.

```html
<!-- Avoid: meaningless divs everywhere -->
<div class="header"><div class="nav">…</div></div>

<!-- Prefer: semantic structure -->
<header>
  <nav aria-label="Main navigation">…</nav>
</header>
```

Key semantic elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<figure>`, `<figcaption>`, `<time>`, `<address>`.

### One `<h1>` per page, logical heading order
```html
<h1>Page title</h1>         <!-- one only -->
  <h2>Section</h2>
    <h3>Sub-section</h3>
  <h2>Another section</h2>
```
Never skip levels (e.g., `<h1>` → `<h4>`).

### Always write a meaningful `<title>` and meta description
```html
<title>Contact Us — Acme Corp</title>
<meta name="description" content="Reach the Acme Corp team by phone, email, or chat.">
```

### Alt text for images
```html
<!-- Decorative image (empty alt, hidden from screen readers) -->
<img src="divider.svg" alt="">

<!-- Informative image -->
<img src="chart.png" alt="Bar chart showing 40% growth in Q3 2024">

<!-- Functional image (in a link) -->
<a href="/"><img src="logo.svg" alt="Acme Corp — Home"></a>
```

---

## 2. CSS Architecture

### BEM Naming Convention

BEM (Block–Element–Modifier) keeps class names predictable.

```css
/* Block — standalone component */
.card { … }

/* Element — child of the block */
.card__title  { … }
.card__image  { … }
.card__footer { … }

/* Modifier — variant or state */
.card--featured  { … }   /* variant */
.card--is-loading { … }  /* state */
```

### Utility-first CSS (Tailwind philosophy)

Use small, single-purpose classes over bespoke component classes for common patterns:

```html
<button class="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">
  Save changes
</button>
```

### CSS custom properties for theming

Put all design tokens in `:root`. This makes global changes a one-liner.

```css
:root {
  --color-brand:    #4f46e5;
  --color-text:     #111827;
  --radius-card:    12px;
  --shadow-card:    0 4px 20px rgba(0,0,0,.08);
  --transition-std: 200ms ease;
}
```

### Avoid magic numbers

```css
/* Bad — what does 37px mean? */
.overlay { top: 37px; }

/* Good — derive from a variable or a known value */
.overlay { top: var(--header-height); }
```

---

## 3. Responsive Design Best Practices

### Mobile-first breakpoints

Write base styles for mobile, then layer larger screens on top:

```css
/* Base (mobile) */
.grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }

/* Tablet */
@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop */
@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
```

### Use relative units
| Use case | Unit |
|----------|------|
| Font size | `rem` |
| Component spacing | `em` or `rem` |
| Viewport-relative sizing | `vw`, `vh`, `dvh` |
| Never for font sizes | `px` |

### Fluid sizing over fixed breakpoints

```css
/* Scales smoothly between 320px and 1280px viewports */
.hero-title { font-size: clamp(1.75rem, 5vw, 3.5rem); }
.container  { width: clamp(320px, 90%, 1200px); margin-inline: auto; }
```

---

## 4. Performance Best Practices

### Prefer CSS over JavaScript for animations

CSS transitions and animations run on the compositor thread (no main-thread jank).

```css
/* Fast: GPU-accelerated properties */
transform: translateX(100px);
opacity: 0.5;

/* Slow: triggers layout recalculation */
left: 100px;
width: 200px;
```

### Lazy-load below-the-fold images
```html
<img src="hero.webp" alt="Hero" loading="eager">          <!-- above fold -->
<img src="section2.webp" alt="…" loading="lazy">          <!-- below fold -->
```

### Use modern image formats
```html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Fallback" width="800" height="600">
</picture>
```

### Avoid layout shift (CLS)

Always set explicit `width` and `height` on images and video embeds so the browser reserves space before the asset loads.

---

## 5. Accessibility Best Practices

### Keyboard navigation

Every interactive element must be reachable and operable via keyboard.

```css
/* Never remove focus outline completely */
:focus-visible {
  outline: 2px solid var(--color-brand);
  outline-offset: 2px;
}
```

### Sufficient color contrast

- Normal text: minimum 4.5:1 ratio (WCAG AA)
- Large text (≥18px bold or ≥24px): minimum 3:1
- UI components and graphics: minimum 3:1

### ARIA — use only when necessary

```html
<!-- Prefer native HTML (built-in semantics) -->
<button type="button">Close</button>

<!-- ARIA adds semantics where HTML can't (e.g. custom widgets) -->
<div role="dialog" aria-modal="true" aria-labelledby="dialog-title">…</div>
```

### Skip link

```html
<a href="#main-content" class="sr-only focus:not-sr-only">Skip to main content</a>
```

---

## 6. Code Quality

### Keep components small and focused

One component = one responsibility. Split large files when a component exceeds ~150 lines of HTML.

### Consistent formatting

Use a formatter (Prettier) and a linter (ESLint / Stylelint). Automate via pre-commit hooks or CI so the style never drifts.

### Comment the WHY, not the WHAT

```css
/* z-index 200 keeps the dropdown above the sticky header (z-index 100) */
.dropdown { z-index: 200; }
```

Avoid restating the obvious:
```css
/* Sets color to red */  /* ← useless */
color: red;
```

### Avoid inline styles

Inline styles are hard to override, untestable, and pollute HTML with presentation logic. Move everything to CSS classes.

```html
<!-- Avoid -->
<p style="color: red; font-size: 14px;">Error</p>

<!-- Prefer -->
<p class="error-text">Error</p>
```

---

## 7. Git Workflow for Frontend Projects

### Commit early, commit often

Small commits with clear messages are easier to review, bisect, and revert.

```
feat: add responsive navbar with hamburger menu
fix: correct hover color on active nav link
style: apply consistent spacing to card component
docs: document color token naming convention
```

### Branch naming

```
feature/responsive-navbar
fix/footer-overflow-bug
docs/css-variables-guide
```

---

## Quick Reference Checklist

- [ ] Semantic HTML elements used throughout
- [ ] Logical heading hierarchy (`h1` → `h2` → `h3`)
- [ ] All images have meaningful `alt` text
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] All interactive elements keyboard-accessible
- [ ] `focus-visible` styles defined
- [ ] Mobile-first responsive layout
- [ ] Images use `loading="lazy"` below the fold
- [ ] CSS animations use `transform` and `opacity` (not layout properties)
- [ ] No inline styles
- [ ] Design tokens stored in CSS custom properties
- [ ] Consistent BEM or utility-class naming
