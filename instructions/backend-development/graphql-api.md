# GraphQL API Development Instructions

## Project Context
- GraphQL API development
- Schema-first design
- Type system optimization
- Real-time subscriptions

## Code Style Guidelines
- Follow GraphQL naming conventions
- Use proper type definitions
- Implement proper resolvers
- Follow proper field naming
- Use proper input types

## Architecture Patterns
- Use proper schema stitching
- Implement proper data loaders
- Follow proper resolver chain
- Use proper subscription patterns
- Implement proper caching

## Testing Requirements
- Test query resolvers
- Validate mutations
- Test subscriptions
- Implement integration tests
- Test error scenarios

## Documentation Standards
- Document schema types
- Include query examples
- Document mutations
- Maintain API documentation
- Include performance notes

## Project-Specific Rules
### Schema Design
- Use proper scalar types
- Implement proper interfaces
- Follow proper unions
- Use proper enums
- Implement proper directives

## Common Patterns
```typescript
// Schema Definition
import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    content: String!
    author: User!
    post: Post!
  }

  input CreatePostInput {
    title: String!
    content: String!
  }

  type Query {
    user(id: ID!): User
    users: [User!]!
    post(id: ID!): Post
    posts: [Post!]!
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post!
    updatePost(id: ID!, input: CreatePostInput!): Post!
    deletePost(id: ID!): Boolean!
  }

  type Subscription {
    postCreated: Post!
    postUpdated(id: ID!): Post!
  }
`;

// Resolver Implementation
import DataLoader from 'dataloader';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

const userLoader = new DataLoader(async (userIds: string[]) => {
  const users = await UserModel.findMany({
    where: {
      id: { in: userIds }
    }
  });
  
  return userIds.map(id => 
    users.find(user => user.id === id)
  );
});

const resolvers = {
  Query: {
    user: async (_, { id }) => {
      return userLoader.load(id);
    },
    users: async () => {
      return UserModel.findMany();
    },
    post: async (_, { id }) => {
      return PostModel.findUnique({
        where: { id }
      });
    },
    posts: async () => {
      return PostModel.findMany();
    }
  },

  Mutation: {
    createPost: async (_, { input }, { userId }) => {
      const post = await PostModel.create({
        data: {
          ...input,
          authorId: userId
        }
      });

      pubsub.publish('POST_CREATED', {
        postCreated: post
      });

      return post;
    },

    updatePost: async (_, { id, input }) => {
      const post = await PostModel.update({
        where: { id },
        data: input
      });

      pubsub.publish('POST_UPDATED', {
        postUpdated: post
      });

      return post;
    }
  },

  Subscription: {
    postCreated: {
      subscribe: () => pubsub.asyncIterator(['POST_CREATED'])
    },
    postUpdated: {
      subscribe: (_, { id }) => {
        return pubsub.asyncIterator([`POST_UPDATED_${id}`]);
      }
    }
  },

  User: {
    posts: async (parent) => {
      return PostModel.findMany({
        where: { authorId: parent.id }
      });
    }
  },

  Post: {
    author: async (parent) => {
      return userLoader.load(parent.authorId);
    },
    comments: async (parent) => {
      return CommentModel.findMany({
        where: { postId: parent.id }
      });
    }
  }
};

// Apollo Server Setup
import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const server = new ApolloServer({
  schema,
  context: ({ req }) => ({
    userId: getUserFromToken(req.headers.authorization)
  }),
  formatError: (error) => {
    console.error(error);
    return new Error('Internal server error');
  }
});
```