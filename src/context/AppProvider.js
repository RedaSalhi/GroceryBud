import React from 'react';
import { AuthProvider } from './AuthContext';
import { ThemeProvider } from './ThemeContext';
import { ListsProvider } from './ListsContext';

export const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ListsProvider>{children}</ListsProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}; 