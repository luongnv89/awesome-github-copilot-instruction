# Google JavaScript Style Guide

- **Source File Basics**
  - Use lowercase filenames with `.js` extension (may include underscores or dashes)
  - Use UTF-8 encoding
  - Use only ASCII space character for whitespace (no tabs)
  - Use special escape sequences instead of numeric escapes

- **Source File Structure**
  - Order: license/copyright, file JSDoc, goog.module/imports, implementation
  - Separate sections with one blank line
  - Use either goog.module or ES modules consistently

- **Formatting**
  - Use 2 spaces for indentation
  - Use K&R style braces (opening brace on same line)
  - Use braces for all control structures
  - Empty blocks may be closed immediately: `{}`
  - Keep lines under 80 columns
  - Break at higher syntactic level when wrapping
  - Indent continuation lines at least +4 spaces
  - Use a single space after keywords and around operators
  - Avoid horizontal alignment with spaces
  - Place function arguments on same line or with proper indentation

- **Language Features**
  - Use `const` by default, `let` when needed, never `var`
  - Declare one variable per declaration
  - Declare variables close to first use
  - Include trailing commas in multiline arrays/objects
  - Don't use Array constructor or Object constructor
  - Use object literal shorthand and method shorthand
  - Use computed property names only with symbols or enum values
  - Use destructuring where it improves readability
  - Define enums with `@enum` annotation

- **Classes**
  - Define fields in constructor
  - Mark fields with appropriate visibility annotations (`@private`, etc.)
  - Use computed properties only with symbols
  - Prefer module-local functions over private static methods
  - Don't manipulate prototypes directly
  - Don't use getters and setters
  - Use `@interface` or `@record` for interfaces
  - Mark abstract classes with `@abstract`
  - Don't create static container classes

- **Functions**
  - Prefer arrow functions for nested functions
  - Use parameter default values (with spaces around `=`)
  - Use rest parameters instead of `arguments`
  - Include JSDoc for parameters and return types
  - Document property types

- **String Literals**
  - Use single quotes for ordinary strings
  - Use template literals for string interpolation or multiline strings
  - Don't use line continuation with backslash

- **Control Structures**
  - Prefer for-of loops when possible
  - Only use for-in loops on dict-style objects
  - Always throw Error objects, not string literals
  - Include comment for empty catch blocks
  - Always include `default` case in switch statements
  - Use fall-through comments in switch statements

- **JavaScript Features to Avoid**
  - Never use `with`
  - Don't use `eval()` or `Function` constructor with string arguments
  - Don't rely on automatic semicolon insertion
  - Don't use wrapper objects for primitive types
  - Don't modify built-in objects

- **Naming**
  - Package names: lowerCamelCase
  - Class/interface/enum names: UpperCamelCase
  - Method names: lowerCamelCase
  - Constant names: CONSTANT_CASE
  - Non-constant field names: lowerCamelCase
  - Parameter names: lowerCamelCase
  - Local variables: lowerCamelCase

- **JSDoc**
  - Use Markdown in JSDoc comments
  - Document parameter and return types
  - Place line-wrapped tag descriptions at 4-space indentation
  - Include file overview for files with multiple classes
  - Document classes with description and relevant tags
  - Document enums and typedefs with appropriate tags
  - Use inline JSDoc for simple parameter/return types

- **Type System**
  - Be explicit about nullability with `!` and `?`
  - Always specify template parameters
  - Use function type expressions where needed
  - Maintain consistent spacing in type annotations