# Flutter Riverpod Development Instructions

## Project Context
- Flutter state management
- Riverpod dependency injection
- Reactive programming
- SOLID principles
- Clean architecture

## Code Style Guidelines
- Provider organization
- State immutability
- Dependency injection
- Error handling
- Code modularity

## Architecture Patterns
- Provider patterns
- Repository pattern
- Service layer
- State management
- Dependency injection

## Testing Requirements
- Provider testing
- Widget testing
- Integration testing
- State testing
- Mock providers

## Documentation Standards
- Provider documentation
- State flow documentation
- Architecture documentation
- API documentation
- Testing documentation

## Project-Specific Rules
### Riverpod Patterns
```dart
// Provider Pattern
@riverpod
class UserNotifier extends _$UserNotifier {
  @override
  FutureOr<User?> build() => null;

  Future<void> fetchUser(String id) async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() => ref.read(userRepository).getUser(id));
  }

  Future<void> updateUser(User user) async {
    state = const AsyncValue.loading();
    await ref.read(userRepository).updateUser(user);
    state = AsyncValue.data(user);
  }
}

// Repository Provider
@riverpod
UserRepository userRepository(UserRepositoryRef ref) {
  return UserRepositoryImpl(
    ref.watch(apiClientProvider),
    ref.watch(localStorageProvider),
  );
}

// API Client Provider
@riverpod
ApiClient apiClient(ApiClientRef ref) {
  return ApiClientImpl(ref.watch(dioProvider));
}

// Service Pattern
@riverpod
class AuthService extends _$AuthService {
  @override
  FutureOr<void> build() {}

  Future<void> login(String email, String password) async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() async {
      final result = await ref.read(authRepository).login(email, password);
      ref.read(userNotifierProvider.notifier).setUser(result.user);
      return result;
    });
  }
}

// Widget Pattern
class UserProfilePage extends ConsumerWidget {
  const UserProfilePage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final userState = ref.watch(userNotifierProvider);

    return Scaffold(
      body: userState.when(
        data: (user) => user != null 
          ? UserProfileView(user: user)
          : const LoginPrompt(),
        loading: () => const LoadingView(),
        error: (error, stack) => ErrorView(error: error),
      ),
    );
  }
}

// State Pattern
@freezed
class UserState with _$UserState {
  const factory UserState({
    required User? user,
    required bool isLoading,
    required Option<String> errorMessage,
  }) = _UserState;

  factory UserState.initial() => UserState(
    user: null,
    isLoading: false,
    errorMessage: none(),
  );
}

// Testing Pattern
void main() {
  group('UserNotifier Tests', () {
    late ProviderContainer container;
    late MockUserRepository mockRepository;

    setUp(() {
      mockRepository = MockUserRepository();
      container = ProviderContainer(
        overrides: [
          userRepositoryProvider.overrideWithValue(mockRepository),
        ],
      );
      addTearDown(container.dispose);
    });

    test('fetchUser success', () async {
      final user = User(id: '1', name: 'Test');
      when(mockRepository.getUser('1')).thenAnswer((_) async => user);

      final notifier = container.read(userNotifierProvider.notifier);
      await notifier.fetchUser('1');

      final state = container.read(userNotifierProvider);
      expect(state.value, user);
    });
  });
}

// Error Handling Pattern
@riverpod
class ErrorHandler extends _$ErrorHandler {
  @override
  void build() {}

  void handleError(Object error, StackTrace? stackTrace) {
    if (error is NetworkException) {
      ref.read(snackbarProvider.notifier).show(
        SnackbarData(
          message: 'Network error occurred',
          type: SnackbarType.error,
        ),
      );
    } else if (error is ValidationException) {
      ref.read(snackbarProvider.notifier).show(
        SnackbarData(
          message: error.message,
          type: SnackbarType.warning,
        ),
      );
    }
  }
}

// Async Value Widget Pattern
class AsyncValueWidget<T> extends StatelessWidget {
  final AsyncValue<T> value;
  final Widget Function(T data) onData;
  final Widget Function()? onLoading;
  final Widget Function(Object error, StackTrace? stackTrace)? onError;

  const AsyncValueWidget({
    required this.value,
    required this.onData,
    this.onLoading,
    this.onError,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return value.when(
      data: onData,
      loading: () => onLoading?.call() ?? 
        const Center(child: CircularProgressIndicator()),
      error: (error, stack) => onError?.call(error, stack) ?? 
        ErrorView(error: error),
    );
  }
}