import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform, Alert, ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useAuth } from '../AuthContext';

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
      Alert.alert('Error', 'All fields are required');
      return;
    }
    setLoading(true);
    const result = await signUp(username.trim(), password, email.trim(), phone.trim());
    setLoading(false);
    if (result.success) {
      Alert.alert(
        'Account Created',
        result.msg || 'Check your email to verify, then login.',
        [{ text: 'GO TO LOGIN', onPress: () => navigation.navigate('Login') }]
      );
    } else {
      Alert.alert('Signup Failed', result.error);
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

const ACCENT = '#00f5d4';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  inner: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 60,
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    color: '#fff',
    lineHeight: 46,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: '#444',
    marginBottom: 40,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  inputGroup: {
    marginBottom: 18,
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
    padding: 18,
    alignItems: 'center',
    marginTop: 16,
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
  backLink: {
    marginTop: 24,
    alignItems: 'center',
  },
  backText: {
    color: '#444',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 2,
  },
});
