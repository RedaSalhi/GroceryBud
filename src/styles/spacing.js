// Base spacing unit (8px system)
const BASE_UNIT = 8;

// Spacing scale
export const spacing = {
  // Micro spacing
  xs: BASE_UNIT * 0.5, // 4px
  sm: BASE_UNIT, // 8px
  md: BASE_UNIT * 2, // 16px
  lg: BASE_UNIT * 3, // 24px
  xl: BASE_UNIT * 4, // 32px
  xxl: BASE_UNIT * 5, // 40px
  xxxl: BASE_UNIT * 6, // 48px
  xxxxl: BASE_UNIT * 8, // 64px

  // Component specific spacing
  component: {
    // Padding
    padding: {
      xs: BASE_UNIT * 0.5, // 4px
      sm: BASE_UNIT, // 8px
      md: BASE_UNIT * 2, // 16px
      lg: BASE_UNIT * 3, // 24px
      xl: BASE_UNIT * 4, // 32px
    },

    // Margins
    margin: {
      xs: BASE_UNIT * 0.5, // 4px
      sm: BASE_UNIT, // 8px
      md: BASE_UNIT * 2, // 16px
      lg: BASE_UNIT * 3, // 24px
      xl: BASE_UNIT * 4, // 32px
    },

    // Border radius
    borderRadius: {
      xs: 4,
      sm: 8,
      md: 12,
      lg: 16,
      xl: 20,
      xxl: 24,
      round: 999,
    },

    // Component heights
    height: {
      button: 48,
      input: 56,
      listItem: 72,
      cardHeader: 64,
      tabBar: 80,
      header: 56,
    },

    // Component widths
    width: {
      buttonSmall: 120,
      buttonMedium: 160,
      buttonLarge: 200,
      inputSmall: 120,
      inputMedium: 200,
      inputLarge: 280,
    },
  },

  // Layout spacing
  layout: {
    // Screen padding
    screenPadding: {
      horizontal: BASE_UNIT * 2, // 16px
      vertical: BASE_UNIT * 3, // 24px
    },

    // Section spacing
    section: {
      padding: BASE_UNIT * 3, // 24px
      margin: BASE_UNIT * 2, // 16px
    },

    // Container spacing
    container: {
      padding: BASE_UNIT * 2, // 16px
      margin: BASE_UNIT, // 8px
    },

    // Card spacing
    card: {
      padding: BASE_UNIT * 2, // 16px
      margin: BASE_UNIT, // 8px
      gap: BASE_UNIT, // 8px
    },

    // List spacing
    list: {
      itemSpacing: BASE_UNIT, // 8px
      sectionSpacing: BASE_UNIT * 3, // 24px
    },

    // Form spacing
    form: {
      fieldSpacing: BASE_UNIT * 2, // 16px
      groupSpacing: BASE_UNIT * 3, // 24px
      buttonSpacing: BASE_UNIT * 4, // 32px
    },

    // Grid spacing
    grid: {
      gap: BASE_UNIT, // 8px
      gutter: BASE_UNIT * 2, // 16px
    },
  },

  // Icon spacing
  icon: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 40,
    xxl: 48,
  },

  // Avatar spacing
  avatar: {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 56,
    xl: 72,
    xxl: 96,
  },
};

// Helper functions for consistent spacing
export const getSpacing = (size) => spacing[size] || spacing.md;
export const getComponentSpacing = (component, property, size) => 
  spacing.component[component]?.[property]?.[size] || spacing.md;
export const getLayoutSpacing = (layout, property) => 
  spacing.layout[layout]?.[property] || spacing.md;

// Responsive spacing helpers
export const responsive = {
  // Screen size breakpoints
  breakpoints: {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  },

  // Responsive spacing multipliers
  multipliers: {
    sm: 0.75,
    md: 1,
    lg: 1.25,
    xl: 1.5,
  },
};

// Common spacing combinations
export const spacingCombinations = {
  // Padding combinations
  paddingHorizontal: {
    xs: { paddingHorizontal: spacing.xs },
    sm: { paddingHorizontal: spacing.sm },
    md: { paddingHorizontal: spacing.md },
    lg: { paddingHorizontal: spacing.lg },
    xl: { paddingHorizontal: spacing.xl },
  },
  paddingVertical: {
    xs: { paddingVertical: spacing.xs },
    sm: { paddingVertical: spacing.sm },
    md: { paddingVertical: spacing.md },
    lg: { paddingVertical: spacing.lg },
    xl: { paddingVertical: spacing.xl },
  },

  // Margin combinations
  marginHorizontal: {
    xs: { marginHorizontal: spacing.xs },
    sm: { marginHorizontal: spacing.sm },
    md: { marginHorizontal: spacing.md },
    lg: { marginHorizontal: spacing.lg },
    xl: { marginHorizontal: spacing.xl },
  },
  marginVertical: {
    xs: { marginVertical: spacing.xs },
    sm: { marginVertical: spacing.sm },
    md: { marginVertical: spacing.md },
    lg: { marginVertical: spacing.lg },
    xl: { marginVertical: spacing.xl },
  },

  // Common screen layouts
  screenContainer: {
    flex: 1,
    paddingHorizontal: spacing.layout.screenPadding.horizontal,
    paddingVertical: spacing.layout.screenPadding.vertical,
  },
  cardContainer: {
    padding: spacing.layout.card.padding,
    margin: spacing.layout.card.margin,
    borderRadius: spacing.component.borderRadius.md,
  },
  formContainer: {
    padding: spacing.layout.form.groupSpacing,
    gap: spacing.layout.form.fieldSpacing,
  },
};