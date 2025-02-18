# Angular with Novo Elements Development Instructions

## Project Context
- Angular application development with Novo Elements
- Enterprise UI component library
- TypeScript-first approach
- Modular architecture

## Code Style Guidelines
- Follow Angular style guide
- Use TypeScript strict mode
- Implement proper component patterns
- Follow reactive programming patterns
- Maintain consistent naming conventions

## Architecture Patterns
- Feature module organization
- Smart and presentational components
- State management best practices
- Dependency injection patterns
- Proper routing implementation

## Testing Requirements
- Unit tests for services and components
- E2E testing with Cypress
- Component testing with Angular Testing Library
- Coverage requirements
- Integration test patterns

## Documentation Standards
- JSDoc for components and services
- README for feature modules
- API documentation
- Architecture decision records
- Component documentation

## Project-Specific Rules
### Novo Elements Usage
- Follow Novo Elements patterns
- Implement proper theming
- Use proper form controls
- Follow accessibility guidelines
- Maintain component hierarchy

## Common Patterns
```typescript
// Component Template
@Component({
  selector: 'app-custom',
  template: `
    <novo-card>
      <novo-card-title>{{ title }}</novo-card-title>
      <novo-card-content>
        <novo-form [form]="form">
          <!-- Form fields here -->
        </novo-form>
      </novo-card-content>
    </novo-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomComponent implements OnInit {
  @Input() title: string;
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      // Form controls here
    });
  }
}

// Service Template
@Injectable({
  providedIn: 'root'
})
export class CustomService {
  private state$ = new BehaviorSubject<State>(initialState);

  constructor(private http: HttpClient) {}

  getData(): Observable<Data> {
    return this.http.get<Data>('/api/endpoint').pipe(
      tap(data => this.updateState(data)),
      catchError(this.handleError)
    );
  }
}