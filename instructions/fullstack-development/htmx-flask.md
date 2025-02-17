# HTMX with Flask Development Instructions

## Project Context
- Server-side rendering with HTMX
- Flask framework integration
- Progressive enhancement
- Database integration with SQLAlchemy

## Code Style Guidelines
- Follow Flask application factory pattern
- Use Blueprint organization
- Implement proper route handling
- Follow proper template structure
- Use proper HTMX attributes

## Architecture Patterns
- Use proper view functions
- Implement proper partial responses
- Follow proper model structure
- Use proper form handling
- Implement proper error handling

## Testing Requirements
- Test view functions
- Validate HTMX responses
- Test database operations
- Implement integration tests
- Test form submissions

## Documentation Standards
- Document route endpoints
- Include template structure
- Document model schemas
- Maintain setup guides
- Include HTMX patterns

## Project-Specific Rules
### HTMX Integration
- Use proper response headers
- Implement proper triggers
- Follow proper swap methods
- Use proper validation feedback
- Implement proper history management

## Common Patterns
```python
# Application Factory
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    
    db.init_app(app)
    
    from .views import main
    app.register_blueprint(main)
    
    return app

# View Functions
from flask import Blueprint, render_template, request

main = Blueprint('main', __name__)

@main.route('/users', methods=['GET'])
def list_users():
    users = User.query.all()
    if request.headers.get('HX-Request'):
        return render_template('partials/users.html', users=users)
    return render_template('pages/users.html', users=users)

@main.route('/users', methods=['POST'])
def create_user():
    form = UserForm(request.form)
    if form.validate():
        user = User(
            name=form.name.data,
            email=form.email.data
        )
        db.session.add(user)
        db.session.commit()
        
        return render_template('partials/user.html', user=user)
    
    return render_template(
        'partials/form_errors.html',
        errors=form.errors
    ), 400

# Templates
"""
base.html
"""
<!DOCTYPE html>
<html>
<head>
    <title>{{ title }}</title>
    <script src="/static/htmx.min.js"></script>
</head>
<body>
    {% block content %}{% endblock %}
</body>
</html>

"""
users.html
"""
{% extends "base.html" %}
{% block content %}
<div id="users-container"
     hx-get="/users"
     hx-trigger="load delay:100ms"
     hx-swap="innerHTML">
    <div class="loading">Loading...</div>
</div>

<form hx-post="/users"
      hx-target="#users-container"
      hx-swap="beforeend">
    {{ form.csrf_token }}
    <div>
        {{ form.name.label }}
        {{ form.name(hx-validate="true") }}
    </div>
    <div>
        {{ form.email.label }}
        {{ form.email(hx-validate="true") }}
    </div>
    <button type="submit">Add User</button>
</form>
{% endblock %}
```