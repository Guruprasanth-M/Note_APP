import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View, SafeAreaView, StatusBar } from 'react-native';

import ErrorBoundary from './src/ErrorBoundary';
import { AuthProvider, useAuth } from './src/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import FoldersScreen from './src/screens/FoldersScreen';
import NotesScreen from './src/screens/NotesScreen';
import EditorScreen from './src/screens/EditorScreen';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerStyle: { backgroundColor: '#000', borderBottomWidth: 0, elevation: 0, shadowOpacity: 0 },
  headerTintColor: '#fff',
  headerTitleStyle: { fontWeight: '800', fontSize: 14, letterSpacing: 3 },
  contentStyle: { backgroundColor: '#000' },
  headerShadowVisible: false,
};

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ ...screenOptions, headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Folders"
        component={FoldersScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notes"
        component={NotesScreen}
        options={({ route }) => ({
          title: route.params.folderName.toUpperCase(),
        })}
      />
      <Stack.Screen
        name="Editor"
        component={EditorScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <ActivityIndicator size="large" color="#00f5d4" />
      </View>
    );
  }

  try {
    return (
      <NavigationContainer>
        {isLoggedIn ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    );
  } catch (error) {
    console.error('Navigation Error:', error);
    return (
      <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ color: '#ff4444', fontSize: 16, marginBottom: 10, textAlign: 'center' }}>
          Navigation Error
        </Text>
        <Text style={{ color: '#aaa', fontSize: 12, textAlign: 'center', fontFamily: 'monospace' }}>
          {error.message}
        </Text>
      </View>
    );
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <View style={{ flex: 1, backgroundColor: '#000' }}>
          <SafeAreaView style={{ flex: 1 }}>
            <RootNavigator />
            <StatusBar barStyle="light-content" backgroundColor="#000" />
          </SafeAreaView>
        </View>
      </AuthProvider>
    </ErrorBoundary>
  );
}
