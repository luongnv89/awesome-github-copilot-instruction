# ES Module Node.js Development Instructions

## Project Context
- Modern Node.js development with ESM
- TypeScript integration
- Performance optimization
- Modern package management

## Code Style Guidelines
- Use ESM import/export syntax
- Follow proper file extensions (.mjs)
- Implement proper error handling
- Use proper async patterns
- Follow proper type declarations

## Architecture Patterns
- Use proper module organization
- Implement proper middleware
- Follow proper routing patterns
- Use proper service patterns
- Implement proper dependency injection

## Testing Requirements
- Use modern test runners
- Test async operations
- Implement ESM-compatible mocks
- Test type compatibility
- Validate module loading

## Documentation Standards
- Document module exports
- Include TypeScript types
- Document async patterns
- Maintain JSDoc comments
- Include usage examples

## Project-Specific Rules
### Module Patterns
- Use proper package exports
- Implement proper tree shaking
- Follow proper circular dependency handling
- Use proper conditional exports
- Implement proper module loading

## Common Patterns
```typescript
// Module Export Template
export interface Config {
  port: number;
  host: string;
}

export class Service {
  constructor(private config: Config) {}
  
  async initialize() {
    // Initialization logic
  }
}

// Dynamic Import Pattern
async function loadModule(path: string) {
  try {
    const module = await import(path);
    return module.default;
  } catch (error) {
    throw new Error(`Failed to load module: ${error.message}`);
  }
}

// Service Pattern
import { createServer } from 'node:http';
import { once } from 'node:events';

export class HttpService {
  private server;
  
  constructor(private port: number) {
    this.server = createServer(this.handleRequest.bind(this));
  }
  
  private async handleRequest(req, res) {
    try {
      const body = await this.parseBody(req);
      // Request handling
    } catch (error) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: error.message }));
    }
  }
  
  async start() {
    this.server.listen(this.port);
    await once(this.server, 'listening');
  }
  
  async stop() {
    this.server.close();
    await once(this.server, 'close');
  }
}

// Configuration Pattern
export const config = {
  async load(env = process.env) {
    return {
      port: parseInt(env.PORT ?? '3000', 10),
      host: env.HOST ?? 'localhost'
    };
  }
} as const;
```