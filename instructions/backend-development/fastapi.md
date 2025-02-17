# FastAPI Development Guidelines

## Project Context
- Python-based API development with FastAPI
- Focus on scalable, performant API design
- Asynchronous-first approach
- Using Pydantic v2 and SQLAlchemy 2.0

## Code Style Guidelines
- Use functional, declarative programming style
- Follow Python naming conventions (lowercase with underscores)
- Type hints required for all function signatures
- Use descriptive variable names with auxiliary verbs
- Implement RORO (Receive an Object, Return an Object) pattern
- Early returns for error conditions
- Avoid unnecessary else statements

## Architecture Patterns
- Functional components over classes
- Clear route organization and modular structure
- File structure hierarchy:
  - Exported router
  - Sub-routes
  - Utilities
  - Static content
  - Types (models, schemas)
- Dependency injection for state management

## Testing Requirements
- Unit tests for routes and utilities
- Performance testing for response times
- Edge case coverage
- Error handling validation

## Documentation Standards
- Clear route documentation
- Response schema documentation
- Error handling documentation
- Performance considerations documentation

## Project-Specific Rules
### Error Handling
- Handle errors at function start
- Use guard clauses
- Custom error types/factories
- HTTPException for expected errors
- Middleware for unexpected errors

### Performance Optimization
- Async operations for I/O-bound tasks
- Caching strategies implementation
- Lazy loading for large datasets
- Minimize blocking operations
- Use FastAPI's built-in performance features

### FastAPI Specific
- Use Pydantic models for validation
- Implement proper middleware
- Use lifespan context managers
- Optimize route definitions
- Follow FastAPI's dependency injection patterns

## Common Patterns
```python
# Router Template
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/items", tags=["items"])

class ItemModel(BaseModel):
    name: str
    description: str | None = None

@router.get("/{item_id}")
async def get_item(item_id: int):
    try:
        # Logic here
        return {"item_id": item_id}
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

# Service Template
class ItemService:
    async def get_item(self, item_id: int):
        # Service logic
        pass