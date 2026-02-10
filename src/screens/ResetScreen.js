import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native';
import { useAuth } from '../AuthContext';
import { showAlert } from '../alertHelper';
import { forgetPassword, resetPassword } from '../api';
import { styles } from './ResetScreen.styles';

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
        // Don't auto-fill token - user must verify by entering it from email
        setStep(2);
        showAlert('Success', `Reset link sent to ${email}. Check your email for the token.`);
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
          {step === 1 ? 'Reset your password' : 'Enter reset token'}
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
            <Text style={styles.instructionText}>Check your email for the reset token</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>RESET TOKEN</Text>
              <TextInput
                style={[styles.input, focusedField === 'token' && styles.inputFocused]}
                placeholder="Paste the token from your email"
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
