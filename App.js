import React from 'react';
import { AppProvider } from './src/context/AppProvider';
import AppNavigator from './src/navigation/AppNavigator';

// Main App Component
export default function App() {
  // Render app without Firebase initialization
  return (
    <AppProvider>
      <AppNavigator />
    </AppProvider>
  );
} 