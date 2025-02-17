# Astro with TypeScript Development Guidelines

## Project Context
- Modern Astro applications
- TypeScript integration
- Static site generation
- Islands architecture

## Architecture Patterns
```typescript
// Project structure
/
├── src/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   └── utils/
├── public/
└── astro.config.mjs

// Component pattern
---
interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<article class="card">
  <h2>{title}</h2>
  {description && <p>{description}</p>}
  <slot />
</article>

<style>
  .card {
    padding: 1rem;
    border-radius: 0.5rem;
    background: var(--card-bg);
  }
</style>
```

## Islands Architecture
```astro
---
import InteractiveCounter from '../components/InteractiveCounter';
---

<main>
  <h1>Static Content</h1>
  
  <!-- Interactive island -->
  <InteractiveCounter client:load />
  
  <!-- More static content -->
  <footer>Static Footer</footer>
</main>
```

## Performance Guidelines
- Implement proper hydration strategies
- Use partial hydration
- Optimize asset loading
- Implement proper caching
- Use image optimization

## TypeScript Integration
```typescript
// Type-safe props
interface BlogPost {
  title: string;
  publishedAt: Date;
  tags: string[];
}

const posts = await getCollection('blog');
const typedPosts: BlogPost[] = posts.map(post => ({
  title: post.data.title,
  publishedAt: post.data.publishedAt,
  tags: post.data.tags || []
}));
```

## Best Practices
- Use content collections
- Implement proper SEO
- Handle dynamic imports
- Use proper MDX integration
- Implement proper routing

## Testing Requirements
- Component testing
- Integration testing
- E2E testing
- Performance testing
- SSG validation

## Documentation Standards
- Component documentation
- API documentation
- Integration guides
- Setup instructions
- Deployment guides

## Security Guidelines
- Content Security Policy
- Asset handling
- Form validation
- API security
- Authentication flows