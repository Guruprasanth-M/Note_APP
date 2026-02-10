import { StyleSheet } from 'react-native';
import { ACCENT } from './common.styles';

export const signupStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  inner: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 8,
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 36,
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
  backLink: {
    marginTop: 28,
    paddingVertical: 12,
    alignItems: 'center',
  },
  backText: {
    color: '#666',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 3,
  },
});
