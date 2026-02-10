import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { showAlert } from '../alertHelper';
import { useAuth } from '../AuthContext';
import * as api from '../api';
import { editorStyles as styles, ACCENT } from '../styles/editorScreen.styles';

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
          showAlert('Error', 'Could not load note');
          navigation.goBack();
        }
        setLoading(false);
      })();
    }
  }, [noteId, isNew]);

  const handleSave = async () => {
    if (!title.trim()) {
      showAlert('Error', 'Title is required');
      return;
    }
    setSaving(true);
    if (isNew) {
      const res = await authFetch(api.createNote, title.trim(), body, folderId);
      setSaving(false);
      if (res.data.status === 'SUCCESS') navigation.goBack();
      else showAlert('Error', res.data.msg || 'Failed to create note');
    } else {
      const res = await authFetch(api.editNote, noteId, { title: title.trim(), body });
      setSaving(false);
      if (res.data.status === 'SUCCESS') navigation.goBack();
      else showAlert('Error', res.data.msg || 'Failed to save note');
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
