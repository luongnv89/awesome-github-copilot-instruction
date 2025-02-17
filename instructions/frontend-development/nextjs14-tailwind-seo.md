# Next.js 14 with Tailwind and SEO Development Instructions

## Project Context
- Next.js 14 App Router
- Tailwind CSS styling
- SEO optimization focus
- Performance optimization
- Server and client components

## Code Style Guidelines
- Server/Client component patterns
- Metadata implementation
- Tailwind class organization
- Image optimization
- Route handlers

## Architecture Patterns
- App Router organization
- Server component architecture
- Data fetching patterns
- SEO implementation
- Caching strategies

## Testing Requirements
- Server component testing
- Client component testing
- Integration testing
- SEO validation
- Performance testing

## Documentation Standards
- Route documentation
- SEO strategy docs
- Component API docs
- Performance metrics
- Deployment guides

## Project-Specific Rules
### Next.js 14 Patterns
```typescript
// Metadata Pattern
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Site Name',
    template: '%s | Site Name'
  },
  description: 'Site description for SEO',
  openGraph: {
    title: 'Site Name',
    description: 'Site description for social sharing',
    type: 'website',
    url: 'https://example.com',
    siteName: 'Site Name'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Site Name',
    description: 'Site description for Twitter'
  },
  robots: {
    index: true,
    follow: true
  }
}

// Server Component Pattern
async function BlogPage() {
  const posts = await fetchPosts()
  
  return (
    <section className="max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}

// Client Component Pattern
'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

export function SearchFilter() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(
    searchParams.get('q') ?? ''
  )
  
  return (
    <form className="space-y-4" action="/search">
      <input
        type="text"
        name="q"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 border rounded-md"
        placeholder="Search..."
      />
    </form>
  )
}

// Route Handler Pattern
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')
  
  try {
    const results = await performSearch(query)
    return NextResponse.json(results)
  } catch (error) {
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    )
  }
}

// Image Component Pattern
import Image from 'next/image'

export function OptimizedImage({ 
  src,
  alt,
  priority = false
}: {
  src: string
  alt: string
  priority?: boolean
}) {
  return (
    <div className="relative aspect-video">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover rounded-lg"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  )
}

// Loading and Error UI Pattern
export function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
    </div>
  )
}

export function Error({
  error,
  reset
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <button
        onClick={reset}
        className="px-4 py-2 bg-primary text-white rounded-md"
      >
        Try again
      </button>
    </div>
  )
}
```