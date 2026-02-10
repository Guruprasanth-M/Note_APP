import React, { useState, useCallback } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, Platform,
  ActivityIndicator, RefreshControl,
} from 'react-native';
import { showAlert, showConfirm } from '../alertHelper';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../AuthContext';
import * as api from '../api';

export default function NotesScreen({ route, navigation }) {
  const { folderId, folderName } = route.params;
  const { authFetch } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadNotes = async () => {
    const res = await authFetch(api.folderNotes, folderId);
    if (res.data.status === 'SUCCESS') {
      setNotes(res.data.notes || []);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadNotes().finally(() => setLoading(false));
    }, [folderId])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadNotes();
    setRefreshing(false);
  };

  const handleDelete = (note) => {
    showConfirm(
      'Delete Note',
      `Delete "${note.title}"?`,
      async () => {
        const res = await authFetch(api.deleteNote, note.id);
        if (res.data.status === 'SUCCESS') loadNotes();
        else showAlert('Error', res.data.msg || 'Failed to delete');
      }
    );
  };

  const truncate = (text, max = 100) => {
    if (!text) return '';
    return text.length > max ? text.substring(0, max) + '...' : text;
  };

  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 30) return `${days}d ago`;
    return new Date(dateStr).toLocaleDateString();
  };

  const renderNote = ({ item, index }) => (
    <TouchableOpacity
      style={styles.noteCard}
      onPress={() => navigation.navigate('Editor', {
        noteId: item.id, folderId, folderName, isNew: false,
      })}
      onLongPress={() => handleDelete(item)}
      activeOpacity={0.7}
    >
      <View style={styles.noteHeader}>
        <View style={styles.noteNum}>
          <Text style={styles.noteNumText}>{String(index + 1).padStart(2, '0')}</Text>
        </View>
        <Text style={styles.noteTime}>{timeAgo(item.updated_at || item.created_at)}</Text>
      </View>
      <Text style={styles.noteTitle}>{item.title}</Text>
      {item.body ? (
        <Text style={styles.noteBody}>{truncate(item.body)}</Text>
      ) : null}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={ACCENT} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderNote}
        contentContainerStyle={notes.length === 0 ? styles.emptyContainer : styles.list}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderCount}>{notes.length}</Text>
            <Text style={styles.listHeaderLabel}>NOTES</Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyLine}>—</Text>
            <Text style={styles.emptyText}>EMPTY FOLDER</Text>
            <Text style={styles.emptySubtext}>Tap + to write something</Text>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={ACCENT} />
        }
      />

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Editor', { folderId, folderName, isNew: true })}
        activeOpacity={0.8}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const ACCENT = '#00f5d4';

const styles = StyleSheet.create({
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
