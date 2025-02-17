# Elixir and Phoenix Development Instructions

## Project Context
- Functional programming with Elixir
- Phoenix web framework
- LiveView for real-time features
- Distributed systems architecture

## Code Style Guidelines
- Follow Elixir style guide
- Use proper module documentation
- Implement proper type specs
- Follow proper naming conventions
- Use pattern matching effectively

## Architecture Patterns
- Implement proper supervision trees
- Use proper GenServer patterns
- Follow proper context organization
- Implement proper channel usage
- Use proper LiveView patterns

## Testing Requirements
- Write ExUnit tests
- Test async operations
- Implement proper mocks
- Test LiveView interactions
- Validate error scenarios

## Documentation Standards
- Use proper module docs
- Include type specs
- Document public functions
- Maintain changelog
- Include setup instructions

## Project-Specific Rules
### Phoenix Patterns
- Use proper context boundaries
- Implement proper schemas
- Follow proper routing
- Use proper form handling
- Implement proper authentication

## Common Patterns
```elixir
# Context Module Template
defmodule MyApp.Accounts do
  @moduledoc """
  The Accounts context.
  """
  
  import Ecto.Query
  alias MyApp.Repo
  alias MyApp.Accounts.User
  
  @doc """
  Returns a user by id or nil if not found.
  """
  @spec get_user(integer()) :: User.t() | nil
  def get_user(id) do
    Repo.get(User, id)
  end
end

# LiveView Template
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
  
  defp list_users do
    Accounts.list_users()
  end
end
```