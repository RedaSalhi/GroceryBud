import React from 'react';
import { AuthProvider } from './AuthContext';
import { ThemeProvider } from './ThemeContext';
import { ListsProvider } from './ListsContext';
import { View, Text } from 'react-native';
import { ErrorBoundary } from '../components/common/ErrorBoundary';

export const AppProvider = ({ children }) => {
  return (
    <ErrorBoundary fallback={(error) => (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ color: 'red', marginBottom: 10, fontSize: 18 }}>
          Error initializing app
        </Text>
        <Text>{error?.message || 'Unknown error'}</Text>
      </View>
    )}>
      <AuthProvider>
        <ThemeProvider>
          <ListsProvider>{children}</ListsProvider>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}; 