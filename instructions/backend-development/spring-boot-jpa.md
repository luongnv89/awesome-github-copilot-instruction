# Java Spring Boot JPA Development Instructions

## Project Context
- Spring Boot application development
- JPA/Hibernate for data persistence
- RESTful API development
- Microservices architecture

## Code Style Guidelines
- Follow Java naming conventions
- Use proper package structure
- Implement proper exception handling
- Follow SOLID principles
- Use proper lombok annotations

## Architecture Patterns
- Follow layered architecture:
  - Controller
  - Service
  - Repository
  - Entity
- Use proper DTO patterns
- Implement proper validation
- Follow proper transaction management
- Use proper dependency injection

## Testing Requirements
- Unit test with JUnit 5
- Integration tests with TestContainers
- Test repository layers
- Validate service logic
- Test API endpoints

## Documentation Standards
- Use JavaDoc for public APIs
- Document REST endpoints
- Include OpenAPI/Swagger
- Maintain README
- Document configuration properties

## Project-Specific Rules
### JPA Best Practices
- Use proper entity relationships
- Implement proper lazy loading
- Follow proper indexing
- Use proper fetch strategies
- Implement proper caching

## Common Patterns
```java
// Entity Template
@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Email
    @Column(unique = true)
    private String email;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Order> orders = new ArrayList<>();
}

// Repository Template
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    
    @Query("SELECT u FROM User u WHERE u.lastLoginDate > :date")
    List<User> findActiveUsers(@Param("date") LocalDateTime date);
}

// Service Template
@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserDTO createUser(CreateUserRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException(request.getEmail());
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setName(request.getName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        return UserDTO.from(userRepository.save(user));
    }
}

// Controller Template
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserDTO createUser(@Valid @RequestBody CreateUserRequest request) {
        return userService.createUser(request);
    }

    @GetMapping("/{id}")
    public UserDTO getUser(@PathVariable Long id) {
        return userService.findById(id)
            .orElseThrow(() -> new UserNotFoundException(id));
    }

    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleUserNotFound(UserNotFoundException ex) {
        return new ErrorResponse(ex.getMessage());
    }
}
```