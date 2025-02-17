# JavaScript and TypeScript Code Quality Instructions

## Project Context
- Modern JavaScript/TypeScript development
- Static type checking with TypeScript
- Code quality and best practices
- Performance optimization

## Code Style Guidelines
- Use TypeScript strict mode
- Follow ESLint configurations
- Implement proper type definitions
- Use proper naming conventions
- Follow proper file organization

## Architecture Patterns
- Use proper module system
- Implement proper error handling
- Follow proper async patterns
- Use proper design patterns
- Implement proper state management

## Testing Requirements
- Write unit tests with Jest
- Test async operations
- Implement integration tests
- Test type definitions
- Validate error handling

## Documentation Standards
- Use JSDoc for documentation
- Include type definitions
- Document public APIs
- Maintain README files
- Document error scenarios

## Project-Specific Rules
### Code Organization
- Use proper directory structure
- Implement proper imports
- Follow proper naming patterns
- Use proper type exports
- Implement proper error types

## Common Patterns
```typescript
// Type Definition Pattern
type Result<T, E = Error> = {
  success: true;
  data: T;
} | {
  success: false;
  error: E;
};

// Async Handler Pattern
async function handleAsync<T>(
  promise: Promise<T>
): Promise<Result<T>> {
  try {
    const data = await promise;
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error : new Error(String(error))
    };
  }
}

// Service Pattern
class UserService {
  constructor(private api: ApiClient) {}

  async getUser(id: string): Promise<Result<User>> {
    return handleAsync(this.api.get<User>(`/users/${id}`));
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<Result<User>> {
    return handleAsync(this.api.put<User>(`/users/${id}`, data));
  }
}

// Module Export Pattern
export interface Config {
  timeout: number;
  retries: number;
}

export function createConfig(partial: Partial<Config> = {}): Config {
  return {
    timeout: 5000,
    retries: 3,
    ...partial
  };
}

// Error Handling Pattern
class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly status: number = 500
  ) {
    super(message);
    this.name = 'AppError';
  }

  static notFound(resource: string): AppError {
    return new AppError(
      `${resource} not found`,
      'NOT_FOUND',
      404
    );
  }
}
```