# Go Backend Development Instructions

## Project Context
- High-performance backend services
- RESTful API development
- Scalable architecture
- Concurrent programming patterns

## Code Style Guidelines
- Follow Go official style guide
- Use proper error handling patterns
- Implement interface-based design
- Follow proper package organization
- Use clear naming conventions:
  - Interface names: er suffix (Reader, Writer)
  - Error variables: ErrXxx
  - Package names: single, lowercase word

## Architecture Patterns
- Use proper middleware chains
- Implement clean architecture
- Follow dependency injection
- Use proper context handling
- Implement proper routing patterns

## Testing Requirements
- Write table-driven tests
- Use proper benchmarks
- Test concurrent operations
- Implement integration tests
- Use proper mocking patterns

## Documentation Standards
- Follow godoc conventions
- Document exported symbols
- Include package documentation
- Provide usage examples
- Document error conditions

## Project-Specific Rules
### Code Organization
- One package per directory
- Separate interfaces from implementation
- Use proper error types
- Follow proper logging patterns
- Implement proper shutdown handling

## Common Patterns
```go
// Handler Template
type Handler struct {
    service Service
    logger  *log.Logger
}

func NewHandler(s Service, l *log.Logger) *Handler {
    return &Handler{
        service: s,
        logger:  l,
    }
}

func (h *Handler) Handle(w http.ResponseWriter, r *http.Request) {
    ctx := r.Context()
    
    // Error handling pattern
    result, err := h.service.Process(ctx)
    if err != nil {
        h.logger.Printf("error: %v", err)
        http.Error(w, "Internal error", http.StatusInternalServerError)
        return
    }
    
    // Response handling
    json.NewEncoder(w).Encode(result)
}

// Middleware Template
func LogMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        next.ServeHTTP(w, r)
        log.Printf("Request processed in %v", time.Since(start))
    })
}
```