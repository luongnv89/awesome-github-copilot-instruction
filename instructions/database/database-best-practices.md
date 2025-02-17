# Database Development Best Practices

## Project Context
- SQL and NoSQL database design
- Data modeling patterns
- Performance optimization
- Data security and integrity

## Database Design Guidelines
### Schema Design
- Normalize to appropriate form (3NF/BCNF)
- Use proper indexing strategies
- Implement proper constraints
- Design for scalability

### Query Optimization
```sql
-- Good practices
-- Use specific column names
SELECT user_id, username, email 
FROM users 
WHERE status = 'active';

-- Use proper indexes
CREATE INDEX idx_users_status ON users(status);

-- Use JOIN instead of subqueries when possible
SELECT o.order_id, u.username
FROM orders o
JOIN users u ON o.user_id = u.id;
```

## NoSQL Patterns
### Document Design
```javascript
// MongoDB example
// Embedded documents for 1:1 or 1:few relationships
{
  "_id": ObjectId("..."),
  "username": "john_doe",
  "profile": {
    "firstName": "John",
    "lastName": "Doe",
    "preferences": {
      "theme": "dark",
      "notifications": true
    }
  }
}

// References for 1:many relationships
{
  "_id": ObjectId("..."),
  "username": "john_doe",
  "order_ids": [ObjectId("..."), ObjectId("...")]
}
```

## Security Requirements
- Implement proper authentication
- Use parameterized queries
- Encrypt sensitive data
- Regular security audits
- Access control implementation

## Performance Guidelines
- Use connection pooling
- Implement proper caching
- Monitor query performance
- Regular maintenance tasks
- Backup strategies

## Best Practices
- Version control for schema changes
- Use migrations
- Implement proper logging
- Error handling strategies
- Data validation

## Monitoring
- Performance metrics
- Query analysis
- Resource utilization
- Error tracking
- Backup verification