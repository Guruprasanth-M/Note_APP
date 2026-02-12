import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { AuthProvider, useAuth } from './src/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import ResetScreen from './src/screens/ResetScreen';
import VerifyScreen from './src/screens/VerifyScreen';
import FoldersScreen from './src/screens/FoldersScreen';
import NotesScreen from './src/screens/NotesScreen';
import EditorScreen from './src/screens/EditorScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createStackNavigator();

// Apple Notes style navigation theme
const screenOptions = {
  headerStyle: { 
    backgroundColor: '#000000', 
    borderBottomWidth: 0.5, 
    borderBottomColor: 'rgba(84, 84, 88, 0.65)',
    elevation: 0, 
    shadowOpacity: 0,
  },
  headerTintColor: '#FFD60A', // Apple Notes yellow
  headerTitleStyle: { 
    fontWeight: '600', 
    fontSize: 17, 
    letterSpacing: -0.41,
    color: '#FFFFFF',
  },
  headerBackTitleVisible: false,
  headerLeftContainerStyle: { paddingLeft: Platform.OS === 'ios' ? 8 : 0 },
  cardStyle: { backgroundColor: '#000000' },
  headerShadowVisible: false,
};

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ ...screenOptions, headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Reset" component={ResetScreen} />
      <Stack.Screen name="Verify" component={VerifyScreen} />
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
          title: route.params.folderName,
        })}
      />
      <Stack.Screen
        name="Editor"
        component={EditorScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000' }}>
        <ActivityIndicator size="large" color="#FFD60A" />
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
