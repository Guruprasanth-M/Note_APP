import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as api from './api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load saved session on app start
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem('session');
        if (saved) {
          const session = JSON.parse(saved);
          setUser(session.user);
          setAccessToken(session.accessToken);
          setRefreshToken(session.refreshToken);
        }
      } catch (e) {
        // ignore
      }
      setLoading(false);
    })();
  }, []);

  // Save session to storage
  const saveSession = async (userData, access, refresh) => {
    setUser(userData);
    setAccessToken(access);
    setRefreshToken(refresh);
    await AsyncStorage.setItem('session', JSON.stringify({
      user: userData,
      accessToken: access,
      refreshToken: refresh,
    }));
  };

  // Clear session
  const clearSession = async () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    await AsyncStorage.removeItem('session');
  };

  // Login
  const signIn = async (username, password) => {
    const res = await api.login(username, password);
    if (res.data.status === 'SUCCESS') {
      await saveSession(res.data.user, res.data.access_token, res.data.refresh_token);
      return { success: true };
    }
    return { success: false, error: res.data.msg || res.data.error || 'Login failed' };
  };

  // Signup
  const signUp = async (username, password, email, phone) => {
    const res = await api.signup(username, password, email, phone);
    if (res.data.status === 'SUCCESS') {
      return { success: true, msg: res.data.msg };
    }
    return { success: false, error: res.data.msg || res.data.error || 'Signup failed' };
  };

  // Logout
  const signOut = async () => {
    if (accessToken) {
      await api.logout(accessToken);
    }
    await clearSession();
  };

  // Refresh token — called when we get 401
  const refreshSession = async () => {
    if (!refreshToken) return false;
    const res = await api.refresh(refreshToken);
    if (res.data.status === 'SUCCESS') {
      const newAccess = res.data.access_token;
      setAccessToken(newAccess);
      // Update stored session with new access token
      const saved = await AsyncStorage.getItem('session');
      if (saved) {
        const session = JSON.parse(saved);
        session.accessToken = newAccess;
        // If server returns new refresh token on rotation
        if (res.data.refresh_token) {
          session.refreshToken = res.data.refresh_token;
          setRefreshToken(res.data.refresh_token);
        }
        await AsyncStorage.setItem('session', JSON.stringify(session));
      }
      return newAccess;
    }
    // Refresh failed — session dead, force logout
    await clearSession();
    return false;
  };

  // Authenticated API call with auto-refresh on 401
  const authFetch = async (apiFn, ...args) => {
    // First try with current token
    let res = await apiFn(...args, accessToken);
    
    // If unauthorized, try refreshing
    if (res.status === 401) {
      const newToken = await refreshSession();
      if (newToken) {
        res = await apiFn(...args, newToken);
      }
    }
    return res;
  };

  return (
    <AuthContext.Provider value={{
      user,
      accessToken,
      loading,
      signIn,
      signUp,
      signOut,
      authFetch,
      isLoggedIn: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
