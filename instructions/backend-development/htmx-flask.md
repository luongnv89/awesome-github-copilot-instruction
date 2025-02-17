# HTMX Flask Development Instructions

## Project Context
- Flask web framework
- HTMX integration
- Server-side rendering
- Jinja2 templates
- SQLAlchemy ORM

## Code Style Guidelines
- Flask application structure
- HTMX attributes
- Template organization
- Blueprint patterns
- Response handling

## Architecture Patterns
- View functions
- Blueprint organization
- Form handling
- Partial updates
- Database integration

## Testing Requirements
- View testing
- Template testing
- Integration testing
- Response testing
- Database testing

## Documentation Standards
- View documentation
- Template documentation
- HTMX interactions
- Response patterns
- API documentation

## Project-Specific Rules
### Flask HTMX Patterns
```python
# Application Structure
from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired

app = Flask(__name__)
db = SQLAlchemy(app)

# Models
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    completed = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'completed': self.completed
        }

# Forms
class TaskForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    description = TextAreaField('Description')

# Views
@app.route('/tasks', methods=['GET'])
def task_list():
    tasks = Task.query.all()
    if request.headers.get('HX-Request'):
        return render_template('tasks/_list.html', tasks=tasks)
    return render_template('tasks/index.html', tasks=tasks)

@app.route('/tasks/create', methods=['POST'])
def task_create():
    form = TaskForm()
    if form.validate_on_submit():
        task = Task(
            title=form.title.data,
            description=form.description.data
        )
        db.session.add(task)
        db.session.commit()
        return render_template('tasks/_item.html', task=task)
    return render_template('tasks/_form.html', form=form), 422

@app.route('/tasks/<int:task_id>/toggle', methods=['PUT'])
def task_toggle(task_id):
    task = Task.query.get_or_404(task_id)
    task.completed = not task.completed
    db.session.commit()
    return render_template('tasks/_item.html', task=task)

# Templates/base.html
<!DOCTYPE html>
<html>
<head>
    <title>{% block title %}{% endblock %}</title>
    <script src="{{ url_for('static', filename='js/htmx.min.js') }}" defer></script>
    {% block head %}{% endblock %}
</head>
<body>
    {% block content %}{% endblock %}
</body>
</html>

# Templates/tasks/index.html
{% extends "base.html" %}

{% block content %}
<div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Tasks</h1>
    
    <form hx-post="{{ url_for('task_create') }}"
          hx-target="#task-list"
          hx-swap="afterbegin">
        {% include 'tasks/_form.html' %}
    </form>

    <div id="task-list"
         hx-get="{{ url_for('task_list') }}"
         hx-trigger="load delay:100ms">
        {% include 'tasks/_list.html' %}
    </div>
</div>
{% endblock %}

# Templates/tasks/_form.html
<div class="bg-white p-4 rounded shadow">
    {{ form.csrf_token }}
    <div class="mb-4">
        {{ form.title.label }}
        {{ form.title(class="w-full p-2 border rounded") }}
        {% if form.title.errors %}
            {% for error in form.title.errors %}
                <p class="text-red-500 text-sm">{{ error }}</p>
            {% endfor %}
        {% endif %}
    </div>
    <div class="mb-4">
        {{ form.description.label }}
        {{ form.description(class="w-full p-2 border rounded") }}
    </div>
    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
        Add Task
    </button>
</div>

# Templates/tasks/_list.html
{% for task in tasks %}
    {% include 'tasks/_item.html' %}
{% else %}
    <p class="text-gray-500">No tasks yet.</p>
{% endfor %}

# Templates/tasks/_item.html
<div id="task-{{ task.id }}" class="bg-white p-4 rounded shadow mb-2">
    <div class="flex items-center justify-between">
        <span class="{% if task.completed %}line-through{% endif %}">
            {{ task.title }}
        </span>
        <div class="space-x-2">
            <button hx-put="{{ url_for('task_toggle', task_id=task.id) }}"
                    hx-target="#task-{{ task.id }}"
                    class="text-blue-500 hover:text-blue-700">
                {% if task.completed %}Undo{% else %}Complete{% endif %}
            </button>
            <button hx-delete="{{ url_for('task_delete', task_id=task.id) }}"
                    hx-target="#task-{{ task.id }}"
                    hx-confirm="Are you sure?"
                    class="text-red-500 hover:text-red-700">
                Delete
            </button>
        </div>
    </div>
    {% if task.description %}
        <p class="text-gray-600 mt-2">{{ task.description }}</p>
    {% endif %}
</div>

# Testing
import pytest
from app import app, db

@pytest.fixture
def client():
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            yield client
            db.drop_all()

def test_task_list(client):
    # Test regular request
    rv = client.get('/tasks')
    assert rv.status_code == 200
    assert b'Tasks' in rv.data

    # Test HTMX request
    rv = client.get('/tasks', headers={'HX-Request': 'true'})
    assert rv.status_code == 200
    assert b'Tasks' not in rv.data  # Should only return list partial

def test_task_create(client):
    data = {
        'title': 'Test Task',
        'description': 'Test Description'
    }
    rv = client.post('/tasks/create', data=data)
    assert rv.status_code == 200
    assert b'Test Task' in rv.data
```