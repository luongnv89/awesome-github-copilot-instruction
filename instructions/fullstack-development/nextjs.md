# Next.js Development Instructions

## Project Context
- Next.js 14+ with App Router
- Full-stack development with Server Components
- SEO-optimized applications
- TypeScript and Tailwind CSS integration

## Code Style Guidelines
- Follow Server/Client Component patterns
- Use proper route segment config options
- Implement proper metadata management
- Follow file-system based routing conventions
- Maintain consistent data fetching patterns

## Architecture Patterns
- Implement proper route handlers
- Use server actions for form submissions
- Follow proper caching strategies
- Implement streaming and suspense patterns
- Use proper loading and error states

## Testing Requirements
- Unit test client components
- Integration tests for API routes
- E2E testing with Playwright/Cypress
- Test server actions
- Validate metadata generation

## Documentation Standards
- Document page/layout relationships
- Include API route specifications
- Document reusable components
- Maintain README with setup instructions
- Document environment variables

## Project-Specific Rules
- Use proper image optimization
- Implement proper font optimization
- Follow proper authentication patterns
- Use proper dynamic routing patterns
- Implement proper middleware usage

## Common Patterns
```typescript
// Page Template
export const metadata = {
  title: 'Page Title',
  description: 'Page description'
};

export default async function Page() {
  return (
    <main>
      <h1>Page Content</h1>
    </main>
  );
}

// API Route Handler
export async function GET(request: Request) {
  try {
    // Handler logic
    return Response.json({ data: 'success' });
  } catch (error) {
    return Response.json({ error: 'Error message' }, { status: 500 });
  }
}
```