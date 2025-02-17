# Astro TypeScript Development Instructions

## Project Context
- Static site generation with Astro
- TypeScript integration
- Content-focused websites
- Performance optimization
- SEO best practices

## Code Style Guidelines
- TypeScript strict mode
- Component-based architecture
- Content Collections usage
- Image optimization patterns
- CSS/Styling conventions

## Architecture Patterns
- Islands Architecture
- Dynamic/Static routing
- Content collection structure
- Data fetching patterns
- State management

## Testing Requirements
- Component testing
- Integration testing
- Performance testing
- SEO validation
- Accessibility testing

## Documentation Standards
- Component documentation
- Content schema definitions
- API integration docs
- Performance metrics
- Deployment guides

## Project-Specific Rules
### Astro Components
- Use proper file organization
- Implement proper client directives
- Follow SSR/SSG patterns
- Optimize image handling
- Maintain proper hydration

## Common Patterns
```typescript
// Astro Component Template
---
import { Image } from 'astro:assets';
import type { CollectionEntry } from 'astro:content';

interface Props {
    post: CollectionEntry<'blog'>;
    isFeature?: boolean;
}

const { post, isFeature = false } = Astro.props;
const { title, description, image } = post.data;
---

<article class:list={['post', { feature: isFeature }]}>
    <Image
        src={image}
        alt={title}
        width={800}
        height={400}
        format="webp"
    />
    <h2>{title}</h2>
    <p>{description}</p>
</article>

<style>
    .post {
        @apply grid gap-4;
    }
    .feature {
        @apply col-span-2;
    }
</style>

// Content Collection Schema
import { z, defineCollection } from 'astro:content';

const blog = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        image: z.string(),
        tags: z.array(z.string())
    })
});

// API Integration
async function getDataFromAPI<T>(endpoint: string): Promise<T> {
    const response = await fetch(endpoint);
    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }
    return response.json();
}

// SSR Component with Client Interactivity
---
import { ViewTransitions } from 'astro:transitions';

let count = 0;
---

<html>
    <head>
        <ViewTransitions />
    </head>
    <body>
        <button id="counter" client:visible>
            Count: {count}
        </button>
        
        <script>
            const button = document.getElementById('counter');
            let count = 0;
            
            button?.addEventListener('click', () => {
                count++;
                if (button) button.textContent = `Count: ${count}`;
            });
        </script>
    </body>
</html>
```