# Knative Istio Typesense GPU Development Instructions

## Project Context
- Knative serverless platform
- Istio service mesh
- Typesense search engine
- GPU resource management
- Cloud-native architecture

## Code Style Guidelines
- Kubernetes manifests
- Istio configuration
- Resource definitions
- GPU specifications
- Service configuration

## Architecture Patterns
- Serverless architecture
- Service mesh routing
- Search engine scaling
- GPU resource allocation
- High availability

## Testing Requirements
- Load testing
- Integration testing
- Performance testing
- Failover testing
- Resource monitoring

## Documentation Standards
- Architecture diagrams
- Resource specifications
- Configuration guides
- Monitoring guides
- Deployment guides

## Project-Specific Rules
### Infrastructure Patterns
```yaml
# Knative Service Pattern
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: search-service
  namespace: search
spec:
  template:
    metadata:
      annotations:
        autoscaling.knative.dev/target: "100"
        autoscaling.knative.dev/class: "kpa.autoscaling.knative.dev"
    spec:
      containers:
      - image: typesense/typesense:latest
        resources:
          limits:
            nvidia.com/gpu: 1
            memory: "4Gi"
            cpu: "2"
          requests:
            memory: "2Gi"
            cpu: "1"
        env:
        - name: TYPESENSE_API_KEY
          valueFrom:
            secretKeyRef:
              name: typesense-secrets
              key: api-key
        ports:
        - containerPort: 8108

# Istio Virtual Service Pattern
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: search-routing
spec:
  hosts:
  - "search.example.com"
  gateways:
  - search-gateway
  http:
  - match:
    - uri:
        prefix: "/api/search"
    route:
    - destination:
        host: search-service.search.svc.cluster.local
        port:
          number: 8108
    retries:
      attempts: 3
      perTryTimeout: 2s
    timeout: 5s

# GPU Resource Configuration
apiVersion: node.k8s.io/v1
kind: RuntimeClass
metadata:
  name: nvidia
handler: nvidia
scheduling:
  nodeSelector:
    accelerator: nvidia-tesla-v100

# Horizontal Pod Autoscaling
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: search-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: search-deployment
  minReplicas: 1
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70

# Typesense Configuration
apiVersion: v1
kind: ConfigMap
metadata:
  name: typesense-config
data:
  typesense-server.ini: |
    api-key = ${TYPESENSE_API_KEY}
    data-dir = /data
    api-port = 8108
    enable-cors = true
    search-cutoff-ms = 1000
    log-slow-requests-time-ms = 500

# Monitoring Configuration
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: search-monitor
spec:
  selector:
    matchLabels:
      app: search-service
  endpoints:
  - port: metrics
    interval: 15s

# Resource Quota
apiVersion: v1
kind: ResourceQuota
metadata:
  name: gpu-quota
spec:
  hard:
    requests.nvidia.com/gpu: 4
    limits.nvidia.com/gpu: 4

# Network Policy
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: search-network-policy
spec:
  podSelector:
    matchLabels:
      app: search-service
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: frontend
    ports:
    - protocol: TCP
      port: 8108

# Persistent Volume Claim
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: search-data
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 100Gi
  storageClassName: ssd

# Service Mesh Configuration
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: search-auth
spec:
  selector:
    matchLabels:
      app: search-service
  rules:
  - from:
    - source:
        principals: ["cluster.local/ns/frontend/sa/frontend-service"]
    to:
    - operation:
        methods: ["GET", "POST"]
        paths: ["/api/search/*"]

# Deployment Health Checks
apiVersion: v1
kind: Pod
metadata:
  name: search-pod
spec:
  containers:
  - name: search
    image: typesense/typesense:latest
    livenessProbe:
      httpGet:
        path: /health
        port: 8108
      initialDelaySeconds: 30
      periodSeconds: 10
    readinessProbe:
      httpGet:
        path: /health
        port: 8108
      initialDelaySeconds: 5
      periodSeconds: 5

# Resource Monitoring
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: search-alerts
spec:
  groups:
  - name: search.rules
    rules:
    - alert: HighGPUUsage
      expr: nvidia_gpu_utilization > 90
      for: 5m
      labels:
        severity: warning
      annotations:
        description: "GPU usage is above 90% for 5 minutes"
```