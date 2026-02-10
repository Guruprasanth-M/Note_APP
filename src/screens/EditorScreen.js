import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { useAuth } from '../AuthContext';
import * as api from '../api';

export default function EditorScreen({ route, navigation }) {
  const { noteId, folderId, isNew } = route.params;
  const { authFetch } = useAuth();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isNew && noteId) {
      (async () => {
        const res = await authFetch(api.getNote, noteId);
        if (res.data.status === 'SUCCESS') {
          setTitle(res.data.note.title || '');
          setBody(res.data.note.body || '');
        } else {
          Alert.alert('Error', 'Could not load note');
          navigation.goBack();
        }
        setLoading(false);
      })();
    }
  }, [noteId, isNew]);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Title is required');
      return;
    }
    setSaving(true);
    if (isNew) {
      const res = await authFetch(api.createNote, title.trim(), body, folderId);
      setSaving(false);
      if (res.data.status === 'SUCCESS') navigation.goBack();
      else Alert.alert('Error', res.data.msg || 'Failed to create note');
    } else {
      const res = await authFetch(api.editNote, noteId, { title: title.trim(), body });
      setSaving(false);
      if (res.data.status === 'SUCCESS') navigation.goBack();
      else Alert.alert('Error', res.data.msg || 'Failed to save note');
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={ACCENT} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Minimal top bar */}
      <View style={styles.topBar}>
        <Text style={styles.topBarLabel}>{isNew ? 'NEW NOTE' : 'EDITING'}</Text>
        <View style={styles.charCount}>
          <Text style={styles.charCountText}>{body.length}</Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} keyboardShouldPersistTaps="handled">
        <TextInput
          style={styles.titleInput}
          placeholder="Title"
          placeholderTextColor="#333"
          value={title}
          onChangeText={setTitle}
          autoFocus={isNew}
          maxLength={255}
        />

        <TextInput
          style={styles.bodyInput}
          placeholder="Start writing..."
          placeholderTextColor="#222"
          value={body}
          onChangeText={setBody}
          multiline
          textAlignVertical="top"
        />
      </ScrollView>

      {/* Bottom save bar */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.cancelText}>← BACK</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.saveButton, saving && styles.buttonDisabled]}
          onPress={handleSave}
          disabled={saving}
          activeOpacity={0.8}
        >
          {saving ? (
            <ActivityIndicator color="#000" size="small" />
          ) : (
            <Text style={styles.saveText}>{isNew ? 'CREATE' : 'SAVE'}</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const ACCENT = '#00f5d4';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  center: { justifyContent: 'center', alignItems: 'center' },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#111',
  },
  topBarLabel: {
    fontSize: 11,
    color: ACCENT,
    fontWeight: '700',
    letterSpacing: 3,
  },
  charCount: {
    backgroundColor: '#0a0a0a',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  charCountText: {
    fontSize: 11,
    color: '#333',
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  scroll: { flex: 1, paddingHorizontal: 24, paddingTop: 20 },
  titleInput: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    paddingVertical: 8,
    marginBottom: 20,
  },
  bodyInput: {
    fontSize: 16,
    color: '#888',
    lineHeight: 28,
    minHeight: 300,
    fontWeight: '400',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: '#111',
    backgroundColor: '#050505',
  },
  cancelBtn: { paddingVertical: 12, paddingHorizontal: 4 },
  cancelText: { color: '#444', fontSize: 13, fontWeight: '700', letterSpacing: 2 },
  saveButton: {
    backgroundColor: ACCENT,
    paddingVertical: 14,
    paddingHorizontal: 32,
  },
  buttonDisabled: { opacity: 0.5 },
  saveText: { color: '#000', fontSize: 14, fontWeight: '800', letterSpacing: 3 },
});
