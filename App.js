import React from 'react';
import { AppProvider } from './src/context/AppProvider';
import AppNavigator from './src/navigation/AppNavigator';
// Initialize Firebase before rendering any components
import { auth } from './src/services/firebase';

// Main App Component
export default function App() {
  return (
    <AppProvider>
      <AppNavigator />
    </AppProvider>
  );
} 