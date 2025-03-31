# TypeScript Standard Style - Summary

- **Formatting & Spacing**
  - Use 2 spaces for indentation
  - Use single quotes for strings (except to avoid escaping)
  - Add space after keywords and before function parentheses
  - Use spaces inside single line blocks
  - Infix operators must be spaced
  - Commas should have space after them
  - Keep else statements on same line as curly braces
  - Add spaces inside comments
  - No tabs, only spaces
  - No trailing whitespace
  - End files with a newline
  - No multiple blank lines

- **TypeScript-Specific Formatting**
  - Place a space after type annotations colon (`: `)
  - No space after generic parameters angle brackets
  - Use line breaks in complex type declarations when they exceed line length
  - Place interface and type properties on separate lines for readability
  - Align parameter/property types vertically for better readability

- **Type Annotations**
  - Only add type annotations when TypeScript cannot infer the type correctly
  - Use type annotations for function parameters and return types
  - Use explicit return type annotations for public APIs
  - Use interfaces over type aliases for public-facing object shapes
  - Use type aliases for complex union types and function signatures
  - Mark arrays as readonly when they shouldn't be modified

- **Interfaces and Types**
  - Use PascalCase for interface and type names
  - Don't use "I" prefix for interfaces (e.g., use `User`, not `IUser`)
  - Use descriptive names that convey meaning
  - Use `type` for unions, intersections, and utility types
  - Use `interface` for object shapes that may be extended

- **Generics**
  - Use single uppercase letter for simple generic type parameters (`T`, `K`, `V`)
  - Use descriptive names for complex generic types (`TItem`, `TInput`)
  - Constrain generics when appropriate using the `extends` keyword
  - Use default generic parameters when applicable

- **Syntax Practices**
  - No unused variables or imports
  - Always use triple equals (`===`) instead of double equals
  - Keep else statements on the same line as closing braces
  - For multi-line if statements, use curly braces
  - Multi-line ternary operators: place `?` and `:` on their own lines
  - For variable declarations, write each in its own statement
  - Wrap conditional assignments with parentheses
  - Use camelCase for naming variables and functions
  - Use PascalCase for classes, interfaces, and types
  - No trailing commas in objects/arrays
  - Place commas at end of current line, not beginning of next
  - Dot should be on same line as property
  - Constructor names must begin with capital letter
  - No semicolons

- **Error Handling**
  - Always handle the `err` function parameter
  - Throw only Error objects, not literals
  - Use specific error types for different error cases
  - Mark errors with appropriate types

- **Nullability**
  - Enable strict null checks in tsconfig.json
  - Use undefined (not null) for optional or missing values
  - Use optional chaining (`?.`) for nullable object access
  - Use nullish coalescing (`??`) for default values
  - Use optional parameters instead of parameters with undefined values

- **Best Practices**
  - No `eval()` or implied eval
  - Declare browser globals with a `/* global */` comment
  - Constructor with no arguments must be invoked with parentheses
  - Objects must contain getter when setter is defined
  - Use array literals instead of constructors
  - Avoid using `arguments.callee` and `arguments.caller`
  - Avoid modifying class declarations or `const` variables
  - No control characters in regular expressions
  - No `debugger` statements
  - No `delete` on variables
  - No duplicate arguments, class members, keys, or case labels
  - Use a single import statement per module
  - Use `break` to prevent fallthrough in switch cases
  - No extending native objects
  - Use `isNaN()` when checking for `NaN`
  - Always wrap IIFEs (Immediately Invoked Function Expressions)
  - Avoid Yoda conditions

- **TypeScript Features to Use**
  - Use property shorthand when possible (`{ value }` instead of `{ value: value }`)
  - Use parameter properties in classes when appropriate
  - Use readonly modifier for immutable properties
  - Use enums for values that represent a specific set of choices
  - Use const assertions for immutable object literals (`as const`)
  - Use intersection types to combine types
  - Use conditional types for complex type logic
  - Use utility types like `Partial<T>`, `Readonly<T>`, etc.
  - Use type guards to narrow types within conditions

- **TypeScript Features to Avoid**
  - Avoid using `any` type; use `unknown` when type is truly indeterminate
  - Avoid using the `as` keyword for type assertions; prefer type guards
  - Don't use `@ts-ignore` or `@ts-nocheck` comments
  - Avoid using non-null assertion operator (`!`) when possible
  - Don't use `namespace` or `module` declarations (use ES modules)
  - Don't use triple-slash directives except for reference types
  - Don't write ambient declarations in regular TypeScript files
