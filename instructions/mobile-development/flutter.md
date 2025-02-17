# Flutter Development Instructions

## Project Context
- Flutter mobile development
- Cross-platform development
- State management
- UI/UX implementation
- Performance optimization

## Code Style Guidelines
- Flutter widget patterns
- State management patterns
- Clean architecture
- Performance best practices
- Widget composition

## Architecture Patterns
- BLoC pattern
- Repository pattern
- Service locator
- Clean architecture layers
- Widget hierarchy

## Testing Requirements
- Widget testing
- BLoC testing
- Integration testing
- Golden tests
- Performance testing

## Documentation Standards
- Widget documentation
- Architecture documentation
- State flow documentation
- API documentation
- Setup instructions

## Project-Specific Rules
### Flutter Patterns
```dart
// BLoC Pattern
abstract class CounterEvent {}

class IncrementEvent extends CounterEvent {}
class DecrementEvent extends CounterEvent {}

class CounterBloc extends Bloc<CounterEvent, int> {
  CounterBloc() : super(0) {
    on<IncrementEvent>((event, emit) => emit(state + 1));
    on<DecrementEvent>((event, emit) => emit(state - 1));
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
  final LocalStorage _storage;

  UserRepositoryImpl(this._client, this._storage);

  @override
  Future<User> getUser(String id) async {
    try {
      final user = await _client.getUser(id);
      await _storage.saveUser(user);
      return user;
    } catch (e) {
      final cached = await _storage.getUser(id);
      if (cached != null) return cached;
      throw UserNotFoundException();
    }
  }
}

// Widget Pattern
class ResponsiveBuilder extends StatelessWidget {
  final Widget Function(
    BuildContext context,
    BoxConstraints constraints,
    ScreenType screenType,
  ) builder;

  const ResponsiveBuilder({
    Key? key,
    required this.builder,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final screenType = getScreenType(constraints);
        return builder(context, constraints, screenType);
      },
    );
  }
}

// Service Locator Pattern
final getIt = GetIt.instance;

void setupDependencies() {
  // Singletons
  getIt.registerLazySingleton<ApiClient>(() => ApiClientImpl());
  getIt.registerLazySingleton<LocalStorage>(() => LocalStorageImpl());
  
  // Repositories
  getIt.registerLazySingleton<UserRepository>(
    () => UserRepositoryImpl(getIt(), getIt())
  );
  
  // BLoCs
  getIt.registerFactory(() => UserBloc(getIt()));
}

// Clean Architecture Widget
class UserPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => getIt<UserBloc>(),
      child: Scaffold(
        appBar: AppBar(title: Text("Users")),
        body: BlocBuilder<UserBloc, UserState>(
          builder: (context, state) {
            return state.when(
              initial: () => Container(),
              loading: () => Center(child: CircularProgressIndicator()),
              loaded: (users) => UserListView(users: users),
              error: (message) => ErrorView(message: message),
            );
          },
        ),
      ),
    );
  }
}

// Testing Pattern
void main() {
  group("UserBloc", () {
    late UserBloc bloc;
    late MockUserRepository repository;

    setUp(() {
      repository = MockUserRepository();
      bloc = UserBloc(repository);
    });

    tearDown(() {
      bloc.close();
    });

    blocTest<UserBloc, UserState>(
      "emits [loading, loaded] when successful",
      build: () => bloc,
      act: (bloc) => bloc.add(LoadUsers()),
      expect: () => [
        UserState.loading(),
        UserState.loaded([mockUser]),
      ],
    );
  });
}

// Performance Pattern
class OptimizedList extends StatelessWidget {
  final List<Item> items;

  const OptimizedList({Key? key, required this.items}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: items.length,
      itemBuilder: (context, index) {
        return RepaintBoundary(
          child: ItemWidget(
            key: ValueKey(items[index].id),
            item: items[index],
          ),
        );
      },
    );
  }
}