# React TypeScript with Shadcn/UI Development Instructions

## Project Context
- Modern React development
- TypeScript integration
- Shadcn/UI component system
- Tailwind CSS styling
- Accessibility-first approach

## Code Style Guidelines
- TypeScript strict mode
- Component composition patterns
- Proper prop typing
- Custom hook patterns
- State management practices

## Architecture Patterns
- Feature-based organization
- Component architecture
- Custom hooks design
- State management flow
- Theme configuration

## Testing Requirements
- Component unit testing
- Hook testing
- Integration testing
- Accessibility testing
- Theme testing

## Documentation Standards
- Component documentation
- Hook documentation
- Theme customization
- Accessibility notes
- API documentation

## Project-Specific Rules
### Component Development
```typescript
// Component Pattern with Shadcn/UI
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  onAction?: () => void
}

export const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ title, description, className, onAction, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn('p-6 space-y-4', className)}
        {...props}
      >
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
        {onAction && (
          <Button onClick={onAction} variant="outline">
            Learn More
          </Button>
        )}
      </Card>
    )
  }
)
FeatureCard.displayName = 'FeatureCard'

// Custom Hook Pattern
interface UseFeatureState<T> {
  data: T | null
  isLoading: boolean
  error: Error | null
  reload: () => Promise<void>
}

function useFeatureState<T>(
  fetchFn: () => Promise<T>
): UseFeatureState<T> {
  const [data, setData] = React.useState<T | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)

  const fetch = React.useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const result = await fetchFn()
      setData(result)
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Unknown error'))
    } finally {
      setIsLoading(false)
    }
  }, [fetchFn])

  React.useEffect(() => {
    fetch()
  }, [fetch])

  return {
    data,
    isLoading,
    error,
    reload: fetch
  }
}

// Theme Configuration
const theme = {
  extend: {
    colors: {
      border: 'hsl(var(--border))',
      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))'
      },
      secondary: {
        DEFAULT: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--secondary-foreground))'
      }
    },
    borderRadius: {
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)'
    }
  }
}

// Form Pattern with Validation
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
  role: z.enum(['admin', 'user'])
})

export function UserForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      role: 'user'
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Handle form submission
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields using Shadcn/UI components */}
    </form>
  )
}