# Astro with Tailwind CSS Development Instructions

## Project Context
- Astro static site generation
- Tailwind CSS styling
- JavaScript components
- Content collections
- Performance optimization

## Code Style Guidelines
- Astro component structure
- Tailwind class organization
- Content management
- Script handling
- Performance patterns

## Architecture Patterns
- Islands architecture
- Content collections
- Dynamic routing
- Component composition
- Asset optimization

## Testing Requirements
- Component testing
- Visual testing
- Integration testing
- Performance testing
- Accessibility testing

## Documentation Standards
- Component documentation
- Content schema docs
- Route documentation
- Performance metrics
- Setup instructions

## Project-Specific Rules
### Astro Patterns
```typescript
// Page Component Pattern
---
import Layout from '../layouts/Layout.astro';
import { getCollection } from 'astro:content';
import PostCard from '../components/PostCard.astro';
import { Image } from 'astro:assets';

const posts = await getCollection('blog');
---

<Layout title="Blog">
  <main class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8">Blog Posts</h1>
    
    <div class="grid gap-8 md:grid-cols-2">
      {posts.map((post) => (
        <PostCard post={post} />
      ))}
    </div>
  </main>
</Layout>

// Component Pattern
---
interface Props {
  post: CollectionEntry<'blog'>;
  featured?: boolean;
}

const { post, featured = false } = Astro.props;
const { title, description, pubDate, image } = post.data;
---

<article class:list={[
  'bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg',
  { 'md:col-span-2': featured }
]}>
  <div class="aspect-video relative">
    <Image
      src={image}
      alt={title}
      class="object-cover"
      width={800}
      height={400}
      format="webp"
    />
  </div>
  
  <div class="p-6">
    <time class="text-sm text-gray-500">
      {pubDate.toLocaleDateString()}
    </time>
    
    <h2 class="text-xl font-semibold mt-2">
      {title}
    </h2>
    
    <p class="text-gray-600 mt-2">
      {description}
    </p>
    
    <a
      href={`/blog/${post.slug}`}
      class="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800"
    >
      Read more
      <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24">
        <path fill="currentColor" d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
      </svg>
    </a>
  </div>
</article>

// Content Collection Schema
import { defineCollection, z } from 'astro:content';

export const collections = {
  blog: defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.date(),
      image: z.string(),
      tags: z.array(z.string()),
      draft: z.boolean().default(false)
    })
  })
};

// Layout Component
---
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import { ViewTransitions } from 'astro:transitions';

interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{title}</title>
    {description && <meta name="description" content={description} />}
    <ViewTransitions />
  </head>
  <body class="min-h-screen bg-gray-50">
    <Header />
    <slot />
    <Footer />
  </body>
</html>

// Client-side Interactivity
---
import { Image } from 'astro:assets';

interface Props {
  images: ImageMetadata[];
}

const { images } = Astro.props;
---

<div class="relative" id="image-carousel">
  {images.map((image, index) => (
    <div
      class:list={[
        'transition-opacity duration-300',
        { 'opacity-0': index !== 0 }
      ]}
      data-index={index}
    >
      <Image
        src={image}
        alt={`Slide ${index + 1}`}
        class="w-full aspect-video object-cover"
      />
    </div>
  ))}
  
  <button
    class="absolute left-4 top-1/2 -translate-y-1/2"
    data-direction="prev"
  >
    Previous
  </button>
  
  <button
    class="absolute right-4 top-1/2 -translate-y-1/2"
    data-direction="next"
  >
    Next
  </button>
</div>

<script>
  class Carousel {
    constructor(element) {
      this.element = element;
      this.slides = Array.from(element.querySelectorAll('[data-index]'));
      this.currentIndex = 0;
      
      this.setupEventListeners();
    }
    
    setupEventListeners() {
      this.element.addEventListener('click', (e) => {
        const button = e.target.closest('[data-direction]');
        if (!button) return;
        
        const direction = button.dataset.direction;
        if (direction === 'next') {
          this.next();
        } else {
          this.prev();
        }
      });
    }
    
    next() {
      this.show((this.currentIndex + 1) % this.slides.length);
    }
    
    prev() {
      this.show((this.currentIndex - 1 + this.slides.length) % this.slides.length);
    }
    
    show(index) {
      this.slides[this.currentIndex].classList.add('opacity-0');
      this.slides[index].classList.remove('opacity-0');
      this.currentIndex = index;
    }
  }
  
  // Initialize carousels
  document.querySelectorAll('#image-carousel').forEach(element => {
    new Carousel(element);
  });
</script>

// API Endpoint
export async function GET({ params }) {
  const { slug } = params;
  const post = await getEntry('blog', slug);
  
  if (!post) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found'
    });
  }
  
  return new Response(JSON.stringify(post), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}
```