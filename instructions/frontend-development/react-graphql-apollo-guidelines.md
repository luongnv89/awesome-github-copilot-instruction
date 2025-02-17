# React GraphQL with Apollo Client Guidelines

## Project Context
- React applications with GraphQL
- Apollo Client integration
- Type-safe queries
- Cache management

## Architecture Patterns
```typescript
// Project structure
/
├── src/
│   ├── graphql/
│   │   ├── queries/
│   │   ├── mutations/
│   │   └── fragments/
│   ├── components/
│   ├── hooks/
│   └── types/

// Query definition
const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      posts {
        id
        title
      }
    }
  }
`;

// Custom hook pattern
function useUser(id: string) {
  return useQuery<GetUserQuery, GetUserVariables>(GET_USER, {
    variables: { id },
    fetchPolicy: 'cache-first'
  });
}
```

## Cache Management
```typescript
// Field policy
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          merge(existing = [], incoming: any[]) {
            return [...existing, ...incoming];
          }
        }
      }
    }
  }
});

// Cache update after mutation
const [createPost] = useMutation(CREATE_POST, {
  update(cache, { data: { createPost } }) {
    cache.modify({
      fields: {
        posts(existingPosts = []) {
          const newPostRef = cache.writeFragment({
            data: createPost,
            fragment: gql`
              fragment NewPost on Post {
                id
                title
              }
            `
          });
          return [...existingPosts, newPostRef];
        }
      }
    });
  }
});
```

## Best Practices
- Implement proper fragments
- Use proper error handling
- Optimize fetch policies
- Handle loading states
- Implement proper typing

## Performance Guidelines
- Use proper caching
- Implement batching
- Handle pagination
- Optimize queries
- Use proper prefetching

## Testing Requirements
- Mock Apollo Provider
- Test query components
- Test mutations
- Test error states
- Cache testing

## Error Handling
```typescript
function QueryComponent() {
  const { data, loading, error } = useQuery(QUERY);
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return <DataDisplay data={data} />;
}
```

## Type Generation
- Use GraphQL Code Generator
- Implement proper scalars
- Type-safe operations
- Handle nullable fields
- Custom type mapping