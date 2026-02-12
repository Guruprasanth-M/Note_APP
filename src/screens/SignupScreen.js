import React, { useState, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useAuth } from '../AuthContext';
import { showAlert, showConfirm } from '../alertHelper';
import * as api from '../api';
import { signupStyles as styles } from '../styles/signupScreen.styles';
import { COLORS } from '../styles/common.styles';

export default function SignupScreen({ navigation }) {
  const { signUp } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  
  // Validation states
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);
  
  const usernameTimeout = useRef(null);
  const emailTimeout = useRef(null);

  // Validate username format
  const validateUsername = (value) => {
    if (value.length < 3) return 'Username must be at least 3 characters';
    if (value.length > 50) return 'Username must be less than 50 characters';
    if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Only letters, numbers, and underscores';
    return '';
  };

  // Validate email format
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Invalid email format';
    return '';
  };

  // Check if username exists (debounced)
  const checkUsernameExists = async (value) => {
    if (usernameTimeout.current) clearTimeout(usernameTimeout.current);
    
    const formatError = validateUsername(value);
    if (formatError) {
      setUsernameError(formatError);
      return;
    }
    
    setCheckingUsername(true);
    usernameTimeout.current = setTimeout(async () => {
      const res = await api.userExists(value, '');
      setCheckingUsername(false);
      if (res.data.username_exists) {
        setUsernameError('Username already taken');
      } else {
        setUsernameError('');
      }
    }, 500);
  };

  // Check if email exists (debounced)
  const checkEmailExists = async (value) => {
    if (emailTimeout.current) clearTimeout(emailTimeout.current);
    
    const formatError = validateEmail(value);
    if (formatError) {
      setEmailError(formatError);
      return;
    }
    
    setCheckingEmail(true);
    emailTimeout.current = setTimeout(async () => {
      const res = await api.userExists('', value);
      setCheckingEmail(false);
      if (res.data.email_exists) {
        setEmailError('Email already registered');
      } else {
        setEmailError('');
      }
    }, 500);
  };

  const handleUsernameChange = (value) => {
    setUsername(value);
    if (value.length >= 3) {
      checkUsernameExists(value);
    } else if (value.length > 0) {
      setUsernameError('Username must be at least 3 characters');
    } else {
      setUsernameError('');
    }
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    if (value.length > 0) {
      checkEmailExists(value);
    } else {
      setEmailError('');
    }
  };

  const handleSignup = async () => {
    // Validate all fields
    if (!username.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      showAlert('Error', 'All fields are required');
      return;
    }
    
    if (usernameError || emailError) {
      showAlert('Error', 'Please fix the errors before continuing');
      return;
    }
    
    if (phone.length !== 10) {
      showAlert('Error', 'Phone number must be 10 digits');
      return;
    }
    
    if (password.length < 6) {
      showAlert('Error', 'Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    const result = await signUp(username.trim(), password, email.trim(), phone.trim());
    setLoading(false);
    
    if (result.success) {
      showConfirm(
        'Account Created! 🎉',
        result.msg || 'Check your email for a verification code.',
        () => navigation.navigate('Verify', { email: email.trim() })
      );
    } else {
      showAlert('Signup Failed', result.error);
    }
  };

  const renderInput = (key, label, placeholder, value, setter, error, checking, extra = {}) => (
    <View style={styles.inputGroup}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={styles.label}>{label}</Text>
        {checking && <ActivityIndicator size="small" color={COLORS.YELLOW} />}
      </View>
      <TextInput
        style={[
          styles.input, 
          focusedField === key && styles.inputFocused,
          error && { borderColor: COLORS.RED }
        ]}
        placeholder={placeholder}
        placeholderTextColor="#555"
        value={value}
        onChangeText={setter}
        onFocus={() => setFocusedField(key)}
        onBlur={() => setFocusedField(null)}
        autoCapitalize="none"
        {...extra}
      />
      {error ? <Text style={{ color: COLORS.RED, fontSize: 12, marginTop: 4 }}>{error}</Text> : null}
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.inner} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>CREATE{'\n'}ACCOUNT</Text>
        <Text style={styles.subtitle}>Join and start writing</Text>

        {renderInput('user', 'USERNAME', 'johndoe (3-50 chars)', username, handleUsernameChange, usernameError, checkingUsername)}
        {renderInput('email', 'EMAIL', 'john@example.com', email, handleEmailChange, emailError, checkingEmail, { keyboardType: 'email-address' })}
        {renderInput('phone', 'PHONE', '10 digit number', phone, setPhone, '', false, { keyboardType: 'phone-pad', maxLength: 10 })}
        {renderInput('pass', 'PASSWORD', '••••••  (min 6 chars)', password, setPassword, '', false, { secureTextEntry: true })}

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSignup}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.buttonText}>→  SIGN UP</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.backLink}>
          <Text style={styles.backText}>← BACK TO LOGIN</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
