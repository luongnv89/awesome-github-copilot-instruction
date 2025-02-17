# Next.js with Tailwind and SEO Instructions

## Project Context
- Next.js 14+ development
- Tailwind CSS integration
- SEO optimization focus
- Performance-first approach

## Code Style Guidelines
- Use TypeScript for type safety
- Follow Next.js file-based routing conventions
- Implement proper metadata management
- Use proper Tailwind class organization
- Follow consistent component structure

## Architecture Patterns
- Use App Router architecture
- Implement proper Server Components
- Follow proper data fetching patterns
- Use proper loading/error states
- Implement proper route handlers

## Testing Requirements
- Jest/React Testing Library for components
- E2E testing with Playwright/Cypress
- Test SEO metadata generation
- Validate performance metrics
- Test server-side functions

## Documentation Standards
- Document page/layout relationships
- Include component API documentation
- Document SEO strategies
- Maintain README with setup steps
- Document environment configuration

## Project-Specific Rules
### SEO Optimization
- Implement proper metadata
- Use semantic HTML structure
- Follow proper image optimization
- Implement proper sitemap generation
- Use proper canonical URLs

### Performance
- Use proper image optimization
- Implement proper font loading
- Follow proper caching strategies
- Use proper code splitting
- Implement proper asset optimization

## Common Patterns
```typescript
// Page Template with Metadata
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
  openGraph: {
    title: 'Page Title',
    description: 'Page description',
    images: ['/og-image.jpg'],
  },
}

export default function Page() {
  return (
    <main className="container mx-auto px-4">
      <h1 className="text-4xl font-bold">Content</h1>
    </main>
  )
}

// Server Component with Data Fetching
async function getData() {
  const res = await fetch('https://api.example.com/data')
  if (!res.ok) throw new Error('Failed to fetch data')
  return res.json()
}

export default async function AsyncComponent() {
  const data = await getData()
  
  return (
    <div className="grid gap-4">
      {data.map(item => (
        <article key={item.id} className="p-4 rounded-lg shadow">
          {item.content}
        </article>
      ))}
    </div>
  )
}
```