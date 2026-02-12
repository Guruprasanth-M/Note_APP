import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { showAlert } from '../alertHelper';
import { useAuth } from '../AuthContext';
import * as api from '../api';
import { editorStyles as styles, ACCENT } from '../styles/editorScreen.styles';
import { COLORS } from '../styles/common.styles';

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
        <Text style={styles.topBarLabel}>{isNew ? 'New Note' : 'Editing'}</Text>
        <View style={styles.charCount}>
          <Text style={styles.charCountText}>{body.length} chars</Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} keyboardShouldPersistTaps="handled">
        <TextInput
          style={styles.titleInput}
          placeholder="Title"
          placeholderTextColor={COLORS.TEXT_MUTED}
          value={title}
          onChangeText={setTitle}
          autoFocus={isNew}
          maxLength={255}
        />

        <TextInput
          style={styles.bodyInput}
          placeholder="Start writing..."
          placeholderTextColor={COLORS.TEXT_QUATERNARY}
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
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.saveButton, saving && styles.buttonDisabled]}
          onPress={handleSave}
          disabled={saving}
          activeOpacity={0.8}
        >
          {saving ? (
            <ActivityIndicator color="#FFF" size="small" />
          ) : (
            <Text style={styles.saveText}>{isNew ? 'Create' : 'Save'}</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
