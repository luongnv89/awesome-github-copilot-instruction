# RabbitMQ Messaging System Instructions

## Project Context
- Message broker implementation
- Distributed system architecture
- Asynchronous communication
- High availability setup

## Code Style Guidelines
- Follow proper queue naming
- Implement proper exchange types
- Use proper routing patterns
- Follow proper binding rules
- Implement proper message schemas

## Architecture Patterns
- Use proper exchange types
- Implement proper queue patterns
- Follow proper routing strategies
- Use proper message patterns
- Implement proper clustering

## Testing Requirements
- Test message publishing
- Validate message consumption
- Test queue bindings
- Implement integration tests
- Test failover scenarios

## Documentation Standards
- Document exchange topology
- Include queue specifications
- Document message formats
- Maintain cluster setup
- Include monitoring guides

## Project-Specific Rules
### Message Handling
- Use proper acknowledgments
- Implement proper retry logic
- Follow proper DLX patterns
- Use proper QoS settings
- Implement proper persistence

## Common Patterns
```typescript
// Publisher Template
import amqp from 'amqplib';

class MessagePublisher {
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  async initialize() {
    this.connection = await amqp.connect('amqp://localhost');
    this.channel = await this.connection.createChannel();
    
    await this.channel.assertExchange('orders', 'topic', {
      durable: true
    });
  }

  async publishMessage(routingKey: string, message: any) {
    await this.channel.publish(
      'orders',
      routingKey,
      Buffer.from(JSON.stringify(message)),
      {
        persistent: true,
        messageId: crypto.randomUUID(),
        timestamp: Date.now(),
        headers: {
          'content-type': 'application/json'
        }
      }
    );
  }

  async close() {
    await this.channel.close();
    await this.connection.close();
  }
}

// Consumer Template
class MessageConsumer {
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  async initialize() {
    this.connection = await amqp.connect('amqp://localhost');
    this.channel = await this.connection.createChannel();
    
    // Setup DLX
    await this.channel.assertExchange('orders.dlx', 'direct', {
      durable: true
    });
    
    const { queue } = await this.channel.assertQueue('orders.processing', {
      durable: true,
      deadLetterExchange: 'orders.dlx',
      deadLetterRoutingKey: 'orders.failed'
    });

    await this.channel.bindQueue(
      queue,
      'orders',
      'order.created.*'
    );

    // Set prefetch
    await this.channel.prefetch(1);
  }

  async consume(processor: (msg: amqp.ConsumeMessage) => Promise<void>) {
    await this.channel.consume('orders.processing', async (msg) => {
      if (!msg) return;

      try {
        await processor(msg);
        this.channel.ack(msg);
      } catch (error) {
        // Reject with requeue=false to send to DLX
        this.channel.reject(msg, false);
      }
    });
  }
}

// Usage Example
const publisher = new MessagePublisher();
await publisher.initialize();

await publisher.publishMessage('order.created.user1', {
  orderId: '123',
  userId: 'user1',
  items: [/* order items */]
});

const consumer = new MessageConsumer();
await consumer.initialize();

await consumer.consume(async (msg) => {
  const order = JSON.parse(msg.content.toString());
  // Process order
  await processOrder(order);
});
```