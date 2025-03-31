# Airbnb React/JSX Style Guide - Summary

- **Component Structure**
  - One React component per file (multiple stateless components allowed)
  - Always use JSX syntax instead of `React.createElement`
  - Use `class extends React.Component` for stateful components
  - Use function declarations for stateless components
  - Don't use mixins

- **Naming & Files**
  - Use `.jsx` extension for React components
  - Use PascalCase for component filenames and references
  - Use camelCase for component instances
  - Use composite names for HOCs (e.g., `withFoo(Bar)`)

- **Syntax & Formatting**
  - Use double quotes for JSX attributes, single quotes for JS
  - Include a space in self-closing tags
  - Don't pad JSX curly braces with spaces
  - Wrap multiline JSX in parentheses
  - Always self-close tags without children

- **Props**
  - Use camelCase for prop names
  - Omit value when prop is explicitly `true`
  - Always include `alt` attributes on `<img>` tags
  - Don't use array index as `key` prop
  - Define defaultProps for all non-required props
  - Use spread props sparingly

- **Methods & Events**
  - Use arrow functions to close over local variables
  - Bind event handlers in the constructor
  - Don't use underscore prefix for internal methods
  - Always return a value in render methods

- **Component Organization**
  - Follow specific ordering for lifecycle methods
  - Follow specific patterns for defining propTypes and defaultProps
  - Don't use `isMounted` (anti-pattern)
