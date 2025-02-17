# Testing Best Practices Instructions

## Project Context
- Cross-framework testing strategies
- Unit, integration, and E2E testing
- Test-driven development (TDD)
- Continuous Integration testing

## Code Style Guidelines
- Follow Arrange-Act-Assert pattern
- Use descriptive test names
- Implement proper test isolation
- Follow DRY principles in tests
- Maintain consistent test structure

## Architecture Patterns
- Implement proper test pyramids
- Use appropriate test doubles
- Follow proper fixture patterns
- Implement proper test suites
- Use proper test categories

## Testing Requirements
- Maintain minimum coverage thresholds
- Test edge cases thoroughly
- Implement proper mocking
- Test asynchronous code properly
- Validate error scenarios

## Documentation Standards
- Document test scenarios
- Include setup instructions
- Document test data sources
- Maintain coverage reports
- Document test conventions

## Project-Specific Rules
- Use appropriate testing frameworks
- Implement proper CI integration
- Follow proper cleanup patterns
- Use appropriate assertions
- Implement proper test tagging

## Common Patterns
```typescript
// Jest Unit Test Template
describe('Component/Function', () => {
  beforeEach(() => {
    // Setup
  });

  afterEach(() => {
    // Cleanup
  });

  it('should handle successful scenario', async () => {
    // Arrange
    const input = 'test';

    // Act
    const result = await functionUnderTest(input);

    // Assert
    expect(result).toBe(expected);
  });

  it('should handle error scenario', async () => {
    // Arrange
    const invalidInput = null;

    // Act & Assert
    await expect(
      functionUnderTest(invalidInput)
    ).rejects.toThrow();
  });
});

// E2E Test Template
describe('E2E Flow', () => {
  test('complete user journey', async () => {
    // Setup
    await setupTestEnvironment();

    // Execute flow
    await performUserAction();

    // Validate
    const result = await getResult();
    expect(result).toMatchSnapshot();

    // Cleanup
    await cleanupTestEnvironment();
  });
});
```