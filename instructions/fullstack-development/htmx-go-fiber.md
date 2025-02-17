# HTMX with Go Fiber Development Instructions

## Project Context
- Server-side rendering with HTMX
- Go Fiber framework integration
- Progressive enhancement
- High-performance web applications

## Code Style Guidelines
- Use proper HTML attributes
- Follow Go Fiber conventions
- Implement proper HTMX patterns
- Use proper template organization
- Follow proper response handling

## Architecture Patterns
- Use proper route handlers
- Implement proper partial responses
- Follow proper template composition
- Use proper state management
- Implement proper validation

## Testing Requirements
- Test route handlers
- Validate HTMX responses
- Test template rendering
- Implement integration tests
- Test HTMX interactions

## Documentation Standards
- Document HTMX endpoints
- Include template patterns
- Document handler functions
- Maintain setup guides
- Include interaction flows

## Project-Specific Rules
### HTMX Integration
- Use proper swap methods
- Implement proper indicators
- Follow proper validation
- Use proper error handling
- Implement proper history

## Common Patterns
```go
// Handler Template
func handleUsers(c *fiber.Ctx) error {
    users, err := db.GetUsers()
    if err != nil {
        return c.Status(500).SendString("Error fetching users")
    }
    
    // Check if HTMX request
    if c.Get("HX-Request") != "" {
        return c.Render("partials/users", fiber.Map{
            "Users": users,
        })
    }
    
    return c.Render("pages/users", fiber.Map{
        "Users": users,
        "Title": "Users List",
    })
}

// Template Pattern
<!-- users.html -->
<div id="users-list">
    {{range .Users}}
    <div class="user-item"
         hx-get="/users/{{.ID}}"
         hx-trigger="click"
         hx-target="#user-detail"
         hx-swap="innerHTML">
        <h3>{{.Name}}</h3>
    </div>
    {{end}}
</div>

// Form Handler
func handleCreateUser(c *fiber.Ctx) error {
    user := new(User)
    if err := c.BodyParser(user); err != nil {
        return c.Status(400).SendString("Invalid input")
    }
    
    if err := user.Validate(); err != nil {
        return c.Render("partials/user-form", fiber.Map{
            "User":   user,
            "Errors": err,
        })
    }
    
    if err := db.CreateUser(user); err != nil {
        return c.Status(500).SendString("Error creating user")
    }
    
    return c.Render("partials/user-item", fiber.Map{
        "User": user,
    })
}

// Router Setup
app := fiber.New()

app.Get("/users", handleUsers)
app.Post("/users", handleCreateUser)
app.Get("/users/:id", handleUserDetail)

// Middleware for HTMX specific logic
func htmxMiddleware(c *fiber.Ctx) error {
    if c.Get("HX-Request") != "" {
        // Handle HTMX specific behavior
        if c.Get("HX-Boosted") != "" {
            // Handle boosted requests
        }
    }
    return c.Next()
}
```