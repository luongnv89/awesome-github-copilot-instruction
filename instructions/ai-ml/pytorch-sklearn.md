# Machine Learning Development Instructions

## Project Context
- PyTorch and scikit-learn development
- Data preprocessing and analysis
- Model training and evaluation
- MLOps best practices

## Code Style Guidelines
- Use type hints for Python code
- Follow NumPy docstring format
- Implement proper error handling
- Use proper variable naming for tensors
- Follow PEP 8 conventions

## Architecture Patterns
- Implement proper data pipelines
- Use proper model architectures
- Follow experiment tracking patterns
- Implement proper model serving
- Use proper validation strategies

## Testing Requirements
- Test data preprocessing
- Validate model performance
- Test inference pipelines
- Implement integration tests
- Validate model outputs

## Documentation Standards
- Document model architecture
- Include experiment results
- Document data preprocessing
- Maintain model cards
- Include usage examples

## Project-Specific Rules
- Follow reproducibility practices
- Implement proper logging
- Use proper versioning
- Follow proper GPU utilization
- Implement proper checkpointing

## Common Patterns
```python
# Model Template
import torch
import torch.nn as nn
from typing import Tuple

class ModelArchitecture(nn.Module):
    def __init__(self, input_dim: int, hidden_dim: int):
        super().__init__()
        self.layer = nn.Linear(input_dim, hidden_dim)
        
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.layer(x)

# Training Loop Template
def train_model(
    model: nn.Module,
    dataloader: torch.utils.data.DataLoader,
    criterion: nn.Module,
    optimizer: torch.optim.Optimizer
) -> Tuple[float, float]:
    model.train()
    total_loss = 0.0
    
    for batch in dataloader:
        optimizer.zero_grad()
        outputs = model(batch)
        loss = criterion(outputs)
        loss.backward()
        optimizer.step()
        total_loss += loss.item()
    
    return total_loss / len(dataloader)
```