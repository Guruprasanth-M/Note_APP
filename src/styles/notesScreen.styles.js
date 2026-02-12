import { StyleSheet, Platform } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from './common.styles';

export const notesStyles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.BG_PRIMARY,
  },
  center: { justifyContent: 'center', alignItems: 'center' },
  
  // Search bar
  searchContainer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.BG_PRIMARY,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.BG_TERTIARY,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: Platform.OS === 'ios' ? SPACING.sm : SPACING.xs,
  },
  searchIcon: {
    fontSize: 14,
    color: COLORS.TEXT_TERTIARY,
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    ...TYPOGRAPHY.body,
    color: COLORS.TEXT_PRIMARY,
    paddingVertical: SPACING.xs,
  },
  
  // List
  list: { 
    paddingHorizontal: SPACING.lg, 
    paddingBottom: 120,
  },
  
  // Section header
  listHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: SPACING.lg,
    marginTop: SPACING.sm,
  },
  listHeaderCount: { 
    ...TYPOGRAPHY.title1,
    color: COLORS.YELLOW, 
    marginRight: SPACING.sm,
  },
  listHeaderLabel: { 
    ...TYPOGRAPHY.footnote,
    color: COLORS.TEXT_SECONDARY, 
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  // Note card - Apple Notes style
  noteCard: {
    backgroundColor: COLORS.BG_ELEVATED,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    marginBottom: 1,
    borderRadius: RADIUS.sm,
    marginBottom: SPACING.sm,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  noteNum: {
    backgroundColor: COLORS.BG_TERTIARY,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.xs,
  },
  noteNumText: { 
    ...TYPOGRAPHY.caption2,
    color: COLORS.TEXT_SECONDARY, 
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontWeight: '500',
  },
  noteTime: { 
    ...TYPOGRAPHY.caption1,
    color: COLORS.TEXT_SECONDARY,
  },
  noteTitle: {
    ...TYPOGRAPHY.headline,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.xs,
  },
  noteBody: {
    ...TYPOGRAPHY.subheadline,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 20,
  },
  
  // Empty state
  emptyContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: SPACING.xxxl,
  },
  empty: { alignItems: 'center' },
  emptyLine: { 
    fontSize: 64,
    marginBottom: SPACING.lg,
  },
  emptyText: { 
    ...TYPOGRAPHY.title3,
    color: COLORS.TEXT_PRIMARY, 
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  emptySubtext: { 
    ...TYPOGRAPHY.subheadline,
    color: COLORS.TEXT_SECONDARY, 
    textAlign: 'center',
    lineHeight: 22,
  },
  
  // FAB
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    backgroundColor: COLORS.YELLOW,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 28,
    ...SHADOWS.medium,
  },
  fabText: { 
    fontSize: 24, 
    color: '#000',
    fontWeight: '400',
  },
  
  // Swipe delete action
  deleteAction: {
    backgroundColor: COLORS.RED,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    borderRadius: RADIUS.sm,
    marginBottom: SPACING.sm,
  },
  deleteActionText: {
    fontSize: 22,
    marginBottom: SPACING.xs,
  },
  deleteActionLabel: {
    ...TYPOGRAPHY.caption1,
    color: '#fff',
    fontWeight: '600',
  },
});

export const ACCENT = COLORS.YELLOW;


