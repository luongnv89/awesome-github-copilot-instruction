# Node.js TypeScript Style Guide

- **Formatting**
  - Use 2 spaces for indentation (no tabs)
  - Use UNIX-style newlines (`\n`)
  - No trailing whitespace
  - Use semicolons
  - Limit lines to 80 characters
  - Use single quotes for strings (except for JSON)
  - Opening braces go on the same line
  - Place a space after type annotations colon (`: `)
  - No space after generic parameters angle brackets
  - Line break before complex return types

- **File Structure**
  - Use `.ts` extension for TypeScript files
  - Use `.d.ts` for declaration files
  - Use barrel pattern (`index.ts`) to simplify imports
  - Group imports by external modules, then internal modules
  - Prefer path aliases to deep relative paths

- **Naming Conventions**
  - Use `lowerCamelCase` for variables, properties, functions, methods
  - Use `UpperCamelCase` for classes, interfaces, types, enums, type aliases
  - Use `UPPERCASE` for constants
  - Use descriptive names (avoid abbreviations and single letters)
  - Interface names should be nouns or noun phrases
  - Don't use "I" prefix for interfaces (e.g., use `User`, not `IUser`)
  - Boolean variables should begin with "is", "has", "should", etc.

- **Types & Interfaces**
  - Prefer interfaces for object definitions
  - Use type aliases for unions, intersections, and complex types
  - Export interfaces that are used across multiple files
  - Use readonly modifier for immutable properties
  - Use explicit types for arrays (`string[]` rather than `Array<string>`)
  - Use proper TypeScript utility types (`Partial<T>`, `Pick<T>`, etc.)
  - Use type annotations for function parameters and return values

- **Variables**
  - Use `const` by default, `let` when necessary, never `var`
  - Use trailing commas in multiline object and array literals
  - Use destructuring to access multiple properties
  - Declare one variable per declaration
  - Use the nullish coalescing operator (`??`) for defaults with null/undefined
  - Use optional chaining (`?.`) for accessing nested properties that might be null

- **Functions**
  - Write small functions (aim for ~15 lines or less)
  - Use arrow functions for callbacks
  - Return early from functions to avoid deep nesting
  - Name your closures for better debugging and stack traces
  - Avoid nested closures
  - Use parameter destructuring for cleaner function signatures
  - Use explicit return types for public API functions
  - Use well-typed Promise generics: `Promise<T>`
  - For method chaining, use one method per line with indentation

- **Classes**
  - Use parameter properties when applicable (`constructor(private name: string)`)
  - Place visibility modifiers for all properties and methods
  - Put constructor first, followed by public methods, then protected, then private
  - Mark read-only properties with the `readonly` modifier
  - Return `this` for method chaining
  - Use abstract classes for shared functionality that shouldn't be instantiated

- **Conditionals & Error Handling**
  - Always use the `===` operator
  - Use multi-line format for ternary operators
  - Use descriptive variables for non-trivial conditions
  - Use type guards for narrowing union types (`if (typeof x === 'string')`)
  - Use custom type predicates for complex type narrowing
  - Catch errors with type `unknown`, then use type guards to narrow
  - Create custom error classes extending `Error`
  - Never throw non-Error objects

- **Asynchronous Code**
  - Prefer async/await over Promise chains
  - Always handle Promise rejections
  - Mark async functions with proper return types: `async function(): Promise<void>`
  - Consider using a Result pattern for error handling in async operations
  - Handle edge cases in Promise.all with appropriate error strategies
  - Use Promise.allSettled when appropriate for parallel operations that shouldn't fail together

- **Comments & Documentation**
  - Use JSDoc comments for documenting functions, classes, interfaces
  - Include types in JSDoc when they add clarity beyond TypeScript types
  - Document parameters, return values, and thrown exceptions
  - Use TSDoc tags for TypeScript-specific documentation
  - Include examples in comments for complex functions

- **Project Configuration**
  - Use strict mode in tsconfig.json
  - Enable strictNullChecks and noImplicitAny
  - Configure paths for simplified imports
  - Use ESLint with TypeScript parser
  - Set appropriate target and module settings for Node.js version

- **Testing**
  - Use typed testing frameworks (Jest with @types/jest, etc.)
  - Create proper type definitions for test fixtures and mocks
  - Use type-aware assertions when possible
  - Test edge cases and type boundaries in public APIs
  - Create helper utility types for testing

- **Best Practices**
  - Avoid `Object.freeze`, `Object.preventExtensions`, `Object.seal`, `with`, and `eval`
  - Put all imports at the top of the file
  - Avoid using getters and setters with side effects
  - Never extend built-in prototypes
  - Avoid using `any` type; use `unknown` for truly unknown types
  - Don't use `@ts-ignore` comments to silence errors
  - Avoid non-null assertions (`!`) when possible
  - Use module augmentation sparingly and document when used
  - Consider dependency injection for better testability
  - Prefer composition over inheritance
