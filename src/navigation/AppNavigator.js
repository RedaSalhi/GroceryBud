import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

// Import navigators
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';

// Import screens
import LoadingSpinner from '../components/common/LoadingSpinner';
import TutorialScreen from '../screens/onboarding/TutorialScreen';
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated, isLoading, onboardingCompleted } = useAuth();
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

  // Show loading spinner while checking authentication
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <NavigationContainer
      theme={navigationTheme}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          animationEnabled: true,
        }}
      >
        {!isAuthenticated ? (
          // Authentication flow
          <>
            {!onboardingCompleted && (
              <>
                <Stack.Screen
                  name="Welcome"
                  component={WelcomeScreen}
                  options={{
                    animationTypeForReplace: 'push',
                  }}
                />
                <Stack.Screen
                  name="Tutorial"
                  component={TutorialScreen}
                />
              </>
            )}
            <Stack.Screen
              name="Auth"
              component={AuthNavigator}
              options={{
                animationTypeForReplace: 'push',
              }}
            />
          </>
        ) : (
          // Main app flow
          <Stack.Screen
            name="Main"
            component={TabNavigator}
            options={{
              animationTypeForReplace: 'push',
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;