# Chrome Extension Development Guidelines

## Project Context
- Modern Chrome extension development
- TypeScript and JavaScript
- Manifest V3 implementation
- Cross-browser compatibility

## Architecture Patterns
```typescript
// Project structure
/
├── src/
│   ├── background/
│   ├── content/
│   ├── popup/
│   └── options/
├── public/
│   └── manifest.json
└── types/

// Manifest V3 example
{
  "manifest_version": 3,
  "name": "Extension Name",
  "version": "1.0.0",
  "action": {
    "default_popup": "popup.html"
  },
  "permissions": [
    "storage",
    "activeTab"
  ],
  "background": {
    "service_worker": "background.js"
  }
}
```

## Best Practices
### Background Service Worker
```typescript
// Message handling
chrome.runtime.onMessage.addListener(
  (message, sender, sendResponse) => {
    switch (message.type) {
      case 'DATA_REQUEST':
        handleDataRequest(message.payload)
          .then(sendResponse);
        return true; // Will respond asynchronously
    }
  }
);
```

### Content Scripts
```typescript
// DOM interaction
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === 'childList') {
      handleDOMChanges(mutation);
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
```

## Security Guidelines
- Use content security policy
- Implement proper permissions
- Handle cross-origin requests
- Secure message passing
- Data sanitization

## Performance Best Practices
- Optimize service worker
- Minimize resource usage
- Handle memory leaks
- Use event delegation
- Implement proper caching

## Testing Requirements
- Unit testing components
- E2E testing
- Permission testing
- Cross-browser testing
- Performance testing

## Documentation Standards
- API documentation
- Installation guide
- Usage instructions
- Permission explanations
- Troubleshooting guide

## Development Workflow
- Build configuration
- Hot reloading setup
- Debug procedures
- Release process
- Version management