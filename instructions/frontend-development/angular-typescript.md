# Angular TypeScript Development Instructions

## Project Context
- Modern Angular application development
- TypeScript strict mode enabled
- RxJS for reactive programming
- NgRx for state management
- Angular Material design system

## Code Style Guidelines
- Follow official Angular style guide
- Use TypeScript strict type checking
- Implement proper interfaces and types
- Follow functional programming principles
- Maintain consistent file structure

## Architecture Patterns
- Feature-based module organization
- Container and presentational components
- Redux pattern with NgRx
- Repository pattern for data access
- Micro frontend architecture support

## Testing Requirements
- Unit tests with Jasmine/Jest
- E2E tests with Cypress/Protractor
- Integration tests for services
- State management testing
- Component isolation testing

## Documentation Standards
- TSDoc comments for public APIs
- Component documentation
- State management documentation
- Architecture diagrams
- API documentation

## Project-Specific Rules
### Component Development
```typescript
// Component Best Practices
@Component({
  selector: 'app-feature',
  template: `
    <ng-container *ngIf="data$ | async as data">
      <app-presentation
        [data]="data"
        (action)="onAction($event)">
      </app-presentation>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureComponent implements OnInit {
  data$: Observable<Data>;
  
  constructor(private store: Store) {
    this.data$ = this.store.select(selectData);
  }
  
  onAction(event: ActionEvent): void {
    this.store.dispatch(new Action(event));
  }
}

// Service Pattern
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) {}
  
  getData(): Observable<Data> {
    return this.http.get<Data>(`${this.apiUrl}/data`).pipe(
      catchError(this.handleError)
    );
  }
  
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => error);
  }
}

// State Management
interface State {
  data: Data[];
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  data: [],
  loading: false,
  error: null
};

// Effects Pattern
@Injectable()
export class DataEffects {
  loadData$ = createEffect(() => 
    this.actions$.pipe(
      ofType(DataActionTypes.Load),
      mergeMap(() => this.dataService.getData()
        .pipe(
          map(data => new LoadSuccess(data)),
          catchError(error => of(new LoadFailure(error)))
        ))
    )
  );
  
  constructor(
    private actions$: Actions,
    private dataService: DataService
  ) {}
}