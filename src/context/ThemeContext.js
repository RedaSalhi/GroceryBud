import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { Appearance } from 'react-native';
import { colors, darkTheme, lightTheme } from '../styles/colors';
import { typography } from '../styles/typography';
import { STORAGE_KEYS } from '../utils/constants';

// Theme modes
export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
};

// Initial state
const initialState = {
  mode: THEME_MODES.AUTO,
  theme: lightTheme,
  isDark: false,
  systemTheme: Appearance.getColorScheme() || 'light',
};

// Action types
const ActionTypes = {
  SET_THEME_MODE: 'SET_THEME_MODE',
  SET_SYSTEM_THEME: 'SET_SYSTEM_THEME',
  UPDATE_THEME: 'UPDATE_THEME',
};

// Reducer
const themeReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_THEME_MODE: {
      const { mode } = action.payload;
      const isDark = mode === THEME_MODES.DARK || 
                    (mode === THEME_MODES.AUTO && state.systemTheme === 'dark');
      
      const newTheme = isDark ? darkTheme : lightTheme;

      return {
        ...state,
        mode,
        isDark,
        theme: { 
          ...newTheme, 
          typography, 
          fonts: { regular: typography.body1 } 
        },
      };
    }

    case ActionTypes.SET_SYSTEM_THEME: {
      const { systemTheme } = action.payload;
      const isDark = state.mode === THEME_MODES.DARK || 
                    (state.mode === THEME_MODES.AUTO && systemTheme === 'dark');
      
      const newTheme = isDark ? darkTheme : lightTheme;

      return {
        ...state,
        systemTheme,
        isDark,
        theme: { 
          ...newTheme, 
          typography, 
          fonts: { regular: typography.body1 } 
        },
      };
    }

    case ActionTypes.UPDATE_THEME: {
      const updatedTheme = {
        ...state.theme,
        ...action.payload,
      };
      
      return {
        ...state,
        theme: updatedTheme,
      };
    }

    default:
      return state;
  }
};

