# Flutter Development with Riverpod Guidelines

## Project Context
- Flutter applications using Riverpod for state management
- Cross-platform mobile development
- Material Design 3 implementation
- Responsive and adaptive UI

## Code Style Guidelines
- Use named parameters for widget constructors
- Implement const constructors where possible
- Follow Flutter's style guide for naming
- Use proper widget extraction

## Architecture Patterns
```dart
// Provider definitions
@riverpod
class UserState extends _$UserState {
  @override
  FutureOr<User> build() async {
    return await _fetchUser();
  }
}

// Widget structure
class UserProfile extends ConsumerWidget {
  const UserProfile({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final userState = ref.watch(userStateProvider);
    
    return userState.when(
      data: (user) => UserDataView(user: user),
      loading: () => const CircularProgressIndicator(),
      error: (error, stack) => ErrorView(error: error),
    );
  }
}
```

## Testing Requirements
- Widget testing
- Integration testing
- Provider testing
- Golden tests for UI
- Performance testing

## Documentation Standards
- Document all providers
- Add widget documentation
- Include usage examples
- Document state management flow

## Best Practices
- Use proper provider scoping
- Implement error handling
- Follow material design guidelines
- Use proper asset management
- Implement proper routing
- Handle platform differences

## State Management Patterns
- Use ConsumerWidget for state-aware widgets
- Implement proper provider organization
- Use provider families when needed
- Handle loading and error states
- Implement proper state persistence

## Performance Guidelines
- Use const constructors
- Implement proper list optimization
- Use proper image caching
- Minimize rebuilds
- Profile regularly