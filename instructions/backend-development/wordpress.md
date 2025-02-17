# WordPress Development Instructions

## Project Context
- WordPress theme/plugin development
- PHP 8.x development
- Custom post types and taxonomies
- Database optimization
- Security best practices

## Code Style Guidelines
- WordPress coding standards
- PHP 8.x features usage
- Proper hook usage
- Database query optimization
- Security sanitization patterns

## Architecture Patterns
- MVC-like structure
- Plugin architecture
- Theme development
- Custom post types
- REST API endpoints

## Testing Requirements
- PHP unit testing
- WordPress testing
- Integration testing
- Security testing
- Performance testing

## Documentation Standards
- PHP DocBlocks
- Hook documentation
- API documentation
- Setup instructions
- Deployment guides

## Project-Specific Rules
### WordPress Development
```php
// Plugin Structure Pattern
class CustomPlugin {
    private static $instance = null;
    
    public static function getInstance(): self {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function __construct() {
        $this->initHooks();
    }
    
    private function initHooks(): void {
        add_action('init', [$this, 'registerPostTypes']);
        add_action('rest_api_init', [$this, 'registerEndpoints']);
    }
    
    public function registerPostTypes(): void {
        register_post_type('custom_type', [
            'labels' => [
                'name' => __('Custom Types', 'textdomain'),
                'singular_name' => __('Custom Type', 'textdomain'),
            ],
            'public' => true,
            'show_in_rest' => true,
            'supports' => ['title', 'editor', 'thumbnail'],
            'has_archive' => true,
        ]);
    }
    
    public function registerEndpoints(): void {
        register_rest_route('custom/v1', '/items', [
            'methods' => 'GET',
            'callback' => [$this, 'getItems'],
            'permission_callback' => [$this, 'checkPermission'],
        ]);
    }
    
    public function checkPermission(): bool {
        return current_user_can('edit_posts');
    }
}

// Database Query Pattern
class CustomRepository {
    private $wpdb;
    
    public function __construct() {
        global $wpdb;
        $this->wpdb = $wpdb;
    }
    
    public function getItems(array $args = []): array {
        $defaults = [
            'limit' => 10,
            'offset' => 0,
            'status' => 'publish',
        ];
        
        $args = wp_parse_args($args, $defaults);
        
        $query = $this->wpdb->prepare(
            "SELECT * FROM {$this->wpdb->posts}
            WHERE post_type = %s
            AND post_status = %s
            LIMIT %d OFFSET %d",
            'custom_type',
            $args['status'],
            $args['limit'],
            $args['offset']
        );
        
        return $this->wpdb->get_results($query);
    }
}

// Theme Functions Pattern
function theme_setup(): void {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', [
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ]);
    
    register_nav_menus([
        'primary' => __('Primary Menu', 'textdomain'),
        'footer' => __('Footer Menu', 'textdomain'),
    ]);
}
add_action('after_setup_theme', 'theme_setup');

// Security Pattern
function secure_request(array $data): array {
    $clean = [];
    
    foreach ($data as $key => $value) {
        if (is_array($value)) {
            $clean[$key] = secure_request($value);
        } else {
            $clean[$key] = sanitize_text_field($value);
        }
    }
    
    return $clean;
}

// REST API Pattern
function register_custom_endpoint(): void {
    register_rest_route('custom/v1', '/data', [
        'methods' => ['GET', 'POST'],
        'callback' => function($request) {
            $params = secure_request($request->get_params());
            
            if ($request->get_method() === 'POST') {
                return handle_post_request($params);
            }
            
            return handle_get_request($params);
        },
        'permission_callback' => function() {
            return current_user_can('edit_posts');
        },
        'args' => [
            'id' => [
                'required' => true,
                'validate_callback' => function($param) {
                    return is_numeric($param);
                }
            ]
        ]
    ]);
}
add_action('rest_api_init', 'register_custom_endpoint');