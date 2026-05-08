# CSS Quick Reference Cheat Sheet

Everything you reach for most often — selectors, units, layout, typography, colors, and functions.

---

## Selectors

| Selector | What it targets |
|----------|----------------|
| `*` | Every element |
| `div` | All `<div>` elements |
| `.card` | Class |
| `#hero` | ID |
| `a, button` | Multiple selectors |
| `nav a` | Descendant (any depth) |
| `ul > li` | Direct child only |
| `h2 + p` | Adjacent sibling (immediately after) |
| `h2 ~ p` | General sibling (any after) |
| `a[href]` | Has attribute |
| `a[href^="https"]` | Attribute starts with |
| `a[href$=".pdf"]` | Attribute ends with |
| `a[href*="docs"]` | Attribute contains |
| `:hover` | Mouse over |
| `:focus` | Keyboard focused |
| `:focus-visible` | Focused via keyboard (not mouse) |
| `:active` | Being clicked |
| `:checked` | Checked input |
| `:disabled` | Disabled form element |
| `:valid` / `:invalid` | Form validation state |
| `:first-child` | First among siblings |
| `:last-child` | Last among siblings |
| `:nth-child(n)` | nth among siblings |
| `:nth-child(odd)` / `(even)` | Alternating rows |
| `:not(.skip)` | Everything except `.skip` |
| `:is(h1,h2,h3)` | Match multiple, keeps specificity |
| `:where(h1,h2)` | Match multiple, zero specificity |
| `::before` / `::after` | Pseudo-elements (need `content:`) |
| `::placeholder` | Input placeholder text |
| `::selection` | User text selection |

---

## Units

| Unit | What it means |
|------|--------------|
| `px` | Screen pixel (absolute) |
| `rem` | Relative to root `font-size` (default 16px) |
| `em` | Relative to **current** element's `font-size` |
| `%` | Percentage of parent value |
| `vw` | 1% of viewport **width** |
| `vh` | 1% of viewport **height** |
| `dvh` | 1% of **dynamic** viewport height (mobile-safe) |
| `svh` | Smallest viewport height |
| `ch` | Width of the `0` character in current font |
| `fr` | Fraction of remaining grid space |
| `min-content` | Smallest possible size without overflow |
| `max-content` | Size to fit all content on one line |
| `fit-content` | Like `max-content` but capped at parent width |

---

## Box Model

```css
.box {
  width:   300px;
  height:  200px;
  padding: 16px;                  /* inside border */
  border:  2px solid #e2e8f0;
  margin:  24px auto;             /* outside border */
  box-sizing: border-box;         /* padding/border included in width/height */

  /* Shorthand: top right bottom left */
  padding: 8px 16px 8px 16px;
  /* Or: vertical horizontal */
  padding: 8px 16px;
  margin:  0 auto;                /* center block horizontally */
}
```

---

## Display & Visibility

```css
display: block;          /* stacks vertically, full width */
display: inline;         /* in-line with text, no width/height */
display: inline-block;   /* inline + supports width/height */
display: flex;           /* Flexbox container */
display: inline-flex;    /* Flexbox but inline */
display: grid;           /* Grid container */
display: inline-grid;    /* Grid but inline */
display: none;           /* removed from layout */

visibility: hidden;      /* invisible but still takes space */
opacity: 0;              /* invisible but still interactive */
```

---

## Flexbox

```css
/* Container */
.flex-container {
  display: flex;
  flex-direction:   row | row-reverse | column | column-reverse;
  flex-wrap:        nowrap | wrap | wrap-reverse;
  justify-content:  flex-start | center | flex-end | space-between | space-around | space-evenly;
  align-items:      stretch | flex-start | center | flex-end | baseline;
  align-content:    flex-start | center | space-between | …;   /* multi-line */
  gap:              16px;
  gap:              row-gap col-gap;
}

/* Items */
.flex-item {
  flex-grow:   0;        /* how much to grow (0 = don't) */
  flex-shrink: 1;        /* how much to shrink (1 = normal) */
  flex-basis:  auto;     /* starting size */
  flex:        1;        /* shorthand: grow=1, shrink=1, basis=0 */
  align-self:  center;   /* override align-items for this item */
  order:       2;        /* visual order (default 0) */
}
```

