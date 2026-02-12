import { StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from './common.styles';

export const signupStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BG_PRIMARY,
  },
  inner: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.xxl,
    paddingVertical: SPACING.xxxl,
  },
  title: {
    ...TYPOGRAPHY.largeTitle,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    ...TYPOGRAPHY.footnote,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.xxxl,
    letterSpacing: 0.5,
  },
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
  button: {
    backgroundColor: COLORS.YELLOW,
    borderRadius: RADIUS.sm,
    paddingVertical: SPACING.md + 2,
    paddingHorizontal: SPACING.xxl,
    alignItems: 'center',
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
  backLink: {
    marginTop: SPACING.xxl,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: COLORS.SEPARATOR,
  },
  backText: {
    color: COLORS.BLUE,
    ...TYPOGRAPHY.callout,
    fontWeight: '500',
  },
});
