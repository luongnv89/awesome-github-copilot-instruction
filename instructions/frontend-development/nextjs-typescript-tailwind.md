# Next.js with TypeScript and Tailwind CSS Development Guidelines

## Project Context
- Modern Next.js applications using App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Performance-optimized web applications

## Code Style Guidelines
- Use functional components with TypeScript interfaces
- Follow naming convention: `ComponentName.tsx`
- Implement proper type definitions for props and states
- Use Tailwind classes with consistent ordering

## Architecture Patterns
- Implement feature-based folder structure
- Use server and client components appropriately
- Implement proper data fetching patterns
- Follow atomic design principles for components

## Testing Requirements
- Unit tests for components
- Integration tests for pages
- E2E testing with Playwright/Cypress
- Accessibility testing

## Documentation Standards
- Document component props with TypeScript interfaces
- Include usage examples in component files
- Document page routes and data fetching
- Maintain README with setup instructions

## Best Practices
```typescript
// Component structure
interface Props {
  title: string;
  children: React.ReactNode;
}

export default function Layout({ title, children }: Props) {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      {children}
    </div>
  );
}

// Data fetching
async function getData() {
  const res = await fetch('/api/data', {
    next: { revalidate: 3600 }
  });
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}

// Error handling
export function ErrorBoundary({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="p-4 bg-red-50 border border-red-200">
      <p>Something went wrong!</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

## Common Patterns
- Use layout components for shared UI
- Implement proper loading states
- Handle errors gracefully
- Optimize images with next/image
- Use CSS modules or Tailwind for styling

## Performance Guidelines
- Implement proper code splitting
- Use Image and Link components
- Optimize fonts and assets
- Implement proper caching strategies
- Use static generation when possible