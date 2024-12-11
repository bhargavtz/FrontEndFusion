# HTML Basics

HTML (HyperText Markup Language) is the backbone of any website, providing the basic structure and layout for web content. In this guide, we’ll cover the fundamentals of HTML to get you started on your web development journey.

---

## Table of Contents
- [HTML Basics](#html-basics)
  - [Table of Contents](#table-of-contents)
  - [Introduction to HTML](#introduction-to-html)
    - [Key Features:](#key-features)
  - [Elements and Tags](#elements-and-tags)
    - [Elements](#elements)
    - [Tags](#tags)
  - [Basic Structure of an HTML Document](#basic-structure-of-an-html-document)
    - [Explanation:](#explanation)
  - [Common HTML Tags](#common-html-tags)
    - [Headings](#headings)
    - [Paragraphs](#paragraphs)
    - [Div and Span](#div-and-span)
  - [Attributes](#attributes)
    - [Common Attributes:](#common-attributes)
  - [Lists](#lists)
    - [Ordered List](#ordered-list)
    - [Unordered List](#unordered-list)
    - [Nested List](#nested-list)
  - [Links and Navigation](#links-and-navigation)
  - [Images and Multimedia](#images-and-multimedia)
    - [Images](#images)
    - [Videos](#videos)
    - [Audio](#audio)
  - [Semantic HTML](#semantic-html)
    - [Examples:](#examples)
  - [HTML Forms](#html-forms)
    - [Input Types:](#input-types)
  - [Resources for Learning More](#resources-for-learning-more)

---

## Introduction to HTML

HTML is a markup language used to create the structure of web pages. It works by using elements, represented by tags, to define different parts of a webpage such as headings, paragraphs, links, and images.

### Key Features:
- **Simple Syntax:** Easy-to-learn structure with clear tags.
- **Browser Compatibility:** Works in all modern web browsers.
- **Extensible:** Can be combined with CSS and JavaScript for advanced functionality.

---

## Elements and Tags

### Elements
An HTML element consists of a start tag, content, and an end tag. For example:

```html
<p>This is a paragraph.</p>
```

### Tags
Tags are used to define elements and are enclosed in angle brackets (`<>`). Tags can be:
- **Opening tags:** `<p>`
- **Closing tags:** `</p>`
- **Self-closing tags:** `<img />`

---

## Basic Structure of an HTML Document

Every HTML document follows a standard structure:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My First HTML Page</title>
</head>
<body>
    <h1>Welcome to HTML Basics</h1>
    <p>This is a simple webpage.</p>
</body>
</html>
```

### Explanation:
- `<!DOCTYPE html>`: Declares the document type (HTML5).
- `<html>`: Root element of the HTML document.
- `<head>`: Contains metadata and links to external resources.
- `<body>`: Contains the visible content of the webpage.

---

## Common HTML Tags

### Headings
Used to create titles and subtitles, ranging from `<h1>` (largest) to `<h6>` (smallest):

```html
<h1>Main Title</h1>
<h2>Subheading</h2>
```

### Paragraphs
Used for blocks of text:

```html
<p>This is a paragraph.</p>
```

### Div and Span
Used for grouping and styling:

```html
<div>
    <p>Grouped content.</p>
</div>
<span>Inline content.</span>
```

---

## Attributes
Attributes provide additional information about elements. For example:

```html
<a href="https://example.com" target="_blank">Visit Example</a>
```

### Common Attributes:
- `id`: Unique identifier for an element.
- `class`: Class name for CSS styling.
- `src`: Source of an image or script.
- `alt`: Alternative text for images.
- `href`: Hyperlink reference for links.

---

## Lists

### Ordered List
Creates a numbered list:

```html
<ol>
    <li>Item 1</li>
    <li>Item 2</li>
</ol>
```

### Unordered List
Creates a bulleted list:

```html
<ul>
    <li>Item A</li>
    <li>Item B</li>
</ul>
```

### Nested List
Combines lists:

```html
<ul>
    <li>Item A
        <ul>
            <li>Sub-item A1</li>
        </ul>
    </li>
</ul>
```

---

## Links and Navigation

Hyperlinks connect web pages and sections:

```html
<a href="https://example.com">Go to Example</a>
```

Anchor tags can link to internal sections:

```html
<a href="#section-id">Jump to Section</a>
<div id="section-id">This is the section.</div>
```

---

## Images and Multimedia

### Images
Display images using the `<img>` tag:

```html
<img src="image.jpg" alt="Description" />
```

### Videos
Embed videos using `<video>`:

```html
<video controls>
    <source src="video.mp4" type="video/mp4">
    Your browser does not support the video tag.
</video>
```

### Audio
Embed audio using `<audio>`:

```html
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
    Your browser does not support the audio tag.
</audio>
```

---

## Semantic HTML

Semantic HTML improves accessibility and SEO by using meaningful tags:

### Examples:
- `<header>`: Represents the header section.
- `<footer>`: Represents the footer section.
- `<article>`: Defines self-contained content.
- `<section>`: Groups related content.

```html
<article>
    <h2>Article Title</h2>
    <p>Article content goes here.</p>
</article>
```

---

## HTML Forms

Forms collect user input:

```html
<form action="/submit" method="post">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name">
    <input type="submit" value="Submit">
</form>
```

### Input Types:
- `text`, `email`, `password`
- `checkbox`, `radio`
- `file`, `submit`

---

## Resources for Learning More

- [MDN Web Docs on HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [W3Schools HTML Tutorial](https://www.w3schools.com/html/)
- [HTML5 Specification](https://html.spec.whatwg.org/multipage/)


