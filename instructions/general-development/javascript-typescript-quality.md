# JavaScript and TypeScript Code Quality Instructions

## Project Context
- Modern JavaScript/TypeScript
- Clean code principles
- Type safety
- Testing practices
- Performance optimization

## Code Style Guidelines
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Code organization
- Documentation standards

## Architecture Patterns
- SOLID principles
- Functional programming
- Object composition
- Module patterns
- Error handling

## Testing Requirements
- Unit testing
- Integration testing
- Type testing
- Performance testing
- E2E testing

## Documentation Standards
- JSDoc documentation
- Type definitions
- Code examples
- API documentation
- Setup instructions

## Project-Specific Rules
### Code Quality Patterns
```typescript
// Type Safety Pattern
type Result<T, E = Error> = {
  success: true;
  data: T;
} | {
  success: false;
  error: E;
};

function isSuccess<T, E>(result: Result<T, E>): result is { success: true; data: T } {
  return result.success;
}

// Function Pattern
async function fetchData<T>(url: string): Promise<Result<T, Error>> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error : new Error(String(error))
    };
  }
}

// Class Pattern
interface LoggerOptions {
  level: 'debug' | 'info' | 'warn' | 'error';
  prefix?: string;
}

class Logger {
  private readonly options: Required<LoggerOptions>;

  constructor(options: LoggerOptions) {
    this.options = {
      prefix: '',
      ...options
    };
  }

  public info(message: string, ...args: unknown[]): void {
    if (this.shouldLog('info')) {
      console.info(this.format(message), ...args);
    }
  }

  private shouldLog(level: LoggerOptions['level']): boolean {
    const levels = ['debug', 'info', 'warn', 'error'];
    return levels.indexOf(level) >= levels.indexOf(this.options.level);
  }

  private format(message: string): string {
    return `${this.options.prefix}${message}`;
  }
}

// Module Pattern
export interface CacheOptions {
  ttl: number;
  maxSize?: number;
}

export class Cache<K, V> {
  private cache = new Map<K, { value: V; timestamp: number }>();
  private readonly options: Required<CacheOptions>;

  constructor(options: CacheOptions) {
    this.options = {
      maxSize: Infinity,
      ...options
    };
  }

  public set(key: K, value: V): void {
    if (this.cache.size >= this.options.maxSize) {
      this.evictOldest();
    }

    this.cache.set(key, {
      value,
      timestamp: Date.now()
    });
  }

  public get(key: K): V | undefined {
    const item = this.cache.get(key);
    if (!item) return undefined;

    if (this.isExpired(item.timestamp)) {
      this.cache.delete(key);
      return undefined;
    }

    return item.value;
  }

  private isExpired(timestamp: number): boolean {
    return Date.now() - timestamp > this.options.ttl;
  }

  private evictOldest(): void {
    const oldest = Array.from(this.cache.entries())
      .sort(([, a], [, b]) => a.timestamp - b.timestamp)[0];
    
    if (oldest) {
      this.cache.delete(oldest[0]);
    }
  }
}

// Testing Pattern
describe('Cache', () => {
  let cache: Cache<string, number>;

  beforeEach(() => {
    cache = new Cache({ ttl: 1000 });
  });

  test('should store and retrieve values', () => {
    cache.set('key', 123);
    expect(cache.get('key')).toBe(123);
  });

  test('should expire values after ttl', async () => {
    cache.set('key', 123);
    
    await new Promise(resolve => setTimeout(resolve, 1100));
    
    expect(cache.get('key')).toBeUndefined();
  });
});

// Error Handling Pattern
class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = 500
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  public toJSON(): Record<string, unknown> {
    return {
      code: this.code,
      message: this.message,
      stack: this.stack
    };
  }
}

// Functional Programming Pattern
type Predicate<T> = (value: T) => boolean;
type Transformer<T, R> = (value: T) => R;

function pipe<T>(...fns: Transformer<T, T>[]): Transformer<T, T> {
  return (value: T) => fns.reduce((acc, fn) => fn(acc), value);
}

function filter<T>(predicate: Predicate<T>): Transformer<T[], T[]> {
  return (array: T[]) => array.filter(predicate);
}

function map<T, R>(transformer: Transformer<T, R>): Transformer<T[], R[]> {
  return (array: T[]) => array.map(transformer);
}

// Validation Pattern
interface ValidationResult {
  valid: boolean;
  errors: string[];
}

class Validator<T> {
  private rules: Array<(value: T) => string | null> = [];

  public addRule(rule: (value: T) => string | null): this {
    this.rules.push(rule);
    return this;
  }

  public validate(value: T): ValidationResult {
    const errors = this.rules
      .map(rule => rule(value))
      .filter((error): error is string => error !== null);

    return {
      valid: errors.length === 0,
      errors
    };
  }
}

// Performance Pattern
function memoize<T, R>(
  fn: (arg: T) => R,
  options: { maxSize?: number; ttl?: number } = {}
): (arg: T) => R {
  const cache = new Cache<T, R>({
    ttl: options.ttl ?? Infinity,
    maxSize: options.maxSize
  });

  return (arg: T) => {
    const cached = cache.get(arg);
    if (cached !== undefined) {
      return cached;
    }

    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}