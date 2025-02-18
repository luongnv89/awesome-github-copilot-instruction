# Android Jetpack Compose Development Instructions

## Project Context
- Modern Android development with Jetpack Compose
- Material 3 Design System
- MVVM architecture
- Kotlin-first approach

## Code Style Guidelines
- Use Kotlin coding conventions
- Follow composable function naming patterns
- Implement proper state hoisting
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
- Test composable functions
- Implement screenshot testing
- Test navigation flows
- Validate state management

## Documentation Standards
- Document composable parameters
- Include preview annotations
- Document state management
- Maintain architecture diagrams
- Document theming system

## Project-Specific Rules
### Compose Best Practices
- Use proper recomposition scope
- Implement proper side effects
- Follow proper theming
- Use proper modifier chains
- Implement proper layout performance

## Common Patterns
```kotlin
// Composable Template
@Composable
fun CustomComponent(
    text: String,
    modifier: Modifier = Modifier,
    onClick: () -> Unit = {}
) {
    Surface(
        modifier = modifier,
        onClick = onClick
    ) {
        Text(
            text = text,
            style = MaterialTheme.typography.bodyLarge
        )
    }
}

// ViewModel Template
class CustomViewModel @Inject constructor(
    private val repository: Repository
) : ViewModel() {
    private val _uiState = MutableStateFlow(UiState())
    val uiState: StateFlow<UiState> = _uiState.asStateFlow()

    fun handleIntent(intent: UiIntent) {
        viewModelScope.launch {
            when (intent) {
                is UiIntent.Load -> loadData()
                is UiIntent.Refresh -> refreshData()
            }
        }
    }
}

// Screen Template
@Composable
fun Screen(
    viewModel: CustomViewModel = hiltViewModel()
) {
    val uiState by viewModel.uiState.collectAsState()
    
    LaunchedEffect(Unit) {
        viewModel.handleIntent(UiIntent.Load)
    }
    
    when {
        uiState.isLoading -> LoadingIndicator()
        uiState.error != null -> ErrorState(uiState.error)
        else -> Content(uiState.data)
    }
}