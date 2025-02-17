# HTMX Development Instructions

## Project Context
- HTMX-powered applications
- HTML-first development
- Server-side rendering
- Progressive enhancement
- Hypermedia-driven architecture

## Code Style Guidelines
- HTMX attribute patterns
- CSS organization
- Event handling
- Error handling
- Response formatting

## Architecture Patterns
- Hypermedia controls
- Partial updates
- Form handling
- Server-side validation
- State management

## Testing Requirements
- Integration testing
- Event testing
- Response testing
- Visual testing
- Accessibility testing

## Documentation Standards
- Attribute documentation
- Event documentation
- Response patterns
- Error handling
- Browser support

## Project-Specific Rules
### HTMX Patterns
```html
<!-- Basic HTMX Pattern -->
<div class="container mx-auto p-4">
  <!-- Dynamic Content Loading -->
  <button 
    class="px-4 py-2 bg-blue-500 text-white rounded"
    hx-get="/api/items"
    hx-trigger="click"
    hx-target="#items-list"
    hx-indicator="#spinner"
  >
    Load Items
  </button>

  <!-- Loading Indicator -->
  <div id="spinner" class="htmx-indicator">
    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>

  <!-- Target Container -->
  <div id="items-list" class="mt-4 space-y-2">
    <!-- Items will be loaded here -->
  </div>

  <!-- Form Submission -->
  <form 
    hx-post="/api/items"
    hx-swap="afterend"
    hx-trigger="submit"
    class="mt-8 space-y-4"
  >
    <div>
      <label class="block text-sm font-medium text-gray-700">
        Item Name
      </label>
      <input 
        type="text" 
        name="name"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        required
      >
    </div>
    <button 
      type="submit"
      class="px-4 py-2 bg-green-500 text-white rounded"
    >
      Add Item
    </button>
  </form>

  <!-- Infinite Scroll -->
  <div
    hx-get="/api/items?page=${next}"
    hx-trigger="revealed"
    hx-swap="afterend"
    class="mt-8"
  >
    <!-- Content here -->
  </div>

  <!-- Validation Feedback -->
  <form 
    hx-post="/api/validate"
    hx-trigger="change"
    hx-target="next .error-message"
  >
    <input 
      type="email" 
      name="email"
      class="block w-full mt-1 rounded-md border-gray-300"
    >
    <div class="error-message text-red-500 text-sm"></div>
  </form>

  <!-- Confirmation Dialog -->
  <button
    hx-delete="/api/items/1"
    hx-confirm="Are you sure?"
    hx-target="#item-1"
    class="text-red-500 hover:text-red-700"
  >
    Delete Item
  </button>

  <!-- Out-of-Band Updates -->
  <div 
    id="notification"
    hx-swap-oob="true"
    class="fixed top-4 right-4 bg-green-500 text-white p-4 rounded shadow"
  >
    Item updated successfully
  </div>
</div>

<!-- Server Response Templates -->
<!-- Success Response -->
<template id="success-template">
  <div class="bg-green-100 border-l-4 border-green-500 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <svg class="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
      </div>
      <div class="ml-3">
        <p class="text-sm text-green-700">
          Operation completed successfully
        </p>
      </div>
    </div>
  </div>
</template>

<!-- Error Response -->
<template id="error-template">
  <div class="bg-red-100 border-l-4 border-red-500 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <svg class="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>
      </div>
      <div class="ml-3">
        <p class="text-sm text-red-700">
          An error occurred
        </p>
      </div>
    </div>
  </div>
</template>

<!-- JavaScript Helpers -->
<script>
  // Custom Events Handler
  htmx.on('htmx:afterSwap', function(evt) {
    if (evt.detail.target.id === 'notification') {
      setTimeout(() => {
        evt.detail.target.remove();
      }, 3000);
    }
  });

  // Response Interceptor
  htmx.defineTransformer('response', function(response) {
    if (response.status === 422) {
      const template = document.getElementById('error-template');
      return template.content.cloneNode(true);
    }
    return response;
  });

  // Progress Indicator
  htmx.defineTransformer('progress', function(progress) {
    const percent = Math.round((progress.loaded / progress.total) * 100);
    document.querySelector('.progress-bar').style.width = percent + '%';
  });
</script>
```