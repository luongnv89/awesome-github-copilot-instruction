# Astro Development Instructions

## Project Context
- Static site generation with Astro
- Performance-first approach
- TypeScript integration
- Island architecture

## Code Style Guidelines
- Follow consistent component structure
- Use proper TypeScript types
- Implement proper frontmatter usage
- Follow Astro component patterns
- Maintain clean import statements

## Architecture Patterns
- Use proper static/dynamic components
- Implement proper data fetching
- Follow proper routing patterns
- Use proper integration patterns
- Implement proper build optimization

## Testing Requirements
- Unit test components
- Test static generation
- Validate build output
- Test integration points
- Validate performance metrics

## Documentation Standards
- Document component usage
- Include integration guides
- Document build process
- Maintain content structure
- Document configuration options

## Project-Specific Rules
### Component Structure
- Use .astro extension for components
- Implement proper client directives
- Follow proper hydration patterns
- Use proper import aliases
- Implement proper SSR patterns

## Common Patterns
```astro
---
// Component Template
interface Props {
  title: string;
  description?: string;
}

const { title, description = 'Default description' } = Astro.props;
---

<div class="component">
  <h1>{title}</h1>
  {description && <p>{description}</p>}
</div>

<style>
  .component {
    /* Component styles */
  }
</style>

<script>
  // Client-side JavaScript
</script>
```