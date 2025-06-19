import { Platform } from 'react-native';

// Font families
export const fontFamilies = {
  primary: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  }),
  secondary: Platform.select({
    ios: 'San Francisco',
    android: 'Roboto',
    default: 'System',
  }),
  monospace: Platform.select({
    ios: 'Menlo',
    android: 'monospace',
    default: 'monospace',
  }),
};

// Font weights
export const fontWeights = {
  light: '300',
  normal: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
};

// Font sizes
export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  xxxxl: 40,
};

// Line heights
export const lineHeights = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
  xxl: 36,
  xxxl: 44,
  xxxxl: 52,
};

// Typography styles
export const typography = {
  // Headings
  h1: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.xxxxl,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.xxxxl,
    letterSpacing: -0.5,
  },
  h2: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.xxxl,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.xxxl,
    letterSpacing: -0.25,
  },
  h3: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.xxl,
    fontWeight: fontWeights.semiBold,
    lineHeight: lineHeights.xxl,
    letterSpacing: 0,
  },
  h4: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.semiBold,
    lineHeight: lineHeights.xl,
    letterSpacing: 0,
  },
  h5: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.lg,
    letterSpacing: 0,
  },
  h6: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.md,
    letterSpacing: 0,
  },

  // Body text
  body1: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.md,
    letterSpacing: 0.15,
  },
  body2: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.sm,
    letterSpacing: 0.25,
  },

  // Labels and captions
  label: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.sm,
    letterSpacing: 0.4,
  },
  caption: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.xs,
    letterSpacing: 0.4,
  },

  // Special text styles
  subtitle1: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.md,
    letterSpacing: 0.15,
  },
  subtitle2: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.sm,
    letterSpacing: 0.1,
  },

  // Button text
  button: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.sm,
    letterSpacing: 1.25,
    textTransform: 'uppercase',
  },

  // Input text
  input: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.md,
    letterSpacing: 0.15,
  },

  // Price text
  price: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semiBold,
    lineHeight: lineHeights.lg,
    letterSpacing: 0,
  },
  priceSmall: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.md,
    letterSpacing: 0,
  },

  // Navigation text
  tabLabel: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.xs,
    letterSpacing: 0.4,
  },
  headerTitle: {
    fontFamily: fontFamilies.primary,
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.semiBold,
    lineHeight: lineHeights.xl,
    letterSpacing: 0,
  },
};