import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

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

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <StatusBar style="light" />
      <RootNavigator />
    </AuthProvider>
  );
}
