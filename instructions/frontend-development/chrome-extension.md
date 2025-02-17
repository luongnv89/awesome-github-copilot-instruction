# Chrome Extension Development Instructions

## Project Context
- Browser extension development
- Chrome APIs integration
- TypeScript/JavaScript implementation
- Cross-browser compatibility

## Code Style Guidelines
- Use TypeScript for type safety
- Follow manifest V3 standards
- Implement proper permissions
- Use modular code structure
- Follow CSP guidelines

## Architecture Patterns
- Proper background/content script separation
- Implement proper message passing
- Use proper storage patterns
- Follow proper security patterns
- Implement proper state management

## Testing Requirements
- Unit test extension logic
- Test Chrome API integration
- Validate permissions
- Test messaging system
- Implement E2E testing

## Documentation Standards
- Document API usage
- Include setup instructions
- Document permissions
- Maintain security guidelines
- Include troubleshooting guides

## Project-Specific Rules
### Extension Structure
- Use proper manifest structure
- Implement proper content scripts
- Follow service worker patterns
- Use proper storage APIs
- Implement proper event handling

## Common Patterns
```typescript
// Background Service Worker
chrome.runtime.onInstalled.addListener(() => {
  // Initialize extension
});

// Message Handling Template
chrome.runtime.onMessage.addListener(
  (message: any, sender, sendResponse) => {
    if (message.type === 'ACTION') {
      handleAction(message.payload)
        .then(response => sendResponse({ success: true, data: response }))
        .catch(error => sendResponse({ success: false, error: error.message }));
      return true; // Will respond asynchronously
    }
  }
);

// Content Script Template
const inject = () => {
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('inject.js');
  (document.head || document.documentElement).appendChild(script);
};

// Storage Utility
const StorageUtil = {
  async get<T>(key: string): Promise<T | undefined> {
    const result = await chrome.storage.local.get(key);
    return result[key];
  },
  
  async set<T>(key: string, value: T): Promise<void> {
    await chrome.storage.local.set({ [key]: value });
  }
};
```