---

## CSS Grid

```css
/* Container */
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-columns: repeat(3, 1fr);
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-template-rows:    auto 1fr auto;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  gap: 16px;
  gap: 24px 16px;       /* row-gap col-gap */
}

/* Items */
.grid-item {
  grid-column:     1 / 3;      /* from line 1 to line 3 */
  grid-column:     span 2;     /* span 2 columns */
  grid-row:        2 / 4;
  grid-area:       header;     /* assign named area */
  justify-self:    start | center | end | stretch;
  align-self:      start | center | end | stretch;
}

/* Container-level alignment */
.grid-container {
  justify-items:   stretch;
  align-items:     stretch;
  justify-content: space-between;
  align-content:   start;
}
```

---

## Positioning

```css
position: static;    /* default — in normal flow */
position: relative;  /* offset from normal position; establishes stacking context */
position: absolute;  /* removed from flow; positioned relative to nearest positioned ancestor */
position: fixed;     /* relative to viewport; stays on scroll */
position: sticky;    /* relative until threshold, then fixed */

/* Offset properties */
top:    20px;
right:  0;
bottom: 0;
left:   50%;

/* Stacking */
z-index: 10;   /* higher = in front; only works on positioned elements */
```

---

## Typography

```css
font-family:   'Inter', system-ui, -apple-system, sans-serif;
font-size:     1rem;          /* 16px default */
font-weight:   400;           /* 100–900; 700 = bold */
font-style:    italic | normal;
line-height:   1.6;           /* unitless preferred */
letter-spacing: 0.02em;
text-align:    left | center | right | justify;
text-transform: none | uppercase | lowercase | capitalize;
text-decoration: none | underline | line-through;
white-space:   normal | nowrap | pre | pre-wrap;
word-break:    break-word;
overflow:      hidden;
text-overflow: ellipsis;      /* needs overflow:hidden + white-space:nowrap */

/* Clamp font size between min and max */
font-size: clamp(1rem, 2.5vw, 2rem);
```

---

## Colors

```css
color: red;                   /* named */
color: #1d4ed8;               /* hex */
color: #1d4ed8cc;             /* hex with alpha */
color: rgb(29, 78, 216);
color: rgba(29, 78, 216, 0.8);
color: hsl(221, 77%, 48%);
color: hsla(221, 77%, 48%, 0.8);
color: oklch(55% .2 264);     /* modern, perceptually uniform */

/* Opacity (affects whole element including children) */
opacity: 0.5;
```

---

## Backgrounds

```css
background-color: #f8fafc;
background-image: url('hero.webp');
background-size:     cover | contain | 50% | 400px 200px;
background-position: center | top left | 50% 50%;
background-repeat:   no-repeat | repeat-x | repeat-y;
background-attachment: fixed | scroll;

/* Gradients */
background: linear-gradient(to right, #4f46e5, #7c3aed);
background: linear-gradient(135deg, #0f172a 0%, #1e40af 100%);
background: radial-gradient(circle at center, #4f46e5, #0f172a);

/* Shorthand */
background: url('bg.svg') center / cover no-repeat #0f172a;
```

---

## Borders & Shadows

```css
border:        1px solid #e2e8f0;
border-top:    2px solid #4f46e5;
border-radius: 8px;
border-radius: 50%;               /* circle */
border-radius: 12px 4px;          /* top-bottom / left-right */

box-shadow: 0 1px 3px rgba(0,0,0,.1);
box-shadow: 0 4px 20px rgba(0,0,0,.15), inset 0 1px 0 rgba(255,255,255,.1);
outline:    2px solid #4f46e5;    /* doesn't affect layout */
outline-offset: 4px;
```

