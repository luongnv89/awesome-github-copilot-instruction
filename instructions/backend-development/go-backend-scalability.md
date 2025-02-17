# Go Backend Scalability Instructions

## Project Context
- Go backend services
- Microservices architecture
- Distributed systems
- High-performance computing
- Scalable architecture

## Code Style Guidelines
- Go idiomatic code
- Error handling patterns
- Concurrency patterns
- Interface design
- Package organization

## Architecture Patterns
- Clean architecture
- SOLID principles
- Microservices patterns
- Service mesh
- Event-driven design

## Testing Requirements
- Unit testing
- Integration testing
- Load testing
- Benchmark testing
- Performance profiling

## Documentation Standards
- Package documentation
- API documentation
- Architecture diagrams
- Performance metrics
- Deployment guides

## Project-Specific Rules
### Go Patterns
```go
// Service Pattern
type Service interface {
    Create(ctx context.Context, req *CreateRequest) (*Response, error)
    Get(ctx context.Context, id string) (*Response, error)
    List(ctx context.Context, filter *Filter) ([]*Response, error)
}

type serviceImpl struct {
    repo     Repository
    cache    Cache
    metrics  MetricsClient
    logger   Logger
}

func NewService(opts ...Option) Service {
    s := &serviceImpl{}
    for _, opt := range opts {
        opt(s)
    }
    return s
}

// Repository Pattern
type Repository interface {
    Create(ctx context.Context, entity *Entity) error
    Get(ctx context.Context, id string) (*Entity, error)
    List(ctx context.Context, filter *Filter) ([]*Entity, error)
}

type postgresRepo struct {
    db *sql.DB
}

func (r *postgresRepo) Create(ctx context.Context, entity *Entity) error {
    query := `INSERT INTO entities (id, data) VALUES ($1, $2)`
    _, err := r.db.ExecContext(ctx, query, entity.ID, entity.Data)
    return errors.Wrap(err, "failed to create entity")
}

// Middleware Pattern
func LoggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        ww := middleware.NewWrapResponseWriter(w, r.ProtoMajor)
        
        defer func() {
            logger.Info("request completed",
                zap.String("path", r.URL.Path),
                zap.Int("status", ww.Status()),
                zap.Duration("latency", time.Since(start)),
            )
        }()
        
        next.ServeHTTP(ww, r)
    })
}

// Error Handling Pattern
type Error struct {
    Code    string `json:"code"`
    Message string `json:"message"`
    Op      string `json:"-"`
    Err     error  `json:"-"`
}

func (e *Error) Error() string {
    return fmt.Sprintf("%s: %v", e.Op, e.Message)
}

func E(op string, err error) error {
    if err == nil {
        return nil
    }
    
    return &Error{
        Code:    "INTERNAL_ERROR",
        Message: err.Error(),
        Op:      op,
        Err:     err,
    }
}

// Concurrency Pattern
type WorkerPool struct {
    workers int
    tasks   chan Task
    results chan Result
    done    chan struct{}
}

func NewWorkerPool(workers int) *WorkerPool {
    wp := &WorkerPool{
        workers: workers,
        tasks:   make(chan Task),
        results: make(chan Result),
        done:    make(chan struct{}),
    }
    wp.Start()
    return wp
}

func (wp *WorkerPool) Start() {
    for i := 0; i < wp.workers; i++ {
        go func() {
            for task := range wp.tasks {
                result := task.Execute()
                wp.results <- result
            }
        }()
    }
}

// Circuit Breaker Pattern
type CircuitBreaker struct {
    timeout    time.Duration
    maxErrors  int
    errors     int
    lastError  time.Time
    state      State
    mu         sync.RWMutex
}

func (cb *CircuitBreaker) Execute(req *Request) (*Response, error) {
    cb.mu.RLock()
    if cb.state == StateOpen {
        if time.Since(cb.lastError) > cb.timeout {
            cb.mu.RUnlock()
            cb.mu.Lock()
            cb.state = StateHalfOpen
            cb.mu.Unlock()
        } else {
            cb.mu.RUnlock()
            return nil, ErrCircuitOpen
        }
    } else {
        cb.mu.RUnlock()
    }

    resp, err := cb.execute(req)
    if err != nil {
        cb.recordError()
        return nil, err
    }

    cb.reset()
    return resp, nil
}

// Metrics Pattern
type MetricsClient interface {
    Counter(name string, tags map[string]string) Counter
    Gauge(name string, tags map[string]string) Gauge
    Histogram(name string, tags map[string]string) Histogram
}

type prometheusClient struct {
    namespace string
}

func (c *prometheusClient) Counter(name string, tags map[string]string) Counter {
    opts := prometheus.CounterOpts{
        Namespace: c.namespace,
        Name:      name,
    }
    counter := prometheus.NewCounterVec(opts, keysFromMap(tags))
    prometheus.MustRegister(counter)
    return &prometheusCounter{counter: counter}
}

// Configuration Pattern
type Config struct {
    Server   ServerConfig   `yaml:"server"`
    Database DatabaseConfig `yaml:"database"`
    Cache    CacheConfig    `yaml:"cache"`
}

func LoadConfig(path string) (*Config, error) {
    data, err := os.ReadFile(path)
    if err != nil {
        return nil, errors.Wrap(err, "failed to read config file")
    }

    var config Config
    if err := yaml.Unmarshal(data, &config); err != nil {
        return nil, errors.Wrap(err, "failed to parse config")
    }

    return &config, nil
}
```