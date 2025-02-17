# React with MobX Development Guidelines

## Project Context
- React applications with MobX
- Observable state patterns
- TypeScript integration
- Scalable state management

## Architecture Patterns
```typescript
// Project structure
/
├── src/
│   ├── stores/
│   ├── components/
│   ├── hooks/
│   └── services/

// Store pattern
class TodoStore {
  @observable todos: Todo[] = [];
  @observable isLoading = false;
  
  constructor(private api: ApiService) {
    makeAutoObservable(this);
  }
  
  @action
  async fetchTodos() {
    this.isLoading = true;
    try {
      this.todos = await this.api.getTodos();
    } finally {
      this.isLoading = false;
    }
  }
  
  @computed
  get completedTodos() {
    return this.todos.filter(todo => todo.completed);
  }
}
```

## Store Integration
```typescript
// Store provider setup
const rootStore = new RootStore();

function App() {
  return (
    <StoreProvider value={rootStore}>
      <Router>
        <AppRoutes />
      </Router>
    </StoreProvider>
  );
}

// Component with store
function TodoList() {
  const store = useStore();
  
  useEffect(() => {
    store.todoStore.fetchTodos();
  }, []);
  
  return useObserver(() => (
    <div>
      {store.todoStore.todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  ));
}
```

## Best Practices
- Use proper decorators
- Implement reactions carefully
- Handle computed properties
- Use proper actions
- Implement proper types

## Performance Guidelines
- Optimize observers
- Use computed properties
- Handle reactions properly
- Implement proper batching
- Optimize re-renders

## Testing Requirements
- Store unit testing
- Component integration
- Action testing
- Computed testing
- Mock stores properly

## State Management
- Proper store structure
- Handle async actions
- State persistence
- State hydration
- Error handling

## Documentation Standards
- Store documentation
- Action documentation
- Type definitions
- Setup instructions
- Integration guides

## Error Handling
```typescript
class ErrorStore {
  @observable error: Error | null = null;
  
  @action
  setError(error: Error) {
    this.error = error;
    // Handle error reporting
  }
  
  @action
  clearError() {
    this.error = null;
  }
}
```