# Vue 3 and Nuxt 3 Development Guidelines

## Project Context
- Modern Vue 3 applications
- Nuxt 3 framework
- Composition API
- TypeScript integration

## Architecture Patterns
```typescript
// Project structure
/
├── components/
├── composables/
├── pages/
├── layouts/
└── server/

// Component pattern with script setup
<script setup lang="ts">
interface Props {
  title: string
  items: string[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update', value: string): void
}>()

const itemCount = computed(() => props.items.length)
</script>

<template>
  <div>
    <h2>{{ title }}</h2>
    <p>Total items: {{ itemCount }}</p>
  </div>
</template>
```

## Composition Patterns
```typescript
// Composable pattern
export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  function increment() {
    count.value++
  }
  
  function decrement() {
    count.value--
  }
  
  return {
    count: readonly(count),
    increment,
    decrement
  }
}

// Server state management
const users = useState('users', () => [])
const { data: posts } = await useFetch('/api/posts')
```

## Best Practices
- Use Composition API
- Implement SSR properly
- Handle TypeScript types
- Use proper layouts
- Implement error handling

## Performance Guidelines
- Use proper caching
- Implement lazy loading
- Handle SSR hydration
- Optimize assets
- Use proper suspense

## Testing Requirements
- Component testing
- Composable testing
- E2E testing
- API testing
- Integration testing

## State Management
```typescript
// Pinia store pattern
export const useStore = defineStore('main', {
  state: () => ({
    user: null as User | null,
    theme: 'light'
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.user
  },
  
  actions: {
    async login(credentials: Credentials) {
      const user = await api.login(credentials)
      this.user = user
    }
  }
})
```

## Documentation Standards
- Component documentation
- API documentation
- Type definitions
- Setup instructions
- Deployment guides

## Security Guidelines
- Handle authentication
- Implement CSRF
- Use proper headers
- Handle input validation
- API security