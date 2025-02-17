# HTMX Go Fiber Development Instructions

## Project Context
- Go Fiber framework
- HTMX integration
- HTML templates
- Fast HTTP routing
- Middleware patterns

## Code Style Guidelines
- Fiber best practices
- HTMX attributes
- Template organization
- Route grouping
- Error handling

## Architecture Patterns
- Fiber handlers
- Middleware chains
- Template rendering
- State management
- Response formatting

## Testing Requirements
- Handler testing
- Middleware testing
- Integration testing
- Response testing
- End-to-end testing

## Documentation Standards
- Handler documentation
- Route documentation
- HTMX interactions
- Response patterns
- API documentation

## Project-Specific Rules
### Fiber HTMX Patterns
```go
// Main Package
package main

import (
    "github.com/gofiber/fiber/v2"
    "github.com/gofiber/template/html/v2"
)

// Task Model
type Task struct {
    ID          uint      `json:"id"`
    Title       string    `json:"title"`
    Description string    `json:"description"`
    Completed   bool      `json:"completed"`
}

// Handler Types
type TaskHandler struct {
    tasks []Task
}

// Setup Application
func main() {
    engine := html.New("./views", ".html")
    
    app := fiber.New(fiber.Config{
        Views: engine,
    })

    handler := &TaskHandler{
        tasks: make([]Task, 0),
    }

    // Routes
    app.Get("/", handler.List)
    app.Post("/tasks", handler.Create)
    app.Put("/tasks/:id/toggle", handler.Toggle)
    app.Delete("/tasks/:id", handler.Delete)

    app.Listen(":3000")
}

// List Handler
func (h *TaskHandler) List(c *fiber.Ctx) error {
    if c.Get("HX-Request") != "" {
        return c.Render("partials/task-list", fiber.Map{
            "Tasks": h.tasks,
        })
    }
    
    return c.Render("index", fiber.Map{
        "Tasks": h.tasks,
    })
}

// Create Handler
func (h *TaskHandler) Create(c *fiber.Ctx) error {
    var task Task
    if err := c.BodyParser(&task); err != nil {
        return c.Status(fiber.StatusBadRequest).SendString(err.Error())
    }

    task.ID = uint(len(h.tasks) + 1)
    h.tasks = append(h.tasks, task)

    return c.Render("partials/task-item", fiber.Map{
        "Task": task,
    })
}

// Toggle Handler
func (h *TaskHandler) Toggle(c *fiber.Ctx) error {
    id, err := c.ParamsInt("id")
    if err != nil {
        return c.Status(fiber.StatusBadRequest).SendString("Invalid ID")
    }

    for i := range h.tasks {
        if h.tasks[i].ID == uint(id) {
            h.tasks[i].Completed = !h.tasks[i].Completed
            return c.Render("partials/task-item", fiber.Map{
                "Task": h.tasks[i],
            })
        }
    }

    return c.Status(fiber.StatusNotFound).SendString("Task not found")
}

// Middleware Example
func HtmxMiddleware() fiber.Handler {
    return func(c *fiber.Ctx) error {
        if c.Get("HX-Request") != "" {
            c.Locals("htmx", true)
        }
        return c.Next()
    }
}

// Views/index.html
<!DOCTYPE html>
<html>
<head>
    <title>Tasks</title>
    <script src="/static/htmx.min.js"></script>
    <link href="/static/tailwind.min.css" rel="stylesheet">
</head>
<body class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Tasks</h1>
    
    <form hx-post="/tasks"
          hx-target="#task-list"
          hx-swap="afterbegin"
          class="mb-4">
        {{template "partials/task-form" .}}
    </form>

    <div id="task-list"
         hx-get="/"
         hx-trigger="load delay:100ms">
        {{template "partials/task-list" .}}
    </div>
</body>
</html>

// Views/partials/task-form.html
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

// Views/partials/task-list.html
{{range .Tasks}}
    {{template "partials/task-item" dict "Task" .}}
{{else}}
    <p class="text-gray-500">No tasks yet.</p>
{{end}}

// Views/partials/task-item.html
<div id="task-{{.Task.ID}}" class="bg-white p-4 rounded shadow mb-2">
    <div class="flex items-center justify-between">
        <span class="{{if .Task.Completed}}line-through{{end}}">
            {{.Task.Title}}
        </span>
        <div class="space-x-2">
            <button hx-put="/tasks/{{.Task.ID}}/toggle"
                    hx-target="#task-{{.Task.ID}}"
                    class="text-blue-500 hover:text-blue-700">
                {{if .Task.Completed}}Undo{{else}}Complete{{end}}
            </button>
            <button hx-delete="/tasks/{{.Task.ID}}"
                    hx-target="#task-{{.Task.ID}}"
                    hx-confirm="Are you sure?"
                    class="text-red-500 hover:text-red-700">
                Delete
            </button>
        </div>
    </div>
    {{if .Task.Description}}
        <p class="text-gray-600 mt-2">{{.Task.Description}}</p>
    {{end}}
</div>

// Testing
package main

import (
    "io"
    "net/http/httptest"
    "strings"
    "testing"

    "github.com/gofiber/fiber/v2"
    "github.com/stretchr/testify/assert"
)

func TestTaskHandler_List(t *testing.T) {
    app := fiber.New()
    handler := &TaskHandler{
        tasks: make([]Task, 0),
    }
    
    app.Get("/", handler.List)
    
    // Test regular request
    req := httptest.NewRequest("GET", "/", nil)
    resp, err := app.Test(req)
    
    assert.NoError(t, err)
    assert.Equal(t, fiber.StatusOK, resp.StatusCode)
    
    // Test HTMX request
    req.Header.Set("HX-Request", "true")
    resp, err = app.Test(req)
    
    assert.NoError(t, err)
    assert.Equal(t, fiber.StatusOK, resp.StatusCode)
}

func TestTaskHandler_Create(t *testing.T) {
    app := fiber.New()
    handler := &TaskHandler{
        tasks: make([]Task, 0),
    }
    
    app.Post("/tasks", handler.Create)
    
    body := strings.NewReader(`{"title":"Test Task","description":"Test Description"}`)
    req := httptest.NewRequest("POST", "/tasks", body)
    req.Header.Set("Content-Type", "application/json")
    
    resp, err := app.Test(req)
    
    assert.NoError(t, err)
    assert.Equal(t, fiber.StatusOK, resp.StatusCode)
    
    respBody, _ := io.ReadAll(resp.Body)
    assert.Contains(t, string(respBody), "Test Task")
}
```