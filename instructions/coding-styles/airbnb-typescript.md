# Airbnb TypeScript Style Guide - Summary

- **TypeScript-Specific**
  - Prefer interfaces over type aliases for object shapes
  - Use type annotations for function return types, arguments where intent is not clear
  - Use PascalCase for type names, interfaces, and enums
  - Use camelCase for variables, functions, class members
  - Don't use `I` prefix for interfaces
  - Use `T` prefix for generic type parameters (e.g., `TItem`)
  - Use meaningful type parameter names when intent is not obvious (e.g., `TInput`, `TOutput`)
  - Use readonly modifier for immutable properties instead of const assertions

- **Types**
  - Use explicit types for function parameters and return values when necessary
  - Use union types for values that can be multiple types
  - Mark arrays as readonly when they shouldn't be modified
  - Use nullable types (e.g., `string | null`) instead of `undefined`
  - Use more specific types over more general types (`string[]` over `any[]`)
  - Use TypeScript's built-in utility types (`Partial<T>`, `Readonly<T>`, etc.)
  - Avoid using `any` when possible; use `unknown` for truly unknown types

- **Interfaces & Types**
  - Prefer interface declarations over type aliases for public APIs
  - Use type aliases for unions, tuples, and complex function types
  - Always define return types for public APIs
  - Use interfaces for extending and implementing
  - Use namespaced imports when importing many types from a module

- **Classes**
  - Use parameter properties for concise class declarations
  - Use access modifiers (public, private, protected) for all properties and methods
  - Use private modifiers instead of TypeScript's private fields (#) syntax
  - Use readonly modifier for properties that shouldn't change after initialization
  - Define instance properties in the class, not the constructor

- **Functions**
  - Use function type expressions instead of interfaces with call signatures
  - Annotate parameters with types unless they can be inferred clearly
  - Use optional parameters instead of undefined arguments
  - Use default parameters when appropriate
  - Don't use method overloading; use union types for arguments
  - Use generics for functions that work with various types

- **Modules**
  - Use named exports in TypeScript modules (`export class Foo {}`)
  - Use explicit import type for imports used only in type positions
  - Avoid export default with named exports
  - Import type from the same module when only using the type
  - Don't use namespace keyword to organize types

- **Nullability**
  - Use undefined (not null) for optional or missing properties
  - Use null for intentional empty values
  - Use optional parameter properties instead of setting default to undefined
  - Enable strict null checks in tsconfig
  - Use nullish coalescing operator (`??`) for null/undefined checks

- **Enums**
  - Use const enums for improved performance
  - Use PascalCase for enum names
  - Use PascalCase for enum members
  - Prefer string enums over numeric enums

- **Type Assertions**
  - Use `as` syntax for type assertions (`foo as Bar` not `<Bar>foo`)
  - Use `unknown` over `any` for casting unknown values
  - Avoid unsafe type assertions when possible
  - Always add type annotations for `as const` assertions

- **Generics**
  - Use generics when creating collections/wrappers of values
  - Use extended generics when requiring specific types
  - Use default generic parameters where appropriate
  - Use constraints to ensure the types meet certain requirements

- **TSConfig**
  - Use `strict: true` in tsconfig.json
  - Enable `noImplicitAny` in tsconfig
  - Enable `strictNullChecks` in tsconfig
  - Enable `noImplicitReturns` in tsconfig
  - Use paths alias for imports to avoid deep nested imports

- **Testing & Documentation**
  - Use TypeScript-compatible JSDoc annotations
  - Don't repeat types in JSDoc that are already defined in the code
  - Use JSDoc `@template` for documenting generic functions
  - Document complex type parameters
  - Define type testing utilities for complex type assertions

- **Tooling**
  - Use ESLint with TypeScript parser
  - Use Prettier for formatting
  - Use type checking in pre-commit hooks
  - Consider TSDoc for documentation generation

- **Async Code**
  - Use Promise<T> for functions that return promises
  - Use async/await over Promise chains
  - Handle Promise rejections with try/catch
  - Define error types for rejected promises
