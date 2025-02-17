# React Development Instructions

## Project Context
- Modern React development using functional components and hooks
- TypeScript-first approach for type safety
- Component-driven development with reusability in focus

## Code Style Guidelines
- Use functional components over class components
- Implement proper prop typing with TypeScript
- Follow React hooks rules strictly
- Use destructuring for props and state
- Maintain consistent naming conventions:
  - Components: PascalCase
  - Hooks: useCustomHookName
  - Files: ComponentName.tsx
  - Styles: ComponentName.styles.ts

## Architecture Patterns
- Follow Atomic Design principles
- Implement custom hooks for reusable logic
- Use Context API for global state management
- Implement proper error boundaries
- Follow container/presenter pattern where applicable

## Testing Requirements
- Write unit tests for hooks and utilities
- Implement component testing with React Testing Library
- Follow arrange-act-assert pattern
- Test error states and edge cases
- Maintain minimum 80% coverage

## Documentation Standards
- Document complex components with JSDoc
- Include prop-types or interface documentation
- Add usage examples for reusable components
- Document state management patterns
- Include component storybook documentation

## Project-Specific Rules
- Prefer controlled components
- Implement proper React.memo usage
- Use React.Suspense for code-splitting
- Follow accessibility guidelines
- Implement proper error handling patterns

## Common Patterns
```typescript
// Component Template
import React from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
}

export const Component: React.FC<Props> = ({ title, children }) => {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  );
};

// Custom Hook Template
export const useCustomHook = (initialValue: string) => {
  const [value, setValue] = React.useState(initialValue);
  
  React.useEffect(() => {
    // Effect logic
  }, [value]);

  return { value, setValue };
};
```