import { StyleSheet, Platform } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, FOLDER_COLORS } from './common.styles';

export const foldersStyles = StyleSheet.create({
  // Main container
  container: { 
    flex: 1, 
    backgroundColor: COLORS.BG_PRIMARY,
  },
  center: { justifyContent: 'center', alignItems: 'center' },
  
  // Safe area header
  headerSafeArea: {
    backgroundColor: COLORS.BG_PRIMARY,
    paddingTop: Platform.OS === 'ios' ? 50 : 40,
  },
  
  // Header with large title (Apple Notes style)
  header: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  headerTitle: {
    ...TYPOGRAPHY.largeTitle,
    color: COLORS.TEXT_PRIMARY,
  },
  
  // Edit/Logout button
  headerButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  headerButtonText: {
    ...TYPOGRAPHY.body,
    color: COLORS.BLUE,
  },
  
  // Search bar (Apple style)
  searchContainer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
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
    fontSize: 16,
    color: COLORS.TEXT_TERTIARY,
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    ...TYPOGRAPHY.body,
    color: COLORS.TEXT_PRIMARY,
    paddingVertical: SPACING.xs,
  },
  searchClear: {
    padding: SPACING.xs,
  },
  searchClearIcon: {
    fontSize: 16,
    color: COLORS.TEXT_TERTIARY,
  },
  
  // Account info bar
  accountBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  accountIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.BG_TERTIARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  accountIconText: {
    ...TYPOGRAPHY.headline,
    color: COLORS.TEXT_PRIMARY,
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    ...TYPOGRAPHY.headline,
    color: COLORS.TEXT_PRIMARY,
  },
  accountEmail: {
    ...TYPOGRAPHY.footnote,
    color: COLORS.TEXT_SECONDARY,
    marginTop: 2,
  },
  logoutBtn: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  logoutText: {
    ...TYPOGRAPHY.body,
    color: COLORS.RED,
  },
  
  // Folder list
  list: { 
    flex: 1,
  },
  listContent: {
    paddingBottom: 100,
  },
  
  // Section header
  sectionHeader: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.BG_PRIMARY,
  },
  sectionTitle: {
    ...TYPOGRAPHY.footnote,
    color: COLORS.TEXT_SECONDARY,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  // Apple Notes style folder row
  folderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.BG_ELEVATED,
  },
  folderRowFirst: {
    borderTopLeftRadius: RADIUS.sm,
    borderTopRightRadius: RADIUS.sm,
  },
  folderRowLast: {
    borderBottomLeftRadius: RADIUS.sm,
    borderBottomRightRadius: RADIUS.sm,
  },
  folderSeparator: {
    height: 0.5,
    backgroundColor: COLORS.SEPARATOR,
    marginLeft: 60,
  },
  
  // Folder icon (yellow folder like Apple Notes)
  folderIcon: {
    width: 32,
    height: 32,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  folderIconText: {
    fontSize: 18,
  },
  
  // Folder info
  folderInfo: {
    flex: 1,
  },
  folderName: {
    ...TYPOGRAPHY.body,
    color: COLORS.TEXT_PRIMARY,
  },
  folderMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  folderCount: {
    ...TYPOGRAPHY.footnote,
    color: COLORS.TEXT_SECONDARY,
  },
  
  // Chevron
  chevron: {
    fontSize: 18,
    color: COLORS.TEXT_TERTIARY,
  },
  
  // Swipe delete action
  deleteAction: {
    backgroundColor: COLORS.RED,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: SPACING.xl,
  },
  deleteActionText: {
    ...TYPOGRAPHY.body,
    color: '#FFF',
    fontWeight: '500',
  },
  
  // Empty state
  emptyContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: SPACING.xxxl,
  },
  emptyIcon: { 
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
  
  // FAB (Apple Notes style - bottom right compose)
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
  
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xxl,
  },
  modalContent: {
    backgroundColor: COLORS.BG_ELEVATED,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
  },
  modalHeader: {
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.SEPARATOR,
    alignItems: 'center',
  },
  modalTitle: {
    ...TYPOGRAPHY.headline,
    color: COLORS.TEXT_PRIMARY,
  },
  modalBody: {
    padding: SPACING.xl,
  },
  modalInput: {
    backgroundColor: COLORS.BG_TERTIARY,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    ...TYPOGRAPHY.body,
    color: COLORS.TEXT_PRIMARY,
    borderRadius: RADIUS.sm,
  },
  modalActions: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: COLORS.SEPARATOR,
  },
  modalButton: {
    flex: 1,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonDivider: {
    width: 0.5,
    backgroundColor: COLORS.SEPARATOR,
  },
  modalCancelText: {
    ...TYPOGRAPHY.body,
    color: COLORS.BLUE,
  },
  modalCreateText: {
    ...TYPOGRAPHY.body,
    color: COLORS.BLUE,
    fontWeight: '600',
  },
  buttonDisabled: { opacity: 0.4 },
  
  // Stats row
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    backgroundColor: COLORS.BG_ELEVATED,
    borderRadius: RADIUS.sm,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 0.5,
    backgroundColor: COLORS.SEPARATOR,
    marginVertical: SPACING.xs,
  },
  statNumber: {
    ...TYPOGRAPHY.title2,
    color: COLORS.YELLOW,
  },
  statLabel: {
    ...TYPOGRAPHY.caption1,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SPACING.xs,
  },
});

export const ACCENT = COLORS.YELLOW;
export { FOLDER_COLORS };
