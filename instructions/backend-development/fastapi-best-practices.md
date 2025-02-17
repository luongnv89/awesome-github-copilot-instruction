# Python FastAPI Best Practices

## Project Context
- Modern FastAPI application development
- Async/await patterns
- Type safety with Pydantic
- API documentation with OpenAPI

## Code Style Guidelines
- Use type hints consistently
- Follow Python PEP 8 standards
- Implement proper response models
- Use async functions appropriately

## Architecture Patterns
```python
# Project structure
/
├── app/
│   ├── api/
│   │   └── v1/
│   ├── core/
│   │   ├── config.py
│   │   └── security.py
│   ├── models/
│   ├── schemas/
│   └── services/
└── tests/

# Route organization with dependencies
from fastapi import APIRouter, Depends, HTTPException
from typing import Annotated

router = APIRouter(prefix="/api/v1")

@router.get("/items/{item_id}", response_model=ItemResponse)
async def get_item(
    item_id: int,
    current_user: Annotated[User, Depends(get_current_user)]
) -> ItemResponse:
    if item := await get_item_by_id(item_id):
        return item
    raise HTTPException(status_code=404, detail="Item not found")
```

## Testing Requirements
- Async test cases
- API integration tests
- Mock external services
- Performance testing
- Security testing

## Documentation Standards
- OpenAPI documentation
- Type hints everywhere
- Function docstrings
- API versioning docs
- Example requests/responses

## Best Practices
### Dependency Injection
```python
from fastapi import Depends
from typing import Annotated

async def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        await db.close()

DB = Annotated[AsyncSession, Depends(get_db)]

@router.post("/users/")
async def create_user(user: UserCreate, db: DB):
    return await user_service.create(db, user)
```

### Pydantic Models
```python
from pydantic import BaseModel, EmailStr, Field

class UserBase(BaseModel):
    email: EmailStr
    username: str = Field(..., min_length=3)
    
    class Config:
        from_attributes = True
```

## Performance Guidelines
- Use async where beneficial
- Implement proper caching
- Database connection pooling
- Background tasks handling
- Response streaming

## Security Best Practices
- JWT authentication
- Rate limiting
- Input validation
- CORS configuration
- Dependency scanning

## Error Handling
```python
from fastapi import HTTPException
from typing import Any

class AppException(HTTPException):
    def __init__(
        self,
        status_code: int,
        detail: Any = None,
        headers: dict | None = None,
    ) -> None:
        super().__init__(status_code=status_code, detail=detail)
        self.headers = headers