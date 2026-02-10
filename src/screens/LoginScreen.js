import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform, Alert, ActivityIndicator,
} from 'react-native';
import { useAuth } from '../AuthContext';

export default function LoginScreen({ navigation }) {
  const { signIn } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter username and password');
      return;
    }
    setLoading(true);
    const result = await signIn(username.trim(), password);
    setLoading(false);
    if (!result.success) {
      Alert.alert('Login Failed', result.error);
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
          <Text style={styles.logoIcon}>⚡</Text>
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

const ACCENT = '#00f5d4';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  logoBox: {
    alignItems: 'center',
    marginBottom: 8,
  },
  logoIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  logoText: {
    fontSize: 36,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 48,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 11,
    color: '#555',
    letterSpacing: 3,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#0a0a0a',
    borderRadius: 0,
    padding: 16,
    fontSize: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#1a1a1a',
    fontWeight: '500',
  },
  inputFocused: {
    borderColor: ACCENT,
    backgroundColor: '#050505',
  },
  button: {
    backgroundColor: ACCENT,
    borderRadius: 0,
    padding: 18,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 3,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 28,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#1a1a1a',
  },
  dividerText: {
    color: '#333',
    fontSize: 12,
    marginHorizontal: 16,
    letterSpacing: 3,
    fontWeight: '600',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#222',
    padding: 18,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 3,
  },
});
