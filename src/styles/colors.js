const colorPalettes = {
    // Primary Brand Colors
    primary: {
        50: '#E8F5E8',
        100: '#C3E6C3',
        200: '#9DD69D',
        300: '#77C677',
        400: '#51B651',
        500: '#2DA62D', // Main brand green
        600: '#258525',
        700: '#1D641D',
        800: '#154315',
        900: '#0D220D',
    },

    // Secondary Colors
    secondary: {
        50: '#FFF8E1',
        100: '#FFECB3',
        200: '#FFE082',
        300: '#FFD54F',
        400: '#FFCA28',
        500: '#FFC107', // Accent yellow
        600: '#FFB300',
        700: '#FFA000',
        800: '#FF8F00',
        900: '#FF6F00',
    },

    // Neutral Colors
    neutral: {
        50: '#FAFAFA',
        100: '#F5F5F5',
        200: '#EEEEEE',
        300: '#E0E0E0',
        400: '#BDBDBD',
        500: '#9E9E9E',
        600: '#757575',
        700: '#616161',
        800: '#424242',
        900: '#212121',
    },

    // Status Colors
    success: {
        50: '#E8F5E8',
        400: '#66BB6A',
        500: '#4CAF50',
        600: '#43A047',
    },

    error: {
        50: '#FFEBEE',
        400: '#EF5350',
        500: '#F44336',
        600: '#E53935',
    },

    warning: {
        50: '#FFF3E0',
        400: '#FFA726',
        500: '#FF9800',
        600: '#FB8C00',
    },

    info: {
        50: '#E3F2FD',
        400: '#42A5F5',
        500: '#2196F3',
        600: '#1E88E5',
    },

    // Background Colors
    background: {
        light: '#FFFFFF',
        lightGray: '#F8F9FA',
        dark: '#121212',
        darkCard: '#1E1E1E',
    },

    // Text Colors
    text: {
        primary: '#212121',
        secondary: '#757575',
        disabled: '#BDBDBD',
        inverse: '#FFFFFF',
        link: '#1976D2',
    },

    // Surface Colors
    surface: {
        light: '#FFFFFF',
        dark: '#1E1E1E',
        elevated: '#F5F5F5',
    },

    // Border Colors
    border: {
        light: '#E0E0E0',
        medium: '#BDBDBD',
        dark: '#757575',
    },

    // Overlay Colors
    overlay: {
        light: 'rgba(0, 0, 0, 0.5)',
        dark: 'rgba(0, 0, 0, 0.7)',
    },

    // Budget Status Colors
    budget: {
        underBudget: '#4CAF50',
        nearBudget: '#FF9800',
        overBudget: '#F44336',
    },

    // Category Colors
    categories: [
        '#FF6B6B', // Red
        '#4ECDC4', // Teal
        '#45B7D1', // Blue
        '#96CEB4', // Green
        '#FFEAA7', // Yellow
        '#DDA0DD', // Plum
        '#98D8C8', // Mint
        '#F7DC6F', // Light Yellow
        '#BB8FCE', // Light Purple
        '#85C1E9', // Light Blue
    ],
};

export const colors = { ...colorPalettes };

// Theme configurations
export const lightTheme = {
  primary: colorPalettes.primary[500],
  primaryLight: colorPalettes.primary[100],
  primaryDark: colorPalettes.primary[700],
  secondary: colorPalettes.secondary[500],
  background: colorPalettes.background.light,
  surface: colorPalettes.surface.light,
  text: colorPalettes.text.primary,
  textSecondary: colorPalettes.text.secondary,
  border: colorPalettes.border.light,
  success: colorPalettes.success[500],
  error: colorPalettes.error[500],
  warning: colorPalettes.warning[500],
  info: colorPalettes.info[500],
  white: '#FFFFFF',
};

export const darkTheme = {
  primary: colorPalettes.primary[400],
  primaryLight: colorPalettes.primary[200],
  primaryDark: colorPalettes.primary[800],
  secondary: colorPalettes.secondary[400],
  background: colorPalettes.background.dark,
  surface: colorPalettes.surface.dark,
  text: colorPalettes.text.inverse,
  textSecondary: colorPalettes.neutral[400],
  border: colorPalettes.neutral[700],
  success: colorPalettes.success[400],
  error: colorPalettes.error[400],
  warning: colorPalettes.warning[400],
  info: colorPalettes.info[400],
  white: '#FFFFFF',
};