# Chrome Extension Development Instructions

## Project Context
- Chrome Extension APIs
- JavaScript/TypeScript
- Background Scripts
- Content Scripts
- Extension UI

## Code Style Guidelines
- Chrome API usage
- Message passing patterns
- Storage patterns
- Security practices
- Event handling

## Architecture Patterns
- Background service workers
- Content script injection
- Message passing
- State management
- API integration

## Testing Requirements
- Extension testing
- API testing
- Content script testing
- Security testing
- E2E testing

## Documentation Standards
- API documentation
- Permission docs
- Message formats
- Storage schema
- Security notes

## Project-Specific Rules
### Chrome Extension Patterns
```typescript
// Manifest V3 Pattern
{
  "manifest_version": 3,
  "name": "Extension Name",
  "version": "1.0.0",
  "permissions": [
    "storage",
    "tabs",
    "activeTab"
  ],
  "host_permissions": [
    "https://*.example.com/*"
  ],
  "background": {
    "service_worker": "background.js",
    "type": "module"
  },
  "content_scripts": [
    {
      "matches": ["https://*.example.com/*"],
      "js": ["content.js"],
      "css": ["content.css"]
    }
  ],
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  }
}

// Background Service Worker
class BackgroundService {
  constructor() {
    this.initializeListeners();
    this.state = this.getInitialState();
  }

  private async initializeListeners() {
    chrome.runtime.onInstalled.addListener(this.handleInstalled);
    chrome.runtime.onMessage.addListener(this.handleMessage);
    chrome.tabs.onUpdated.addListener(this.handleTabUpdate);
  }

  private handleInstalled = async (details: chrome.runtime.InstalledDetails) => {
    if (details.reason === 'install') {
      await this.initializeStorage();
    }
  };

  private handleMessage = async (
    message: Message,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void
  ) => {
    switch (message.type) {
      case 'getData':
        const data = await this.getData();
        sendResponse({ data });
        break;
      case 'updateState':
        await this.updateState(message.payload);
        sendResponse({ success: true });
        break;
    }
    return true; // Keep message channel open
  };

  private async initializeStorage() {
    await chrome.storage.local.set({
      settings: this.getDefaultSettings(),
      data: []
    });
  }
}

// Content Script Pattern
class ContentScript {
  private observer: MutationObserver;
  private port: chrome.runtime.Port;

  constructor() {
    this.initialize();
  }

  private async initialize() {
    this.injectStyles();
    this.setupObserver();
    this.connectPort();
    await this.setupMessageHandling();
  }

  private setupObserver() {
    this.observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        this.handleDOMChange(mutation);
      }
    });

    this.observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  private connectPort() {
    this.port = chrome.runtime.connect({ name: 'content-script' });
    this.port.onMessage.addListener(this.handlePortMessage);
  }

  private handleDOMChange(mutation: MutationRecord) {
    // Handle DOM changes
    const nodes = Array.from(mutation.addedNodes);
    nodes.forEach(this.processNode);
  }

  private processNode = (node: Node) => {
    if (node instanceof HTMLElement) {
      // Process element
    }
  };
}

// Popup UI Pattern
class PopupUI {
  private state: UIState;

  constructor() {
    this.initialize();
  }

  private async initialize() {
    this.state = await this.loadInitialState();
    this.setupEventListeners();
    this.render();
  }

  private async loadInitialState(): Promise<UIState> {
    return new Promise((resolve) => {
      chrome.storage.local.get(['settings', 'data'], (result) => {
        resolve({
          settings: result.settings || {},
          data: result.data || []
        });
      });
    });
  }

  private setupEventListeners() {
    document.getElementById('saveBtn')?.addEventListener('click', this.handleSave);
    document.getElementById('refreshBtn')?.addEventListener('click', this.handleRefresh);
  }

  private handleSave = async () => {
    try {
      await chrome.storage.local.set({ settings: this.state.settings });
      this.showMessage('Settings saved successfully');
    } catch (error) {
      this.showError('Failed to save settings');
    }
  };
}

// Storage Pattern
class StorageManager {
  static async get<T>(key: string): Promise<T | null> {
    return new Promise((resolve) => {
      chrome.storage.local.get([key], (result) => {
        resolve(result[key] || null);
      });
    });
  }

  static async set<T>(key: string, value: T): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [key]: value }, resolve);
    });
  }

  static async update<T>(key: string, updateFn: (value: T) => T): Promise<void> {
    const current = await this.get<T>(key);
    const updated = updateFn(current as T);
    await this.set(key, updated);
  }
}

// Message Passing Pattern
interface Message {
  type: string;
  payload?: any;
}

class MessageManager {
  static async sendToBackground(message: Message): Promise<any> {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(message, resolve);
    });
  }

  static async sendToTab(tabId: number, message: Message): Promise<any> {
    return new Promise((resolve) => {
      chrome.tabs.sendMessage(tabId, message, resolve);
    });
  }

  static onMessage(
    handler: (
      message: Message,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response?: any) => void
    ) => void | boolean
  ) {
    chrome.runtime.onMessage.addListener(handler);
  }
}

// Testing Pattern
describe('Extension Background Service', () => {
  let backgroundService: BackgroundService;
  
  beforeEach(() => {
    chrome.runtime.onInstalled.addListener.mockClear();
    chrome.runtime.onMessage.addListener.mockClear();
    backgroundService = new BackgroundService();
  });

  test('initializes storage on install', async () => {
    const details = { reason: 'install' } as chrome.runtime.InstalledDetails;
    await backgroundService.handleInstalled(details);

    expect(chrome.storage.local.set).toHaveBeenCalledWith({
      settings: expect.any(Object),
      data: []
    });
  });

  test('handles getData message', async () => {
    const message = { type: 'getData' };
    const sendResponse = jest.fn();

    await backgroundService.handleMessage(message, {}, sendResponse);

    expect(sendResponse).toHaveBeenCalledWith({
      data: expect.any(Array)
    });
  });
});