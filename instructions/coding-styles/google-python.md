# Google Python Style Guide

- **Python Language Rules**
  - Use pylint as a code linter
  - Use imports for packages and modules only, not individual classes or functions
  - Import each module using full pathname location
  - Use exceptions for exceptional conditions, not control flow
  - Avoid mutable global state
  - Nested functions/classes are fine when closing over local values
  - Use list/dict/set comprehensions for simple cases only
  - Use default iterators and operators for types that support them
  - Use generators as needed
  - Use lambda functions only for one-liners
  - Conditional expressions (x if y else z) OK for simple cases
  - Default argument values should never be mutable objects
  - Properties should be used when simple computations are needed
  - Use implicit False tests (if foo: instead of if foo != []:)
  - Use decorator syntax judiciously
  - Avoid fancy language features (metaclasses, bytecode access, etc.)
  - Use from __future__ imports for Python compatibility
  - Use type annotations where helpful

- **Python Style Rules**
  - No semicolons
  - Maximum line length of 80 characters
  - Use parentheses sparingly
  - Indent code blocks with 4 spaces (never tabs)
  - Use trailing commas in sequences only when closing bracket is on another line
  - Use blank lines sparingly (two between top-level definitions)
  - No whitespace inside parentheses/brackets/braces
  - Use whitespace after commas/semicolons/colons
  - No trailing whitespace
  - Surround binary operators with single space on each side
  - Follow standard typographic rules for spaces around punctuation
  - Shebang line: #!/usr/bin/env python3 (if needed)

- **Docstrings**
  - Use """triple double quotes""" for docstrings
  - One-line docstring should be on one line
  - Multi-line docstrings: summary line, blank line, details
  - Modules should have docstrings describing contents and usage
  - Functions/methods should have docstrings with clear Args:/Returns:/Raises: sections
  - Class docstrings should include Attributes: section for public attributes

- **String Formatting**
  - Use f-strings, %-formatting, or str.format()
  - Avoid + operator for string concatenation in loops

- **Files and I/O**
  - Always use with statement for file and similar resource handling

- **TODO Comments**
  - Format: # TODO: link_to_issue - explanation
  - Must include context (ideally a bug reference) and explanation

- **Imports**
  - Group imports: __future__, standard library, third-party, application imports
  - Sort imports alphabetically within each group
  - Use absolute imports

- **Naming**
  - `module_name`, `package_name`
  - `ClassName`, `ExceptionName`
  - `function_name`, `method_name`, `instance_var_name`, `function_parameter_name`, `local_var_name`
  - `GLOBAL_CONSTANT_NAME`
  - Protected members start with single underscore `_`
  - Private instance variables use double underscore `__` (rarely needed)

- **Main Function**
  - Use `if __name__ == '__main__'` guard with main() function
  - Prefer small, focused functions (not strict limit, but review if over 40 lines)

- **Type Annotations**
  - Follow PEP 484 typing rules
  - Use type annotations for function signatures and variables
  - Add type annotations to APIs and complex code
  - Follow specific line breaking conventions for type annotations
  - Use forward declarations when necessary
  - Avoid conditional imports except when absolutely necessary
  - Use proper type aliases for complex types
  - Prefer abstract container types over concrete ones

- **Comments**
  - Comments should be complete sentences with proper punctuation
  - Use block comments for complex logic explanations
  - Inline comments should be separated by at least two spaces from code
