import React, { useState, useCallback } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, Platform,
  ActivityIndicator, RefreshControl,
} from 'react-native';
import { showAlert, showConfirm } from '../alertHelper';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../AuthContext';
import * as api from '../api';
import { notesStyles as styles, ACCENT } from '../styles/notesScreen.styles';

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
    if (!dateStr) return 'no date';
    
    // Parse date - ensure proper timezone handling
    const date = new Date(dateStr);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'invalid date';
    }
    
    const diff = Date.now() - date.getTime();
    const mins = Math.floor(diff / (1000 * 60));
    
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    
    const days = Math.floor(hrs / 24);
    if (days < 30) return `${days}d ago`;
    
    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;
    
    return date.toLocaleDateString();
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

