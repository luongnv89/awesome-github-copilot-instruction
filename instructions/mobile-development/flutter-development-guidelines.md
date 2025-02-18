# Flutter Development Guidelines

## Project Context
- Flutter mobile development
- Cross-platform applications
- State management
- UI/UX implementation
- Performance optimization

## Code Style Guidelines
- Use Dart coding conventions
- Follow widget composition patterns
- Implement proper state management
- Use proper parameter naming
- Follow immutable state patterns

## Architecture Patterns
- Use proper ViewModel integration
- Implement unidirectional data flow
- Follow proper navigation patterns
- Use proper dependency injection
- Implement proper repository pattern

## Testing Requirements
- Write unit tests for ViewModels
- Test widget functions
- Implement screenshot testing
- Test navigation flows
- Validate state management

## Documentation Standards
- Document widget parameters
- Include preview annotations
- Document state management
- Maintain architecture diagrams
- Document theming system

## Project-Specific Rules
### Flutter Best Practices
- Use proper recomposition scope
- Implement proper side effects
- Follow proper theming
- Use proper modifier chains
- Implement proper layout performance

## Common Patterns
```dart
// Widget Template
class CustomWidget extends StatelessWidget {
  final String text;
  final VoidCallback onClick;

  const CustomWidget({
    Key? key,
    required this.text,
    required this.onClick,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onClick,
      child: Container(
        padding: EdgeInsets.all(16.0),
        decoration: BoxDecoration(
          color: Colors.blue,
          borderRadius: BorderRadius.circular(8.0),
        ),
        child: Text(
          text,
          style: TextStyle(color: Colors.white),
        ),
      ),
    );
  }
}

// ViewModel Template
class CustomViewModel extends ChangeNotifier {
  final Repository repository;

  CustomViewModel(this.repository);

  Future<void> fetchData() async {
    try {
      final data = await repository.getData();
      // Update state
      notifyListeners();
    } catch (e) {
      // Handle error
    }
  }
}

// Screen Template
class CustomScreen extends StatelessWidget {
  final CustomViewModel viewModel;

  const CustomScreen({Key? key, required this.viewModel}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Custom Screen')),
      body: Center(
        child: CustomWidget(
          text: 'Click Me',
          onClick: () => viewModel.fetchData(),
        ),
      ),
    );
  }
}
```