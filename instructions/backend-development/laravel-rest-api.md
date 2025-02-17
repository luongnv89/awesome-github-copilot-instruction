# Laravel REST API Development Instructions

## Project Context
- Modern Laravel API development
- RESTful architecture
- API authentication and authorization
- Database optimization

## Code Style Guidelines
- Follow Laravel conventions
- Use proper route naming
- Implement proper middleware
- Follow API resource patterns
- Use proper model organization

## Architecture Patterns
- Use Repository pattern
- Implement Service Layer
- Follow proper API versioning
- Use proper response formatting
- Implement proper caching

## Testing Requirements
- Feature tests for endpoints
- Unit tests for services
- Test authentication flows
- Validate response formats
- Test rate limiting

## Documentation Standards
- Document API endpoints
- Include authentication flows
- Document response formats
- Maintain Swagger/OpenAPI
- Include setup instructions

## Project-Specific Rules
### API Design
- Use proper status codes
- Implement proper validation
- Follow proper error handling
- Use proper response structure
- Implement proper rate limiting

## Common Patterns
```php
// Controller Template
class UserController extends Controller
{
    private UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function index(): JsonResponse
    {
        return response()->json(
            UserResource::collection(
                $this->userService->getPaginatedUsers()
            )
        );
    }

    public function store(StoreUserRequest $request): JsonResponse
    {
        $user = $this->userService->createUser($request->validated());
        
        return response()->json(
            new UserResource($user),
            Response::HTTP_CREATED
        );
    }
}

// Service Template
class UserService
{
    private UserRepository $repository;

    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }

    public function createUser(array $data): User
    {
        return DB::transaction(function () use ($data) {
            $user = $this->repository->create($data);
            event(new UserCreated($user));
            return $user;
        });
    }
}

// Resource Template
class UserResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'created_at' => $this->created_at->toIso8601String(),
            'updated_at' => $this->updated_at->toIso8601String(),
        ];
    }
}

// Request Validation
class StoreUserRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users'],
            'password' => ['required', 'min:8'],
        ];
    }
}
```