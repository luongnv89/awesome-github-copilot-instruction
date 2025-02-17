# Kubernetes and Istio Development Guidelines

## Project Context
- Kubernetes cluster management
- Service mesh with Istio
- Container orchestration
- Microservices deployment

## Infrastructure Guidelines
- Use Infrastructure as Code (IaC)
- Implement proper resource requests/limits
- Use namespaces for isolation
- Follow least privilege principle

## Deployment Patterns
```yaml
# Service deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: service-name
spec:
  replicas: 3
  selector:
    matchLabels:
      app: service-name
  template:
    metadata:
      labels:
        app: service-name
    spec:
      containers:
      - name: service-container
        image: service-image:tag
        resources:
          requests:
            memory: "64Mi"
            cpu: "250m"
          limits:
            memory: "128Mi"
            cpu: "500m"

# Istio VirtualService
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: service-route
spec:
  hosts:
  - service-name
  http:
  - route:
    - destination:
        host: service-name
        subset: v1
```

## Security Requirements
- Network policies
- Pod security policies
- Service mesh authentication
- Secret management
- RBAC implementation

## Monitoring Setup
- Prometheus configuration
- Grafana dashboards
- Distributed tracing
- Log aggregation
- Alert rules

## Best Practices
- Use rolling updates
- Implement health checks
- Configure resource quotas
- Use config maps and secrets
- Implement proper backup strategies

## Performance Guidelines
- Configure HPA
- Implement pod disruption budgets
- Optimize resource utilization
- Use node affinity rules
- Configure proper ingress