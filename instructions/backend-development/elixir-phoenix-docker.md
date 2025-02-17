# Elixir Phoenix Docker Development Instructions

## Project Context
- Phoenix web framework
- Docker containerization
- PostgreSQL integration
- Production deployment
- Development workflow

## Code Style Guidelines
- Docker best practices
- Multi-stage builds
- Environment configuration
- Asset compilation
- Release management

## Architecture Patterns
- Container orchestration
- Service dependencies
- Volume management
- Network configuration
- Hot code reloading

## Testing Requirements
- Container testing
- Integration testing
- End-to-end testing
- Performance testing
- Security scanning

## Documentation Standards
- Docker configuration
- Environment setup
- Deployment process
- Troubleshooting guides
- Security guidelines

## Project-Specific Rules
### Docker Configuration
```dockerfile
# Development Dockerfile
FROM elixir:1.14-alpine AS builder

# Install build dependencies
RUN apk add --no-cache build-base npm git python3

WORKDIR /app

# Install hex + rebar
RUN mix local.hex --force && \
    mix local.rebar --force

# Install mix dependencies
COPY mix.exs mix.lock ./
COPY config config
RUN mix deps.get --only prod

# Install npm dependencies
COPY assets/package.json assets/package-lock.json ./assets/
RUN cd assets && npm ci

# Compile assets
COPY assets assets
RUN cd assets && npm run deploy

# Compile app
COPY lib lib
COPY priv priv
RUN mix compile

# Build release
COPY rel rel
RUN mix release

# Production stage
FROM alpine:3.14 AS app
RUN apk add --no-cache openssl ncurses-libs

WORKDIR /app

# Copy release from builder
COPY --from=builder /app/_build/prod/rel/my_app ./

# Set environment variables
ENV HOME=/app
ENV PORT=4000
ENV PHX_HOST=localhost

# Run migrations and start app
CMD ["bin/my_app", "start"]

# Development docker-compose.yml
version: '3.8'

services:
  web:
    build:
      context: .
      target: builder
    ports:
      - "4000:4000"
    environment:
      - DATABASE_URL=ecto://postgres:postgres@db/my_app_dev
      - PHX_HOST=localhost
    volumes:
      - .:/app
      - deps:/app/deps
      - build:/app/_build
    depends_on:
      - db
    command: mix phx.server

  db:
    image: postgres:13-alpine
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=my_app_dev
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
  deps:
  build:

# Release Configuration
defmodule MyApp.Release do
  @app :my_app

  def migrate do
    load_app()

    for repo <- repos() do
      {:ok, _, _} = Ecto.Migrator.with_repo(repo, &Ecto.Migrator.run(&1, :up, all: true))
    end
  end

  def rollback(repo, version) do
    load_app()
    {:ok, _, _} = Ecto.Migrator.with_repo(repo, &Ecto.Migrator.run(&1, :down, to: version))
  end

  defp repos do
    Application.fetch_env!(@app, :ecto_repos)
  end

  defp load_app do
    Application.load(@app)
  end
end

# Environment Configuration
import Config

config :my_app, MyApp.Repo,
  url: System.get_env("DATABASE_URL"),
  pool_size: String.to_integer(System.get_env("POOL_SIZE") || "10")

config :my_app, MyAppWeb.Endpoint,
  http: [port: String.to_integer(System.get_env("PORT") || "4000")],
  url: [host: System.get_env("PHX_HOST"), port: 443, scheme: "https"],
  secret_key_base: System.get_env("SECRET_KEY_BASE")

# Health Check Configuration
defmodule MyAppWeb.HealthController do
  use MyAppWeb, :controller

  def index(conn, _params) do
    # Check database connection
    case Ecto.Adapters.SQL.query(MyApp.Repo, "SELECT 1") do
      {:ok, _} ->
        json(conn, %{status: "healthy"})
      {:error, _} ->
        conn
        |> put_status(:service_unavailable)
        |> json(%{status: "unhealthy"})
    end
  end
end
```