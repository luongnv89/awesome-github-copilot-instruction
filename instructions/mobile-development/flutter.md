# Flutter App Development Instructions

## Project Context
- Cross-platform app development
- Material Design implementation
- State management
- Performance optimization

## Code Style Guidelines
- Follow Flutter style guide
- Use proper widget organization
- Implement proper state handling
- Follow proper naming conventions
- Use proper file structure

## Architecture Patterns
- Clean Architecture principles
- BLoC pattern implementation
- Repository pattern usage
- Service locator pattern
- Proper dependency injection

## Testing Requirements
- Widget testing
- Integration testing
- Unit testing
- Golden testing
- Performance testing

## Documentation Standards
- Widget documentation
- State management flows
- API integration docs
- Build process docs
- Platform-specific notes

## Project-Specific Rules
### Widget Structure
- Use proper StatelessWidget
- Implement proper StatefulWidget
- Follow proper lifecycle
- Use proper keys
- Implement proper navigation

## Common Patterns
```dart
// BLoC Pattern
abstract class CounterEvent {}
class IncrementPressed extends CounterEvent {}
class DecrementPressed extends CounterEvent {}

class CounterBloc extends Bloc<CounterEvent, int> {
  CounterBloc() : super(0) {
    on<IncrementPressed>((event, emit) => emit(state + 1));
    on<DecrementPressed>((event, emit) => emit(state - 1));
  }
}

// Repository Pattern
abstract class UserRepository {
  Future<User> getUser(String id);
  Future<List<User>> getUsers();
  Future<void> saveUser(User user);
}

class UserRepositoryImpl implements UserRepository {
  final ApiClient _client;
  
  UserRepositoryImpl(this._client);
  
  @override
  Future<User> getUser(String id) async {
    final response = await _client.get('/users/$id');
    return User.fromJson(response);
  }
  
  // ...other implementations
}

// Widget Pattern
class CustomWidget extends StatelessWidget {
  final String title;
  final VoidCallback onPressed;
  
  const CustomWidget({
    super.key,
    required this.title,
    required this.onPressed,
  });
  
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: Column(
        children: [
          Text(
            title,
            style: Theme.of(context).textTheme.headlineMedium,
          ),
          const SizedBox(height: 16),
          ElevatedButton(
            onPressed: onPressed,
            child: const Text('Action'),
          ),
        ],
      ),
    );
  }
}

// Service Locator
final getIt = GetIt.instance;

void setupDependencies() {
  // Singletons
  getIt.registerSingleton<ApiClient>(ApiClient());
  
  // Factories
  getIt.registerFactory<UserRepository>(
    () => UserRepositoryImpl(getIt<ApiClient>()),
  );
  
  // Lazily initialized singletons
  getIt.registerLazySingleton<AuthService>(
    () => AuthService(getIt<ApiClient>()),
  );
}