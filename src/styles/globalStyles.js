import { StyleSheet, Platform } from 'react-native';
import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';

export const globalStyles = StyleSheet.create({
  // Status indicator styles
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.sm,
  },
  statusActive: {
    backgroundColor: colors.success[500],
  },
  statusInactive: {
    backgroundColor: colors.neutral[400],
  },
  statusWarning: {
    backgroundColor: colors.warning[500],
  },
  statusError: {
    backgroundColor: colors.error[500],
  },

  // Chip styles
  chip: {
    backgroundColor: colors.neutral[100],
    borderRadius: spacing.component.borderRadius.round,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    alignSelf: 'flex-start',
  },
  chipSelected: {
    backgroundColor: colors.primary[100],
  },
  chipText: {
    ...typography.caption,
    color: colors.text.primary,
    fontWeight: '500',
  },

  // Shadow styles
  shadowSmall: {
    ...Platform.select({
      ios: {
        shadowColor: colors.neutral[900],
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  shadowMedium: {
    ...Platform.select({
      ios: {
        shadowColor: colors.neutral[900],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  shadowLarge: {
    ...Platform.select({
      ios: {
        shadowColor: colors.neutral[900],
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  // Container styles
  container: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  safeContainer: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  screenContainer: {
    flex: 1,
    paddingHorizontal: spacing.layout.screenPadding.horizontal,
    paddingVertical: spacing.layout.screenPadding.vertical,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },

  // Card styles
  card: {
    backgroundColor: colors.surface.light,
    borderRadius: spacing.component.borderRadius.md,
    padding: spacing.md,
    margin: spacing.sm,
    ...Platform.select({
      ios: {
        shadowColor: colors.neutral[900],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardElevated: {
    backgroundColor: colors.surface.light,
    borderRadius: spacing.component.borderRadius.md,
    padding: spacing.md,
    margin: spacing.sm,
    ...Platform.select({
      ios: {
        shadowColor: colors.neutral[900],
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  // Text styles
  textPrimary: {
    ...typography.body1,
    color: colors.text.primary,
  },
  textSecondary: {
    ...typography.body2,
    color: colors.text.secondary,
  },
  textLabel: {
    ...typography.label,
    color: colors.text.primary,
  },
  textCaption: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  textError: {
    ...typography.body2,
    color: colors.error[500],
  },
  textSuccess: {
    ...typography.body2,
    color: colors.success[500],
  },
  textCenter: {
    textAlign: 'center',
  },

  // Heading styles
  h1: {
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  h2: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  h3: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  h4: {
    ...typography.h4,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },

  // Button styles
  button: {
    backgroundColor: colors.primary[500],
    borderRadius: spacing.component.borderRadius.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: spacing.component.height.button,
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary[500],
    borderRadius: spacing.component.borderRadius.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: spacing.component.height.button,
  },
  buttonText: {
    ...typography.button,
    color: colors.text.inverse,
  },
  buttonTextSecondary: {
    ...typography.button,
    color: colors.primary[500],
  },
  buttonDisabled: {
    backgroundColor: colors.neutral[300],
    opacity: 0.6,
  },

  // Input styles
  input: {
    backgroundColor: colors.surface.light,
    borderWidth: 1,
    borderColor: colors.border.light,
    borderRadius: spacing.component.borderRadius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: spacing.component.height.input,
    ...typography.input,
    color: colors.text.primary,
  },
  inputFocused: {
    borderColor: colors.primary[500],
    borderWidth: 2,
  },
  inputError: {
    borderColor: colors.error[500],
  },
  inputLabel: {
    ...typography.label,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  inputHelperText: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },

  // Layout helpers
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  column: {
    flexDirection: 'column',
  },
  columnCenter: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Spacing helpers
  mt: { marginTop: spacing.md },
  mb: { marginBottom: spacing.md },
  ml: { marginLeft: spacing.md },
  mr: { marginRight: spacing.md },
  mx: { marginHorizontal: spacing.md },
  my: { marginVertical: spacing.md },
  pt: { paddingTop: spacing.md },
  pb: { paddingBottom: spacing.md },
  pl: { paddingLeft: spacing.md },
  pr: { paddingRight: spacing.md },
  px: { paddingHorizontal: spacing.md },
  py: { paddingVertical: spacing.md },

  // Border styles
  border: {
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  borderRadius: {
    borderRadius: spacing.component.borderRadius.md,
  },

  // List styles
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    minHeight: spacing.component.height.listItem,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  listItemLast: {
    borderBottomWidth: 0,
  },

  // Loading styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.overlay.light,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay.light,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalContent: {
    backgroundColor: colors.surface.light,
    borderRadius: spacing.component.borderRadius.lg,
    padding: spacing.lg,
    width: '100%',
    maxWidth: 400,
    ...Platform.select({
      ios: {
        shadowColor: colors.neutral[900],
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
      },
      android: {
        elevation: 10,
      },
    }),
  },

  // Badge styles
  badge: {
    backgroundColor: colors.error[500],
    borderRadius: spacing.component.borderRadius.round,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xs,
  },
  badgeText: {
    ...typography.caption,
    color: colors.text.inverse,
    fontSize: 10,
    fontWeight: '600',
  },

  // Divider styles
  divider: {
    height: 1,
    backgroundColor: colors.border.light,
    marginVertical: spacing.md,
  },
  dividerThick: {
    height: 8,
    backgroundColor: colors.neutral[100],
    marginVertical: spacing.lg,
  },

  // Price styles
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceMain: {
    ...typography.price,
    color: colors.text.primary,
  },
  priceSecondary: {
    ...typography.priceSmall,
    color: colors.text.secondary,
  },
  priceStrikethrough: {
    ...typography.priceSmall,
    color: colors.text.secondary,
    textDecorationLine: 'line-through',
  },
});
