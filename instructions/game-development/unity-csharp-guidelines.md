# Unity C# Game Development Guidelines

## Project Context
- Unity game development with C#
- Performance-oriented game design
- Cross-platform game development
- ECS (Entity Component System) patterns

## Code Style Guidelines
- Use PascalCase for public members
- Implement proper component separation
- Follow Unity's naming conventions
- Use SerializeField for inspector variables

## Architecture Patterns
```csharp
// Component-based architecture
public class PlayerController : MonoBehaviour
{
    [SerializeField] private float moveSpeed = 5f;
    [SerializeField] private float jumpForce = 10f;
    
    private Rigidbody2D rb;
    private bool isGrounded;
    
    private void Awake()
    {
        rb = GetComponent<Rigidbody2D>();
    }
    
    private void Update()
    {
        HandleInput();
    }
    
    private void FixedUpdate()
    {
        HandleMovement();
    }
}

// Object pooling pattern
public class ObjectPool : MonoBehaviour
{
    [SerializeField] private GameObject prefab;
    [SerializeField] private int poolSize = 20;
    
    private Queue<GameObject> objectPool;
    
    private void Start()
    {
        objectPool = new Queue<GameObject>();
        InitializePool();
    }
    
    private void InitializePool()
    {
        for (int i = 0; i < poolSize; i++)
        {
            CreateNewObject();
        }
    }
}
```

## Performance Guidelines
- Use object pooling for frequent instantiation
- Implement proper garbage collection
- Optimize Update cycles
- Use proper physics layers
- Profile regularly with Unity Profiler

## Best Practices
- Separate logic from MonoBehaviour
- Use ScriptableObjects for data
- Implement proper state management
- Use events for decoupling
- Follow Unity's input system guidelines

## Testing Requirements
- Unit testing with Unity Test Framework
- Play mode tests
- Performance testing
- Integration testing
- Scene validation

## Documentation Standards
- Document public APIs
- Include usage examples
- Document performance considerations
- Maintain proper prefab documentation

## Asset Management
- Follow proper folder structure
- Use asset bundles effectively
- Implement resource loading patterns
- Optimize asset imports
- Version control guidelines