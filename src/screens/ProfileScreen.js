import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  ActivityIndicator, SafeAreaView, Switch, Platform,
} from 'react-native';
import { useAuth } from '../AuthContext';
import { showAlert, showConfirm } from '../alertHelper';
import * as api from '../api';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../styles/common.styles';
import { StyleSheet } from 'react-native';

export default function ProfileScreen({ navigation }) {
  const { user, signOut, authFetch } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ folders: 0, notes: 0 });

  useEffect(() => {
    loadProfile();
    loadStats();
  }, []);

  const loadProfile = async () => {
    const res = await authFetch(api.about);
    setLoading(false);
    if (res.data.status === 'SUCCESS') {
      // API returns user info under 'admin' key
      setProfile(res.data.admin || res.data.user || res.data);
    }
  };

  const loadStats = async () => {
    const res = await authFetch(api.listFolders);
    if (res.data.status === 'SUCCESS') {
      const folders = res.data.folders || [];
      const totalNotes = folders.reduce((sum, f) => sum + (f.note_count || 0), 0);
      setStats({ folders: folders.length, notes: totalNotes });
    }
  };

  const handleSignOut = () => {
    showConfirm(
      'Sign Out',
      'Are you sure you want to sign out?',
      async () => {
        await signOut();
      }
    );
  };

  const userInitial = (profile?.username || user?.username || 'U').charAt(0).toUpperCase();
  const displayName = profile?.username || user?.username || 'User';
  const displayEmail = profile?.email || user?.email || '';

  const renderSettingRow = (icon, label, value, onPress, showChevron = true) => (
    <TouchableOpacity 
      style={styles.settingRow} 
      onPress={onPress}
      activeOpacity={0.6}
      disabled={!onPress}
    >
      <View style={styles.settingLeft}>
        <Text style={styles.settingIcon}>{icon}</Text>
        <Text style={styles.settingLabel}>{label}</Text>
      </View>
      <View style={styles.settingRight}>
        {value && <Text style={styles.settingValue}>{value}</Text>}
        {showChevron && onPress && <Text style={styles.settingChevron}>›</Text>}
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={COLORS.YELLOW} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <View style={styles.avatarLarge}>
              <Text style={styles.avatarText}>{userInitial}</Text>
            </View>
            <Text style={styles.profileName}>{displayName}</Text>
            <Text style={styles.profileEmail}>{displayEmail}</Text>
          </View>

          {/* Stats Card */}
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.folders}</Text>
              <Text style={styles.statLabel}>Folders</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.notes}</Text>
              <Text style={styles.statLabel}>Notes</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {profile?.verified ? '✓' : '✗'}
              </Text>
              <Text style={styles.statLabel}>Verified</Text>
            </View>
          </View>

          {/* Account Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ACCOUNT</Text>
            <View style={styles.settingGroup}>
              {renderSettingRow('👤', 'Username', displayName, null, false)}
              <View style={styles.separator} />
              {renderSettingRow('✉️', 'Email', displayEmail, null, false)}
              <View style={styles.separator} />
              {renderSettingRow('📱', 'Phone', profile?.phone || user?.phone || '—', null, false)}
              <View style={styles.separator} />
              {renderSettingRow('📅', 'Member Since', 
                profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', { 
                  month: 'short', day: 'numeric', year: 'numeric' 
                }) : '—', 
                null, false
              )}
            </View>
          </View>

          {/* App Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>APP</Text>
            <View style={styles.settingGroup}>
              {renderSettingRow('📁', 'My Folders', null, () => navigation.navigate('Folders'))}
              <View style={styles.separator} />
              {renderSettingRow('🔒', 'Change Password', null, () => navigation.navigate('Reset'))}
            </View>
          </View>

          {/* About Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ABOUT</Text>
            <View style={styles.settingGroup}>
              {renderSettingRow('📝', 'App Name', 'Notes', null, false)}
              <View style={styles.separator} />
              {renderSettingRow('📱', 'Version', '1.0.1', null, false)}
              <View style={styles.separator} />
              {renderSettingRow('👨‍💻', 'Developer', 'Guruprasanth', null, false)}
            </View>
          </View>

          {/* Sign Out Button */}
          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut} activeOpacity={0.8}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>

          <Text style={styles.footer}>Made with ❤️ in India</Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BG_PRIMARY,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  
  // Profile Header
  profileHeader: {
    alignItems: 'center',
    paddingVertical: SPACING.xxxl,
    paddingHorizontal: SPACING.xl,
  },
  avatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.YELLOW,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  avatarText: {
    fontSize: 42,
    fontWeight: '600',
    color: '#000',
  },
  profileName: {
    ...TYPOGRAPHY.title2,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.xs,
  },
  profileEmail: {
    ...TYPOGRAPHY.subheadline,
    color: COLORS.TEXT_SECONDARY,
  },

  // Stats Card
  statsCard: {
    flexDirection: 'row',
    marginHorizontal: SPACING.lg,
    backgroundColor: COLORS.BG_ELEVATED,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.lg,
    marginBottom: SPACING.xxl,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    ...TYPOGRAPHY.title2,
    color: COLORS.YELLOW,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    ...TYPOGRAPHY.caption1,
    color: COLORS.TEXT_SECONDARY,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.SEPARATOR,
  },

  // Sections
  section: {
    marginBottom: SPACING.xxl,
    paddingHorizontal: SPACING.lg,
  },
  sectionTitle: {
    ...TYPOGRAPHY.caption1,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.sm,
    marginLeft: SPACING.lg,
    letterSpacing: 0.5,
  },
  settingGroup: {
    backgroundColor: COLORS.BG_ELEVATED,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md + 2,
    paddingHorizontal: SPACING.lg,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    fontSize: 18,
    marginRight: SPACING.md,
  },
  settingLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.TEXT_PRIMARY,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    ...TYPOGRAPHY.body,
    color: COLORS.TEXT_SECONDARY,
    marginRight: SPACING.sm,
  },
  settingChevron: {
    ...TYPOGRAPHY.title2,
    color: COLORS.TEXT_TERTIARY,
  },
  separator: {
    height: 0.5,
    backgroundColor: COLORS.SEPARATOR,
    marginLeft: 52,
  },

  // Sign Out
  signOutButton: {
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.md,
    backgroundColor: COLORS.BG_ELEVATED,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.md + 2,
    alignItems: 'center',
  },
  signOutText: {
    ...TYPOGRAPHY.body,
    color: COLORS.RED,
    fontWeight: '500',
  },

  // Footer
  footer: {
    ...TYPOGRAPHY.caption1,
    color: COLORS.TEXT_TERTIARY,
    textAlign: 'center',
    marginTop: SPACING.xxxl,
  },
});