// Create context
const ThemeContext = createContext();

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  // Initialize theme from storage and system
  useEffect(() => {
    const initializeTheme = async () => {
      try {
        // Load saved theme preference
        const savedMode = await AsyncStorage.getItem(STORAGE_KEYS.THEME_PREFERENCE);
        const mode = savedMode || THEME_MODES.AUTO;
        
        dispatch({ 
          type: ActionTypes.SET_THEME_MODE, 
          payload: { mode } 
        });
      } catch (error) {
        console.error('Failed to load theme preference:', error);
      }
    };

    initializeTheme();
  }, []);

  // Listen to system theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      dispatch({ 
        type: ActionTypes.SET_SYSTEM_THEME, 
        payload: { systemTheme: colorScheme || 'light' } 
      });
    });

    return () => subscription?.remove();
  }, []);

  // Action creators
  const actions = {
    // Set theme mode
    setThemeMode: async (mode) => {
      try {
        await AsyncStorage.setItem(STORAGE_KEYS.THEME_PREFERENCE, mode);
        dispatch({ type: ActionTypes.SET_THEME_MODE, payload: { mode } });
        return { success: true };
      } catch (error) {
        console.error('Failed to save theme preference:', error);
        return { success: false, error: error.message };
      }
    },

    // Toggle between light and dark
    toggleTheme: async () => {
      const newMode = state.isDark ? THEME_MODES.LIGHT : THEME_MODES.DARK;
      return await actions.setThemeMode(newMode);
    },

    // Get color by name and variant
    getColor: (colorName, variant = 500) => {
      if (colors[colorName] && colors[colorName][variant]) {
        return colors[colorName][variant];
      }
      
      // Fallback to theme colors
      if (state.theme.colors[colorName]) {
        return state.theme.colors[colorName];
      }
      
      console.warn(`Color "${colorName}" with variant "${variant}" not found`);
      return colors.neutral[500]; // Default fallback
    },

    // Get theme-aware color
    getThemedColor: (lightColor, darkColor) => {
      return state.isDark ? darkColor : lightColor;
    },

    // Update theme dynamically (for custom themes)
    updateTheme: (themeUpdates) => {
      const updatedTheme = {
        ...state.theme,
        ...themeUpdates,
      };
      
      dispatch({ type: ActionTypes.UPDATE_THEME, payload: updatedTheme });
    },
  };

  // Helper functions
  const helpers = {
    // Get current theme colors
    getColors: () => state.theme.colors,

    // Check if current theme is dark
    isDarkMode: () => state.isDark,

    // Check if auto mode is enabled
    isAutoMode: () => state.mode === THEME_MODES.AUTO,

    // Get system theme
    getSystemTheme: () => state.systemTheme,

    // Get current theme mode
    getThemeMode: () => state.mode,

    // Get theme-specific styles
    getThemedStyle: (lightStyle, darkStyle) => {
      return state.isDark ? darkStyle : lightStyle;
    },

    // Get status bar style based on theme
    getStatusBarStyle: () => {
      return state.isDark ? 'light-content' : 'dark-content';
    },

    // Get keyboard appearance
    getKeyboardAppearance: () => {
      return state.isDark ? 'dark' : 'light';
    },

    // Create theme-aware component styles
    createThemedStyles: (styleFunction) => {
      return styleFunction(state.theme, state.isDark);
    },

    // Get contrasting text color for background
    getContrastingTextColor: (backgroundColor) => {
      // Simple contrast calculation
      // In a real app, you might want a more sophisticated algorithm
      const isDarkBg = backgroundColor === state.theme.colors.background ||
                       backgroundColor.includes('#000') ||
                       backgroundColor.includes('rgb(0,') ||
                       backgroundColor.includes('rgba(0,');
      
      return isDarkBg ? state.theme.colors.text : state.theme.colors.surface;
    },

    // Get theme-specific icon color
    getIconColor: (variant = 'primary') => {
      switch (variant) {
        case 'primary':
          return state.theme.colors.primary;
        case 'secondary':
          return state.theme.colors.textSecondary;
        case 'disabled':
          return state.theme.colors.border;
        case 'error':
          return state.theme.colors.error;
        case 'success':
          return state.theme.colors.success;
        case 'warning':
          return state.theme.colors.warning;
        default:
          return state.theme.colors.text;
      }
    },

    // Get elevation/shadow style based on theme
    getElevationStyle: (level = 1) => {
      const shadowOpacity = state.isDark ? 0.3 : 0.1;
      const shadowColor = state.isDark ? '#FFFFFF' : '#000000';
      
      const elevationMap = {
        0: { elevation: 0, shadowOpacity: 0 },
        1: { elevation: 1, shadowOffset: { width: 0, height: 1 }, shadowRadius: 2 },
        2: { elevation: 2, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4 },
        3: { elevation: 3, shadowOffset: { width: 0, height: 4 }, shadowRadius: 8 },
        4: { elevation: 4, shadowOffset: { width: 0, height: 8 }, shadowRadius: 16 },
        5: { elevation: 5, shadowOffset: { width: 0, height: 12 }, shadowRadius: 24 },
      };

      const elevation = elevationMap[level] || elevationMap[1];
      
      return {
        ...elevation,
        shadowColor,
        shadowOpacity,
      };
    },

    // Get border color based on theme and intensity
    getBorderColor: (intensity = 'light') => {
      const borderColors = {
        light: state.theme.colors.border,
        medium: state.isDark ? colors.neutral[600] : colors.neutral[400],
        heavy: state.isDark ? colors.neutral[500] : colors.neutral[600],
      };
      
      return borderColors[intensity] || borderColors.light;
    },

    // Get theme-appropriate overlay color
    getOverlayColor: (opacity = 0.5) => {
      const baseColor = state.isDark ? '255, 255, 255' : '0, 0, 0';
      return `rgba(${baseColor}, ${opacity})`;
    },

    // Get theme-specific gradient colors
    getGradientColors: (colorName = 'primary') => {
      if (colors[colorName]) {
        const baseColor = colors[colorName];
        return [baseColor[400], baseColor[600]];
      }
      
      // Fallback gradient
      return state.isDark 
        ? [colors.neutral[700], colors.neutral[900]]
        : [colors.neutral[100], colors.neutral[300]];
    },

    // Get category color from predefined set
    getCategoryColor: (index) => {
      return colors.categories[index % colors.categories.length];
    },

    // Get budget status color
    getBudgetStatusColor: (status) => {
      switch (status) {
        case 'good':
          return colors.budget.underBudget;
        case 'caution':
        case 'warning':
          return colors.budget.nearBudget;
        case 'over':
          return colors.budget.overBudget;
        default:
          return state.theme.colors.textSecondary;
      }
    },

    // Get priority color
    getPriorityColor: (priority) => {
      switch (priority) {
        case 'low':
          return colors.success[500];
        case 'medium':
          return colors.warning[500];
        case 'high':
          return colors.error[500];
        case 'urgent':
          return colors.error[700];
        default:
          return state.theme.colors.textSecondary;
      }
    },
  };

  // Theme-specific constants
  const themeConstants = {
    // Animation durations that respect user preferences
    animations: {
      fast: 150,
      normal: 300,
      slow: 500,
    },

    // Border radius values
    borderRadius: {
      xs: 4,
      sm: 8,
      md: 12,
      lg: 16,
      xl: 20,
      round: 999,
    },

    // Common spacing values
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },

    // Typography scale
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
    },

    // Component sizes
    componentSizes: {
      button: {
        height: 48,
        minWidth: 120,
      },
      input: {
        height: 56,
      },
      listItem: {
        height: 72,
      },
      avatar: {
        sm: 32,
        md: 40,
        lg: 56,
      },
    },
  };

  // Context value
  const value = {
    // State
    mode: state.mode,
    isDark: state.isDark,
    systemTheme: state.systemTheme,
    
    // Actions
    ...actions,
    
    // Helpers
    ...helpers,
    
    // Constants
    constants: themeConstants,
    
    // Theme properties
    ...state.theme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};

// HOC for theme-aware components
export const withTheme = (Component) => {
  return (props) => {
    const theme = useTheme();
    return <Component {...props} theme={theme} />;
  };
};

// Hook for creating theme-aware styles
export const useThemedStyles = (styleFunction) => {
  const theme = useTheme();
  return React.useMemo(() => {
    return styleFunction(theme, theme.isDark, theme);
  }, [theme, styleFunction]);
};

// Hook for getting responsive values based on screen size
export const useResponsiveValue = (values) => {
  // This would typically use screen dimensions
  // For now, returning the default value
  return values.default || values.sm || values[0];
};

export default ThemeContext;