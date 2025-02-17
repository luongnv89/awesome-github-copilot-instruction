# Deno Development Instructions

## Project Context
- Modern TypeScript runtime with Deno
- Secure by default execution
- Built-in tooling
- Web standard APIs

## Code Style Guidelines
- Use TypeScript strict mode
- Follow URL-based imports
- Implement proper permissions
- Use web standard APIs
- Follow proper error handling

## Architecture Patterns
- Use proper module structure
- Implement proper middleware
- Follow Oak framework patterns
- Use proper testing patterns
- Implement proper file I/O

## Testing Requirements
- Use Deno.test API
- Implement permission tests
- Test HTTP endpoints
- Validate file operations
- Test web standard APIs

## Documentation Standards
- Document permissions needed
- Include import map details
- Document API endpoints
- Maintain type documentation
- Include setup instructions

## Project-Specific Rules
### Security Patterns
- Use proper permissions
- Implement proper CORS
- Follow proper file access
- Use proper env handling
- Implement proper validation

## Common Patterns
```typescript
// Server Template
import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();

router.get("/api/items", async (ctx) => {
  try {
    const items = await getItems();
    ctx.response.body = items;
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { error: error.message };
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

// Middleware Template
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.status || 500;
    ctx.response.body = { error: err.message };
  }
});

// File Operations
const decoder = new TextDecoder("utf-8");
const encoder = new TextEncoder();

async function readJsonFile<T>(path: string): Promise<T> {
  const content = await Deno.readFile(path);
  return JSON.parse(decoder.decode(content));
}

async function writeJsonFile(path: string, data: unknown): Promise<void> {
  const content = encoder.encode(JSON.stringify(data, null, 2));
  await Deno.writeFile(path, content);
}

// Testing Template
Deno.test({
  name: "API endpoint test",
  async fn() {
    const res = await fetch("http://localhost:8000/api/items");
    const data = await res.json();
    assertEquals(res.status, 200);
    assert(Array.isArray(data));
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
```