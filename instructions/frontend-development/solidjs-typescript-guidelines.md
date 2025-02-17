# SolidJS with TypeScript Development Guidelines

## Project Context
- Modern SolidJS applications
- Fine-grained reactivity
- TypeScript integration
- Performance optimization

## Architecture Patterns
```typescript
// Project structure
/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   └── utils/
└── vite.config.ts

// Component pattern
interface Props {
  name: string;
  onNameChange: (name: string) => void;
}

const NameInput: Component<Props> = (props) => {
  return (
    <input
      value={props.name}
      onInput={(e) => props.onNameChange(e.currentTarget.value)}
    />
  );
};

// Signal pattern
const [count, setCount] = createSignal(0);
const doubleCount = createMemo(() => count() * 2);
```

## Reactivity Patterns
```typescript
// Resource handling
const [data] = createResource(async () => {
  const response = await fetch('/api/data');
  return response.json();
});

// Store pattern
const TodoStore = createStore({
  todos: [],
  addTodo(text: string) {
    this.todos = [...this.todos, { text, completed: false }];
  },
  toggleTodo(index: number) {
    this.todos[index].completed = !this.todos[index].completed;
  }
});
```

## Performance Best Practices
- Use fine-grained reactivity
- Implement proper memoization
- Optimize re-renders
- Use proper context
- Lazy load components

## TypeScript Integration
- Use strict type checking
- Implement proper interfaces
- Type resource responses
- Handle proper generics
- Store type definitions

## Testing Requirements
- Unit testing components
- Integration testing
- Performance testing
- Store testing
- Effect testing

## Documentation Standards
- Component documentation
- Hook documentation
- Type definitions
- Setup instructions
- Integration guides

## Component Guidelines
```typescript
// Reusable component
const Button: Component<{
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  children: JSX.Element;
}> = (props) => {
  return (
    <button
      class={`btn ${props.variant || 'primary'}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
```

## Error Handling
- Error boundaries
- Resource error states
- Type validation
- Promise handling
- Debug tooling