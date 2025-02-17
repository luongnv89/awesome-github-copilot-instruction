# Laravel PHP 8.3 Development Guidelines

## Project Context
- Modern Laravel applications
- PHP 8.3 features utilization
- TALL stack integration
- Clean architecture patterns

## Code Organization
```php
// Project structure
/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   └── Middleware/
│   ├── Models/
│   ├── Services/
│   └── Providers/
├── database/
│   ├── migrations/
│   └── seeders/
└── routes/
    ├── api.php
    └── web.php

// Controller example with PHP 8.3 features
class UserController extends Controller
{
    public function __construct(
        private readonly UserService $userService,
    ) {}

    public function show(string $id): JsonResponse
    {
        return response()->json(
            $this->userService->findOrFail($id)
        );
    }
}
```

## Best Practices
### Service Pattern
```php
class UserService
{
    public function __construct(
        private readonly User $user,
        private readonly EventDispatcher $dispatcher,
    ) {}

    public function create(array $data): User
    {
        $user = $this->user->create($data);
        $this->dispatcher->dispatch(new UserCreated($user));
        return $user;
    }
}
```

### Repository Pattern
```php
interface UserRepository
{
    public function find(string $id): ?User;
    public function create(array $data): User;
}

class EloquentUserRepository implements UserRepository
{
    public function __construct(
        private readonly User $model
    ) {}

    public function find(string $id): ?User
    {
        return $this->model->find($id);
    }
}
```

## Performance Guidelines
- Use eager loading
- Implement caching
- Queue long-running tasks
- Optimize database queries
- Asset optimization

## Testing Requirements
- Feature testing
- Unit testing
- Database testing
- API testing
- Browser testing

## Security Best Practices
- CSRF protection
- XSS prevention
- SQL injection prevention
- Input validation
- Authentication/Authorization

## Documentation Standards
- PHPDoc blocks
- API documentation
- Database schema docs
- Configuration guide
- Deployment instructions

## Error Handling
```php
class Handler extends ExceptionHandler
{
    protected $dontReport = [
        AuthorizationException::class,
        ValidationException::class,
    ];

    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            // Custom error reporting
        });
    }
}
```