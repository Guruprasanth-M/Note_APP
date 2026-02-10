import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native';
import { useAuth } from '../AuthContext';
import { showAlert } from '../alertHelper';
import { forgetPassword, resetPassword } from '../api';

export default function ResetPassword({ navigation }) {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [step, setStep] = useState(1); // Step 1: Email verification, Step 2: New password

  const handleEmailSubmit = async () => {
    if (!email.trim()) {
      showAlert('Error', 'Please enter your email');
      return;
    }
    setLoading(true);
    try {
      const response = await forgetPassword(email.trim());
      setLoading(false);
      if (response.ok && response.data.status === 'SUCCESS') {
        setStep(2);
        showAlert('Success', `Reset token sent to ${email}`);
      } else {
        showAlert('Error', response.data.error || 'Failed to send reset code');
      }
    } catch (error) {
      setLoading(false);
      showAlert('Error', error.message);
    }
  };

  const handlePasswordReset = async () => {
    if (!token.trim()) {
      showAlert('Error', 'Please enter the reset token from your email');
      return;
    }
    if (!newPassword.trim() || !confirmPassword.trim()) {
      showAlert('Error', 'Please enter and confirm your new password');
      return;
    }
    if (newPassword !== confirmPassword) {
      showAlert('Error', 'Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      showAlert('Error', 'Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const response = await resetPassword(token.trim(), newPassword);
      setLoading(false);
      if (response.ok && response.data.status === 'SUCCESS') {
        showAlert('Success', 'Password reset successfully! Please log in.');
        navigation.navigate('Login');
      } else {
        showAlert('Error', response.data.error || 'Failed to reset password');
      }
    } catch (error) {
      setLoading(false);
      showAlert('Error', error.message);
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
        <Text style={styles.subtitle}>
          {step === 1 ? 'Reset your password' : 'Enter new password'}
        </Text>

        {/* Step 1: Email verification */}
        {step === 1 && (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>EMAIL</Text>
              <TextInput
                style={[styles.input, focusedField === 'email' && styles.inputFocused]}
                placeholder="your@email.com"
                placeholderTextColor="#333"
                value={email}
                onChangeText={setEmail}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
              />
            </View>

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleEmailSubmit}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#000" />
              ) : (
                <Text style={styles.buttonText}>→  NEXT</Text>
              )}
            </TouchableOpacity>
          </>
        )}

        {/* Step 2: Password reset */}
        {step === 2 && (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>RESET TOKEN</Text>
              <TextInput
                style={[styles.input, focusedField === 'token' && styles.inputFocused]}
                placeholder="Paste token from email"
                placeholderTextColor="#333"
                value={token}
                onChangeText={setToken}
                onFocus={() => setFocusedField('token')}
                onBlur={() => setFocusedField(null)}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>NEW PASSWORD</Text>
              <TextInput
                style={[styles.input, focusedField === 'newPass' && styles.inputFocused]}
                placeholder="••••••"
                placeholderTextColor="#333"
                value={newPassword}
                onChangeText={setNewPassword}
                onFocus={() => setFocusedField('newPass')}
                onBlur={() => setFocusedField(null)}
                secureTextEntry
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>CONFIRM PASSWORD</Text>
              <TextInput
                style={[styles.input, focusedField === 'confirmPass' && styles.inputFocused]}
                placeholder="••••••"
                placeholderTextColor="#333"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                onFocus={() => setFocusedField('confirmPass')}
                onBlur={() => setFocusedField(null)}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handlePasswordReset}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#000" />
              ) : (
                <Text style={styles.buttonText}>→  RESET</Text>
              )}
            </TouchableOpacity>
          </>
        )}

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.7}
        >
          <Text style={styles.secondaryButtonText}>BACK TO LOGIN</Text>
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
