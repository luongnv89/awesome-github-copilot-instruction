# Flutter Riverpod Development Instructions

## Project Context
- Flutter development with Riverpod
- State management best practices
- Cross-platform development
- Performance optimization

## Code Style Guidelines
- Use proper provider naming
- Follow immutable state patterns
- Implement proper dependency overrides
- Use proper consumer widgets
- Follow proper class organization

## Architecture Patterns
- Follow repository pattern
- Use proper provider scoping
- Implement proper state persistence
- Follow proper navigation patterns
- Use proper dependency injection

## Testing Requirements
- Test providers and states
- Mock dependencies properly
- Test widget interactions
- Implement golden tests
- Validate state transitions

## Documentation Standards
- Document provider purposes
- Include state diagrams
- Document widget lifecycle
- Maintain provider dependencies
- Include usage examples

## Project-Specific Rules
### Riverpod Patterns
- Use proper provider families
- Implement proper state notifiers
- Follow proper ref invalidation
- Use proper provider modifiers
- Implement proper error handling

## Common Patterns
```dart
// Provider Template
@riverpod
class CounterNotifier extends _$CounterNotifier {
  @override
  int build() => 0;

  void increment() => state++;
  void decrement() => state--;
}

// Repository Pattern
@riverpod
class UserRepository extends _$UserRepository {
  @override
  Future<User> build(String userId) async {
    final response = await dio.get('/users/$userId');
    return User.fromJson(response.data);
  }

  Future<void> updateUser(User user) async {
    await dio.put('/users/${user.id}', data: user.toJson());
    ref.invalidateSelf();
  }
}

// Widget Template
class UserProfile extends ConsumerWidget {
  const UserProfile({super.key, required this.userId});

  final String userId;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final userAsync = ref.watch(userRepositoryProvider(userId));

    return userAsync.when(
      data: (user) => UserProfileContent(user: user),
      loading: () => const CircularProgressIndicator(),
      error: (error, stack) => ErrorWidget(error.toString()),
    );
  }
}

// State Pattern
@freezed
class AuthState with _$AuthState {
  const factory AuthState.unauthenticated() = _Unauthenticated;
  const factory AuthState.authenticated(User user) = _Authenticated;
  const factory AuthState.loading() = _Loading;
  const factory AuthState.error(String message) = _Error;
}
```