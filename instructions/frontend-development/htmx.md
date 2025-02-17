# HTMX Development Instructions

## Project Context
- Server-driven UI development
- Progressive enhancement
- HTML-first approach
- Backend integration patterns

## Code Style Guidelines
- Use semantic HTML attributes
- Follow proper HTMX attribute patterns
- Implement proper event handlers
- Use proper CSS triggers
- Follow progressive enhancement patterns

## Architecture Patterns
- Use proper server endpoints
- Implement proper partial updates
- Follow proper state management
- Use proper history management
- Implement proper form handling

## Testing Requirements
- Test HTMX interactions
- Validate server responses
- Test event handling
- Implement end-to-end tests
- Test JavaScript extensions

## Documentation Standards
- Document HTMX attributes
- Include interaction flows
- Document server endpoints
- Maintain event documentation
- Document extension usage

## Project-Specific Rules
### Integration Patterns
- Use proper swap methods
- Implement proper indicators
- Follow proper boosting patterns
- Use proper validation feedback
- Implement proper error handling

## Common Patterns
```html
<!-- Component Template -->
<div hx-get="/api/data" 
     hx-trigger="load"
     hx-target="#result"
     hx-indicator="#loading">
  
  <div id="loading" class="htmx-indicator">
    Loading...
  </div>
  
  <div id="result">
    <!-- Content will be swapped here -->
  </div>
</div>

<!-- Form Template -->
<form hx-post="/api/submit"
      hx-swap="outerHTML"
      hx-validate="true">
  <input name="field" 
         required
         hx-get="/api/validate"
         hx-trigger="change">
  <button type="submit">Submit</button>
</form>
```