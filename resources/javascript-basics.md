# JavaScript Basics for Frontend Developers

A practical guide to the JavaScript you need for building interactive web UIs — no frameworks required.

---

## 1. Selecting DOM Elements

```js
// By ID — returns one element or null
const btn = document.getElementById('submit-btn');

// By CSS selector — returns first match
const card = document.querySelector('.card');

// By CSS selector — returns all matches (NodeList)
const items = document.querySelectorAll('.nav-item');

// Shorthand pattern used throughout this guide
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);
```

---

## 2. Reading & Changing the DOM

```js
const heading = document.querySelector('h1');

// Read text content
console.log(heading.textContent);

// Change text
heading.textContent = 'Hello World';

// Read/write HTML
heading.innerHTML = '<em>Styled</em> heading';

// Read/change attributes
const link = document.querySelector('a');
link.getAttribute('href');
link.setAttribute('href', 'https://example.com');

// Read/change CSS classes
const el = document.querySelector('.card');
el.classList.add('active');
el.classList.remove('hidden');
el.classList.toggle('dark');
el.classList.contains('active');  // → true/false

// Read/write inline styles
el.style.background = 'red';
el.style.display = 'none';
```

---

## 3. Event Listeners

```js
const btn = document.querySelector('#myBtn');

// Basic click
btn.addEventListener('click', function (event) {
  console.log('clicked!', event.target);
});

// Arrow function syntax
btn.addEventListener('click', (e) => {
  e.preventDefault();   // stop default browser action (e.g., form submit)
  e.stopPropagation();  // stop event bubbling up
});

// Common events
document.addEventListener('DOMContentLoaded', () => { /* DOM ready */ });
window.addEventListener('resize', () => { /* viewport changed */ });
input.addEventListener('input',  (e) => console.log(e.target.value));
input.addEventListener('change', (e) => console.log(e.target.value));
form.addEventListener('submit',  (e) => { e.preventDefault(); /* handle */ });
el.addEventListener('keydown', (e) => console.log(e.key));
el.addEventListener('mouseenter', () => { /* hover start */ });
el.addEventListener('mouseleave', () => { /* hover end */ });
```

---

## 4. Creating & Inserting Elements

```js
// Create an element
const card = document.createElement('div');
card.className = 'card';
card.textContent = 'New card';

// Append to parent
document.getElementById('container').appendChild(card);

// Insert HTML string (faster for bulk content)
container.insertAdjacentHTML('beforeend', `
  <div class="card">
    <h3>Card title</h3>
    <p>Card body text.</p>
  </div>
`);

// Remove an element
card.remove();

// Clone an element (true = deep clone including children)
const copy = card.cloneNode(true);
```

---

## 5. localStorage

Save data that persists between page reloads (no server needed).

```js
// Save
localStorage.setItem('theme', 'dark');
localStorage.setItem('user', JSON.stringify({ name: 'Jane', age: 28 }));

// Read
const theme = localStorage.getItem('theme');           // → 'dark'
const user  = JSON.parse(localStorage.getItem('user')); // → { name:'Jane', age:28 }

// Delete one key
localStorage.removeItem('theme');

// Clear everything
localStorage.clear();

// Check if key exists
if (localStorage.getItem('onboarded') === null) {
  showOnboarding();
}
```

---

## 6. The Fetch API

Make HTTP requests without a library.

```js
// GET request
fetch('https://api.example.com/posts')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Async/await (preferred)
async function loadPosts() {
  try {
    const response = await fetch('https://api.example.com/posts');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const posts = await response.json();
    return posts;
  } catch (err) {
    console.error('Failed to load posts:', err);
  }
}

// POST request with JSON body
async function createPost(data) {
  const response = await fetch('https://api.example.com/posts', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(data),
  });
  return response.json();
}
```

---

## 7. Timers

```js
// Run once after a delay (milliseconds)
const id = setTimeout(() => {
  console.log('Runs after 2 seconds');
}, 2000);

clearTimeout(id);  // cancel before it fires

// Run repeatedly
const intervalId = setInterval(() => {
  console.log('Runs every second');
}, 1000);

clearInterval(intervalId);  // stop it

// requestAnimationFrame — smooth animations (fires ~60 fps)
function animate(timestamp) {
  // update element position...
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
```

---

## 8. Arrays — Key Methods

```js
const nums = [3, 1, 4, 1, 5, 9, 2, 6];

nums.map(n => n * 2);            // [6,2,8,2,10,18,4,12]  — transform each
nums.filter(n => n > 4);         // [5,9,6]                — keep matching
nums.reduce((sum, n) => sum + n, 0); // 31               — collapse to one value
nums.find(n => n > 4);           // 5                     — first match
nums.some(n => n > 8);           // true                  — any match?
nums.every(n => n > 0);          // true                  — all match?
nums.includes(4);                // true
nums.sort((a, b) => a - b);      // [1,1,2,3,4,5,6,9]    — ascending

// Spread (non-mutating copy + merge)
const copy    = [...nums];
const merged  = [...nums, 7, 8];
```

---

## 9. Objects

```js
const person = { name: 'Jane', age: 28, city: 'NYC' };

// Destructuring
const { name, age } = person;

// Spread (shallow clone or merge)
const updated = { ...person, age: 29 };

// Object methods
Object.keys(person);    // ['name','age','city']
Object.values(person);  // ['Jane',28,'NYC']
Object.entries(person); // [['name','Jane'],['age',28],['city','NYC']]

// Optional chaining (safe deep access)
const zip = person?.address?.zip;  // undefined instead of error
```

---

## 10. Modules (ES Modules)

Split code across files using `import`/`export`.

```js
// utils.js
export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US').format(date);
}
export const PI = 3.14159;
export default function greet(name) { return `Hello, ${name}!`; }

// main.js
import greet, { formatDate, PI } from './utils.js';
```

Use in HTML with `type="module"`:
```html
<script type="module" src="main.js"></script>
```

---

## 11. Common Patterns

### Toggle visibility
```js
function toggleMenu() {
  document.getElementById('menu').classList.toggle('hidden');
}
```

### Debounce (limit how often a function fires)
```js
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
const onSearch = debounce((e) => fetchResults(e.target.value), 300);
input.addEventListener('input', onSearch);
```

### Lazy-render a list
```js
function renderList(items) {
  const list = document.getElementById('list');
  list.innerHTML = items
    .map(item => `<li class="item">${item.name}</li>`)
    .join('');
}
```

### Simple pub/sub event bus
```js
const events = {};
const on  = (name, fn) => (events[name] = events[name] || []).push(fn);
const off = (name, fn) => events[name] = (events[name] || []).filter(f => f !== fn);
const emit = (name, data) => (events[name] || []).forEach(fn => fn(data));
```

---

## Quick Reference

| Task | Method |
|------|--------|
| Select element | `document.querySelector(sel)` |
| Select all | `document.querySelectorAll(sel)` |
| Listen to event | `el.addEventListener(event, fn)` |
| Add class | `el.classList.add('name')` |
| Toggle class | `el.classList.toggle('name')` |
| Set text | `el.textContent = '…'` |
| Set HTML | `el.innerHTML = '…'` |
| Create element | `document.createElement('tag')` |
| Append to DOM | `parent.appendChild(el)` |
| Remove from DOM | `el.remove()` |
| Save to storage | `localStorage.setItem(key, val)` |
| Read from storage | `localStorage.getItem(key)` |
| HTTP GET | `fetch(url).then(r => r.json())` |
| Delay action | `setTimeout(fn, ms)` |
| Repeat action | `setInterval(fn, ms)` |
