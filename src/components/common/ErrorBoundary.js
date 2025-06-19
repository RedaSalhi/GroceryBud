import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

class ErrorBoundaryFallback extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback(this.state.error, () => {
        this.setState({ hasError: false, error: null });
      });
    }

    return this.props.children;
  }
}

const DefaultErrorUI = ({ error, resetError, theme }) => {
  return (
    <View style={[styles.container, { backgroundColor: theme?.background || '#fff' }]}>
      <Text style={[styles.title, { color: theme?.error || 'red' }]}>Something went wrong</Text>
      <Text style={[styles.message, { color: theme?.text || '#000' }]}>{error?.message || 'An unexpected error occurred'}</Text>
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: theme?.primary || 'blue' }]} 
        onPress={resetError}
      >
        <Text style={styles.buttonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
};

export const ErrorBoundary = ({ children, fallback, fallbackComponent }) => {
  let theme;
  try {
    // Use try-catch since useTheme may not be available during early initialization
    theme = useTheme();
  } catch (e) {
    theme = null;
  }
  
  const renderFallback = (error, resetError) => {
    if (fallback) {
      return fallback(error, resetError);
    }
    
    if (fallbackComponent) {
      return fallbackComponent({ error, resetError });
    }
    
    return <DefaultErrorUI error={error} resetError={resetError} theme={theme} />;
  };

  return (
    <ErrorBoundaryFallback fallback={renderFallback}>
      {children}
    </ErrorBoundaryFallback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});

// Also export as default for backward compatibility
export default ErrorBoundary; 