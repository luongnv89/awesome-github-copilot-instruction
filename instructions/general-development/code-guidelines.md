# General Code Guidelines

## Project Context
- Cross-language development standards
- Clean code principles
- Code maintainability focus
- Team collaboration practices
- Technical debt prevention

## Code Style Guidelines
- Naming conventions
  - Use meaningful and pronounceable variable names
  - Use consistent naming patterns across codebase
  - Follow language-specific conventions
- Function design
  - Single Responsibility Principle
  - Pure functions where possible
  - Proper error handling
- Code organization
  - Logical file structure
  - Clear module boundaries
  - Consistent import ordering

## Architecture Patterns
- SOLID principles
- Design patterns usage
- Clean Architecture
- Separation of concerns
- Dependency management

## Testing Requirements
- Unit testing standards
  - Arrange-Act-Assert pattern
  - Test isolation
  - Meaningful test names
- Integration testing
- Test coverage goals
- Performance testing
- Security testing

## Documentation Standards
- Code documentation
  - Self-documenting code practices
  - When to comment
  - API documentation
- Architecture documentation
  - System diagrams
  - Component relationships
  - Decision records
- README standards
  - Project setup
  - Development workflow
  - Contribution guidelines

## Common Patterns
```typescript
// Clean Code Examples

// Bad
function d(a: number[]): number {
    let x = 0;
    for(let i = 0; i < a.length; i++) {
        x += a[i];
    }
    return x / a.length;
}

// Good
function calculateAverage(numbers: number[]): number {
    if (numbers.length === 0) {
        throw new Error('Cannot calculate average of empty array');
    }
    
    const sum = numbers.reduce((acc, current) => acc + current, 0);
    return sum / numbers.length;
}

// SOLID Principle Examples

// Single Responsibility Principle
class UserAuthentication {
    async authenticate(credentials: Credentials): Promise<AuthResult> {
        // Only handles authentication
    }
}

class UserRepository {
    async saveUser(user: User): Promise<void> {
        // Only handles user persistence
    }
}

// Interface Segregation Principle
interface MessageSender {
    sendMessage(message: Message): Promise<void>;
}

interface MessageReceiver {
    receiveMessage(): Promise<Message>;
}

// Error Handling Pattern
class Result<T, E = Error> {
    private constructor(
        private value: T | null,
        private error: E | null
    ) {}

    static success<T>(value: T): Result<T> {
        return new Result(value, null);
    }

    static failure<E>(error: E): Result<never, E> {
        return new Result(null, error);
    }

    isSuccess(): boolean {
        return this.error === null;
    }

    getValue(): T {
        if (this.error !== null) {
            throw new Error('Cannot get value from error result');
        }
        return this.value!;
    }

    getError(): E {
        if (this.error === null) {
            throw new Error('Cannot get error from success result');
        }
        return this.error;
    }
}

// Using Result Pattern
async function processUserData(
    userData: UserData
): Promise<Result<ProcessedData, ValidationError>> {
    if (!isValid(userData)) {
        return Result.failure(new ValidationError('Invalid user data'));
    }

    try {
        const processed = await processData(userData);
        return Result.success(processed);
    } catch (error) {
        return Result.failure(new ProcessingError('Processing failed'));
    }
}
```