# Vue.js 3 Development Instructions

## Project Context
- Vue 3 with Composition API
- TypeScript integration
- Single File Components
- State management with Pinia

## Code Style Guidelines
- Use proper composition functions
- Follow Vue style guide
- Implement proper type definitions
- Use proper naming conventions:
  - Components: PascalCase
  - Composables: use[Name]
  - Props: camelCase
  - Events: kebab-case

## Architecture Patterns
- Use proper component composition
- Implement proper state management
- Follow proper routing patterns
- Use proper dependency injection
- Implement proper composables

## Testing Requirements
- Unit test components
- Test composables
- Validate component lifecycle
- Test component events
- Implement integration tests

## Documentation Standards
- Document component props
- Include composable usage
- Document emit events
- Maintain component API
- Include setup instructions

## Project-Specific Rules
### Component Structure
- Use script setup syntax
- Implement proper refs/reactive
- Follow proper computed patterns
- Use proper watch patterns
- Implement proper lifecycle

## Common Patterns
```vue
<!-- Component Template -->
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { PropType } from 'vue'
import { useUserStore } from '@/stores/user'

interface User {
  id: string
  name: string
  email: string
}

const props = defineProps<{
  initialData?: User
  mode: 'create' | 'edit'
}>()

const emit = defineEmits<{
  (e: 'save', user: User): void
  (e: 'cancel'): void
}>()

const userStore = useUserStore()
const form = ref({
  name: props.initialData?.name ?? '',
  email: props.initialData?.email ?? ''
})

const isValid = computed(() => {
  return form.value.name && form.value.email
})

const handleSubmit = async () => {
  if (!isValid.value) return
  
  const user = await userStore.saveUser({
    ...props.initialData,
    ...form.value
  })
  
  emit('save', user)
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label>Name</label>
      <input
        v-model="form.name"
        type="text"
        :class="{ error: !form.name }"
      />
    </div>
    
    <div class="form-group">
      <label>Email</label>
      <input
        v-model="form.email"
        type="email"
        :class="{ error: !form.email }"
      />
    </div>
    
    <div class="actions">
      <button
        type="submit"
        :disabled="!isValid"
      >
        {{ mode === 'create' ? 'Create' : 'Update' }}
      </button>
      <button
        type="button"
        @click="emit('cancel')"
      >
        Cancel
      </button>
    </div>
  </form>
</template>

<!-- Composable Pattern -->
export function useAsync<T>(
  asyncFn: () => Promise<T>
) {
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref(false)

  async function execute() {
    loading.value = true
    error.value = null
    
    try {
      data.value = await asyncFn()
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    error,
    loading,
    execute
  }
}

<!-- Store Pattern -->
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: null as User | null,
    users: [] as User[]
  }),
  
  getters: {
    userById: (state) => {
      return (id: string) => state.users.find(u => u.id === id)
    }
  },
  
  actions: {
    async fetchUsers() {
      const response = await api.get<User[]>('/users')
      this.users = response.data
    },
    
    async saveUser(userData: Partial<User>) {
      if (userData.id) {
        const response = await api.put<User>(
          `/users/${userData.id}`,
          userData
        )
        
        const index = this.users.findIndex(
          u => u.id === userData.id
        )
        
        if (index !== -1) {
          this.users[index] = response.data
        }
        
        return response.data
      }
      
      const response = await api.post<User>(
        '/users',
        userData
      )
      
      this.users.push(response.data)
      return response.data
    }
  }
})
```