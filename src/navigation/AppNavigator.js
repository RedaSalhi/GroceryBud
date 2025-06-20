import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

// Import navigators
import TabNavigator from './TabNavigator';

// Import screens
import ErrorBoundary from '../components/common/ErrorBoundary';
import LoadingSpinner from '../components/common/LoadingSpinner';
import TutorialScreen from '../screens/onboarding/TutorialScreen';
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isLoading, onboardingCompleted, isAuthenticated } = useAuth();
  const theme = useTheme();

  // Build a theme object compatible with React Navigation (must include fonts)
  const navigationTheme = {
    dark: theme.isDark,
    colors: {
      primary: theme.primary,
      background: theme.background,
      card: theme.surface,
      text: theme.text,
      border: theme.border,
      notification: theme.error,
    },
    // React Navigation expects a `fonts` object with specific variants
    fonts: {
      regular: { fontFamily: theme.fonts?.regular || 'System', fontWeight: 'normal' },
      medium: { fontFamily: theme.fonts?.medium || 'System', fontWeight: 'normal' },
      light: { fontFamily: theme.fonts?.regular || 'System', fontWeight: 'normal' },
      thin: { fontFamily: theme.fonts?.regular || 'System', fontWeight: 'normal' },
    },
  };

  // Show loading spinner while checking onboarding status
  if (isLoading) {
    return <LoadingSpinner fullScreen text="Loading..." />;
  }

  return (
    <ErrorBoundary>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!onboardingCompleted && (
            <>
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen name="Tutorial" component={TutorialScreen} />
            </>
          )}
          {!isAuthenticated && (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
            </>
          )}
          <Stack.Screen name="Main" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorBoundary>
  );
};

export default AppNavigator;