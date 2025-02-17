# WordPress Development Instructions

## Project Context
- Modern WordPress development
- Custom theme/plugin development
- Block editor (Gutenberg) integration
- Performance optimization

## Code Style Guidelines
- Follow WordPress coding standards
- Use proper prefix for functions
- Follow proper hook naming
- Implement proper sanitization
- Use proper escaping functions

## Architecture Patterns
- Follow MVC-like structure
- Use proper template hierarchy
- Implement proper plugin architecture
- Follow proper action/filter patterns
- Use proper block patterns

## Testing Requirements
- Unit test PHP functions
- Test block editor components
- Validate hook interactions
- Test security measures
- Implement integration tests

## Documentation Standards
- Follow PHPDoc standards
- Document action/filter hooks
- Include block documentation
- Maintain changelog
- Document setup requirements

## Project-Specific Rules
### Security Practices
- Validate input data
- Escape output
- Use nonces for forms
- Follow capability checks
- Implement proper authentication

### Block Development
- Follow block API standards
- Use proper attributes
- Implement proper transforms
- Follow accessibility guidelines
- Use proper block variations

## Common Patterns
```php
// Plugin Template
<?php
/**
 * Plugin Name: Custom Feature
 * Description: Implements custom functionality
 * Version: 1.0.0
 * Author: Your Name
 */

defined('ABSPATH') || exit;

class CustomFeature {
    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('init', [$this, 'init']);
    }

    public function init() {
        // Initialize plugin
    }
}

CustomFeature::get_instance();

// Block Template
register_block_type('namespace/block-name', [
    'attributes' => [
        'content' => [
            'type' => 'string',
            'default' => '',
        ],
    ],
    'render_callback' => function($attributes) {
        $content = esc_html($attributes['content']);
        return sprintf(
            '<div class="custom-block">%s</div>',
            $content
        );
    },
]);

// Ajax Handler Template
add_action('wp_ajax_custom_action', 'handle_custom_action');
function handle_custom_action() {
    check_ajax_referer('custom-nonce', 'nonce');
    
    if (!current_user_can('edit_posts')) {
        wp_send_json_error('Insufficient permissions');
    }
    
    $data = sanitize_text_field($_POST['data']);
    // Process data
    
    wp_send_json_success(['message' => 'Success']);
}
```