# Elixir Phoenix Development Guidelines

## Project Context
- Modern Phoenix applications
- LiveView integration
- Docker containerization
- Functional patterns

## Architecture Patterns
```elixir
# Project structure
/
├── lib/
│   ├── my_app/
│   │   ├── contexts/
│   │   ├── schemas/
│   │   └── services/
│   └── my_app_web/
│       ├── controllers/
│       ├── live/
│       └── components/

# Context module pattern
defmodule MyApp.Accounts do
  alias MyApp.Accounts.User
  alias MyApp.Repo

  def get_user!(id), do: Repo.get!(User, id)
  
  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end
end
```

## LiveView Patterns
```elixir
defmodule MyAppWeb.UserLive.Index do
  use MyAppWeb, :live_view
  
  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, users: list_users())}
  end
  
  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    user = Accounts.get_user!(id)
    {:ok, _} = Accounts.delete_user(user)
    
    {:noreply, assign(socket, users: list_users())}
  end
end
```

## Docker Setup
```dockerfile
# Dockerfile
FROM elixir:1.14-alpine AS builder

# Build stage
WORKDIR /app
COPY mix.exs mix.lock ./
RUN mix do deps.get, deps.compile

COPY . .
RUN mix do compile, phx.digest

# Runtime stage
FROM alpine:3.14
COPY --from=builder /app/_build/prod/rel/my_app ./
CMD ["./bin/my_app", "start"]
```

## Testing Guidelines
- Unit testing contexts
- Integration testing
- LiveView testing
- Property-based testing
- Performance testing

## Best Practices
- Use proper contexts
- Implement proper schemas
- Handle concurrency
- Use supervision trees
- Proper error handling

## Performance Guidelines
- Database optimization
- LiveView efficiency
- Proper caching
- Connection pooling
- Asset optimization

## Security Requirements
- Proper authentication
- CSRF protection
- Rate limiting
- Secure websockets
- SQL injection prevention

## Documentation Standards
- Module documentation
- Function documentation
- Type specifications
- Setup instructions
- Deployment guides