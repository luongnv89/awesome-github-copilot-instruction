# Graphical Application Development Instructions

## Project Context
- Cross-platform GUI development
- Canvas and WebGL rendering
- Graphics optimization
- Event handling
- Animation systems

## Code Style Guidelines
- Component organization
- Performance patterns
- Memory management
- Event delegation
- Animation patterns

## Architecture Patterns
- Scene graph structure
- State management
- Render pipeline
- Event system
- Asset management

## Testing Requirements
- Visual regression testing
- Performance testing
- Event testing
- Animation testing
- Cross-platform testing

## Documentation Standards
- API documentation
- Performance guidelines
- Animation specs
- Asset requirements
- Setup instructions

## Project-Specific Rules
### Graphics Patterns
```typescript
// Scene Graph Pattern
class SceneNode {
    private children: SceneNode[] = [];
    private transform: Transform = new Transform();
    
    constructor(
        private id: string,
        private renderer: Renderer
    ) {}
    
    addChild(child: SceneNode): void {
        this.children.push(child);
    }
    
    update(deltaTime: number): void {
        this.updateSelf(deltaTime);
        this.children.forEach(child => child.update(deltaTime));
    }
    
    render(context: RenderContext): void {
        context.save();
        context.transform(this.transform.matrix);
        
        this.renderSelf(context);
        this.children.forEach(child => child.render(context));
        
        context.restore();
    }
    
    protected updateSelf(deltaTime: number): void {}
    protected renderSelf(context: RenderContext): void {}
}

// Animation System
class AnimationSystem {
    private animations: Map<string, Animation> = new Map();
    private running: Set<string> = new Set();
    
    add(id: string, animation: Animation): void {
        this.animations.set(id, animation);
    }
    
    play(id: string, options?: AnimationOptions): void {
        const animation = this.animations.get(id);
        if (animation) {
            animation.start(options);
            this.running.add(id);
        }
    }
    
    update(deltaTime: number): void {
        this.running.forEach(id => {
            const animation = this.animations.get(id);
            if (animation?.update(deltaTime)) {
                this.running.delete(id);
            }
        });
    }
}

// Event System
class EventSystem {
    private handlers: Map<string, Set<EventHandler>> = new Map();
    
    on(event: string, handler: EventHandler): void {
        if (!this.handlers.has(event)) {
            this.handlers.set(event, new Set());
        }
        this.handlers.get(event)!.add(handler);
    }
    
    emit(event: string, data: any): void {
        const handlers = this.handlers.get(event);
        if (handlers) {
            handlers.forEach(handler => handler(data));
        }
    }
}

// Render Pipeline
class RenderPipeline {
    private stages: RenderStage[] = [];
    
    addStage(stage: RenderStage): void {
        this.stages.push(stage);
    }
    
    render(scene: Scene, camera: Camera): void {
        let input = this.prepareScene(scene, camera);
        
        for (const stage of this.stages) {
            input = stage.process(input);
        }
        
        this.presentOutput(input);
    }
    
    private prepareScene(scene: Scene, camera: Camera): RenderData {
        // Prepare initial render data
        return {
            drawCalls: [],
            lights: [],
            camera: camera.getData()
        };
    }
    
    private presentOutput(data: RenderData): void {
        // Present final rendered output
    }
}

// Asset Management
class AssetManager {
    private assets: Map<string, Asset> = new Map();
    private loading: Map<string, Promise<Asset>> = new Map();
    
    async load(id: string, url: string): Promise<Asset> {
        if (this.assets.has(id)) {
            return this.assets.get(id)!;
        }
        
        if (this.loading.has(id)) {
            return this.loading.get(id)!;
        }
        
        const loadPromise = this.loadAsset(url)
            .then(asset => {
                this.assets.set(id, asset);
                this.loading.delete(id);
                return asset;
            });
            
        this.loading.set(id, loadPromise);
        return loadPromise;
    }
    
    private async loadAsset(url: string): Promise<Asset> {
        // Asset loading implementation
    }
}

// Performance Optimization
class RenderOptimizer {
    private visibleNodes: Set<SceneNode> = new Set();
    private frustum: Frustum;
    
    updateVisibility(scene: Scene, camera: Camera): void {
        this.frustum = camera.getFrustum();
        this.visibleNodes.clear();
        
        this.traverseScene(scene.root);
    }
    
    private traverseScene(node: SceneNode): void {
        if (!this.isNodeVisible(node)) {
            return;
        }
        
        this.visibleNodes.add(node);
        node.children.forEach(child => this.traverseScene(child));
    }
    
    private isNodeVisible(node: SceneNode): boolean {
        const bounds = node.getBounds();
        return this.frustum.intersects(bounds);
    }
}

// Input Handling
class InputManager {
    private subscribers: Map<InputEvent, Set<InputHandler>> = new Map();
    
    subscribe(event: InputEvent, handler: InputHandler): void {
        if (!this.subscribers.has(event)) {
            this.subscribers.set(event, new Set());
        }
        this.subscribers.get(event)!.add(handler);
    }
    
    handleInput(event: InputEvent): void {
        const handlers = this.subscribers.get(event.type);
        if (handlers) {
            handlers.forEach(handler => handler(event));
        }
    }
}
```