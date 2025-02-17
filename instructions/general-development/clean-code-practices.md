# Clean Code Practices

## Project Context
These instructions guide GitHub Copilot to generate clean, maintainable code following industry best practices.

## Code Style Guidelines
- Use meaningful and pronounceable variable names
- Functions should do one thing only
- Keep functions small (less than 20 lines)
- Avoid using flags as function parameters
- Use early returns instead of nested conditionals
- Avoid magic numbers and strings

## Architecture Patterns
- Follow SOLID principles
- Use dependency injection where appropriate
- Keep classes small and focused
- Implement interface segregation
- Use composition over inheritance

## Testing Requirements
- Write tests before implementing features
- Each function should have corresponding unit tests
- Keep tests readable and maintainable
- Use descriptive test names
- Follow AAA (Arrange-Act-Assert) pattern

## Documentation Standards
- Add JSDoc comments for functions and classes
- Include examples in complex function documentation
- Document architectural decisions
- Keep comments up-to-date with code changes

## Project-Specific Rules
- Mark generated code with appropriate comments
- Include error handling in all async operations
- Log errors with appropriate context
- Use type definitions where possible
