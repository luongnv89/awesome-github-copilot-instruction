# PyTorch and Scikit-learn Development Guidelines

## Project Context
- Machine learning model development using PyTorch and Scikit-learn
- Focus on efficient and maintainable ML code practices
- Integration with data processing pipelines

## Code Style Guidelines
- Use type hints for tensor shapes and data types
- Follow PEP 8 standards for Python code
- Document model architecture and hyperparameters
- Use descriptive variable names for tensors and models

## Architecture Patterns
- Implement model classes using `nn.Module`
- Separate data preprocessing from model logic
- Use PyTorch's DataLoader for efficient batch processing
- Implement proper train/validation/test splits

## Testing Requirements
- Unit tests for model components
- Validation of input/output tensor shapes
- Performance benchmarking
- Model evaluation metrics

## Documentation Standards
- Document model architecture decisions
- Include training parameters and environment setup
- Add docstrings for custom functions and classes
- Maintain experiment logs and results

## Best Practices
- Use GPU acceleration when available
- Implement proper error handling for data loading
- Use proper seed setting for reproducibility
- Implement early stopping and model checkpoints
- Follow memory-efficient practices for large datasets

## Common Patterns
```python
# Model definition
class MyModel(nn.Module):
    def __init__(self):
        super().__init__()
        # Layer definitions

    def forward(self, x):
        # Forward pass logic

# Data loading
def create_dataloader(dataset, batch_size):
    return DataLoader(dataset, batch_size=batch_size, shuffle=True)

# Training loop
def train_model(model, dataloader, criterion, optimizer):
    model.train()
    for batch in dataloader:
        optimizer.zero_grad()
        # Training logic

# Evaluation
def evaluate_model(model, dataloader):
    model.eval()
    with torch.no_grad():
        # Evaluation logic
```

## Security Requirements
- Secure data loading and preprocessing
- Model input validation
- Protected model weights and checkpoints
- Proper handling of sensitive training data