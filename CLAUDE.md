# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

**FrontEndFusion** is a comprehensive HTML and CSS learning and resource repository. It serves as both a portfolio site and an educational hub with:
- Fully functional demo projects with HTML/CSS implementations
- Curated code snippets for common use cases
- Educational documentation covering best practices, accessibility, and SEO
- A structured learning path for mastering frontend fundamentals

This is a **pure static frontend project** with no build system, backend, or runtime dependencies.

## Project Structure

### Core Files & Directories

**Root Level**
- `index.html` - Main portfolio/landing page demonstrating accessibility best practices
- `styles.css` - Global stylesheet with CSS custom properties for theming
- `README.md` - Main documentation for contributors and learners
- `SECURITY.md` - Security policy and vulnerability reporting guidelines

**Projects Directory** (`/projects/`)
- Self-contained HTML/CSS projects with individual READMEs
- Each project is a standalone working example (e.g., Responsive Navbar, landing-page)
- Projects demonstrate real-world use cases and responsive design patterns
- Include both structure (HTML) and styling (inline CSS or separate stylesheets)

**Snippets Directory** (`/snippets/`)
- Reusable code examples for common components (forms, buttons, layouts)
- Organized by functionality
- Quick reference templates for developers to copy and adapt

**Resources Directory** (`/resources/`)
- Markdown documentation files covering:
  - `best-practices.md` - HTML/CSS conventions and optimization patterns
  - `accessibility.md` - WCAG guidelines and inclusive design principles
  - `seo-tips.md` - SEO optimization for static HTML sites

**Web Development Learning Path** (`/web-dev-learning-path/`)
- Structured educational content organized in `/docs/` folder
- Progressive learning modules (HTML basics → CSS fundamentals → responsive design → advanced topics)
- Serves as a comprehensive guide for learners from beginner to advanced

### Styling Approach

- **CSS Custom Properties (Variables)**: Used extensively for theming
  - Examples: `--primary-color`, `--secondary-color`, `--text-color`, `--bg-color`
  - Enables consistent theming across projects and easy color scheme updates
- **Mixed Styling Methods**: Projects may use:
  - Inline `<style>` tags for encapsulation
  - External stylesheets for larger projects
  - Tailwind CSS and Bootstrap CDN for some demo pages (via CDN)
- **Responsive Design**: Emphasis on mobile-first approach with media queries
- **No CSS Preprocessors**: Pure CSS3 throughout the codebase

## Working with Content

### Adding New Projects

1. Create a new folder under `/projects/` with a descriptive name
2. Include `index.html` as the entry point
3. Add optional `style.css` or inline styles in `<style>` tags
4. Create a `README.md` explaining the project purpose and features
5. Keep projects self-contained with no external build steps

**Project Guidelines:**
- Ensure semantic HTML5 structure
- Use descriptive class and id names following kebab-case convention
- Make projects responsive using media queries (mobile-first approach)
- Demonstrate at least one modern CSS technique (Flexbox, Grid, animations, etc.)

### Adding Snippets

1. Place code examples in `/snippets/` organized by category
2. Include clear comments explaining the purpose
3. Ensure snippets are copy-paste ready and work independently
4. Update `snippets/README.md` with descriptions of new snippets

**Snippet Guidelines:**
- Keep each snippet focused on a single feature or component
- Include both HTML and CSS in the same file for portability
- Provide context comments on non-obvious styling decisions

### Updating Documentation

1. **Best Practices** (`resources/best-practices.md`): Add conventions, performance tips, maintainability patterns
2. **Accessibility** (`resources/accessibility.md`): Document WCAG compliance patterns, semantic HTML benefits
3. **SEO Tips** (`resources/seo-tips.md`): Include optimization strategies for static sites, meta tags, structured data
4. **Learning Path** (`web-dev-learning-path/docs/`): Expand structured tutorials with practical examples

## Code Conventions

### HTML Structure
- Use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`, etc.)
- Always include `<meta charset="UTF-8">` and viewport meta tag for responsiveness
- Use meaningful IDs and class names in kebab-case
- Include `lang="en"` attribute on `<html>` tag

### CSS Naming & Organization
- Follow **CSS Custom Properties pattern** for colors and spacing:
  ```css
  :root {
    --primary-color: #1d4ed8;
    --secondary-color: #9333ea;
    --text-color: #4b5563;
    --background-color: #f3f4f6;
  }
  ```
- Use BEM-inspired naming for clarity (e.g., `.card__header`, `.btn--primary`)
- Group styles logically: reset → custom utilities → component-specific → animations
- Always include transitions and hover states for interactive elements

### Accessibility Standards
- Use proper heading hierarchy (`<h1>` → `<h2>` → `<h3>`, no skipping levels)
- Include descriptive `alt` text for all images
- Use `<label>` with form inputs (connected via `for` attribute)
- Ensure sufficient color contrast (WCAG AA minimum: 4.5:1 for text)
- Make interactive elements keyboard accessible (`:focus` states, logical tab order)

### File & Naming Conventions
- HTML files: lowercase with hyphens (e.g., `contact-form.html`)
- CSS files: lowercase with hyphens (e.g., `style.css`, `responsive-navbar.css`)
- Asset folders: lowercase with descriptive names (e.g., `/assets/`, `/images/`)

## Common Development Tasks

### Viewing Projects
Since this is a static site, projects can be viewed directly by opening HTML files in a browser:
- Open any `.html` file in your browser to preview
- Use VS Code's Live Preview extension (configured in `.vscode/settings.json`)
- No server or build step required

### Testing Responsive Design
- Use browser DevTools to test at different breakpoints
- Check mobile (375px), tablet (768px), and desktop (1024px+) viewport sizes
- Verify touch-friendly button sizes (minimum 44x44px)

### Adding External Dependencies
- Prefer CDN links for libraries (e.g., Bootstrap, Tailwind, AOS)
- Document CDN links in project READMEs for clarity
- Keep dependencies minimal to maintain learning-focused approach
- Include fallbacks for critical features if possible

### Updating the Main Portfolio
When modifying `index.html` or `styles.css`:
- Test changes across modern browsers (Chrome, Firefox, Safari, Edge)
- Maintain accessibility standards (all existing WCAG compliance)
- Ensure responsive behavior is not broken
- Update `README.md` if adding new projects or major features

## Key Principles

1. **Education First**: Code examples should be clear and teachable; favor readability over cleverness
2. **No Build Tools**: Everything is plain HTML/CSS/JavaScript when needed (no compilation, bundling, or frameworks)
3. **Semantic HTML**: Structure always comes before styling; use HTML5 semantic elements
4. **Responsive by Default**: All new projects must work on mobile, tablet, and desktop
5. **Accessibility Matters**: Follow WCAG guidelines in all new content; demonstrate inclusive design
6. **Reusability**: Snippets and patterns should be extractable and adaptable for learners

## Resources & References

- [MDN Web Docs](https://developer.mozilla.org/) - Authoritative reference for HTML/CSS
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - Accessibility standards
- [CSS Tricks](https://css-tricks.com/) - Best practices and techniques
- Repository's own `/resources/` directory for curated best practices and SEO tips

## Contact & Contribution

- **Maintainer**: Bhargav (bhargav05@yandex.com)
- **Repository**: [bhargavtz/FrontEndFusion](https://github.com/bhargavtz/FrontEndFusion)
- **Contributions**: Follow the workflow in README.md; create feature branches and PRs
