# ASCII Simulation Game Development Instructions

## Project Context
- Terminal-based game development
- ASCII/Unicode character graphics
- Real-time simulation mechanics
- Cross-platform compatibility
- Performance optimization focus

## Code Style Guidelines
- Clear terminal screen management
- Efficient character buffer handling
- Proper input handling patterns
- Frame rate control implementation
- Memory efficient data structures

## Architecture Patterns
- Game loop architecture
- Entity Component System (ECS)
- State management patterns
- Event handling system
- Scene/Screen management

## Testing Requirements
- Game state unit tests
- Input simulation testing
- Performance benchmarking
- Cross-platform validation
- Frame timing tests

## Documentation Standards
- ASCII art documentation
- Game mechanics explanation
- Performance considerations
- Terminal compatibility notes
- Input command reference

## Project-Specific Rules
### Terminal Graphics
- Use consistent character sets
- Implement proper buffering
- Handle terminal resizing
- Manage color codes properly
- Consider Unicode support

## Common Patterns
```typescript
// Game Loop Pattern
class GameLoop {
    private lastFrameTime: number = 0;
    private readonly targetFPS: number = 60;
    private readonly frameInterval: number = 1000 / this.targetFPS;

    async run() {
        while (true) {
            const currentTime = Date.now();
            const deltaTime = currentTime - this.lastFrameTime;

            if (deltaTime >= this.frameInterval) {
                this.update(deltaTime);
                this.render();
                this.lastFrameTime = currentTime;
            }

            await this.sleep(1);
        }
    }

    private update(deltaTime: number) {
        // Update game state
    }

    private render() {
        // Clear screen
        console.clear();
        // Render frame
        this.drawFrame();
    }

    private drawFrame() {
        // Draw ASCII graphics
    }

    private sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Entity Component System
interface Entity {
    id: number;
    position: Position;
    character: string;
    components: Map<string, Component>;
}

interface Component {
    update(entity: Entity, deltaTime: number): void;
}

class MovementComponent implements Component {
    update(entity: Entity, deltaTime: number) {
        // Handle movement logic
    }
}

// Screen Buffer Management
class ScreenBuffer {
    private buffer: string[][];
    
    constructor(width: number, height: number) {
        this.buffer = Array(height).fill(0)
            .map(() => Array(width).fill(' '));
    }

    draw(x: number, y: number, char: string) {
        if (this.isInBounds(x, y)) {
            this.buffer[y][x] = char;
        }
    }

    render() {
        return this.buffer
            .map(row => row.join(''))
            .join('\n');
    }

    private isInBounds(x: number, y: number): boolean {
        return x >= 0 && x < this.buffer[0].length &&
               y >= 0 && y < this.buffer.length;
    }
}
```