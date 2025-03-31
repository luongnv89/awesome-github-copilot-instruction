# Principles of Writing Consistent, Idiomatic JavaScript

- **Core Principle**
  - All code should look like a single person typed it, regardless of how many contributors
  - Consistency in style is more important than personal preferences

- **Whitespace**
  - Never mix spaces and tabs
  - Choose either soft indents (spaces) or real tabs for entire project
  - Recommended: 2 character indent size
  - Use "show invisibles" in your editor when possible
  - Use Editorconfig to maintain consistent whitespace settings

- **Beautiful Syntax**
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

- **Type Checking**
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

- **Conditional Evaluation**
  - Use truthiness evaluations when checking array length, string emptiness
  - Prefer `===` over `==` unless loose type evaluation is needed
  - Use `foo == null` to check for null or undefined specifically
  - Remember that falsy values include: `""`, `0`, `null`, `undefined`, `NaN`

- **Practical Patterns**
  - Use module pattern with IIFE for encapsulation
  - For constructors, return `this` to enable method chaining
  - When not using `new`, consider factory functions

- **Naming Conventions**
  - Use descriptive, meaningful names - no single letter variables except in loops
  - Use camelCase for functions and variable declarations
  - Use PascalCase for constructor functions
  - Arrays should be named plurals of what they contain
  - Regular expressions can be prefixed with 'r'
  - For `this` context:
    - Prefer `.bind(this)` or equivalent library methods
    - Use `thisArg` with array methods when available
    - As last resort, alias `this` as `self`

- **Optimization Tips**
  - Consider alternatives to `switch` statements for better performance
  - Early returns improve code readability
  - Be careful when extending native objects (try to avoid this)

- **Comments**
  - Single line comments go above code
  - Multiline comments are encouraged for complex logic
  - Avoid end-of-line comments
  - Consider JSDoc style for documentation

- **General Principles**
  - Write in one consistent language style throughout a project
  - "Comma first" style is not recommended
  - Don't modify native objects without good reason