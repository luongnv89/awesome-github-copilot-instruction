# Full Stack TypeScript Development Guidelines

## Project Context
- Next.js for frontend
- Node.js backend with Express/NestJS
- TypeScript throughout the stack
- Shared types and utilities

## Project Structure
```typescript
// Project organization
/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # Backend API
├── packages/
│   ├── shared/       # Shared types and utilities
│   └── config/       # Shared configuration
└── package.json      # Workspace configuration

// Shared types example
// packages/shared/types/index.ts
export interface User {
  id: string;
  email: string;
  profile: UserProfile;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  avatar?: string;
}
```

## Architecture Guidelines
### Frontend
- Use React Server Components
- Implement proper data fetching
- Type-safe API calls
- State management patterns

### Backend
- RESTful API design
- Middleware implementation
- Database integration
- Authentication/Authorization

## Type Safety
- Share types between frontend/backend
- Use strict TypeScript configuration
- Implement proper validation
- Use type guards appropriately

## Best Practices
- Monorepo management
- Code sharing strategies
- Environment configuration
- Error handling patterns
- Testing strategies

## Development Workflow
- Local development setup
- Database migrations
- API documentation
- Debug configuration
- Build optimization

## Deployment Guidelines
- CI/CD setup
- Environment variables
- Production builds
- Monitoring setup
- Logging strategy

## Security Considerations
- API security
- Authentication flow
- CORS configuration
- Rate limiting
- Data validation