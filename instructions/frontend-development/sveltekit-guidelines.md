# SvelteKit Development Guidelines

## Project Context
- Modern SvelteKit applications
- Server-side rendering
- TypeScript integration
- Tailwind CSS styling

## Architecture Patterns
```typescript
// Route structure (+page.svelte)
<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;
</script>

// Server-side loading (+page.server.ts)
export const load = async ({ fetch, params }) => {
    const response = await fetch(`/api/items/${params.id}`);
    return {
        item: await response.json()
    };
};

// Store management
import { writable } from 'svelte/store';

export const cart = writable<CartItem[]>([]);

// Actions example
export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        // Process form data
    }
};
```

## Component Guidelines
- Use TypeScript for type safety
- Implement proper prop validation
- Use slots for component composition
- Follow reactive patterns

## State Management
- Use Svelte stores appropriately
- Implement proper reactivity
- Handle server/client state
- Use context when needed

## Performance Best Practices
- Implement proper loading states
- Use SSR effectively
- Optimize bundle size
- Handle asset loading
- Use transitions properly

## Routing Guidelines
- Implement proper layouts
- Handle route parameters
- Use route guards
- Error boundaries
- Loading states

## Testing Requirements
- Component testing
- Integration testing
- E2E testing setup
- Test utils and helpers
- Mock implementations

## Documentation Standards
- Document components
- API documentation
- Usage examples
- TypeScript types
- Project setup guide

## Deployment Strategy
- Build optimization
- Environment setup
- Static file handling
- API integration
- Error handling