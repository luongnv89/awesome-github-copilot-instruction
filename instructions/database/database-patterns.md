# Database Development Instructions

## Project Context
- SQL and NoSQL databases
- Data modeling and schema design
- Query optimization
- Database migrations

## Code Style Guidelines
- Use consistent naming conventions
- Follow proper indexing patterns
- Implement proper constraints
- Use appropriate data types
- Follow normalization rules

## Architecture Patterns
- Implement proper sharding
- Use appropriate replication
- Follow ACID principles
- Implement proper caching
- Use proper transaction patterns

## Testing Requirements
- Test database migrations
- Implement integration tests
- Test performance scenarios
- Validate data integrity
- Test backup/restore procedures

## Documentation Standards
- Document schema design
- Include ER diagrams
- Document indexes
- Maintain migration history
- Document optimization strategies

## Project-Specific Rules
- Follow security best practices
- Implement proper backups
- Use proper connection pooling
- Follow monitoring practices
- Implement proper logging

## Common Patterns
```sql
-- Table Creation Template
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Index Template
CREATE INDEX idx_users_email ON users(email);

-- Migration Template
BEGIN;
    -- Add new column
    ALTER TABLE users ADD COLUMN status VARCHAR(50);
    
    -- Add constraint
    ALTER TABLE users 
    ADD CONSTRAINT valid_status 
    CHECK (status IN ('active', 'inactive', 'suspended'));
COMMIT;
```