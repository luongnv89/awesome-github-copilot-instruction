# Flutter App Development Expert Guidelines

## Project Context
- Modern Flutter applications
- Cross-platform development
- Material Design 3 and Cupertino
- Clean architecture principles

## Architecture Guidelines
```dart
// Clean Architecture layers
lib/
├── core/
│   ├── error/
│   ├── network/
│   └── utils/
├── data/
│   ├── datasources/
│   ├── models/
│   └── repositories/
├── domain/
│   ├── entities/
│   ├── repositories/
│   └── usecases/
└── presentation/
    ├── bloc/
    ├── pages/
    └── widgets/

// Use case implementation
class GetUserProfile implements UseCase<UserProfile, String> {
  final UserRepository repository;

  GetUserProfile(this.repository);

  @override
  Future<Either<Failure, UserProfile>> call(String userId) {
    return repository.getUserProfile(userId);
  }
}
```

## State Management
- Use BLoC/Cubit pattern
- Implement proper state immutability
- Handle loading and error states
- Proper state restoration
- Deep linking support

## UI Guidelines
- Implement responsive layouts
- Use proper widget composition
- Follow Material/Cupertino guidelines
- Handle different screen sizes
- Support dark/light themes

## Performance Guidelines
- Widget rebuilding optimization
- Image caching strategy
- Lazy loading implementation
- Memory management
- Animation performance

## Testing Strategy
- Widget testing
- BLoC/Cubit testing
- Integration testing
- Golden tests
- Performance testing

## Platform Integration
- Native features handling
- Platform-specific code
- Permissions handling
- Deep linking
- Push notifications

## Best Practices
- Dependency injection
- Error handling
- Logging strategy
- Analytics integration
- Localization setup

## Security Guidelines
- Secure storage usage
- API security
- Certificate pinning
- Sensitive data handling
- App signing