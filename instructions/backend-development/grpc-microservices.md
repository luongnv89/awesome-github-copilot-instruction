# gRPC Microservices Development Instructions

## Project Context
- gRPC service development
- Protocol Buffers
- Service mesh integration
- High-performance RPC

## Code Style Guidelines
- Follow Protocol Buffer style guide
- Use proper service definitions
- Implement proper message types
- Follow proper package naming
- Use proper field numbering

## Architecture Patterns
- Use proper service boundaries
- Implement proper streaming
- Follow proper error handling
- Use proper interceptors
- Implement proper load balancing

## Testing Requirements
- Test service methods
- Validate message formats
- Test streaming operations
- Implement integration tests
- Test error scenarios

## Documentation Standards
- Document service definitions
- Include message schemas
- Document error codes
- Maintain API versioning
- Include performance notes

## Project-Specific Rules
### Service Design
- Use proper message versioning
- Implement proper deadlines
- Follow proper retry policies
- Use proper metadata
- Implement proper validation

## Common Patterns
```protobuf
// user_service.proto
syntax = "proto3";

package user.v1;

import "google/protobuf/timestamp.proto";

service UserService {
  rpc CreateUser (CreateUserRequest) returns (User);
  rpc GetUser (GetUserRequest) returns (User);
  rpc UpdateUser (UpdateUserRequest) returns (User);
  rpc DeleteUser (DeleteUserRequest) returns (DeleteUserResponse);
  rpc ListUsers (ListUsersRequest) returns (stream User);
  rpc WatchUserUpdates (WatchUserRequest) returns (stream UserUpdate);
}

message User {
  string id = 1;
  string name = 2;
  string email = 3;
  google.protobuf.Timestamp created_at = 4;
  google.protobuf.Timestamp updated_at = 5;
}

message CreateUserRequest {
  string name = 1;
  string email = 2;
}

message GetUserRequest {
  string id = 1;
}

message UpdateUserRequest {
  string id = 1;
  optional string name = 2;
  optional string email = 3;
}

message DeleteUserRequest {
  string id = 1;
}

message DeleteUserResponse {
  bool success = 1;
}

message ListUsersRequest {
  int32 page_size = 1;
  string page_token = 2;
}

message WatchUserRequest {
  string user_id = 1;
}

message UserUpdate {
  string id = 1;
  UpdateType type = 2;
  User user = 3;

  enum UpdateType {
    UNKNOWN = 0;
    CREATED = 1;
    UPDATED = 2;
    DELETED = 3;
  }
}
```

```typescript
// Server Implementation
import { Server, ServerCredentials } from '@grpc/grpc-js';
import { UserServiceService } from './generated/user_service_grpc_pb';
import { 
  User,
  CreateUserRequest,
  GetUserRequest,
  UpdateUserRequest,
  DeleteUserRequest,
  ListUsersRequest,
  WatchUserRequest,
  UserUpdate
} from './generated/user_service_pb';

class UserServiceImpl implements UserServiceService {
  async createUser(
    call: ServerUnaryCall<CreateUserRequest, User>,
    callback: sendUnaryData<User>
  ) {
    try {
      const user = await this.userRepository.create({
        name: call.request.getName(),
        email: call.request.getEmail()
      });

      const response = new User();
      response.setId(user.id);
      response.setName(user.name);
      response.setEmail(user.email);

      callback(null, response);
    } catch (error) {
      callback({
        code: Status.INTERNAL,
        message: error.message
      });
    }
  }

  async getUser(
    call: ServerUnaryCall<GetUserRequest, User>,
    callback: sendUnaryData<User>
  ) {
    try {
      const user = await this.userRepository.findById(
        call.request.getId()
      );

      if (!user) {
        callback({
          code: Status.NOT_FOUND,
          message: 'User not found'
        });
        return;
      }

      const response = new User();
      response.setId(user.id);
      response.setName(user.name);
      response.setEmail(user.email);

      callback(null, response);
    } catch (error) {
      callback({
        code: Status.INTERNAL,
        message: error.message
      });
    }
  }

  async listUsers(
    call: ServerWritableStream<ListUsersRequest, User>
  ) {
    try {
      const pageSize = call.request.getPageSize();
      const pageToken = call.request.getPageToken();

      const users = await this.userRepository.findMany({
        take: pageSize,
        cursor: pageToken ? { id: pageToken } : undefined
      });

      for (const user of users) {
        const response = new User();
        response.setId(user.id);
        response.setName(user.name);
        response.setEmail(user.email);
        
        call.write(response);
      }

      call.end();
    } catch (error) {
      call.emit('error', {
        code: Status.INTERNAL,
        message: error.message
      });
    }
  }

  watchUserUpdates(
    call: ServerWritableStream<WatchUserRequest, UserUpdate>
  ) {
    const userId = call.request.getUserId();
    
    const subscription = this.userEvents.subscribe(
      userId,
      (event) => {
        const update = new UserUpdate();
        update.setId(event.userId);
        update.setType(event.type);
        
        if (event.user) {
          const user = new User();
          user.setId(event.user.id);
          user.setName(event.user.name);
          user.setEmail(event.user.email);
          update.setUser(user);
        }

        call.write(update);
      }
    );

    call.on('cancelled', () => {
      subscription.unsubscribe();
    });
  }
}

// Server Setup
const server = new Server();
server.addService(
  UserServiceService,
  new UserServiceImpl()
);

server.bindAsync(
  '0.0.0.0:50051',
  ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) {
      console.error(error);
      return;
    }
    server.start();
    console.log(`Server running on port ${port}`);
  }
);
```