# Chrome Extension Development Instructions

## Project Context
- Modern Chrome Extension development
- TypeScript and JavaScript implementation
- Manifest V3 architecture
- Browser API integration
- Security-first approach

## Code Style Guidelines
- TypeScript strict mode
- CSP compliance
- Content script patterns
- Message passing conventions
- Service worker best practices

## Architecture Patterns
- Background service workers
- Content script isolation
- Message passing architecture
- State management patterns
- Security boundary handling

## Testing Requirements
- Unit testing service workers
- Content script testing
- E2E extension testing
- Security testing
- Cross-browser compatibility

## Documentation Standards
- API documentation
- Security considerations
- Permission explanations
- Installation guides
- Usage documentation

## Project-Specific Rules
### Extension Architecture
```typescript
// Manifest V3 Template
{
    "manifest_version": 3,
    "name": "Extension Name",
    "version": "1.0.0",
    "permissions": [
        "storage",
        "activeTab"
    ],
    "background": {
        "service_worker": "background.ts"
    },
    "content_scripts": [{
        "matches": ["<all_urls>"],
        "js": ["content.ts"]
    }]
}

// Background Service Worker Pattern
class BackgroundService {
    private state: ExtensionState;

    constructor() {
        this.initializeListeners();
        this.state = this.getInitialState();
    }

    private initializeListeners(): void {
        chrome.runtime.onMessage.addListener(
            (message, sender, sendResponse) => {
                this.handleMessage(message, sender, sendResponse);
                return true; // Keep message channel open for async response
            }
        );
    }

    private async handleMessage(
        message: Message,
        sender: chrome.runtime.MessageSender,
        sendResponse: (response: any) => void
    ): Promise<void> {
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
    }
}

// Content Script Pattern
class ContentScript {
    private observer: MutationObserver;

    constructor() {
        this.initialize();
    }

    private async initialize(): Promise<void> {
        this.injectStyles();
        this.setupObserver();
        await this.setupMessageHandling();
    }

    private setupObserver(): void {
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

    private async sendToBackground(
        message: Message
    ): Promise<Response> {
        return new Promise((resolve) => {
            chrome.runtime.sendMessage(message, resolve);
        });
    }
}

// Popup Component Pattern
class PopupUI {
    private state: UIState;

    constructor() {
        this.state = this.getInitialState();
        this.initializeUI();
    }

    private async initializeUI(): Promise<void> {
        const elements = this.getUIElements();
        this.attachEventListeners(elements);
        await this.loadInitialState();
    }

    private attachEventListeners(elements: UIElements): void {
        elements.saveButton?.addEventListener('click', 
            () => this.handleSave()
        );
    }

    private async handleSave(): Promise<void> {
        try {
            await chrome.storage.sync.set(this.state);
            this.updateUI({ saved: true });
        } catch (error) {
            this.handleError(error);
        }
    }
}
```