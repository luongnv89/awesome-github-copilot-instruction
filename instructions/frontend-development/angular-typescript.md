# Angular TypeScript Development Guidelines

## Project Context
- Angular 18 with TypeScript
- Jest for testing
- Focus on performance, readability, and maintainability

## Code Style Guidelines
- Maximum line length: 80 characters
- Maximum function parameters: 4
- Maximum function length: 50 executable lines
- Maximum nesting depth: 2 levels
- Use forNext function from libs/smart-ngrx/src/common/for-next.function.ts instead of traditional loops
- Follow configurations in .eslintrc.json, .prettierrc, .htmlhintrc, and .editorconfig

## Architecture Patterns
- Maintain clear component structure
- Proper separation of concerns
- Smart and presentational components pattern
- Follow Angular best practices for module organization

## Testing Requirements
- Jest as primary testing framework
- Unit tests for components and services
- Maintain high test coverage
- Test both success and error scenarios

## Documentation Standards
- Preserve existing JSDoc comments during refactoring
- Clear and concise documentation
- Document public APIs and interfaces
- Include usage examples for complex functionality

## Project-Specific Rules
- Use TypeScript strict mode
- Proper error handling patterns
- Follow Angular dependency injection patterns
- Include all required imports
- Ensure proper naming of key components