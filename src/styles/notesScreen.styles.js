import { StyleSheet, Platform } from 'react-native';
import { ACCENT } from './common.styles';

export const notesStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  center: { justifyContent: 'center', alignItems: 'center' },
  list: { paddingHorizontal: 24, paddingBottom: 100 },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
    paddingTop: 8,
  },
  listHeaderCount: { fontSize: 32, fontWeight: '900', color: ACCENT, marginRight: 8 },
  listHeaderLabel: { fontSize: 12, fontWeight: '700', color: '#444', letterSpacing: 3 },
  noteCard: {
    backgroundColor: '#0a0a0a',
    padding: 20,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#141414',
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  noteNum: {
    backgroundColor: '#141414',
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  noteNumText: { fontSize: 11, color: '#444', fontWeight: '700', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  noteTime: { fontSize: 11, color: '#333', fontWeight: '500' },
  noteTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
  },
  noteBody: {
    fontSize: 14,
    color: '#444',
    lineHeight: 22,
  },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  empty: { alignItems: 'center' },
  emptyLine: { fontSize: 36, color: '#222', fontWeight: '200', marginBottom: 12 },
  emptyText: { fontSize: 16, color: '#333', fontWeight: '800', letterSpacing: 4 },
  emptySubtext: { fontSize: 13, color: '#222', marginTop: 8, letterSpacing: 1 },
  fab: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    width: 56,
    height: 56,
    backgroundColor: ACCENT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabText: { fontSize: 28, color: '#000', fontWeight: '300', lineHeight: 30 },
});

export { ACCENT };

