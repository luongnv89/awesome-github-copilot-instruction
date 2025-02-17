# Convex Development Instructions

## Project Context
- Backend development with Convex
- Real-time data synchronization
- TypeScript integration
- Serverless architecture

## Code Style Guidelines
- Use TypeScript for type safety
- Follow Convex naming conventions
- Implement proper mutation patterns
- Use proper query optimization
- Follow proper schema definitions

## Architecture Patterns
- Use proper document structure
- Implement proper indexes
- Follow proper access patterns
- Use proper caching strategies
- Implement proper pagination

## Testing Requirements
- Test mutations and queries
- Validate schema migrations
- Test real-time subscriptions
- Implement integration tests
- Test access controls

## Documentation Standards
- Document schema design
- Include query patterns
- Document access patterns
- Maintain API documentation
- Document migration steps

## Project-Specific Rules
### Data Modeling
- Follow proper schema patterns
- Use appropriate field types
- Implement proper relations
- Follow proper indexing
- Use proper validation rules

## Common Patterns
```typescript
// Schema Definition
export const schema = defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    role: v.string(),
  })
    .index("by_email", ["email"])
    .searchIndex("search_name", {
      searchField: "name",
    }),
});

// Query Template
export const getUser = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    
    if (!user) throw new Error("User not found");
    return user;
  },
});

// Mutation Template
export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    role: v.string(),
  },
  handler: async (ctx, args) => {
    const { name, email, role } = args;
    
    // Check for existing user
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();
      
    if (existing) throw new Error("Email already exists");
    
    return await ctx.db.insert("users", {
      name,
      email,
      role,
    });
  },
});

// Action Template
export const sendWelcomeEmail = action({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.runQuery(getUser, { id: args.userId });
    
    // External API call
    await fetch("https://api.email.service", {
      method: "POST",
      body: JSON.stringify({
        to: user.email,
        template: "welcome",
      }),
    });
  },
});
```