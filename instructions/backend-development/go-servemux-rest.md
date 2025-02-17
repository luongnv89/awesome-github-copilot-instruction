# Go ServeMux REST API Development Instructions

## Project Context
- Go standard library
- REST API development
- ServeMux routing
- JSON handling
- HTTP middleware

## Code Style Guidelines
- HTTP handler patterns
- Router organization
- Request validation
- Response formatting
- Error handling

## Architecture Patterns
- Handler patterns
- Middleware chains
- Service layer
- Repository pattern
- Request/Response cycle

## Testing Requirements
- Handler testing
- Integration testing
- Middleware testing
- Mock testing
- Performance testing

## Documentation Standards
- API documentation
- Handler documentation
- Route documentation
- Error codes
- Setup instructions

## Project-Specific Rules
### ServeMux Patterns
```go
// Router Pattern
type Router struct {
    *http.ServeMux
    middlewares []Middleware
}

func NewRouter(middlewares ...Middleware) *Router {
    return &Router{
        ServeMux:    http.NewServeMux(),
        middlewares: middlewares,
    }
}

func (r *Router) Handle(pattern string, handler http.Handler) {
    // Apply middlewares
    for i := len(r.middlewares) - 1; i >= 0; i-- {
        handler = r.middlewares[i](handler)
    }
    r.ServeMux.Handle(pattern, handler)
}

// Handler Pattern
type UserHandler struct {
    service UserService
    logger  Logger
}

func (h *UserHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    switch r.Method {
    case http.MethodGet:
        h.handleGet(w, r)
    case http.MethodPost:
        h.handlePost(w, r)
    default:
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
    }
}

func (h *UserHandler) handleGet(w http.ResponseWriter, r *http.Request) {
    ctx := r.Context()
    id := chi.URLParam(r, "id")
    
    user, err := h.service.GetUser(ctx, id)
    if err != nil {
        h.handleError(w, err)
        return
    }
    
    respondJSON(w, http.StatusOK, user)
}

// Middleware Pattern
type Middleware func(http.Handler) http.Handler

func LoggingMiddleware(logger Logger) Middleware {
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            start := time.Now()
            ww := NewResponseWriter(w)
            
            defer func() {
                logger.Info("request completed",
                    "method", r.Method,
                    "path", r.URL.Path,
                    "status", ww.Status(),
                    "duration", time.Since(start),
                )
            }()
            
            next.ServeHTTP(ww, r)
        })
    }
}

// Response Writer Pattern
type ResponseWriter struct {
    http.ResponseWriter
    status      int
    wroteHeader bool
}

func NewResponseWriter(w http.ResponseWriter) *ResponseWriter {
    return &ResponseWriter{ResponseWriter: w}
}

func (rw *ResponseWriter) Status() int {
    return rw.status
}

func (rw *ResponseWriter) WriteHeader(code int) {
    if rw.wroteHeader {
        return
    }
    rw.status = code
    rw.ResponseWriter.WriteHeader(code)
    rw.wroteHeader = true
}

// JSON Response Pattern
func respondJSON(w http.ResponseWriter, status int, data interface{}) {
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(status)
    
    if data != nil {
        if err := json.NewEncoder(w).Encode(data); err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }
    }
}

// Error Handling Pattern
type ErrorResponse struct {
    Error   string `json:"error"`
    Message string `json:"message"`
    Code    string `json:"code"`
}

func (h *UserHandler) handleError(w http.ResponseWriter, err error) {
    switch e := err.(type) {
    case *NotFoundError:
        respondJSON(w, http.StatusNotFound, ErrorResponse{
            Error:   "Not Found",
            Message: e.Error(),
            Code:    "NOT_FOUND",
        })
    case *ValidationError:
        respondJSON(w, http.StatusBadRequest, ErrorResponse{
            Error:   "Bad Request",
            Message: e.Error(),
            Code:    "VALIDATION_ERROR",
        })
    default:
        respondJSON(w, http.StatusInternalServerError, ErrorResponse{
            Error:   "Internal Server Error",
            Message: "An unexpected error occurred",
            Code:    "INTERNAL_ERROR",
        })
    }
}

// Request Validation Pattern
type CreateUserRequest struct {
    Name     string `json:"name" validate:"required"`
    Email    string `json:"email" validate:"required,email"`
    Password string `json:"password" validate:"required,min=8"`
}

func (r *CreateUserRequest) Validate() error {
    validate := validator.New()
    if err := validate.Struct(r); err != nil {
        return NewValidationError(err)
    }
    return nil
}

// Testing Pattern
func TestUserHandler_GetUser(t *testing.T) {
    tests := []struct {
        name       string
        userID     string
        setupMock  func(service *MockUserService)
        wantStatus int
        wantBody   string
    }{
        {
            name:   "success",
            userID: "123",
            setupMock: func(service *MockUserService) {
                service.EXPECT().
                    GetUser(gomock.Any(), "123").
                    Return(&User{ID: "123", Name: "Test"}, nil)
            },
            wantStatus: http.StatusOK,
            wantBody:   `{"id":"123","name":"Test"}`,
        },
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            ctrl := gomock.NewController(t)
            defer ctrl.Finish()

            service := NewMockUserService(ctrl)
            tt.setupMock(service)

            handler := NewUserHandler(service)
            req := httptest.NewRequest(http.MethodGet, "/users/"+tt.userID, nil)
            rec := httptest.NewRecorder()

            handler.ServeHTTP(rec, req)

            assert.Equal(t, tt.wantStatus, rec.Code)
            assert.JSONEq(t, tt.wantBody, rec.Body.String())
        })
    }
}
```