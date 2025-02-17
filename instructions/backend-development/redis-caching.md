# Redis Caching System Instructions

## Project Context
- Distributed caching system
- High-performance data storage
- Pub/Sub messaging
- Session management

## Code Style Guidelines
- Use proper key naming conventions
- Implement proper data structures
- Follow proper TTL patterns
- Use proper serialization
- Follow proper pipeline patterns

## Architecture Patterns
- Use proper cache strategies
- Implement proper sharding
- Follow proper replication
- Use proper persistence
- Implement proper clustering

## Testing Requirements
- Test cache operations
- Validate data persistence
- Test pub/sub messaging
- Implement failover tests
- Test clustering behavior

## Documentation Standards
- Document cache patterns
- Include data structures
- Document TTL policies
- Maintain cluster setup
- Include monitoring guides

## Project-Specific Rules
### Cache Patterns
- Use proper cache invalidation
- Implement proper cache-aside
- Follow proper write-through
- Use proper read-through
- Implement proper cache warming

## Common Patterns
```typescript
// Redis Client Setup
import { Redis, RedisOptions } from 'ioredis';

class CacheManager {
  private readonly client: Redis;
  private readonly defaultTTL: number;

  constructor(config: RedisOptions, defaultTTL = 3600) {
    this.client = new Redis(config);
    this.defaultTTL = defaultTTL;
  }

  // Cache-Aside Pattern
  async getOrSet<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl = this.defaultTTL
  ): Promise<T> {
    const cached = await this.client.get(key);
    
    if (cached) {
      return JSON.parse(cached);
    }

    const value = await fetcher();
    await this.client.setex(
      key,
      ttl,
      JSON.stringify(value)
    );

    return value;
  }

  // Atomic Operations
  async increment(key: string): Promise<number> {
    return this.client.incr(key);
  }

  // Hash Operations
  async hashSet(
    key: string,
    field: string,
    value: any,
    ttl = this.defaultTTL
  ): Promise<void> {
    const multi = this.client.multi();
    
    multi.hset(key, field, JSON.stringify(value));
    multi.expire(key, ttl);
    
    await multi.exec();
  }

  // Pub/Sub Pattern
  async publish(channel: string, message: any): Promise<number> {
    return this.client.publish(
      channel,
      JSON.stringify(message)
    );
  }

  onMessage(
    channel: string,
    handler: (message: any) => void
  ): void {
    const subscriber = this.client.duplicate();
    
    subscriber.subscribe(channel);
    subscriber.on('message', (_, message) => {
      handler(JSON.parse(message));
    });
  }

  // Rate Limiting Pattern
  async isRateLimited(
    key: string,
    limit: number,
    window: number
  ): Promise<boolean> {
    const multi = this.client.multi();
    const now = Date.now();
    
    multi.zremrangebyscore(key, '-inf', now - window);
    multi.zadd(key, now, `${now}-${crypto.randomUUID()}`);
    multi.zcard(key);
    multi.expire(key, Math.ceil(window / 1000));
    
    const [,, count] = await multi.exec();
    return (count as number) > limit;
  }

  // Cache Invalidation Pattern
  async invalidatePattern(pattern: string): Promise<void> {
    const keys = await this.client.keys(pattern);
    if (keys.length > 0) {
      await this.client.del(...keys);
    }
  }

  // Session Management
  async setSession(
    sessionId: string,
    data: any,
    ttl = this.defaultTTL
  ): Promise<void> {
    await this.client.setex(
      `session:${sessionId}`,
      ttl,
      JSON.stringify(data)
    );
  }

  async getSession(sessionId: string): Promise<any | null> {
    const data = await this.client.get(`session:${sessionId}`);
    return data ? JSON.parse(data) : null;
  }
}

// Usage Example
const cache = new CacheManager({
  host: 'localhost',
  port: 6379,
  retryStrategy: (times) => Math.min(times * 50, 2000),
});

// Cache-Aside Pattern Usage
const user = await cache.getOrSet(
  `user:${userId}`,
  () => db.findUser(userId),
  3600
);

// Rate Limiting Usage
const isLimited = await cache.isRateLimited(
  `ratelimit:${ip}`,
  100,
  60 * 1000 // 1 minute window
);

// Pub/Sub Usage
cache.onMessage('notifications', (message) => {
  console.log('Received:', message);
});

await cache.publish('notifications', {
  type: 'user_update',
  userId: 123
});
```