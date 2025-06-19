import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { AppProvider } from './src/context/AppProvider';

// Main App Component
export default function App() {
  return (
    <AppProvider>
      <AppNavigator />
    </AppProvider>
  );
} 