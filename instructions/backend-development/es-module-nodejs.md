# ES Module Node.js Development Instructions

## Project Context
- Modern Node.js development
- ES Modules (ESM) usage
- TypeScript integration
- Package management
- Performance optimization

## Code Style Guidelines
- ESM import/export syntax
- Async/await patterns
- TypeScript type safety
- Module organization
- Error handling

## Architecture Patterns
- Module encapsulation
- Dependency injection
- Service architecture
- Event handling
- Error boundaries

## Testing Requirements
- Unit testing with Jest
- ESM testing patterns
- Integration testing
- Type testing
- Performance testing

## Documentation Standards
- JSDoc documentation
- Type definitions
- Module documentation
- API documentation
- Package configuration

## Project-Specific Rules
### ES Module Patterns
```typescript
// Module Export Pattern
export interface Config {
  port: number;
  host: string;
  environment: 'development' | 'production';
}

export class Service {
  #config: Config;
  
  constructor(config: Config) {
    this.#config = config;
  }
  
  async initialize(): Promise<void> {
    // Implementation
  }
}

// Dynamic Import Pattern
async function loadModule(moduleName: string) {
  try {
    const module = await import(`./modules/${moduleName}.js`);
    return module.default;
  } catch (error) {
    throw new Error(`Failed to load module: ${moduleName}`);
  }
}

// Service Pattern
export class UserService {
  #repository: UserRepository;
  #events: EventEmitter;
  
  constructor(repository: UserRepository, events: EventEmitter) {
    this.#repository = repository;
    this.#events = events;
  }
  
  async createUser(data: UserInput): Promise<User> {
    const user = await this.#repository.create(data);
    this.#events.emit('user:created', user);
    return user;
  }
}

// Repository Pattern
export class Repository<T extends { id: string }> {
  async findOne(id: string): Promise<T | null> {
    try {
      return await this.collection.findOne({ id });
    } catch (error) {
      throw new DatabaseError('Failed to find document', { cause: error });
    }
  }
  
  async create(data: Omit<T, 'id'>): Promise<T> {
    const id = crypto.randomUUID();
    const document = { id, ...data } as T;
    
    try {
      await this.collection.insertOne(document);
      return document;
    } catch (error) {
      throw new DatabaseError('Failed to create document', { cause: error });
    }
  }
}

// Error Handling Pattern
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    options?: ErrorOptions
  ) {
    super(message, options);
    this.name = this.constructor.name;
  }
}

// Middleware Pattern
export interface Middleware {
  (ctx: Context, next: () => Promise<void>): Promise<void>;
}

export const errorHandler: Middleware = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof AppError) {
      ctx.status = error.statusCode;
      ctx.body = {
        error: error.code,
        message: error.message
      };
    } else {
      ctx.status = 500;
      ctx.body = {
        error: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred'
      };
    }
  }
};

// Configuration Pattern
export const config = {
  async load(environment = process.env.NODE_ENV): Promise<Config> {
    const envConfig = await import(`./config/${environment}.js`);
    return {
      ...envConfig.default,
      environment
    };
  }
};

// Testing Pattern
import { describe, it, expect } from '@jest/globals';

describe('UserService', () => {
  it('should create user and emit event', async () => {
    const repository = new MockUserRepository();
    const events = new MockEventEmitter();
    const service = new UserService(repository, events);
    
    const user = await service.createUser({
      name: 'Test User',
      email: 'test@example.com'
    });
    
    expect(user).toBeDefined();
    expect(events.emitted('user:created')).toBeTruthy();
  });
});

// Type Definition Pattern
declare module 'config' {
  export interface Config {
    port: number;
    host: string;
    environment: string;
  }
  
  export function load(): Promise<Config>;
}