# Kubernetes with Istio and GPU Instructions

## Project Context
- Kubernetes orchestration
- Istio service mesh
- GPU resource management
- High-performance computing

## Code Style Guidelines
- Follow YAML best practices
- Use proper resource naming
- Implement proper labels/annotations
- Follow proper sidecar patterns
- Use proper GPU resource requests

## Architecture Patterns
- Implement proper mesh patterns
- Use proper traffic management
- Follow proper GPU scheduling
- Use proper autoscaling
- Implement proper security policies

## Testing Requirements
- Test service mesh configuration
- Validate GPU allocation
- Test traffic routing
- Implement load testing
- Test failover scenarios

## Documentation Standards
- Document mesh configuration
- Include GPU requirements
- Document traffic patterns
- Maintain troubleshooting guides
- Include performance metrics

## Project-Specific Rules
### Service Mesh Patterns
- Use proper virtual services
- Implement proper gateways
- Follow proper retry policies
- Use proper circuit breaking
- Implement proper mTLS

## Common Patterns
```yaml
# Service Mesh Configuration
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: service-routes
spec:
  hosts:
  - "api.example.com"
  gateways:
  - api-gateway
  http:
  - match:
    - uri:
        prefix: "/v1"
    route:
    - destination:
        host: api-service
        subset: v1
        port:
          number: 80
    retries:
      attempts: 3
      perTryTimeout: 2s

# GPU Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: gpu-workload
spec:
  replicas: 1
  selector:
    matchLabels:
      app: gpu-app
  template:
    metadata:
      labels:
        app: gpu-app
    spec:
      containers:
      - name: gpu-container
        image: gpu-app:latest
        resources:
          limits:
            nvidia.com/gpu: 1
        volumeMounts:
        - name: nvidia-driver
          mountPath: /usr/local/nvidia
      volumes:
      - name: nvidia-driver
        hostPath:
          path: /usr/local/nvidia

# Istio Gateway
apiVersion: networking.istio.io/v1alpha3
kind: Gateway
metadata:
  name: api-gateway
spec:
  selector:
    istio: ingressgateway
  servers:
  - port:
      number: 443
      name: https
      protocol: HTTPS
    tls:
      mode: SIMPLE
      credentialName: tls-secret
    hosts:
    - "api.example.com"

# HPA with Custom Metrics
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: gpu-workload-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: gpu-workload
  minReplicas: 1
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: nvidia.com/gpu
      target:
        type: Utilization
        averageUtilization: 80
```