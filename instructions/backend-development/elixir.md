# Elixir Development Instructions

## Project Context
- Functional programming paradigm
- Elixir/Erlang ecosystem
- OTP architecture patterns
- Concurrent system design
- Distributed applications

## Code Style Guidelines
- Functional programming patterns
- Pattern matching usage
- Pipeline operator style
- Documentation formatting
- Module organization

## Architecture Patterns
- GenServer implementations
- Supervisor trees
- Event handling
- Message passing
- State management

## Testing Requirements
- ExUnit testing
- Property-based testing
- Integration testing
- Concurrent testing
- Documentation testing

## Documentation Standards
- Module documentation
- Function documentation
- Type specifications
- Behavior contracts
- Architecture decisions

## Project-Specific Rules
### Elixir Patterns
```elixir
# GenServer Pattern
defmodule UserManager do
  use GenServer
  require Logger

  # Client API
  def start_link(opts \\ []) do
    GenServer.start_link(__MODULE__, :ok, opts)
  end

  def get_user(pid, user_id) do
    GenServer.call(pid, {:get_user, user_id})
  end

  def create_user(pid, user_params) do
    GenServer.call(pid, {:create_user, user_params})
  end

  # Server Callbacks
  @impl true
  def init(:ok) do
    {:ok, %{users: %{}}}
  end

  @impl true
  def handle_call({:get_user, user_id}, _from, state) do
    case Map.get(state.users, user_id) do
      nil -> {:reply, {:error, :not_found}, state}
      user -> {:reply, {:ok, user}, state}
    end
  end

  @impl true
  def handle_call({:create_user, user_params}, _from, state) do
    user_id = generate_id()
    new_user = Map.put(user_params, :id, user_id)
    new_state = put_in(state.users[user_id], new_user)
    {:reply, {:ok, new_user}, new_state}
  end

  # Private Functions
  defp generate_id, do: System.unique_integer([:positive])
end

# Supervisor Pattern
defmodule MyApp.Application do
  use Application

  def start(_type, _args) do
    children = [
      {UserManager, name: UserManager},
      {TaskSupervisor, name: MyApp.TaskSupervisor},
      MyApp.Repo
    ]

    opts = [strategy: :one_for_one, name: MyApp.Supervisor]
    Supervisor.start_link(children, opts)
  end
end

# Behaviour Pattern
defmodule DataStore do
  @callback save(term()) :: {:ok, term()} | {:error, term()}
  @callback get(term()) :: {:ok, term()} | {:error, term()}
  @callback delete(term()) :: :ok | {:error, term()}
end

defmodule RedisStore do
  @behaviour DataStore

  @impl DataStore
  def save(data) do
    # Implementation
  end

  @impl DataStore
  def get(key) do
    # Implementation
  end

  @impl DataStore
  def delete(key) do
    # Implementation
  end
end

# Ecto Schema Pattern
defmodule MyApp.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :email, :string
    field :name, :string
    field :status, :string, default: "active"
    
    timestamps()
  end

  def changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :name, :status])
    |> validate_required([:email, :name])
    |> validate_format(:email, ~r/@/)
    |> unique_constraint(:email)
  end
end

# Testing Pattern
defmodule MyApp.UserTest do
  use ExUnit.Case
  use PropCheck

  describe "user validation" do
    property "email must contain @" do
      forall email <- string() do
        changeset = User.changeset(%User{}, %{email: email, name: "Test"})
        if String.contains?(email, "@") do
          changeset.valid?
        else
          !changeset.valid?
        end
      end
    end

    test "creates user with valid attributes" do
      attrs = %{email: "test@example.com", name: "Test User"}
      assert {:ok, user} = MyApp.create_user(attrs)
      assert user.email == attrs.email
    end
  end
end

# Message Passing Pattern
defmodule WorkerPool do
  use GenServer

  def start_link(size) do
    GenServer.start_link(__MODULE__, size, name: __MODULE__)
  end

  def process_task(task) do
    GenServer.cast(__MODULE__, {:process, task})
  end

  @impl true
  def init(size) do
    workers = for _ <- 1..size do
      spawn_link(fn -> worker_loop() end)
    end
    {:ok, %{workers: workers, tasks: :queue.new()}}
  end

  defp worker_loop do
    receive do
      {:task, task} ->
        process_task(task)
        worker_loop()
    end
  end
end

# Error Handling Pattern
defmodule ErrorHandler do
  def handle_error(result) do
    case result do
      {:ok, value} ->
        {:ok, value}

      {:error, %{__exception__: true} = error} ->
        Logger.error(Exception.message(error))
        {:error, :internal_error}

      {:error, reason} ->
        Logger.warn("Operation failed: #{inspect(reason)}")
        {:error, reason}
    end
  end
end
```