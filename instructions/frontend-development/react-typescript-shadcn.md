# React TypeScript with Shadcn/UI Instructions

## Project Context
- React 18+ with TypeScript
- Shadcn/UI component system
- Tailwind CSS styling
- Accessibility-first development

## Code Style Guidelines
- Use TypeScript strict mode
- Follow component-first architecture
- Implement proper type definitions
- Use proper naming conventions:
  - Components: PascalCase
  - Hooks: useCustomHook
  - Utils: camelCase
  - Types: PascalCase

## Architecture Patterns
- Follow Atomic Design principles
- Use proper component composition
- Implement proper state management
- Follow proper routing patterns
- Use proper form handling

## Testing Requirements
- Use React Testing Library
- Test component interactions
- Validate accessibility
- Test theme switching
- Test form validations

## Documentation Standards
- Document component APIs
- Include usage examples
- Document theme customization
- Maintain style guide
- Document accessibility features

## Project-Specific Rules
### Component Structure
- Follow Shadcn/UI patterns
- Use proper variant patterns
- Implement proper theming
- Use proper form components
- Follow proper layout patterns

## Common Patterns
```typescript
// Component Template with Variants
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

// Form Hook Usage
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
})

export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  })

  return (
    <form onSubmit={form.handleSubmit((data) => console.log(data))}>
      {/* Form fields */}
    </form>
  )
}
```