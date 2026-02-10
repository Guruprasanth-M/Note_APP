import React, { useState, useCallback } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  TextInput, Modal, ActivityIndicator, RefreshControl,
} from 'react-native';
import { showAlert, showConfirm } from '../alertHelper';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../AuthContext';
import * as api from '../api';
import { foldersStyles as styles, ACCENT } from '../styles/foldersScreen.styles';

export default function FoldersScreen({ navigation }) {
  const { authFetch, signOut, user } = useAuth();
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [creating, setCreating] = useState(false);

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

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;
    setCreating(true);
    const res = await authFetch(api.createFolder, newFolderName.trim());
    setCreating(false);
    if (res.data.status === 'SUCCESS') {
      setNewFolderName('');
      setModalVisible(false);
      loadFolders();
    } else {
      showAlert('Error', res.data.msg || 'Failed to create folder');
    }
  };

  const handleDeleteFolder = (folder) => {
    showConfirm(
      'Delete Folder',
      `Delete "${folder.name}" and all its notes?`,
      async () => {
        const res = await authFetch(api.deleteFolder, folder.id);
        if (res.data.status === 'SUCCESS') loadFolders();
        else showAlert('Error', res.data.msg || 'Failed to delete');
      }
    );
  };

  const renderFolder = ({ item, index }) => (
    <TouchableOpacity
      style={styles.folderCard}
      onPress={() => navigation.navigate('Notes', { folderId: item.id, folderName: item.name })}
      onLongPress={() => handleDeleteFolder(item)}
      activeOpacity={0.7}
    >
      <View style={styles.folderLeft}>
        <View style={[styles.folderDot, { backgroundColor: COLORS[index % COLORS.length] }]} />
        <View>
          <Text style={styles.folderName}>{item.name}</Text>
          <Text style={styles.folderCount}>
            {item.note_count || 0} note{item.note_count !== 1 ? 's' : ''}
          </Text>
        </View>
      </View>
      <Text style={styles.arrow}>→</Text>
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
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>@{user?.username || 'user'}</Text>
          <Text style={styles.headerTitle}>FOLDERS</Text>
        </View>
        <TouchableOpacity onPress={signOut} style={styles.logoutBtn} activeOpacity={0.7}>
          <Text style={styles.logoutText}>EXIT</Text>
        </TouchableOpacity>
      </View>

      {/* Stats bar */}
      <View style={styles.statsBar}>
        <View style={styles.stat}>
          <Text style={styles.statNum}>{folders.length}</Text>
          <Text style={styles.statLabel}>FOLDERS</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.stat}>
          <Text style={styles.statNum}>{folders.reduce((a, f) => a + (f.note_count || 0), 0)}</Text>
          <Text style={styles.statLabel}>NOTES</Text>
        </View>
      </View>

      {/* Folder List */}
      <FlatList
        data={folders}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderFolder}
        contentContainerStyle={folders.length === 0 ? styles.emptyContainer : styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>_</Text>
            <Text style={styles.emptyText}>NO FOLDERS</Text>
            <Text style={styles.emptySubtext}>Tap + to create one</Text>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={ACCENT} />
        }
      />

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)} activeOpacity={0.8}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* Create Folder Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>NEW FOLDER</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="folder name"
              placeholderTextColor="#333"
              value={newFolderName}
              onChangeText={setNewFolderName}
              autoFocus
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalCancel}
                onPress={() => { setModalVisible(false); setNewFolderName(''); }}
              >
                <Text style={styles.modalCancelText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalCreate, creating && styles.buttonDisabled]}
                onPress={handleCreateFolder}
                disabled={creating}
              >
                {creating ? (
                  <ActivityIndicator color="#000" size="small" />
                ) : (
                  <Text style={styles.modalCreateText}>CREATE</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const COLORS = ['#3B82F6', '#60A5FA', '#10B981', '#8B5CF6', '#EC4899', '#F59E0B', '#06B6D4'];
