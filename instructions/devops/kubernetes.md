# Kubernetes Development Instructions

## Project Context
- Container orchestration
- Microservices architecture
- Cloud-native applications
- Infrastructure as Code (IaC)

## Code Style Guidelines
- Use YAML for resource definitions
- Follow proper indentation
- Implement resource naming conventions
- Use labels and annotations effectively
- Follow proper versioning

## Architecture Patterns
- Implement proper pod design
- Use appropriate service types
- Follow deployment strategies
- Implement proper networking
- Use proper storage patterns

## Testing Requirements
- Test manifest validation
- Implement integration tests
- Use proper linting
- Test deployment strategies
- Validate resource constraints

## Documentation Standards
- Document resource purposes
- Include deployment guides
- Document configuration options
- Maintain troubleshooting guides
- Include architecture diagrams

## Project-Specific Rules
- Follow security best practices
- Implement proper monitoring
- Use resource limits
- Follow namespace conventions
- Implement proper backup strategies

## Common Patterns
```yaml
# Deployment Template
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-deployment
  labels:
    app: myapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: myapp:latest
        resources:
          limits:
            cpu: "1"
            memory: "512Mi"
          requests:
            cpu: "0.5"
            memory: "256Mi"

# Service Template
apiVersion: v1
kind: Service
metadata:
  name: app-service
spec:
  selector:
    app: myapp
  ports:
  - port: 80
    targetPort: 8080
  type: ClusterIP
```