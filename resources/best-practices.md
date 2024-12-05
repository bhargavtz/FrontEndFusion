# Accessibility Tips for Frontend Developers

## 🦐 Introduction
Web accessibility ensures that everyone, including individuals with disabilities, can perceive, understand, navigate, and interact with your website. By following best practices, you can create inclusive designs that comply with accessibility standards like WCAG (Web Content Accessibility Guidelines).

---

## 🌐 Key Accessibility Practices

### 1. Use Semantic HTML
Semantic HTML improves accessibility by providing meaning to content.
- Use `<header>`, `<main>`, `<footer>`, `<nav>`, and `<article>` appropriately.
- Example:
  ```html
  <header>
    <h1>Welcome to Accessibility First</h1>
  </header>
  <main>
    <article>
      <h2>Best Practices</h2>
      <p>Learn how to make your website more accessible.</p>
    </article>
  </main>
  <footer>
    <p>Contact us for accessibility audits.</p>
  </footer>
  ```

### 2. Provide Alt Text for Images
Alt text describes the purpose of images for users with visual impairments.
- Keep descriptions concise and meaningful.
- Avoid using "image of" or "picture of."
- Example:
  ```html
  <img src="keyboard.webp" alt="Mechanical keyboard with RGB lighting">
  ```

### 3. Ensure Sufficient Color Contrast
Proper contrast ensures text is readable.
- Use tools like [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/).
- Example of good contrast:
  ```css
  body {
    color: #1a1a1a; /* Dark text */
    background-color: #ffffff; /* Light background */
  }
  ```

### 4. Use Keyboard-Accessible Navigation
Ensure users can navigate via the keyboard.
- Use `tabindex` for custom focusable elements.
- Avoid removing `outline` styles.
- Example:
  ```html
  <button tabindex="0">Click Me</button>
  ```

### 5. Add ARIA Attributes
ARIA (Accessible Rich Internet Applications) enhances interaction for assistive technologies.
- Use ARIA roles and attributes sparingly.
- Example:
  ```html
  <button aria-label="Submit Form">Submit</button>
  ```

### 6. Provide Clear Focus Indicators
Help users identify which element is active.
- Customize focus styles for better visibility.
- Example:
  ```css
  button:focus {
    outline: 2px dashed #1e90ff;
  }
  ```

### 7. Design Responsive Layouts
Ensure designs adapt to different devices.
- Use media queries and flexible units.
- Test designs on various screen sizes.

### 8. Write Descriptive Links
Avoid vague text like "click here."
- Example:
  ```html
  <a href="/guidelines">Read our Accessibility Guidelines</a>
  ```

### 9. Include Captions and Transcripts for Media
Captions help users with hearing impairments.
- Example:
  ```html
  <video controls>
    <source src="intro.mp4" type="video/mp4">
    <track src="captions.vtt" kind="subtitles" srclang="en" label="English">
  </video>
  ```

### 10. Test with Accessibility Tools
Regularly test your site’s accessibility.
- Use screen readers (e.g., NVDA, JAWS).
- Use browser extensions like Axe or Lighthouse.

---

## 🗑️ Checklist for Accessible Websites

- [ ] Use semantic HTML.
- [ ] Add alt text for all images.
- [ ] Ensure sufficient color contrast.
- [ ] Make navigation keyboard-accessible.
- [ ] Use ARIA attributes where needed.
- [ ] Provide clear focus indicators.
- [ ] Write meaningful and descriptive links.
- [ ] Add captions and transcripts for videos.
- [ ] Test accessibility with screen readers and tools.

---

## 🖋️ Resources
- [WebAIM – Web Accessibility In Mind](https://webaim.org/)
- [W3C Web Accessibility Initiative](https://www.w3.org/WAI/)
- [Accessible Colors](https://accessible-colors.com/)
- [Google Lighthouse](https://developers.google.com/web/tools/lighthouse/)

By following these best practices, you can create websites that are inclusive and usable for everyone.

