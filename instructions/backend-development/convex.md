# Convex Backend Development Instructions

## Project Context
- Convex backend development
- Real-time data synchronization
- TypeScript-first development
- Serverless architecture
- Full-stack integration

## Code Style Guidelines
- Type-safe queries and mutations
- Schema definition patterns
- Index optimization
- Access control patterns
- Real-time subscription practices

## Architecture Patterns
- Document-based data modeling
- Real-time data synchronization
- Optimistic updates
- Server function patterns
- Access control implementation

## Testing Requirements
- Unit testing server functions
- Integration testing
- Schema validation tests
- Access control testing
- Real-time sync testing

## Documentation Standards
- Schema documentation
- API endpoint documentation
- Access patterns
- Query optimization
- Real-time patterns

## Project-Specific Rules
### Data Modeling
```typescript
// Schema Definition Pattern
import { defineSchema, defineTable } from 'convex/schema';
import { v } from 'convex/values';

export default defineSchema({
    tasks: defineTable({
        title: v.string(),
        completed: v.boolean(),
        userId: v.string(),
        priority: v.number(),
        dueDate: v.optional(v.number()),
        tags: v.array(v.string()),
    }).index('by_user', ['userId'])
     .index('by_completion', ['completed']),

    users: defineTable({
        name: v.string(),
        email: v.string(),
        role: v.union(v.literal('admin'), v.literal('user')),
    }).index('by_email', ['email']),
});

// Query Pattern
export const getTasks = query({
    args: {
        userId: v.string(),
        status: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const tasks = await ctx.db
            .query('tasks')
            .withIndex('by_user', q => 
                q.eq('userId', args.userId)
            )
            .filter(q =>
                args.status === undefined || 
                q.eq(q.field('completed'), args.status)
            )
            .collect();
            
        return tasks;
    },
});

// Mutation Pattern
export const createTask = mutation({
    args: {
        title: v.string(),
        priority: v.number(),
        tags: v.array(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error('Unauthorized');
        }

        const taskId = await ctx.db.insert('tasks', {
            title: args.title,
            priority: args.priority,
            tags: args.tags,
            completed: false,
            userId: identity.subject,
        });

        return taskId;
    },
});

// Real-time Subscription Pattern
export const useTasksList = () => {
    const tasks = useQuery(api.tasks.getTasks, {
        userId: useCurrentUser()?.id,
    });

    const { mutate } = useMutation(api.tasks.updateTask);

    const toggleTask = useCallback(async (taskId: Id<'tasks'>) => {
        const task = tasks?.find(t => t._id === taskId);
        if (task) {
            await mutate({
                id: taskId,
                completed: !task.completed,
            });
        }
    }, [tasks, mutate]);

    return {
        tasks,
        toggleTask,
    };
};

// Access Control Pattern
export const accessRules = {
    tasks: {
        read: (ctx, { userId }) => 
            ctx.viewer?.id === userId || ctx.viewer?.role === 'admin',
        modify: (ctx, { userId }) => 
            ctx.viewer?.id === userId || ctx.viewer?.role === 'admin',
    },
    users: {
        read: () => true,
        modify: (ctx) => ctx.viewer?.role === 'admin',
    },
};