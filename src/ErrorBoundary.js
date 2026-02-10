import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorLog: [] 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('=== APP CRASHED ===');
    console.error('Error:', error.toString());
    console.error('Stack:', errorInfo.componentStack);
    
    this.setState(prevState => ({
      error,
      errorInfo,
      errorLog: [...prevState.errorLog, {
        time: new Date().toLocaleTimeString(),
        error: error.toString(),
        stack: errorInfo.componentStack
      }]
    }));
  }

  resetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', padding: 20 }}>
          <ScrollView>
            <Text style={{ color: '#ff4444', fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
              ⚠️ App Crashed
            </Text>
            
            <Text style={{ color: '#fff', fontSize: 12, marginBottom: 10, fontFamily: 'monospace' }}>
              {this.state.error?.toString()}
            </Text>

            <Text style={{ color: '#aaa', fontSize: 10, marginTop: 10 }}>
              {this.state.errorInfo?.componentStack}
            </Text>

            {this.state.errorLog.length > 0 && (
              <>
                <Text style={{ color: '#00f5d4', marginTop: 20, fontWeight: 'bold' }}>
                  Error Log:
                </Text>
                {this.state.errorLog.map((log, idx) => (
                  <Text key={idx} style={{ color: '#aaa', fontSize: 9, marginTop: 5, fontFamily: 'monospace' }}>
                    [{log.time}] {log.error}
                  </Text>
                ))}
              </>
            )}

            <TouchableOpacity
              onPress={this.resetError}
              style={{ 
                backgroundColor: '#00f5d4', 
                padding: 12, 
                marginTop: 20, 
                borderRadius: 8,
                alignItems: 'center'
              }}
            >
              <Text style={{ color: '#000', fontWeight: 'bold' }}>Retry</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      );
    }

    return this.props.children;
  }
}
