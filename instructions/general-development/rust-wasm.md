# Rust WebAssembly Development Instructions

## Project Context
- Rust to WebAssembly compilation
- Browser integration
- Performance optimization
- Memory management

## Code Style Guidelines
- Follow Rust idioms
- Use proper wasm-bindgen patterns
- Implement proper error handling
- Use proper type conversions
- Follow proper memory patterns

## Architecture Patterns
- Use proper module structure
- Implement proper FFI boundaries
- Follow proper JS interop
- Use proper state management
- Implement proper async patterns

## Testing Requirements
- Unit test Rust code
- Test WASM integration
- Validate JS bindings
- Implement browser tests
- Test memory usage

## Documentation Standards
- Document public API
- Include usage examples
- Document memory patterns
- Maintain build instructions
- Include performance notes

## Project-Specific Rules
### WASM Integration
- Use proper type bridges
- Implement proper memory handling
- Follow proper error conversion
- Use proper async/await
- Implement proper serialization

## Common Patterns
```rust
// Library Definition
use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};

#[wasm_bindgen]
pub struct Calculator {
    value: f64,
}

#[wasm_bindgen]
impl Calculator {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Calculator {
        Calculator { value: 0.0 }
    }

    pub fn add(&mut self, x: f64) -> f64 {
        self.value += x;
        self.value
    }

    pub fn get_value(&self) -> f64 {
        self.value
    }
}

// Complex Data Types
#[derive(Serialize, Deserialize)]
pub struct Point {
    x: f64,
    y: f64,
}

#[wasm_bindgen]
impl Point {
    #[wasm_bindgen(constructor)]
    pub fn new(x: f64, y: f64) -> Point {
        Point { x, y }
    }

    pub fn distance(&self, other: &Point) -> f64 {
        let dx = self.x - other.x;
        let dy = self.y - other.y;
        (dx * dx + dy * dy).sqrt()
    }
}

// Async Operations
#[wasm_bindgen]
pub async fn fetch_data() -> Result<JsValue, JsValue> {
    let window = web_sys::window().unwrap();
    let response = JsFuture::from(
        window
            .fetch_with_str("https://api.example.com/data")
    ).await?;
    
    let json = JsFuture::from(
        response
            .dyn_into::<web_sys::Response>()?
            .json()?
    ).await?;
    
    Ok(json)
}

// Memory Management
#[wasm_bindgen]
pub struct Buffer {
    data: Vec<u8>,
}

#[wasm_bindgen]
impl Buffer {
    #[wasm_bindgen(constructor)]
    pub fn new(size: usize) -> Buffer {
        Buffer {
            data: vec![0; size],
        }
    }

    pub fn get_ptr(&self) -> *const u8 {
        self.data.as_ptr()
    }

    pub fn len(&self) -> usize {
        self.data.len()
    }
}

// Error Handling
#[wasm_bindgen]
pub fn process_data(input: &[u8]) -> Result<Vec<u8>, JsValue> {
    input
        .try_into()
        .map_err(|e| JsValue::from_str(&e.to_string()))?
        .process()
        .map_err(|e| JsValue::from_str(&e.to_string()))
}
```

```typescript
// TypeScript Usage
import init, { Calculator, Point, fetch_data, Buffer } from './pkg/module';

async function main() {
    // Initialize WASM
    await init();

    // Use Calculator
    const calc = new Calculator();
    console.log(calc.add(5)); // 5
    console.log(calc.add(3)); // 8

    // Use Point
    const p1 = new Point(0, 0);
    const p2 = new Point(3, 4);
    console.log(p1.distance(p2)); // 5

    // Use Buffer
    const buffer = new Buffer(1024);
    const ptr = buffer.get_ptr();
    const len = buffer.len();

    // Use with TypedArray
    const view = new Uint8Array(
        memory.buffer,
        ptr,
        len
    );
}
```