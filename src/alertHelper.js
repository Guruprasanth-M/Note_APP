import { Platform, Alert } from 'react-native';

export function showAlert(title, message) {
  if (Platform.OS === 'web') {
    window.alert(title + '\n' + message);
  } else {
    Alert.alert(title, message);
  }
}

export function showConfirm(title, message, onConfirm, onCancel) {
  if (Platform.OS === 'web') {
    if (window.confirm(title + '\n' + message)) {
      onConfirm();
    } else if (onCancel) {
      onCancel();
    }
  } else {
    Alert.alert(title, message, [
      { text: 'Cancel', style: 'cancel', onPress: onCancel },
      { text: 'OK', style: 'destructive', onPress: onConfirm },
    ]);
  }
}
