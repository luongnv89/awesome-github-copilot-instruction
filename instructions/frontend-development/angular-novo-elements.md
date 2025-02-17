# Angular Novo Elements Development Instructions

## Project Context
- Angular Elements development
- Novo UI Framework integration
- Web Components
- Micro-frontend architecture

## Code Style Guidelines
- Follow Angular style guide
- Use proper component lifecycle
- Implement proper custom elements
- Follow proper event handling
- Use proper encapsulation

## Architecture Patterns
- Use proper custom elements
- Implement proper shadow DOM
- Follow proper data binding
- Use proper event dispatching
- Implement proper style isolation

## Testing Requirements
- Test custom elements
- Validate shadow DOM
- Test event handling
- Implement integration tests
- Test browser compatibility

## Documentation Standards
- Document custom elements API
- Include usage examples
- Document event interface
- Maintain browser support
- Include integration guides

## Project-Specific Rules
### Custom Elements
- Use proper naming conventions
- Implement proper attributes
- Follow proper lifecycle hooks
- Use proper property bindings
- Implement proper event handling

## Common Patterns
```typescript
// Custom Element Template
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'novo-custom-element',
  template: `
    <div class="custom-element">
      <h2>{{title}}</h2>
      <div class="content">
        <ng-content></ng-content>
      </div>
      <button (click)="handleAction()">{{actionText}}</button>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      margin: 1em;
    }
  `]
})
export class NovoCustomElement {
  @Input() title: string = '';
  @Input() actionText: string = 'Action';
  @Output() action = new EventEmitter<void>();

  handleAction() {
    this.action.emit();
  }
}

// Element Registration
import { createCustomElement } from '@angular/elements';
import { NovoCustomElement } from './novo-custom-element';

@NgModule({
  declarations: [NovoCustomElement],
  imports: [CommonModule],
})
export class NovoElementsModule {
  constructor(injector: Injector) {
    const element = createCustomElement(NovoCustomElement, { injector });
    customElements.define('novo-custom-element', element);
  }
}

// Event Handling
@Component({
  template: `
    <div class="wrapper">
      <novo-custom-element
        [title]="'Custom Element'"
        [actionText]="'Click Me'"
        (action)="handleAction($event)">
        <p>Content projection example</p>
      </novo-custom-element>
    </div>
  `
})
export class WrapperComponent {
  handleAction(event: any) {
    console.log('Custom element action', event);
  }
}

// Style Encapsulation
const styles = `
  :host {
    --primary-color: #007bff;
    --font-family: 'Roboto', sans-serif;
  }
  
  .custom-element {
    font-family: var(--font-family);
    border: 1px solid var(--primary-color);
    padding: 1em;
  }
`;
```