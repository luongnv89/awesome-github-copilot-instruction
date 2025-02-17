# HTML, Tailwind CSS, and JavaScript Development Instructions

## Project Context
- Modern web development
- Responsive design
- Interactive UI components
- Accessibility standards
- Performance optimization

## Code Style Guidelines
- Semantic HTML
- Tailwind class organization
- JavaScript best practices
- Component structure
- Accessibility patterns

## Architecture Patterns
- Component composition
- State management
- Event delegation
- CSS organization
- Module patterns

## Testing Requirements
- Component testing
- Visual testing
- Accessibility testing
- Performance testing
- Cross-browser testing

## Documentation Standards
- Component documentation
- Accessibility notes
- Tailwind customization
- JavaScript APIs
- Browser support

## Project-Specific Rules
### Web Development Patterns
```html
<!-- Component Pattern -->
<template data-component="card">
  <article class="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <div class="aspect-video relative">
      <img 
        src="placeholder.jpg" 
        alt="Card image" 
        class="object-cover w-full h-full"
        loading="lazy"
      >
    </div>
    <div class="p-4 space-y-2">
      <h3 class="text-lg font-semibold text-gray-900 line-clamp-2">
        Card Title
      </h3>
      <p class="text-gray-600 line-clamp-3">
        Card description that might be longer and need truncation...
      </p>
      <button 
        class="inline-flex items-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        type="button"
      >
        Learn More
      </button>
    </div>
  </article>
</template>

<!-- JavaScript Component -->
class Component {
  constructor(element) {
    this.element = element;
    this.state = new Proxy(this.getInitialState(), {
      set: (target, property, value) => {
        target[property] = value;
        this.render();
        return true;
      }
    });
    
    this.init();
  }
  
  getInitialState() {
    return {};
  }
  
  init() {
    this.bindEvents();
  }
  
  bindEvents() {}
  
  render() {}
}

// Card Component Implementation
class Card extends Component {
  getInitialState() {
    return {
      expanded: false,
      loading: false
    };
  }
  
  bindEvents() {
    this.element.querySelector('button')
      .addEventListener('click', () => this.handleClick());
  }
  
  async handleClick() {
    this.state.loading = true;
    try {
      const data = await this.fetchDetails();
      this.state.expanded = true;
      this.state.details = data;
    } catch (error) {
      console.error('Failed to load details:', error);
    } finally {
      this.state.loading = false;
    }
  }
  
  render() {
    // Update DOM based on state
  }
}

// Utility Functions
const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

const observeIntersection = (element, callback, options = {}) => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry);
      }
    });
  }, options);
  
  observer.observe(element);
  return () => observer.disconnect();
};

// Form Validation
class FormValidator {
  constructor(form) {
    this.form = form;
    this.fields = {};
    this.init();
  }
  
  init() {
    this.form.setAttribute('novalidate', '');
    this.setupFields();
    this.bindEvents();
  }
  
  setupFields() {
    this.form.querySelectorAll('[data-validate]').forEach(field => {
      const rules = field.dataset.validate.split(',');
      this.fields[field.name] = { element: field, rules };
    });
  }
  
  validate() {
    let isValid = true;
    
    Object.entries(this.fields).forEach(([name, field]) => {
      const value = field.element.value;
      const errors = this.validateField(value, field.rules);
      
      if (errors.length) {
        isValid = false;
        this.showErrors(field.element, errors);
      } else {
        this.clearErrors(field.element);
      }
    });
    
    return isValid;
  }
}

// Modal Component
class Modal extends Component {
  static template = `
    <div class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
      <div class="relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
        <div class="p-4">
          <button 
            type="button"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
            aria-label="Close"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div class="modal-content"></div>
        </div>
      </div>
    </div>
  `;
  
  constructor(content) {
    super();
    this.content = content;
    this.render();
    this.show();
  }
  
  show() {
    document.body.appendChild(this.element);
    document.body.classList.add('overflow-hidden');
  }
  
  hide() {
    this.element.remove();
    document.body.classList.remove('overflow-hidden');
  }
}

// Accessibility Helpers
const A11y = {
  handleTabTrapping(element) {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', e => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    });
  }
};