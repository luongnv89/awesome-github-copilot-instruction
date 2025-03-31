# Node.js Style Guide
- **Formatting**
  - Use 2 spaces for indentation (no tabs)
  - Use UNIX-style newlines (`\n`)
  - No trailing whitespace
  - Use semicolons
  - Limit lines to 80 characters
  - Use single quotes (except for JSON)
  - Opening braces go on the same line
  - Declare one variable per `var` statement

- **Naming Conventions**
  - Use `lowerCamelCase` for variables, properties and function names
  - Use `UpperCamelCase` for class names
  - Use `UPPERCASE` for constants
  - Use descriptive names (avoid single characters and uncommon abbreviations)

- **Variables**
  - Use trailing commas in multiline object and array literals
  - Put short declarations on a single line
  - Only quote object keys when necessary

- **Conditionals**
  - Always use the `===` operator
  - Use multi-line format for ternary operators
  - Use descriptive variables for non-trivial conditions

- **Functions**
  - Write small functions (aim for ~15 lines or less)
  - Return early from functions to avoid deep nesting
  - Name your closures for better debugging
  - Avoid nested closures
  - For method chaining, use one method per line with indentation

- **Comments**
  - Use slashes for both single line and multi-line comments
  - Write comments that explain higher-level mechanisms
  - Don't comment on obvious code

- **Best Practices**
  - Avoid `Object.freeze`, `Object.preventExtensions`, `Object.seal`, `with`, and `eval`
  - Put all requires at the top of file
  - Avoid using getters and setters with side effects
  - Never extend built-in prototypes