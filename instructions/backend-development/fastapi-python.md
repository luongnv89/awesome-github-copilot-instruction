# FastAPI Python Development Instructions

## Project Context
- FastAPI web framework
- Python 3.9+ development
- Async API development
- OpenAPI/Swagger integration
- Type-safe development

## Code Style Guidelines
- Type hints usage
- Pydantic models
- Async/await patterns
- Error handling patterns
- Dependency injection

## Architecture Patterns
- Repository pattern
- Service layer pattern
- Dependency injection
- Middleware implementation
- Authentication flows

## Testing Requirements
- Pytest integration
- Async test patterns
- Integration testing
- Performance testing
- Security testing

## Documentation Standards
- OpenAPI documentation
- Function docstrings
- API endpoint docs
- Schema documentation
- Deployment guides

## Project-Specific Rules
### FastAPI Patterns
```python
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession

# Data Models
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool
    
    class Config:
        from_attributes = True

# Repository Pattern
class UserRepository:
    def __init__(self, session: AsyncSession):
        self.session = session
    
    async def get_by_id(self, user_id: int) -> Optional[User]:
        query = select(UserModel).where(UserModel.id == user_id)
        result = await self.session.execute(query)
        return result.scalar_one_or_none()
    
    async def create(self, user: UserCreate) -> User:
        db_user = UserModel(
            email=user.email,
            full_name=user.full_name,
            hashed_password=hash_password(user.password)
        )
        self.session.add(db_user)
        await self.session.commit()
        await self.session.refresh(db_user)
        return db_user

# Service Layer
class UserService:
    def __init__(self, repo: UserRepository):
        self.repo = repo
    
    async def create_user(self, user: UserCreate) -> User:
        # Check if user exists
        existing_user = await self.repo.get_by_email(user.email)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        return await self.repo.create(user)
    
    async def authenticate_user(
        self, 
        email: str, 
        password: str
    ) -> Optional[User]:
        user = await self.repo.get_by_email(email)
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user

# Dependency Injection
async def get_session() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

async def get_user_repo(
    session: AsyncSession = Depends(get_session)
) -> UserRepository:
    return UserRepository(session)

async def get_user_service(
    repo: UserRepository = Depends(get_user_repo)
) -> UserService:
    return UserService(repo)

# Router Implementation
router = APIRouter()

@router.post("/users/", response_model=User)
async def create_user(
    user: UserCreate,
    service: UserService = Depends(get_user_service)
):
    return await service.create_user(user)

@router.get("/users/{user_id}", response_model=User)
async def read_user(
    user_id: int,
    service: UserService = Depends(get_user_service)
):
    user = await service.get_user(user_id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user

# Middleware Example
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response

# Background Tasks
class BackgroundTasks:
    def __init__(self, session: AsyncSession):
        self.session = session
    
    async def process_data(self, user_id: int):
        try:
            # Process data asynchronously
            await self.heavy_processing(user_id)
        except Exception as e:
            logger.error(f"Background task failed: {e}")
    
    @staticmethod
    async def heavy_processing(user_id: int):
        await asyncio.sleep(10)  # Simulate long process
        return {"status": "completed", "user_id": user_id}

# Error Handling
class APIException(HTTPException):
    def __init__(
        self,
        status_code: int,
        detail: str,
        headers: dict = None
    ):
        super().__init__(
            status_code=status_code,
            detail=detail,
            headers=headers
        )

@app.exception_handler(APIException)
async def api_exception_handler(
    request: Request,
    exc: APIException
):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail}
    )
```