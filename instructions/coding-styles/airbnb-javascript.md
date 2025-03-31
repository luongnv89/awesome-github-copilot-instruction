# Airbnb JavaScript Style Guide - Summary

## Types
  - Primitives: access by value (`string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`)
  - Complex: access by reference (`object`, `array`, `function`)

## References
  - Use `const` for all references; avoid `var`
  - Use `let` only if reassigning references
  - Both `const` and `let` are block-scoped, unlike function-scoped `var`

## Objects
  - Use literal syntax for object creation
  - Use computed property names when creating objects with dynamic properties
  - Use object method and property value shorthand
  - Group shorthand properties at the beginning
  - Only quote invalid identifier properties
  - Don't call `Object.prototype` methods directly
  - Prefer object spread (`{...obj}`) over `Object.assign`

## Arrays
  - Use literal syntax for array creation
  - Use `Array#push` instead of direct assignment
  - Use array spreads `...` to copy arrays
  - Use `...` for iterable conversion; `Array.from` for array-like objects
  - Use return statements in array method callbacks
  - Use line breaks after opening and before closing array brackets for multiline arrays

## Destructuring
  - Use object destructuring when accessing multiple properties
  - Use array destructuring
  - Use object destructuring for multiple return values, not array destructuring

## Strings
  - Use single quotes (`''`) for strings
  - Don't write strings that cause line breaks over 100 characters
  - Use template literals for string composition
  - Never use `eval()` on strings
  - Don't unnecessarily escape characters

## Functions
  - Use named function expressions instead of function declarations
  - Wrap IIFEs in parentheses
  - Never declare functions in non-function blocks
  - Never name a parameter `arguments`
  - Use rest syntax (`...`) instead of `arguments`
  - Use default parameter syntax rather than mutating function arguments
  - Avoid side effects with default parameters
  - Always put default parameters last
  - Never use the Function constructor

## Arrow Functions
  - Use arrow functions for anonymous functions
  - Omit braces and use implicit return when function body is a single expression
  - Wrap expressions over multiple lines in parentheses
  - Always include parentheses around arguments
  - Avoid confusing arrow function syntax with comparison operators

## Classes & Constructors
  - Use `class` syntax; avoid manipulating `prototype` directly
  - Use `extends` for inheritance
  - Methods can return `this` for method chaining
  - Don't use empty constructors or ones that just delegate to parent
  - Avoid duplicate class members
  - Class methods should use `this` or be static

## Modules
  - Always use ES modules (`import`/`export`) over non-standard module systems
  - Don't use wildcard imports
  - Don't export directly from an import
  - Only import from a path in one place
  - Don't export mutable bindings
  - Prefer default export for single exports
  - Put all imports above non-import statements
  - Multi-line imports should follow proper indentation

## Iterators and Generators
  - Prefer JavaScript's higher-order functions over loops
  - Don't use generators for now (poor ES5 transpilation)

## Properties
  - Use dot notation when accessing properties
  - Use bracket notation `[]` when accessing properties with a variable
  - Use exponentiation operator (`**`) when calculating exponentiations

## Variables
  - Always use `const` or `let`, never undeclared variables
  - Use one declaration per variable or assignment
  - Group all `const`s and then all `let`s
  - Assign variables where you need them in a reasonable place
  - Don't chain variable assignments
  - Avoid unary increments and decrements (`++`, `--`)
  - Avoid linebreaks before or after `=` in assignments

## Comparison Operators & Equality
  - Use `===` and `!==` over `==` and `!=`
  - Use shortcuts for booleans, but explicit comparisons for strings and numbers
  - Use braces for case/default clauses with lexical declarations
  - Keep ternaries simple and on single lines when possible
  - Avoid unneeded ternary statements
  - Use parentheses when mixing operators
  - Use nullish coalescing (`??`) only for `null`/`undefined` cases

## Blocks
  - Use braces with multiline blocks
  - Put `else` on same line as closing brace of `if`
  - Avoid unnecessary `else` blocks when `if` contains a return

## Control Statements
  - Break long conditions onto multiple lines with operators at the start of lines
  - Don't use selection operators in place of control statements

## Comments
  - Use `/** ... */` for multiline comments
  - Use `//` for single line comments above the subject
  - Start comments with a space for readability
  - Prefix comments with `FIXME:` or `TODO:` for actionable items

## Whitespace
  - Use soft tabs (2 spaces)
  - Place 1 space before leading braces
  - Place 1 space before parentheses in control statements
  - Set off operators with spaces
  - End files with a single newline
  - Use indentation for long method chains with leading dots
  - Leave a blank line after blocks and before statements
  - Don't pad blocks with blank lines or use multiple blank lines

## Commas
  - Use trailing commas, not leading
  - Include additional trailing commas for cleaner diffs

## Semicolons
  - Use semicolons at the end of statements

## Type Casting & Coercion
  - Perform type coercion at the beginning of statements
  - Use explicit conversion functions: `String()`, `Number()`, `parseInt()`, `Boolean()`

## Naming Conventions
  - Be descriptive; avoid single letter names
  - Use camelCase for objects, functions, and instances
  - Use PascalCase for classes and constructors
  - Don't use leading/trailing underscores
  - Don't save references to `this`; use arrow functions or bind
  - Filename should match default export name
  - Acronyms should be all uppercase or all lowercase

## Accessors
  - Accessor functions aren't required but be consistent if used
  - Use verb prefixes like `get`, `set`, `is`, `has` appropriately

## Events
  - Pass objects with data rather than raw values when triggering events

## jQuery
  - Prefix jQuery objects with `$`
  - Cache jQuery lookups
  - Use optimal selectors and scoping for DOM queries

## Testing
  - Write tests for all code
  - Aim for high test coverage
  - Write regression tests when fixing bugs
