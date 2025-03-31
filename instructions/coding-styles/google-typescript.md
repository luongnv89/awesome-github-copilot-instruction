# Google TypeScript Style Guide
- **Source File Basics**
  - Use UTF-8 encoding
  - Use only ASCII whitespace characters (no tabs)
  - Prefer actual Unicode characters over escapes
  - File structure order: copyright, file JSDoc, imports, implementation

- **Module System**
  - Use ES modules with named exports (`import {Foo} from './foo'`)
  - Prefer named imports for clarity
  - Don't use TypeScript namespaces (`namespace`)
  - Never modify builtin objects or the global object

- **Language Features**
  - Use `const` by default, `let` when necessary (never `var`)
  - Always declare one variable per declaration
  - Don't use Array constructor; use bracket notation
  - Use spread (`...`) for shallow copying arrays and objects
  - Use destructuring to access multiple properties
  - Don't use unfiltered `for...in` loops; prefer `Object.keys()`
  - Don't add non-enumerable properties to arrays

- **Classes**
  - Class declarations must not use semicolons, class expressions must
  - Use the `readonly` modifier for immutable properties
  - Use parameter properties for constructor-initialized class members
  - Don't use private field syntax (`#foo`); use `private` modifier
  - Avoid private static methods; use module-local functions
  - Document classes with JSDoc comments
  - Don't manipulate prototypes directly
  - Don't call static methods on subclasses

- **Interfaces & Types**
  - Use structural typing (not nominal)
  - Prefer interfaces over type aliases for objects
  - Use `T[]` syntax for simple arrays, `Array<T>` for complex types
  - Avoid empty interface type `{}`; prefer `unknown`, `Record`, or `object`
  - Use mapped and conditional types sparingly
  - Avoid wrapper objects for primitive types (`String`, `Number`, `Boolean`)
  - Prefer `unknown` over `any`; only use `any` when necessary

- **Functions**
  - Prefer function declarations for named functions
  - Use arrow functions for nested functions and callbacks
  - Don't use function expressions (use arrow functions)
  - Return value may be explicitly typed
  - Methods and functions should be documented with JSDoc
  - Use appropriate syntax for generator functions (`function*`)
  - Use rest parameters instead of `arguments`

- **Control Structures**
  - Always use braced blocks for control flow statements
  - Explicitly end statements with semicolon
  - Use triple equals (`===`) for equality checks
  - Avoid type assertions; use runtime checks instead
  - Keep try blocks focused on code that may throw
  - Always include a default case in switch statements
  - Add fall-through comments in switch statements

- **Error Handling**
  - Only throw instances of Error
  - Document empty catch blocks
  - Use explicit error checking instead of try/catch where possible

- **Naming**
  - Use descriptive names (no abbreviations)
  - Use camelCase for variables, parameters, functions, methods, properties
  - Use PascalCase for classes, interfaces, types, enums
  - Use CONSTANT_CASE for global constants and enum values
  - No Hungarian notation or underscores for private fields

- **Comments & Documentation**
  - Use JSDoc (`/** ... */`) for documentation comments
  - Use line comments (`//`) for implementation notes
  - JSDoc comments should be written in Markdown
  - Don't repeat type information already in TypeScript
  - Document all exports and non-obvious properties/methods
  - Document parameter properties in constructor JSDoc

- **TypeScript-Specific Features**
  - Don't use `@ts-ignore` comments to suppress errors
  - Avoid return-type-only generics
  - Don't declare nullable/undefined type aliases
  - Prefer optional parameters/fields over `|undefined` types

- **Tooling**
  - All code must pass TypeScript compiler checks
  - Follow all applicable conformance rules

- **Deprecation**
  - Mark deprecated code with `@deprecated` JSDoc annotation
  - Include clear directions for fixing call sites