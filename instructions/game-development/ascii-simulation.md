# ASCII Simulation Game Development Instructions

## Project Context
- Terminal-based game development
- ASCII/Unicode graphics
- Real-time simulation
- Cross-platform terminal compatibility

## Code Style Guidelines
- Use proper character encoding
- Follow terminal color standards
- Implement proper input buffering
- Use proper screen clearing
- Follow proper refresh rates

## Architecture Patterns
- Use proper game loop
- Implement proper entity system
- Follow proper rendering pipeline
- Use proper input handling
- Implement proper state management

## Testing Requirements
- Test rendering output
- Validate input handling
- Test game logic
- Implement performance tests
- Test terminal compatibility

## Documentation Standards
- Document control schemes
- Include terminal requirements
- Document game mechanics
- Maintain performance notes
- Include setup instructions

## Project-Specific Rules
### Terminal Handling
- Use proper escape sequences
- Implement proper buffering
- Follow proper refresh timing
- Use proper color codes
- Implement proper input queuing

## Common Patterns
```typescript
// Game Engine Template
class ASCIIEngine {
  private buffer: string[][] = [];
  private entities: Entity[] = [];
  private lastFrame: number = 0;
  
  constructor(private width: number, private height: number) {
    this.initBuffer();
  }
  
  private initBuffer() {
    this.buffer = Array(this.height)
      .fill(0)
      .map(() => Array(this.width).fill(' '));
  }
  
  draw(x: number, y: number, char: string) {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      this.buffer[y][x] = char;
    }
  }
  
  render() {
    // Clear screen
    console.clear();
    // Render frame
    console.log(
      this.buffer
        .map(row => row.join(''))
        .join('\n')
    );
  }
}

// Entity System
interface Entity {
  x: number;
  y: number;
  char: string;
  update: () => void;
}

// Game Loop
class Game {
  private engine: ASCIIEngine;
  private running: boolean = false;
  
  constructor() {
    this.engine = new ASCIIEngine(80, 24);
  }
  
  start() {
    this.running = true;
    this.loop();
  }
  
  private loop() {
    if (!this.running) return;
    
    this.update();
    this.render();
    
    // Maintain consistent frame rate
    setTimeout(() => this.loop(), 1000 / 30);
  }
  
  private update() {
    // Update game state
  }
  
  private render() {
    this.engine.render();
  }
}

// Input Handler
class InputHandler {
  private keyStates: Map<string, boolean> = new Map();
  
  constructor() {
    process.stdin.setRawMode(true);
    process.stdin.on('data', (data) => {
      const key = data.toString();
      this.keyStates.set(key, true);
      
      // Exit on q
      if (key === 'q') process.exit(0);
    });
  }
  
  isKeyPressed(key: string): boolean {
    return this.keyStates.get(key) || false;
  }
  
  clearKeys() {
    this.keyStates.clear();
  }
}
```