---

## Transitions & Animations

```css
/* Transition — animate a change */
transition: all 0.2s ease;
transition: color 0.2s ease, transform 0.3s cubic-bezier(.4,0,.2,1);

/* Timing functions */
transition-timing-function: ease | ease-in | ease-out | ease-in-out | linear;
transition-timing-function: cubic-bezier(x1, y1, x2, y2);

/* Animation */
animation: name duration timing delay iteration direction fill-mode;
animation: fadeIn 0.4s ease both;
animation: spin 1s linear infinite;

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

---

## Useful Functions

| Function | Example | Purpose |
|----------|---------|---------|
| `var()` | `var(--color-brand)` | Use CSS custom property |
| `calc()` | `calc(100% - 2rem)` | Math with mixed units |
| `clamp()` | `clamp(1rem, 3vw, 2rem)` | Fluid value with min/max |
| `min()` | `min(50%, 400px)` | Use the smaller value |
| `max()` | `max(1rem, 2vw)` | Use the larger value |
| `rgb()` / `rgba()` | `rgba(0,0,0,.5)` | Color with optional alpha |
| `hsl()` | `hsl(220 90% 56%)` | Hue-saturation-lightness |
| `translate()` | `transform: translate(-50%,-50%)` | Move element |
| `scale()` | `transform: scale(1.05)` | Resize element |
| `rotate()` | `transform: rotate(45deg)` | Rotate element |
| `url()` | `background: url('img.png')` | Reference a file |
| `linear-gradient()` | see above | Gradient background |
| `repeat()` | `repeat(3, 1fr)` | Grid column shorthand |
| `minmax()` | `minmax(200px, 1fr)` | Grid size range |

---

## Media Queries

```css
/* Mobile first (min-width) */
@media (min-width: 640px)  { /* sm  — tablet portrait */ }
@media (min-width: 768px)  { /* md  — tablet landscape */ }
@media (min-width: 1024px) { /* lg  — desktop */ }
@media (min-width: 1280px) { /* xl  — large desktop */ }

/* Desktop first (max-width) */
@media (max-width: 767px)  { /* mobile only */ }

/* Other queries */
@media (prefers-color-scheme: dark)   { /* dark OS theme */ }
@media (prefers-reduced-motion: reduce) { /* motion sensitive */ }
@media (hover: hover)                 { /* device has hover */ }
@media print                          { /* print styles */ }
@media (orientation: landscape)       { /* landscape */ }
```

---

## Overflow & Scrolling

```css
overflow:   visible | hidden | scroll | auto;
overflow-x: hidden;
overflow-y: scroll;

/* Smooth scrolling */
html { scroll-behavior: smooth; }

/* Custom scrollbar */
::-webkit-scrollbar       { width: 8px; }
::-webkit-scrollbar-track { background: #f1f5f9; }
::-webkit-scrollbar-thumb { background: #94a3b8; border-radius: 4px; }

/* Snap scrolling */
.scroll-container { overflow-x: scroll; scroll-snap-type: x mandatory; }
.scroll-item      { scroll-snap-align: start; }
```

---

## CSS Custom Properties (Variables)

```css
:root {
  --color-primary: #4f46e5;
  --space-4:       1rem;
  --radius-lg:     12px;
}

.button {
  background: var(--color-primary);
  padding:    var(--space-4);
  border-radius: var(--radius-lg);
}

/* With fallback */
color: var(--text-color, #111827);

/* Override in component scope */
.danger-btn { --color-primary: #dc2626; }
```

---

## Logical Properties (RTL-safe)

```css
/* Instead of left/right: */
margin-inline-start:  1rem;   /* = margin-left in LTR */
margin-inline-end:    1rem;   /* = margin-right in LTR */
padding-block-start:  1rem;   /* = padding-top */
padding-block-end:    1rem;   /* = padding-bottom */
border-inline-start:  2px solid;
inset-inline-start:   0;      /* = left in LTR */
```
