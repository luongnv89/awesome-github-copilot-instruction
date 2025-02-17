# HTMX Go Development Instructions

## Project Context
- Go web server
- HTMX integration
- HTML templates
- Server-side rendering
- Request handling

## Code Style Guidelines
- Go idiomatic code
- HTMX attributes
- Template organization
- Handler patterns
- Response formatting

## Architecture Patterns
- Handler functions
- Template parsing
- Partial updates
- State management
- Error handling

## Testing Requirements
- Handler testing
- Template testing
- Integration testing
- Response testing
- End-to-end testing

## Documentation Standards
- Handler documentation
- Template documentation
- HTMX interactions
- Response patterns
- API documentation

## Project-Specific Rules
### Go HTMX Patterns
```go
// Main Package
package main

import (
    "html/template"
    "log"
    "net/http"
)

// Task Model
type Task struct {
    ID          int
    Title       string
    Description string
    Completed   bool
}

// Handler Types
type TaskHandler struct {
    tmpl  *template.Template
    tasks []Task
}

func NewTaskHandler() *TaskHandler {
    tmpl := template.Must(template.ParseGlob("templates/*.html"))
    return &TaskHandler{
        tmpl:  tmpl,
        tasks: make([]Task, 0),
    }
}

// List Handler
func (h *TaskHandler) List(w http.ResponseWriter, r *http.Request) {
    if r.Header.Get("HX-Request") == "true" {
        h.tmpl.ExecuteTemplate(w, "task-list.html", h.tasks)
        return
    }
    h.tmpl.ExecuteTemplate(w, "index.html", h.tasks)
}

// Create Handler
func (h *TaskHandler) Create(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodPost {
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
        return
    }

    r.ParseForm()
    task := Task{
        ID:          len(h.tasks) + 1,
        Title:       r.FormValue("title"),
        Description: r.FormValue("description"),
    }

    h.tasks = append(h.tasks, task)
    h.tmpl.ExecuteTemplate(w, "task-item.html", task)
}

// Toggle Handler
func (h *TaskHandler) Toggle(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodPut {
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
        return
    }

    id := r.URL.Query().Get("id")
    for i := range h.tasks {
        if h.tasks[i].ID == id {
            h.tasks[i].Completed = !h.tasks[i].Completed
            h.tmpl.ExecuteTemplate(w, "task-item.html", h.tasks[i])
            return
        }
    }
    http.Error(w, "Task not found", http.StatusNotFound)
}

// Main Function
func main() {
    handler := NewTaskHandler()

    http.HandleFunc("/", handler.List)
    http.HandleFunc("/tasks/create", handler.Create)
    http.HandleFunc("/tasks/toggle", handler.Toggle)

    log.Fatal(http.ListenAndServe(":8080", nil))
}

// Templates/index.html
{{define "index.html"}}
<!DOCTYPE html>
<html>
<head>
    <title>Tasks</title>
    <script src="/static/htmx.min.js"></script>
    <link href="/static/tailwind.min.css" rel="stylesheet">
</head>
<body class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Tasks</h1>
    
    <form hx-post="/tasks/create"
          hx-target="#task-list"
          hx-swap="afterbegin"
          class="mb-4">
        {{template "task-form.html"}}
    </form>

    <div id="task-list"
         hx-get="/"
         hx-trigger="load delay:100ms">
        {{template "task-list.html" .}}
    </div>
</body>
</html>
{{end}}

// Templates/task-form.html
{{define "task-form.html"}}
<div class="bg-white p-4 rounded shadow">
    <div class="mb-4">
        <label class="block text-gray-700">Title</label>
        <input type="text"
               name="title"
               class="w-full p-2 border rounded"
               required>
    </div>
    <div class="mb-4">
        <label class="block text-gray-700">Description</label>
        <textarea name="description"
                  class="w-full p-2 border rounded"></textarea>
    </div>
    <button type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded">
        Add Task
    </button>
</div>
{{end}}

// Templates/task-list.html
{{define "task-list.html"}}
{{range .}}
    {{template "task-item.html" .}}
{{else}}
    <p class="text-gray-500">No tasks yet.</p>
{{end}}
{{end}}

// Templates/task-item.html
{{define "task-item.html"}}
<div id="task-{{.ID}}" class="bg-white p-4 rounded shadow mb-2">
    <div class="flex items-center justify-between">
        <span class="{{if .Completed}}line-through{{end}}">
            {{.Title}}
        </span>
        <div class="space-x-2">
            <button hx-put="/tasks/toggle?id={{.ID}}"
                    hx-target="#task-{{.ID}}"
                    class="text-blue-500 hover:text-blue-700">
                {{if .Completed}}Undo{{else}}Complete{{end}}
            </button>
            <button hx-delete="/tasks/delete?id={{.ID}}"
                    hx-target="#task-{{.ID}}"
                    hx-confirm="Are you sure?"
                    class="text-red-500 hover:text-red-700">
                Delete
            </button>
        </div>
    </div>
    {{if .Description}}
        <p class="text-gray-600 mt-2">{{.Description}}</p>
    {{end}}
</div>
{{end}}

// Testing
package main

import (
    "net/http"
    "net/http/httptest"
    "testing"
)

func TestTaskHandler_List(t *testing.T) {
    handler := NewTaskHandler()
    
    // Test regular request
    req := httptest.NewRequest("GET", "/", nil)
    w := httptest.NewRecorder()
    handler.List(w, req)
    
    if w.Code != http.StatusOK {
        t.Errorf("Expected status %d, got %d", http.StatusOK, w.Code)
    }
    
    // Test HTMX request
    req.Header.Set("HX-Request", "true")
    w = httptest.NewRecorder()
    handler.List(w, req)
    
    if w.Code != http.StatusOK {
        t.Errorf("Expected status %d, got %d", http.StatusOK, w.Code)
    }
}
```