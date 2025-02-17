# Go Backend Development Guidelines

## Project Context
- Go backend services
- RESTful API development
- Scalability patterns
- Clean architecture

## Code Organization
```go
// Project structure
/
├── cmd/
│   └── api/
│       └── main.go
├── internal/
│   ├── app/
│   ├── domain/
│   ├── handlers/
│   └── repository/
├── pkg/
│   ├── middleware/
│   └── utils/
└── api/
    └── openapi.yaml

// Handler pattern
type Handler struct {
    service Service
    logger  *log.Logger
}

func NewHandler(svc Service, logger *log.Logger) *Handler {
    return &Handler{
        service: svc,
        logger:  logger,
    }
}

func (h *Handler) HandleRequest(w http.ResponseWriter, r *http.Request) {
    // Request handling logic
}
```

## Best Practices
- Use interfaces for abstraction
- Implement proper error handling
- Follow standard project layout
- Use context for cancellation
- Implement middleware chain

## Performance Guidelines
- Proper connection pooling
- Resource cleanup
- Goroutine management
- Memory optimization
- CPU profiling

## Testing Standards
- Unit testing
- Integration testing
- Benchmark testing
- Mock generation
- Test fixtures

## Error Handling
```go
// Error types
type AppError struct {
    Code    int
    Message string
    Err     error
}

func (e *AppError) Error() string {
    return e.Message
}

// Error handling
func handleError(w http.ResponseWriter, err error) {
    var appErr *AppError
    if errors.As(err, &appErr) {
        respondWithError(w, appErr.Code, appErr.Message)
        return
    }
    // Handle unknown errors
}
```

## Security Guidelines
- Input validation
- Authentication middleware
- Rate limiting
- CORS configuration
- Secure headers

## Documentation
- API documentation
- Code comments
- README maintenance
- Version documentation
- Deployment guides