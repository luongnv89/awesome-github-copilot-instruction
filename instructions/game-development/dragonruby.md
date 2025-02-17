# DragonRuby Game Development Instructions

## Project Context
- Game development with DragonRuby GTK
- Performance-focused game loop
- Cross-platform game development
- 2D game development

## Code Style Guidelines
- Follow Ruby naming conventions
- Use proper tick method structure
- Implement proper sprite handling
- Follow proper input handling
- Use proper collision detection

## Architecture Patterns
- Use proper game state management
- Implement proper entity system
- Follow proper scene management
- Use proper asset loading
- Implement proper update/render separation

## Testing Requirements
- Test game logic
- Validate collision detection
- Test input handling
- Implement performance tests
- Test sprite animations

## Documentation Standards
- Document game states
- Include setup instructions
- Document input mappings
- Maintain asset requirements
- Document performance considerations

## Project-Specific Rules
### Game Loop Patterns
- Use proper delta time
- Implement proper frame limiting
- Follow proper input queuing
- Use proper state updates
- Implement proper rendering order

## Common Patterns
```ruby
# Game State Template
class Game
  attr_gtk
  
  def tick
    defaults
    inputs
    calc
    render
  end
  
  def defaults
    state.player ||= {
      x: 100,
      y: 100,
      w: 32,
      h: 32,
      speed: 5
    }
  end
  
  def inputs
    if inputs.keyboard.key_held.right
      state.player.x += state.player.speed
    elsif inputs.keyboard.key_held.left
      state.player.x -= state.player.speed
    end
  end
  
  def calc
    check_collisions
    update_animations
  end
  
  def render
    outputs.sprites << {
      x: state.player.x,
      y: state.player.y,
      w: state.player.w,
      h: state.player.h,
      path: 'sprites/player.png'
    }
  end
end

# Entity System Template
class Entity
  attr_accessor :x, :y, :w, :h, :sprite
  
  def initialize(opts = {})
    @x = opts[:x] || 0
    @y = opts[:y] || 0
    @w = opts[:w] || 32
    @h = opts[:h] || 32
    @sprite = opts[:sprite]
  end
  
  def rect
    [@x, @y, @w, @h]
  end
  
  def collides_with?(other)
    return false unless other
    state.geometry.intersect_rect?(rect, other.rect)
  end
end

# Scene Management
class SceneManager
  def initialize(game)
    @game = game
    @current_scene = nil
  end
  
  def switch_to(scene)
    @current_scene&.exit
    @current_scene = scene.new(@game)
    @current_scene.enter
  end
  
  def tick
    @current_scene&.tick
  end
end
```