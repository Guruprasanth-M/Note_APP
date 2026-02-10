import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native';
import { useAuth } from '../AuthContext';
import { showAlert } from '../alertHelper';
import { authStyles as styles } from '../styles/authScreens.styles';

export default function LoginScreen({ navigation }) {
  const { signIn } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      showAlert('Error', 'Please enter username and password');
      return;
    }
    setLoading(true);
    const result = await signIn(username.trim(), password);
    setLoading(false);
    if (!result.success) {
      showAlert('Login Failed', result.error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.inner}>
        {/* Logo area */}
        <View style={styles.logoBox}>
          <Text style={styles.logoIcon}></Text>
          <Text style={styles.logoText}>NOTES</Text>
        </View>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        {/* Inputs */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>USERNAME / EMAIL</Text>
          <TextInput
            style={[styles.input, focusedField === 'user' && styles.inputFocused]}
            placeholder="johndoe"
            placeholderTextColor="#333"
            value={username}
            onChangeText={setUsername}
            onFocus={() => setFocusedField('user')}
            onBlur={() => setFocusedField(null)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>PASSWORD</Text>
          <TextInput
            style={[styles.input, focusedField === 'pass' && styles.inputFocused]}
            placeholder="••••••"
            placeholderTextColor="#333"
            value={password}
            onChangeText={setPassword}
            onFocus={() => setFocusedField('pass')}
            onBlur={() => setFocusedField(null)}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.buttonText}>→  LOGIN</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Reset')}
          activeOpacity={0.7}
        >
          <Text style={styles.secondaryButtonText}>FORGOT PASSWORD?</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Signup')}
          activeOpacity={0.7}
        >
          <Text style={styles.secondaryButtonText}>CREATE ACCOUNT</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
