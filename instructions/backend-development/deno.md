# Deno Development Instructions

## Project Context
- Deno runtime environment
- TypeScript-first development
- Standard library usage
- Security-first approach
- Modern web APIs

## Code Style Guidelines
- TypeScript strict mode
- Web standard APIs
- Permission handling
- Import map usage
- Module patterns

## Architecture Patterns
- Oak middleware pattern
- Module organization
- Permission boundaries
- Testing structure
- Dependency management

## Testing Requirements
- Unit testing with Deno.test
- Integration testing
- Permission testing
- Web standard testing
- API testing

## Documentation Standards
- JSDoc documentation
- Permission documentation
- API documentation
- Module documentation
- Deployment guides

## Project-Specific Rules
### Deno Patterns
```typescript
// HTTP Server Pattern
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

const app = new Application();
const router = new Router();

// Middleware Pattern
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.status || 500;
    ctx.response.body = { error: err.message };
  }
});

app.use(oakCors());

// Router Pattern
router.get("/api/items", async (ctx) => {
  const items = await loadItems();
  ctx.response.body = items;
});

router.post("/api/items", async (ctx) => {
  const body = ctx.request.body();
  const item = await body.value;
  const savedItem = await saveItem(item);
  ctx.response.body = savedItem;
});

// Database Integration
import { DB } from "https://deno.land/x/sqlite/mod.ts";

class Database {
  private db: DB;

  constructor() {
    this.db = new DB("data.db");
    this.init();
  }

  private init() {
    this.db.execute(`
      CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  async getItems(): Promise<Item[]> {
    const rows = this.db.query("SELECT * FROM items");
    return rows.map(row => ({
      id: row[0],
      name: row[1],
      createdAt: row[2]
    }));
  }
}

// Testing Pattern
import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

Deno.test("API endpoint test", async () => {
  const response = await fetch("http://localhost:8000/api/items");
  const data = await response.json();
  assertEquals(response.status, 200);
  assertNotEquals(data.length, 0);
});

// WebSocket Pattern
app.use(async (ctx) => {
  if (!ctx.isUpgradable) {
    ctx.throw(501);
  }
  const ws = await ctx.upgrade();
  
  ws.onmessage = async (msg) => {
    const data = JSON.parse(msg.data);
    // Handle message
    ws.send(JSON.stringify({ status: "received" }));
  };
});

// File System Operations
async function readConfig(): Promise<Config> {
  const text = await Deno.readTextFile("./config.json");
  return JSON.parse(text);
}

async function writeLog(message: string): Promise<void> {
  await Deno.writeTextFile(
    "./log.txt",
    `${new Date().toISOString()} - ${message}\n`,
    { append: true }
  );
}

// Permission Handling
async function secureOperation() {
  const status = await Deno.permissions.request({ 
    name: "read",
    path: "./config.json"
  });
  
  if (status.state === "granted") {
    return await readConfig();
  }
  
  throw new Error("Permission denied");
}

// Module Pattern
export interface Service {
  execute(): Promise<void>;
}

export class ServiceImpl implements Service {
  constructor(private deps: Dependencies) {}

  async execute(): Promise<void> {
    // Implementation
  }
}

// Custom Error Handling
class AppError extends Error {
  constructor(
    message: string,
    public status: number = 500
  ) {
    super(message);
    this.name = "AppError";
  }
}

// Dependency Injection Pattern
interface Dependencies {
  database: Database;
  logger: Logger;
}

class Container {
  private static instance: Container;
  private deps: Map<string, any>;

  private constructor() {
    this.deps = new Map();
  }

  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  register<T>(key: string, value: T): void {
    this.deps.set(key, value);
  }

  resolve<T>(key: string): T {
    return this.deps.get(key);
  }
}