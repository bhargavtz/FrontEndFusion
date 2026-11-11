# Advanced CSS Topics

A deep-dive into CSS features that take your UI from good to exceptional.

---

## 1. CSS Custom Properties (Variables)

CSS variables let you store reusable values in one place and reference them anywhere.

```css
:root {
  --color-primary:   #4f46e5;
  --color-secondary: #7c3aed;
  --spacing-base:    1rem;
  --border-radius:   0.5rem;
}

.button {
  background-color: var(--color-primary);
  padding: var(--spacing-base) calc(var(--spacing-base) * 2);
  border-radius: var(--border-radius);
}
```

### Dynamic theming with variables

Variables can be overridden at any scope, making dark mode trivial:

```css
:root { --bg: #ffffff; --text: #111827; }

[data-theme="dark"] {
  --bg:   #111827;
  --text: #f9fafb;
}

body { background: var(--bg); color: var(--text); }
```

Toggle in JavaScript:
```js
document.documentElement.dataset.theme =
  document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
```

---

## 2. CSS Transitions

Transitions animate a property change from one value to another.

```css
.card {
  transform: translateY(0);
  box-shadow: 0 1px 3px rgba(0,0,0,.1);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0,0,0,.15);
}
```

### Transition shorthand

```
transition: <property> <duration> <timing-function> <delay>;
```

| Timing function | Feel |
|-----------------|------|
| `ease`          | Fast start, slow end (default) |
| `ease-in-out`   | Slow start and end |
| `linear`        | Constant speed |
| `cubic-bezier(x1,y1,x2,y2)` | Custom curve |

---

## 3. CSS Animations with @keyframes

For multi-step or looping animations, use `@keyframes`.

```css
@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-text {
  animation: slide-in 0.6s ease-out both;
}
```

### Animation shorthand

```
animation: <name> <duration> <timing> <delay> <iteration> <direction> <fill-mode>;
```

### Staggered animations

```css
.card:nth-child(1) { animation-delay: 0s; }
.card:nth-child(2) { animation-delay: 0.1s; }
.card:nth-child(3) { animation-delay: 0.2s; }
```

### Common animation patterns

```css
/* Pulsing dot */
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%       { transform: scale(1.4); opacity: 0.6; }
}

/* Spinning loader */
@keyframes spin {
  to { transform: rotate(360deg); }
}
.loader { animation: spin 1s linear infinite; }

/* Skeleton shimmer */
@keyframes shimmer {
  from { background-position: -200% 0; }
  to   { background-position:  200% 0; }
}
.skeleton {
  background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
```

---

## 4. Pseudo-elements: ::before and ::after

Pseudo-elements inject a virtual child element you can style freely — no extra HTML needed.

```css
/* Decorative underline on headings */
h2 {
  position: relative;
  display: inline-block;
}

h2::after {
  content: '';
  position: absolute;
  left: 0; bottom: -4px;
  width: 100%; height: 3px;
  background: linear-gradient(to right, #4f46e5, #7c3aed);
  border-radius: 2px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

h2:hover::after { transform: scaleX(1); }
```

### Quote blocks

```css
blockquote::before {
  content: '\201C';   /* " */
  font-size: 4rem;
  color: #4f46e5;
  line-height: 0;
  vertical-align: -0.6em;
  margin-right: 0.1em;
}
```

---

## 5. Pseudo-classes

Pseudo-classes target elements based on state or position.

```css
/* Form validation states */
input:valid   { border-color: #22c55e; }
input:invalid { border-color: #ef4444; }
input:focus   { border-color: #4f46e5; box-shadow: 0 0 0 3px rgba(79,70,229,.2); }

/* Structural selectors */
li:first-child   { font-weight: bold; }
li:last-child    { border-bottom: none; }
li:nth-child(odd){ background: #f9fafb; }
p:not(.lead)     { color: #6b7280; }

/* :is() and :where() — match multiple selectors */
:is(h1, h2, h3) { font-family: 'Georgia', serif; }
:where(section, article) p { line-height: 1.75; }
```

---

## 6. CSS Filters

`filter` applies visual effects without JavaScript or SVG.

```css
.card img {
  filter: brightness(0.9) saturate(1.2);
  transition: filter 0.3s;
}
.card:hover img {
  filter: brightness(1) saturate(1) drop-shadow(0 4px 12px rgba(0,0,0,.2));
}

/* Blur a background overlay */
.overlay {
  backdrop-filter: blur(8px) brightness(0.7);
}
```

Common filter functions: `blur()`, `brightness()`, `contrast()`, `grayscale()`, `hue-rotate()`, `saturate()`, `sepia()`, `drop-shadow()`.

---

## 7. CSS Grid — Advanced Patterns

### Named template areas

```css
.page {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

header { grid-area: header; }
aside  { grid-area: sidebar; }
main   { grid-area: main; }
footer { grid-area: footer; }
```

### auto-fill vs auto-fit

```css
/* auto-fill: keeps empty columns */
.gallery { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); }

/* auto-fit: collapses empty columns, items stretch */
.gallery { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
```

---

## 8. CSS Clamp & Fluid Typography

`clamp(min, preferred, max)` creates values that scale smoothly with the viewport.

```css
h1  { font-size: clamp(1.75rem, 4vw, 3rem); }
p   { font-size: clamp(1rem, 1.5vw, 1.25rem); }
.container { width: clamp(320px, 90%, 1200px); }
```

---

## 9. Scroll-Driven Animations (Modern CSS)

```css
/* Animate element as it enters the viewport */
@keyframes reveal {
  from { opacity: 0; translate: 0 40px; }
  to   { opacity: 1; translate: 0 0; }
}

.reveal {
  animation: reveal linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 30%;
}
```

---

## 10. Logical Properties

Write once, works for both LTR and RTL languages.

```css
/* Instead of: */
margin-left: 1rem;
padding-right: 2rem;
border-top: 1px solid;

/* Use: */
margin-inline-start:  1rem;
padding-inline-end:   2rem;
border-block-start:   1px solid;
```

---

## Summary Cheatsheet

| Feature | Key syntax |
|---------|-----------|
| CSS Variables | `--name: value;` / `var(--name)` |
| Transition | `transition: prop duration timing` |
| Animation | `@keyframes` + `animation:` shorthand |
| Pseudo-element | `::before`, `::after` with `content:` |
| Pseudo-class | `:hover`, `:focus`, `:nth-child()`, `:not()` |
| Filter | `filter: blur() brightness()…` |
| Fluid sizing | `clamp(min, preferred, max)` |
| Logical props | `margin-inline-start`, `padding-block-end` |
