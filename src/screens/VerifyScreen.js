import React, { useState, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native';
import { showAlert, showConfirm } from '../alertHelper';
import * as api from '../api';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '../styles/common.styles';
import { StyleSheet } from 'react-native';

export default function VerifyScreen({ navigation, route }) {
  const email = route.params?.email || '';
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const inputRefs = useRef([]);

  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    
    // Auto advance to next field
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const token = code.join('');
    if (token.length !== 6) {
      showAlert('Error', 'Please enter the 6-digit code from your email');
      return;
    }
    
    setLoading(true);
    const res = await api.verifyEmail(token);
    setLoading(false);
    
    if (res.data.status === 'SUCCESS') {
      showConfirm(
        'Email Verified! ✓',
        'Your account is now active. You can login.',
        () => navigation.navigate('Login')
      );
    } else {
      showAlert('Verification Failed', res.data.msg || 'Invalid or expired code');
    }
  };

  const handleResend = async () => {
    if (!email) {
      showAlert('Error', 'Email not available. Please signup again.');
      return;
    }
    
    setResending(true);
    const res = await api.resendVerification(email);
    setResending(false);
    
    if (res.data.status === 'SUCCESS') {
      showAlert('Email Sent', 'A new verification code has been sent to your email');
    } else {
      showAlert('Error', res.data.msg || 'Failed to resend code');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.inner}>
        {/* Icon & Title */}
        <View style={styles.header}>
          <Text style={styles.icon}>✉️</Text>
          <Text style={styles.title}>Verify Email</Text>
          <Text style={styles.subtitle}>
            Enter the 6-digit code sent to{'\n'}
            <Text style={styles.emailText}>{email || 'your email'}</Text>
          </Text>
        </View>

        {/* Code Input */}
        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => inputRefs.current[index] = ref}
              style={[styles.codeInput, digit && styles.codeInputFilled]}
              value={digit}
              onChangeText={(text) => handleCodeChange(text.slice(-1), index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        {/* Verify Button */}
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleVerify}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.buttonText}>Verify</Text>
          )}
        </TouchableOpacity>

        {/* Resend */}
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't receive the code?</Text>
          <TouchableOpacity onPress={handleResend} disabled={resending}>
            {resending ? (
              <ActivityIndicator color={COLORS.YELLOW} size="small" />
            ) : (
              <Text style={styles.resendLink}>Resend Code</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Back to Login */}
        <TouchableOpacity 
          style={styles.backLink}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.backText}>← Back to Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BG_PRIMARY,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xxxl,
  },
  icon: {
    fontSize: 64,
    marginBottom: SPACING.lg,
  },
  title: {
    ...TYPOGRAPHY.title1,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.md,
  },
  subtitle: {
    ...TYPOGRAPHY.subheadline,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 22,
  },
  emailText: {
    color: COLORS.YELLOW,
    fontWeight: '600',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: SPACING.xxl,
  },
  codeInput: {
    width: 48,
    height: 56,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.BG_ELEVATED,
    borderWidth: 1,
    borderColor: COLORS.SEPARATOR,
    ...TYPOGRAPHY.title2,
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
  },
  codeInputFilled: {
    borderColor: COLORS.YELLOW,
    backgroundColor: COLORS.BG_SECONDARY,
  },
  button: {
    backgroundColor: COLORS.YELLOW,
    borderRadius: RADIUS.sm,
    paddingVertical: SPACING.md + 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xxl,
    ...SHADOWS.small,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#000',
    ...TYPOGRAPHY.callout,
    fontWeight: '600',
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  resendText: {
    ...TYPOGRAPHY.footnote,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.sm,
  },
  resendLink: {
    ...TYPOGRAPHY.footnote,
    color: COLORS.YELLOW,
    fontWeight: '600',
  },
  backLink: {
    alignSelf: 'center',
    padding: SPACING.md,
  },
  backText: {
    ...TYPOGRAPHY.footnote,
    color: COLORS.TEXT_SECONDARY,
  },
});
