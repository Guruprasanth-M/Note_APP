import { StyleSheet, Platform } from 'react-native';
import { ACCENT, commonStyles } from './common.styles';

export const notesStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: commonStyles.BG_PRIMARY },
  center: { justifyContent: 'center', alignItems: 'center' },
  list: { paddingHorizontal: 20, paddingBottom: 100, paddingTop: 12 },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  listHeaderCount: { fontSize: 32, fontWeight: '800', color: ACCENT, marginRight: 10 },
  listHeaderLabel: { fontSize: 12, fontWeight: '700', color: commonStyles.TEXT_TERTIARY, letterSpacing: 1.5, textTransform: 'uppercase' },
  noteCard: {
    backgroundColor: commonStyles.BG_SECONDARY,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: commonStyles.BORDER_COLOR,
    borderRadius: 12,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  noteNum: {
    backgroundColor: commonStyles.BG_TERTIARY,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  noteNumText: { fontSize: 11, color: commonStyles.TEXT_TERTIARY, fontWeight: '700', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  noteTime: { fontSize: 11, color: commonStyles.TEXT_MUTED, fontWeight: '500' },
  noteTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: commonStyles.TEXT_PRIMARY,
    marginBottom: 8,
  },
  noteBody: {
    fontSize: 14,
    color: commonStyles.TEXT_SECONDARY,
    lineHeight: 22,
  },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30 },
  empty: { alignItems: 'center' },
  emptyLine: { fontSize: 48, color: commonStyles.TEXT_MUTED, fontWeight: '200', marginBottom: 16 },
  emptyText: { fontSize: 18, color: commonStyles.TEXT_PRIMARY, fontWeight: '700', letterSpacing: 0.5, marginBottom: 8, textAlign: 'center' },
  emptySubtext: { fontSize: 13, color: commonStyles.TEXT_TERTIARY, marginTop: 8, letterSpacing: 0.3, textAlign: 'center' },
  fab: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    width: 60,
    height: 60,
    backgroundColor: ACCENT,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    shadowColor: ACCENT,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  fabText: { fontSize: 26, color: '#FFF', fontWeight: '600', lineHeight: 30 },
});

export { ACCENT };


