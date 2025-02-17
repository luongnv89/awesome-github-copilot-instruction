# HTMX with Flask Development Guidelines

## Project Context
- Modern server-side web applications
- HTMX for dynamic interactions
- Flask backend integration
- Progressive enhancement

## Architecture Patterns
```python
# Project structure
/
├── app/
│   ├── templates/
│   │   ├── base.html
│   │   └── components/
│   ├── static/
│   │   └── js/
│   ├── routes/
│   └── models/
└── config.py

# Route with HTMX handling
@app.route('/items/<int:id>', methods=['GET'])
def get_item(id):
    if is_htmx_request():
        return render_template('components/item.html', item=item)
    return render_template('items.html', items=items)

# Template with HTMX
{% extends "base.html" %}
{% block content %}
<div hx-get="/api/items" 
     hx-trigger="load"
     hx-swap="innerHTML">
</div>
{% endblock %}
```

## HTMX Patterns
### Common Attributes
- hx-get/post/put/delete
- hx-trigger
- hx-target
- hx-swap
- hx-indicator

### Event Handling
```html
<!-- Dynamic form submission -->
<form hx-post="/submit"
      hx-swap="outerHTML"
      hx-trigger="submit">
    <!-- Form fields -->
</form>

<!-- Lazy loading -->
<div hx-get="/api/items"
     hx-trigger="revealed"
     hx-swap="afterend">
</div>
```

## Best Practices
- Use proper HTML semantics
- Implement progressive enhancement
- Handle loading states
- Manage error responses
- Use proper validation

## Performance Guidelines
- Minimize response size
- Use proper caching
- Implement lazy loading
- Handle race conditions
- Optimize server responses

## Testing Requirements
- Server-side testing
- Integration testing
- UI interaction tests
- Response validation
- Error handling tests

## Security Guidelines
- CSRF protection
- Input validation
- XSS prevention
- Rate limiting
- Authentication checks

## Documentation Standards
- Document HTMX patterns
- API documentation
- Template structure
- Component usage
- Setup instructions