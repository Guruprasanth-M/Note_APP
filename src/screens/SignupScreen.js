import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useAuth } from '../AuthContext';
import { showAlert, showConfirm } from '../alertHelper';
import { signupStyles as styles } from '../styles/signupScreen.styles';

export default function SignupScreen({ navigation }) {
  const { signUp } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSignup = async () => {
    if (!username.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      showAlert('Error', 'All fields are required');
      return;
    }
    setLoading(true);
    const result = await signUp(username.trim(), password, email.trim(), phone.trim());
    setLoading(false);
    if (result.success) {
      showConfirm(
        'Account Created',
        result.msg || 'Check your email to verify, then login.',
        () => navigation.navigate('Login')
      );
    } else {
      showAlert('Signup Failed', result.error);
    }
  };

  const renderInput = (key, label, placeholder, value, setter, extra = {}) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, focusedField === key && styles.inputFocused]}
        placeholder={placeholder}
        placeholderTextColor="#333"
        value={value}
        onChangeText={setter}
        onFocus={() => setFocusedField(key)}
        onBlur={() => setFocusedField(null)}
        autoCapitalize="none"
        {...extra}
      />
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

        {renderInput('user', 'USERNAME', 'johndoe (3-50 chars)', username, setUsername)}
        {renderInput('email', 'EMAIL', 'john@example.com', email, setEmail, { keyboardType: 'email-address' })}
        {renderInput('phone', 'PHONE', '10 digit number', phone, setPhone, { keyboardType: 'phone-pad', maxLength: 10 })}
        {renderInput('pass', 'PASSWORD', '••••••  (min 6 chars)', password, setPassword, { secureTextEntry: true })}

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
