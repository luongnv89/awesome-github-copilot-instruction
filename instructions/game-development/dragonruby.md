# DragonRuby Game Development Instructions

## Project Context
- DragonRuby Game Toolkit (DRGTK)
- 2D game development
- Ruby-based game logic
- Performance optimization
- Cross-platform development

## Code Style Guidelines
- Ruby coding conventions
- Game loop optimization
- Sprite management
- Input handling patterns
- State management

## Architecture Patterns
- Game state management
- Entity Component System
- Scene management
- Asset organization
- Input processing

## Testing Requirements
- Game state testing
- Performance testing
- Input simulation
- Scene testing
- Collision testing

## Documentation Standards
- Game state documentation
- Input mapping docs
- Asset organization
- Performance guidelines
- Scene flow diagrams

## Project-Specific Rules
### DragonRuby Patterns
```ruby
# Game State Pattern
class Game
  attr_gtk

  def tick
    defaults
    inputs
    calculate
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
    state.enemies ||= []
    state.score ||= 0
  end

  def inputs
    handle_player_movement
    handle_player_actions
  end

  def calculate
    update_player
    update_enemies
    check_collisions
  end

  def render
    render_background
    render_player
    render_enemies
    render_ui
  end

  private

  def handle_player_movement
    if inputs.keyboard.key_held.left
      state.player.x -= state.player.speed
    elsif inputs.keyboard.key_held.right
      state.player.x += state.player.speed
    end
  end

  def update_enemies
    state.enemies.each do |enemy|
      enemy.x += enemy.dx
      enemy.y += enemy.dy
      
      # Boundary checking
      if enemy.x < 0 || enemy.x > 1280
        enemy.dx *= -1
      end
    end
  end

  def check_collisions
    state.enemies.each do |enemy|
      if collision?(state.player, enemy)
        handle_collision(enemy)
      end
    end
  end
end

# Entity Component System
module Components
  class Transform
    attr_accessor :x, :y, :w, :h
    
    def initialize(x: 0, y: 0, w: 32, h: 32)
      @x = x
      @y = y
      @w = w
      @h = h
    end
  end

  class Physics
    attr_accessor :dx, :dy, :speed
    
    def initialize(speed: 5)
      @dx = 0
      @dy = 0
      @speed = speed
    end
  end
end

class Entity
  attr_reader :components
  
  def initialize
    @components = {}
  end

  def add_component(component)
    @components[component.class] = component
  end

  def get_component(component_class)
    @components[component_class]
  end
end

# Scene Management
class SceneManager
  def initialize
    @scenes = {}
    @current_scene = nil
  end

  def add_scene(name, scene)
    @scenes[name] = scene
  end

  def switch_to(scene_name)
    @current_scene = @scenes[scene_name]
    @current_scene.enter if @current_scene.respond_to?(:enter)
  end

  def tick
    @current_scene&.tick
  end
end

# Input Handler
class InputHandler
  def initialize(state)
    @state = state
  end

  def handle_input(inputs)
    handle_keyboard(inputs.keyboard)
    handle_mouse(inputs.mouse)
    handle_touch(inputs.touch)
  end

  private

  def handle_keyboard(keyboard)
    if keyboard.key_down.space
      @state.player.jump
    end
  end
end

# Collision System
module CollisionSystem
  def self.check_collision(rect1, rect2)
    !(rect1.x > rect2.x + rect2.w ||
      rect1.x + rect1.w < rect2.x ||
      rect1.y > rect2.y + rect2.h ||
      rect1.y + rect1.h < rect2.y)
  end
end

# Asset Management
class AssetManager
  def initialize
    @sprites = {}
    @sounds = {}
  end

  def load_sprite(name, path)
    @sprites[name] = path
  end

  def get_sprite(name)
    @sprites[name]
  end

  def play_sound(name)
    if @sounds[name]
      outputs.sounds << @sounds[name]
    end
  end
end

# Performance Optimization
module Performance
  def self.sprite_pool
    @sprite_pool ||= Array.new(100) { Sprite.new }
  end

  def self.get_sprite
    sprite_pool.find { |s| !s.active } || sprite_pool.first
  end

  class Sprite
    attr_accessor :active, :x, :y, :path
    
    def initialize
      @active = false
    end
  end
end