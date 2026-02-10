import React, { useState, useCallback } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
  Alert, TextInput, Modal, ActivityIndicator, RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../AuthContext';
import * as api from '../api';

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
      Alert.alert('Error', res.data.msg || 'Failed to create folder');
    }
  };

  const handleDeleteFolder = (folder) => {
    Alert.alert(
      'Delete Folder',
      `Delete "${folder.name}" and all its notes?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete', style: 'destructive',
          onPress: async () => {
            const res = await authFetch(api.deleteFolder, folder.id);
            if (res.data.status === 'SUCCESS') loadFolders();
            else Alert.alert('Error', res.data.msg || 'Failed to delete');
          }
        },
      ]
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

const ACCENT = '#00f5d4';
const COLORS = ['#00f5d4', '#ff6b6b', '#ffd93d', '#6c5ce7', '#a29bfe', '#fd79a8', '#00cec9'];

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  center: { justifyContent: 'center', alignItems: 'center' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 16,
  },
  greeting: { fontSize: 13, color: '#444', letterSpacing: 1, fontWeight: '500' },
  headerTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
    marginTop: 4,
    letterSpacing: 6,
  },
  logoutBtn: {
    borderWidth: 1,
    borderColor: '#222',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  logoutText: { color: '#ff4757', fontWeight: '700', fontSize: 12, letterSpacing: 2 },
  statsBar: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginTop: 12,
    marginBottom: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#111',
  },
  stat: { flex: 1, alignItems: 'center' },
  statNum: { fontSize: 24, fontWeight: '900', color: '#fff' },
  statLabel: { fontSize: 10, color: '#444', letterSpacing: 3, marginTop: 2, fontWeight: '600' },
  statDivider: { width: 1, backgroundColor: '#1a1a1a' },
  list: { paddingHorizontal: 24, paddingBottom: 100 },
  folderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0a0a0a',
    padding: 18,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#141414',
  },
  folderLeft: { flexDirection: 'row', alignItems: 'center' },
  folderDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 16,
  },
  folderName: { fontSize: 17, fontWeight: '700', color: '#fff' },
  folderCount: { fontSize: 12, color: '#444', marginTop: 2, fontWeight: '500' },
  arrow: { fontSize: 18, color: '#333' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  empty: { alignItems: 'center' },
  emptyIcon: { fontSize: 48, color: '#222', fontWeight: '900', marginBottom: 12 },
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
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  modalContent: {
    backgroundColor: '#0a0a0a',
    padding: 28,
    borderWidth: 1,
    borderColor: '#1a1a1a',
  },
  modalTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 4,
    marginBottom: 20,
  },
  modalInput: {
    backgroundColor: '#000',
    padding: 16,
    fontSize: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#222',
    marginBottom: 24,
    fontWeight: '500',
  },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12 },
  modalCancel: { paddingVertical: 12, paddingHorizontal: 20 },
  modalCancelText: { color: '#444', fontSize: 13, fontWeight: '700', letterSpacing: 2 },
  modalCreate: {
    backgroundColor: ACCENT,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  modalCreateText: { color: '#000', fontSize: 13, fontWeight: '800', letterSpacing: 2 },
  buttonDisabled: { opacity: 0.5 },
});
