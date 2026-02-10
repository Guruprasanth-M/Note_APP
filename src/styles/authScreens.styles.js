import { StyleSheet } from 'react-native';
import { ACCENT } from './common.styles';

export const authStyles = StyleSheet.create({
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
  instructionText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginBottom: 24,
    letterSpacing: 1,
    fontStyle: 'italic',
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
    marginBottom: 12,
  },
  secondaryButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 3,
  },
});
