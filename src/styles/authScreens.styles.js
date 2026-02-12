import { StyleSheet, Platform } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from './common.styles';

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BG_PRIMARY,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.xxl,
  },
  
  // Logo section
  logoBox: {
    alignItems: 'center',
    marginBottom: SPACING.xxxl,
  },
  logoIcon: {
    fontSize: 64,
    marginBottom: SPACING.md,
  },
  logoText: {
    ...TYPOGRAPHY.largeTitle,
    color: COLORS.TEXT_PRIMARY,
  },
  subtitle: {
    ...TYPOGRAPHY.footnote,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginBottom: SPACING.xxxl,
    letterSpacing: 0.5,
  },
  instructionText: {
    ...TYPOGRAPHY.subheadline,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginBottom: SPACING.xxl,
    lineHeight: 22,
  },
  
  // Form inputs
  inputGroup: {
    marginBottom: SPACING.lg,
  },
  label: {
    ...TYPOGRAPHY.footnote,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.sm,
    fontWeight: '500',
  },
  input: {
    backgroundColor: COLORS.BG_ELEVATED,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md + 2,
    ...TYPOGRAPHY.body,
    color: COLORS.TEXT_PRIMARY,
    borderWidth: 0.5,
    borderColor: COLORS.SEPARATOR,
  },
  inputFocused: {
    borderColor: COLORS.YELLOW,
    backgroundColor: COLORS.BG_SECONDARY,
  },
  
  // Primary button
  button: {
    backgroundColor: COLORS.YELLOW,
    borderRadius: RADIUS.sm,
    paddingVertical: SPACING.md + 2,
    paddingHorizontal: SPACING.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.xl,
    ...SHADOWS.small,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    color: '#000',
    ...TYPOGRAPHY.callout,
    fontWeight: '600',
  },
  
  // Divider
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.xxxl,
  },
  dividerLine: {
    flex: 1,
    height: 0.5,
    backgroundColor: COLORS.SEPARATOR,
  },
  dividerText: {
    color: COLORS.TEXT_SECONDARY,
    ...TYPOGRAPHY.caption1,
    marginHorizontal: SPACING.lg,
  },
  
  // Secondary button
  secondaryButton: {
    borderWidth: 0.5,
    borderColor: COLORS.SEPARATOR,
    borderRadius: RADIUS.sm,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xxl,
    alignItems: 'center',
    marginBottom: SPACING.md,
    backgroundColor: 'transparent',
  },
  secondaryButtonText: {
    color: COLORS.BLUE,
    ...TYPOGRAPHY.callout,
    fontWeight: '500',
  },
});
