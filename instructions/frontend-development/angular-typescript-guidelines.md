# Angular TypeScript Development Guidelines

## Project Context
- Modern Angular applications
- TypeScript best practices
- Standalone components
- Signals and RxJS

## Architecture Patterns
```typescript
// Feature module organization
/
├── feature/
│   ├── components/
│   ├── services/
│   ├── models/
│   └── utils/

// Standalone component
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="user$ | async as user">
      <h2>{{ user.name }}</h2>
    </div>
  `
})
export class UserProfileComponent {
  private userService = inject(UserService);
  user$ = this.userService.getCurrentUser();
}
```

## State Management
### Signals
```typescript
// Signal store pattern
export class UserStore {
  private readonly state = signal<UserState>({
    user: null,
    loading: false,
    error: null
  });

  readonly user = computed(() => this.state().user);
  readonly loading = computed(() => this.state().loading);

  async loadUser(id: string) {
    this.state.update(s => ({ ...s, loading: true }));
    try {
      const user = await this.userService.getUser(id);
      this.state.update(s => ({ ...s, user, loading: false }));
    } catch (error) {
      this.state.update(s => ({ 
        ...s, error, loading: false 
      }));
    }
  }
}
```

## Testing Guidelines
- Unit testing components
- Integration testing
- E2E with Cypress/Playwright
- Service testing
- Signal testing patterns

## Performance Best Practices
- Change detection strategy
- Lazy loading
- Virtual scrolling
- Web workers usage
- Server-side rendering

## Component Guidelines
- Smart/Dumb pattern
- Input/Output contracts
- Lifecycle hooks usage
- Template optimization
- Style encapsulation

## Documentation Standards
- TypeDoc usage
- Component documentation
- API documentation
- Setup instructions
- Architectural decisions

## Error Handling
```typescript
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: Error) {
    console.error('An error occurred:', error);
    // Error reporting logic
  }
}
```

## Security Guidelines
- XSS prevention
- CSRF protection
- Content Security Policy
- Safe data binding
- Route guards