import React, { useState, useCallback, useRef } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, Platform,
  ActivityIndicator, RefreshControl, TextInput, Animated,
} from 'react-native';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import { showAlert, showConfirm } from '../alertHelper';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../AuthContext';
import * as api from '../api';
import { notesStyles as styles, ACCENT } from '../styles/notesScreen.styles';
import { COLORS } from '../styles/common.styles';

// Try to import haptics
let Haptics;
try { Haptics = require('expo-haptics'); } catch (e) { Haptics = null; }

export default function NotesScreen({ route, navigation }) {
  const { folderId, folderName } = route.params;
  const { authFetch } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Keep track of open swipeable refs
  const swipeableRefs = useRef({});
  const previousOpenedRow = useRef(null);

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

  const triggerHaptic = (type = 'light') => {
    if (!Haptics) return;
    try {
      if (type === 'medium') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (e) {}
  };

  const handleDelete = (note) => {
    triggerHaptic('medium');
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

  const truncate = (text, max = 80) => {
    if (!text) return '';
    return text.length > max ? text.substring(0, max) + '...' : text;
  };

  const timeAgo = (dateStr) => {
    if (!dateStr) return '';
    const isoStr = dateStr.replace(' ', 'T') + '+05:30';
    const date = new Date(isoStr);
    if (isNaN(date.getTime())) return '';
    
    const diff = Date.now() - date.getTime();
    const mins = Math.floor(diff / (1000 * 60));
    
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m`;
    
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h`;
    
    const days = Math.floor(hrs / 24);
    if (days < 7) return `${days}d`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Filter notes by search
  const filteredNotes = notes.filter(n =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (n.body && n.body.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Close previous swipeable when opening a new one
  const closeRow = (id) => {
    if (previousOpenedRow.current && previousOpenedRow.current !== swipeableRefs.current[id]) {
      previousOpenedRow.current.close();
    }
    previousOpenedRow.current = swipeableRefs.current[id];
  };

  // Render right swipe actions (delete)
  const renderRightActions = (progress, dragX, note) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0.5],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        style={styles.deleteAction}
        onPress={() => {
          swipeableRefs.current[note.id]?.close();
          handleDelete(note);
        }}
      >
        <Animated.Text style={[styles.deleteActionText, { transform: [{ scale }] }]}>
          🗑️
        </Animated.Text>
        <Animated.Text style={[styles.deleteActionLabel, { transform: [{ scale }] }]}>
          Delete
        </Animated.Text>
      </TouchableOpacity>
    );
  };

  const renderNote = ({ item, index }) => (
    <Swipeable
      ref={(ref) => swipeableRefs.current[item.id] = ref}
      renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item)}
      onSwipeableOpen={() => closeRow(item.id)}
      overshootRight={false}
      friction={2}
    >
      <TouchableOpacity
        style={styles.noteCard}
        onPress={() => navigation.navigate('Editor', {
          noteId: item.id, folderId, folderName, isNew: false,
        })}
        onLongPress={() => handleDelete(item)}
        activeOpacity={0.6}
      >
        <Text style={styles.noteTitle}>{item.title}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.noteTime}>{timeAgo(item.updated_at || item.created_at)}</Text>
          {item.body ? (
            <Text style={[styles.noteBody, { marginLeft: 8 }]}>{truncate(item.body)}</Text>
          ) : null}
        </View>
      </TouchableOpacity>
    </Swipeable>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={ACCENT} />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor={COLORS.TEXT_TERTIARY}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <FlatList
          data={filteredNotes}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderNote}
          contentContainerStyle={filteredNotes.length === 0 ? styles.emptyContainer : styles.list}
          ListHeaderComponent={filteredNotes.length > 0 ? (
            <View style={styles.listHeader}>
              <Text style={styles.listHeaderCount}>{filteredNotes.length}</Text>
              <Text style={styles.listHeaderLabel}>Notes</Text>
            </View>
          ) : null}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyLine}>📝</Text>
              <Text style={styles.emptyText}>{searchQuery ? 'No Results' : 'No Notes Yet'}</Text>
              <Text style={styles.emptySubtext}>
                {searchQuery ? 'Try a different search' : 'Start writing your first note'}
              </Text>
            </View>
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={ACCENT} />
          }
          showsVerticalScrollIndicator={false}
        />

        {/* FAB */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('Editor', { folderId, folderName, isNew: true })}
          activeOpacity={0.8}
        >
          <Text style={styles.fabText}>✏️</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
}

