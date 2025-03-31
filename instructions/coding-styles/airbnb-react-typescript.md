# Airbnb React TypeScript Style Guide - Summary

- **Component Structure**
  - One React component per file (multiple stateless components allowed)
  - Always use JSX syntax instead of `React.createElement`
  - Use `class extends React.Component<Props, State>` for class components
  - Use function declarations with explicit typing for functional components
  - Define proper interfaces for Props and State
  - Use React.FC sparingly; prefer explicit return type annotations

- **Typing Components**
  - Define Props and State interfaces with PascalCase and "Props" or "State" suffix
  - Export Props interfaces when they're reused across components
  - Use readonly modifier for props that shouldn't change
  - Mark optional props with `?` rather than using `| undefined`
  - Use Discriminated Unions for complex component states
  - Use component generics for reusable components

- **Naming & Files**
  - Use `.tsx` extension for React components
  - Use `.ts` for files containing only TypeScript code
  - Use PascalCase for component filenames and references
  - Use camelCase for component instances
  - Use composite names for HOCs (e.g., `withFoo(Bar)`)
  - Name interfaces with PascalCase (e.g., `ButtonProps`)
  - Consider co-locating component's related types and interfaces

- **Props & Event Handling**
  - Define specific event handler types (avoid using `any`)
  - Use proper event types from React (e.g., `React.ChangeEvent<HTMLInputElement>`)
  - Type children prop explicitly when needed
  - Use enum for props with specific set of allowed values
  - Use union types for props that accept multiple types
  - Always include `alt` attributes on `<img>` tags
  - Don't use array index as `key` prop

- **Syntax & Formatting**
  - Use double quotes for JSX attributes, single quotes for JS/TS
  - Include a space in self-closing tags
  - Don't pad JSX curly braces with spaces
  - Wrap multiline JSX in parentheses
  - Always self-close tags without children
  - Place type assertions on separate lines for complex expressions

- **Default Props**
  - For function components, use default parameters
  - For class components, use static defaultProps with proper typing
  - Define default values for all optional props when possible
  - Use non-null assertion operator sparingly and only when appropriate

- **State Management**
  - Type Redux actions and reducers properly
  - Use discriminated unions for actions
  - Define the state shape with interfaces
  - Use React Context with proper typing for Provider and Consumer

- **Hooks**
  - Define explicit types for useState hooks when type cannot be inferred
  - Type useRef with proper element types (e.g., `useRef<HTMLDivElement>(null)`)
  - Define proper callback types for useCallback
  - Type the return value of useMemo
  - Create custom hooks with proper return type annotations

- **Methods & Events**
  - Use arrow functions for class methods to avoid `this` binding issues
  - Use proper TypeScript event types instead of any
  - Define handler prop types with appropriate event types
  - Type guard event objects when accessing target properties
  - Define callback function props with appropriate signatures

- **Component Organization**
  - Use Type Guards for conditional rendering based on props
  - Structure related types together for better organization
  - Consider extracting complex types to separate files
  - Group lifecycle methods by phases (mounting, updating, etc.)
  - Use barrel exports (index.ts files) for component libraries

- **Styling**
  - Type style objects when used inline
  - Use type-safe CSS-in-JS libraries
  - Define theme interfaces for styled components
  - Consider typed CSS modules

- **Testing**
  - Use proper TypeScript types for test files
  - Mock types consistently
  - Avoid type assertions in tests when possible
  - Set up proper TypeScript configuration for test files

- **Generic Components**
  - Use TypeScript generics for components that work with different data types
  - Constrain generics with extends when needed
  - Provide sensible defaults for generic parameters
  - Document generic parameters with JSDoc
