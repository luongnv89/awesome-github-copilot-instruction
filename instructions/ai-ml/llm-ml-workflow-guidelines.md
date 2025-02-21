# LLM and ML Workflow Guidelines

## Project Context
- LLM model integration
- ML pipeline development
- Model training and deployment
- Data processing workflows

## Development Setup
- Environment management with conda/venv
- GPU setup and configuration
- Dependency management
- Experiment tracking

## Code Organization
```python
# Project structure
/
├── data/
│   ├── raw/
│   ├── processed/
│   └── external/
├── models/
│   ├── training/
│   └── inference/
├── notebooks/
├── src/
│   ├── data/
│   ├── features/
│   ├── models/
│   └── utils/
└── configs/

# Model training example
class ModelTrainer:
    def __init__(self, config: TrainingConfig):
        self.config = config
        self.model = self._initialize_model()
        self.optimizer = self._setup_optimizer()

    def train(self, train_data: DataLoader):
        self.model.train()
        for batch in train_data:
            self.optimizer.zero_grad()
            loss = self._compute_loss(batch)
            loss.backward()
            self.optimizer.step()
```

## Best Practices
- Version control for models
- Data versioning
- Experiment tracking
- Model validation
- Testing protocols

## Data Management
- Data preprocessing
- Feature engineering
- Data validation
- Dataset versioning
- Data augmentation

## Model Development
- Model architecture design
- Hyperparameter tuning
- Cross-validation
- Model evaluation
- Error analysis

## Deployment Guidelines
- Model serialization
- API development
- Monitoring setup
- Performance optimization
- Resource management

## Development Standards
### Code Quality
- Use Black formatter for consistent code style
- Run mypy for static type checking
- Configure pre-commit hooks for automated checks
- Follow PEP 8 guidelines

### Documentation Requirements
- Docstring format: Google style
- Required documentation elements:
  - Function/class purpose
  - Parameters and return types
  - Usage examples
  - Exceptions raised
```python
def process_data(
    data: pd.DataFrame,
    features: List[str]
) -> np.ndarray:
    """Process input data for model training.

    Args:
        data: Input DataFrame containing raw features
        features: List of feature names to process

    Returns:
        Processed feature array

    Raises:
        ValueError: If features are missing in data
    """
    pass
```

### Testing Standards
- Unit tests required for all new code
- Test file structure mirrors source code
- Naming convention: `test_<module_name>.py`
- Use pytest as testing framework
```python
# Example test structure
def test_model_trainer():
    """Test ModelTrainer initialization and training."""
    config = TrainingConfig(...)
    trainer = ModelTrainer(config)

    # Test initialization
    assert trainer.model is not None
    assert trainer.optimizer is not None

    # Test training step
    batch = create_test_batch()
    loss = trainer._compute_loss(batch)
    assert isinstance(loss, torch.Tensor)
```

### External Dependencies
- Always check for existing solutions first:
  - PyPI packages
  - Established ML libraries
  - Open-source implementations
- Document external dependencies in requirements.txt
- Include version constraints
- Maintain dependency list in project README

## Documentation Requirements
- Model architecture docs
- Training procedures
- Evaluation metrics
- Deployment guides
- Maintenance procedures