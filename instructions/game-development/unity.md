# Unity Game Development Instructions

## Project Context
- Unity game development
- C# scripting
- Performance optimization
- Cross-platform deployment

## Code Style Guidelines
- Follow C# naming conventions
- Use proper component patterns
- Implement proper serialization
- Use proper event systems
- Follow proper memory management

## Architecture Patterns
- Use proper component design
- Implement proper state machines
- Follow proper scene management
- Use proper object pooling
- Implement proper dependency injection

## Testing Requirements
- Unit test game logic
- Test component behavior
- Validate physics interactions
- Implement play mode tests
- Test performance profiles

## Documentation Standards
- Document component parameters
- Include setup instructions
- Document scene hierarchy
- Maintain prefab documentation
- Include optimization notes

## Project-Specific Rules
### Game Architecture
- Use proper ScriptableObjects
- Implement proper event systems
- Follow proper input handling
- Use proper coroutine patterns
- Implement proper game state

## Common Patterns
```csharp
// Component Pattern
using UnityEngine;
using System.Collections;

public class PlayerController : MonoBehaviour
{
    [Header("Movement")]
    [SerializeField] private float moveSpeed = 5f;
    [SerializeField] private float jumpForce = 10f;
    
    [Header("Ground Check")]
    [SerializeField] private Transform groundCheck;
    [SerializeField] private LayerMask groundLayer;
    
    private Rigidbody2D rb;
    private bool isGrounded;
    
    private void Awake()
    {
        rb = GetComponent<Rigidbody2D>();
    }
    
    private void Update()
    {
        CheckGround();
        HandleInput();
    }
    
    private void CheckGround()
    {
        isGrounded = Physics2D.OverlapCircle(
            groundCheck.position,
            0.2f,
            groundLayer
        );
    }
    
    private void HandleInput()
    {
        float moveX = Input.GetAxisRaw("Horizontal");
        rb.velocity = new Vector2(
            moveX * moveSpeed,
            rb.velocity.y
        );
        
        if (Input.GetButtonDown("Jump") && isGrounded)
        {
            rb.AddForce(Vector2.up * jumpForce, ForceMode2D.Impulse);
        }
    }
}

// State Machine Pattern
public abstract class GameState
{
    protected GameStateMachine stateMachine;
    
    public virtual void Enter() {}
    public virtual void Update() {}
    public virtual void Exit() {}
}

public class GameStateMachine
{
    private GameState currentState;
    
    public void Initialize(GameState startingState)
    {
        currentState = startingState;
        currentState.Enter();
    }
    
    public void ChangeState(GameState newState)
    {
        currentState.Exit();
        currentState = newState;
        currentState.Enter();
    }
    
    public void Update()
    {
        currentState?.Update();
    }
}

// Object Pool Pattern
public class ObjectPool : MonoBehaviour
{
    [System.Serializable]
    public class Pool
    {
        public string tag;
        public GameObject prefab;
        public int size;
    }
    
    public List<Pool> pools;
    private Dictionary<string, Queue<GameObject>> poolDictionary;
    
    private void Start()
    {
        poolDictionary = new Dictionary<string, Queue<GameObject>>();
        
        foreach (Pool pool in pools)
        {
            Queue<GameObject> objectPool = new Queue<GameObject>();
            
            for (int i = 0; i < pool.size; i++)
            {
                GameObject obj = Instantiate(pool.prefab);
                obj.SetActive(false);
                objectPool.Enqueue(obj);
            }
            
            poolDictionary.Add(pool.tag, objectPool);
        }
    }
    
    public GameObject SpawnFromPool(string tag, Vector3 position, Quaternion rotation)
    {
        if (!poolDictionary.ContainsKey(tag))
        {
            Debug.LogWarning($"Pool with tag {tag} doesn't exist.");
            return null;
        }
        
        GameObject objectToSpawn = poolDictionary[tag].Dequeue();
        
        objectToSpawn.SetActive(true);
        objectToSpawn.transform.position = position;
        objectToSpawn.transform.rotation = rotation;
        
        poolDictionary[tag].Enqueue(objectToSpawn);
        
        return objectToSpawn;
    }
}

// ScriptableObject Event System
[CreateAssetMenu(fileName = "GameEvent", menuName = "Events/GameEvent")]
public class GameEvent : ScriptableObject
{
    private List<GameEventListener> listeners = new List<GameEventListener>();
    
    public void Raise()
    {
        for (int i = listeners.Count - 1; i >= 0; i--)
        {
            listeners[i].OnEventRaised();
        }
    }
    
    public void RegisterListener(GameEventListener listener)
    {
        listeners.Add(listener);
    }
    
    public void UnregisterListener(GameEventListener listener)
    {
        listeners.Remove(listener);
    }
}

public class GameEventListener : MonoBehaviour
{
    public GameEvent gameEvent;
    public UnityEvent response;
    
    private void OnEnable()
    {
        gameEvent.RegisterListener(this);
    }
    
    private void OnDisable()
    {
        gameEvent.UnregisterListener(this);
    }
    
    public void OnEventRaised()
    {
        response.Invoke();
    }
}
```