# Principles of Writing Consistent, Idiomatic TypeScript

- **Core Principles**
  - All code should look like a single person typed it, regardless of how many contributors
  - Consistency in style is more important than personal preferences
  - Create code that is both humanly readable and machine parsable
  - TypeScript is meant to improve JavaScript, not replace its patterns

- **Whitespace**
  - Never mix spaces and tabs
  - Choose either soft indents (spaces) or real tabs for entire project
  - Recommended: 2 character indent size
  - Use "show invisibles" in your editor when possible
  - Use Editorconfig to maintain consistent whitespace settings
  - Place a space after type annotations colon (`: `)
  - No space after generic parameters angle brackets

- **Syntax & Formatting**
  - Use spaces around keywords and function declarations
  - Use braces with if/else/for/while/try blocks and span multiple lines
  - One variable declaration per scope or one per variable (be consistent)
  - Keep variable declarations at the top of their scope
  - Put `const` and `let` declarations at the top of their block scope
  - Named function declarations should have space after name
  - For function expressions, prefer those with identifiers
  - Maintain consistent spacing in function calls
  - No space between function name and opening parenthesis for calls
  - Use consistent quote style (single or double) throughout a project
  - Remove end-of-line whitespace and blank line whitespace
  - Use line breaks in complex type declarations when they exceed line length
  - Place interface and type properties on separate lines for readability

- **Type System**
  - Prefer structural typing over nominal typing
  - Use TypeScript's inference where possible; annotate when inference isn't clear
  - String: `typeof variable === "string"`
  - Number: `typeof variable === "number"`
  - Boolean: `typeof variable === "boolean"`
  - Object: `typeof variable === "object"`
  - Array: `Array.isArray(arrayLikeObject)`
  - Node: `elem.nodeType === 1`
  - null: `variable === null`
  - null or undefined: `variable == null`
  - undefined (global): `typeof variable === "undefined"`
  - undefined (local): `variable === undefined`
  - undefined (property): `object.prop === undefined`
  - Use type predicates for custom type guards: `function isString(x: any): x is string`

- **Interfaces & Types**
  - Use interfaces for object types that will be extended or implemented
  - Use type aliases for unions, intersections, and mapped types
  - Use PascalCase for interface and type names
  - Don't use "I" prefix for interfaces (e.g., use `User`, not `IUser`)
  - Use descriptive names that convey meaning
  - Break complex interfaces into smaller pieces for reusability
  - Prefer readonly properties when values shouldn't change

- **Classes**
  - Use parameter properties to reduce boilerplate (`constructor(private name: string)`)
  - Mark immutable properties with readonly
  - Use public/private/protected access modifiers consistently
  - Put constructor first, followed by public methods, protected methods, then private methods
  - Use abstract classes for common base functionality
  - Use singleton pattern via static instance property when appropriate
  - Explicitly annotate return types for all public methods

- **Generics**
  - Use single uppercase letter for simple generic type parameters (`T`, `K`, `V`)
  - Use descriptive names for complex generic types (e.g., `TItem`, `TResult`)
  - Constrain generics when appropriate using the `extends` keyword
  - Add default type parameters when suitable (`<T = string>`)
  - Use type parameters in pairs when they naturally go together (e.g., `<K, V>`)
  - Avoid over-parameterizing with generics; use only when needed

- **Conditional Evaluation**
  - Use truthiness evaluations when checking array length, string emptiness
  - Prefer `===` over `==` unless loose type evaluation is needed
  - Use `foo == null` to check for null or undefined specifically
  - Remember that falsy values include: `""`, `0`, `null`, `undefined`, `NaN`
  - Use explicit type guards to narrow union types
  - Use nullish coalescing (`??`) for null/undefined checks
  - Use optional chaining (`?.`) for potentially undefined properties

- **Practical Patterns**
  - Use module pattern with namespaces for encapsulation when needed
  - For constructors, return `this` to enable method chaining
  - Use discriminated unions for type-safe pattern matching
  - Use tuple types for fixed-length arrays of mixed types
  - Use index signatures for dynamic properties (`[key: string]: T`)
  - Use mapped types to transform existing types
  - Use utility types like `Partial<T>`, `Readonly<T>`, `Record<K, V>`

- **Naming Conventions**
  - Use descriptive, meaningful names - no single letter variables except in loops
  - Use camelCase for functions, variables, methods, properties
  - Use PascalCase for classes, interfaces, types, enums, type aliases
  - Arrays should be named plurals of what they contain
  - Boolean variables should have "is", "has", or similar prefix
  - Function/method names should begin with verbs
  - For `this` context:
    - Prefer arrow functions for preserving context
    - Use `thisArg` with array methods when available
    - Avoid aliasing `this`

- **Error Handling**
  - Create custom error types by extending Error
  - Always catch the unknown type for errors (`catch(error: unknown)`)
  - Type guard error objects before accessing their properties
  - Use union types for function results that may fail
  - Consider using Result patterns instead of throwing/catching for expected errors

- **Async Patterns**
  - Always annotate Promise return types with the resolved value: `Promise<T>`
  - Prefer `async`/`await` over raw promise handling
  - Type Promise rejection values
  - Use Promise-specific utility types when needed (`Awaited<T>`, etc.)
  - Consider generic Result types for async operations

- **Enums**
  - Use PascalCase for enum names
  - Use PascalCase for enum members
  - Prefer string enums over numeric enums for readability
  - Consider using const enums for better optimization
  - Document each enum value with JSDoc comments

- **Nullability**
  - Enable strict null checks in tsconfig.json
  - Use optional parameters and properties (with `?`) instead of union with undefined
  - Only use `null` for intentionally empty values; prefer `undefined` for missing values
  - Use type guards to check for null/undefined values
  - Avoid non-null assertion operator (`!`) when possible

- **Comments & Documentation**
  - Use JSDoc-style comments for documenting functions, classes, interfaces
  - Document parameters, return values, and thrown exceptions
  - Use TSDoc tags for TypeScript-specific documentation
  - Avoid redundant type annotations in comments
  - Include examples in comments for complex functions or APIs

- **Project Configuration**
  - Use strict mode in tsconfig.json
  - Enable all recommended type-checking options
  - Configure consistent import paths
  - Add appropriate lib settings based on environment
  - Use module resolution and target settings that match your runtime

- **General Principles**
  - Write in one consistent style throughout a project
  - Don't modify native objects or prototypes
  - Let the type system help you; don't fight against it
  - Leverage TypeScript's features, but don't overuse them
  - Apply type annotations at API boundaries for clear contracts
