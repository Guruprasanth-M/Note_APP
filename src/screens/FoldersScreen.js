import React, { useState, useCallback } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, TextInput,
  Modal, ActivityIndicator, RefreshControl, SafeAreaView, Platform, Alert,
} from 'react-native';
import { showAlert, showConfirm } from '../alertHelper';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../AuthContext';
import * as api from '../api';
import { foldersStyles as styles, ACCENT, FOLDER_COLORS } from '../styles/foldersScreen.styles';
import { COLORS } from '../styles/common.styles';

// Try to import haptics
let Haptics;
try { Haptics = require('expo-haptics'); } catch (e) { Haptics = null; }

export default function FoldersScreen({ navigation }) {
  const { authFetch, signOut, user } = useAuth();
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [creating, setCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Rename modal state
  const [renameModalVisible, setRenameModalVisible] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [renameValue, setRenameValue] = useState('');
  const [renaming, setRenaming] = useState(false);

  const loadFolders = async () => {
    const res = await authFetch(api.listFolders);
    if (res.data.status === 'SUCCESS') {
      setFolders(res.data.folders || []);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadFolders().finally(() => setLoading(false));
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadFolders();
    setRefreshing(false);
  };

  const triggerHaptic = (type = 'light') => {
    if (!Haptics) return;
    try {
      if (type === 'light') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      else if (type === 'medium') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      else if (type === 'success') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (e) {}
  };

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;
    setCreating(true);
    const res = await authFetch(api.createFolder, newFolderName.trim());
    setCreating(false);
    if (res.data.status === 'SUCCESS') {
      triggerHaptic('success');
      setNewFolderName('');
      setModalVisible(false);
      loadFolders();
    } else {
      showAlert('Error', res.data.msg || 'Failed to create folder');
    }
  };

  const handleRenameFolder = async () => {
    if (!renameValue.trim() || !selectedFolder) return;
    setRenaming(true);
    const res = await authFetch(api.renameFolder, selectedFolder.id, renameValue.trim());
    setRenaming(false);
    if (res.data.status === 'SUCCESS') {
      triggerHaptic('success');
      setRenameModalVisible(false);
      setSelectedFolder(null);
      setRenameValue('');
      loadFolders();
    } else {
      showAlert('Error', res.data.msg || 'Failed to rename folder');
    }
  };

  const showFolderOptions = (folder) => {
    triggerHaptic('medium');
    Alert.alert(
      folder.name,
      'Choose an action',
      [
        {
          text: 'Rename',
          onPress: () => {
            setSelectedFolder(folder);
            setRenameValue(folder.name);
            setRenameModalVisible(true);
          },
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => handleDeleteFolder(folder),
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleDeleteFolder = (folder) => {
    showConfirm(
      'Delete Folder',
      `Delete "${folder.name}" and all its notes? This cannot be undone.`,
      async () => {
        const res = await authFetch(api.deleteFolder, folder.id);
        if (res.data.status === 'SUCCESS') {
          triggerHaptic('success');
          loadFolders();
        } else {
          showAlert('Error', res.data.msg || 'Failed to delete');
        }
      }
    );
  };

  const filteredFolders = folders.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalNotes = folders.reduce((sum, f) => sum + (f.note_count || 0), 0);
  const userInitial = user?.username?.charAt(0)?.toUpperCase() || 'U';

  const renderFolder = ({ item, index }) => {
    const isFirst = index === 0;
    const isLast = index === filteredFolders.length - 1;
    const folderColor = FOLDER_COLORS[index % FOLDER_COLORS.length];

    return (
      <View key={item.id}>
        <TouchableOpacity
          style={[
            styles.folderRow,
            isFirst && styles.folderRowFirst,
            isLast && styles.folderRowLast,
          ]}
          onPress={() => {
            triggerHaptic('light');
            navigation.navigate('Notes', { folderId: item.id, folderName: item.name });
          }}
          onLongPress={() => showFolderOptions(item)}
          activeOpacity={0.6}
        >
          <View style={[styles.folderIcon, { backgroundColor: folderColor + '20' }]}>
            <Text style={styles.folderIconText}>📁</Text>
          </View>
          <View style={styles.folderInfo}>
            <Text style={styles.folderName}>{item.name}</Text>
            <Text style={styles.folderCount}>
              {item.note_count || 0} note{item.note_count !== 1 ? 's' : ''}
            </Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
        {!isLast && <View style={styles.folderSeparator} />}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={ACCENT} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.headerSafeArea}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Folders</Text>
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.headerButtonText}>New</Text>
            </TouchableOpacity>
          </View>
        </View>

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
            {searchQuery.length > 0 && (
              <TouchableOpacity 
                style={styles.searchClear}
                onPress={() => setSearchQuery('')}
              >
                <Text style={styles.searchClearIcon}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>

      {/* Account Bar */}
      <TouchableOpacity 
        style={styles.accountBar}
        onPress={() => navigation.navigate('Profile')}
        activeOpacity={0.7}
      >
        <View style={styles.accountIcon}>
          <Text style={styles.accountIconText}>{userInitial}</Text>
        </View>
        <View style={styles.accountInfo}>
          <Text style={styles.accountName}>{user?.username || 'User'}</Text>
          <Text style={styles.accountEmail}>{user?.email || ''}</Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{folders.length}</Text>
          <Text style={styles.statLabel}>Folders</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{totalNotes}</Text>
          <Text style={styles.statLabel}>Notes</Text>
        </View>
      </View>

      {/* Folder List */}
      {filteredFolders.length > 0 ? (
        <FlatList
          data={filteredFolders}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderFolder}
          style={styles.list}
          contentContainerStyle={[styles.listContent, { paddingHorizontal: 16 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={ACCENT} />
          }
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📁</Text>
          <Text style={styles.emptyText}>{searchQuery ? 'No Results' : 'No Folders Yet'}</Text>
          <Text style={styles.emptySubtext}>
            {searchQuery ? 'Try a different search' : 'Create your first folder to\nstart organizing notes'}
          </Text>
        </View>
      )}

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)} activeOpacity={0.8}>
        <Text style={styles.fabText}>✏️</Text>
      </TouchableOpacity>

      {/* Create Folder Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>New Folder</Text>
            </View>
            <View style={styles.modalBody}>
              <TextInput
                style={styles.modalInput}
                placeholder="Folder name"
                placeholderTextColor={COLORS.TEXT_TERTIARY}
                value={newFolderName}
                onChangeText={setNewFolderName}
                autoFocus
                returnKeyType="done"
                onSubmitEditing={handleCreateFolder}
              />
            </View>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => { setModalVisible(false); setNewFolderName(''); }}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <View style={styles.modalButtonDivider} />
              <TouchableOpacity
                style={[styles.modalButton, creating && styles.buttonDisabled]}
                onPress={handleCreateFolder}
                disabled={creating || !newFolderName.trim()}
              >
                {creating ? (
                  <ActivityIndicator color={COLORS.BLUE} size="small" />
                ) : (
                  <Text style={[styles.modalCreateText, !newFolderName.trim() && { opacity: 0.4 }]}>
                    Create
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Rename Folder Modal */}
      <Modal visible={renameModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Rename Folder</Text>
            </View>
            <View style={styles.modalBody}>
              <TextInput
                style={styles.modalInput}
                placeholder="New folder name"
                placeholderTextColor={COLORS.TEXT_TERTIARY}
                value={renameValue}
                onChangeText={setRenameValue}
                autoFocus
                returnKeyType="done"
                onSubmitEditing={handleRenameFolder}
                selectTextOnFocus
              />
            </View>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => { 
                  setRenameModalVisible(false); 
                  setSelectedFolder(null);
                  setRenameValue(''); 
                }}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <View style={styles.modalButtonDivider} />
              <TouchableOpacity
                style={[styles.modalButton, renaming && styles.buttonDisabled]}
                onPress={handleRenameFolder}
                disabled={renaming || !renameValue.trim()}
              >
                {renaming ? (
                  <ActivityIndicator color={COLORS.BLUE} size="small" />
                ) : (
                  <Text style={[styles.modalCreateText, !renameValue.trim() && { opacity: 0.4 }]}>
                    Rename
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
