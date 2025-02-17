# HTML, Tailwind CSS, and JavaScript Development Instructions

## Project Context
- Modern frontend development
- Utility-first CSS with Tailwind
- Vanilla JavaScript optimization
- Progressive enhancement

## Code Style Guidelines
- Use semantic HTML5 elements
- Follow BEM-like Tailwind patterns
- Implement proper JavaScript modules
- Use proper accessibility attributes
- Follow proper responsive design

## Architecture Patterns
- Use proper component structure
- Implement proper state management
- Follow proper event delegation
- Use proper module bundling
- Implement proper asset optimization

## Testing Requirements
- Test JavaScript functionality
- Validate responsive layouts
- Test accessibility features
- Implement E2E testing
- Test browser compatibility

## Documentation Standards
- Document component patterns
- Include responsive breakpoints
- Document JavaScript modules
- Maintain style guide
- Include accessibility notes

## Project-Specific Rules
### Tailwind Patterns
- Use proper utility composition
- Implement proper responsive classes
- Follow proper dark mode patterns
- Use proper container queries
- Implement proper custom variants

## Common Patterns
```html
<!-- Component Template -->
<article class="card group hover:shadow-lg transition-shadow duration-300">
  <header class="card-header p-4 bg-gray-50">
    <h2 class="text-lg font-semibold text-gray-800">
      {{ title }}
    </h2>
  </header>
  
  <div class="card-body p-4">
    <p class="text-gray-600">
      {{ content }}
    </p>
  </div>
  
  <footer class="card-footer p-4 border-t">
    <button 
      class="btn btn-primary"
      data-action="click->card#expand">
      Read More
    </button>
  </footer>
</article>

<!-- JavaScript Module -->
class CardComponent {
  constructor(element) {
    this.element = element;
    this.bindEvents();
  }

  bindEvents() {
    this.element.addEventListener('click', e => {
      const action = e.target.dataset.action;
      if (action === 'card#expand') {
        this.expand();
      }
    });
  }

  expand() {
    this.element.classList.toggle('is-expanded');
  }
}

// Initialize components
document.querySelectorAll('.card').forEach(card => {
  new CardComponent(card);
});

// Utility Functions
const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

const observeIntersection = (elements, callback, options = {}) => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => callback(entry));
  }, options);
  
  elements.forEach(element => observer.observe(element));
  return observer;
};
```

```css
/* Tailwind Custom Components */
@layer components {
  .btn {
    @apply px-4 py-2 rounded-lg font-medium transition-colors;
  }
  
  .btn-primary {
    @apply bg-blue-500 text-white hover:bg-blue-600;
  }
  
  .card {
    @apply bg-white rounded-lg border border-gray-200;
  }
}

/* Dark Mode Variants */
@media (prefers-color-scheme: dark) {
  .card {
    @apply bg-gray-800 border-gray-700;
  }
  
  .btn-primary {
    @apply bg-blue-600 hover:bg-blue-700;
  }
}
```