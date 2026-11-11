# CSS Fundamentals

## Introduction to CSS
- **What is CSS?**
  - Definition and purpose of CSS in web development.
  - Importance of separation of content (HTML) and presentation (CSS).

- **History of CSS**
  - Brief overview of the evolution of CSS from its inception to the latest version (CSS3).

## Basic Syntax
- **CSS Rules**
  - Structure of a CSS rule: selector, property, and value.
  - Example: 
    ```css
    h1 {
      color: blue;
      font-size: 24px;
    }
    ```

- **Selectors**
  - Types of selectors: element, class, ID, attribute, pseudo-class, and pseudo-element.
  - Examples:
    - Element Selector: `p`
    - Class Selector: `.class-name`
    - ID Selector: `#id-name`

## CSS Box Model
- **Understanding the Box Model**
  - Components: content, padding, border, and margin.
  - Visual representation of the box model.

- **Box Model Properties**
  - `width`, `height`, `padding`, `border`, `margin`.
  - Example of box model properties in use:
    ```css
    .box {
      width: 300px;
      padding: 20px;
      border: 5px solid black;
      margin: 10px;
    }
    ```

## Layout Techniques
- **Positioning**
  - Static, relative, absolute, fixed, and sticky positioning.
  - Examples and use cases for each type.

- **Flexbox**
  - Introduction to Flexbox layout.
  - Key properties: `display`, `flex-direction`, `justify-content`, `align-items`.
  - Example:
    ```css
    .container {
      display: flex;
      justify-content: space-between;
    }
    ```

- **Grid Layout**
  - Overview of CSS Grid layout.
  - Key properties: `display`, `grid-template-columns`, `grid-template-rows`.
  - Example:
    ```css
    .grid-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
    ```

## Styling Text
- **Text Properties**
  - Font family, size, weight, style, line height.
  - Example:
    ```css
    body {
      font-family: Arial, sans-serif;
      font-size: 16px;
      line-height: 1.5;
    }
    ```

- **Text Alignment and Decoration**
  - Properties for alignment (`text-align`) and decoration (`text-decoration`).

## Colors and Backgrounds
- **Color Values**
  - Different ways to specify colors: named colors, HEX, RGB, RGBA, HSL.
  
- **Background Properties**
  - Background color, image, position, size.
  - Example:
    ```css
    .background {
      background-color: lightblue;
      background-image: url('image.jpg');
      background-size: cover;
    }
    ```

## Responsive Design
- **Media Queries**
  - Definition and purpose of media queries in responsive design.
  - Example:
    ```css
    @media (max-width: 600px) {
      body {
        background-color: lightgrey;
      }
    }
    ```

## Conclusion
- **Best Practices in CSS**
  - Importance of organization and commenting.
  - Use of external stylesheets for maintainability.

- **Further Learning Resources**
  - Recommended books, online courses, and documentation for advanced CSS techniques.
