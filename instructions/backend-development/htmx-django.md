# HTMX Django Development Instructions

## Project Context
- Django web framework
- HTMX integration
- Server-side rendering
- Template system
- Database interactions

## Code Style Guidelines
- Django best practices
- HTMX attributes
- Template organization
- View patterns
- Response handling

## Architecture Patterns
- Class-based views
- Template inheritance
- Form handling
- Partial updates
- State management

## Testing Requirements
- View testing
- Template testing
- Integration testing
- Response testing
- Performance testing

## Documentation Standards
- View documentation
- Template documentation
- HTMX interactions
- Response patterns
- Setup instructions

## Project-Specific Rules
### Django HTMX Patterns
```python
# Views.py
from django.views.generic import ListView, CreateView, UpdateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse
from django.template.loader import render_to_string

class TaskListView(LoginRequiredMixin, ListView):
    model = Task
    template_name = 'tasks/list.html'
    context_object_name = 'tasks'

    def get(self, request, *args, **kwargs):
        tasks = self.get_queryset()
        
        if request.htmx:
            return HttpResponse(
                render_to_string(
                    'tasks/_list.html',
                    {'tasks': tasks},
                    request=request
                )
            )
        return super().get(request, *args, **kwargs)

class TaskCreateView(LoginRequiredMixin, CreateView):
    model = Task
    form_class = TaskForm
    template_name = 'tasks/_form.html'

    def form_valid(self, form):
        task = form.save(commit=False)
        task.user = self.request.user
        task.save()
        
        context = {'task': task}
        return HttpResponse(
            render_to_string(
                'tasks/_item.html',
                context,
                request=self.request
            )
        )

    def form_invalid(self, form):
        return HttpResponse(
            render_to_string(
                self.template_name,
                {'form': form},
                request=self.request
            ),
            status=422
        )

# Templates/base.html
{% load static %}
<!DOCTYPE html>
<html>
<head>
    <title>{% block title %}{% endblock %}</title>
    <script src="{% static 'js/htmx.min.js' %}" defer></script>
    {% block extra_head %}{% endblock %}
</head>
<body hx-headers='{"X-CSRFToken": "{{ csrf_token }}"}'>
    {% block content %}{% endblock %}
</body>
</html>

# Templates/tasks/list.html
{% extends 'base.html' %}

{% block content %}
<div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Tasks</h1>
    
    <form hx-post="{% url 'task_create' %}"
          hx-target="#task-list"
          hx-swap="afterbegin"
          class="mb-4">
        {% include 'tasks/_form.html' %}
    </form>

    <div id="task-list"
         hx-get="{% url 'task_list' %}"
         hx-trigger="load delay:100ms"
         hx-indicator="#loading">
        {% include 'tasks/_list.html' %}
    </div>
</div>
{% endblock %}

# Templates/tasks/_form.html
{% load crispy_forms_tags %}

<div class="bg-white p-4 rounded shadow">
    {{ form|crispy }}
    <button type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded">
        Add Task
    </button>
</div>

# Templates/tasks/_list.html
{% for task in tasks %}
    {% include 'tasks/_item.html' %}
{% empty %}
    <p class="text-gray-500">No tasks yet.</p>
{% endfor %}

# Templates/tasks/_item.html
<div id="task-{{ task.id }}"
     class="bg-white p-4 rounded shadow mb-2">
    <div class="flex items-center justify-between">
        <span class="{% if task.completed %}line-through{% endif %}">
            {{ task.title }}
        </span>
        <div class="space-x-2">
            <button hx-put="{% url 'task_toggle' task.id %}"
                    hx-target="#task-{{ task.id }}"
                    class="text-blue-500 hover:text-blue-700">
                {% if task.completed %}Undo{% else %}Complete{% endif %}
            </button>
            <button hx-delete="{% url 'task_delete' task.id %}"
                    hx-target="#task-{{ task.id }}"
                    hx-confirm="Are you sure?"
                    class="text-red-500 hover:text-red-700">
                Delete
            </button>
        </div>
    </div>
</div>

# Forms.py
from django import forms
from .models import Task

class TaskForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = ['title', 'description']
        widgets = {
            'description': forms.Textarea(attrs={'rows': 3}),
        }

    def clean_title(self):
        title = self.cleaned_data['title']
        if len(title) < 3:
            raise forms.ValidationError("Title must be at least 3 characters long")
        return title

# Middleware for HTMX
class HtmxMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        request.htmx = bool(request.headers.get('HX-Request'))
        return self.get_response(request)

# URLs.py
from django.urls import path
from .views import TaskListView, TaskCreateView, TaskToggleView

urlpatterns = [
    path('tasks/', TaskListView.as_view(), name='task_list'),
    path('tasks/create/', TaskCreateView.as_view(), name='task_create'),
    path('tasks/<int:pk>/toggle/', TaskToggleView.as_view(), name='task_toggle'),
]

# Testing
from django.test import TestCase, Client
from django.urls import reverse

class TaskViewTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user('testuser', 'test@test.com', 'testpass')
        self.client.login(username='testuser', password='testpass')

    def test_htmx_list_view(self):
        response = self.client.get(
            reverse('task_list'),
            HTTP_HX_REQUEST='true'
        )
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'tasks/_list.html')
```