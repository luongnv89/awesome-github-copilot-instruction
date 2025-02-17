# Full-Stack Development Patterns

## Project Context
- Modern web application architecture
- API integration patterns
- State management
- Full-stack type safety

## Code Style Guidelines
- Maintain consistent patterns across stack
- Share types between frontend and backend
- Follow API naming conventions
- Implement proper error handling
- Use consistent formatting

## Architecture Patterns
- Implement proper layered architecture
- Use appropriate state management
- Follow API design patterns
- Implement proper caching
- Use proper authentication flows

## Testing Requirements
- Test full request/response cycle
- Implement E2E testing
- Test authentication flows
- Validate data consistency
- Test error scenarios

## Documentation Standards
- Document API endpoints
- Include authentication flows
- Document deployment process
- Maintain architecture diagrams
- Include setup instructions

## Project-Specific Rules
- Use appropriate error handling
- Implement proper validation
- Follow security best practices
- Use proper logging
- Implement proper monitoring

## Common Patterns
```typescript
// API Route Pattern
interface ApiResponse<T> {
  data?: T;
  error?: {
    message: string;
    code: string;
  };
  status: number;
}

// Frontend API Client
class ApiClient {
  async request<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`/api/${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });
      
      const data = await response.json();
      return {
        data,
        status: response.status,
      };
    } catch (error) {
      return {
        error: {
          message: error.message,
          code: 'NETWORK_ERROR',
        },
        status: 500,
      };
    }
  }
}

// Backend Route Handler
async function handleRequest<T>(
  handler: () => Promise<T>
): Promise<ApiResponse<T>> {
  try {
    const data = await handler();
    return { data, status: 200 };
  } catch (error) {
    return {
      error: {
        message: error.message,
        code: 'SERVER_ERROR',
      },
      status: 500,
    };
  }
}
```