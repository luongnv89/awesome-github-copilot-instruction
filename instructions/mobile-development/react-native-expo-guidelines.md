# React Native with Expo Development Guidelines

## Project Context
- Modern React Native applications
- Expo managed workflow
- Cross-platform development
- TypeScript integration

## Architecture Patterns
```typescript
// Project structure
/
├── src/
│   ├── components/
│   ├── screens/
│   ├── navigation/
│   ├── hooks/
│   └── services/
├── assets/
└── app.config.ts

// Screen organization
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#fff' },
        headerTintColor: '#000',
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: 'Home' }}
      />
    </Stack>
  );
}
```

## Component Patterns
```typescript
// Reusable component with styles
import { StyleSheet } from 'react-native';

interface CardProps {
  title: string;
  children: React.ReactNode;
}

export function Card({ title, children }: CardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
```

## Platform-Specific Code
```typescript
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  shadow: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    android: {
      elevation: 5,
    },
  }),
});
```

## Performance Guidelines
- Use proper list rendering
- Implement proper image caching
- Memoize callbacks and components
- Optimize animations
- Handle memory leaks

## Testing Requirements
- Component testing
- E2E with Maestro
- Integration testing
- Performance testing
- Platform-specific testing

## Best Practices
- Use Expo modules
- Implement proper navigation
- Handle deep linking
- Manage assets properly
- Use proper typescript types

## Security Guidelines
- Secure storage usage
- API security
- Deep linking validation
- Authentication flow
- Sensitive data handling

## Documentation Standards
- Component documentation
- Screen flow documentation
- API integration docs
- Setup instructions
- Release process