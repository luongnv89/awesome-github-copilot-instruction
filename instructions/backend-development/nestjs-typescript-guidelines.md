# TypeScript NestJS Best Practices

## Project Context
- Enterprise NestJS applications
- TypeScript decorators
- Dependency injection
- Modular architecture

## Architecture Patterns
```typescript
// Module organization
/
├── src/
│   ├── modules/
│   │   ├── users/
│   │   └── auth/
│   ├── common/
│   ├── config/
│   └── main.ts

// Controller pattern
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUser(@Param('id') id: string): Promise<UserResponse> {
    return this.usersService.findOne(id);
  }
}
```

## Best Practices
### Custom Decorators
```typescript
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

// Usage
@Get('profile')
async getProfile(@User() user: UserEntity) {
  return this.usersService.getProfile(user.id);
}
```

### Exception Filters
```typescript
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: exception.message,
    });
  }
}
```

## Performance Guidelines
- Use proper caching
- Implement compression
- Database connection pooling
- Rate limiting
- Response streaming

## Testing Standards
- Unit testing services
- E2E testing endpoints
- Integration testing
- Test containers
- Mock providers

## Documentation Requirements
- OpenAPI/Swagger
- API versioning
- Method documentation
- Configuration docs
- Deployment guides

## Security Best Practices
- Authentication guards
- Role-based access
- Request validation
- Helmet integration
- CORS policies

## Middleware Patterns
```typescript
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Request ${req.method} ${req.path}`);
    next();
  }
}
```

## Error Handling
- Global exception filter
- Custom exceptions
- Validation pipes
- Error logging
- Response mapping