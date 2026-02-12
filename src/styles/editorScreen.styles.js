import { StyleSheet, Platform } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from './common.styles';

export const editorStyles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.BG_PRIMARY,
  },
  center: { justifyContent: 'center', alignItems: 'center' },
  
  // Top bar with folder name and character count
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.SEPARATOR,
  },
  topBarLabel: {
    ...TYPOGRAPHY.footnote,
    color: COLORS.YELLOW,
    fontWeight: '500',
  },
  charCount: {
    backgroundColor: COLORS.BG_ELEVATED,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.xs,
  },
  charCountText: {
    ...TYPOGRAPHY.caption2,
    color: COLORS.TEXT_SECONDARY,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  
  // Editor content area
  scroll: { 
    flex: 1, 
    paddingHorizontal: SPACING.xl, 
    paddingTop: SPACING.lg,
  },
  titleInput: {
    ...TYPOGRAPHY.title1,
    color: COLORS.TEXT_PRIMARY,
    paddingVertical: SPACING.sm,
    marginBottom: SPACING.md,
  },
  bodyInput: {
    ...TYPOGRAPHY.body,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 26,
    minHeight: 300,
  },
  
  // Footer with actions
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    paddingBottom: Platform.OS === 'ios' ? 34 : SPACING.xl,
    borderTopWidth: 0.5,
    borderTopColor: COLORS.SEPARATOR,
    backgroundColor: COLORS.BG_ELEVATED,
  },
  cancelBtn: { 
    paddingVertical: SPACING.md, 
    paddingHorizontal: SPACING.sm,
  },
  cancelText: { 
    ...TYPOGRAPHY.body,
    color: COLORS.BLUE,
  },
  saveButton: {
    backgroundColor: COLORS.YELLOW,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xxl,
    borderRadius: RADIUS.sm,
    ...SHADOWS.small,
  },
  buttonDisabled: { opacity: 0.4 },
  saveText: { 
    color: '#000',
    ...TYPOGRAPHY.callout,
    fontWeight: '600',
  },
});

export const ACCENT = COLORS.YELLOW;
